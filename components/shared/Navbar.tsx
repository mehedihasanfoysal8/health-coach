"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";
import { SearchIcon } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Company", href: "/company" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Features", href: "/features" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <nav className="bg-[#FCFCFC] dark:bg-gray-900  fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center w-[120px] h-[70px]">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={120}
            height={60}
            priority
            className="w-full h-full object-center"
          />
        </Link>


        {/* Buttons */}
        <div className="flex items-center lg:order-2">
          <Link
            href="/login"
            className="text-white bg-[#185F9D] hover:bg-[#185F9D] font-bold text-base rounded px-8 py-3 mr-2"
          >
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 dark:text-gray-300 hover:text-[#185F9D] dark:hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu (Slide from left with scroll) */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Scrollable Area */}
        <div className="h-full overflow-y-auto p-6 space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-800 dark:text-gray-200 text-lg hover:text-[#185F9D] dark:hover:text-[#185F9D]"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay (when menu open) */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black opacity-40 lg:hidden"
        ></div>
      )}

      <hr className="border" />

      <div className="px-4 sm:px-10 md:px-20 lg:px-28 my-5 max-w-screen-xl mx-auto">
        <InputGroup className="py-4 sm:py-5 md:py-6 lg:py-7 px-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 focus-within:!border-[#185F9D] transition-colors duration-300">
          <InputGroupInput
            placeholder="Search doctor, code, or department"
            className="text-sm sm:text-base md:text-lg focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:!border-[#185F9D] placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon className="w-5 h-5 text-gray-500 hover:text-[#185F9D] transition-colors duration-200" />
          </InputGroupAddon>
        </InputGroup>
      </div>


    </nav>
  );
};

export default Navbar;
