"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Package, Tag } from "lucide-react"
import Link from "next/link"
import { type Product, generateSlug } from "@/utils/products"

interface ProductDetailsClientProps {
    product: Product
    relatedProducts: Product[]
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
    return (
        <main className="min-h-screen bg-background">
            {/* Header Section */}
            <section className="bg-gradient-to-r from-primary to-blue-900 text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Products</span>
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{product.name}</h1>
                        <p className="text-primary-foreground/90 text-lg max-w-2xl">{product.description}</p>
                    </motion.div>
                </div>
            </section>

            {/* Product Details Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-card border border-border rounded-lg p-8 flex items-center justify-center"
                        >
                            {product.image ? (
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="max-w-full h-auto max-h-96 object-contain rounded-lg"
                                />
                            ) : (
                                <div className="text-9xl">{product.icon}</div>
                            )}
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex flex-col justify-center"
                        >
                            <div className="bg-card border border-border rounded-lg p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-accent/10 text-accent rounded-full">
                                        <Tag size={16} />
                                        {product.category}
                                    </span>
                                </div>

                                <h2 className="text-3xl font-bold mb-4">{product.name}</h2>

                                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{product.description}</p>

                                <div className="flex items-center gap-2 mb-8 pb-6 border-b border-border">
                                    <Package size={20} className="text-accent" />
                                    <span className="text-muted-foreground">Category:</span>
                                    <span className="font-medium">{product.category}</span>
                                </div>

                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-muted-foreground text-lg">Price</span>
                                    <span className="text-4xl font-bold text-destructive">{product.price}</span>
                                </div>
                                <a href={`https://wa.me/9218630464?text=Hi%20Rajeev%20can%20I%20Know%20more%20about%20${product.name}%20${product.category}`} target="_blank" className="hover:text-accent transition-colors">
                                    <button className="w-full bg-destructive text-destructive-foreground py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all">
                                        Contact for Information
                                    </button>
                                </a>

                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedProducts.map((relatedProduct, index) => (
                                    <motion.div
                                        key={relatedProduct.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    >
                                        <Link href={`/products/${generateSlug(relatedProduct.name)}`}>
                                            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-accent transition-all cursor-pointer group">
                                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                                    {relatedProduct.image ? (
                                                        <div className="w-full h-32 flex items-center justify-center">
                                                            <img
                                                                src={relatedProduct.image || "/placeholder.svg"}
                                                                alt={relatedProduct.name}
                                                                className="max-h-full object-contain"
                                                            />
                                                        </div>
                                                    ) : (
                                                        relatedProduct.icon
                                                    )}
                                                </div>
                                                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                                                    {relatedProduct.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-3">{relatedProduct.description}</p>
                                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                                                        {relatedProduct.category}
                                                    </span>
                                                    <span className="text-lg font-bold text-destructive">{relatedProduct.price}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}
        </main>
    )
}
