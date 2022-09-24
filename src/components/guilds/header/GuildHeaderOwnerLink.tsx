import { Icon } from "@chakra-ui/react"
import { Snowflake } from "discord-api-types/globals"
import { Dispatch } from "react"
import { MdEdit } from "react-icons/md"
import { themed } from "../../../util/constants"
import { GhostButton } from "../../GhostButton"
import { Field } from "../../layout/Field"
import { UserLink } from "../../user/UserLink"

export const GuildHeaderOwnerLink: React.FC<{
  owner_id: Snowflake
  setOpen: Dispatch<boolean>
}> = ({ owner_id, setOpen }) => {
  console.log(owner_id)
  return (
    <Field
      name="Owner"
      action={
        <GhostButton
          size="xx-small"
          onClick={() => {
            setOpen(true)
          }}
          aria-label="Transfer Ownership"
        >
          <Icon
            as={MdEdit}
            boxSize="0.7em"
            {...themed("fill", "header_secondary")}
          />
        </GhostButton>
      }
    >
      <UserLink id={owner_id} />
    </Field>
  )
}
