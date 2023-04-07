<template>
  <div>
    <el-upload
      v-bind="$attrs"
      :class="$attrs.class"
      :drag="$attrs['list-type'] === 'picture' ? true : false"
      :action="baseUrl"
      :accept="accept"
      :headers="headers"
      :disabled="ifDisabled"
      :before-upload="beforeAvatarUpload"
      :before-remove="onBeforeRemove"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :on-success="handleAvatarSuccess"
      :on-preview="handlePictureCardPreview"
      :file-list="fileList"
    >
      <el-icon v-if="$attrs['list-type'] === 'picture-card'" class="avatar-uploader-icon"
        ><Plus
      /></el-icon>
      <div v-else-if="$attrs['list-type'] === 'picture'">
        <el-icon class="el-icon--upload" :size="80"><upload-filled /></el-icon>
        <div class="el-upload__text">
          {{ desc }}
          <br />
          <br />
          <em>{{ btnText }}</em>
        </div>
      </div>
      <el-button v-else type="primary">{{ btnText }}</el-button>
      <template #tip v-if="showTips">
        <slot name="tip">
          <div>{{ tips }}</div>
        </slot>
      </template>
    </el-upload>
    <el-dialog title="查看图片" v-model="dialogVisible" class="preview-img">
      <div class="d_flex justify_content_center">
        <img w-full :src="concatUrl(dialogImageUrl)" alt="Preview Image" />
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import type { UploadProps, UploadUserFile } from "element-plus"
import { Plus, UploadFilled } from "@element-plus/icons-vue"
import { proxyReplace } from "@/http/proxyReplace"
import { getUserInfo } from "@/utils/app-util"
import { downloadFile, isAssetTypeAnImage, concatUrl } from "@/utils/file-utils"
const fileList = ref<UploadUserFile[]>([])
const props = defineProps({
  // 父组件传递的图片列表
  imgList: {
    type: Array,
    default: () => []
  },
  // 上传地址
  baseUrl: {
    type: String,
    default: () => proxyReplace("/api/PublicFileController/uploadFileServerCoudWebWithType")
  },
  // 上传类型
  accept: {
    type: String,
    default: () =>
      ".doc, .docx, .jpg, .jpeg, .png, .pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  },
  // 请求头
  headers: {
    type: Object,
    default: () => ({ Authorization: getUserInfo().token })
  },
  // 上传大小限制
  fileSize: {
    type: Number,
    dafault: () => 2
  },
  // 是否线上提示语
  showTips: {
    type: Boolean,
    dafault: () => false
  },
  // 提示语
  tips: {
    type: String,
    default: () => "自定义提示用户上传说明"
  },
  // 是否禁用
  ifDisabled: {
    type: Boolean,
    dafault: () => false
  },
  // 按钮文字
  btnText: {
    type: String,
    default: () => "点击上传"
  },
  // 描述文字
  desc: {
    type: String,
    default: () => "上传图片"
  }
})
// 控制上传失败弹出删除框
let isShowDelDialog = false
const emits = defineEmits(["imgListChange"])
// 文件上传前的验证
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  // 接收传入限制文件上传类型
  const acceptList = props.accept?.trim().split(", ")
  const fileSuffix = rawFile.name.substring(rawFile.name.lastIndexOf("."))
  if (!acceptList.includes(fileSuffix)) {
    ElMessage.error(`请上传后缀为${acceptList.join("、")}类型文件`)
    isShowDelDialog = true
    return false
  }
  const newFileSize = props.fileSize ? props.fileSize : 2
  if (rawFile.size / 1024 / 1024 / 1024 > newFileSize) {
    ElMessage.error("上传文件大小不能超过 " + newFileSize + "GB!")
    isShowDelDialog = true
    return false
  }
  return true
}
// 符合验证规则,文件上传成功操作
const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile, uploadFiles) => {
  if (response.code !== "000000") {
    ElMessage.error("上传失败")
    fileList.value = JSON.parse(JSON.stringify(response.data))
    if (fileList.value.length > 0) {
      fileList.value.pop()
    }
    emits("imgListChange", fileList)
    return
  }
  console.log(uploadFiles)
  fileList.value = uploadFiles.map((v: any) => {
    if (Object.prototype.hasOwnProperty.call(v, "response")) {
      let url = ""
      if (v.response.data[0].fileType !== 1) {
        url =
          "http://bjbztest.oss-cn-qingdao.aliyuncs.com/fssc-core/image/documentII.png?x-oss-process=image/resize,m_pad,h_200,w_200,color_FFFFFF"
      } else {
        if (v.response.data[0].path.indexOf("http") === 0) {
          url = v.response.data[0].path
        } else {
          url = concatUrl(v.response.data[0].path)
        }
      }
      // console.log(url)
      let item = {
        name: v.response.data[0].fileName,
        url: url,
        fileName: v.response.data[0].fileName,
        path: v.response.data[0].path,
        fileType: v.response.data[0].fileType,
        type: v.response.data[0].fileType,
        size: v.size
      }
      return item
    } else {
      return v
    }
  })
  emits("imgListChange", fileList.value)
}

const handleExceed: UploadProps["onExceed"] = () => {
  ElMessage.warning(`超出文件个数限制`)
}

const onBeforeRemove: UploadProps["beforeRemove"] = () => {
  if (isShowDelDialog) {
    isShowDelDialog = false
    return true
  }
  return ElMessageBox.confirm("是否确认删除附件？", "删除附件").then(
    () => true,
    () => false
  )
}
// 移除列表文件的操作
const handleRemove: UploadProps["onRemove"] = () => {
  emits("imgListChange", fileList.value)
}
const dialogImageUrl = ref("")
const dialogVisible = ref(false)
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile: any) => {
  let index = uploadFile.path?.lastIndexOf(".")
  let urlType = uploadFile.path?.substring(index, uploadFile.path?.length)
  if (/\.(gif|jpg|jpeg|png|bmp|webp|svg|GIF|JPG|JPEG|PNG|BMP|WEBP|SVG)$/.test(urlType)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dialogImageUrl.value = uploadFile.path!
    dialogVisible.value = true
    // window.open(uploadFile.url)
  } else if (/\.(avi|mp4|AVI|MP4)$/.test(urlType)) {
    window.open(uploadFile.path)
  } else {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    downloadFile(uploadFile.path!, uploadFile.name)
  }
}
onMounted(() => {
  handleFileList(props.imgList)
})
watch(
  () => props.imgList,
  (newValue) => {
    if (newValue === null) {
      fileList.value = []
      return
    }
    if (newValue.length === 0) {
      fileList.value = []
      return
    }
    handleFileList(newValue)
  }
)
const handleFileList = (newArr: UploadUserFile[] | unknown[]) => {
  // console.log(newArr)
  fileList.value = newArr.map((v: any) => {
    // console.log(v)
    // 防止数据错乱
    let path = ""
    if (v.path) {
      path = v.path
    } else {
      path = v.url
    }
    let url = ""
    if (!isAssetTypeAnImage(v.url)) {
      url =
        "http://bjbztest.oss-cn-qingdao.aliyuncs.com/fssc-core/image/documentII.png?x-oss-process=image/resize,m_pad,h_200,w_200,color_FFFFFF"
    } else {
      if (v.url.indexOf("http") === 0) {
        url = v.url
      } else {
        url = concatUrl(v.url)
      }
    }
    v.url = url
    v.path = path
    return v
  })
}
</script>
<style lang="less" scoped></style>
