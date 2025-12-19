"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { z } from "zod"
import toast from "react-hot-toast"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

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
  const [carouselApi, setCarouselApi] = useState<any>(null)

  useEffect(() => {
    if (!carouselApi) return

    const interval = setInterval(() => {
      carouselApi.scrollNext()
    }, 10000) // Auto-scroll every 10 seconds

    return () => clearInterval(interval)
  }, [carouselApi])

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

  const heroSlides = [
    {
      title: "Premium Healthcare Solutions",
      description: "Odin Healthcare delivers high-quality pharmaceutical products with trusted certifications and excellence in every product",
      image: "https://i.ibb.co/Qv5WPN6p/New-Project.jpg",
      ctaText: "Explore Products",
      ctaLink: "/products",
    },
    {
      title: "GMP Certified Excellence",
      description: "Manufacturing facility certified by Good Manufacturing Practice ensuring the highest quality standards",
      image: "https://i.ibb.co/mCQGcmpk/Chat-GPT-Image-Dec-10-2025-11-50-17-PM.png",
      ctaText: "Learn More",
      ctaLink: "/products",
    },
    {
      title: "Wide Range of Products",
      description: "Extensive portfolio of pharmaceutical products across multiple categories for all your healthcare needs",
      image: "https://i.ibb.co/V0jvtgFs/Chat-GPT-Image-Dec-11-2025-11-37-35-AM.png",
      ctaText: "View Catalog",
      ctaLink: "/products",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative overflow-hidden">
        <Carousel className="w-full" opts={{ loop: true }} setApi={setCarouselApi}>
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="from-primary to-blue-900 text-primary-foreground py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-96">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${slide.image})`,
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
                        {slide.title}
                      </h1>
                      <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-balance">
                        {slide.description}
                      </p>
                      <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                          href={slide.ctaLink}
                          className="bg-destructive text-destructive-foreground px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all inline-flex items-center gap-2"
                        >
                          {slide.ctaText} <ArrowRight size={20} />
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
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
        </Carousel>
      </section>
      {/* Welcome Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.h2 {...fadeInUp} className="text-3xl font-bold text-center mb-12">
            Welcome to Odin Healthcare
          </motion.h2>
          <div className="flex flex-col-reverse md:flex-row items-center md:space-x-8 space-y-6 md:space-y-0 max-w-5xl mx-auto gap-6">

            {/* Left Content */}
            <article className="flex-1 space-y-4">
              <h3 className="text-2xl font-semibold text-[#59AC77]">
                Your Trusted ISO 9001:2015-Certified Pharmaceutical Partner
              </h3>

              <p className="text-gray-700 leading-relaxed text-justify">
                Odin Health Care Pvt. Ltd. is an ISO 9001:2015–certified pharmaceutical
                company offering a wide portfolio of GMP-WHO certified products across
                Dermatology & Cosmetics, Cardiology & Diabetology, General Medicine,
                Critical Care, Dental Care, Ophthalmology, Gynecology, and Pediatrics.
              </p>

              <p className="text-gray-700 leading-relaxed text-justify">
                We provide PAN India <strong>PCD Pharma Franchise</strong> opportunities with
                <strong> exclusive monopoly rights</strong>, ensuring our partners grow with complete
                support. This includes promotional materials, marketing assistance,
                competitive pricing, and timely delivery of top-quality products.
              </p>

              <p className="text-gray-700 leading-relaxed text-justify">
                At Odin Health Care, we focus on long-term partnerships built on trust,
                innovation, and professional support to help you succeed in the
                fast-growing pharmaceutical industry.
              </p>
            </article>

            {/* Right Image */}
            <div className="flex-1">
              <img
                src="https://i.ibb.co/tw4nQxMm/product-image.png"
                alt="Odin Healthcare Pharmaceuticals - Product and Franchise Overview"
                className="w-full h-auto rounded-lg shadow-md object-cover"
              />
            </div>

          </div>
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
