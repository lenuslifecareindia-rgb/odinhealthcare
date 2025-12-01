"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { z } from "zod"
import toast from "react-hot-toast"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = contactSchema.safeParse(formData)

    if (!validation.success) {
      const firstError = validation.error.errors[0]?.message
      toast.error(firstError || "Invalid form inputs")
      return
    }

    toast.loading("Sending message...")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      toast.dismiss()

      if (data.success) {
        toast.success("Message sent successfully!")
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        toast.error("Failed to send message")
      }
    } catch (error) {
      toast.dismiss()
      toast.error("Something went wrong")
    }
  }


  const features = [
    { title: "GMP Certified", description: "Manufacturing facility certified by Good Manufacturing Practice" },
    { title: "ISO Compliance", description: "Meets all international ISO standards for quality assurance" },
    { title: "Wide Range", description: "Extensive portfolio of pharmaceutical products across categories" },
    { title: "24/7 Support", description: "Dedicated customer support team available round the clock" },
  ]

  const categories = [
    { name: "Tablets", icon: "💊" },
    { name: "Capsules", icon: "💉" },
    { name: "Injections", icon: "🧬" },
    { name: "Syrups", icon: "🥤" },
  ]

  const imageUrl = "https://i.ibb.co/Qv5WPN6p/New-Project.jpg"

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="from-primary to-blue-900 text-primary-foreground py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />


        {/* Gradient overlay to improve contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-blue-900/10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Premium Healthcare Solutions
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-balance">
              Odin Healthcare delivers high-quality pharmaceutical products with trusted certifications and excellence
              in every product
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/products"
                className="bg-destructive text-destructive-foreground px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all inline-flex items-center gap-2"
              >
                Explore Products <ArrowRight size={20} />
              </Link>
              <a
                href="#contact"
                className="bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.h2 {...fadeInUp} className="text-3xl font-bold text-center mb-12">
            Why Choose Odin Healthcare
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-6 rounded-lg border border-border hover:shadow-lg transition-shadow"
              >
                <Check className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 {...fadeInUp} className="text-3xl font-bold text-center mb-12">
            Our Product Categories
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card p-8 rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all cursor-pointer text-center"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="text-center mt-8">
            <Link
              href="/products"
              className="inline-block bg-destructive text-destructive-foreground px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-3xl mx-auto">
          <motion.h2 {...fadeInUp} className="text-3xl font-bold text-center mb-12">
            Get in Touch
          </motion.h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent bg-background"
                placeholder="Your name"
              />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent bg-background"
                placeholder="your@email.com"
              />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent bg-background"
                placeholder="+91 92186 30464"
              />
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent bg-background resize-none"
                placeholder="Your inquiry..."
              />
            </motion.div>
            <motion.button
              {...fadeInUp}
              transition={{ delay: 0.5 }}
              type="submit"
              className="w-full bg-destructive text-destructive-foreground py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </section>
    </main>
  )
}
