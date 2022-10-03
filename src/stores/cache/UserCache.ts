import { Snowflake } from "discord-api-types/globals"
import { User } from "../../util/routes/types"
import { getUser } from "../../util/routes/users"
import Cache from "./Cache"

export default new (class ChannelCache extends Cache<Snowflake, User> {
  constructor() {
    super("cache:users")
  }

  useGetOrFetch() {
    const [get, has, set] = [this.useGet(), this.useHas(), this.useSet()]

    return async (key: Snowflake): Promise<User> => {
      if (has(key)) {
        return get(key)
      } else {
        return this.fetch(key).then((user) => (set(key, user), user))
      }
    }
  }

  async fetch(key: Snowflake) {
    const data = await getUser(key)

    return data
  }
})()
