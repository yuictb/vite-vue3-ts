import { defineConfig, loadEnv } from "vite"
import path from "path"
import ElementPlus from "unplugin-element-plus/vite"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import viteEslint from "vite-plugin-eslint"
import vue from "@vitejs/plugin-vue"
import UnoCSS from "unocss/vite"
import { presetUno, presetAttributify, presetIcons } from "unocss"
import proxy from "./src/http/proxy.d"
const pathSrc = path.resolve(__dirname, "src")
// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log("当前环境", env)
  return defineConfig({
    plugins: [
      UnoCSS({
        presets: [presetUno(), presetAttributify(), presetIcons()]
      }),
      vue(),
      ElementPlus({}),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
            importStyle: "sass"
          }),
          IconsResolver({
            prefix: "Icon"
          })
        ],
        dts: path.resolve(pathSrc, "auto-imports.d.ts")
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            // 自动引入修改主题色添加这一行，使用预处理样式
            importStyle: "sass"
          }),
          IconsResolver({
            enabledCollections: ["ep"]
          })
        ],
        dts: path.resolve(pathSrc, "components.d.ts")
      }),
      Icons({
        autoInstall: true
      }),
      {
        ...viteEslint(),
        apply: "build"
      },
      {
        ...viteEslint({
          failOnWarning: false,
          failOnError: false
        }),
        apply: "serve",
        enforce: "post"
      }
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    base: "./",
    css: {
      preprocessorOptions: {
        scss: {
          // 自定义的主题色
          additionalData: `@use "@/assets/element/index.scss" as *;`
        }
      }
    },
    build: {
      target: "modules",
      outDir: "admissions-website", //项目打包文件夹名称, 如nginx 使用root 配置,需与 location 的值一致
      chunkSizeWarningLimit: 800,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    server: {
      proxy: {
        ...proxy
      }
    }
  })
}
