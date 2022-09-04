import Store from "./Store"

export interface ISavedPage {
  icon: string
  name: string
  id: string
  type: SavedPageType
}

export const enum SavedPageType {
  USER,
  GUILD,
}

export default new (class SavedPagesStore extends Store<ISavedPage[]> {
  constructor() {
    super([], "SavedPagesStore", true)
  }
})()
