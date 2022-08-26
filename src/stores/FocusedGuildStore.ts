import { APIGuild } from "discord-api-types/v10"
import { User } from "../util/routes/types"
import Store from "./Store"

export default new (class FocusedGuildStore extends Store<APIGuild, null> {
  constructor() {
    super(null as any, "FocusedGuildStore", false)
  }
})()
