"use client";

import ChatBot from "@/components/ChatBot";
import ForecastChart from "@/components/ForecastChart";
import Weather from "@/components/Weather";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { WeatherData } from "./types/weather";

export default function Home() {
	const [lat, setLat] = useState<number | undefined>(0);
	const [long, setLong] = useState<number | undefined>(0);

	const [weather, setWeather] = useState<WeatherData | undefined>(undefined);

	useEffect(() => {
		if (getCookie("lat") && getCookie("long")) {
			// @ts-ignore
			setLat(parseFloat(getCookie("lat")));

			// @ts-ignore
			setLong(parseFloat(getCookie("long")));
			return;
		}

		navigator.geolocation.getCurrentPosition(function (position) {
			setCookie("lat", position.coords.latitude.toString());
			setCookie("long", position.coords.longitude.toString());
			setLat(position.coords.latitude);
			setLong(position.coords.longitude);
		});
	}, []);

	useEffect(() => {
		if (!lat || !long) return;

		const fetchWeather = async () => {
			const response = await fetch(`api/weather?lat=${lat}&long=${long}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			return data;
		};
		fetchWeather().then((weather) => {
			setWeather(weather);
		});
	}, [lat, long]);

	return (
		<main className="">
			<ChatBot weather={weather} />

			<div className="m-8 grid auto-rows-[192px] grid-cols-1 sm:grid-cols-3 sm:gap-4">
				<Weather weather={weather} />
				<ForecastChart lat={lat} long={long} />
			</div>
		</main>
	);
}
