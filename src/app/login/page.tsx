"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);    

  const sendMagicLink = async () => {
    if (!email) return;

    setLoading(true);

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h1 className="text-lg font-medium text-center mb-2">
          Sign in to nd-sdk
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email to receive a secure sign-in link.
        </p>

        {sent ? (
          <p className="text-sm text-center text-green-600">
            Check your email for the login link.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendMagicLink}
              disabled={loading}
              className="w-full rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send magic link"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
