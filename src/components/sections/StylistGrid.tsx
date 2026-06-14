"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

export default function StylistGrid() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <span className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase mb-4 block font-bold">The Artisans</span>
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--text)] font-bold">Meet Our Lead Stylists</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]">
        
        {/* Stylist 1 (Large) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-8 relative rounded-2xl overflow-hidden group cursor-pointer"
        >
          <img 
            alt="Portrait of lead stylist" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCVST3fG0EgVkv2KcQL8VdlKHLx6cQ3n814-ULTQlYBxM2M5LADCDMzxE9Eh1yHK1v42f76Zl4qS-f40gy-oblAFB2rS5sWKM3D5DMQDJhBvhfAr8117UQVdQkN6o__1VJfIG-TLM2vP2OObwDZuh9v-dnqmznA8gLFzTQREx_gi9wI2P0ZSBe68k7GO54etVy0WU89Fvh05fWcNqzwlaMsJzUz0qp0fsiKPWh0oKpr3d4h7cy6XBthNc3ohPLPuIuehXrFFiOIRA"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <GlassCard className="absolute bottom-0 left-0 p-8 m-4 w-[calc(100%-32px)] border-none bg-[var(--surface)]/10 backdrop-blur-xl">
            <h3 className="font-serif text-2xl text-white mb-2 font-bold">Elena Rostova</h3>
            <p className="text-xs text-[#D4AF37] tracking-widest uppercase mb-4 font-bold">Master Colorist & Founder</p>
            <p className="text-white/80 text-sm font-light max-w-xl">
              With over 15 years in editorial styling, Elena brings runway precision to everyday luxury. Her signature lived-in blondes and dimensional brunettes are industry-renowned.
            </p>
          </GlassCard>
        </motion.div>

        {/* Stylist 2 (Small) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-4 relative rounded-2xl overflow-hidden group cursor-pointer"
        >
          <img 
            alt="Portrait of senior stylist" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn9GYC6g-VuDTvzvymPtIW99oUkXrI1n1DxI2TMeO0atFrWziPUOChEjNharufBcBR5CPOGP95T4OmG5_HmSpfv1_2kdcH1AX11it2iJK2qy3y8x2tYCgrmKdisuqb68m1L9FLfwYgFA33xQk8rL3SuMpj_P_5zEwh4rHX_iLp-ir4O-INpTYQWVnflNEjyN54Z65BzeAGP9j6VPqYebyR2VanwQD7lL8G01qGObVI9SV9Ke5oLO5mKBJQTHH73J3PIqehJE2rqzA"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <h3 className="font-serif text-xl text-white mb-1 font-bold">Julian Vance</h3>
            <p className="text-xs text-[#D4AF37] tracking-widest uppercase mb-2 font-bold">Senior Cutter</p>
            <p className="text-white/80 text-sm font-light">
              Architectural precision meets effortless movement.
            </p>
          </div>
        </motion.div>

        {/* Quote / Blank Space */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-4 rounded-2xl flex items-center justify-center p-8 relative overflow-hidden bg-[#111111]"
        >
          <div className="absolute -right-10 -bottom-10 opacity-5">
            <span className="material-symbols-outlined text-[200px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>content_cut</span>
          </div>
          <blockquote className="font-serif text-xl text-white text-center italic leading-relaxed relative z-10">
            "Your hair is the crown you never take off."
          </blockquote>
        </motion.div>

        {/* Stylist 3 (Medium) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-8 relative rounded-2xl overflow-hidden group cursor-pointer"
        >
          <img 
            alt="Portrait of styling specialist" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn8EsWKhimbBZp8F8BAu5U6nH09w2WmcdXDS8uTNt9Lji9p9tU5u7hXltlJk2I_Ed21O6Af1S_z9cXvPPCTOGO7FL5qYKODMkGSq0DazUKUfoIeCWDUYB6TzvMDukHMMyyhna0XVjkc_9FrPpks0DbfBkDgQ1K_w66ORO8gjJgMVSCO37KhqE9JcwY5oFxt0WxVI2XAOKoVvAEqqS8Nv0Qv-JG_fYwT3K6gxK0K9GYg_6RPzv4UZo2WgTp66NpnkPFyVzZ8We2EIc"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 p-8 text-right w-full flex flex-col items-end">
            <h3 className="font-serif text-2xl text-white mb-2 font-bold">Sophia Chen</h3>
            <p className="text-xs text-[#D4AF37] tracking-widest uppercase mb-4 font-bold">Extensions & Styling Specialist</p>
            <p className="text-white/80 text-sm max-w-md text-right font-light">
              Transforming silhouettes with seamless integration. Sophia specializes in voluminous, breathtaking transformations that feel completely natural.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
