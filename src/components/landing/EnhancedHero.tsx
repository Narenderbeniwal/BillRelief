"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Shield, TrendingDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function EnhancedHero() {
  const [savingsAmount, setSavingsAmount] = useState(0);

  useEffect(() => {
    const target = 7750;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setSavingsAmount(target);
        clearInterval(timer);
      } else {
        setSavingsAmount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-teal-800 to-teal-900">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 opacity-20"
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M 10 100 Q 50 50, 100 80 T 190 100"
            stroke="#FDDA0D"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M 180 90 L 200 100 L 180 110 L 185 100 Z" fill="#FDDA0D" />
        </svg>
      </motion.div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 rounded-full shadow-lg mb-6"
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles className="w-5 h-5 text-blue-900" />
              <span className="text-sm font-bold text-blue-900">
                AI-POWERED · 48-HOUR RESULTS
              </span>
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Lower Your Medical Bills
              <span className="block text-yellow-400 mt-2">by 30-70%</span>
              <span className="block text-3xl lg:text-4xl text-teal-200 mt-4">
                in Just 48 Hours
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-teal-100 mb-8 leading-relaxed">
              Our AI finds errors and overcharges in seconds. Your dedicated expert negotiates. You save thousands.{" "}
              <span className="font-bold text-white">Guaranteed.</span>
            </p>
            <div className="space-y-4 mb-10">
              {[
                { icon: Clock, text: "48-hour AI analysis (not 4 months)", color: "text-yellow-400" },
                { icon: TrendingDown, text: "Average savings: $7,750 per bill", color: "text-green-400" },
                { icon: Shield, text: "No savings = no fee. 100% risk-free", color: "text-blue-400" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <p className="text-lg text-white font-medium pt-1">{item.text}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/get-started"
                className="group relative px-8 py-4 bg-yellow-400 text-blue-900 font-bold text-lg rounded-xl shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center overflow-hidden"
              >
                <span className="relative z-10">Find Out How Much You Can Save</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="#how-it-works"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all inline-flex items-center justify-center"
              >
                See How It Works
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-teal-200">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">HIPAA Compliant</span>
              </div>
              <div className="h-4 w-px bg-teal-400" />
              <div className="flex items-center gap-2">
                <span className="text-sm">10,000+ Bills Reduced</span>
              </div>
              <div className="h-4 w-px bg-teal-400" />
              <div className="flex items-center gap-2">
                <span className="text-sm">★ 4.9/5 Rating</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold text-sm">AI Analyzing...</span>
              </div>
              <div className="mb-8">
                <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  Original Bill
                </div>
                <div className="text-5xl font-black text-gray-900 font-mono">$12,500</div>
              </div>
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Analyzing errors...</span>
                  <span className="font-bold">62% Overcharged</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-green-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "62%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </div>
              </div>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">7</span>
                  </div>
                  <div>
                    <p className="font-bold text-orange-900 mb-1">Errors Detected</p>
                    <p className="text-sm text-orange-700">
                      Duplicate charges, upcoding, price overcharges
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  After BillRelief Negotiation
                </div>
                <div className="text-5xl font-black text-green-600 font-mono">$4,750</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-sm opacity-90 mb-1">You Save</div>
                    <div className="text-4xl font-black font-mono">
                      ${savingsAmount.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90 mb-1">Savings</div>
                    <div className="text-4xl font-black">62%</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/30">
                  <p className="text-sm">
                    <span className="font-bold">Your fee:</span> Only $1,937 (25% of savings)
                  </p>
                  <p className="text-xs mt-1 opacity-75">
                    You keep $5,813 in savings · Zero upfront cost
                  </p>
                </div>
              </div>
            </div>
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded-full shadow-xl whitespace-nowrap"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold text-sm">Coming Soon: Upload Bill → Instant AI Analysis</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
