"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <img src="https://i.ibb.co/hFRbjz7V/New-Project-1.png" className="h-8" alt="Odin Logo" />
              {/* <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-primary">
              O
            </div>
            <span className="font-bold text-lg hidden sm:inline">Odin Healthcare</span> */}
            </Link>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Leading PCD pharmaceutical partner providing quality healthcare solutions.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/9218630464?text=Hi%20Rajeev%20can%20I%20Know%20more%20about%20product" target="_blank" className="hover:text-accent transition-colors">
                <FaWhatsapp className="text-white h-5" />
              </a>
              <a href="https://www.facebook.com/odinhc" target="_blank" className="hover:text-accent transition-colors">
                <ImFacebook2 className="text-white h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">

              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-accent transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/products?category=tablets" className="hover:text-accent transition-colors">
                  Tablets
                </a>
              </li>
              <li>
                <a href="/products?category=capsules" className="hover:text-accent transition-colors">
                  Capsules
                </a>
              </li>
              <li>
                <a href="/products?category=injections" className="hover:text-accent transition-colors">
                  Injections
                </a>
              </li>
              <li>
                <a href="/products?category=syrups" className="hover:text-accent transition-colors">
                  Syrups
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 items-start">
                <a className="flex gap-2 items-start" href="https://www.google.com/maps/place/Odin+Healthcare+Pvt+Ltd/@30.9230785,77.10135,16z/data=!4m6!3m5!1s0x390f87d654088901:0x28e757390261adff!8m2!3d30.9231659!4d77.1023371!16s%2Fg%2F11yp_qw77h?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D" target="_blank">
                  <MapPin size={18} className="mt-1 flex-shrink-0" />
                  <span className="text-primary-foreground/80">Plot no : 1, Chambaghat, Industrial area, Solan, Himachal Pradesh 173213</span>

                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={18} />
                <a href="tel:+919218630464" className="hover:text-accent transition-colors">
                  +91 92186 30464
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Mail size={18} />
                <a href="mailto:info@odinhealth.com" className="hover:text-accent transition-colors">
                  info@odinhealth.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/80">
            <p>&copy; 2025 Odin Healthcare. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
