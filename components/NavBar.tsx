"use client";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import Link from "next/link";

// eslint-disable-next-line no-unused-vars
export default function NavBar({ setAppearance }: { setAppearance: (appearance: "light" | "dark") => void }) {
	useEffect(() => {
		themeChange(false);
		// 👆 false parameter is required for react project
	}, []);

	const [theme, setTheme] = useState("business");
	setAppearance(theme === "business" ? "dark" : "light");

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<Link href={"/"} className="btn btn-ghost text-xl normal-case">
					Weatherly
				</Link>
			</div>
			<div className="mr-2 flex-none">
				{theme === "business" ? (
					<button data-set-theme="autumn">
						<input
							type="checkbox"
							className="toggle"
							// @ts-ignore
							checked={theme === "autumn"}
							onChange={
								// @ts-ignore
								() => {
									setAppearance("light");
									setTheme("autumn");
								}
							}
						/>
					</button>
				) : (
					<button data-set-theme="business">
						<input
							type="checkbox"
							className="toggle"
							// @ts-ignore
							checked={theme === "autumn"}
							onChange={
								// @ts-ignore
								() => {
									setAppearance("dark");
									setTheme("business");
								}
							}
						/>
					</button>
				)}
			</div>
		</div>
	);
}
