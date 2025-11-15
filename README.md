# Farcaster Warplet Frame (v2 - Stylized NFT Version)

This Next.js project creates a Farcaster Frame that:
- Detects a connected wallet
- Checks if the user owns a Warplet NFT
- Uses the NFT's actual image to generate a stylized cover banner

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add environment variables in `.env.local`:
   ```
   BASE_URL=https://your-vercel-domain.vercel.app
   ALCHEMY_KEY=your_alchemy_api_key
   WARPLET_CONTRACT=0xYourWarpletContractAddress
   ```

3. Run locally:
   ```bash
   npm run dev
   ```

4. Deploy to Vercel, then paste your deployed URL into Warpcast -> Add Frame.

