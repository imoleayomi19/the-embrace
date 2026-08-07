import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";

function formatPrice(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalAmount, totalItems } = useCart();

  if (items.length === 0) {
    return (
      // CHANGE 2: Increased top padding (pt-48) to shift the container down away from the navbar
      <main className="w-full min-h-screen bg-slate-50 pt-48 pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-xl">
            <h1 className="text-4xl font-anton text-slate-900">Your Cart is Empty.</h1>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/shop"
                // CHANGE 1: Removed hover:bg-yellow-400. Added hover:bg-primary hover:text-white for a non-yellow hover state.
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
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => window.alert("Proceed to checkout flow not implemented yet.")}
                // CHANGE 1 (Consistency): Updated checkout button hover to match the new non-yellow style
                className="w-full rounded-full bg-secondary px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary transition hover:bg-primary hover:text-white"
              >
                Checkout
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="w-full rounded-full border border-slate-200 bg-white px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-700 transition hover:border-red-300 hover:text-red-600"
              >
                Clear Cart
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}