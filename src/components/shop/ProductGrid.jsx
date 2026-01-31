import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Tag, ClipboardList } from 'lucide-react';
import { Button, toast } from '@/components/ui';

const ProductGrid = ({ products, onAddToCart, user, searchTerm = '', selectedCategory = 'all' }) => {

  const filteredProducts = products.filter(product => {
    // Filtro especial para ofertas
    if (selectedCategory === 'ofertas') {
      const searchMatch = !searchTerm || [
        product.name,
        product.description,
        product.category,
        product.sku,
        product.barcode,
        product.category_name,
        product.subcategory_name,
        product.brand,
        product.manufacturer,
        product.unit_type,
        product.unit_size
      ].some(field =>
        field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      return product.onSale && searchMatch;
    }

    // Filtros normales
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;

    // Búsqueda avanzada por múltiples atributos
    const searchMatch = !searchTerm || [
      product.name,
      product.description,
      product.category,
      product.sku,
      product.barcode,
      product.category_name,
      product.subcategory_name,
      product.brand,
      product.manufacturer,
      product.unit_type,
      product.unit_size
    ].some(field =>
      field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    return categoryMatch && searchMatch;
  });


  const handleAddToCart = (product) => {
    if (product.prescription && !user) {
      toast({
        title: "Inicia sesión requerido",
        description: "Debes iniciar sesión para comprar medicamentos con receta",
        variant: "destructive"
      });
      return;
    }
    onAddToCart(product);
  };

  return (
    <section id="productos" className="py-20 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Nuestros Productos
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Salud y bienestar a tu alcance. Encuentra los mejores medicamentos con el sello de confianza de <span className="text-indigo-600 font-semibold">Farmacia Angels</span>.
          </p>
        </motion.div>

        {/* Search Results Info */}
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center mb-10"
          >
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3">
              <p className="text-gray-600">
                Resultados para: <span className="font-bold text-indigo-600">"{searchTerm}"</span>
              </p>
              <span className="h-4 w-[1px] bg-gray-200"></span>
              <p className="text-sm font-medium text-gray-400">
                {filteredProducts.length} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => {
            
            // --- LOGICA DE PUNTUACIÓN ALEATORIA (Visual) ---
            // Genera un número entre 4.0 y 5.0 basado en el ID o index para consistencia visual
            const randomRating = (4 + (product.id % 10) / 10 + Math.random() * 0.5).toFixed(1); 
            const safeRating = Math.min(parseFloat(randomRating), 5.0).toFixed(1); // Asegurar que no pase de 5.0
            const randomReviews = Math.floor(Math.random() * 200) + 20;
            // -----------------------------------------------

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group flex flex-col h-full overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative bg-gray-50 h-64 flex items-center justify-center overflow-hidden">
                  <img
                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                    alt={product.name}
                    src={product.image_url || product.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop';
                    }}
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.onSale && (
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center shadow-lg shadow-red-200">
                        <Tag className="w-3 h-3 mr-1" />
                        Oferta
                      </div>
                    )}
                    {product.prescription && (
                      <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center shadow-lg shadow-indigo-200">
                        <ClipboardList className="w-3 h-3 mr-1" />
                        Receta
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    
                    {/* --- AQUÍ ESTÁ EL CAMBIO DE PUNTUACIÓN --- */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">
                        {product.category}
                      </span>
                      
                      {/* Nuevo Estilo de Puntuación */}
                      <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-amber-700">{safeRating}</span>
                        <span className="text-[10px] text-amber-600/60 font-medium">({randomReviews})</span>
                      </div>
                    </div>
                    {/* ----------------------------------------- */}

                    <h3 className="text-lg font-bold text-gray-800 leading-tight group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs mt-2 line-clamp-2 min-h-[32px]">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-end space-x-2 mb-4">
                      <span className="text-2xl font-black text-gray-900">
                        S/ {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through mb-1">
                          S/ {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {user?.role === 'customer' && user.membershipLevel && (
                      <div className="mb-4 p-2 bg-indigo-50 border border-indigo-100 rounded-xl">
                        <p className="text-[10px] text-indigo-700 font-bold text-center">
                          🎉 PRECIO CLUB {(user.membershipLevel === 'gold' ? 'GOLD' : 'SILVER')} APLICADO
                        </p>
                      </div>
                    )}

                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-500 text-white font-bold py-6 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      {product.stock === 0 ? 'Sin Stock' : 'Agregar'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 mt-8"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-10 h-10 text-gray-200" />
            </div>
            <p className="text-xl font-bold text-gray-800">No encontramos lo que buscas</p>
            <p className="text-gray-500 mt-2">Intenta ajustar los filtros o el término de búsqueda.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;