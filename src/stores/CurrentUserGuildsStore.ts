import { APIGuild } from "discord-api-types/v10"
import Store from "./Store"

export default new (class CurrentUserGuildsStore extends Store<APIGuild[]> {
  constructor() {
    super([], "CurrentUserGuildsStore", true)
  }

  useIDValues() {
    const value = this.useValue()

    return value.map((v) => v.id)
  }
})()
