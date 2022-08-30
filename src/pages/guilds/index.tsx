import { useSearchbarFocus } from "../../util/focus"
import Search from "../search"

export default function Guilds() {
  useSearchbarFocus()

  return Search("", "2")
}
