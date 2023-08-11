import { env } from "@/env";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const lat = request.nextUrl.searchParams.get("lat");
	const long = request.nextUrl.searchParams.get("long");

	const response = await fetch(
		`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${env.OPEN_WEATHER_API_KEY}`
	);
	const data = await response.json();
	return NextResponse.json(data);
}
