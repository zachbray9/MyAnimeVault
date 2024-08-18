import { createContext, useContext } from "react";
import AnimeStore from "./animeStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store{
    commonStore: CommonStore,
    userStore: UserStore,
    animeStore: AnimeStore
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    animeStore: new AnimeStore()
}

export const StoreContext = createContext(store)

export function useStore(){
    return useContext(StoreContext)
}