import { env } from "@/env";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionFunctions, Configuration, OpenAIApi } from "openai-edge";

const functions: ChatCompletionFunctions[] = [
	{
		name: "get_current_weather",
		description: "Get the current weather",
		parameters: {
			type: "object",
			properties: {
				location: {
					type: "string",
					description: "The city and state, e.g. San Francisco, CA",
				},
				format: {
					type: "string",
					enum: ["kelvin"],
					description: "The temperature unit to use. Infer this from the users location.",
				},
			},
			required: ["location", "format"],
		},
	},
];

const configuration = new Configuration({
	apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
export const runtime = "edge";

export async function POST(req: Request) {
	// Extract the `messages` from the body of the request
	const { messages, weather } = await req.json();

	// Ask OpenAI for a streaming chat completion given the prompt
	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		stream: true,
		messages,
		functions,
	});

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response, {
		experimental_onFunctionCall: async ({ name, arguments: args }, createFunctionCallMessages) => {
			if (name === "get_current_weather") {
				// `createFunctionCallMessages` constructs the relevant "assistant" and "function" messages for you
				const newMessages = createFunctionCallMessages(weather);
				return openai.createChatCompletion({
					messages: [...messages, ...newMessages],
					stream: true,
					model: "gpt-3.5-turbo-0613",
					functions,
				});
			}
		},
	});
	// Respond with the stream
	return new StreamingTextResponse(stream);
}
