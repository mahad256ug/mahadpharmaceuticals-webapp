import { API_BASE_URL } from "@/lib/constants";
import { drugType } from "@/lib/types";

export async function server_getHomeFtDrugs(): Promise<drugType[]> {
  try {
    let url = `${API_BASE_URL}drugs/home-featured/`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch drugs: ${res.status}`);
    }

    const data = (await res.json()) as drugType[];
    return data;
  } catch (error) {
    console.error("Error fetching drugs:", error);
    throw error;
  }
}
