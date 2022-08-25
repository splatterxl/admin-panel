import { Button, Flex, Icon } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { FaEdit } from "react-icons/fa"
import { User } from "../../../util/routes/types"
import { UserFlagsEditModal } from "../../modals/UserFlagsEditModal"
import { _TooltipCard } from "../../Tooltip"
import { UserFlagsRow } from "./UserFlags"

export const EditableUserFlags: React.FC<{ d: User; default: string }> = ({
  d,
}) => {
  const [modal, setModalOpen] = React.useState(false),
    router = useRouter()

  return (
    <>
      <Flex direction="row" align="center" justify="center" pl={2}>
        <UserFlagsRow
          default="No flags"
          bitfield={d.flags!}
          nitro={d.premium_type!}
          useTooltip
          compact={false}
        />
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
      <UserFlagsEditModal
        onClose={() => setModalOpen(false)}
        open={modal}
        onUpdate={() => {
          router.reload()
        }}
      />
    </>
  )
}
