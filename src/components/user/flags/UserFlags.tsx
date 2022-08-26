import { Flex, IconProps } from "@chakra-ui/react"
import { UserPremiumType } from "discord-api-types/v10"
import React from "react"
import { Nitro } from "../../../icons/flags/Nitro"
import { FLAGS } from "../../../util/routes/users/flags"
import { Tooltip } from "../../Tooltip"

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

  if (!elems.length)
    elems.push(<React.Fragment key="__default">{defaultNode}</React.Fragment>)

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
