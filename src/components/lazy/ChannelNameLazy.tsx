import React from "react"
import ChannelCache from "../../stores/cache/ChannelCache"
import { Loading } from "../Loading"

export const ChannelNameLazy: React.FC<{ id: string }> = ({ id }) => {
  const get = ChannelCache.useGet(),
    set = ChannelCache.useSet(),
    [name, setName] = React.useState<null | undefined | string>(null)

  React.useEffect(() => {
    ;(async () => {
      let data = get(id)

      data ??
        (await ChannelCache.fetch(id).then((data) => {
          set(id, data)
          return data
        }))

      setName(data?.name)
    })()
  })

  if (!name) return <Loading size="xs" />
  else return <>#{name}</>
}
