import { Snowflake } from "discord-api-types/globals"
import { BotDeveloper } from "../../../icons/flags/BotDeveloper"
import { BugHunter, BugHunter2 } from "../../../icons/flags/BugHunter"
import { CertifiedMod } from "../../../icons/flags/CertifiedMod"
import { EarlySupporter } from "../../../icons/flags/EarlySupporter"
import {
  HSBalance,
  HSBravery,
  HSBrilliance,
  HSEvents,
} from "../../../icons/flags/HypeSquad"
import { PartneredServerOwner } from "../../../icons/flags/Partner"
import { Staff } from "../../../icons/flags/Staff"
import { PatchcordRoutes } from "../../constants"
import http from "../../http"

export const FLAGS = {
  1: [Staff, "Staff", "staff"],
  2: [PartneredServerOwner, "Partnered Server Owner", "partner"],
  4: [HSEvents, "HypeSquad Events", "hse"],
  8: [BugHunter, "Bug Hunter", "spoon"],
  16384: [BugHunter2, "Bug Hunter Level 2", "yellow_spoon"],
  64: [HSBravery, "Bravery", "bravery"],
  128: [HSBrilliance, "Brilliance", "brilliance"],
  256: [HSBalance, "Balance", "balance"],
  512: [EarlySupporter, "Early Supporter", "supporter"],
  // 65536: "VerifiedBot",
  131072: [BotDeveloper, "Verified Bot Developer", "bot_dev"],
  262144: [CertifiedMod, "Certified Moderator", "mod"],
} as const

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
