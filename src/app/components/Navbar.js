"use client"
import Link from 'next/link';
import { User } from 'lucide-react';
import Image from 'next/image';
import Logo from '../../../public/brand-logo.jpg';
import {usePathname} from "next/navigation";

export default function Navbar() {

    const pathName = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full flex justify-between items-center px-6 py-4 bg-surface border-b border-outline-variant shadow-sm text-on-surface">

            {/* Div Containing Logo */}
            <div className="flex items-center gap-4">
                <a href="/" className="flex items-center gap-2">
                    <Image
                        src={Logo}
                        alt="Farm Snacks"
                        priority
                        className="w-auto h-12 border border-transparent hover:border-outline-variant transition-colors rounded-md"
                        style={{ objectFit: 'contain' }}
                    />
                </a>
            </div>

            {/* Div containing Options */}
            <div className="flex gap-10 font-medium text-on-surface-variant">
                <Link href="/"
                      className={pathName === '/' ? 'text-primary underline underline-offset-8 decoration-4' : 'hover:text-primary transition-colors'}>
                    Shop
                </Link>
                <Link href="/about"
                      className={pathName === '/about' ? 'text-primary underline underline-offset-8 decoration-4' : 'hover:text-primary transition-colors'}>
                    About
                </Link>
                <Link href="/recipes"
                      className={pathName === '/recipes' ? 'text-primary underline underline-offset-8 decoration-4' : 'hover:text-primary transition-colors'}>
                    Recipes
                </Link>
            </div>

            {/* Dummy person logo */}
            <div className="p-2 bg-secondary-container text-on-secondary-container hover:bg-primary hover:text-on-primary rounded-full transition-colors cursor-pointer">
                <User size={24} />
            </div>

        </nav>
    )
}