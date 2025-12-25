"use client"
import Image from 'next/image';
import { motion } from "framer-motion"

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
}

export default function AboutUs() {

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1 {...fadeInUp} className="text-3xl font-bold text-center mb-8">
                About Us
            </motion.h1>

            {/* Section 1: About Odin Healthcare Pvt. Ltd. */}
            <motion.section {...fadeInUp} className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <Image
                            src="https://i.ibb.co/Qv5WPN6p/New-Project.jpg" // Placeholder: Replace with actual image path
                            alt="Odin Healthcare Pvt. Ltd."
                            width={500}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <h2 className="text-2xl font-semibold mb-4">About Odin Healthcare Pvt. Ltd.</h2>
                        <p className="text-gray-700">
                            <strong>Odin Healthcare Pvt. Ltd.</strong> is a trusted and fast-growing Indian pharmaceutical company, established with commitment to deliver high-quality, affordable medicines while creating profitable and long-term opportunities for PCD Pharma Franchise partners across India.
                        </p>
                        <p className="text-gray-700 mt-4">
                            Founded by <strong>Mr. Raman Aggarwal</strong>, Odin Healthcare started its journey with only 7 products and has today grown into a strong pharmaceutical organization with a portfolio of 350+ products covering multiple therapeutic segments. Our consistent growth reflects our focus on quality, ethical practices, and partner-centric business models.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Section 2: Why Choose Odin Healthcare for PCD Franchise? */}
            <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row-reverse items-center">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <Image
                            src="https://i.ibb.co/tw4nQxMm/product-image.png" // Placeholder: Replace with actual image path
                            alt="Why Choose Odin Healthcare"
                            width={500}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/2 md:pr-8">
                        <h2 className="text-2xl font-semibold mb-4">Why Choose Odin Healthcare for PCD Franchise?</h2>
                        <p className="text-gray-700">
                            At Odin Healthcare, we believe that our success lies in the success of our franchise partners. We offer <strong>PAN-India PCD Pharma Franchise opportunities</strong> with exclusive monopoly rights, ensuring no internal competition and maximum growth potential for our associates.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Our Key Strengths */}
            <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <Image
                            src="https://i.ibb.co/gMgJhTDk/Untitled-design-4.png" // Placeholder: Replace with actual image path
                            alt="Our Key Strengths"
                            width={500}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <h2 className="text-2xl font-semibold mb-4">Our Key Strengths</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>350+ Quality-Assured Products across major therapeutic segments</li>
                            <li>WHO-GMP Certified Manufacturing through our own unit, <a className='text-blue-500 underline font-semibold' href="https://www.lenuslifecare.com/" target='_blank'>Lenus Lifecare Pvt. Ltd.</a>, and reputed associate manufacturers</li>
                            <li>Monopoly-Based PCD Franchise Model</li>
                            <li>Attractive Margins & Competitive Pricing</li>
                            <li>Timely Product Supply & Consistent Availability</li>
                            <li>Ethical Promotion & Transparent Dealings</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 4: Manufacturing & Quality Assurance */}
            <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row-reverse items-center">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <Image
                            src="https://i.ibb.co/mFMbs5zY/Untitled-design-5.png" // Placeholder: Replace with actual image path
                            alt="Manufacturing & Quality Assurance"
                            width={500}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/2 md:pr-8">
                        <h2 className="text-2xl font-semibold mb-4">Manufacturing & Quality Assurance</h2>
                        <p className="text-gray-700">
                            Quality is the backbone of Odin Healthcare. Our in-house manufacturing facility, Lenus Lifecare Pvt. Ltd., is WHO-GMP certified and manufactures injections, ointments, soft gelatin capsules, and ophthalmic products. Tablets, capsules, syrups, and suspensions are produced through carefully selected WHO-GMP approved third-party manufacturers, ensuring strict quality control at every stage.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 5: Wide Therapeutic Product Range */}
            <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <Image
                            src="https://i.ibb.co/V0jvtgFs/Chat-GPT-Image-Dec-11-2025-11-37-35-AM.png" // Placeholder: Replace with actual image path
                            alt="Wide Therapeutic Product Range"
                            width={500}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <h2 className="text-2xl font-semibold mb-4">Wide Therapeutic Product Range</h2>
                        <p className="text-gray-700 mb-4">
                            Our diversified product portfolio enables franchise partners to cover multiple medical specialties, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>General Medicine</li>
                            <li>Cardiology & Diabetology</li>
                            <li>Dermatology & Cosmetics</li>
                            <li>Gynecology</li>
                            <li>Pediatrics</li>
                            <li>Orthopedics</li>
                            <li>Ophthalmology</li>
                            <li>Dental Care</li>
                            <li>Critical Care</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            This wide coverage helps our PCD partners build strong doctor networks and expand business rapidly in their respective territories.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 6: Complete Franchise Support */}
            <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row-reverse items-center">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <Image
                            src="https://i.ibb.co/0V6frfjx/Untitled-design-3.png" // Placeholder: Replace with actual image path
                            alt="Complete Franchise Support"
                            width={500}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/2 md:pr-8">
                        <h2 className="text-2xl font-semibold mb-4">Complete Franchise Support</h2>
                        <p className="text-gray-700 mb-4">
                            To ensure smooth business operations and market success, Odin Healthcare provides:
                        </p>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>High-quality visual aids & promotional materials</li>
                            <li>Marketing and launch support</li>
                            <li>Product training and guidance</li>
                            <li>Dedicated support team</li>
                            <li>Long-term association focus</li>
                        </ul>
                        <p className="text-gray-700 mt-4">
                            With a growing network of 100+ successful PCD associates across India, Odin Healthcare continues to strengthen its presence as a preferred PCD Pharma Company.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 7: Our Vision */}
            <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <Image
                            src="https://i.ibb.co/8Dj8h1jn/Untitled-design-6.png" // Placeholder: Replace with actual image path
                            alt="Our Vision"
                            width={500}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                        <p className="text-gray-700">
                            To become a leading PCD-focused pharmaceutical company by offering reliable medicines, ethical business practices, and growth-driven franchise opportunities that contribute to better healthcare access across India.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}