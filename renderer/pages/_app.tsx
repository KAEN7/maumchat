import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

import Nav from "../components/Nav";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<RecoilRoot>
			<Nav />
			<Component {...pageProps} />
		</RecoilRoot>
	);
};

export default App;
