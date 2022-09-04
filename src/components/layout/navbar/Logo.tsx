import Link from "next/link"
import React, { Dispatch } from "react"
import { PatchcordIcon, PatchcordIconSm } from "../../../icons/Patchcord"
import { Endpoints } from "../../../util/constants"
import { useIsMobile } from "../Container"

export const Logo: React.FC<{
  isOpen: boolean
  setOpen: Dispatch<boolean>
}> = ({ isOpen, setOpen }) => {
  const [isMobile] = useIsMobile(),
    Component = isMobile ? PatchcordIconSm : PatchcordIcon

  const content = (
    <Component
      boxSize="7em"
      width={{ md: 40, base: 8 }}
      height={{ base: 10, md: 14 }}
    />
  )

  if (!isMobile) {
    return (
      <Link href={Endpoints.HOME} passHref>
        <a>{content}</a>
      </Link>
    )
  } else {
    return (
      <a
        onClick={() => {
          setOpen(!isOpen)
        }}
      >
        {content}
      </a>
    )
  }
}
