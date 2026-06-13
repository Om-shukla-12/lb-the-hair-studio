"use client";

import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "./schema";

const stylists = [
  { id: "st1", name: "Elena Rostova", role: "Master Colorist", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCVST3fG0EgVkv2KcQL8VdlKHLx6cQ3n814-ULTQlYBxM2M5LADCDMzxE9Eh1yHK1v42f76Zl4qS-f40gy-oblAFB2rS5sWKM3D5DMQDJhBvhfAr8117UQVdQkN6o__1VJfIG-TLM2vP2OObwDZuh9v-dnqmznA8gLFzTQREx_gi9wI2P0ZSBe68k7GO54etVy0WU89Fvh05fWcNqzwlaMsJzUz0qp0fsiKPWh0oKpr3d4h7cy6XBthNc3ohPLPuIuehXrFFiOIRA" },
  { id: "st2", name: "Julian Vance", role: "Senior Cutter", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBn9GYC6g-VuDTvzvymPtIW99oUkXrI1n1DxI2TMeO0atFrWziPUOChEjNharufBcBR5CPOGP95T4OmG5_HmSpfv1_2kdcH1AX11it2iJK2qy3y8x2tYCgrmKdisuqb68m1L9FLfwYgFA33xQk8rL3SuMpj_P_5zEwh4rHX_iLp-ir4O-INpTYQWVnflNEjyN54Z65BzeAGP9j6VPqYebyR2VanwQD7lL8G01qGObVI9SV9Ke5oLO5mKBJQTHH73J3PIqehJE2rqzA" },
  { id: "st3", name: "Sophia Chen", role: "Extensions Specialist", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn8EsWKhimbBZp8F8BAu5U6nH09w2WmcdXDS8uTNt9Lji9p9tU5u7hXltlJk2I_Ed21O6Af1S_z9cXvPPCTOGO7FL5qYKODMkGSq0DazUKUfoIeCWDUYB6TzvMDukHMMyyhna0XVjkc_9FrPpks0DbfBkDgQ1K_w66ORO8gjJgMVSCO37KhqE9JcwY5oFxt0WxVI2XAOKoVvAEqqS8Nv0Qv-JG_fYwT3K6gxK0K9GYg_6RPzv4UZo2WgTp66NpnkPFyVzZ8We2EIc" },
  { id: "st4", name: "Any Available Stylist", role: "First available", image: "" },
];

export default function Step2Stylist({ methods }: { methods: UseFormReturn<BookingFormData> }) {
  const { register, watch, setValue, formState: { errors } } = methods;
  const selectedId = watch("stylistId");

  return (
    <div>
      <div className="mb-6 text-center">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Choose a Stylist</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">Select your preferred artisan for this service.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stylists.map((stylist) => (
          <div 
            key={stylist.id}
            onClick={() => setValue("stylistId", stylist.id, { shouldValidate: true })}
            className={`border rounded-xl p-3 cursor-pointer transition-all duration-300 text-center flex flex-col items-center justify-between ${
              selectedId === stylist.id 
                ? "border-primary bg-primary-fixed/20 shadow-md" 
                : "border-outline/30 hover:border-primary/50 hover:bg-surface"
            }`}
          >
            {stylist.image ? (
              <img src={stylist.image} alt={stylist.name} className="w-20 h-20 rounded-full object-cover mb-3" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-surface-variant flex items-center justify-center mb-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-3xl">group</span>
              </div>
            )}
            
            <h4 className="font-headline-md text-lg text-on-surface mb-1 leading-tight">{stylist.name}</h4>
            <p className="text-xs font-label-sm uppercase tracking-widest text-on-surface-variant/80">{stylist.role}</p>
            
            <div className={`mt-3 w-5 h-5 rounded-full border flex items-center justify-center ${
              selectedId === stylist.id ? "border-primary" : "border-outline/50"
            }`}>
              {selectedId === stylist.id && <div className="w-3 h-3 bg-primary rounded-full"></div>}
            </div>
          </div>
        ))}
      </div>
      
      <input type="hidden" {...register("stylistId")} />
      {errors.stylistId && <p className="text-error text-sm mt-4 text-center">{errors.stylistId.message}</p>}
    </div>
  );
}
