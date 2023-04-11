"use client";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";

export default function LoginPage() {
  const [supabase] = useState(() => createBrowserSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ))
  const signIn = async() => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }
  return (
    <Layout hideNafigation={true}>
      <div className=" flex items-center justify-center overflow-hidden dark:text-white">
        <div className="max-w-xs h-[400px]">
          <h1 className="text-6xl mb-4 text-gray-400 text-center">Login</h1>
          <Card noPadding={true}>
            <div className="rounded-md overflow-hidden">
              <button
              onClick={signIn}
                href="/"
                className="flex p-5 gap-2 items-center justify-center hover:bg-socialBlue hover:text-white hover:border-b-0 hover:scale-110 transition-all"
              >
                <svg
                  className="h-8 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                Login With Google
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
