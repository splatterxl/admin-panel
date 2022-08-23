import { APIUser } from "discord-api-types/v10"
import Store from "./Store"

export default new (class CurrentUserStore extends Store<APIUser, APIUser> {
  constructor() {
    super(null as any, 'CurrentUserStore', true)
  }
})()
