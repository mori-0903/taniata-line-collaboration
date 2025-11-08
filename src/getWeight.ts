import axios from "axios"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * タニタのAPIから体重データを取得する
 * @returns
 */
export const fetchWeight = async () => {
  const url = "https://www.healthplanet.jp/status/innerscan.json"
  const jstNow = dayjs().tz("Asia/Tokyo")
  const date14DaysAgo = `${jstNow.subtract(14, "day").format("YYYYMMDD")}000000`
  const dateToday = `${jstNow.format("YYYYMMDD")}235959`

  const params = {
    access_token: process.env.HEALTHPLANET_ACCESS_TOKEN,
    date: "1",
    from: date14DaysAgo,
    to: dateToday,
    tag: "6021",
  }
  try {
    const response = await axios.get(url, { params })
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`,
      )
    }
    return response.data
  } catch (error) {
    console.error("Error fetching weight data:", error)
    throw error
  }
}
