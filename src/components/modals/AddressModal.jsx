import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Home, Building2, Navigation, Flag, Globe } from 'lucide-react';
import { Button, toast } from '@/components/ui';
import { upsertProfile } from '@/lib/datawarehouseQueries';

const AddressModal = ({ onClose, user, profile, onAddressSaved }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Perú'
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        postal_code: profile.postal_code || '',
        country: profile.country || 'Perú'
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Inicio de sesión requerido",
        description: "Debes iniciar sesión para guardar tu dirección.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await upsertProfile({
        id: user.id,
        ...profile,
        ...formData,
        updated_at: new Date().toISOString()
      });

      if (error) {
        toast({
          title: "Error al guardar",
          description: "No se pudo actualizar la dirección. Inténtalo de nuevo.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "¡Dirección guardada!",
          description: "Tu dirección de entrega está lista.",
          variant: "default" // Usará el estilo por defecto (indigo)
        });
        if (onAddressSaved) {
          onAddressSaved(data);
        }
        onClose();
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error al procesar tu solicitud.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Identidad Farmacia Angels */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white p-6 relative overflow-hidden flex-shrink-0">
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md shadow-inner">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Dirección de Entrega</h2>
                <p className="text-indigo-100 text-xs font-medium opacity-90">
                  ¿Dónde enviamos tus medicamentos?
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Form Container - Scrollable if needed */}
        <div className="overflow-y-auto p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input Group: Address */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Dirección Exacta
              </label>
              <div className="relative transition-all duration-300 focus-within:transform focus-within:-translate-y-1">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-indigo-50 p-1.5 rounded-md">
                  <Home className="text-indigo-600 w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400"
                  placeholder="Ej: Av. Principal 123, Urb. Los Pinos"
                  required
                />
              </div>
            </div>

            {/* Input Group: City & District */}
            <div className="grid grid-cols-2 gap-5">
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                  Ciudad
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Building2 className="w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="Lima"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                  Distrito
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Navigation className="w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="Miraflores"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Input Group: Postal & Country */}
            <div className="grid grid-cols-2 gap-5">
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                  Cód. Postal
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Flag className="w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="15074"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                  País
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Globe className="w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50"
                    placeholder="Perú"
                    required
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col space-y-3">
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Guardando...
                  </span>
                ) : (
                  'Guardar Dirección'
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full text-gray-500 hover:text-gray-700 hover:bg-gray-50 py-4 rounded-xl font-medium"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar operación
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddressModal;