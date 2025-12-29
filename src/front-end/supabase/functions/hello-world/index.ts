import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("Hello from Functions!");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  const headersObj = Object.fromEntries(req.headers.entries());

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: { headers: { Authorization: req.headers.get("Authorization")! } },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  const { name } = await req.json();

  const UserInfo = await supabase.from("app_users").select("name").eq(
    "email",
    name,
  );

  const data = {
    message: { name },
    headersObj,
    user,
    UserInfo,
  };

  return new Response(JSON.stringify(data), {
    headers: {
      ...CORS,
      "Content-Type": "application/json",
      "Connection": "keep-alive",
    },
  });
});
