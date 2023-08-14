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
	loading: () => (
		<div className="flex h-full items-center justify-center">
			<div className="flex items-center">
				<span className="loading loading-bars mr-2"></span>
				<p>Loading...</p>
			</div>
		</div>
	),
});

export default function ForecastChart({ forecast }: { forecast: Forecast[] }) {
	return (
		<div className="bordered card glass col-span-2 mb-4 sm:mb-0">
			<div className="card-body w-full overflow-auto p-0">
				<Plot
					className="h-full w-full"
					data={[
						{
							type: "bar",
							x: forecast.map((forecast) => forecast.time),
							y: forecast.map((forecast) => forecast.temp),
							name: "Temperature (°C)",

							// dull orange
							marker: { color: "#FFA500" },
						},
						{
							x: forecast.map((forecast) => forecast.time),
							y: forecast.map((forecast) => forecast.feels_like),
							name: "Feels Like (°C)",
						},
					]}
					config={{ responsive: true, displayModeBar: false }}
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
							range: [
								Math.min(...forecast.map((forecast) => forecast.feels_like)) - 3,
								Math.max(...forecast.map((forecast) => forecast.feels_like)) + 3,
							],
						},
						paper_bgcolor: "rgba(0,0,0,0)",
						plot_bgcolor: "rgba(0,0,0,0)",
					}}
				/>
			</div>
		</div>
	);
}
