import { Header } from "./components/Header"
import ProductDisplay from "./components/ProductDisplay"

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto mt-8 p-4">
                <h1 className="text-3x1 font-bold mb-8 text-center">Featured Products</h1>
                <ProductDisplay />
            </div>
        </main>
    )
}