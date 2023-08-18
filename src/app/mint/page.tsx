"use client"
import SpinAnimation from "@/components/SpinAnimation"
import {
	LION_NFT_CONTRACT_ADDRESS,
	THIRDWEB_CLIENT_ID,
	handleFileUpload,
} from "@/constants"
import { ThirdwebSDK, Web3Button, useAddress } from "@thirdweb-dev/react"
import { Card, Text } from "@tremor/react"
import React, { useRef } from "react"

import toast, { Toaster } from "react-hot-toast"

const page = () => {
	let fileInputRef = useRef<HTMLInputElement>(null)
	let nameInputRef = useRef<HTMLInputElement>(null)
	const sdk = ThirdwebSDK.fromPrivateKey(
		"9e6e884d21b19f7c59acf1f606eb618a9a9abf2f8a2effa54585dddbbd8d371f",
		"mumbai",
		{
			clientId: THIRDWEB_CLIENT_ID,
		}
	)

	const [txLoading, setTxLoading] = React.useState(false)

	const user = useAddress()

	const mint = async () => {
		if (!fileInputRef.current?.files![0]) {
			toast.error("Please upload a nft")
			return
		}
		if (!nameInputRef.current?.value) {
			toast.error("Give it a name")
			return
		}
		const nftContract = await sdk.getContract(
			"0x1dCC39e91aafD3B4EF9C5f8264477dDD4C116AdF"
		)
		// console.log("sign", sdk.getSigner())

		const uploadedFile = await handleFileUpload(
			fileInputRef.current?.files![0]
		)

		try {
			const signedPayload = await nftContract?.erc721.signature.generate({
				to: user!,
				metadata: {
					name: nameInputRef.current.value,
					image: uploadedFile?.publicUrl,
					description: "",
				},
			})
			const tx = await nftContract?.erc721.signature.mint(signedPayload)
			toast.success("NFT minted")

			nameInputRef.current.value = ""
			fileInputRef.current.value = ""
		} catch (e) {
			console.log(e)
			toast.error("Error while minting NFT")
		}
	}

	return (
		<div className='w-2/4 m-auto flex justify-center items-center h-[80vh]'>
			<Toaster position='top-center' />
			<Card className='h-96'>
				<div className='w-2/4 m-auto text-center'>
					<Text className='p-2 text-lg '>Mint NFT</Text>
					<div className='w-min flex p-4 mt-10'>
						<p className='bg-[#EFEFEF] rounded-l-md w-[5.5rem] text-sm leading-8  text-black'>
							Name{" "}
						</p>
						<input
							className='bg-transparent px-2 rounded-r-md border border-[grey] outline-0'
							id='name'
							placeholder='#1'
							ref={nameInputRef}
						/>
					</div>

					{/* <label className=''>Image: </label> */}
					<div className='p-4 '>
						<input
							className='block w-full text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 '
							aria-describedby='file_input_help'
							id='file_input'
							type='file'
							ref={fileInputRef}
							accept='image'
						/>
					</div>

					<div className='p-4 m-auto'>
						{txLoading ? (
							<SpinAnimation />
						) : (
							<Web3Button
								action={async () => {
									setTxLoading(true)
									await mint()
									setTxLoading(false)
								}}
								contractAddress={LION_NFT_CONTRACT_ADDRESS}
							>
								Mint
							</Web3Button>
						)}
					</div>
				</div>
			</Card>
		</div>
	)
}

export default page
