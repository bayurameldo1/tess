import { Alchemy, Network } from "alchemy-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.ETH_MAINNET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const wallet = req.body?.untrustedData?.address;
    if (!wallet) return res.status(400).json({ error: "No wallet detected" });

    const nfts = await alchemy.nft.getNftsForOwner(wallet);
    const warpletNFT = nfts.ownedNfts.find(
      (nft) => nft.contract.address.toLowerCase() === process.env.WARPLET_CONTRACT!.toLowerCase()
    );

    if (warpletNFT) {
      const imageUrl =
        warpletNFT.media?.[0]?.gateway ||
        warpletNFT.rawMetadata?.image ||
        "https://via.placeholder.com/600x600.png?text=Warplet+NFT";

      const redirectUrl = `/api/generate-cover?wallet=${wallet}&image=${encodeURIComponent(imageUrl)}`;
      return res.redirect(307, redirectUrl);
    } else {
      return res.json({
        image: { src: `${process.env.BASE_URL}/no-warplet.jpg` },
        buttons: [{ label: "Try Again" }],
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
