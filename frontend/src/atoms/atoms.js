import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const cartState = atom({
  key: "cartStateKey",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const loadingState = atom({
  key: "loadingState",
  default: false,
});

export const userState = atom({
  key: "userStateKey",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
