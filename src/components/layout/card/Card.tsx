import { Flex } from "@chakra-ui/react"
import { Fullscreen } from "../Fullscreen"

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Fullscreen>
      <Flex
        paddingY={8}
        paddingX={{
          base: 8,
          sm: 7,
        }}
        flexDir="column"
        align="center"
        justify="flex-start"
        rounded={{
          base: "none",
          sm: "xl",
        }}
        shadow="3xl"
        w={{
          base: "full",
          sm: "sm",
          lg: "sm",
        }}
        h={{
          base: "full",
          sm: "sm",
          md: "sm",
        }}
        _dark={{
          bgColor: "gray.800",
          color: "white",
        }}
        _light={{
          bgColor: "gray.100",
          color: "black",
        }}
      >
        {children}
      </Flex>
    </Fullscreen>
  )
}
