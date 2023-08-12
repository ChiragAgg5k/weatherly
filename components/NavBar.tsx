"use client";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import Link from "next/link";

export default function NavBar() {
	useEffect(() => {
		themeChange(false);
		// 👆 false parameter is required for react project
	}, []);

	const [theme, setTheme] = useState("business");

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<Link href={"/"} className="btn btn-ghost normal-case text-xl">
					Weatherly
				</Link>
			</div>
			<div className="flex-none mr-2">
				{theme === "business" ? (
					<button data-set-theme="autumn">
						<input
							type="checkbox"
							className="toggle"
							// @ts-ignore
							checked={theme === "autumn"}
							onChange={
								// @ts-ignore
								() => setTheme("autumn")
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
								() => setTheme("business")
							}
						/>
					</button>
				)}
			</div>
		</div>
	);
}
