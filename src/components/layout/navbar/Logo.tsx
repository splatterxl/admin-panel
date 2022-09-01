import { createIcon, Flex, Heading, HStack, Image } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { PatchcordIcon } from "../../../icons/Patchcord"
import { Endpoints } from "../../../util/constants"

export const Logo: React.FC = () => {
  return (
    <Link href={Endpoints.HOME} passHref>
      <a>
        <PatchcordIcon boxSize="7em" width={40} height={14} />
      </a>
    </Link>
  )
}
