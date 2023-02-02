import { FirebaseError } from "firebase/app";
import { doc, FieldValue, getDoc, setDoc, Timestamp } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Title from "../../components/Title";
import { db } from "../../lib/firebaseconfig";
import { authInfo, toastMessage } from "../../store";
import { color, overflowY, page } from "../../styles/theme";

const ChatPage = () => {
	const [authI, setAuth] = useRecoilState(authInfo);
	const [_, setMessage] = useRecoilState(toastMessage);
	const [msg, setMsg] = useState("");
	const [info, setInfo] = useState<any>({});
	const [chat, setChat] = useState<any>({});

	const router = useRouter();
	const { id } = router.query;

	const onSendMessage = async (e) => {
		e.preventDefault();

		try {
			const email = authI.email.split("@")[0];
			const chatUpdate = { ...info };

			chatUpdate.chat[Number(id)].content.push({
				name: email,
				message: msg,
				timestamp: Timestamp.fromDate(new Date()),
			});

			await setDoc(doc(db, "users", email), {
				email: authI.email,
				friends: info.friends,
				chat: chatUpdate.chat,
			});
		} catch (err) {
			console.error("SendMsg ERROR:", err);
		}

		setMsg("");
	};

	const getChats = async () => {
		try {
			const comments = doc(db, "users", authI.email.split("@")[0]);
			const commentsSnapshot = await getDoc(comments);

			if (!commentsSnapshot.exists()) {
				setMessage("채팅 내역이 없습니다");
			}

			setInfo(commentsSnapshot.data());
			setChat(commentsSnapshot.data().chat[Number(id)]);
		} catch (err) {
			console.error("getChats ERROR:", err);
			setMessage("채팅을 불러오는 도중 에러가 발생했습니다");
		}
	};

	useEffect(() => {
		getChats();
	}, [onSendMessage]);

	return (
		<>
			<ChatPageBox>
				<Title>
					{chat?.group && (
						<Image src="/icons/openChat.png" width={16} height={16} />
					)}
					{chat?.title}
				</Title>
				<ChatLog>
					{chat?.content?.map((item, idx) => (
						<ChatMessage
							key={`msg${idx}`}
							me={authI.email.split("@")[0] === item.name}
						>
							{chat?.group && <h4>{item.name}</h4>}
							<span>{item.message}</span>
						</ChatMessage>
					))}
				</ChatLog>
				<ChatInput onSubmit={(e) => onSendMessage(e)}>
					<input
						onChange={(e) => setMsg(e.target.value)}
						placeholder="채팅을 입력해주세요"
						autoFocus
						value={msg}
					/>
					<button onClick={(e) => onSendMessage(e)}></button>
				</ChatInput>
			</ChatPageBox>
		</>
	);
};

const ChatPageBox = styled.div`
	${page}

	position: relative;
`;

const ChatLog = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 80%;
	width: 100%;
	${overflowY}
`;

interface ChatMessage {
	color: string;
	me: boolean;
}

const ChatMessage = styled.li`
	display: flex;
	flex-direction: column;
	align-items: ${(props) => (props.me ? "flex-end" : "flex-start")};
	width: 100%;
	margin-bottom: 1rem;
	color: ${color.black};

	h4 {
		color: ${color.white};
		margin: 0;
		padding: 0;
	}

	span {
		width: 60%;
		max-width: 70%;
		background: ${(props) => (props.me ? color.point : color.white)};
		padding: 0.5rem;
		border-radius: 7px;
	}
`;

const ChatInput = styled.form`
	display: flex;
	position: absolute;
	bottom: 0;
	width: 100%;

	input {
		width: 100%;
		outline: none;
		border: none;
		padding-left: 1rem;
		color: ${color.white};
		background: none;
	}

	button {
		min-width: 2rem;
		min-height: 2rem;
		width: 2rem;
		height: 2rem;
		background: ${color.point};
		border-radius: 8px;
		box-shadow: 0px 1px 3px ${color.point};
		transition: all 0.6s ease 0s;
		margin: 1rem;

		&:hover {
			transform: translateY(-4px);
			box-shadow: 0px 1px 9px ${color.point};
		}
	}
`;

export default ChatPage;
