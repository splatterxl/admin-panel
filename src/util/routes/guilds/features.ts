import { Snowflake } from "discord-api-types/globals"
import { PatchcordRoutes } from "../../constants"
import http from "../../http"

export const FEATURES = {
  1: [
    "Allow purchasing Role Subscriptions",
    "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
  ],
  2: ["Welcome Screen", "WELCOME_SCREEN_ENABLED"],
  3: ["Announcement Channels", "NEWS"],
  4: ["Community", "COMMUNITY"],
  5: ["Member Verification Gate", "MEMBER_VERIFICATION_GATE_ENABLED"],
  6: ["Private Threads", "PRIVATE_THREADS"],
  7: ["Allow server viewing without membership gating", "PREVIEW_ENABLED"],
  // 8: ["7 day thread archive (dead)", "SEVEN_DAY_THREAD_ARCHIVE"],
  // 9: ["Threads enabled (dead)", "THREADS_ENABLED"],
  // 10: ['Threads enabled "TESTING" (dead)', "THREADS_ENABLED_TESTING"],
  // 11: ["3 day thread archive (dead)", "THREE_DAY_THREAD_ARCHIVE"],
  12: ["Vanity URL", "VANITY_URL"],
  13: ["Partnered", "PARTNERED"],
  14: ["Monetization Enabled", "MONETIZATION_ENABLED"],
  15: ["Enable store channels", "COMMERCE"],
  16: ["Animated Server Banner", "ANIMATED_BANNER"],
  17: ["Server Banner", "BANNER"],
  18: ["Role Icons", "ROLE_ICONS"],
  19: ["Animated Server Icon", "ANIMATED_ICON"],
  20: ["Guild Member Profiles", "MEMBER_PROFILES"],
  21: ["VIP Voice Regions", "VIP_REGIONS"],
  22: ["If discovery was once enabled", "ENABLED_DISCOVERABLE_BEFORE"],
  23: ["150 extra emoji slots in each category", "MORE_EMOJI"],
  24: ["Verified", "VERIFIED"],
  26: ["Guild is in a directory channel", "HAS_DIRECTORY_ENTRY"],
  27: ["Invite Background Images", "INVITE_SPLASH"],
  28: ["Visible in Server Discovery", "DISCOVERABLE"],
  29: ["New Thread Permissions", "NEW_THREAD_PERMISSIONS"],
  31: ["Enable Text-in-Voice", "TEXT_IN_VOICE_ENABLED"],
  33: ["Enable Role Subscriptions", "ROLE_SUBSCRIPTIONS_ENABLED"],
  34: ["Force to Boost level 3", "PREMIUM_TIER_3_OVERRIDE"],
  35: ["Student Hub", "HUB"],
  36: ["Add 60 extra sticker slots", "MORE_STICKERS"],
  38: ["Lock server to staff-only", "INTERNAL_EMPLOYEE_ONLY"],
  40: ["Enable Ticketed Events", "TICKETING_ENABLED"],
  42: ["Guild is linked to a hub", "LINKED_TO_HUB"],
}

export const FEATURE_MAP = Object.fromEntries(
  Object.entries(FEATURES).map(([value, [label, id]]) => [
    id,
    { label, value: parseInt(value) },
  ])
)

export const editGuildFeatures = async (id: Snowflake, features: string[]) => {
  const res = await http.patch(PatchcordRoutes.GUILD(id), {
    features: features,
  })

  if (!res.ok) throw new Error(`could not apply features: ${res.err?.message}`)
}
