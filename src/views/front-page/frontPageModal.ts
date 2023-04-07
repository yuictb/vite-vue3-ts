export interface StageInfomationType {
  detail: singleInfoType
  stageData: stageDataRules[]
}
interface stageDataRules {
  flowName: string
}
export interface singleInfoType {
  deliveryNo?: string
  stageName?: string
  stageSort?: number
  writeSignUpInfo?: boolean
}

export interface AttentionRules {
  data: any[]
}
