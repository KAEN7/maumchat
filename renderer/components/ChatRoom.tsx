import Image from "next/image";
import styled from "styled-components";
import { Thumb } from "../styles/theme";

interface IChatRoom {
	onClick: (e: Event) => void;
	chat: any;
}

const ChatRoom = ({ onClick, chat }: IChatRoom) => {
	const { title, group, content } = chat;
	const lastContent = content[content.length - 1];
	const timestamp = new Date(lastContent?.timestamp?.toDate());
	const date =
		!timestamp &&
		timestamp
			.toISOString()
			.replace("T", " ")
			.replace(/\..*/, "")
			.split(" ")[1]
			.slice(0, 5);

	return (
		<ChatRoomBox onClick={onClick}>
			<span className="thumb">{title.slice(0, 1).toUpperCase()}</span>

			<ChatContent>
				<Title>
					<h3>
						{group && (
							<Image src="/icons/openChat.png" width={16} height={16} />
						)}
						{" " + title}
					</h3>
					<span>{date}</span>
				</Title>
				<Content>
					<span>{lastContent?.message ?? ""}</span>
				</Content>
			</ChatContent>
		</ChatRoomBox>
	);
};

const ChatRoomBox = styled.li`
	display: flex;
	align-items: center;
	width: 100%;
	height: 5rem;
	min-height: 5rem;
	max-height: 5rem;
	cursor: pointer;

	.thumb {
		${Thumb}

		border-radius: 50%;
	}
`;

const ChatContent = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 1rem;
	width: 100%;
`;

const Title = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;

	h3 {
		margin: 0;
		padding: 0;
	}
`;

const Content = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

export default ChatRoom;
