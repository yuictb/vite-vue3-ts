import FrontPage from "@/views/front-page/FrontPage.vue"
import AdmissionsCenter from "@/views/admissions-center/AdmissionsCenter.vue"
import AnnouncementCenter from "@/views/announcement-center/AnnouncementCenter.vue"
import Mine from "@/views/mine/Mine.vue"

export default [
  {
    path: "/front-page",
    name: "首页",
    component: FrontPage,
    meta: {
      isMenu: true
    }
  },
  {
    path: "/admissions-center",
    name: "招考中心",
    component: AdmissionsCenter,
    meta: {
      isMenu: true
    }
  },

  {
    path: "/announcement-center",
    name: "公告中心",
    component: AnnouncementCenter,
    meta: {
      isMenu: true
    }
  },
  {
    path: "/mine",
    name: "我的",
    component: Mine,
    meta: {
      isAuth: true,
      isMenu: true
    }
  }
]
