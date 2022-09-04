import { Icon, IconButton } from "@chakra-ui/react"
import Link from "next/link"
import React, { Dispatch } from "react"
import { MdMenu, MdMenuOpen } from "react-icons/md"
import { PatchcordIcon } from "../../../icons/Patchcord"
import { Endpoints, Theme } from "../../../util/constants"
import { useIsMobile } from "../Container"

export const Logo: React.FC<{
  isOpen: boolean
  setOpen: Dispatch<boolean>
}> = ({ isOpen, setOpen }) => {
  const [isMobile] = useIsMobile(),
    Component = isOpen ? MdMenuOpen : MdMenu

  const content = (
    <IconButton
      icon={<Icon as={Component} boxSize={9} />}
      aria-label={
        !isMobile ? "Patchcord logo" : isOpen ? "Close menu" : "Open menu"
      }
      onClick={() => {
        setOpen(!isOpen)
      }}
      variant="ghost"
      size="xs"
      p={0}
      m={0}
      width={{ md: 40, base: 8 }}
      height={{ base: 10, md: 14 }}
      {...Theme.btnTrans}
    />
  )

  if (!isMobile) {
    return (
      <Link href={Endpoints.HOME} passHref>
        <a>
          <Icon as={PatchcordIcon} boxSize="3em" width="full" p={2} />
        </a>
      </Link>
    )
  } else {
    return content
  }
}
