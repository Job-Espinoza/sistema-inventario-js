import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, Eye, EyeOff, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { Button, toast } from '@/components/ui';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        toast({ 
          title: "Credenciales incorrectas", 
          description: "Por favor verifica tu correo y contraseña.", 
          variant: "destructive" 
        });
      } else {
        toast({ 
          title: "¡Bienvenido de vuelta!", 
          description: "Has iniciado sesión correctamente.",
          variant: "default"
        });
        onLoginSuccess();
        onClose();
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        toast({ 
          title: "Error de contraseña", 
          description: "Las contraseñas no coinciden.", 
          variant: "destructive" 
        });
        setLoading(false);
        return;
      }
      const { error } = await signUp(formData.email, formData.password, {
        data: {
          first_name: formData.name.split(' ')[0] || formData.name,
          last_name: formData.name.split(' ').slice(1).join(' ') || ''
        }
      });
      if (error) {
        toast({ 
          title: "Error en el registro", 
          description: error.message, 
          variant: "destructive" 
        });
      } else {
        toast({ 
          title: "¡Cuenta creada!", 
          description: "Revisa tu correo para confirmar tu cuenta.",
          variant: "default"
        });
        setIsLogin(true); // Switch to login view or close depending on flow
      }
    }
    setLoading(false);
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
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con identidad de marca */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white p-8 relative overflow-hidden shrink-0">
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md shadow-inner inline-block">
                {isLogin ? <LogIn className="w-6 h-6 text-white" /> : <UserPlus className="w-6 h-6 text-white" />}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose} 
                className="text-white hover:bg-white/20 rounded-full -mt-2 -mr-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight mb-1">
              {isLogin ? 'Hola de nuevo' : 'Crea tu cuenta'}
            </h2>
            <p className="text-indigo-100 text-sm font-medium opacity-90">
              {isLogin 
                ? 'Accede a tus recetas y descuentos exclusivos.' 
                : 'Únete a Farmacia Angels y cuida tu salud.'}
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="group"
                >
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <User className="w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
                      placeholder="Ej. Juan Pérez"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
                  placeholder="nombre@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="group pt-2"
                >
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Lock className="w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
                      placeholder="••••••••"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center group/btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Procesando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </div>

            <div className="text-center pt-2 border-t border-gray-100 mt-6">
              <p className="text-gray-500 text-sm mb-2">
                {isLogin ? '¿Aún no tienes cuenta?' : '¿Ya tienes una cuenta?'}
              </p>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 hover:text-indigo-800 font-bold text-sm transition-colors hover:underline"
              >
                {isLogin ? 'Regístrate gratis aquí' : 'Inicia sesión aquí'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;