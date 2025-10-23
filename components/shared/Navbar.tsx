"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const LS_EMAIL_KEY = "demo_email";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Online Depression Test", href: "/depression-test" },
    { name: "Online Anxiety Test", href: "/anxiety-test" },
    { name: "Online Alcohol Use Test", href: "/alcohol-use-test" },
    { name: "Consultation", href: "/consultation" }
  ];

  // Lock/unlock background scroll when the drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);


  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu if click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // ✅ This runs only on the client
    const stored = localStorage.getItem(LS_EMAIL_KEY);
    if (stored) setEmail(stored);
  }, []);


  return (
    <nav className="bg-[#FCFCFC] dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between ">
        {/* Logo */}
        <Link href="/" className="flex items-center w-[110] h-[60] sm:w-[120px] sm:h-[70px]">
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
          {
            email ?

              <div className="ml-3 relative hidden md:block" ref={menuRef}>
                {/* Avatar button */}
                <button
                  type="button"
                  onClick={() => setOpen((prev) => !prev)}
                  className="bg-gray-800 cursor-pointer flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 mr-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded={open}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    width={32}
                    height={32}
                    className="size-9 rounded-full"
                    src='https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg?semt=ais_hybrid&w=740&q=80' alt="User avatar"
                  />
                </button>

                {/* Dropdown menu */}
                {open && (
                  <div
                    className="origin-top-right z-50 border absolute right-0 p-2 mt-2 w-48 rounded-md shadow-lg bg-white focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <Link
                      onClick={() => setOpen(false)}
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="#"
                      onClick={() => setOpen(false)}

                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("demo_email");
                        window.location.href = "/login";
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
              :
              <Link
                href="/login"
                className="text-white bg-[#185F9D] hover:bg-[#185F9D] font-bold text-base rounded px-6 sm:px-8 py-2 sm:py-3 mr-2"
              >
                Login
              </Link>
          }

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:space-x-8">
          {navItems?.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                item?.href === pathname
                  ? "text-[#185F9D] underline underline-offset-4"
                  : "text-gray-700 dark:text-gray-300",
                "hover:text-[#185F9D] dark:hover:text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu (Slide from left with scroll) */}
      <div
        id="mobile-menu"
        className={clsx(
          "fixed top-0 left-0 h-dvh w-2/3 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-60 lg:hidden",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Scrollable Area */}
        <div className="h-full overflow-y-auto p-6 space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                item?.href === pathname
                  ? "text-[#185F9D] underline underline-offset-4"
                  : "text-gray-800 dark:text-gray-200",
                "block text-lg hover:text-[#185F9D] dark:hover:text-[#185F9D]"
              )}
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
          className="fixed inset-0 bg-black opacity-40 z-50 lg:hidden"
          aria-hidden="true"
        />
      )}

      <hr className="border" />

      {
        pathname !== "/login" && pathname !== "/dashboard" &&

        <div className="px-4 sm:px-10 md:px-20 lg:px-28 my-5 md:max-w-7xl mx-auto">
          <InputGroup className="py-6 sm:py-5 md:py-6 lg:py-7 px-3 rounded shadow-sm border border-gray-200 dark:border-gray-700 !focus-within:border-[#185F9D] transition-colors duration-300">
            <InputGroupInput
              placeholder="Search doctor, code, or department"
              className="text-sm sm:text-base md:text-lg focus:!border-red-400 appearance-auto focus:!outline-none focus:!ring-0 focus:border-transparent! placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base"
            />

            <InputGroupAddon align="inline-end">
              <SearchIcon className="size-6 text-gray-500 hover:text-[#185F9D] transition-colors duration-200" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      }
    </nav>
  );
};

export default Navbar;
