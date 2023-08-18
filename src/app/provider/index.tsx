// SomeClientComponent.tsx
"use client"

import { THIRDWEB_CLIENT_ID } from "@/constants"
import { ThirdwebProvider } from "@thirdweb-dev/react"

export default function Thirdweb({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ThirdwebProvider
				activeChain='mumbai'
				clientId={THIRDWEB_CLIENT_ID}
			>
				{children}
			</ThirdwebProvider>
		</>
	)
}
