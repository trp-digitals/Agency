import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/seo";

/**
 * IndexNow API route
 * Allows submitting updated URLs to IndexNow search engines (Bing, Brave, etc.)
 * POST /api/indexnow
 * Body: { urls: string[] }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const urls: string[] = body.urls || [siteUrl];
    const host = new URL(siteUrl).hostname;
    const key = process.env.INDEXNOW_KEY || "trpdigitalsindexnowkey";

    const payload = {
      host,
      key,
      keyLocation: `${siteUrl}/${key}.txt`,
      urlList: urls,
    };

    // Submit to Bing / IndexNow endpoint
    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: "URLs submitted to IndexNow successfully.",
        submitted: urls,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: `IndexNow returned status ${response.status}`,
      },
      { status: response.status }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit IndexNow request." },
      { status: 500 }
    );
  }
}
