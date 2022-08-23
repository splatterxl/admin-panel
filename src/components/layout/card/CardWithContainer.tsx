import React from "react"
import { Card } from "./Card"
import { CardContainer } from "./CardContainer"

export const FullscreenCard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CardContainer>
      <Card>{children}</Card>
    </CardContainer>
  )
}
