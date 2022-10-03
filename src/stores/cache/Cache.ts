import Store from "../Store"

// thank recoil for making me do this clusterfuck
export default abstract class Cache<K, V, O = false> extends Store<
  // @ts-ignore
  O extends true ? Record<K, V> : Map<K, V>
> {
  constructor(name: string, persisted = false, public obj = false) {
    super(obj ? Object.create(null) : new Map(), name, persisted)
  }

  useGet() {
    const value = this.useValue()

    // @ts-ignore
    return (k: K) => (this.obj ? value[k] : value.get(k))
  }

  useHas() {
    const value = this.useValue()

    return (k: K) =>
      // @ts-ignore
      this.obj ? Object.prototype.hasOwnProperty.call(value, k) : value.has(k)
  }

  useSet() {
    const [value, set] = this.useState()

    return (k: K, v: V) =>
      // @ts-ignore
      set(this.obj ? { ...value, [k]: v } : value.set(k, v))
  }

  useDelete() {
    const [value, set] = this.useState()

    return (k: K) => {
      // @ts-ignore
      this.obj ? delete value[k] : value.delete(k)

      set(value)
    }
  }

  useItem(k: K) {
    const get = this.useGet()

    return get(k)
  }

  abstract fetch(k: K): Promise<V>
}
