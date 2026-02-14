import { NextRequest, NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency, description, customId } = body as {
      amount?: string;
      currency?: string;
      description?: string;
      customId?: string;
    };
    if (!amount || typeof amount !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid amount" },
        { status: 400 }
      );
    }
    const { orderId } = await createPayPalOrder({
      amount,
      currency: currency ?? "USD",
      description,
      customId,
    });
    return NextResponse.json({ orderId });
  } catch (e) {
    console.error("PayPal create-order error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create order" },
      { status: 500 }
    );
  }
}
