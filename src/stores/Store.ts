import {
  atom,
  RecoilState,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil"

export default class Store<T, D = null> {
  _atom: RecoilState<T | D>

  constructor(
    defaultValue: D = null as unknown as D,
    public persisted = false
  ) {
    const key = this.constructor.name
    let initialValue = defaultValue

    if (persisted && typeof window !== "undefined") {
      const val = localStorage.getItem(key)

      if (val == null) {
        localStorage.removeItem(key)
      } else {
        initialValue = JSON.parse(val)
      }
    }

    this._atom = atom<T | D>({
      key: this.constructor.name,
      default: initialValue,
    })
  }

  useValue() {
    const value = useRecoilValue(this._atom)

    return value
  }

  useSetState() {
    const fn = useSetRecoilState(this._atom)

    return fn
  }

  useState() {
    const state = useRecoilState(this._atom)

    return state
  }

  useGetFromStorage() {
    const setState = this.useSetState()

    return (): D | T => {
      let value: any = localStorage.getItem(this.constructor.name)

      if (value != null) value = JSON.parse(value)

      setState(value)

      return value
    }
  }

  useSetInStorage() {
    const setState = this.useSetState()

    return (value: D | T) => {
      if (value == null) localStorage.removeItem(this.constructor.name)
      else localStorage.setItem(this.constructor.name, JSON.stringify(value))

      setState(value)
    }
  }

  useStateFromStorage(): [() => D | T, (value: D | T) => void, D | T] {
    const get = this.useGetFromStorage(),
      set = this.useSetInStorage()

    return [get, set, this.useValue()]
  }
}
