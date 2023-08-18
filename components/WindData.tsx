import { WindForecast } from "@/app/types/weather";
import dynamic from "next/dynamic";

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
export default function WindData({
	windForecast,
	appearance,
}: {
	windForecast: WindForecast[] | undefined;
	appearance: "light" | "dark";
}) {
	return (
		<div className="bordered card glass row-span-2 mb-20 sm:mb-0">
			{windForecast && windForecast[0] ? (
				<>
					<Plot
						className="h-full w-full"
						data={[
							{
								type: "scatterpolar",
								r: windForecast.map((forecast) => forecast.speed),
								theta: windForecast.map((forecast) => forecast.deg),
								mode: "markers",
								name: "Wind Speed (m/s)",
								marker: {
									//
									color: ["#FFA500"].concat(Array(windForecast.length - 1).fill("teal")),
									size: 8,
								},
								text: windForecast.map((forecast) => {
									const time = new Date(forecast.time).toLocaleString("en-US", {
										month: "short",
										day: "numeric",
										hour: "numeric",
										minute: "numeric",
										second: "numeric",
									});

									return `${time}`;
								}),
								hoverinfo: "x+y",
							},
						]}
						layout={{
							polar: {
								bgcolor: appearance === "dark" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.05)",
								radialaxis: {
									visible: true,
									range: [0, 6],
								},
								angularaxis: {
									visible: true,
									rotation: 90,
									direction: "clockwise",
									tickmode: "array",
									tickvals: [0, 45, 90, 135, 180, 225, 270, 315],
									ticktext: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
									color: appearance === "dark" ? "lightgray" : "#2E2E2E",
								},
							},
							paper_bgcolor: "rgba(0,0,0,0)",
							plot_bgcolor: "rgba(0,0,0,0)",
							margin: {
								l: 25,
								r: 25,
								t: 25,
								b: 25,
							},
						}}
						config={{ responsive: true, displayModeBar: false }}
					/>
					<div className="mb-4 ml-5 mt-2">
						<p>
							<strong>Current Wind Speed:</strong> {windForecast[0].speed} m/s
						</p>
						<p>
							<strong>Direction:</strong> {windForecast[0].deg}°
						</p>
					</div>
				</>
			) : (
				<div className="card-body w-full overflow-auto p-0">
					<div className="flex h-full items-center justify-center">
						<div className="flex items-center">
							<span className="loading loading-bars mr-2"></span>
							<p>Loading...</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
