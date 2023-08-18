import { ThirdwebStorage } from "@thirdweb-dev/storage"

export const NFTMARKETPLACE_ADDRESS =
	"0xEb2A3D803Df5E4714b132F2999Fb14E7861D5142"
export const THIRDWEB_CLIENT_ID = "5811c52b850262280a6c20c6d3a9c0d9"
export const THIRDWEB_CLIENT_SECRET =
	"wKPWk4Yc1M7UwtYajuPyaKjX71MT0HRmjgB9F24HM5_IACOAmk1wnb-Qn_F7s_FfRn1iJD1GrV3ynChLMTePRw3"
export const LION_NFT_CONTRACT_ADDRESS =
	"0x1dCC39e91aafD3B4EF9C5f8264477dDD4C116AdF"

type ReturnType = {
	publicUrl: string
	ipfsUrl: string
}
export const handleFileUpload = async (
	file: File
): Promise<ReturnType | undefined> => {
	const storage = new ThirdwebStorage({
		clientId: THIRDWEB_CLIENT_ID,
	})
	try {
		const upload = await storage.upload(file)

		return { publicUrl: storage?.resolveScheme(upload), ipfsUrl: upload }
	} catch (e) {
		console.log("Error ::", e)
	}
}
