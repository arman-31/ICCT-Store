import Image from "next/image"
import Link from "next/link"
import { Button } from "app/components/ui/button"

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "",
      image: "/cas.jpg?height=400&width=400",
      price: 0,
    },
    {
      id: 2,
      name: "",
      image: "/css.jpg?height=400&width=400",
      price: 0,
    },
    {
      id: 3,
      name: "",
      image: "/coTe.jpg?height=400&width=400",
      price: 0,
    },
    {
      id: 4,
      name: "",
      image: "/coca.jpg?height=400&width=400",
      price: 0,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <div key={product.id} className="flex flex-col gap-4">
            <div className="aspect-square relative overflow-hidden rounded-lg border bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/shop">
          <Button size="lg">Shop All Products</Button>
        </Link>
      </div>
    </div>
  )
}

