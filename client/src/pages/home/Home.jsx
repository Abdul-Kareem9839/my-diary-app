import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopSec from "./TopSec";
import Features from "./Features";
import Contact from "./Contact";
import CallToAct from "./CallToAct";
import Footer from "./footer";

export default function Home() {
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/current-user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCurrUser(data.user));
  }, []);

  const handleMyDiaryClick = () => {
    if (currUser)
      navigate("/dashboard"); // logged in → dashboard
    else alert("Please register or log in first!"); // not logged in → popup
  };

  return (
    <div className="bg-white text-gray-800 font-sans w-full">
      <TopSec currUser={handleMyDiaryClick} />

      {/* About Section */}
      <section
        className="py-20 px-6 bg-gradient-to-bl from-[#A8E6CF] via-white to-white text-center"
        id="why"
      >
        <h2 className="text-4xl font-bold mb-4">Why ZenScribe?</h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-600">
          In a world full of distractions and noise, ZenScribe gives you a calm
          space to focus, reflect, and grow. Whether you’re capturing daily
          thoughts, setting goals, or simply venting your emotions, ZenScribe is
          your safe and private companion.
        </p>
      </section>

      <Features />

      {/* Testimonials */}
      <section className="py-20 px-6 bg-teal-100">
        <h2 className="text-4xl font-bold text-center mb-12">What Users Say</h2>
        <div className="flex flex-col md:flex-row justify-center gap-10 max-w-5xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-2xl transition">
            <img
              src="https://i.pravatar.cc/150?img=9"
              alt="Aisha K."
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <p className="italic text-gray-600">
              "Zenscribe helped me develop a habit of self-reflection. My mental
              clarity has improved a lot."
            </p>
            <div className="mt-4">
              <h4 className="font-bold">Aisha K.</h4>
              <p className="text-sm text-gray-500">Psychology Student, Delhi</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-2xl transition">
            <img
              src="https://i.pravatar.cc/150?img=8"
              alt="Rohan S."
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <p className="italic text-gray-600">
              "The mood tracker and journaling tools are just what I needed to
              get through tough times."
            </p>
            <div className="mt-4">
              <h4 className="font-bold">Rohan S.</h4>
              <p className="text-sm text-gray-500">
                Software Engineer, Bangalore
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-2xl transition">
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Priya M."
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <p className="italic text-gray-600">
              "I love how simple and beautiful the UI is. Writing has never been
              this peaceful."
            </p>
            <div className="mt-4">
              <h4 className="font-bold">Priya M.</h4>
              <p className="text-sm text-gray-500">UX Designer, Mumbai</p>
            </div>
          </div>
        </div>
      </section>

      <CallToAct />

      <Contact />

      <Footer />
    </div>
  );
}
