import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import { ProductDetailClient } from "@/components/pdp/ProductDetailClient";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "상품을 찾을 수 없습니다" };
  }
  return {
    title: product.name,
    description: product.oneLiner,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
