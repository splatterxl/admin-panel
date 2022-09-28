import { APIGuild, GuildFeature } from "discord-api-types/v10"
import React from "react"
import FocusedGuildStore from "../../../stores/FocusedGuildStore"
import { editGuildFeatures } from "../../../util/routes/guilds/features"
import { TableData } from "../../layout/table/TableData"

export const GuildFeatures: React.FC = () => {
  const [data, setData] = FocusedGuildStore.useState(),
    [features, setFeatures] = React.useState(data!.features)

  React.useEffect(() => {
    setFeatures(data!.features)
  }, [data, data?.features])

  return (
    <TableData
      editable
      onEdit={async (values: string[]) => {
        const features = values
          .filter((v: string) => !!v.length)
          .map((v) =>
            v
              .toUpperCase()
              .replace(/\s+/g, "_")
              .replace(/[^a-zA-Z0-9_]/g, "")
          ) as GuildFeature[]

        await editGuildFeatures(data!.id, features)

        setData((prev) => ({ ...prev, features } as APIGuild))
      }}
      onItemAdd={() => {
        setFeatures((prev) => prev.concat(["" as GuildFeature]))
      }}
      onItemRemove={(key) => {
        setFeatures((prev) => prev.filter((_, i) => i.toString() !== key))
      }}
      data={features}
      title="Features"
    />
  )
}
