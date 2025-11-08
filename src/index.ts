import dayjs from "dayjs"
import { fetchWeight } from "./getWeight"
import { noticeLINEMessage } from "./noticeLINEMessage"
import { processWeightData } from "./processWeightData"
import type { LINEMessage } from "./type"

require("dotenv").config()

async function index() {
  const fetchData = await fetchWeight()
  const { currentWeight, meanWeight } = processWeightData(fetchData)
  const today = dayjs().tz("Asia/Tokyo").format("YYYY年MM月DD日")
  const messageObject: LINEMessage[] = [
    {
      type: "text",
      text: `ここ2週間の平均体重: ${meanWeight}kg \n${today}の最新体重(kg):`,
    },
    {
      type: "text",
      text: currentWeight ? `${currentWeight}` : "データがありません",
    },
  ]
  noticeLINEMessage(messageObject)
}

index()
