import zod from "zod";

const envSchema = zod.object({
	OPEN_WEATHER_API_KEY: zod.string().nonempty(),
	OPENAI_API_KEY: zod.string().nonempty(),
});

export const env = envSchema.parse(process.env);
