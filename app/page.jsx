"use client";
import React, { useEffect } from 'react';
import "../styles/global.css";
import { AiOutlineUser } from 'react-icons/ai';



const Page = () => { // Capitalize the component name


  const stats = [
    { label: "Restaurants Served", value: "5,000+" },
    { label: "Products Delivered", value: "1M+" },
    { label: "Sustainability Initiatives", value: "100+" },
  ];

  const values = [
    { title: "Sustainability", description: "Eco-friendly packaging and reduced food waste." },
    { title: "Efficiency", description: "Streamlined procurement and fast delivery." },
    { title: "Quality", description: "Wide range of high-quality, fresh products." },
  ];
 
  const teamMembers = [
    { name: "Archisman Hota", role: "Co-Founder", image: "https://via.placeholder.com/150" },
    { name: "Subhrajit Rout ", role: "Co-Founder", image: "https://via.placeholder.com/150" },
  ];

  const blogPosts = [
    { title: "How Orman Reduces Food Waste", date: "Dec 1, 2024", author: "John Doe" },
    { title: "The Future of Sustainable Sourcing", date: "Nov 15, 2024", author: "Jane Smith" },
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r text-white py-44 px-10" style={{ 
        backgroundImage: `url("https://www.hyperpure.com/assets/images/home-landing-compress.jpg")` 
      }}>
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            Transforming the Way Restaurants Source Ingredients
          </h1>
          <p className="text-lg leading-relaxed mb-6">
            Orman provides a one-stop solution for sourcing high-quality products
            with a focus on sustainability and efficiency.
          </p>
          <button className="bg-white text-blue-500 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100">
            Learn More
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-10 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
          <p className="text-lg text-center leading-relaxed max-w-3xl mx-auto">
            Orman is a trusted platform that has redefined how restaurants source their ingredients. As a reliable B2B partner for high-quality meats and grocery items, Orman ensures consistent and dependable supplies while prioritizing sustainability. It provides fresh, premium ingredients tailored for restaurants and food businesses.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      

      {/* Values Section */}
      <section className="py-16 px-10 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-6 bg-white rounded shadow">
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Modernized icon */}
                <div className="flex justify-center mb-4">
                  <AiOutlineUser size={48} className="text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
