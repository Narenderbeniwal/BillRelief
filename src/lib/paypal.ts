/**
 * PayPal server-side helpers.
 * Payments are received by the PayPal account that owns the App (Client ID + Secret)
 * configured in .env. Use developer.paypal.com and log in with the account that
 * should receive payments (e.g. your business/personal PayPal email).
 */

const PAYPAL_HOST =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

function getAuthHeader(): string {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !secret) {
    throw new Error("PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET must be set");
  }
  return "Basic " + Buffer.from(`${clientId}:${secret}`).toString("base64");
}

export async function getPayPalAccessToken(): Promise<string> {
  const res = await fetch(`${PAYPAL_HOST}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal auth failed: ${err}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function createPayPalOrder(params: {
  amount: string;
  currency?: string;
  description?: string;
  customId?: string;
}): Promise<{ orderId: string }> {
  const token = await getPayPalAccessToken();
  const { amount, currency = "USD", description, customId } = params;
  const res = await fetch(`${PAYPAL_HOST}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: currency, value: amount },
          description: description ?? "BillRelief service",
          custom_id: customId ?? undefined,
        },
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal create order failed: ${err}`);
  }
  const data = (await res.json()) as { id: string };
  return { orderId: data.id };
}

export async function capturePayPalOrder(orderId: string): Promise<{
  success: boolean;
  captureId?: string;
  status?: string;
}> {
  const token = await getPayPalAccessToken();
  const res = await fetch(`${PAYPAL_HOST}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: "{}",
  });
  const data = (await res.json()) as {
    status?: string;
    id?: string;
    purchase_units?: { payments?: { captures?: { id?: string }[] }[] }[];
  };
  if (!res.ok) {
    return { success: false, status: data.status ?? "CAPTURE_FAILED" };
  }
  const payments = data.purchase_units?.[0]?.payments;
  const captureId = Array.isArray(payments) ? payments[0]?.captures?.[0]?.id : undefined;
  return {
    success: data.status === "COMPLETED",
    captureId,
    status: data.status,
  };
}
