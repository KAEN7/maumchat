import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { authInfo, toastMessage } from "../store";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebaseconfig";
import { color, overflowY, page, Thumb } from "../styles/theme";
import Title from "../components/Title";
import { useRouter } from "next/router";

function UserList() {
	const [authI, setAuth] = useRecoilState(authInfo);
	const [_, setMessage] = useRecoilState(toastMessage);
	const [chats, setChats] = useState([]);
	const [friends, setFriends] = useState([]);

	const router = useRouter();

	const onSendMessage = async (friend) => {
		let haveFriend = false;

		chats.forEach(
			(chat, idx) =>
				chat.title === friend &&
				(router.push(`/chatList/${idx}`), (haveFriend = true))
		);

		if (!haveFriend) {
			try {
				const email = authI.email.split("@")[0];
				const chatUpdate = [...chats];

				chatUpdate.push({
					title: friend,
					group: false,
					content: [],
				});

				await setDoc(doc(db, "users", email), {
					email: authI.email,
					friends: friends,
					chat: chatUpdate,
				});

				await router.push(`/chatList/${chats.length}`);
			} catch (err) {
				console.error("Redirect Chat ERROR:", err);
			}
		}
	};

	const getUserList = async () => {
		try {
			const comments = doc(db, "users", authI.email.split("@")[0]);
			const commentsSnapshot = await getDoc(comments);

			if (!commentsSnapshot.exists()) {
				setMessage("채팅 내역이 없습니다");
			}

			setChats(commentsSnapshot.data().chat ?? []);
			setFriends(commentsSnapshot.data().friends ?? []);
		} catch (err) {
			console.error("getUserList ERROR:", err);
			setMessage("유저 목록을 불러오던중 에러가 발생했습니다");
		}
	};

	useEffect(() => {
		getUserList();
	}, []);

	return (
		<UserListSection>
			<Title>친구</Title>
			<FriendsList>
				<span className="count">전체 친구 {friends.length}</span>
				{friends.map((friend) => (
					<li
						onClick={() => onSendMessage(friend)}
						key={`friend name is ${friend}`}
					>
						<span className="thumb">{friend.slice(0, 1).toUpperCase()}</span>
						<span className="name">{friend}</span>
					</li>
				))}
			</FriendsList>
		</UserListSection>
	);
}

const UserListSection = styled.section`
	${page}
`;

const FriendsList = styled.ul`
	${overflowY};
	width: 100%;
	margin-top: 2rem;

	.count {
		width: 100%;
	}

	li {
		display: flex;
		align-items: center;
		width: 100%;
		height: 5rem;
		min-height: 5rem;
		max-height: 5rem;
		cursor: pointer;

		.thumb {
			${Thumb}

			border-radius: 35%;
		}

		.name {
			margin-left: 2rem;
		}
	}
`;

export default UserList;
