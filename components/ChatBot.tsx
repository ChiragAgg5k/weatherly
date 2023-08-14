"use client";
import { useChat } from "ai/react";

export default function ChatBot({ weather }: { weather: any }) {
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		initialMessages: [
			{
				id: "0",
				role: "assistant",
				content: `Hello there resident of ${weather ? weather.name : "... "}! Ask me anything about the weather.`,
			},
		],
	});

	return (
		<div className="collapse fixed bottom-0 right-0 z-50 w-full bg-base-200 sm:right-8 sm:w-96">
			<input type="checkbox" />
			<div className="collapse-title mb-4 text-center text-xl font-medium">ChatGPT</div>
			<div className="collapse-content text-sm">
				<div className="max-h-[60dvh] overflow-y-auto">
					{messages.map((chat, index) => (
						<div key={index} className={`chat ${chat.role === "user" ? "chat-end" : "chat-start"} mb-4`}>
							<div className="chat-bubble">
								<p>{chat.content}</p>
							</div>
						</div>
					))}
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							id="input"
							placeholder="Type something..."
							className="input input-bordered my-2 w-full text-sm"
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
