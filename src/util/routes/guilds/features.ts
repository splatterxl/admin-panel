import { Snowflake } from "discord-api-types/globals"
import { editGuild } from "."
import { PatchcordRoutes } from "../../constants"
import http from "../../http"

export const FEATURES = [
  ["Role Subscriptions Available", "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE"],
  ["Welcome Screen", "WELCOME_SCREEN_ENABLED"],
  ["Announcement Channels", "NEWS"],
  ["Community", "COMMUNITY"],
  ["Member Verification Gate", "MEMBER_VERIFICATION_GATE_ENABLED"],
  ["Private Threads", "PRIVATE_THREADS"],
  ["Preview Enabled", "PREVIEW_ENABLED"],
  // ["7 day thread archive (dead)", "SEVEN_DAY_THREAD_ARCHIVE"],
  // ["Threads enabled (dead)", "THREADS_ENABLED"],
  // ['Threads enabled "TESTING" (dead)', "THREADS_ENABLED_TESTING"],
  // ["3 day thread archive (dead)", "THREE_DAY_THREAD_ARCHIVE"],
  ["Vanity URL", "VANITY_URL"],
  ["Partnered", "PARTNERED"],
  ["Monetization Enabled", "MONETIZATION_ENABLED"],
  ["Commerce", "COMMERCE"],
  ["Animated Server Banner", "ANIMATED_BANNER"],
  ["Server Banner", "BANNER"],
  ["Role Icons", "ROLE_ICONS"],
  ["Animated Server Icon", "ANIMATED_ICON"],
  ["Guild Member Profiles", "MEMBER_PROFILES"],
  ["VIP Voice Regions", "VIP_REGIONS"],
  ["Enabled Discoverable Before", "ENABLED_DISCOVERABLE_BEFORE"],
  ["More Emoji", "MORE_EMOJI"],
  ["Verified", "VERIFIED"],
  ["Has Directory Entry", "HAS_DIRECTORY_ENTRY"],
  ["Invite Splash", "INVITE_SPLASH"],
  ["Server Discovery", "DISCOVERABLE"],
  ["New Thread Permissions", "NEW_THREAD_PERMISSIONS"],
  ["Text-in-Voice", "TEXT_IN_VOICE_ENABLED"],
  ["Role Subscriptions", "ROLE_SUBSCRIPTIONS_ENABLED"],
  ["Boost Level 3 Override", "PREMIUM_TIER_3_OVERRIDE"],
  ["Student Hub", "HUB"],
  ["More Stickers", "MORE_STICKERS"],
  ["Employee Only", "INTERNAL_EMPLOYEE_ONLY"],
  ["Ticketed Events", "TICKETING_ENABLED"],
  ["Linked To Hub", "LINKED_TO_HUB"],
]

export const FEATURE_MAP = Object.fromEntries(
  FEATURES.map(([label, id], value) => [id, { label, value }])
)

export const editGuildFeatures = (id: Snowflake, features: string[]) =>
  editGuild(id, { features: features as any })
