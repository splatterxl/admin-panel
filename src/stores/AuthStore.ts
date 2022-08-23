import Store from "./Store"

export default new (class AuthStore extends Store<string, null> {
  constructor() {
    super(null, "AuthStore", true)
  }
})()
