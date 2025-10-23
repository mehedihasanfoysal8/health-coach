"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0D2137] text-gray-300">
      <div className="container mx-auto px-4 md:px-10 xl:px-0">
        <div className="max-w-7xl sm:px-6 mx-auto py-16">
          {/* GRID LAYOUT */}
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Left Section */}
            <div className="space-y-4">
              {/* Logo */}
              <Link href="/" className="flex items-center justify-start space-x-3 text-2xl font-semibold text-white">
                <div className="w-[90px] h-[70px]">
                  <Image
                    src="/logo.png"
                    alt="Health Coach Logo"
                    width={120}
                    height={70}
                    className="w-full h-full object-center rounded"
                    priority
                  />
                </div>
                <span>Health Coach</span>
              </Link>

              <p className="max-w-md text-gray-300 text-base leading-relaxed pr-6">
                Empowering healthier lives through online doctor consultations,
                personalized care, and digital health management — anytime, anywhere.
              </p>

              {/* Social Icons */}
              <div className="flex space-x-3 pt-2">
                <Link href="#" aria-label="Facebook" className="hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
                  </svg>
                </Link>
                <Link href="#" aria-label="Twitter" className="hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.55 0 11.68-6.25 11.68-11.68 0-.18 0-.36-.01-.53A8.34 8.34 0 0 0 22 5.92a8.19 8.19 0 0 1-2.36.65 4.12 4.12 0 0 0 1.8-2.27 8.23 8.23 0 0 1-2.6.99A4.11 4.11 0 0 0 12 8.5a11.64 11.64 0 0 1-8.46-4.29 4.11 4.11 0 0 0 1.27 5.48 4.1 4.1 0 0 1-1.85-.51v.05a4.1 4.1 0 0 0 3.29 4.02 4.1 4.1 0 0 1-1.85.07 4.11 4.11 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.41a11.62 11.62 0 0 0 6.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" aria-label="LinkedIn" className="hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 8.98h3.96v12.52H3V8.98zm7.75 0h3.8v1.72h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.66 4.77 6.13v7.73H19v-6.85c0-1.63-.03-3.72-2.27-3.72-2.27 0-2.62 1.77-2.62 3.6v7h-3.96V8.98z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Section */}
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {/* Services */}
                <div>
                  <h3 className="text-md font-semibold leading-6 text-white">
                    Our Services
                  </h3>
                  <ul className="mt-6 space-y-4">
                    <li>
                      <Link href="/doctors" className="hover:text-white">
                        Online Doctor Consultation
                      </Link>
                    </li>
                    <li>
                      <Link href="/medicine" className="hover:text-white">
                        Medicine Delivery
                      </Link>
                    </li>
                    <li>
                      <Link href="/diagnostics" className="hover:text-white">
                        Diagnostic Tests
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Resources */}
                <div className="mt-10 md:mt-0">
                  <h3 className="text-md font-semibold leading-6 text-white">
                    Resources
                  </h3>
                  <ul className="mt-6 space-y-4">
                    <li>
                      <Link href="/blog" className="hover:text-white">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/health-tips" className="hover:text-white">
                        Health Tips
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="hover:text-white">
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-8">
                {/* Company */}
                <div>
                  <h3 className="text-md font-semibold leading-6 text-white">
                    Company
                  </h3>
                  <ul className="mt-6 space-y-4">
                    <li>
                      <Link href="/about" className="hover:text-white">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/careers" className="hover:text-white">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-white">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Legal */}
                <div className="mt-10 md:mt-0">
                  <h3 className="text-md font-semibold leading-6 text-white">
                    Legal
                  </h3>
                  <ul className="mt-6 space-y-4">
                    <li>
                      <Link href="/privacy" className="hover:text-white">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="hover:text-white">
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-16 border-t border-gray-500/20 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Health Coach. Crafted with ❤️ for better health.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
