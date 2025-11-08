import axios from "axios"
import type { LINEMessage } from "./type"

export const noticeLINEMessage = async (LINEMessages: LINEMessage[]) => {
  const url = "https://api.line.me/v2/bot/message/push"
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }

  const LineApiInterface = axios.create({
    baseURL: url,
    headers: headers,
  })

  const params = {
    to: process.env.LINE_USER_ID,
    messages: LINEMessages,
  }
  try {
    const response = await LineApiInterface.post(url, params)
    if (response.status !== 200) {
      throw new Error(
        `Failed to send LINE message: ${response.status} ${response.statusText}`,
      )
    }
  } catch (error) {
    console.error("Error sending LINE message:", error)
    throw error
  }
}
