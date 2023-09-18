import { DirectListingV3, MarketplaceV3, NFT } from "@thirdweb-dev/sdk"
import React, { useState } from "react"
import { Card } from "@tremor/react"
import { ethers } from "ethers"
import SpinAnimation from "./SpinAnimation"

type Props = {
	nft: DirectListingV3
	marketplaceContract: MarketplaceV3
}

const NFTCard = ({ nft, marketplaceContract }: Props) => {
	const [txLoading, setTxLoading] = useState(false)

	const buyNft = async () => {
		let tx
		try {
			setTxLoading(true)
			tx = await marketplaceContract.directListings.buyFromListing(
				nft.id,
				1
			)

			setTxLoading(false)
		} catch (e) {
			setTxLoading(false)
			console.log(e)
		}
		return tx
	}

	return (
		<div className=''>
			<Card className='w-64 h-[25rem] p-1 overflow-hidden'>
				<img
					src={nft.asset.image!}
					className='object-cover w-full h-80 rounded-md hover:scale-150 transition-all'
					alt='nft'
					loading='lazy'
					onClick={() => {
						buyNft()
					}}
				></img>
				<div className='px-2 py-4'>
					<p className='text-white text-sm px-1'>{nft.asset.name}</p>
					<div className='flex justify-between '>
						<p className='text-white text-sm p-1'>
							{`Price: ${ethers.utils.formatEther(
								nft.pricePerToken
							)}
							${nft.currencyValuePerToken.symbol}`}
						</p>
						{txLoading ? (
							<SpinAnimation />
						) : (
							<button
								className='text-black bg-white px-4 rounded-md'
								onClick={() => {
									buyNft()
								}}
							>
								Buy
							</button>
						)}
					</div>
				</div>
			</Card>
		</div>
	)
}

export default NFTCard
