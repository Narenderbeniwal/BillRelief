import { NextRequest, NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId } = body as { orderId?: string };
    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid orderId" },
        { status: 400 }
      );
    }
    const result = await capturePayPalOrder(orderId);
    return NextResponse.json(result);
  } catch (e) {
    console.error("PayPal capture-order error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to capture order" },
      { status: 500 }
    );
  }
}
