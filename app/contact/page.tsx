"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faPhone } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import Button from "../components/button";
import { config } from "dotenv";
import toast from "react-hot-toast";
import { OwnerEmail, OwnerPhone1 } from "../controller/owner";
config()
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
emailjs.init({
          publicKey:process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY
      
})
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await emailjs.send(
        'service_ur7yu2i', // Replace with your EmailJS Service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATEID||"", // Replace with your EmailJS Template ID
        {
          from_name: formData.name,
          from_phone: formData.phone,
          from_email: formData.email,
          message: formData.message,
        },
      );
      if (response.status === 200) {
        toast.success("Your message has been sent successfully!");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        toast.error("Failed to send the message");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while sending your message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid md:grid-cols-3 capitalize md:p-10 p-2 gap-y-8 md:gap-8">
      {/* Contact Information */}
      <div className="flex flex-col gap-6 p-8 shadow-shadow shadow-lg bg-accent rounded">
        <div className="flex gap-4 capitalize font-semibold text-3xl">
          <FontAwesomeIcon icon={faPhone} width={30} />
          <h2>Call to Us</h2>
        </div>
        <div className="flex flex-col gap-3">
          <div>We are available 24/7, 7 days a week</div>
          <div>Phone: {OwnerPhone1}</div>
        </div>
        <div className="w-full bg-secondary min-h-[1px]"></div>
        <div className="flex gap-4 capitalize font-semibold text-3xl">
          <FontAwesomeIcon icon={faMessage} width={30} />
          <h2>Write to Us</h2>
        </div>
        <div className="flex flex-col gap-3">
          <div>Fill out our form and we will contact you within 24 hours</div>
          <div>Email: {OwnerEmail}</div>
          {/* <div>Emails: belloicekid@gmail.com</div> */}
        </div>
      </div>

      {/* Contact Form */}
      <div className="col-span-2 p-4 bg-accent shadow-shadow shadow-lg flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col h-full gap-4">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 w-full">
            <input
              type="text"
              required
              placeholder="Your Name*"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-neutral min-w-[200px] h-[50px] w-full rounded-sm p-3"
            />
            <input
              type="text"
              required
              placeholder="Your Phone Number*"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-neutral min-w-[200px] h-[50px] w-full rounded-sm p-3"
            />
            <input
              type="email"
              required
              placeholder="Your Email*"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-neutral min-w-[200px] h-[50px] w-full rounded-sm p-3"
            />
          </div>
          <textarea
            name="message"
            placeholder="Your Message"
            required
            minLength={5}
            value={formData.message}
            onChange={handleChange}
            className="h-full w-full bg-neutral p-5 text-text"
          />
          <div className="flex justify-end">
            <Button
              disabled={isSubmitting}
              cta={isSubmitting ? "Sending..." : "Submit"}
            >
              
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
