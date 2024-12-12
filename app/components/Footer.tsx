
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
            <li><a href="#" className="hover:underline">Bellohabib682@gmail.com</a></li>
            <li><a href="#" className="hover:underline">+234-815-789-9361</a></li>
            <li><a href="#" className="hover:underline capitalize">after ceeco hotel kwamba,suleja,niger state</a></li>
          </ul>
        </div>
        <div >
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-3">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>
        <div className="capitalize">
          <h3 className="text-lg font-bold mb-4 capitalize">Account</h3>
          <ul className="flex flex-col gap-3">
            <li><a href="/account" className="hover:underline">my Account</a></li>
            <li><a href="/signup" className="hover:underline">signup/login</a></li>
            <li><a href="/cart" className="hover:underline">cart</a></li>
            <li><a href="/wishlist" className="hover:underline">wishlist</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 capitalize">Follow Us</h3>
          <p>Connect with us on social media.</p>
          <div className="flex gap-6 py-4">
            <a href="#">
              <i className="fas fa-facebook"></i>
              </a>
            <a href="#">
              <i className="fas fa-instagram"></i>
              </a>
            <a href="#">
              <i className="fas fa-whatsapp"></i>
              </a>
          </div>
        </div>
      </div>
      <p className="text-center mt-10">© 2024 Exclusive. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
