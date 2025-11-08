export interface WeightObject {
  birth_date: string // 生年月日
  height: string // 身長
  sex: string // 性別
  data: WeightData[]
}

export interface WeightData {
  date: string // 測定日(YYYYMMDDhhmm)
  keydata: string // 体重データ(70.00 -> 70.00kg)
  model: string // 測定機器名
  tag: string // 体重 タグ(6021) 今は体重(6021)と体脂肪率(6022)のみ
}
