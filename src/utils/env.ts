import "@std/dotenv/load";

if (!Deno.env.has("SESSION")) {
  throw new Error('Please provide your session token to use this!')
}

export default {
  SESSION: Deno.env.get("SESSION")!,
};
