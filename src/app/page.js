import { products } from "../../public/data";
import ProductCard from "./components/ProductCard";
import { Filter } from "lucide-react";
import {DroppingFruit} from "./components/DroppingFruit";

export default function Home() {

    return (
        <main className="flex flex-col min-h-screen bg-background text-on-background">

            {/* Filter Section */}
            <section className="bg-surface-container border-b border-outline-variant p-4 md:px-8 flex flex-wrap items-center justify-between gap-4 relative z-20">
                <div className="flex flex-wrap items-center gap-6">
                    <h2 className="font-bold text-primary text-xl flex items-center gap-2 mr-2">
                        <Filter size={20} />
                        Filters
                    </h2>

                    <div className="relative group">
                        <button className="px-4 py-2 bg-surface text-on-surface font-medium border border-outline-variant rounded-md hover:bg-surface-dim transition-colors flex items-center gap-2 cursor-pointer shadow-hard">
                            Price
                            <svg className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-outline-variant rounded-md shadow-hard opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4 flex flex-col gap-3">
                            <label className="flex items-center gap-3 cursor-pointer text-on-surface-variant hover:text-on-surface transition-colors text-sm">
                                <input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer" />
                                <span>Under $4.00</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer text-on-surface-variant hover:text-on-surface transition-colors text-sm">
                                <input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer" />
                                <span>$4.00 - $6.00</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer text-on-surface-variant hover:text-on-surface transition-colors text-sm">
                                <input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer" />
                                <span>Over $6.00</span>
                            </label>
                        </div>
                    </div>

                    <div className="relative group">
                        <button className="px-4 py-2 bg-surface text-on-surface font-medium border border-outline-variant rounded-md hover:bg-surface-dim transition-colors flex items-center gap-2 cursor-pointer shadow-hard">
                            Quantity
                            <svg className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-outline-variant rounded-md shadow-hard opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4 flex flex-col gap-3">
                            <label className="flex items-center gap-3 cursor-pointer text-on-surface-variant hover:text-on-surface transition-colors text-sm">
                                <input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer" />
                                <span>Up to 100g</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer text-on-surface-variant hover:text-on-surface transition-colors text-sm">
                                <input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer" />
                                <span>100g - 150g</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer text-on-surface-variant hover:text-on-surface transition-colors text-sm">
                                <input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer" />
                                <span>Over 150g</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                        Clear All
                    </button>
                    <button className="bg-primary text-on-primary font-bold px-5 py-2 rounded-md hover:bg-surface-tint transition-colors flex items-center justify-center cursor-pointer shadow-hard">
                        Apply Filters
                    </button>
                </div>
            </section>

            {/* Main Products */}
            <section className="bg-surface p-6 md:p-8 flex-grow z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-surface text-on-surface border-t border-outline-variant py-8 px-8 flex flex-col md:flex-row items-center justify-between">
                <p className="font-medium text-on-surface-variant mb-4 md:mb-0">© 2026 Farm Snacks. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                    </a>
                    <a href="#" className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                        </svg>
                    </a>
                    <a href="#" className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                        </svg>
                    </a>
                </div>
            </footer>

            <DroppingFruit />

        </main>
    );
}