import AnimatedApropos from "@/components/PagesComponent/StaticPages/AnimatedApropos";
import { SEO_REVALIDATE_SECONDS } from "@/lib/constants";
import { getPublicApiBase } from "@/lib/publicApiBase";

export const dynamic = "force-dynamic";

export const generateMetadata = async ({ searchParams }) => {
  try {
    if (process.env.NEXT_PUBLIC_SEO === "false") return;
    const apiBase = getPublicApiBase();
    if (!apiBase) return null;
    const params = await searchParams;
    const langCode = params?.lang || "en";
    const res = await fetch(
      `${apiBase}seo-settings?page=about-us`,
      {
        headers: {
          "Content-Language": langCode || "en",
        },
        next: {
          revalidate: SEO_REVALIDATE_SECONDS,
        },
      }
    );

    const data = await res.json();
    const aboutUs = data?.data?.[0];

    return {
      title: aboutUs?.translated_title || process.env.NEXT_PUBLIC_META_TITLE,
      description:
        aboutUs?.translated_description ||
        process.env.NEXT_PUBLIC_META_DESCRIPTION,
      openGraph: {
        images: aboutUs?.image ? [aboutUs?.image] : [],
      },
      keywords:
        aboutUs?.translated_keywords || process.env.NEXT_PUBLIC_META_kEYWORDS,
    };
  } catch (error) {
    console.error("Error fetching MetaData:", error);
    return null;
  }
};

const AproposPage = () => {
  return <AnimatedApropos breadcrumbTitleKey="apropos" />;
};

export default AproposPage;
