import {
	DirectListingV3,
	Erc721,
	MarketplaceV3,
	NFT,
	SmartContract,
} from "@thirdweb-dev/sdk"
import React, { useRef, useState } from "react"
import { Card, TextInput } from "@tremor/react"
import { ethers } from "ethers"
import SpinAnimation from "./SpinAnimation"
import {
	useAddress,
	useCreateDirectListing,
	useDirectListing,
} from "@thirdweb-dev/react"
import { LION_NFT_CONTRACT_ADDRESS, NFTMARKETPLACE_ADDRESS } from "@/constants"
import toast, { Toaster } from "react-hot-toast"

type Props = {
	nft: NFT
	marketplaceContract: MarketplaceV3
	nftContract: SmartContract
}

const CollectionCard = ({ nft, marketplaceContract, nftContract }: Props) => {
	// console.log("nft", nft)
	const priceRef = useRef<HTMLInputElement>(null)
	const [txLoading, setTxLoading] = useState(false)
	const userAddress = useAddress()
	const { mutateAsync: createDirectListing } =
		useCreateDirectListing(marketplaceContract)

	const authorize = async () => {
		const hasApproval = await nftContract.call("isApprovedForAll", [
			nft.owner,
			NFTMARKETPLACE_ADDRESS,
		])
		if (!hasApproval) {
			const tx = await nftContract.call("setApprovalForAll", [
				NFTMARKETPLACE_ADDRESS,
				true,
			])
			console.log(tx)
		}
	}

	const sellNft = async () => {
		if (
			priceRef.current?.value === undefined ||
			priceRef.current.value === "" ||
			priceRef.current.value === null
		) {
			toast.error("Please enter a price")
			return
		}
		authorize()
		let tx
		try {
			setTxLoading(true)
			tx = await createDirectListing({
				tokenId: nft.metadata.id,
				assetContractAddress: LION_NFT_CONTRACT_ADDRESS,
				pricePerToken: priceRef.current.value,
			})
			console.log(tx)
			setTxLoading(false)
		} catch (e) {
			setTxLoading(false)
			console.log(e)
		}
		return tx
	}

	return (
		<div className=''>
			<Toaster position='top-center' />
			<Card className='w-64 h-[25rem] p-1 overflow-hidden'>
				<img
					src={nft.metadata.image!}
					className='object-cover w-full h-80 rounded-md hover:scale-150 transition-all'
					alt='nft'
					loading='lazy'
				></img>
				<div className='px-2 py-4'>
					<p className='text-white text-sm px-1'>
						{nft.metadata.name}
					</p>
					<div className='flex justify-between '>
						<div className=''>
							<input
								placeholder='0.00'
								className='w-12 bg-transparent border-none '
								type='text'
								step='0.01'
								autoFocus
								ref={priceRef}
								required
							/>{" "}
							MATIC
						</div>
						{txLoading ? (
							<SpinAnimation />
						) : (
							<button
								className='text-black bg-white px-4 rounded-md'
								onClick={() => {
									sellNft()
								}}
							>
								Sell
							</button>
						)}
					</div>
				</div>
			</Card>
		</div>
	)
}

export default CollectionCard
