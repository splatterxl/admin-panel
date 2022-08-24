import { User } from "../util/types"
import Store from "./Store"

export default new (class FocusedUserStore extends Store<User, null> {
  constructor() {
    super(null as any, "FocusedUserStore", false)
  }
})()
