export default {
  "^/api": {
    target: "http://115.28.100.177:30001/dev-test/admissions-api",
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, "")
  }
  // 付明鹏
  // "^/api": {
  //   target: "http://192.168.6.119:7077/admissions-api",
  //   changeOrigin: true,
  //   rewrite: (path: string) => path.replace(/^\/api/, "")
  // }
  // 陈凯欲
  // "^/api": {
  //   target: "http://192.168.7.151:7077/admissions-api",
  //   changeOrigin: true,
  //   rewrite: (path: string) => path.replace(/^\/api/, "")
  // }
}
