import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { overflowY, page } from "../../styles/theme";
import Title from "../../components/Title";
import ChatRoom from "./ChatRoom";
import { useRouter } from "next/router";

import tempDB from "../../lib/tempDB.json";
import { db } from "../../lib/firebaseconfig";
import { useRecoilState } from "recoil";
import { authInfo, toastMessage } from "../../store";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

const Index = () => {
	const router = useRouter();
	const [authI, setAuth] = useRecoilState(authInfo);
	const [chats, setChats] = useState([]);
	const [_, setMessage] = useRecoilState(toastMessage);

	const getChats = async () => {
		try {
			const comments = doc(db, "users", authI.email.split("@")[0]);
			const commentsSnapshot = await getDoc(comments);

			if (!commentsSnapshot.exists()) {
				setMessage("채팅 내역이 없습니다");
			}

			setChats(commentsSnapshot.data().chat ?? []);
		} catch (err) {
			console.error("getChats ERROR:", err);
			setMessage("채팅을 불러오는 도중 에러가 발생했습니다");
		}
	};

	useEffect(() => {
		getChats();
	}, []);

	return (
		<CharRoomSection>
			<Title>채팅</Title>
			<ChatList>
				{chats.map((chat, idx) => (
					<ChatRoom
						onClick={() => router.push(`/chatList/${idx}`)}
						key={`chatroom_${chat.title}`}
						chat={chat}
					></ChatRoom>
				))}
			</ChatList>
		</CharRoomSection>
	);
};

const CharRoomSection = styled.section`
	${page}
`;

const ChatList = styled.ul`
	display: flex;
	flex-direction: column;
	width: 100%;

	${overflowY}
`;

export default Index;
