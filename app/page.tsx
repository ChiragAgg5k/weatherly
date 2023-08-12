"use client";

import ChatBot from "@/components/ChatBot";
import ForecastChart from "@/components/ForecastChart";
import Weather from "@/components/Weather";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

export default function Home() {
	const [lat, setLat] = useState<number | undefined>(0);
	const [long, setLong] = useState<number | undefined>(0);

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

	return (
		<main className="">
			<ChatBot />

			<div className="m-8 grid auto-rows-[192px] grid-cols-1 gap-4 sm:grid-cols-3">
				<Weather lat={lat} long={long} />
				<ForecastChart lat={lat} long={long} />
			</div>
		</main>
	);
}
