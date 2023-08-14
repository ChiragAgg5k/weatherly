import Image from "next/image";
import { WeatherData } from "@/app/types/weather";

export default function Weather({ weather }: { weather: WeatherData | undefined }) {
	return (
		<div className="bordered card glass mb-4 sm:mb-0">
			{weather ? (
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
