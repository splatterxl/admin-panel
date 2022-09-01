import { VStack } from "@chakra-ui/react"
import React from "react"
import { MdHomeFilled } from "react-icons/md"
import { MdArchive } from '../../../icons/tabs/Archive';
import { MdReport } from '../../../icons/tabs/Report';
import { MdScriptText } from "../../../icons/tabs/ScriptText"
import { Endpoints } from "../../../util/constants"
import { TabItem } from "./TabItem"

export const Tabs: React.FC = () => {
  return (
    <VStack spacing={1} justify="flex-start" align="flex-start" pl={0}>
      <TabItem
        icon={MdHomeFilled}
        label="Home"
        href={Endpoints.HOME}
        selected
      />
      <TabItem icon={MdScriptText} label="Audit Logs" href={Endpoints.HOME} />
      <TabItem icon={MdArchive} label="Archives" href={Endpoints.HOME} />
      <TabItem icon={MdReport} label="Reports" href={Endpoints.HOME} />
    </VStack>
  )
}
