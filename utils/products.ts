export interface Product {
  Id: number
  Category: string
  "Sub-category": string
  "Sub-Sub-Category": string
  Name: string
  Composition: string
  Packing: string
  Mrp: number
 "Image-link": string
 "Visual-aid": string | null
}

export let PRODUCTS: Product[] = []

// Load products data
import("./product").then((module) => {
  PRODUCTS = module.default
})

// Helper function to generate slug from product name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

// Helper function to find product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => generateSlug(product.Name) === slug)
}

// Helper function to get related products by category
export function getRelatedProducts(subsubcategory: string, excludeId: number): Product[] {
  return PRODUCTS.filter((product) =>  product["Sub-Sub-Category"] === subsubcategory && product.Id !== excludeId).slice(0, 3)
}

