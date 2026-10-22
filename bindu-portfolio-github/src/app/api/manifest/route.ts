import { NextResponse } from "next/server";
import { getAssetsManifest, discoverAssets } from "@/lib/asset-discovery";

export async function GET() {
  try {
    const manifest = process.env.NODE_ENV === "development" ? discoverAssets() : getAssetsManifest();
    return NextResponse.json(manifest);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate assets manifest", details: String(error) },
      { status: 500 }
    );
  }
}
