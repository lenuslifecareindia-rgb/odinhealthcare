"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Package, Tag } from "lucide-react"
import Link from "next/link"
import { type Product, generateSlug } from "@/utils/products"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import toast from "react-hot-toast"

interface ProductDetailsClientProps {
    product: Product
    relatedProducts: Product[]
}

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Phone number is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [phone, setPhone] = useState("")
    // const [message, setMessage] = useState("")
    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     const whatsappMessage = `Hi Rajeev, I am interested in ${product.Name}. My name is ${name}, email: ${email}, phone: ${phone}, message: ${message}`
    //     const url = `https://wa.me/9218630464?text=${encodeURIComponent(whatsappMessage)}`
    //     window.open(url, '_blank')
    // }

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

    const handleDownload = async () => {
        try {
            const imageUrl = product["Visual-aid"];
            if (!imageUrl) {
                toast.error("Image not available for download");
                return;
            }
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "visual-aid.jpg"; // custom filename
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed", error);
        }
    };

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
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{product.Name}</h1>
                        <p className="text-primary-foreground/90 text-lg max-w-2xl">{product.Composition}</p>
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
                            {product["Image-link"] ? (
                                <img
                                    src={product["Image-link"] || "/placeholder.svg"}
                                    alt={product.Name}
                                    className="max-w-full h-auto max-h-96 object-contain rounded-lg"
                                />
                            ) : (
                                <img
                                    src={"/odin.png"}
                                    alt={product.Name}
                                    className="max-w-full h-auto max-h-96 object-contain rounded-lg"
                                />
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
                                    <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-full">
                                        <Tag size={16} />
                                        {product.Category}
                                    </span>
                                </div>

                                <h2 className="text-3xl font-bold mb-4">{product.Name}</h2>
                                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{product.Composition}</p>

                                <div className="flex items-center gap-2 mb-8 pb-6 border-b border-border">
                                    <Package size={20} className="text-accent" />
                                    <span className="text-muted-foreground">Category:</span>
                                    <span className="font-medium">{product.Category}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-8 pb-6 border-b border-border">
                                    <Package size={20} className="text-accent" />
                                    <span className="text-muted-foreground">Sub-Category:</span>
                                    <span className="font-medium">{product["Sub-category"]} ,{product["Sub-Sub-Category"]}</span>
                                </div>

                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-muted-foreground text-lg">Price</span>
                                    {/* <span className="text-4xl font-bold text-destructive">{product.Mrp}</span> */}
                                    <a href={`https://wa.me/9218630464?text=Hi%20Rajeev%20can%20I%20Know%20more%20about%20${product.Name}%20${product.Category}`} target="_blank" className="hover:text-accent transition-colors">
                                        <span className="text-4xl font-bold text-destructive">XXX</span>
                                    </a>
                                </div>
                                {/* <a href={`https://wa.me/9218630464?text=Hi%20Rajeev%20can%20I%20Know%20more%20about%20${product.Name}%20${product.Category}`} target="_blank" className="hover:text-accent transition-colors">
                                    <button className="w-full bg-destructive text-destructive-foreground py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all">
                                        Contact for Information
                                    </button>
                                </a> */}

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="w-full bg-destructive text-destructive-foreground py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all cursor-pointer">
                                            Contact for Information
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Contact for Information</DialogTitle>
                                            <DialogDescription>
                                                Get in touch with us for more details about {product.Name}.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit}>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="phone">Phone</Label>
                                                    <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="message">Message</Label>
                                                    <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button type="button" variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button type="submit">Send Message</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>


                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            {/* Visual-aid Section */}
            {product["Visual-aid"] && (
                <section className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-8">Visual Aid</h2>
                            <div className="bg-card border border-border rounded-lg p-8 flex flex-col items-center">
                                <img
                                    src={product["Visual-aid"]}
                                    alt="Visual Aid"
                                    className="max-w-full h-auto max-h-96 object-contain rounded-lg mb-4"
                                />
                                {/* <a
                                    href={product["Visual-aid"]}
                                    target="_blank"
                                    download="visual-aid.jpg"
                                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                                >
                                    Download Image
                                </a> */}
                                <button
                                    onClick={handleDownload}
                                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                                >
                                    Download Image
                                </button>

                            </div>
                        </motion.div>
                    </div>
                </section>
            )}
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
                                        key={relatedProduct.Id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    >
                                        <Link href={`/products/${generateSlug(relatedProduct.Name)}`}>
                                            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-accent transition-all cursor-pointer group">
                                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                                    {relatedProduct["Image-link"] ? (
                                                        <div className="w-full h-32 flex items-center justify-center">
                                                            <img
                                                                src={relatedProduct["Image-link"] || "/placeholder.svg"}
                                                                alt={relatedProduct.Name}
                                                                className="max-h-full object-contain"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-32 flex items-center justify-center">
                                                            <img
                                                                src={"/odin.png"}
                                                                alt={relatedProduct.Name}
                                                                className="max-h-full object-contain"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                                                    {relatedProduct.Name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-3">{relatedProduct.Composition}</p>
                                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-white rounded-full">
                                                        {relatedProduct.Category}
                                                    </span>
                                                    {/* <span className="text-lg font-bold text-destructive">{relatedProduct.Mrp}</span> */}
                                                    <a href={`https://wa.me/9218630464?text=Hi%20Rajeev%20can%20I%20Know%20more%20about%20${product.Name}%20${product.Category}`} target="_blank" className="hover:text-accent transition-colors">
                                                        <span className="text-lg font-bold text-destructive">XXX</span>
                                                    </a>
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
