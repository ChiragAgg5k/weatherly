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

	{
		name: "get_forecast",
		description: "Get the forecast for the next 5 days",
		parameters: {
			type: "object",
			properties: {
				location: {
					type: "string",
					description: "The city and state, e.g. San Francisco, CA",
				},
				temp: {
					type: "number",
					description: "The temperature in kelvin",
				},
				feels_like: {
					type: "number",
					description: "The temperature it feels like in kelvin",
				},
				temp_min: {
					type: "number",
					description: "The minimum temperature in kelvin",
				},
				temp_max: {
					type: "number",
					description: "The maximum temperature in kelvin",
				},
				pressure: {
					type: "number",
					description: "The pressure in pascals",
				},
				humidity: {
					type: "number",
					description: "The humidity in percentage",
				}
			},
			required: ["location", "format"],
		},
	},

	{
		name: "get_wind_speed",
		description: "Get the wind speed",
		parameters: {
			type: "object",
			properties: {
				wind_speed: {
					type: "number",
					description: "The wind speed in miles per hour",
				},
				direction: {
					type: "string",
					enum: ["north", "south", "east", "west"],
					description: "The direction of the wind",
				},
				gust:{
					type: "number",
					description: "The gust speed in miles per hour",
				}
			},
			required: ["wind_speed", "direction", "gust"],
		},
	}
];

const configuration = new Configuration({
	apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
export const runtime = "edge";

export async function POST(req: Request) {
	// Extract the `messages` from the body of the request
	const { messages, weather, forecast, wind } = await req.json();

	// Ask OpenAI for a streaming chat completion given the prompt
	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		stream: true,
		messages,
		functions,
	});

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response, {
		experimental_onFunctionCall: async ({ name }, createFunctionCallMessages) => {
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

			if (name === "get_wind_speed") {
				// `createFunctionCallMessages` constructs the relevant "assistant" and "function" messages for you
				const newMessages = createFunctionCallMessages(wind);
				return openai.createChatCompletion({
					messages: [...messages, ...newMessages],
					stream: true,
					model: "gpt-3.5-turbo-0613",
					functions,
				});
			}

			if (name === "get_forecast") {
				// `createFunctionCallMessages` constructs the relevant "assistant" and "function" messages for you
				const newMessages = createFunctionCallMessages(forecast);
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
