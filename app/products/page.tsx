"use client"

import { motion } from "framer-motion"
import { Filter, Search } from "lucide-react"
import { useState, useMemo } from "react"
import Link from "next/link"
import { PRODUCTS, generateSlug } from "@/utils/products"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const categories = Array.from(new Set(PRODUCTS.map((p) => p.category)))

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-blue-900 text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Product Catalog</h1>
            <p className="text-primary-foreground/90 text-lg max-w-2xl">
              Browse our comprehensive range of pharmaceutical products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent bg-card"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories Filter */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-8 bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-6">
                  <Filter size={20} className="text-accent" />
                  <h2 className="text-xl font-semibold">Categories</h2>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedCategory === null ? "bg-accent text-accent-foreground font-semibold" : "hover:bg-muted"
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        selectedCategory === category
                          ? "bg-accent text-accent-foreground font-semibold"
                          : "hover:bg-muted"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredProducts.length} of {PRODUCTS.length} products
                  </p>
                </div>
              </div>
            </motion.aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-accent transition-all cursor-pointer group"
                    >
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                        {product.image ? (
                          <div className="w-full h-full">
                            <img src={product.image || "/placeholder.svg"} alt={product.name} />
                          </div>
                        ) : (
                          product.icon
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                          {product.category}
                        </span>
                        <span className="text-lg font-bold text-destructive">{product.price}</span>
                      </div>
                      <Link href={`/products/${generateSlug(product.name)}`}>
                        <button className="w-full mt-4 bg-destructive text-destructive-foreground py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all">
                          View Details
                        </button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-card border border-border rounded-lg p-12 text-center"
                >
                  <p className="text-lg text-muted-foreground">No products found matching your search.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
