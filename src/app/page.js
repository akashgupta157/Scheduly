"use client";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-[#010502] text-white px-6 py-8 sm:py-16">
      <header className="text-center space-y-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-500">
          Welcome to Scheduly
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
          Scheduly is your personal assistant for organizing, managing, and
          conquering your daily schedule. Make time for what matters most,
          effortlessly.
        </p>
        <Link
          href={isAuth ? "/dashboard" : "/login"}
          className="inline-block mt-4 px-8 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </header>

      <section className="w-full mt-16 sm:mt-24 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8">
          Why Choose Scheduly?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0f1a1f] rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              📅 Powerful Scheduling
            </h3>
            <p className="text-gray-300">
              Effortlessly schedule events, tasks, and meetings with a few
              clicks.
            </p>
          </div>

          <div className="p-6 bg-[#0f1a1f] rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              🔔 Smart Notifications
            </h3>
            <p className="text-gray-300">
              Never miss an event with timely reminders and updates.
            </p>
          </div>

          <div className="p-6 bg-[#0f1a1f] rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              🌍 Seamless Integration
            </h3>
            <p className="text-gray-300">
              Sync Scheduly with your favorite apps and devices.
            </p>
          </div>

          <div className="p-6 bg-[#0f1a1f] rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              🚀 Fast & Intuitive
            </h3>
            <p className="text-gray-300">
              Enjoy a user-friendly design optimized for speed and efficiency.
            </p>
          </div>

          <div className="p-6 bg-[#0f1a1f] rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              👥 Collaboration Tools
            </h3>
            <p className="text-gray-300">
              Share schedules and coordinate with your team seamlessly.
            </p>
          </div>

          <div className="p-6 bg-[#0f1a1f] rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              📊 Analytics Insights
            </h3>
            <p className="text-gray-300">
              Track your time and productivity with visual insights.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-16 sm:mt-24 text-center">
        <p className="text-gray-400">Ready to take control of your schedule?</p>
        <Link
          href="/register"
          className="mt-4 inline-block px-8 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow hover:bg-blue-700 transition"
        >
          Sign Up Now
        </Link>
      </footer>
    </main>
  );
}
