import { Snowflake } from "discord-api-types/globals"
import { FLAGS } from "../../../components/user/flags/UserFlags"
import { PatchcordRoutes } from "../../constants"
import http from "../../http"

export const FLAG_MAP = Object.fromEntries(
  Object.entries(FLAGS).map(([value, [icon, label, id]]) => [
    id,
    { label, value: parseInt(value), icon },
  ])
)

export const editUserFlags = async (id: Snowflake, flags: number) => {
  const res = await http.patch(PatchcordRoutes.USER(id), {
    flags: flags.toString(),
  })

  if (!res.ok) throw new Error(`could not apply flags: ${res.err?.message}`)
}

export function keyObjectToBitfield(
  keyObj: Record<keyof typeof FLAG_MAP, `${boolean}` | "">,
  initial: number
) {
  let bitfield = 0

  for (const [K, V] of Object.entries(keyObj)) {
    const value = FLAG_MAP[K].value,
      isSet = V === "true"

    if (V === "") {
      if (initial & value) {
        bitfield |= value
      }

      continue
    }

    if (isSet) {
      bitfield |= value
    } else {
      bitfield &= ~value
    }
  }

  return bitfield
}

export function getFlagKeyObj(bitfield: number) {
  const obj: any = {}

  for (const [K, { value }] of Object.entries(FLAG_MAP)) {
    if (bitfield & value) obj[K] = true
    else obj[K] = false
  }

  return obj
}
