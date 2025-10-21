import { BASE_URL } from "@/lib/constants";
import { drugType } from "@/lib/types";

export async function server_getDrug(slug: string): Promise<drugType> {
  try {
    let url = `${BASE_URL}drugs/${slug}`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // always fetch fresh data in Next.js App Router
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch drugs: ${res.status}`);
    }

    const data = (await res.json()) as drugType;
    return data;
  } catch (error) {
    console.error("Error fetching drugs:", error);
    throw error;
  }
}
