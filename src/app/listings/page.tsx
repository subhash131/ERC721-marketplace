"use client"
import React from "react"
import { useContract, useValidDirectListings } from "@thirdweb-dev/react"

import Loading from "@/components/LoadingCard"
import NFTCard from "@/components/NFTCard"
import { LION_NFT_CONTRACT_ADDRESS, NFTMARKETPLACE_ADDRESS } from "@/constants"
import { Text } from "@tremor/react"

const NFTGrid = () => {
	const { contract: marketplaceContract } = useContract(
		NFTMARKETPLACE_ADDRESS,
		"marketplace-v3"
	)

	const { data: directListing, isLoading: isDirectListingLoading } =
		useValidDirectListings(marketplaceContract, {
			tokenContract: LION_NFT_CONTRACT_ADDRESS,
			count: 100,
		})

	return (
		<div className='w-4/5 m-auto mt-8 pb-16'>
			<Text className='p-2'>Listings</Text>
			<div className='grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-y-10'>
				{directListing === undefined ? (
					<>
						{[...Array(10)].map((item, index) => {
							return <Loading key={index} />
						})}
					</>
				) : directListing.length > 0 ? (
					<>
						{[...directListing].reverse().map((nft) => (
							<NFTCard
								nft={nft}
								key={nft.tokenId}
								marketplaceContract={marketplaceContract!}
							/>
						))}
					</>
				) : (
					<Text className='p-2 text-tremor-inverted'>
						No Items are Listed
					</Text>
				)}
			</div>
		</div>
	)
}

export default NFTGrid
