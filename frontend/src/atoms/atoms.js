import { atom } from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const cartState = atom({
    key: "cartItemsState",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

