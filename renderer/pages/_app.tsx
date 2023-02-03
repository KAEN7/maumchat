import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

import Nav from "../components/Nav";
import Toast from "../components/Toast";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<RecoilRoot>
			<Toast />
			<Nav />
			<Component {...pageProps} />
		</RecoilRoot>
	);
};

export default App;
