"use client";

import Script from "next/script";

// Env vars (build time); fallback to BillRelief Tawk IDs so widget shows even if Azure doesn't pass them at build
const PROPERTY_ID =
  process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID?.trim() || "699ac87af9f4b51c3f6e2510";
const WIDGET_ID =
  process.env.NEXT_PUBLIC_TAWK_WIDGET_ID?.trim() || "1ji29u8ls";

/** Brand color for chat bubble (match site primary) */
const CHAT_BUBBLE_COLOR = "#0F4C81";

/**
 * Tawk.to live chat. Uses env vars when set; otherwise BillRelief property so widget always loads.
 */
export function TawkToWidget() {
  const embedSrc = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`;

  const inlineScript = `
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    Tawk_API.onLoad = function() {
      if (Tawk_API.setCustomStyle) {
        Tawk_API.setCustomStyle('color', '${CHAT_BUBBLE_COLOR}');
      }
      if (Tawk_API.setAttributes) {
        Tawk_API.setAttributes({ name: '', email: '' }, function() {});
      }
    };
    (function() {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "${embedSrc}";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  `;

  return (
    <Script
      id="tawk-to-chat"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{ __html: inlineScript }}
    />
  );
}
