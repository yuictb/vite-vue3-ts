export const postTypes: any = [
  { value: 0, label: "管理岗" },
  { value: 1, label: "技术岗" },
  { value: 2, label: "其他" }
]

export const genderTypes: any = [
  { value: 0, label: "不限" },
  { value: 1, label: "男" },
  { value: 2, label: "女" }
]
export const politicalTypes: any = [
  { value: 0, label: "不限" },
  { value: 1, label: "群众" },
  { value: 2, label: "共青团员" },
  { value: 3, label: "中共预备党员" },
  { value: 4, label: "中共党员" },
  { value: 5, label: "民革党员" },
  { value: 6, label: "民工党党员" },
  { value: 7, label: "致公党党员" },
  { value: 8, label: "九三学社社员" },
  { value: 9, label: "台盟盟员" }
]
export const educationTypes: any = [
  { value: 0, label: "小学及其以上" },
  { value: 1, label: "初中及其以上" },
  { value: 2, label: "高中及其以上" },
  { value: 3, label: "职高及其以上" },
  { value: 4, label: "中专及其以上" },
  { value: 5, label: "大专及其以上" },
  { value: 6, label: "本科及其以上" },
  { value: 7, label: "硕士及其以上" },
  { value: 8, label: "博士" }
]
export const unlimitedOrShowOrhidden: Type[] = [
  { value: -1, label: "不限" },
  { value: 0, label: "否" },
  { value: 1, label: "是" }
]
interface Type {
  value: number
  label: string
}
export function filter(v: number | string, arr: any[] = []) {
  return arr.find((item: Type) => item.value === v).label
}
