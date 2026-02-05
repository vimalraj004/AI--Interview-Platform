import { useSyncExternalStore } from "react"
import { FormDataStore } from "./FormDataStore"

export const useGlobalStore=()=> {
    return useSyncExternalStore(
        FormDataStore.subscribe,
        FormDataStore.getsnapshot,

    )
}