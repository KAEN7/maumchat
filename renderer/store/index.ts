import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

// normal
const { persistAtom } = recoilPersist();

export const authInfo = atom({
	key: "authInfo",
	default: {},
	effects_UNSTABLE: [persistAtom],
});

export const toastMessage = atom({
	key: "toastMessage",
	default: "",
	effects_UNSTABLE: [persistAtom],
});

// export const toggleAsideSelector = selector({
// 	key: "toggleAsideSelector",
// 	get: ({ get }) => {
// 		const temp = get(toggleAside);
// 		return temp;
// 	},
// });
