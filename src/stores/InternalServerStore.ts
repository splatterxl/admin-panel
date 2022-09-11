import { Snowflake } from "discord-api-types/v10"
import Store from "./Store"

export interface IInternalServer {
  name: string
  id: Snowflake
  icon: string | null
}

export default new (class InternalServerStore extends Store<IInternalServer[]> {
  constructor() {
    super([], "InternalServerStore", true)
  }
})()
