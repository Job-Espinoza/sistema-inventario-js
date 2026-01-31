import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, Clock, Award, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';

const Hero = () => {
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '51999888777'; 
    const message = 'Hola Farmacia Angels, quisiera hacer una consulta.';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    // CAMBIOS CLAVE: 'pt-20' reduce el espacio arriba. 'pb-12' reduce el espacio abajo.
    // 'items-start' en lg alinea el texto arriba para llenar el hueco visual.
    <section className="relative bg-[#0b1121] text-white pt-24 pb-12 lg:pt-28 lg:pb-16 overflow-hidden">
      
      {/* --- FONDO DINÁMICO (Más oscuro y elegante) --- */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#0b1121] to-[#0b1121] z-0"></div>
      
      {/* Luces ambientales sutiles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[0%] w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* --- COLUMNA DE TEXTO (Fuerza y presencia) --- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            {/* Título Principal: Grande y Pesado */}
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-5 leading-[1.1] tracking-tight">
              Tu Salud, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                Nuestra Prioridad.
              </span>
            </h1>
            
            {/* Descripción Directa */}
            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg font-medium">
              Bienvenido a <span className="text-white font-bold">Farmacia Angels</span>. 
              Combinamos atención experta y rapidez para cuidar lo que más importa. Calidad garantizada en cada producto.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Button
                size="lg"
                onClick={() => scrollToId('productos')}
                className="bg-white text-indigo-950 hover:bg-cyan-50 font-bold px-8 py-6 rounded-2xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 text-base"
              >
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Explorar Catálogo
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToId('servicios')}
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500 px-8 py-6 rounded-2xl transition-all duration-300 text-base font-medium"
              >
                Ver Servicios
              </Button>
            </div>

            {/* Iconos de Confianza (Compactos y Alineados) */}
            <div className="pt-6 border-t border-slate-800/60 flex flex-wrap gap-x-8 gap-y-4">
              {[
                { icon: Shield, label: "Garantía Total" },
                { icon: Clock, label: "Atención Rápida" },
                { icon: Truck, label: "Delivery Express" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- COLUMNA DE IMAGEN (Anclada y Estilizada) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-full flex items-center justify-center lg:justify-end"
          >
            {/* Efecto Glow detrás de la imagen */}
            <div className="absolute w-[90%] h-[90%] bg-indigo-500/20 blur-[60px] rounded-full -z-10 animate-pulse"></div>
            
            {/* Contenedor de la imagen */}
            <div className="relative w-full max-w-md lg:max-w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-800/20 backdrop-blur-sm">
              <img
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 block"
                alt="Interior Farmacia Angels"
                src="/farmacia.png" 
              />
              {/* Degradado inferior sobre la imagen para integración */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b1121] to-transparent"></div>

              {/* DIÁLOGO FLOTANTE - Posicionado ARRIBA a la derecha como pediste */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute top-6 right-6 z-30"
              >
                <div 
                  onClick={handleWhatsAppContact}
                  className="cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl flex items-center gap-3 hover:bg-white/20 transition-all group"
                >
                  <div className="bg-green-500 p-2.5 rounded-full shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-white fill-current" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-green-300 tracking-wider mb-0.5">Estamos en línea</p>
                    <p className="text-sm font-bold text-white">¿Necesitas ayuda?</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;