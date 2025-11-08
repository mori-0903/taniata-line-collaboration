import dayjs from "dayjs"
import type { proccessedWeightData, WeightObject } from "./type"

/**
 * weightDataオブジェクトを受け取り、平均体重と最新体重を計算して返す
 * @param WeightObject
 * @returns { meanWeight: number, currentWeight: number }
 */

export function processWeightData(object: WeightObject): proccessedWeightData {
  const weightEntries = object.data.map((entry) => {
    return {
      date: entry.date,
      weight: parseFloat(entry.keydata),
    }
  })

  const meanWeight = (
    weightEntries.reduce((sum, entry) => sum + entry.weight, 0) /
    weightEntries.length
  ).toFixed(1)

  const latestData = weightEntries[0]
  const nowDate = dayjs().tz("Asia/Tokyo")

  let currentWeight = latestData.weight?.toString()
  if (!dayjs(latestData.date, "YYYYMMDDHHmm").isSame(nowDate, "day")) {
    // 最新データの日付が今日でない場合、currentWeightをnullに設定
    currentWeight = ""
  }

  return { meanWeight, currentWeight }
}
