import {
  APIChannel,
  APIGuild,
  APIGuildChannel,
  GuildDefaultMessageNotifications,
  GuildFeature,
  GuildMFALevel,
  GuildSystemChannelFlags,
  GuildVerificationLevel,
  Snowflake,
} from "discord-api-types/v10"
import React from "react"
import ChannelCache from "../../../stores/cache/ChannelCache"
import FocusedGuildStore from "../../../stores/FocusedGuildStore"
import { cleanup } from "../../../util/object"
import { editGuild } from "../../../util/routes/guilds"
import { notifLevel, systemChanFlags, verifLevel } from "../../../util/simplify"
import { TableData } from "../../layout/table/TableData"
import { ChannelNameLazy } from "../../lazy/ChannelNameLazy"

export const isCommunityGuild = (guild: APIGuild) =>
  guild.features.includes(GuildFeature.Community) ? true : null

const convertDisplayedDictToAPI = (
  dict: Record<string, string>,
  guildId: Snowflake,
  coerceChannel: ReturnType<typeof useCoerceChannel>
) => {
  return {
    name: dict.name,
    preferred_locale: dict.primary_language,
    verification_level: parseVerifLevel(dict.verification_level),
    default_message_notifications: parseNotifLevel(dict.notification_level),
    mfa_level: parseMFALevel(dict.mfa_level),
    max_members: parseIntgr(dict.max_members),
    vanity_url_code: dict.vanity_code === "" ? null : dict.vanity_code,
    widget_channel_id: coerceChannel(dict.widget_channel),
    afk_channel_id: coerceChannel(dict.afk_channel),
    afk_timeout: parseIntgr(dict.afk_timeout),
    system_channel_id: coerceChannel(dict.system_channel),
    system_channel_flags: parseSystemChanFlags(dict.system_channel_flags),
    rules_channel_id: coerceChannel(dict.rules_channel),
    public_updates_channel_id: coerceChannel(dict.updates_channel),
  }
}

export const useCoerceChannel = (guildId: Snowflake) => {
  const value = ChannelCache.useValue()

  return (name: string) => {
    if (name === undefined) return
    else if (name === "") return null

    if (name.startsWith("#") || isNaN(parseInt(name))) {
      name = name.replace(/^#/g, "")

      return [...value.values()].find(
        // @ts-ignore
        (v: APIGuildChannel<any>) =>
          v.name?.toLowerCase() === name && v.guild_id === guildId
      )?.id
    } else {
      if (
        (value.get(name) as unknown as APIGuildChannel<any>)?.guild_id ===
        guildId
      )
        return name
    }
  }
}

export const parseVerifLevel = (level: string) => {
  switch (level?.toLowerCase()) {
    case "very high":
    case "veryhigh":
      return GuildVerificationLevel.VeryHigh
    case "high":
      return GuildVerificationLevel.High
    case "medium":
      return GuildVerificationLevel.Medium
    case "low":
      return GuildVerificationLevel.Low
    case "none":
      return GuildVerificationLevel.None
    default:
      if (typeof GuildVerificationLevel[level as any] === "string") return level
  }
}

export const parseNotifLevel = (level: string) => {
  switch (level?.toLowerCase()) {
    case GuildDefaultMessageNotifications.AllMessages.toString():
    case "allmessages":
    case "all messages":
    case "all":
    case "messages":
      return GuildDefaultMessageNotifications.AllMessages
    case GuildDefaultMessageNotifications.OnlyMentions.toString():
    case "onlymentions":
    case "only mentions":
    case "mentions":
      return GuildDefaultMessageNotifications.OnlyMentions
  }
}

export const parseMFALevel = (level: string) => {
  switch (level?.toLowerCase()) {
    case GuildMFALevel.None.toString():
    case "off":
    case "not required":
    case "no":
    case "none":
      return GuildMFALevel.None
    case "elevated":
    case "required":
    case "yes":
    case "on":
      return GuildMFALevel.Elevated
  }
}

const labelValuePair = (
  id: Snowflake | null | undefined,
  get: (id: Snowflake) => APIChannel | undefined
) => {
  if (id == null) return null

  return {
    value: id,
    label: id ? "#" + get(id)!.name : id,
  }
}

export const parseSystemChanFlags = (str: string) => {
  if (!str) return

  if (["0", "none"].includes(str.toLowerCase())) return 0

  const arr = str.split(",").map((v) => v.trim().toLowerCase())

  if (arr.length === 0) return

  let final =
    GuildSystemChannelFlags.SuppressGuildReminderNotifications |
    GuildSystemChannelFlags.SuppressJoinNotificationReplies |
    GuildSystemChannelFlags.SuppressJoinNotifications |
    GuildSystemChannelFlags.SuppressPremiumSubscriptions

  for (const flag of arr) {
    switch (flag.toLowerCase()) {
      case "joins":
      case "join":
      case "members":
      case "new member":
      case "new members":
      case "join notifs":
      case "join notifications":
        final &= ~GuildSystemChannelFlags.SuppressJoinNotifications
        break
      case "stickers":
      case "reply":
      case "sticker reply":
      case "sticker replies":
      case "sticker":
      case "sticker button":
      case "sticker buttons":
      case "sticker greeting":
      case "sticker greetings":
        final &= ~GuildSystemChannelFlags.SuppressJoinNotificationReplies
        break
      case "setup":
      case "server setup":
      case "reminder":
      case "guild setup":
      case "setup notifications":
      case "setup notif":
      case "setup notifs":
      case "guild setup notifications":
      case "guild setup notifs":
      case "server setup notifs":
      case "server setup notifications":
      case "setup tips":
      case "guild setup tips":
      case "server setup tips":
        final &= ~GuildSystemChannelFlags.SuppressGuildReminderNotifications
        break
      case "boost":
      case "boosts":
      case "premium":
      case "premium subs":
      case "premium subscriptions":
      case "server boost":
      case "server boosts":
        final &= ~GuildSystemChannelFlags.SuppressPremiumSubscriptions
        break
      default: {
        const int = parseInt(flag)

        if (!isNaN(int)) {
          final |= int
        }

        break
      }
    }
  }

  return final
}

const parseIntgr = (str: string) =>
  str ? parseInt(str.replace(/[,._]+/g, "")) : undefined

export const GuildDetails: React.FC = () => {
  const [_data, setData] = FocusedGuildStore.useState(),
    data = _data!,
    isCommunity = isCommunityGuild(data)

  const coerceChannel = useCoerceChannel(data.id)

  const get = ChannelCache.useGet()

  return (
    <TableData
      editable
      title="Details"
      onEdit={async (values) => {
        const newData = cleanup(
          convertDisplayedDictToAPI(values as any, data.id, coerceChannel)
        )

        if (Object.keys(newData).length === 0) return

        await editGuild(data.id, newData).then((data) =>
          setData((prev) => ({ ...prev, ...data }))
        )
      }}
      data={{
        name: data.name,
        primary_language: isCommunity && data.preferred_locale,
        verification_level: verifLevel(data.verification_level),
        notification_level: notifLevel(data.default_message_notifications),
        mfa_level: GuildMFALevel[data.mfa_level] ?? data.mfa_level,
        max_members: data.max_members?.toLocaleString() ?? undefined,
        vanity_code: data.vanity_url_code ?? undefined,
        widget_channel: data.widget_channel_id ? (
          <ChannelNameLazy id={data.widget_channel_id} />
        ) : undefined,
        afk_channel: data.afk_channel_id ? (
          <>
            <ChannelNameLazy id={data.afk_channel_id} /> (
            {data.afk_timeout.toLocaleString()}s)
          </>
        ) : undefined,
        afk_timeout: null,
        system_channel: data.system_channel_id ? (
          <ChannelNameLazy id={data.system_channel_id} />
        ) : undefined,
        system_channel_flags: data.system_channel_id
          ? systemChanFlags(data.system_channel_flags)
          : null,
        rules_channel:
          isCommunity &&
          (data.rules_channel_id ? (
            <ChannelNameLazy id={data.rules_channel_id} />
          ) : undefined),
        updates_channel:
          isCommunity &&
          (data.public_updates_channel_id ? (
            <ChannelNameLazy id={data.public_updates_channel_id} />
          ) : undefined),
      }}
      transformEdit={{
        widget_channel: () => labelValuePair(data.widget_channel_id, get),
        afk_channel: () => labelValuePair(data.afk_channel_id, get),
        afk_timeout: () => data.afk_timeout,
        system_channel: () => labelValuePair(data.system_channel_id, get),
        rules_channel: () => labelValuePair(data.rules_channel_id, get),
        updates_channel: () =>
          labelValuePair(data.public_updates_channel_id, get),
      }}
    />
  )
}
