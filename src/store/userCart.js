
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set) => ({
            cartItems: [],
            fallingFruits: [],

            // 1. ADDED: Modal State and Toggle Function
            isCheckoutOpen: false,
            toggleCheckout: () => set((state) => ({ isCheckoutOpen: !state.isCheckoutOpen })),

            addToCart: (product) => {
                set((state) => {
                    const existingItem = state.cartItems.find(item => item.id === product.id);
                    if (existingItem) {
                        return {
                            cartItems: state.cartItems.map(item =>
                                item.id === product.id ? { ...item, count: item.count + 1 } : item
                            )
                        };
                    }
                    return { cartItems: [...state.cartItems, { id: product.id, count: 1 }] };
                });

                const animId = Date.now() + Math.random();
                set((state) => ({
                    fallingFruits: [...state.fallingFruits, { id: animId, svg: product.svg_icon }]
                }));

                setTimeout(() => {
                    set((state) => ({
                        fallingFruits: state.fallingFruits.filter(f => f.id !== animId)
                    }));
                }, 2500);
            },

            decrementItem: (id) => set((state) => ({
                cartItems: state.cartItems.map(item =>
                    item.id === id ? { ...item, count: item.count - 1 } : item
                ).filter(item => item.count > 0)
            }))
        }),
        {
            name: 'farm-snack-cart',
            partialize: (state) => ({ cartItems: state.cartItems }),
        }
    )
);