"use client"
import Loading from "@/components/LoadingCard"
import CollectionCard from "@/components/CollectionCard"
import { LION_NFT_CONTRACT_ADDRESS, NFTMARKETPLACE_ADDRESS } from "@/constants"
import {
	ConnectWallet,
	NFT,
	useAddress,
	useContract,
	useOwnedNFTs,
} from "@thirdweb-dev/react"
import React, { useEffect, useState } from "react"
import { Text } from "@tremor/react"

const page = () => {
	const { contract: nftContract } = useContract(LION_NFT_CONTRACT_ADDRESS)
	const { contract: marketplaceContract } = useContract(
		NFTMARKETPLACE_ADDRESS,
		"marketplace-v3"
	)
	const userAddress = useAddress()

	const { data, isLoading } = useOwnedNFTs(nftContract, userAddress)

	return (
		<div className='w-4/5 m-auto mt-8 pb-16 '>
			{userAddress === undefined ? (
				<div className='w-40 m-auto '>
					<Text className='p-2'>Loading...</Text>
					<ConnectWallet className='bg-red' />
				</div>
			) : (
				<>
					<Text className='p-2'>My Collections</Text>
					<div className='grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]  gap-y-10 '>
						{isLoading ? (
							<>
								{[...Array(6)].map((item, index) => {
									return <Loading key={index} />
								})}
							</>
						) : data && data?.length > 0 ? (
							<>
								{[...data].reverse().map((nft, index) => (
									<CollectionCard
										key={index}
										nft={nft}
										marketplaceContract={
											marketplaceContract!
										}
										nftContract={nftContract!}
									/>
								))}
							</>
						) : (
							<Text className='p-2 text-tremor-inverted'>
								No items available to display
							</Text>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default page
