import { Button, ButtonProps } from "@chakra-ui/react"
import React from "react"

export const GhostButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="ghost"
      bgColor="transparent"
      _hover={{ bgColor: "transparent" }}
      _active={{ bgColor: "transparent" }}
      {...props}
    />
  )
}
