import { getSiteUrl } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>404 - Not Found</h1>
        </div>
      </body>
    </html>
  );
}
