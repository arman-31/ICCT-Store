import Header from "../components/Header"
import ShopProducts from "../components/Shopproducts"

export default function ShopPage() {
    return (
        <main className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto mt-8 p-4">
                <h1 className="text-3x1 font-bold mb-8 text-center">OUR Products</h1>
                <ShopProducts />
            </div>
        </main>
    )
}