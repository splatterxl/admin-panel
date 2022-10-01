import { Avatar, Icon } from "@chakra-ui/react"
import { MdErrorOutline } from "react-icons/md"
import { MdAccountMultiple } from "../../../icons/tabs/AccountMultiple"
import { MdServer } from "../../../icons/tabs/Server"
import { ISavedPage, SavedPageType } from "../../../stores/SavedPagesStore"
import { GuildIcon } from "../../guilds/GuildIcon"
import { TableRow } from "../../layout/table/rows/TableRow"
import { UserAvatar } from "../../users/UserAvatar"

export const getTypeIconForPage = (type: SavedPageType) => {
  switch (type) {
    case SavedPageType.USER:
      return MdAccountMultiple
    case SavedPageType.GUILD:
      return MdServer
    default:
      return MdErrorOutline
  }
}

export const getPageAvatar = (page: ISavedPage) => {
  switch (page.type) {
    case SavedPageType.USER:
      return <UserAvatar id={page.id} hash={page.icon} alt={page.name} />
    case SavedPageType.GUILD:
      return (
        <GuildIcon id={page.id} hash={page.icon} name={page.name} size="sm" />
      )
    default:
      return <Avatar name={page.name} size="sm" />
  }
}

export const getIconForPage = (page: ISavedPage) => {
  return (
    <>
      <Icon as={getTypeIconForPage(page.type)} />
      {getPageAvatar(page)}
    </>
  )
}

export const SavedPage: React.FC<ISavedPage> = (page) => {
  return <TableRow icon={getIconForPage(page)}>{page.name}</TableRow>
}
