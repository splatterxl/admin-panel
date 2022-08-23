import { Spinner } from "@chakra-ui/react"
import React from "react"
import { Fullscreen } from "./Fullscreen"

export const FullscreenSpinner: React.FC = () => (
  <Fullscreen>
    <Spinner size="lg" />
  </Fullscreen>
)
