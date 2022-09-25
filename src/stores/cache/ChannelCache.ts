import { Snowflake } from "discord-api-types/globals"
import { APIChannel } from "discord-api-types/v10"
import { getChannel } from "../../util/routes/channels"
import Cache from "./Cache"

export default new (class ChannelCache extends Cache<Snowflake, APIChannel> {
  constructor() {
    super("cache:channels")
  }

  useGetOrFetch() {
    const [get, has, set] = [this.useGet(), this.useHas(), this.useSet()]

    return async (key: Snowflake) => {
      if (has(key)) {
        return get(key)
      } else {
        return this.fetch(key)
      }
    }
  }

  async fetch(key: Snowflake) {
    const data = await getChannel(key)

    return data
  }
})()
