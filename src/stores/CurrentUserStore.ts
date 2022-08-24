import { User } from "../util/types"
import Store from "./Store"

export default new (class CurrentUserStore extends Store<User> {
  constructor() {
    super(null as any, "CurrentUserStore", true)
  }
})()
