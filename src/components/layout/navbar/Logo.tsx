import Link from "next/link"
import React from "react"
import { PatchcordIcon, PatchcordIconSm } from "../../../icons/Patchcord"
import { Endpoints } from "../../../util/constants"
import { useIsMobile } from "../Container"

export const Logo: React.FC = () => {
  const [isMobile] = useIsMobile(),
    Component = isMobile ? PatchcordIconSm : PatchcordIcon

  return (
    <Link href={Endpoints.HOME} passHref>
      <a>
        <Component
          boxSize="7em"
          width={{ md: 40, base: 8 }}
          height={{ base: 10, md: 14 }}
        />
      </a>
    </Link>
  )
}
