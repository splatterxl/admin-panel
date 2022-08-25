import { APIGuild } from "discord-api-types/v10"
import { User } from "../util/routes/types"
import Store from "./Store"

class RecentlyViewedStore<T extends APIGuild | User> extends Store<
  { data: T; lastViewedTimestamp: number }[]
> {
  constructor(name: string) {
    super([], `recently_viewed:${name}`, true)
  }

  useAdd(): (value: T) => void {
    const set = this.useSetInStorage(),
      getFromStorage = this.useGetFromStorage()

    return (value) => {
      const stored = Array.from(getFromStorage() ?? []),
        existing = stored.findIndex(({ data: { id } }) => id === value.id)

      if (existing !== -1) {
        stored[existing] = {
          data: value,
          lastViewedTimestamp: Date.now(),
        }
      } else {
        stored.unshift({
          data: value,
          lastViewedTimestamp: Date.now(),
        })
      }

      set(
        stored
          .sort(
            ({ lastViewedTimestamp: a }, { lastViewedTimestamp: b }) => b - a
          )
          .slice(25)
      )
    }
  }
}

export const RecentlyViewedGuildsStore = new RecentlyViewedStore<APIGuild>(
    "guilds"
  ),
  RecentlyViewedUsersStore = new RecentlyViewedStore<User>("users")
