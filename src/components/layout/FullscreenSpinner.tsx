import { Spinner } from "@chakra-ui/react"
import React from "react"
import { Colors } from "../../util/constants"
import { Fullscreen } from "./Fullscreen"

export const FullscreenSpinner: React.FC<{ bg?: boolean }> = ({ bg }) => (
  <Fullscreen bg={bg}>
    <Spinner size="lg" />
  </Fullscreen>
)
