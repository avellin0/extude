import "jsr:@supabase/functions-js/edge-runtime.d.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("Hello from Functions!");

// const CORS = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
// };

Deno.serve(async (req) => {
  const { name } = await req.json();
  const data = {
    message: `Hello ${name}!`,
  };

  return new Response(JSON.stringify(data), {
    headers: {"Content-Type": "application/json" },
  });
});
