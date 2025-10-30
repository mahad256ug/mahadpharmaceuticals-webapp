import { Metadata } from "next";

// components
import { server_getDrug } from "@/actions/getDrug";
import PageContent from "./_components/page-content";
import { splitTextByCommas } from "@/lib/utils";

// dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  try {
    const drug = await server_getDrug(slug);

    if (drug) {
      const cleanDescription =
        drug.description?.replace(/<[^>]+>/g, "").slice(0, 160) ||
        "Explore detailed information, dosage, and pricing for this medicine.";

      return {
        metadataBase: new URL("https://mahadpharmaceuticals.com"),
        title: `${drug.name} | Mahad Pharmaceuticals`,
        description: `Mahad Pharmaceuticals — ${cleanDescription}`,
        keywords: [
          ...splitTextByCommas(drug.keywords ?? ""),
          "Mahad's pharmacy",
          "Mahad Pharmaceuticals",
          "buy medicine online",
          "pharmacy UAE",
          "prescription drugs",
          "healthcare products",
        ],
        openGraph: {
          title: drug.name,
          description: cleanDescription,
          url: `https://mahadpharmaceuticals.com/drugs/${slug}`, // ✅ og:url
          siteName: "Mahad Pharmaceuticals",
          images: drug.thumbnail
            ? [
                {
                  url: drug.thumbnail,
                  width: 800,
                  height: 600,
                  alt: drug.name,
                },
              ]
            : [
                {
                  url: "https://mahadpharmaceuticals.com/logo-og.png",
                  width: 800,
                  height: 600,
                  alt: "Mahad Pharmaceuticals",
                },
              ],
          locale: "en_US",
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: `${drug.name} | Mahad Pharmaceuticals`,
          description: cleanDescription,
          images: [
            drug.thumbnail || "https://mahadpharmaceuticals.com/logo-og.png",
          ],
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: "Drug Not Found | Mahad Pharmaceuticals",
    description:
      "This drug is unavailable or no longer listed on Mahad Pharmaceuticals. Browse our catalog for other healthcare products and medicines.",
  };
}

// actual page
export default async function DrugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PageContent slug={slug} />;
}
