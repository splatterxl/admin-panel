import { UserFlags } from "discord-api-types/v10"
import { ErrorMessages } from "../constants"
import http from "../http"
import { User } from "./types"

export const login = async (data: { login: string; password: string }) => {
  const res = await http.post<{
    token: string
    user_settings: { theme: string }
  }>("/auth/login", data)

  if (!res.ok) {
    throw ErrorMessages.INVALID_CREDENTIALS
  } else {
    const {
      token,
      user_settings: { theme },
    } = res.data

    const { data: user } = await http.get<User>("/users/@me", "", {
      headers: {
        Authorization: token,
      },
    })

    if ((user.flags! & UserFlags.Staff) !== UserFlags.Staff) {
      throw ErrorMessages.MAZE
    } else {
      return { theme, user, token }
    }
  }
}
