import React from 'react';
import { motion } from 'framer-motion';
import { X, Truck, Package, CheckCircle, RefreshCw, Clock, ShoppingBag, Calendar, MapPin, ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui';

const OrderTrackingModal = ({ onClose, orders = [] }) => {
  
  // Configuración de estados: Colores y textos
  const getStatusConfig = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case 'pending': 
        return { label: 'Pendiente', color: 'bg-slate-100 text-slate-600', icon: Clock, barColor: 'bg-slate-200' };
      case 'processing': 
        return { label: 'Procesando', color: 'bg-indigo-100 text-indigo-600', icon: RefreshCw, barColor: 'bg-indigo-500' };
      case 'shipped': 
        return { label: 'En Camino', color: 'bg-purple-100 text-purple-600', icon: Truck, barColor: 'bg-purple-500' };
      case 'delivered': 
        return { label: 'Entregado', color: 'bg-emerald-100 text-emerald-600', icon: CheckCircle, barColor: 'bg-emerald-500' };
      case 'cancelled': 
        return { label: 'Cancelado', color: 'bg-rose-100 text-rose-600', icon: AlertCircle, barColor: 'bg-rose-500' };
      default: 
        return { label: status, color: 'bg-gray-100 text-gray-600', icon: Package, barColor: 'bg-gray-200' };
    }
  };

  const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];

  const getStatusIndex = (status) => {
    // Si está cancelado, no mostramos el progreso normal
    if (status === 'cancelled') return -1;
    return statusSteps.indexOf(status) >= 0 ? statusSteps.indexOf(status) : 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-PE', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(date);
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
        className="bg-gray-50 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con Identidad Farmacia Angels */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white p-6 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md shadow-inner">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Mis Pedidos</h2>
                <p className="text-indigo-100 text-xs font-medium opacity-90">
                  Historial y seguimiento en tiempo real
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Lista de Pedidos */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-6">
          {orders && orders.length > 0 ? (
            orders.map((order, i) => {
              const currentStatusIndex = getStatusIndex(order.status);
              const config = getStatusConfig(order.status);
              const isCancelled = order.status === 'cancelled';

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-50 hover:shadow-md transition-shadow"
                >
                  {/* Cabecera de la Tarjeta */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6 border-b border-gray-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ID PEDIDO</span>
                        <span className="font-mono text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                          #{order.order_code || order.id.substring(0, 8).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(order.order_date)}</span>
                      </div>
                    </div>

                    <div className="text-right flex flex-row sm:flex-col justify-between items-center sm:items-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${config.color}`}>
                        <config.icon className="w-3.5 h-3.5" />
                        {config.label}
                      </span>
                      <p className="text-lg font-bold text-indigo-900 mt-1 sm:mt-2">
                        S/ {(order.final_amount || order.total_amount || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Detalles de Items y Dirección */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-slate-50 rounded-xl p-3">
                       <p className="text-xs font-bold text-gray-500 mb-2 uppercase flex items-center gap-1">
                         <ShoppingBag className="w-3 h-3" /> Productos
                       </p>
                       <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                         {order.order_items?.map((item, idx) => (
                           <div key={idx} className="flex justify-between text-sm group">
                             <span className="text-gray-600 group-hover:text-indigo-600 transition-colors line-clamp-1 pr-2">
                               {item.quantity}x {item.product_name}
                             </span>
                             <span className="font-medium text-gray-900 shrink-0">
                               S/ {(item.total_price || 0).toFixed(2)}
                             </span>
                           </div>
                         ))}
                       </div>
                    </div>

                    {order.shipping_address && (
                      <div className="bg-slate-50 rounded-xl p-3 flex flex-col justify-center">
                        <p className="text-xs font-bold text-gray-500 mb-2 uppercase flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Entrega en
                        </p>
                        <p className="text-sm text-gray-700 leading-snug">
                          {order.shipping_address}
                        </p>
                        {order.tracking_number && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                             <p className="text-xs text-gray-500">Tracking:</p>
                             <p className="text-xs font-mono text-indigo-600 font-bold">{order.tracking_number}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Stepper / Línea de Tiempo */}
                  {!isCancelled && (
                    <div className="relative mt-2 px-2">
                      <div className="flex items-center justify-between relative z-10">
                        {statusSteps.map((step, index) => {
                          const stepConfig = getStatusConfig(step);
                          const isCompleted = index <= currentStatusIndex;
                          const isCurrent = index === currentStatusIndex;
                          
                          return (
                            <div key={step} className="flex flex-col items-center flex-1">
                              <div 
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                                  isCompleted 
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' 
                                    : 'bg-white border-gray-200 text-gray-300'
                                }`}
                              >
                                <stepConfig.icon className="w-4 h-4" />
                              </div>
                              <span className={`text-[10px] sm:text-xs font-semibold mt-2 transition-colors duration-300 ${
                                isCompleted ? 'text-indigo-700' : 'text-gray-400'
                              }`}>
                                {stepConfig.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Barra de fondo */}
                      <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 -z-0 rounded-full" />
                      
                      {/* Barra de progreso animada */}
                      <motion.div 
                        className="absolute top-4 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full -z-0"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` }}
                        transition={{ duration: 1, ease: "circOut" }}
                      />
                    </div>
                  )}

                  {isCancelled && (
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-center gap-3 text-rose-700">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p className="text-sm font-medium">Este pedido ha sido cancelado. Si tienes dudas, contáctanos.</p>
                    </div>
                  )}
                </motion.div>
              );
            })
          ) : (
            /* Estado Vacío */
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <div className="bg-indigo-50 p-6 rounded-full mb-4 animate-pulse">
                <ShoppingBag className="w-12 h-12 text-indigo-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Aún no tienes pedidos</h3>
              <p className="text-gray-500 max-w-xs mx-auto mb-6">
                ¡Explora nuestro catálogo y realiza tu primera compra para ver el seguimiento aquí!
              </p>
              <Button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-full">
                Ir a comprar
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderTrackingModal;