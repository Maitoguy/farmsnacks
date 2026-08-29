import Link from 'next/link';

export default function Navbar(){

    return(
        <nav>

            {/* Div Containing Logo */}
            <div>

            </div>

            {/* Div containing Options */}
            <div>
                <Link href="/">
                    Shop
                </Link>
                <Link href="/about">
                    About
                </Link>
                <Link href="/recipes">
                    Recipes
                </Link>
            </div>

            {/* Dummy person logo */}
            <div>

            </div>

        </nav>
    )

}