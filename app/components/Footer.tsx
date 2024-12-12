
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-footer text-header py-10 pb-2 px-8">
      <div className="container mx-auto grid grid-cols-1 justify-evenly md:grid-cols-[repeat(auto-fit,minmax(200px,200px))] gap-6">
        {/* <div>
          <h3 className="text-lg font-bold mb-4">Exclusive</h3>
          <p>Subscribe to get 10% off your first order.</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-4 px-4 py-2 rounded-lg w-full text-black"
          />
        </div> */}
        <div>
          <h3 className="text-lg font-bold mb-4 capitalize">support</h3>
          <ul className="flex flex-col gap-3">
            <li><Link href="#" className="hover:underline">Bellohabib682@gmail.com</Link></li>
            <li><Link href="#" className="hover:underline">+234-815-789-9361</Link></li>
            <li><Link href="#" className="hover:underline capitalize">after ceeco hotel kwamba,suleja,niger state</Link></li>
          </ul>
        </div>
        <div >
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-3">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/shop" className="hover:underline">Store</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
          </ul>
        </div>
        <div className="capitalize">
          <h3 className="text-lg font-bold mb-4 capitalize">Account</h3>
          <ul className="flex flex-col gap-3">
            <li><Link href="/account" className="hover:underline">my Account</Link></li>
            <li><Link href="/signup" className="hover:underline">signup/login</Link></li>
            <li><Link href="/cart" className="hover:underline">cart</Link></li>
            <li><Link href="/wishlist" className="hover:underline">wishlist</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 capitalize">Follow Us</h3>
          <p>Connect with us on social media.</p>
          <div className="flex gap-6 py-4">
            <Link href="#">
              <i className="fas fa-facebook"></i>
              </Link>
            <Link href="#">
              <i className="fas fa-instagram"></i>
              </Link>
            <Link href="#">
              <i className="fas fa-whatsapp"></i>
              </Link>
          </div>
        </div>
      </div>
      <p className="text-center mt-10">© 2024 Exclusive. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
