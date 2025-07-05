import React from "react";

export default function HomePage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-pink-100 py-12 text-center">
        <h1 className="text-4xl font-bold">We put a little magic into all our <span className="text-pink-600">kids’ lives</span></h1>
        <button className="mt-4 px-6 py-2 bg-pink-500 text-white rounded">Learn More</button>
      </section>

      {/* Welcome Section */}
      <section className="py-12 text-center bg-white">
        <h2 className="text-3xl font-bold mb-6">Welcome To Wonderland</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8">
          <div>Age-Appropriate Curriculum</div>
          <div>Interactive Learning Materials</div>
          <div>Teacher Training and Progress</div>
          <div>Safe and Supportive Territory</div>
        </div>
      </section>

      {/* Education Proposals */}
      <section className="py-12 bg-pink-50">
        <h2 className="text-3xl font-bold text-center mb-8">Our Kids' Education Proposals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
          <div className="bg-white p-4 rounded shadow">Kids Letter Match</div>
          <div className="bg-white p-4 rounded shadow">Reading & Writing Skill</div>
          <div className="bg-white p-4 rounded shadow">Early Childhood Education</div>
        </div>
      </section>

      {/* Learning Together */}
      <section className="py-12 text-center bg-white">
        <h2 className="text-3xl font-bold mb-6">Exploring, Learning, Growing Together</h2>
        <ul className="space-y-3">
          <li>Do you offer parent-teacher conferences?</li>
          <li>What is your educational philosophy?</li>
          <li>What is the teacher-to-child ratio?</li>
        </ul>
      </section>

      {/* Instructors */}
      <section className="py-12 bg-pink-50 text-center">
        <h2 className="text-3xl font-bold mb-6">Greet Our Instructor</h2>
        <div className="flex flex-wrap justify-center gap-6 px-8">
          <div className="bg-white p-4 rounded shadow w-60">Instructor 1</div>
          <div className="bg-white p-4 rounded shadow w-60">Instructor 2</div>
          <div className="bg-white p-4 rounded shadow w-60">Instructor 3</div>
        </div>
      </section>

      {/* Events & Gallery */}
      <section className="py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Upcoming Events</h2>
        <div className="flex flex-wrap justify-center gap-4 px-8">Event thumbnails here</div>
        <h3 className="text-2xl font-semibold text-center mt-12 mb-4">Our Photo Gallery</h3>
        <div className="flex flex-wrap justify-center gap-4 px-8">Gallery images here</div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-pink-100 text-center">
        <h2 className="text-3xl font-bold mb-6">What Parents Say?</h2>
        <div className="px-8">"This school is amazing!" - Parent A</div>
      </section>

      {/* Blog Section */}
      <section className="py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Latest News And Blogs</h2>
        <div className="flex flex-wrap justify-center gap-6 px-8">
          <div className="bg-gray-100 p-4 rounded w-60">Blog Post 1</div>
          <div className="bg-gray-100 p-4 rounded w-60">Blog Post 2</div>
          <div className="bg-gray-100 p-4 rounded w-60">Blog Post 3</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; 2025 Kitar Kindergarten. All rights reserved.</p>
        <p>Subscribe to our newsletter for daily updates</p>
      </footer>
    </div>
  );
}
