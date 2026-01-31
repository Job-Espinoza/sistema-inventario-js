import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Stethoscope, Activity, Thermometer, Scale, Eye, Calendar, ArrowRight, MessageCircle } from 'lucide-react';
import { Button, toast } from '@/components/ui';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      name: 'Presión Arterial',
      description: 'Monitoreo preciso con equipos digitales calibrados.',
      price: 15.00,
      duration: '15 min',
      icon: Heart,
      bgIcon: 'bg-rose-50',
      textIcon: 'text-rose-600',
      borderColor: 'group-hover:border-rose-200'
    },
    {
      id: 2,
      name: 'Control de Glucosa',
      description: 'Resultados inmediatos para tu seguimiento diario.',
      price: 12.00,
      duration: '10 min',
      icon: Activity,
      bgIcon: 'bg-sky-50',
      textIcon: 'text-sky-600',
      borderColor: 'group-hover:border-sky-200'
    },
    {
      id: 3,
      name: 'Temperatura',
      description: 'Medición corporal rápida con tecnología infrarroja.',
      price: 8.00,
      duration: '5 min',
      icon: Thermometer,
      bgIcon: 'bg-orange-50',
      textIcon: 'text-orange-600',
      borderColor: 'group-hover:border-orange-200'
    },
    {
      id: 4,
      name: 'Peso y Talla',
      description: 'Evaluación de índice de masa corporal (IMC).',
      price: 10.00,
      duration: '10 min',
      icon: Scale,
      bgIcon: 'bg-emerald-50',
      textIcon: 'text-emerald-600',
      borderColor: 'group-hover:border-emerald-200'
    },
    {
      id: 5,
      name: 'Asesoría Farmacéutica',
      description: 'Guía profesional sobre tus tratamientos y dosis.',
      price: 25.00,
      duration: '30 min',
      icon: Stethoscope,
      bgIcon: 'bg-indigo-50',
      textIcon: 'text-indigo-600',
      borderColor: 'group-hover:border-indigo-200'
    },
    {
      id: 6,
      name: 'Salud Visual',
      description: 'Descarte básico de agudeza visual rápida.',
      price: 20.00,
      duration: '20 min',
      icon: Eye,
      bgIcon: 'bg-cyan-50',
      textIcon: 'text-cyan-600',
      borderColor: 'group-hover:border-cyan-200'
    }
  ];

  const handleBookService = (serviceName) => {
    toast({
      title: "Servicio seleccionado",
      description: `Has solicitado agendar: ${serviceName}. Te redirigiremos a WhatsApp.`,
    });
    setTimeout(() => {
        const phoneNumber = '51958292145';
        const message = `Hola, quisiera agendar el servicio de: ${serviceName}`;
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    }, 1500);
  };

  return (
    <section id="servicios" className="relative pt-32 pb-24 bg-slate-100 overflow-hidden">
      
      {/* --- SEPARADOR VISUAL (OLA) --- */}
      {/* Esto crea el corte visual con la sección anterior (que asumimos es blanca) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          

          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">
            Nuestros Servicios 
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
            Hemos creado este espacio dedicado para tu bienestar. 
            <br className="hidden md:block"/> Atención rápida, segura y con los más altos estándares.
          </p>
        </motion.div>

        {/* Grid de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                // Fondo blanco puro para que contraste con el fondo gris de la sección (bg-slate-100)
                className={`bg-white rounded-2xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 border border-slate-200/60 group ${service.borderColor}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl ${service.bgIcon} ${service.textIcon} transition-colors ring-1 ring-inset ring-black/5`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  
                  <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <span className="text-sm font-bold text-slate-700">S/ {service.price.toFixed(2)}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                    {service.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[40px]">
                    {service.description}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                    <div className="flex items-center text-slate-400 text-xs font-semibold uppercase tracking-wide">
                        <Calendar className="w-4 h-4 mr-2" />
                        {service.duration}
                    </div>
                    
                    <button 
                        onClick={() => handleBookService(service.name)}
                        className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-all group-hover:scale-110"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action - Soft Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 relative"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 text-center shadow-sm relative overflow-hidden">
             
            {/* Decoración de fondo sutil dentro de la tarjeta */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2 bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50"></div>

            <div className="relative z-10">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Stethoscope className="w-8 h-8 text-slate-400" />
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                ¿Necesitas atención personalizada?
                </h3>
                
                <p className="text-slate-500 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                Nuestro equipo de farmacéuticos está disponible para resolver tus dudas.
                <span className="block mt-1 text-sm text-slate-400">Sin compromisos, solo asesoría profesional.</span>
                </p>

                <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-6 rounded-xl shadow-lg shadow-slate-200 transition-all duration-300 group"
                onClick={() => {
                    const phoneNumber = '51958292145';
                    const message = 'Hola, me gustaría consultar sobre vuestros servicios y medicamentos.';
                    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappURL, '_blank');
                }}
                >
                <MessageCircle className="w-5 h-5 mr-2 text-slate-200 group-hover:text-white transition-colors" />
                Contactar Farmacéutico
                </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;