import React from 'react'
import "../styles/global.css"
import { CiUser } from "react-icons/ci";
function page() {
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
    { name: "John Doe", role: "Founder & CEO", image: "https://via.placeholder.com/150" },
    { name: "Jane Smith", role: "Head of Operations", image: "https://via.placeholder.com/150" },
    { name: "Alice Johnson", role: "Chief of Sustainability", image: "https://via.placeholder.com/150" },
  ];

  const blogPosts = [
    { title: "How Orman Reduces Food Waste", date: "Dec 1, 2024", author: "John Doe" },
    { title: "The Future of Sustainable Sourcing", date: "Nov 15, 2024", author: "Jane Smith" },
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-20 px-10">
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
            Orman is a revolutionary platform that has transformed the way
            restaurants source their ingredients. By streamlining the procurement
            process, Orman ensures consistent, reliable supplies while
            prioritizing sustainability.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-xl font-bold">
              <p className="text-4xl text-blue-500">{stat.value}</p>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

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
          <h2 className="text-3xl font-bold mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-4">
               <CiUser />
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-10 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">From the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="p-6 bg-white rounded shadow">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500">
                  {post.date} by {post.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default page
