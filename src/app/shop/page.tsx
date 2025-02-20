import Image from "next/image"
import Link from "next/link"

export default function ShopPage() {
    const products = [
      {
        id: 1,
        name: "School Hoodie",
        image: "/placeholder.svg?height=400&width=400",
        price: 39.99,
        stock: 50,
      },
      {
        id: 2,
        name: "School T-Shirt",
        image: "/placeholder.svg?height=400&width=400",
        price: 19.99,
        stock: 100,
      },
      {
        id: 3,
        name: "School Cap",
        image: "/placeholder.svg?height=400&width=400",
        price: 14.99,
        stock: 75,
      },
      {
        id: 4,
        name: "School Backpack",
        image: "/placeholder.svg?height=400&width=400",
        price: 49.99,
        stock: 25,
      },
    ]
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shop Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/shop/${product.id}`}>
              <div className="flex flex-col gap-4 h-full p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold">{product.name}</h2>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }