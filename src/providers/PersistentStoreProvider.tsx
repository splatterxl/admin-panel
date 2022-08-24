import React from "react"
import { SetterOrUpdater, useSetRecoilState } from "recoil"
import { FullscreenSpinner } from '../components/layout/FullscreenSpinner';
import AuthStore from "../stores/AuthStore"
import CurrentUserStore from "../stores/CurrentUserStore"
import {
  RecentlyViewedGuildsStore,
  RecentlyViewedUsersStore,
} from "../stores/RecentlyViewedStore"
import Store from "../stores/Store"

const persistentStores = [
  AuthStore,
  CurrentUserStore,
  RecentlyViewedGuildsStore,
  RecentlyViewedUsersStore,
]

export const PersistentStoreProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isAllLoaded, setLoaded] = React.useState(false),
    storesWithDispatcher: [SetterOrUpdater<any>, Store<any>][] =
      persistentStores.map((v: Store<any>) => [useSetRecoilState(v._atom), v])

  React.useEffect(() => {
    for (const [setState, v] of storesWithDispatcher) {
      v._getFromStorage(setState)
    }

    setLoaded(true)
  }, [storesWithDispatcher])

  if (!isAllLoaded) return <FullscreenSpinner />

  return <>{children}</>
}
