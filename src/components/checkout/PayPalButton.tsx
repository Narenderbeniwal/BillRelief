"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCallback } from "react";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
const isLive = process.env.NEXT_PUBLIC_PAYPAL_MODE === "live";

export function PayPalButton({
  amount,
  description,
  tierId,
  onSuccess,
  onError,
}: {
  amount: string;
  description: string;
  tierId: string;
  onSuccess: () => void;
  onError: (err: string) => void;
}) {
  const createOrder = useCallback(async () => {
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        currency: "USD",
        description,
        customId: tierId,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Failed to create order");
    return data.orderId;
  }, [amount, description, tierId]);

  const onApprove = useCallback(
    async (data: { orderID: string }) => {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: data.orderID }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        onError(result.error ?? "Payment capture failed");
        return;
      }
      onSuccess();
    },
    [onSuccess, onError]
  );

  if (!clientId) {
    return (
      <div className="rounded-xl border border-amber-500/50 bg-amber-500/10 p-4 text-sm text-amber-200">
        PayPal is not configured. Set NEXT_PUBLIC_PAYPAL_CLIENT_ID in .env.local
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: "USD",
        intent: "capture",
        vault: false,
        ...(isLive ? {} : { "data-sdk-integration-source": "integrationbuilder_sc" }),
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err) => onError(err.message ?? "PayPal error")}
      />
    </PayPalScriptProvider>
  );
}
