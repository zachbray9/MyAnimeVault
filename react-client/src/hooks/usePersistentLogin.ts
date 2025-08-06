import { useQuery } from "@tanstack/react-query";
import { myApiAgent } from "../api/myApiAgent";
import { useEffect } from "react";
import { store } from "../stores/store";

export default function usePersistentLogin() {
    const { data, isSuccess, isError } = useQuery({
        queryKey: ["getCurrentUser"],
        queryFn: myApiAgent.Auth.getCurrentUser,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if(isSuccess && data?.user) {
            store.userStore.setUser(data.user ?? null)
            store.commonStore.setAppLoaded(true)
        }
    }, [isSuccess, data])

    useEffect(() => {
        if(isError) {
            store.userStore.clearUser()
            store.commonStore.setAppLoaded(true)
        }
    }, [isError])
}