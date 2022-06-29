import {
  Client,
  SANDBOX_URL,
  PRODUCTION_URL,
} from "https://deno.land/x/mvola@0.0.4/mod.ts";
import { colorize } from "https://deno.land/x/json_colorize@0.1.0/mod.ts";
import { colors } from "./colors.ts";

export async function generateToken(live = false, disableColors = false) {
  const mvola = new Client(live ? PRODUCTION_URL : SANDBOX_URL);
  const consumerKey = Deno.env.get("CONSUMER_KEY");
  const consumerSecret = Deno.env.get("CONSUMER_SECRET");
  const data = await mvola.auth.generateToken(consumerKey!, consumerSecret!);

  if (disableColors) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }
  
  console.log(colorize(JSON.stringify(data, null, 2), {  colors }));
}
