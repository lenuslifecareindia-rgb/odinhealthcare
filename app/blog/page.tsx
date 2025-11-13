"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Search } from "lucide-react"
import { useState, useMemo } from "react"

interface BlogArticle {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  readTime: string
  featured: boolean
  image: string
}

const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "1",
    title: "The Future of Pharmaceutical Innovation",
    excerpt: "Exploring the latest advancements in drug development and their impact on healthcare.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Dr. Rajesh Kumar",
    date: "2024-11-15",
    category: "Industry Insights",
    readTime: "5 min read",
    featured: true,
    image: "/pharmaceutical-research.jpg",
  },
  {
    id: "2",
    title: "GMP Certification: What It Means for Your Health",
    excerpt: "Understanding Good Manufacturing Practice and why it matters for pharmaceutical safety.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Dr. Priya Sharma",
    date: "2024-11-10",
    category: "Regulatory",
    readTime: "7 min read",
    featured: true,
    image: "/gmp-certification.jpg",
  },
  {
    id: "3",
    title: "Vitamin Deficiency: Signs and Solutions",
    excerpt: "A comprehensive guide to recognizing vitamin deficiencies and treatment options.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Dr. Amit Patel",
    date: "2024-11-05",
    category: "Health Tips",
    readTime: "6 min read",
    featured: false,
    image: "/vitamins-health.jpg",
  },
  {
    id: "4",
    title: "Antibiotic Resistance: A Global Challenge",
    excerpt: "How proper antibiotic usage can help combat the growing resistance crisis.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Dr. Neha Gupta",
    date: "2024-10-28",
    category: "Industry Insights",
    readTime: "8 min read",
    featured: false,
    image: "/antibiotics-resistance.jpg",
  },
  {
    id: "5",
    title: "Diabetes Management: Best Practices",
    excerpt: "Effective strategies for managing diabetes through medication and lifestyle changes.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Dr. Sanjay Singh",
    date: "2024-10-20",
    category: "Health Tips",
    readTime: "6 min read",
    featured: false,
    image: "/diabetes-management.jpg",
  },
  {
    id: "6",
    title: "ISO Standards in Pharmaceutical Manufacturing",
    excerpt: "An overview of ISO compliance requirements and quality assurance processes.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Dr. Anjali Verma",
    date: "2024-10-12",
    category: "Regulatory",
    readTime: "7 min read",
    featured: false,
    image: "/iso-standards.jpg",
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const categories = Array.from(new Set(BLOG_ARTICLES.map((a) => a.category)))

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesCategory = !selectedCategory || article.category === selectedCategory
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  const featuredArticles = BLOG_ARTICLES.filter((a) => a.featured)
  const regularArticles = filteredArticles.filter((a) => !a.featured)

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-blue-900 text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Healthcare & Wellness Blog</h1>
            <p className="text-primary-foreground/90 text-lg max-w-2xl">
              Insights, tips, and industry updates from pharmaceutical experts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-8"
            >
              Featured Articles
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {article.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(article.date).toLocaleDateString()}
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-accent" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
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
                placeholder="Search articles..."
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
                <h2 className="text-lg font-semibold mb-6">Categories</h2>

                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedCategory === null ? "bg-accent text-accent-foreground font-semibold" : "hover:bg-muted"
                    }`}
                  >
                    All Articles
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
                  <p className="text-sm text-muted-foreground">Showing {regularArticles.length} articles</p>
                </div>
              </div>
            </motion.aside>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              {regularArticles.length > 0 ? (
                <div className="space-y-6">
                  {regularArticles.map((article, index) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow group cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="sm:w-48 h-40 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium">
                                {article.category}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User size={14} />
                                {article.author}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(article.date).toLocaleDateString()}
                              </div>
                              <span>{article.readTime}</span>
                            </div>
                            <ArrowRight
                              size={18}
                              className="text-accent group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-card border border-border rounded-lg p-12 text-center"
                >
                  <p className="text-lg text-muted-foreground">No articles found matching your search.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
