"use client";

import { motion } from "framer-motion";

export default function MissionStatement() {
  return (
    <section className="py-24 px-4 md:px-8 bg-[var(--bg)] relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative h-[600px] rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(107,0,0,0.08)]"
        >
          <img 
            alt="Interior view of a high-end salon" 
            className="absolute inset-0 w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhoDjNzQk97DLvxtMitzsv6tnHHSfhujqeH327ur8pOqffMOJAAjNxNkhu5gEEeDlSfT_UymVjVymK593elcUTH6-QJCb5DKg06PMvsPqvGrGyHC7YA4yf4dndvJVDif_YntmjlR0d5UgPpvwKvzvpliPoHWe_mqa6m4VokTn_jcL_WL-H52OjEFCzDhmXSuoTXL_upEqxc0At7fnOKlwLpAX04bupXUSkoqT7l3Zb68ZzF8iTh-2fkQ5NwruC_I8R9pXo0vO-j0I"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:pl-16 flex flex-col justify-center h-full mt-12 md:mt-0"
        >
          <span className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase mb-4 block font-bold">The Mission</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--text)] mb-8 font-bold">Confidence and Elegance, Mastered.</h2>
          <p className="text-[var(--text-muted)] mb-6 text-lg font-light leading-relaxed">
            Our philosophy is rooted in the belief that true luxury is whispering, not shouting. We curate bespoke styles that enhance your natural beauty, ensuring every client leaves feeling empowered, sophisticated, and undeniably elegant.
          </p>
          <p className="text-[var(--text-muted)] mb-6 text-lg font-light leading-relaxed">
            As a proud L'Oréal Professionnel partner, we use only the finest professional-grade products and techniques to deliver transformative results.
          </p>
          <p className="text-[var(--text-muted)] mb-10 text-lg font-light leading-relaxed">
            Every appointment is a curated journey. From the moment you step into our sanctuary, you are enveloped in an atmosphere of serene exclusivity, designed to relax the mind while we transform your look.
          </p>
          <div className="w-24 h-px bg-[#E6E0DA]"></div>
        </motion.div>

      </div>
    </section>
  );
}
