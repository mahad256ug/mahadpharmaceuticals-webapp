interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
}

async function verifyTurnstileToken(token: string): Promise<TurnstileResponse> {
  const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: SECRET_KEY,
        response: token,
      }),
    }
  );

  return (await response.json()) as TurnstileResponse;
}
