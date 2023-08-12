import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

type Forecast = {
	temp: number;
	feels_like: number;
	time: string;
};

// @ts-ignore
const Plot = dynamic(() => import("react-plotly.js"), {
	ssr: false,
	loading: () => <p className="flex items-center justify-center">Loading...</p>,
});

export default function ForecastChart({ lat, long }: { lat: number | undefined; long: number | undefined }) {
	const [forecast, setForecast] = useState<Forecast[]>([]);

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
		fetchWeather().then((weather) => {
			for (const weatherObj of weather.list) {
				const temp = weatherObj.main.temp - 273.15;
				const time = weatherObj.dt_txt;
				const feels_like = weatherObj.main.feels_like - 273.15;

				setForecast((forecast) => [...forecast, { temp, time, feels_like }]);
			}
		});
	}, [lat, long]);

	console.log(forecast);

	return (
		<div className="card bordered glass col-span-2">
			<div className="card-body w-full p-0 overflow-hidden">
				<Plot
					className="w-full"
					data={[
						{
							type: "bar",
							x: forecast.map((forecast) => forecast.time),
							y: forecast.map((forecast) => forecast.temp),
							name: "Temperature",

							// dull orange
							marker: { color: "#FFA500" },
						},
						{
							x: forecast.map((forecast) => forecast.time),
							y: forecast.map((forecast) => forecast.feels_like),
							name: "Feels Like",
						},
					]}
					layout={{
						margin: {
							l: 50,
							r: 50,
							b: 25,
							t: 25,
							pad: 4,
						},
						xaxis: {
							showgrid: false,
							zeroline: false,
							showticklabels: false,
						},

						yaxis: {
							showgrid: true,
							zeroline: false,
							showticklabels: true,
						},
						paper_bgcolor: "rgba(0,0,0,0)",
						plot_bgcolor: "rgba(0,0,0,0)",
					}}
				/>
			</div>
		</div>
	);
}
