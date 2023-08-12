"use client";
import { useChat } from "ai/react";

export default function ChatBot() {
	const { messages, input, handleInputChange, handleSubmit } = useChat();

	return (
		<div className="collapse bg-base-200 absolute bottom-0 right-8 w-96">
			<input type="checkbox" />
			<div className="collapse-title text-xl text-center mb-4 font-medium">ChatGPT</div>
			<div className="collapse-content text-sm">
				<div className={`chat chat-start mb-4`}>
					<div className="chat-bubble">
						<p>{"Hello There! Let's talk about the weather. Do you have any questions? "}</p>
					</div>
				</div>

				{/* This div is required for UI to not misbehave on chat-end */}
				<div className={`chat chat-end mb-4 hidden`}></div>

				{messages.map((chat, index) => (
					<div key={index} className={`chat ${chat.role === "user" ? "chat-end" : "chat-start"} mb-4`}>
						<div className="chat-bubble">
							<p>{chat.content}</p>
						</div>
					</div>
				))}
				<div>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							id="input"
							placeholder="Type something..."
							className="input my-2 input-bordered w-full text-sm"
							value={input}
							onChange={handleInputChange}
						/>
						<input type="submit" hidden />
					</form>
				</div>
			</div>
		</div>
	);
}
