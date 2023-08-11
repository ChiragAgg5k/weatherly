import ChatBot from "@/components/ChatBot";
import ForecastChart from "@/components/ForecastChart";
import Weather from "@/components/Weather";

export default function Home() {
	return (
		<main className="">
			<ChatBot />

			<div className="grid auto-rows-[192px] grid-cols-1 sm:grid-cols-3 gap-4 m-8">
				<Weather />
				<ForecastChart />
			</div>
		</main>
	);
}
