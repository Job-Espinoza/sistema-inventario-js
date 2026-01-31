
import React from 'react';
import { Heart, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-gray-900 text-white">
  <div className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-4 gap-8">
      
      {/* Logo y descripción */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-300 via-purple-200 to-white rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-gray-800" />
          </div>
          <div>
            <span className="text-xl font-bold">Farmacia</span>
            <p className="text-sm text-indigo-400 font-semibold">Angels</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          Más de 1 año cuidando tu salud y la de tu familia.
          Medicamentos de calidad y atención profesional.
        </p>
      </div>

      {/* Contacto */}
      <div className="space-y-4">
        <span className="text-lg font-bold text-white">Contacto</span>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-indigo-400" />
            <span className="text-gray-300">+51 999 888 777</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-indigo-400" />
            <span className="text-gray-300">info@farmacia_angels.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-indigo-400" />
            <span className="text-gray-300">Av. Salud 123, Pasco, Perú</span>
          </div>
        </div>
      </div>

      {/* Horarios */}
      <div className="space-y-4">
        <span className="text-lg font-bold text-white">Horarios</span>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-indigo-400" />
            <div className="text-gray-300">
              <p className="text-sm">Lun - Vie: 8:00 AM - 10:00 PM</p>
              <p className="text-sm">Sáb - Dom: 9:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="space-y-4">
        <span className="text-lg font-bold text-white">Síguenos</span>
        <div className="flex space-x-4">
          <a
            href="#"
            className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors"
          >
            <Facebook className="w-5 h-5 text-white" />
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
          >
            <Instagram className="w-5 h-5 text-white" />
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-indigo-400 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-colors"
          >
            <Twitter className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>

    </div>

    {/* Footer Bottom */}
    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
      <p className="text-gray-400 text-sm">
        © 2026 Farmacia Angels. Todos los derechos reservados.
      </p>
    </div>
  </div>
</footer>
  );
};

export default Footer;

