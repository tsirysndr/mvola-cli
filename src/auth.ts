import { Client, SANDBOX_URL, PRODUCTION_URL } from "https://deno.land/x/mvola@0.0.4/mod.ts";

export async function generateToken(live = false) {
  const mvola = new Client(live ? PRODUCTION_URL : SANDBOX_URL);
  const consumerKey = Deno.env.get("CONSUMER_KEY");
  const consumerSecret = Deno.env.get("CONSUMER_SECRET");
  const data = await mvola.auth.generateToken(consumerKey!, consumerSecret!);
  console.log(JSON.stringify(data, null, 2));
}
