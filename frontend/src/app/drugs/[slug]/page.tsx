import { Metadata } from "next";

// components
import { splitTextByCommas } from "@/lib/utils";
import { server_getDrug } from "@/actions/getDrug";
import PageContent from "./_components/page-content";

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
      const cleanDescription = drug.description
        ?.replace(/<[^>]+>/g, "")
        .slice(0, 150)
        ? `in uae Dubai, Abu Dhabi, Sharjah, Ajman, Fujairah, RAK, and Umm Al Quwain erectile dysfunction sexual near me +971522820802, ${drug.description
            ?.replace(/<[^>]+>/g, "")
            .slice(0, 160)}`
        : "Explore detailed information, dosage, and pricing for this medicine.";

      return {
        metadataBase: new URL("https://mahadpharmaceuticals.com"),
        title: `buy ${drug.name} pill | contraceptive near me whatsapp or contact +971522820802 in uae`,
        description: `buy ${drug.name} — ${cleanDescription} bu`,
        keywords: [
          ...splitTextByCommas(drug.keywords ?? ""),
          "Mahad's pharmacy",
          "Mahad Pharmaceuticals",
          "buy medicine online",
          "pharmacy UAE",
          "prescription drugs",
          "healthcare products",
        ],
        alternates: {
          canonical: `/drugs/${slug}`,
        },
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
                  url:
                    drug.thumbnail ??
                    "https://mahadpharmaceuticals.com/logo-og.png",
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
            drug.thumbnail ?? "https://mahadpharmaceuticals.com/logo-og.png",
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
