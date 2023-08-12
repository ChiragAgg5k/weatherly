import { useEffect, useState } from "react";
import Image from "next/image";

export default function Weather({ lat, long }: { lat: number | undefined; long: number | undefined }) {
	const [weather, setWeather] = useState<any>({});

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
		<div className="bordered card glass">
			{weather.weather ? (
				<div className="card-body">
					<div className="card-title flex items-center">
						<Image
							src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
							alt="weather icon"
							width={50}
							height={50}
						/>
						<p className="text-sm">{weather.weather[0].description}</p>
					</div>
					<p className="mb-2">
						<span className="text-3xl font-bold">{Math.round((weather.main.temp - 273.15) * 100) / 100}</span>
						<sup className="text-base">°C</sup>
					</p>
					<p>
						Feels like{" "}
						<span className="text-xl font-bold">{Math.round((weather.main.feels_like - 273.15) * 100) / 100}</span>
						<sup className="text-sm">°C</sup>
					</p>
				</div>
			) : (
				<div className="card-body">
					<div className="card-title flex items-center">
						<span className="loading loading-bars loading-lg"></span>
						<p className="text-sm">Loading...</p>
					</div>
					<p>
						<span className="text-3xl font-bold">0</span>
						<sup className="text-base">°C</sup>
					</p>
					<p>
						Feels like <span className="text-xl font-bold">0</span>
						<sup className="text-sm">°C</sup>
					</p>
				</div>
			)}
		</div>
	);
}
