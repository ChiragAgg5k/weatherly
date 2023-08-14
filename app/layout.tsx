import NavBar from "@/components/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Weatherly",
	description: "A simple weather app with the power of ChatGPT.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className={`${inter.className} h-[100dvh]`} suppressHydrationWarning={true}>
				<NavBar />
				{children}
			</body>
		</html>
	);
}
