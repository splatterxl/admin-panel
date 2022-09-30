import React from "react"
import ChannelCache from "../../stores/cache/ChannelCache"
import { Loading } from "../Loading"

export const ChannelNameLazy: React.FC<{ id: string }> = ({ id }) => {
  const data = ChannelCache.useItem(id)!

  if (!data) return <Loading size="xs" />
  else return <>#{data.name}</>
}
