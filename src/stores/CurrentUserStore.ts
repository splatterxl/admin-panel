import { User } from "../util/routes/types"
import Store from "./Store"

export default new (class CurrentUserStore extends Store<User> {
  constructor() {
    super(null as any, "CurrentUserStore", true)
  }
})()
