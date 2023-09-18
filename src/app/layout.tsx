import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import Thirdweb from "./provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "NFTHub",
	description: "ERC721 market",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Thirdweb>
					<Navbar />
					{children}
				</Thirdweb>
			</body>
		</html>
	)
}
