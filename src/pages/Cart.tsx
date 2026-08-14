import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";

/* ------------------------------------------------------------------ */
/*  CONFIG — replace with your real values                             */
/* ------------------------------------------------------------------ */
const FLUTTERWAVE_PUBLIC_KEY = "FLWPUBK_TEST-xxxxxxxxxxxxxxxx"; // your Flutterwave public key
const FLUTTERWAVE_PAYMENT_LINK = "https://checkout.flutterwave.com/pay/YOUR_LINK_ID"; // fallback link
const WHATSAPP_NUMBER = "2349110152566"; // customer care number, international format, NO "+" sign
const BRAND_NAME = "EmbraceTech";

type PaymentMethod = "flutterwave" | "whatsapp";

function formatPrice(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

/* Loads Flutterwave inline checkout (v3) script once */
function loadFlutterwaveScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).FlutterwaveCheckout) return resolve();
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Flutterwave checkout"));
    document.body.appendChild(script);
  });
}

export function Cart() {
  const { items, removeItem, updateQuantity, totalAmount, totalItems } = useCart();

  /* CHANGE: payment method state — Flutterwave selected by default */
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("flutterwave");
  const [isProceeding, setIsProceeding] = useState(false);
  /* CHANGE: single Proceed handler for both flows */
  async function handleProceed() {
    if (paymentMethod === "whatsapp") {
      // Build a single comma-separated list of ALL products and quantities
      const productList = items
        .map((item) => `${item.product.name} x${item.quantity}`)
        .join(", ");

      const message = `Hi ${BRAND_NAME}, Order Inquiry: ${productList}.`;

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    // Default -> Flutterwave checkout with the cart total (Card, Bank Transfer, USSD)
    setIsProceeding(true);
    try {
      await loadFlutterwaveScript();
      (window as any).FlutterwaveCheckout({
        public_key: FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: `ET-${Date.now()}`,
        amount: totalAmount,
        currency: "NGN",
        payment_options: "card,banktransfer,ussd",
        customer: { email: "customer@embracetech.com", name: `${BRAND_NAME} Customer` },
        customizations: {
          title: `${BRAND_NAME} Checkout`,
          description: `Order of ${formatPrice(totalAmount)}`,
        },
        callback: (_response: unknown) => {
          // TODO: verify transaction on your backend, then redirect to success page
          setIsProceeding(false);
        },
        onclose: () => setIsProceeding(false),
      });
    } catch {
      // Fallback: open the plain payment link if the script fails to load
      window.open(FLUTTERWAVE_PAYMENT_LINK, "_blank", "noopener,noreferrer");
      setIsProceeding(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="w-full min-h-screen bg-slate-50 pt-48 pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl">
            <h1 className="text-4xl font-anton text-slate-900">Your Cart is Empty.</h1>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-secondary px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary transition hover:bg-[#EA6936]"
              >
                Continue Shopping
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-sm border border-slate-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-secondary hover:text-secondary"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-slate-50 py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-secondary font-montserrat font-semibold">
              Shopping Cart
            </p>
            <h1 className="mt-3 text-4xl font-anton text-slate-900">Review your selected items</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 font-poppins">
              Update quantities, remove items, or continue shopping before checkout.
            </p>
          </div>
          <div className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm">
            {totalItems} item{totalItems === 1 ? "" : "s"} in cart
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.product.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-28 w-28 overflow-hidden rounded-3xl bg-slate-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">{item.product.name}</h2>
                      <p className="mt-2 text-sm text-slate-500">{item.product.description}</p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                        {item.product.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="mx-3 min-w-[2rem] text-center font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Unit price</p>
                      <p className="mt-1 text-lg font-semibold text-slate-900">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 transition group-hover:text-red-600" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="rounded-[1.75rem] bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Order summary</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Estimate delivery</span>
                  <span>Free</span>
                </div>
              </div>
            </div>

            {/* CHANGE: payment method selector — shown before checkout */}
            <fieldset className="space-y-3">
              <legend className="sr-only">Choose payment method</legend>

              {/* Option 1 — Pay Online with Flutterwave (default) */}
              <label
                className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition ${paymentMethod === "flutterwave"
                  ? "border-[#EA6936] bg-orange-50/60 ring-1 ring-[#EA6936]"
                  : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  value="flutterwave"
                  checked={paymentMethod === "flutterwave"}
                  onChange={() => setPaymentMethod("flutterwave")}
                  className="mt-1 h-4 w-4 accent-[#EA6936]"
                />
                <span>
                  <span className="block text-sm font-semibold text-slate-900 font-montserrat">
                    Pay Online with Flutterwave
                  </span>
                  <span className="mt-1 block text-xs text-slate-500 font-poppins">
                    Card, Bank Transfer, USSD
                  </span>
                </span>
              </label>

              {/* Option 2 — Talk to Sales on WhatsApp */}
              <label
                className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition ${paymentMethod === "whatsapp"
                  ? "border-[#EA6936] bg-orange-50/60 ring-1 ring-[#EA6936]"
                  : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  value="whatsapp"
                  checked={paymentMethod === "whatsapp"}
                  onChange={() => setPaymentMethod("whatsapp")}
                  className="mt-1 h-4 w-4 accent-[#EA6936]"
                />
                <span>
                  <span className="block text-sm font-semibold text-slate-900 font-montserrat">
                    Talk to Sales on WhatsApp
                  </span>
                  <span className="mt-1 block text-xs text-slate-500 font-poppins">
                    Get quote, installation &amp; support
                  </span>
                </span>
              </label>
            </fieldset>

            {/* CHANGE: only ONE orange Proceed button */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleProceed}
                disabled={isProceeding}
                className="w-full rounded-sm bg-[#EA6936] px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isProceeding ? "Opening…" : "Proceed"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}