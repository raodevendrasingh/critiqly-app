"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

export const HomeNav = (): JSX.Element => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<header className="w-full bg-zinc-800 text-zinc-100 z-20 sticky border-b top-0">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center space-x-2">
						<span className="text-3xl font-bold">critiqly</span>
                        <span className="mt-2 px-3 rounded-lg bg-sky-200 font-medium text-sky-700 border border-sky-700 text-sm">beta</span>
					</Link>
                    
					<button
						onClick={() => signOut()}
						className="flex items-center gap-2 px-3 py-2 border border-gray-100 rounded-lg text-white text-sm"
					>
                        <LogOutIcon className="size-4 text-rose-500" />
						
					</button>

                    {/* mobile trigger */}
					<button
						className={`relative order-10 block h-10 w-10 self-center md:hidden
                            ${
															isMobileMenuOpen
																? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
																: ""
														}
                    `}
						aria-expanded={isMobileMenuOpen ? "true" : "false"}
						aria-label="Toggle navigation"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						<div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
							<span
								aria-hidden="true"
								className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-zinc-100 transition-all duration-300"
							></span>
							<span
								aria-hidden="true"
								className="absolute block h-0.5 w-6 transform rounded-full bg-zinc-100 transition duration-300"
							></span>
							<span
								aria-hidden="true"
								className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-zinc-100 transition-all duration-300"
							></span>
						</div>
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			{isMobileMenuOpen && (
				<div className="md:hidden absolute top-full left-0 right-0 bg-transparent transition-all duration-500 opacity-[0.80]">
					<nav className=" flex flex-col  mx-auto px-4 py-3">
						
						<div className="flex justify-between py-3">
							<Link
								href="/sign-in"
								className="w-[48%] py-2 text-base text-center font-medium rounded-lg bg-zinc-300/20 hover:bg-zinc-800/70 text-zinc-300 hover:text-zinc-50 transition-colors "
							>
								Login
							</Link>
							<Link
								href="/sign-up"
								className="w-[48%] py-2 text-center border border-zinc-200 text-white text-base font-bold hover:text-zinc-900 hover:bg-zinc-100 px-4 rounded-xl transition-colors"
							>
								Sign Up
							</Link>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
};