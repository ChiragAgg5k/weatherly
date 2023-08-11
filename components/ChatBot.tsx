"use client";
import { FormEvent, useState } from "react";

type ChatHistory = {
	message: string;
	sender: "start" | "end";
};

export default function ChatBot() {
	const [input, setInput] = useState("");
	const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const result = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ input }),
			});

			const { completion } = await result.json();
			setChatHistory((chatHistory) => [
				...chatHistory,
				{ message: input, sender: "end" },
				{ message: completion, sender: "start" },
			]);
		} catch (error) {
			console.error(error);
			setChatHistory([
				...chatHistory,
				{ message: input, sender: "end" },
				{ message: "Sorry, I don't understand that yet.", sender: "start" },
			]);
		}

		setInput("");
	};

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

				{chatHistory.slice(-5).map((chat, index) => (
					<div key={index} className={`chat chat-${chat.sender} mb-4`}>
						<div className="chat-bubble">
							<p>{chat.message}</p>
						</div>
					</div>
				))}
				<div>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							id="input"
							value={input}
							placeholder="Type something..."
							className="input my-2 input-bordered w-full text-sm"
							onChange={(e) => setInput(e.target.value)}
						/>
						<input type="submit" hidden />
					</form>
				</div>
			</div>
		</div>
	);
}
