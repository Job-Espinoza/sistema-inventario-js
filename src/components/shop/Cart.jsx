import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, CreditCard, Truck } from 'lucide-react';
import { Button, toast } from '@/components/ui';

const Cart = ({ cart, onClose, onRemoveItem, onUpdateQuantity, user }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cart.reduce((total, item) => {
    let price = item.price;
    if (user?.role === 'customer' && user.membershipLevel) {
      const discount = user.membershipLevel === 'gold' ? 0.15 : 0.10;
      price = price * (1 - discount);
    }
    return total + (price * item.quantity);
  }, 0);

  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Inicia sesión requerido",
        description: "Debes iniciar sesión para realizar una compra",
        variant: "destructive"
      });
      return;
    }

    setIsCheckingOut(true);

    setTimeout(() => {
      toast({
        title: "🚧 Esta función no está implementada aún",
        description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀"
      });
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-end backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-white h-full w-full max-w-md shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Estilo Farmacia Angels */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Tu Carrito</h2>
                <p className="text-indigo-100 text-xs font-medium uppercase tracking-wider">
                  Farmacia Angels
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-indigo-200" />
              </div>
              <p className="text-gray-500 text-lg font-medium">Tu carrito está vacío</p>
              <p className="text-gray-400 text-sm mt-2">
                Explora nuestros productos y ofertas
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => {
                let displayPrice = item.price;
                let discount = 0;

                if (user?.role === 'customer' && user.membershipLevel) {
                  discount = user.membershipLevel === 'gold' ? 0.15 : 0.10;
                  displayPrice = item.price * (1 - discount);
                }

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-100">
                        <img
                          className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                          alt={item.name}
                          src={item.image_url || item.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop'}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 truncate text-sm sm:text-base">{item.name}</h3>
                        <p className="text-xs text-indigo-500 font-semibold mb-2 uppercase">{item.category}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="font-bold text-indigo-600">
                              S/ {displayPrice.toFixed(2)}
                            </span>
                            {discount > 0 && (
                              <span className="text-[10px] text-gray-400 line-through">
                                S/ {item.price.toFixed(2)}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-indigo-600 transition-colors disabled:opacity-30"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-gray-700">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-indigo-600 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50/50 backdrop-blur-sm">
            {/* Shipping Info */}
            <div className={`flex items-center justify-between mb-4 p-3 rounded-xl border ${shipping === 0 ? 'bg-indigo-50 border-indigo-100' : 'bg-gray-100 border-gray-200'}`}>
              <div className="flex items-center space-x-2">
                <Truck className={`w-5 h-5 ${shipping === 0 ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span className={`text-sm font-medium ${shipping === 0 ? 'text-indigo-800' : 'text-gray-600'}`}>
                  {shipping === 0 ? '¡Envío Gratis!' : `Envío: S/ ${shipping.toFixed(2)}`}
                </span>
              </div>
              {subtotal < 50 && (
                <span className="text-[10px] font-bold text-indigo-600 bg-white px-2 py-1 rounded-full shadow-sm">
                  Faltan S/ {(50 - subtotal).toFixed(2)}
                </span>
              )}
            </div>

            {/* Summary */}
            <div className="space-y-2 mb-6 px-1">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Gastos de envío</span>
                <span>S/ {shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-gray-900 border-t border-gray-200 pt-3 mt-2">
                <span>Total</span>
                <span className="text-indigo-600">S/ {total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
            >
              {isCheckingOut ? (
                <span className="flex items-center italic">Procesando...</span>
              ) : (
                <span className="flex items-center justify-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pagar Ahora
                </span>
              )}
            </Button>

            {!user && (
              <p className="text-[11px] text-gray-400 text-center mt-4 font-medium uppercase tracking-tighter">
                Accede a Club Angels para precios especiales
              </p>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cart;