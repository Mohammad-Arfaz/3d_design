import React from 'react';
import { motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { ModelCategories } from '../config/constants';

const CategorySidebar = () => {
  const snap = useSnapshot(state);

  const handleCategoryClick = (categoryId) => {
    state.selectedCategory = categoryId;
    state.showModelPicker = true;
  };

  return (
    <motion.div 
      className="category-sidebar"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <h3 className="text-white text-sm font-semibold mb-2">Categories</h3>
        
        {ModelCategories.map((category) => (
          <motion.button
            key={category.id}
            className={`category-btn ${
              snap.selectedCategory === category.id 
                ? 'bg-white/20 border-white/40' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            } border rounded-lg p-3 transition-all duration-200`}
            onClick={() => handleCategoryClick(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center gap-2">
              <img
                src={category.icon}
                alt={category.name}
                className="w-8 h-8 object-contain filter invert"
              />
              <span className="text-white text-xs font-medium">{category.name}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategorySidebar;
