"use client";
import Layout from "@/components/Layout/Layout";
import { getAboutUs, getCompanyName } from "@/redux/reducer/settingSlice";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { t } from "@/utils";

const hasMeaningfulHtml = (html) => {
  if (!html || typeof html !== "string") return false;
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > 0;
};

const AboutUs = ({ breadcrumbTitleKey = "aboutUs" }) => {
  const aboutUs = useSelector(getAboutUs);
  const companyName = useSelector(getCompanyName);
  const siteLabel =
    (companyName && String(companyName).trim()) ||
    process.env.NEXT_PUBLIC_META_TITLE ||
    "eClassify";
  const showFallback = !hasMeaningfulHtml(aboutUs);

  return (
    <Layout>
      <BreadCrumb title2={t(breadcrumbTitleKey)} />
      <div className="container py-7">
        {!showFallback && (
          <div className="max-w-full prose lg:prose-lg">{parse(aboutUs)}</div>
        )}
        {showFallback && (
          <div className="max-w-3xl space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">
              {t("aboutUs")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("aboutFallbackTagline")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("aboutFallbackP1").replace("{name}", siteLabel)}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("aboutFallbackP2")}
            </p>
            <p className="text-sm text-muted-foreground border-l-4 border-primary/30 pl-4">
              {t("aboutFallbackAdminHint")}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AboutUs;
