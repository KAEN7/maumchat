import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { page } from "../styles/theme";
import GradientCir from "../components/GradientCir";
import Input from "../components/Input";
import Button from "../components/Button";

function Home() {
	return (
		<React.Fragment>
			<Head>
				<title>MaumChat</title>
			</Head>
			<HomeSection>
				<GradientCir />

				<SignUpSection>
					<Input type="email" placeholder="maumchat@gmail.com" />
					<Input type="password" placeholder="******" />
					<Button>SIGN UP</Button>
				</SignUpSection>
			</HomeSection>
		</React.Fragment>
	);
}

const HomeSection = styled.main`
	${page}

	padding-top: 4rem;
	box-sizing: border-box;
`;

const SignUpSection = styled.form`
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
		margin-top: 2rem;
	}
`;

export default Home;
