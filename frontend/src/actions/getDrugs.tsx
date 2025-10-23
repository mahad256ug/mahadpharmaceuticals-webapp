import { API_BASE_URL } from "@/lib/constants";
import { drugType, PaginatedResponseType } from "@/lib/types";

export async function server_getDrugs(
  searchParam?: string | null,
  pageNum?: string | null
): Promise<PaginatedResponseType<drugType>> {
  try {
    const params = new URLSearchParams();

    if (searchParam) params.append("search", searchParam);
    if (pageNum) params.append("page", pageNum);

    const url = `${API_BASE_URL}drugs/${params.toString() ? `?${params}` : ""}`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // always fetch fresh data in Next.js App Router
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch drugs: ${res.status}`);
    }

    const data = (await res.json()) as PaginatedResponseType<drugType>;

    return data;
  } catch (error) {
    console.error("Error fetching drugs:", error);
    throw error;
  }
}
