import { getProducts, getCollections, getBlogArticles } from "@/lib/shopify/api";
import { buildItemListSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { CategoryExplorer } from "@/components/home/CategoryExplorer";
import { SecuritySystems } from "@/components/home/SecuritySystems";
import { SeriesFinder } from "@/components/home/SeriesFinder";
import { TechShowcase } from "@/components/home/TechShowcase";
import { BrandPromise } from "@/components/home/BrandPromise";
import { RewardsProgram } from "@/components/home/RewardsProgram";
import { BlogFeed } from "@/components/home/BlogFeed";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { FAQSection } from "@/components/home/FAQSection";

export default async function HomePage() {
  const [products, collections, articles] = await Promise.all([
    getProducts(12),
    getCollections(20),
    getBlogArticles(4),
  ]);

  return (
    <>
      {products.length > 0 && <JsonLd data={buildItemListSchema(products)} />}

      <HeroBanner />
      <ProductCarousel
        title="Built with Care"
        subtitle="Discover our latest innovations in smart home technology"
        products={products}
      />
      <CategoryExplorer collections={collections} />
      <SecuritySystems />
      <SeriesFinder />
      <TechShowcase />
      <BrandPromise />
      <RewardsProgram />
      <BlogFeed articles={articles} />
      <VideoShowcase />
      <FAQSection />
    </>
  );
}
