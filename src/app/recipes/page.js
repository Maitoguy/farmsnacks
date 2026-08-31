export default function Recipes() {
    return (
        <main className="p-8 bg-background min-h-screen text-on-background">
            <h1 className="text-4xl font-bold text-primary mb-4">Our Recipes</h1>
            <p className="text-on-surface-variant text-lg max-w-2xl mb-8">
                Discover delicious ways to use our farm snacks in your everyday cooking.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Example Recipe Card placeholder */}
                <div className="p-6 bg-surface-container rounded-lg border border-outline-variant shadow-sm">
                    <h2 className="text-xl font-bold text-on-surface mb-2">Honey Glazed Almonds</h2>
                    <p className="text-on-surface-variant">A quick 10-minute recipe for the perfect sweet and salty crunch.</p>
                </div>
            </div>
        </main>
    );
}