import { Box, Button, Flex, Icon } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { FaEdit } from "react-icons/fa"
import { GuildFlagsEditModal } from "../modals/GuildFlagsEditModal"
import { _TooltipCard } from "../Tooltip"

export const EditableGuildFeatures: React.FC<{ features: string[] }> = ({
  features,
}) => {
  const [modal, setModalOpen] = React.useState(false),
    router = useRouter()

  return (
    <>
      <Flex direction="row" align="center" justify="center" pl={2}>
        <Box maxW={64} textAlign="center" fontSize="sm" opacity={0.8}>
          {features.join(", ")}
        </Box>
        <Button
          variant="ghost"
          size="xs"
          px={0}
          pt={1}
          _hover={{ bgColor: "transparent" }}
          _active={{ bgColor: "transparent" }}
          onClick={() => setModalOpen(true)}
        >
          <_TooltipCard>
            <Icon as={FaEdit} boxSize="1em" />
          </_TooltipCard>
        </Button>
      </Flex>

      <GuildFlagsEditModal
        onClose={() => setModalOpen(false)}
        open={modal}
        onUpdate={() => router.reload()}
      />
    </>
  )
}
