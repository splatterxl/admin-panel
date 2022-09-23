import {
  RESTGetAPICurrentUserGuildsResult,
  Routes,
} from "discord-api-types/v10"
import http from "../util/http"
import Store from "./Store"

export default new (class CurrentUserGuildsStore extends Store<RESTGetAPICurrentUserGuildsResult> {
  constructor() {
    super([], "CurrentUserGuildsStore", true)
  }

  useIDValues() {
    const value = this.useValue()

    return value.map((v) => v.id)
  }

  async fetch(set: ReturnType<CurrentUserGuildsStore["useSetInStorage"]>) {
    const { ok, data } = await http.get<RESTGetAPICurrentUserGuildsResult>(
      Routes.userGuilds()
    )

    if (ok) set(data)
  }
})()
