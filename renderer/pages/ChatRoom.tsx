import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { page } from "../styles/theme";

function ChatRoom() {
	return (
		<CharRoomSection>
			<Link href="/home">asdf</Link>
			<div>
				<p>
					⚡ Electron + Next.js ⚡ -
					<Link href="/next">
						<a>Go to next page</a>
					</Link>
				</p>
				<img src="/images/logo.png" />
			</div>
		</CharRoomSection>
	);
}

const CharRoomSection = styled.section`
	${page}
`;

export default ChatRoom;
