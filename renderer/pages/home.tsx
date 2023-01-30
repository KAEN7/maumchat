import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { color, page } from "../styles/theme";
import { auth } from "../lib/firebaseconfig";
import { useRouter } from "next/router";

import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from "firebase/auth";

import GradientCir from "../components/GradientCir";
import Input from "../components/Input";
import Button from "../components/Button";
import { useRecoilState } from "recoil";

import { authInfo, toastMessage } from "../store";

function Home() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [_, setAuth] = useRecoilState(authInfo);
	const [message, setMessage] = useRecoilState(toastMessage);

	const router = useRouter();

	const signUpHandler = async () => {
		try {
			const { user }: any = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const { stsTokenManager, uid } = user;
			setAuth({ uid, email, authToken: stsTokenManager });
			router.push("/chatRoom");
			setMessage("회원가입되셨습니다");
		} catch (err) {
			console.error("SignUp ERROR: ", err.message);
			setMessage(err.message.replace("Firebase: ", ""));
		}
	};

	const signInHandler = async () => {
		try {
			const { user }: any = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const { stsTokenManager, uid } = user;
			setAuth({ uid, email, authToken: stsTokenManager });
			router.push("/chatRoom");
		} catch ({ code, message }) {
			console.error("SignIn ERROR: ", message);
			setMessage(message.replace("Firebase: ", ""));
		}
	};

	return (
		<React.Fragment>
			<Head>
				<title>MaumChat</title>
			</Head>
			<HomeSection>
				<GradientCir />

				<SignSection>
					<Input
						type="email"
						placeholder="maumchat@gmail.com"
						onChange={(e: any) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="******"
						onChange={(e: any) => setPassword(e.target.value)}
					/>
					<Button color={color.point} onClick={signUpHandler}>
						SIGN UP
					</Button>
					<Button color={color.darkPoint} onClick={signInHandler}>
						SIGN IN
					</Button>
				</SignSection>
			</HomeSection>
		</React.Fragment>
	);
}

const HomeSection = styled.main`
	${page}

	padding-top: 6rem;
	box-sizing: border-box;
`;

const SignSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 9rem;
	margin-top: 3rem;

	input {
		margin-bottom: 1rem;
	}

	button {
		margin-top: 1rem;
	}
`;

export default Home;
