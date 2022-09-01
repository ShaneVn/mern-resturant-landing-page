import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const cartState = atom({
  key: "cartStateKey",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const modalState = atom({
  key: "modalStateKey",
  default: false,
});

export const orderNumberState = atom({
  key: "orderNumberStateKey",
  default: false,
});

export const loadingState = atom({
  key: "loadingStateKey",
  default: false,
});

export const userState = atom({
  key: "userStateKey",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
