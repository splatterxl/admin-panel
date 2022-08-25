import { Flex, IconProps } from "@chakra-ui/react"
import { UserPremiumType } from "discord-api-types/v10"
import React from "react"
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
import { Nitro } from "../../../icons/flags/Nitro"
import { PartneredServerOwner } from "../../../icons/flags/Partner"
import { Staff } from "../../../icons/flags/Staff"
import { Tooltip } from "../../Tooltip"

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

export const UserFlagsRow: React.FC<
  {
    bitfield: number
    nitro: UserPremiumType
    useTooltip?: boolean
    default: React.ReactNode

    compact?: boolean
  } & IconProps
> = ({
  bitfield: bits,
  nitro,
  useTooltip,
  default: defaultNode,
  compact = false,
  ...props
}) => {
  const elems = Object.entries(FLAGS)
    .filter(([K]) => (bits & parseInt(K)) === parseInt(K))
    .map(([K, [Component, label]]) => {
      const elem = <Component key={K} {...props} />

      if (useTooltip)
        return (
          <Tooltip label={label} key={K}>
            {elem}
          </Tooltip>
        )
      else return elem
    })
    .concat(
      nitro
        ? [
            useTooltip ? (
              <Tooltip label="Nitro" key="nitro">
                <Nitro {...props} />
              </Tooltip>
            ) : (
              <Nitro key="nitro" {...props} />
            ),
          ]
        : []
    )

  if (!elems.length) elems.push(<>{defaultNode}</>)

  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      wrap="wrap"
      maxW={!compact ? 36 : undefined}
    >
      {elems}
    </Flex>
  )
}
