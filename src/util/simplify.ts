import {
  GuildDefaultMessageNotifications,
  GuildSystemChannelFlags,
  GuildVerificationLevel,
} from "discord-api-types/v10"

export const verifLevel = (level: GuildVerificationLevel) => {
    switch (level) {
      case GuildVerificationLevel.VeryHigh:
        return "Very high"
      default:
        return GuildVerificationLevel[level] ?? level
    }
  },
  notifLevel = (level: GuildDefaultMessageNotifications) => {
    switch (level) {
      case GuildDefaultMessageNotifications.AllMessages:
        return "All messages"
      case GuildDefaultMessageNotifications.OnlyMentions:
        return "Only mentions"
      default:
        return GuildDefaultMessageNotifications[level] ?? level
    }
  },
  systemChanFlags = (flags: GuildSystemChannelFlags) => {
    return Object.entries(GuildSystemChannelFlags)
      .filter(([k, v]: [string | number, string | GuildSystemChannelFlags]) => {
        if (typeof k === "string") {
          const bit = v as GuildSystemChannelFlags

          if ((flags & bit) !== bit) return true
          else return false
        } else {
          return true
        }
      })
      .map(([, v]) => {
        switch (v) {
          case GuildSystemChannelFlags.SuppressGuildReminderNotifications:
            return "Setup Tips"
          case GuildSystemChannelFlags.SuppressJoinNotificationReplies:
            return "Sticker Greetings"
          case GuildSystemChannelFlags.SuppressJoinNotifications:
            return "Join Notifications"
          case GuildSystemChannelFlags.SuppressPremiumSubscriptions:
            return "Boosts"
        }
      })
      .filter((v) => v)
      .join(", ")
  }
