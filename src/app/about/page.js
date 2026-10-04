"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Utensils, Leaf, Tractor, Zap, Heart } from "lucide-react";

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <main className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <header className="relative w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-center px-4 md:px-16 py-12 gap-8 overflow-hidden bg-linear-to-br from-surface-container to-surface">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none transition-all duration-1000 ease-in-out">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl animate-spin-slow"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-container rounded-full mix-blend-multiply filter blur-3xl animate-spin-slow" style={{ animationDirection: "reverse" }}></div>
        </div>
        
        <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start gap-6">
          <div className="inline-block px-4 py-2 bg-primary-container text-inverse-surface font-bold text-sm rounded-full border-2 border-inverse-surface shadow-[4px_4px_0px_0px_#362f2c] transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            Welcome to
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-inverse-surface leading-tight">
            Farm<br />
            <span className="text-primary italic">Snacks.</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-md">
            Experience the pure joy of real fruit, naturally freeze-dried to preserve all the flavor and none of the guilt. Bold, crunchy, and unapologetically delicious.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/">
              <button className="px-8 py-4 bg-primary text-on-primary font-bold rounded-lg border-2 border-inverse-surface shadow-[4px_4px_0px_0px_#362f2c] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_#362f2c] transition-all cursor-pointer">
                Shop Now
              </button>
            </Link>
            
            <Link href="/recipes">
              <button className="px-8 py-4 bg-surface text-inverse-surface font-bold rounded-lg border-2 border-inverse-surface shadow-[4px_4px_0px_0px_#362f2c] hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_#362f2c] transition-all flex items-center gap-2 hover:bg-surface-container cursor-pointer">
                <Utensils size={20} /> Show Recipe
              </button>
            </Link>
          </div>
        </div>
        
        <div className="relative z-10 w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9sYo3PHHvT9189q5MmHPURfZsfgu0a88rwCYDPTXT1v3fSIhbCDtA-GFuyXkk4JN7JKs3pevcHAlFl40ZlO4GwQynh5Y4Tt06Z9g5tmr5C8tjBqGfRsSGOQbLnNQ0DHBAky-qIakyE2PBcz-Cus-xWppoG2-DB7-ZqozugAdG2D2zmGcxWEd2lI94Uk9aMwXWZu-WLjWWORmgWAhkjFZ8WeCjX2C-LMV7rksdcG7-IxHP_12MnsGLaoN0c4OIVXPEdA"
            alt="Farm Snacks logo"
            width={400}
            height={400}
            className="w-full max-w-100 h-auto object-contain rounded-xl border-4 border-inverse-surface shadow-[8px_8px_0px_0px_#362f2c] bg-surface transition-all duration-300"
            unoptimized
          />
        </div>
      </header>

      {/* --- ABOUT FARMSNAKS & VIDEO SECTION --- */}
      <section className="py-16 md:py-24 px-4 md:px-16 bg-surface relative z-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center max-w-300 mx-auto">
          
          <motion.div 
            className="w-full lg:w-1/2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-inverse-surface mb-6">
              About FarmSnaks
            </motion.h2>
            
            <div className="space-y-4">
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-primary font-medium">
                We&apos;re not here to tell you to eat more fruits and vegetables—you already know that. We&apos;re here to make it easier.
              </motion.p>
              <motion.p variants={fadeUp} className="text-base md:text-lg text-on-surface-variant">
                FarmSnaks creates everyday snacks and wellness essentials from real produce, from crunchy fruit & veggie chips to clean, versatile superfood powders. Whether you&apos;re looking for a better snack, a quick nutrition boost, or a healthier pantry staple, our products are made to fit into real life.
              </motion.p>
              <motion.p variants={fadeUp} className="text-base md:text-lg text-on-surface-variant">
                No exaggerated claims. Just thoughtfully made food that&apos;s simple, satisfying, and genuinely good to keep around.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg md:text-xl font-bold text-inverse-surface mt-6 border-l-4 border-primary pl-4 py-1">
                Snack better. Nourish naturally.
              </motion.p>
            </div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-surface-container rounded-2xl border-4 border-inverse-surface shadow-[8px_8px_0px_0px_#362f2c] overflow-hidden relative aspect-video group">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/LXb3EKWsInQ?si=Wp3Xk4Q7XpZ8Xw2B&controls=0&rel=0&modestbranding=1" 
                title="FarmSnaks YouTube Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
              </iframe>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- OUR STORY SECTION --- */}
      <section className="py-16 md:py-24 px-4 md:px-16 bg-surface-container border-y-2 border-inverse-surface relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none"></div>
        
        <motion.div 
          className="max-w-200 mx-auto relative z-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="flex justify-start md:justify-center mb-6">
            <Leaf size={64} className="text-primary" fill="currentColor" strokeWidth={1} />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-inverse-surface mb-8 text-left md:text-center">
            Our Story
          </motion.h2>
          
          <div className="space-y-6 text-left md:text-center">
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-on-surface-variant font-medium">
              It began with a question we asked ourselves every day: <br className="hidden md:block" />
              <strong className="text-primary mt-1 inline-block">Why is the healthiest choice so often the hardest one?</strong>
            </motion.p>
            <motion.p variants={fadeUp} className="text-base md:text-lg text-on-surface-variant">
              Between busy mornings, long workdays, and endless cravings, fresh produce is usually the first thing we skip. We created FarmSnaks to change that—not by replacing real food, but by making it easier to enjoy it in forms that fit everyday life.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base md:text-lg text-on-surface-variant">
              From naturally flavourful crunchy chips to wholesome fruit and vegetable powders, every product is made with one belief: food should be simple, honest, and joyful. No overcomplicated ingredients, no unrealistic promises—just thoughtfully crafted snacks and pantry essentials you&apos;ll reach for again and again.
            </motion.p>
            <motion.div 
              variants={fadeUp}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="bg-surface border-2 border-inverse-surface shadow-[4px_4px_0px_0px_#362f2c] rounded-xl p-6 md:p-8 mt-10 md:rotate-1 transition-all duration-300"
            >
              <p className="text-lg md:text-xl text-inverse-surface italic font-bold">
                {'"Because the best habits aren\'t built on perfection. They\'re built on small, delicious choices that become part of your everyday life."'}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --- WHY FARM SNACKS (BENTO GRID) --- */}
      <section className="py-24 px-4 md:px-16 bg-surface-container-lowest relative bg-linear-to-t from-surface to-surface-container-lowest">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-inverse-surface mb-4">Why Farm Snaks?</h2>
          <p className="text-lg text-on-surface-variant">
            We believe snacking shouldn&apos;t be a compromise. It&apos;s about real ingredients, honest farming, and unbelievable flavor.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 max-w-300 mx-auto min-h-150"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Large Feature 1 */}
          <motion.div variants={fadeUp} className="md:col-span-2 md:row-span-2 bg-tertiary rounded-2xl border-2 border-inverse-surface shadow-[4px_4px_0px_0px_#362f2c] p-8 flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <Leaf size={48} className="text-on-primary mb-4 block group-hover:scale-110 transition-transform duration-300" fill="currentColor" strokeWidth={1.5} />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">100% Real Fruit. <br />Zero Nonsense.</h3>
              <p className="text-lg text-on-primary/80 max-w-sm mt-4">No added sugars, no preservatives, no frying. Just the pure, vibrant taste of fruit picked at peak ripeness and freeze-dried to perfection.</p>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-container rounded-full mix-blend-overlay opacity-50 group-hover:scale-[2] transition-transform duration-1000 ease-out"></div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={fadeUp} className="md:col-span-2 bg-secondary-container rounded-2xl border-2 border-inverse-surface shadow-[4px_4px_0px_0px_#362f2c] p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
            <div className="w-16 h-16 rounded-full bg-surface border-2 border-inverse-surface flex items-center justify-center shrink-0 group-hover:bg-primary-container transition-colors duration-300">
              <Tractor size={28} className="text-inverse-surface group-hover:rotate-12 transition-transform duration-300" strokeWidth={1.5} />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-2xl font-bold text-inverse-surface mb-2">Sustainable Farming</h4>
              <p className="text-base text-on-secondary-container">We partner directly with farmers who prioritize soil health and ethical practices. Better for the earth, better for your crunch.</p>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={fadeUp} className="md:col-span-1 bg-surface-container-highest rounded-2xl border-2 border-inverse-surface shadow-[4px_4px_0px_0px_#362f2c] p-6 flex flex-col justify-center text-center items-center group">
            <Zap size={36} className="text-primary-container mb-4 group-hover:-translate-y-2 transition-transform duration-300" fill="currentColor" strokeWidth={1} />
            <h4 className="text-xl font-bold text-inverse-surface mb-2">Instant Energy</h4>
            <p className="text-sm text-on-surface-variant">Lightweight and packed with natural energy, perfect for on-the-go.</p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div variants={fadeUp} className="md:col-span-1 bg-primary-container rounded-2xl border-2 border-inverse-surface shadow-[4px_4px_0px_0px_#362f2c] p-6 flex flex-col justify-center text-center items-center group">
            <Heart size={36} className="text-inverse-surface mb-4 group-hover:scale-125 transition-transform duration-300" fill="currentColor" strokeWidth={1} />
            <h4 className="text-xl font-bold text-inverse-surface mb-2">Vegan Friendly</h4>
            <p className="text-sm text-inverse-surface/80">Plant-based goodness that everyone can enjoy without worry.</p>
          </motion.div>
        </motion.div>
      </section>

    </main>
  );
}