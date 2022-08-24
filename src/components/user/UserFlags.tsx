import { Flex, IconProps } from "@chakra-ui/react"
import { UserPremiumType } from "discord-api-types/v10"
import React from "react"
import { BotDeveloper } from "../../icons/flags/BotDeveloper"
import { BugHunter, BugHunter2 } from "../../icons/flags/BugHunter"
import { CertifiedMod } from "../../icons/flags/CertifiedMod"
import { EarlySupporter } from "../../icons/flags/EarlySupporter"
import {
  HSBalance,
  HSBravery,
  HSBrilliance,
  HSEvents,
} from "../../icons/flags/HypeSquad"
import { Nitro } from "../../icons/flags/Nitro"
import { PartneredServerOwner } from "../../icons/flags/Partner"
import { Staff } from "../../icons/flags/Staff"

const flags = {
  1: Staff,
  2: PartneredServerOwner,
  4: HSEvents,
  8: BugHunter,
  64: HSBravery,
  128: HSBrilliance,
  256: HSBalance,
  512: EarlySupporter,
  16384: BugHunter2,
  // 65536: "VerifiedBot",
  131072: BotDeveloper,
  262144: CertifiedMod,
}

export const UserFlagsRow: React.FC<
  { bitfield: number; nitro: UserPremiumType } & IconProps
> = ({ bitfield: bits, nitro, ...props }) => {
  return (
    <Flex direction="row" align="center" justify="center">
      {Object.entries(flags)
        .filter(([K]) => (bits & parseInt(K)) === parseInt(K))
        .map(([K, Component]) => (
          <Component key={K} {...props} />
        ))}
      {nitro !== UserPremiumType.None ? <Nitro {...props} /> : null}
    </Flex>
  )
}
