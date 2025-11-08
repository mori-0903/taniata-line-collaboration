import dayjs from "dayjs"
import { fetchWeight } from "./getWeight"
import { noticeLINEMessage } from "./noticeLINEMessage"
import { processWeightData } from "./processWeightData"
import type { LINEMessage } from "./type"

require("dotenv").config()

async function index() {
  const fetchData = await fetchWeight()
  const { currentWeight, meanWeight } = processWeightData(fetchData)
  if (currentWeight) {
    const today = dayjs().tz("Asia/Tokyo").format("YYYY年MM月DD日")
    const spleadsheetUrl =
      "https://docs.google.com/spreadsheets/d/1-R4P51Zy_WFRKIliaXERNq2hiON26hRVVf4hhKNxjXQ/edit?usp=sharing"
    const messageObject: LINEMessage[] = [
      {
        type: "text",
        text: `転記先スプレッドシート \n${spleadsheetUrl}`,
      },
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
}

index()
