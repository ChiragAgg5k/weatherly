import dynamic from "next/dynamic";
import { OtherForecast } from "@/app/types/weather";
import { useState } from "react";

// @ts-ignore
const Plot = dynamic(() => import("react-plotly.js"), {
	ssr: false,
	loading: () => (
		<div className="flex h-full items-center justify-center">
			<div className="flex items-center">
				<span className="loading loading-bars mr-2"></span>
				<p>Loading...</p>
			</div>
		</div>
	),
});

export default function OtherForecastChart({ otherForecast }: { otherForecast: OtherForecast[] }) {
	const [selected, setSelected] = useState<"pressure" | "humidity" | "temp_min" | "temp_max">("humidity");

	return (
		<div className="bordered card glass col-span-2 row-span-2 mb-4 sm:mb-0">
			<div className="card-body w-full overflow-auto p-0">
				<select
					className="select select-bordered absolute right-4 top-4 z-50"
					onChange={(e) => {
						setSelected(
							e.target.value === "Humidity (%)"
								? "humidity"
								: e.target.value === "Pressure (Pa)"
								? "pressure"
								: e.target.value === "Min Temperature (°C)"
								? "temp_min"
								: "temp_max"
						);
					}}
				>
					<option>Humidity (%)</option>
					<option>Pressure (Pa)</option>
					<option>Min Temperature (°C)</option>
					<option>Max Temperature (°C)</option>
				</select>
				<Plot
					className="h-full w-full"
					data={[
						{
							x: otherForecast.map((forecast) => forecast.time),
							y: otherForecast.map((forecast) => forecast[selected]),
							name: "Pressure",
							line: {
								width: 3,
							},
							text: otherForecast.map((forecast) => {
								// time format given = 2021-08-02 12:00:00
								// time format wanted = Month Day, Hour:Minute:Second
								const time = new Date(forecast.time).toLocaleString("en-US", {
									month: "short",
									day: "numeric",
									hour: "numeric",
									minute: "numeric",
									second: "numeric",
								});
								const pressure = forecast.pressure;
								const humidity = forecast.humidity;
								const temp_min = forecast.temp_min;
								const temp_max = forecast.temp_max;

								if (selected === "pressure") {
									return `Time: ${time}, Pressure: ${pressure} hPa`;
								}

								if (selected === "humidity") {
									return `Time: ${time}, Humidity: ${humidity} %`;
								}

								if (selected === "temp_min") {
									return `Time: ${time}, Min Temperature: ${temp_min} °C`;
								}

								if (selected === "temp_max") {
									return `Time: ${time}, Max Temperature: ${temp_max} °C`;
								}

								return "";
							}),
							hoverinfo: "text",

							// violet, navy, orange, red
							marker: {
								color:
									selected === "pressure"
										? "#8B5CF6"
										: selected === "humidity"
										? "#3B82F6"
										: selected === "temp_min"
										? "#F59E0B"
										: "#EF4444",
							},
						},
					]}
					config={{ responsive: true, displayModeBar: false }}
					layout={{
						margin: {
							l: 50,
							r: 50,
							b: 50,
							t: 50,
							pad: 4,
						},
						xaxis: {
							showgrid: false,
							zeroline: false,
							showticklabels: false,
						},
						legend: {
							orientation: "h",
							yanchor: "bottom",
							font: {
								color: "gray",
							},
							y: 1.02,
							xanchor: "right",
							x: 1,
						},
						yaxis: {
							showgrid: true,
							zeroline: false,
							gridcolor: "rgba(255,255,255,0.1)",
							showticklabels: true,
							title: {
								text: selected === "pressure" ? "Pressure (hPa)" : "Humidity (%)",
								font: {
									color: "darkgray",
								},
							},
						},
						paper_bgcolor: "rgba(0,0,0,0)",
						plot_bgcolor: "rgba(0,0,0,0)",
					}}
				/>
			</div>
		</div>
	);
}
