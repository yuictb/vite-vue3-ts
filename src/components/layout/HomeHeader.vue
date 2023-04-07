<template>
  <div class="w-full headContainer overflow-hidden">
    <div style="height: 53px" class="fixed w-full z-50 bg-white">
      <header class="w-1200px h-full m-auto flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-20 mr-24">
            <img class="w-full block" :src="requireAssets('headerPic/logo-blue.jpg')" alt="" />
          </div>
          <ul class="flex items-center">
            <li
              style="height: 53px"
              class="p-4 mx-2 box-border font-medium cursor-pointer"
              :class="router.currentRoute.value.fullPath == item.path ? 'active' : ''"
              v-for="item in routerInfo"
              :key="item.name"
              @click="router.push(item.path)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="flex items-center">
          <img class="w-4 mr-2" :src="requireAssets('headerPic/tel-blue.jpg')" alt="" />
          <span>{{ "000-415-545" }}</span>
        </div>
      </header>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router"
import { requireAssets } from "@/utils/file-utils"
import routerInfo from "@/router/routerInfo"
const router = useRouter()
</script>
<style lang="less" scoped>
.headContainer {
  height: 343px;
  background: url("@/assets/imgs/headerPic/headBg.png") no-repeat center center;
  background-size: 100% 100%;
}
.active {
  color: #45a2f6;
  border-bottom: 3px solid #45a2f6;
  box-sizing: border-box;
}
</style>
