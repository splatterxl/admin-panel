import { Box, Button, Icon, useColorMode } from "@chakra-ui/react"
import React from "react"
import { MdDarkMode, MdLightMode } from "react-icons/md"

export const ThemeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button
      variant="ghost"
      rounded="2xl"
      m={0}
      px={0}
      size="xs"
      _hover={{ bgColor: "transparent" }}
      _active={{
        bgColor: "transparent",
      }}
      onClick={() => {
        toggleColorMode()
      }}
    >
      <Icon
        as={colorMode === "dark" ? MdDarkMode : MdLightMode}
        boxSize="1.6em"
      />
    </Button>
  )
}
