import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");
  const nftImage = searchParams.get("image");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {/* NFT background with blur */}
        <img
          src={nftImage ?? ""}
          width="1200"
          height="630"
          style={{
            position: "absolute",
            objectFit: "cover",
            filter: "blur(12px) brightness(0.5)",
            transform: "scale(1.1)",
          }}
        />

        {/* Foreground display */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={nftImage ?? ""}
            width="250"
            height="250"
            style={{
              borderRadius: "20px",
              border: "4px solid #fff",
              boxShadow: "0 0 40px rgba(168, 0, 255, 0.7)",
            }}
          />
          <p
            style={{
              color: "white",
              fontSize: 50,
              fontWeight: "bold",
              marginTop: 20,
              textShadow: "0 0 15px rgba(255, 255, 255, 0.6)",
              fontFamily: "sans-serif",
            }}
          >
            Warplet Verified 💎
          </p>
          <p
            style={{
              color: "#ccc",
              fontSize: 28,
              fontFamily: "monospace",
              marginTop: 10,
            }}
          >
            {wallet?.slice(0, 6)}...{wallet?.slice(-4)}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
