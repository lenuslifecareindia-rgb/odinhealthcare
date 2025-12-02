export interface Product {
  id: string
  name: string
  category: string
  description: string
  price: string
  icon: string
  image?: string | undefined
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Aspirin 500mg",
    category: "Tablets",
    description: "Pain relief and fever reduction tablets",
    price: "₹45",
    icon: "💊",
    image: "https://placehold.co/400/00285f/white?text=Odin+Healthcare+Product",
  },
  {
    id: "2",
    name: "Vitamin D3 Tablets",
    category: "Tablets",
    description: "Essential vitamin D supplementation",
    price: "₹120",
    icon: "💊",
    image: "https://placehold.co/400/00285f/white?text=Odin+Healthcare+Product",
  },
  {
    id: "3",
    name: "Multivitamin Capsules",
    category: "Capsules",
    description: "Complete nutritional support capsules",
    price: "₹180",
    icon: "💉",
    image: "https://placehold.co/400/00285f/white?text=Odin+Healthcare+Product",
  },
  {
    id: "4",
    name: "Omega-3 Softgels",
    category: "Capsules",
    description: "Heart health omega-3 fatty acids",
    price: "₹250",
    icon: "💉",
    image: "https://placehold.co/400/00285f/white?text=Odin+Healthcare+Product",
  },
  {
    id: "5",
    name: "Acrid",
    category: "Injections",
    description: "Clindamycin Injection I.P",
    price: "₹320",
    icon: "🧬",
    image: "https://i.ibb.co/gZCJW2zB/Acrid.png",
  },
  {
    id: "6",
    name: "Alfadin",
    category: "Injections",
    description: "Arteether Injection 150mg",
    price: "₹450",
    icon: "🧬",
    image: "https://i.ibb.co/rRYfyB2V/Alfadin.png",
  },
  {
    id: "7",
    name: "Caldin Injection",
    category: "Injections",
    description: "Vitamin B12, Vitamin D3 & Calcium Gluconolactobionate Injection",
    price: "₹85",
    icon: "🧬",
    image: "https://i.ibb.co/CKw9j2v8/caldin.png",
  },
  {
    id: "8",
    name: "Cobaldin-25",
    category: "Injections",
    description: "Methylcobalamin Injection",
    price: "₹150",
    icon: "🧬",
    image: "https://i.ibb.co/zhpKTGc7/cobadin-25.png",
  },
  {
    id: "9",
    name: "Cobaldin",
    category: "Injections",
    description: "Methylcobalamin Injection",
    price: "₹150",
    icon: "🧬",
    image: "https://i.ibb.co/WNwmbb4r/cobadin.jpg",
  },
  {
    id: "10",
    name: "Cobaldin Forte",
    category: "Injections",
    description: "Methylcobalamin,Folic Acid, Niacinamide & Vitamin C Injection",
    price: "₹150",
    icon: "🧬",
    image: "https://i.ibb.co/93spXJBb/cobaldin-forte.png",
  },
]

// Helper function to generate slug from product name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

// Helper function to find product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => generateSlug(product.name) === slug)
}

// Helper function to get related products by category
export function getRelatedProducts(category: string, excludeId: string): Product[] {
  return PRODUCTS.filter((product) => product.category === category && product.id !== excludeId).slice(0, 3)
}
