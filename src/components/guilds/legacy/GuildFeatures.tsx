import { Box } from "@chakra-ui/react"

export const GuildFeatures: React.FC<{ features: string[] }> = ({
  features,
}) => {
  return (
    <Box maxW={64} textAlign="center" fontSize="sm" opacity={0.8}>
      {features.join(", ")}
    </Box>
  )
}
