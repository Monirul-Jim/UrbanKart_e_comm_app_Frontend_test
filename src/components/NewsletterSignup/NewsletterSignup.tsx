"use client";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setStatus("loading");

      // 👉 API call (replace with Mailchimp or your backend)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="bg-indigo-600 py-16 px-6 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">📩 Stay Updated</h2>
      <p className="mb-6 text-lg">Subscribe to get updates on flash sales & offers.</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center max-w-lg mx-auto gap-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-3 rounded-lg text-black w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition w-full sm:w-auto"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-4 text-green-200 font-medium">
          ✅ Thank you for subscribing!
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-200 font-medium">
          ❌ Something went wrong. Please try again.
        </p>
      )}
    </section>
  );
}
