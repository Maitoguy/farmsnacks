// store.js
import { create } from 'zustand';

export const useCartStore = create((set) => ({
    cartItems: [],
    fallingFruits: [],

    addToCart: (product, fruitSvg) => {
        // Update cart data
        set((state) => {
            const existingItem = state.cartItems.find(item => item.id === product.id);
            if (existingItem) {
                return {
                    cartItems: state.cartItems.map(item =>
                        item.id === product.id ? { ...item, count: item.count + 1 } : item
                    )
                };
            }
            return { cartItems: [...state.cartItems, { id: product.id, name: product.product_name, count: 1 }] };
        });

        // Trigger visual drop using the SVG
        const animId = Date.now() + Math.random();
        set((state) => ({
            fallingFruits: [...state.fallingFruits, { id: animId, svg: fruitSvg }]
        }));

        // Cleanup
        setTimeout(() => {
            set((state) => ({
                fallingFruits: state.fallingFruits.filter(f => f.id !== animId)
            }));
        }, 2500);
    }
}));