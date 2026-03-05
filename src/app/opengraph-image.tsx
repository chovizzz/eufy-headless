import { ImageResponse } from "next/og";

export const alt = "eufy - Built with Care | Home Security System & Robovacs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-2px",
            }}
          >
            eufy
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "#a1a1aa",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Built with Care
          </div>
          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "24px",
            }}
          >
            {["Security", "Cleaning", "Smart Living"].map((cat) => (
              <div
                key={cat}
                style={{
                  padding: "10px 28px",
                  borderRadius: "999px",
                  border: "1px solid #555",
                  color: "#ccc",
                  fontSize: "18px",
                }}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
