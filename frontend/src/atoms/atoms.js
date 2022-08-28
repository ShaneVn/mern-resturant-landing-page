import { atom } from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const cartState = atom({
    key: "cartStateKey",
    default: [],
    effects_UNSTABLE: [persistAtom],
})


export const userState = atom({
    key: "userStateKey",
    default: null,
})
