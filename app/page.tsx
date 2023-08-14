"use client";

import ChatBot from "@/components/ChatBot";
import ForecastChart from "@/components/ForecastChart";
import Weather from "@/components/Weather";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { Forecast, OtherForecast, WeatherData, WindForecast } from "./types/weather";
import OtherForecastChart from "@/components/OtherForecastChart";
import WindData from "@/components/WindData";

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

	const [forecast, setForecast] = useState<Forecast[]>([]);
	const [otherforecast, setOtherForecast] = useState<OtherForecast[]>([]);
	const [windForecast, setWindForecast] = useState<WindForecast[]>([]);

	// Weather
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
		fetchWeather()
			.then((weather) => {
				setWeather(weather);
			})
			.catch((error) => {
				setWeather(undefined);
			});
	}, [lat, long]);

	// Forecast
	useEffect(() => {
		if (!lat || !long) return;

		const fetchWeather = async () => {
			const response = await fetch(`api/forecast?lat=${lat}&long=${long}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			return data;
		};
		fetchWeather()
			.then((weather) => {
				for (const weatherObj of weather.list) {
					const temp = weatherObj.main.temp - 273.15;
					const time = weatherObj.dt_txt;
					const feels_like = weatherObj.main.feels_like - 273.15;
					const pressure = weatherObj.main.pressure;
					const humidity = weatherObj.main.humidity;
					const temp_min = weatherObj.main.temp_min - 273.15;
					const temp_max = weatherObj.main.temp_max - 273.15;
					const speed = weatherObj.wind.speed;
					const deg = weatherObj.wind.deg;
					const gust = weatherObj.wind.gust;

					setForecast((forecast) => [...forecast, { temp, time, feels_like }]);
					setOtherForecast((otherforecast) => [...otherforecast, { pressure, humidity, temp_min, temp_max, time }]);
					setWindForecast((windForecast) => [...windForecast, { speed, deg, gust, time }]);
				}
			})
			.catch((error) => {});
	}, [lat, long]);

	return (
		<main className="">
			<ChatBot weather={weather} />

			<div className="m-8 grid auto-rows-[192px] grid-cols-1 sm:grid-cols-3 sm:gap-4">
				<Weather weather={weather} />
				<ForecastChart forecast={forecast} />
				<OtherForecastChart otherForecast={otherforecast} />
				<WindData windForecast={windForecast} />
			</div>
		</main>
	);
}
