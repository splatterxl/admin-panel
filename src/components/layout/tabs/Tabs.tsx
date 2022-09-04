import { VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { MdForum, MdHome } from "react-icons/md"
import { MdAccountCancel } from "../../../icons/tabs/AccountCancel"
import { MdAccountMultiple } from "../../../icons/tabs/AccountMultiple"
import { MdArchive } from "../../../icons/tabs/Archive"
import { MdFileLock } from "../../../icons/tabs/FileLock"
import { MdMagnify } from "../../../icons/tabs/Magnify"
import { MdReport } from "../../../icons/tabs/Report"
import { MdScriptText } from "../../../icons/tabs/ScriptText"
import { MdServer } from "../../../icons/tabs/Server"
import { MdTestTube } from "../../../icons/tabs/TestTube"
import { MdTextBoxMultiple } from "../../../icons/tabs/TextBoxMultiple"
import { Endpoints } from "../../../util/constants"
import { TabItem } from "./TabItem"
import { TabSection } from "./TabSection"

// TODO: do all these pages
export const Tabs: React.FC = () => {
  const { pathname } = useRouter()

  return (
    <VStack spacing={3} justify="flex-start" align="flex-start" pl={0}>
      <TabItem
        icon={MdHome}
        label="Home"
        href={Endpoints.HOME}
        selected={pathname === Endpoints.HOME}
      />
      <TabItem
        icon={MdScriptText}
        label="Audit Log"
        href={Endpoints.AUDIT_LOG}
        selected={pathname === Endpoints.AUDIT_LOG}
      />
      <TabItem
        icon={MdArchive}
        label="Archives"
        href={Endpoints.ARCHIVES}
        selected={pathname === Endpoints.ARCHIVES}
      />
      <TabItem
        icon={MdReport}
        label="Reports"
        href={Endpoints.REPORTS}
        selected={pathname === Endpoints.REPORTS}
      />

      <TabSection label="General">
        <TabItem
          icon={MdMagnify}
          label="Search"
          href={Endpoints.SEARCH}
          selected={pathname.startsWith(Endpoints.SEARCH)}
        />
        <TabItem
          icon={MdAccountMultiple}
          label="Users"
          href={Endpoints.USERS}
          selected={pathname.startsWith(Endpoints.USERS)}
        />
        <TabItem
          icon={MdServer}
          label="Guilds"
          href={Endpoints.GUILDS}
          selected={pathname.startsWith(Endpoints.GUILDS)}
        />
        <TabItem
          icon={MdForum}
          label="Messages"
          href={Endpoints.MESSAGES}
          selected={pathname.startsWith(Endpoints.MESSAGES)}
        />
        <TabItem
          icon={MdTextBoxMultiple}
          label="Bulk Actions"
          href={Endpoints.BULK_ACTIONS}
          selected={pathname.startsWith(Endpoints.BULK_ACTIONS)}
        />
        <TabItem
          icon={MdTestTube}
          label="Experiments"
          href={Endpoints.EXPERIMENTS}
          selected={pathname.startsWith(Endpoints.EXPERIMENTS)}
        />
      </TabSection>

      <TabSection label="Internal">
        <TabItem
          icon={MdAccountCancel}
          label="IP Bans"
          href={Endpoints.IP_BANS}
          selected={pathname.startsWith(Endpoints.IP_BANS)}
        />
        <TabItem
          icon={MdFileLock}
          label="ACLs"
          href={Endpoints.ACLS}
          selected={pathname.startsWith(Endpoints.ACLS)}
        />
      </TabSection>

      {/* the rest aren't needed for now */}
    </VStack>
  )
}
