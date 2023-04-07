import axios from "@/http/index"

// /admissions-api/manage/siteAnnouncement/listSiteAnnouncementByName
export function listSiteAnnouncementByName(data: any) {
  return axios.post("/api/manage/siteAnnouncement/listSiteAnnouncementByName", data)
}

// /admissions-api/manage/siteAnnouncement/getSiteAnnouncementById
export function getSiteAnnouncementById(data: any) {
  return axios.post("/api/manage/siteAnnouncement/getSiteAnnouncementById", data)
}
