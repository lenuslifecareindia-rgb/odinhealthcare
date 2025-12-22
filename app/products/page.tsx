"use client"

import { motion } from "framer-motion"
import { Filter, Search } from "lucide-react"
import { useState, useMemo } from "react"
import Link from "next/link"
import { PRODUCTS, generateSlug } from "@/utils/products"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const categoryMap = useMemo(() => {
    const map = new Map<string, Map<string, Set<string>>>()
    PRODUCTS.forEach(product => {
      if (!map.has(product.Category)) map.set(product.Category, new Map())
      const subMap = map.get(product.Category)!
      if (!subMap.has(product["Sub-category"])) subMap.set(product["Sub-category"], new Set())
      subMap.get(product["Sub-category"])!.add(product["Sub-Sub-Category"])
    })
    return map
  }, [])

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = !selectedCategory || product.Category === selectedCategory
      const matchesSubCategory = !selectedSubCategory || product["Sub-category"] === selectedSubCategory
      const matchesSubSubCategory = !selectedSubSubCategory || product["Sub-Sub-Category"] === selectedSubSubCategory
      const matchesSearch =
        product.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.Composition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product["Sub-category"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        product["Sub-Sub-Category"].toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSubCategory && matchesSubSubCategory && matchesSearch
    })
  }, [selectedCategory, selectedSubCategory, selectedSubSubCategory, searchTerm])

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
                    onClick={() => {
                      setSelectedCategory(null)
                      setSelectedSubCategory(null)
                      setSelectedSubSubCategory(null)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedCategory === null && selectedSubCategory === null && selectedSubSubCategory === null
                        ? "bg-accent text-accent-foreground font-semibold"
                        : "hover:bg-muted"
                    }`}
                  >
                    All Products
                  </button>
                  {Array.from(categoryMap.entries()).map(([category, subMap]) => (
                    <div key={category} className="space-y-2">
                      <button
                        onClick={() => {
                          setSelectedCategory(category)
                          setSelectedSubCategory(null)
                          setSelectedSubSubCategory(null)
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          selectedCategory === category && selectedSubCategory === null && selectedSubSubCategory === null
                            ? "bg-accent text-accent-foreground font-semibold"
                            : "hover:bg-muted"
                        }`}
                      >
                        {category}
                      </button>
                      {selectedCategory === category &&
                        Array.from(subMap.entries()).map(([subCat, subSubSet]) => (
                          <div key={subCat} className="ml-4 space-y-1">
                            <button
                              onClick={() => {
                                setSelectedSubCategory(subCat)
                                setSelectedSubSubCategory(null)
                              }}
                              className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
                                selectedSubCategory === subCat && selectedSubSubCategory === null
                                  ? "bg-accent text-accent-foreground font-semibold"
                                  : "hover:bg-muted"
                              }`}
                            >
                              {subCat}
                            </button>
                            {selectedSubCategory === subCat &&
                              Array.from(subSubSet).map((subSub) => (
                                <button
                                  key={subSub}
                                  onClick={() => setSelectedSubSubCategory(subSub)}
                                  className={`w-full text-left px-4 py-2 rounded-lg transition-all text-xs ml-4 ${
                                    selectedSubSubCategory === subSub
                                      ? "bg-accent text-accent-foreground font-semibold"
                                      : "hover:bg-muted"
                                  }`}
                                >
                                  {subSub}
                                </button>
                              ))}
                          </div>
                        ))}
                    </div>
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
            <div className="lg:col-span-3 w-full">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.Id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-accent transition-all cursor-pointer group text-ellipsis overflow-hidden"
                    >

                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                        {product["Image-link"] ? (
                          <div className="w-full h-full">
                            <img src={product["Image-link"] || "/placeholder.svg"} alt={product.Name} />
                          </div>
                        ) : (
                          <div className="w-full h-full">
                            <img src={"/odin.png"} alt={product.Name} />
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                        {product.Name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 w-full text-ellipsis overflow-hidden text-nowrap">{product.Composition}</p>
                      <div className="flex flex-col md:flex-row items-center justify-between pt-4 border-t border-border">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-white rounded-full">
                          {product.Category}
                        </span>
                        {/* <span className="text-lg font-bold text-destructive">{product.Mrp}</span> */}
                        <a href={`https://wa.me/9218630464?text=Hi%20Rajeev%20can%20I%20Know%20more%20about%20${product.Name}%20${product.Category}`} target="_blank" className="hover:text-accent transition-colors">
                          <span className="text-sm font-bold text-destructive">Know More</span>
                        </a>
                      </div>
                      <Link href={`/products/${generateSlug(product.Name)}`}>
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
