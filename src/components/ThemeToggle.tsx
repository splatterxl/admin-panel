import { Box, Button, Icon, useColorMode } from "@chakra-ui/react"
import React from "react"
import { MdDarkMode, MdLightMode } from "react-icons/md"

export const ThemeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box pos="absolute" top={0} right={0} m={1}>
      <Button
        variant="ghost"
        rounded="2xl"
        m={1}
        size="sm"
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
          boxSize="1.1em"
        />
      </Button>
    </Box>
  )
}
