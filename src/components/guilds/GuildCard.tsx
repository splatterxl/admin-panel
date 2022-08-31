import { Flex, FlexProps } from "@chakra-ui/react"
import { APIGuild } from "discord-api-types/v10"
import Link from "next/link"
import { Endpoints } from "../../util/constants"
import { Hr } from "../user/UserCard"
import { EditableGuildFeatures } from "./EditableGuildFeatures"
import { GuildDescription } from "./GuildDescription"
import { GuildFeatures } from "./GuildFeatures"
import { GuildIcon } from "./GuildIcon"
import { GuildName } from "./GuildName"

export const GuildCard: React.FC<
  { d: APIGuild; compact?: boolean } & FlexProps
> = ({ d, compact = false, ...props }) => {
  const content = (
    <Flex
      as={compact ? "a" : undefined}
      width={compact ? "full" : "auto"}
      direction={compact ? "row" : "column"}
      alignItems="center"
      justify="flex-start"
      paddingTop={compact ? 2 : 4}
      paddingBottom={compact ? 3 : 4}
      paddingX={compact ? 4 : 6}
      gap={compact ? 4 : 2}
      borderRadius="lg"
      borderWidth={1}
      _light={{
        bgColor: "gray.100",
        borderColor: "gray.300",
      }}
    >
      <GuildIcon d={d} />
      <Flex
        direction="column"
        justify="flex-start"
        align={compact ? "flex-start" : "center"}
        w={!compact ? "full" : "fit-content"}
        as="section"
      >
        <GuildName
          name={d.name}
          features={d.features}
          id={d.id}
          compact={compact}
        />
        <Hr mb={compact ? 1 : 2} mt={1} w={compact ? 52 : "60%"} />
        <GuildDescription description={d.description!} compact={compact} />
        {!compact ? (
          <>
            <Hr mb={compact ? 1 : 2} mt={1} w={compact ? 52 : "60%"} />
            <EditableGuildFeatures features={d.features} />
          </>
        ) : (
          <GuildFeatures features={d.features} />
        )}{" "}
      </Flex>
    </Flex>
  )

  if (compact)
    return (
      <Link href={Endpoints.GUILD(d.id)} passHref>
        {content}
      </Link>
    )
  else return <>{content}</>
}
