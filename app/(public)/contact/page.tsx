// app/(public)/contact/page.tsx
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone, UserPlus, MessageCircle } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us | VERITAS",
  description: "Get in touch with VERITAS team",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Header */}
      <div className="relative border-b border-gray-800 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600">
            Contact Us
          </h1>
          <p className="text-gray-400 text-xl mt-4 max-w-3xl">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
        {/* ⭐ NEW: Join Us Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Join as Member */}
          <a
            href="YOUR_MEMBERSHIP_LINK_HERE" // Replace with actual link
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl hover:border-indigo-500/50 transition-all overflow-hidden"
          >
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative flex items-start gap-4">
              <div className="p-3 bg-indigo-500/20 border border-indigo-500/30 rounded-lg group-hover:scale-110 transition-transform">
                <UserPlus className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  Join Us as a Member
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  Become part of our intellectual community. Access exclusive events, 
                  discussions, and resources.
                </p>
                <span className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium group-hover:gap-3 transition-all">
                  <span>Apply Now</span>
                  <ArrowLeft className="rotate-180 w-4 h-4" />
                </span>
              </div>
            </div>
          </a>

          {/* Join WhatsApp Group */}
          <a
            href="YOUR_WHATSAPP_GROUP_LINK_HERE" // Replace with actual link
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl hover:border-emerald-500/50 transition-all overflow-hidden"
          >
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative flex items-start gap-4">
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  Join Our WhatsApp Group
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  Stay connected with our community. Get updates, participate in discussions, 
                  and network with members.
                </p>
                <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium group-hover:gap-3 transition-all">
                  <span>Join Group</span>
                  <ArrowLeft className="rotate-180 w-4 h-4" />
                </span>
              </div>
            </div>
          </a>
        </section>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-black text-gray-500">Or reach out directly</span>
          </div>
        </div>

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-400 leading-relaxed">
                Whether you have a question, feedback, or want to collaborate, 
                we're here to help. Reach out through any of the channels below.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
                <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Email</h3>
                  <a
                    href="mailto:contact@veritas.edu"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    oratory.society@study.iitm.ac.in
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
                <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Phone</h3>
                  <a
                    href="tel:+911234567890"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    +91 123 456 7890
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Location</h3>
                  <p className="text-gray-400">
                    IIT-M BS degree, IIT Madras, Chennai<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-gray-800">
              <h3 className="font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-indigo-500/50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-indigo-500/50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-indigo-500/50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 mt-24">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          © 2025 VERITAS • Truth Seeker Protocol
        </div>
      </div>
    </main>
  );
}
