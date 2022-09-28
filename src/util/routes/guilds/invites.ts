import { APIInvite, Routes } from "discord-api-types/v10"
import http from "../../http"

export const getInvite = (invite: string) =>
  http.get<APIInvite>(Routes.invite(invite)).then((res) => res.data)
