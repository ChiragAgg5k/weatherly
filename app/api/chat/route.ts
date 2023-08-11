import { env } from "@/env";
import { NextRequest, NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
	apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: NextRequest) {
	if (!request.body) {
		return NextResponse.error();
	}
	const data = await request.json();
	const input = data.input;

	try {
		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `${input}`,
		});

		return NextResponse.json({
			completion: completion.data.choices[0].text,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.error();
	}
}
