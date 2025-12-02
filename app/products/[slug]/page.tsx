import { notFound } from "next/navigation"
import { PRODUCTS, getProductBySlug, getRelatedProducts, generateSlug } from "@/utils/products"
import ProductDetailsClient from "@/components/product-details-client"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: generateSlug(product.name),
  }))
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name} - Odin Healthcare`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.category, product.id)

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
}