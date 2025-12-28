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

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") as string,
    Deno.env.get("SUPABASE_ANON_KEY") as string,
    { global: { headers: CORS } },
  );

  // const { data: { user } } = await supabase.auth.getUser();

  const { email } = await req.json();

  const data = await supabase.from("app_users").select("name").eq("email", email)
    .limit(1).single();

  const name = data.data?.name;

  return new Response(
    JSON.stringify(
      {
        message: "Login function placeholder",
        name,
        // user
      },
    ),
    {
      headers: {
        ...CORS,
        "Content-Type": "application/json",
      },
    },
  );
});
