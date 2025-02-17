import Image from "next/image"
import Link from "next/link"
import { Button } from "app/components/ui/button"

const products = [
    { id: 1, name:"", image: "/placeholder.svg?height=300& width =300"},
    { id: 2, name:"", image: "/placeholder.svg?height=300& width =300"},
    { id: 3, name:"", image: "/placeholder.svg?height=300& width =300"},
    { id: 4, name:"", image: "/placeholder.svg?height=300& width =300"},
]

export default function ProductDisplay() {
    return (
        <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/shop">
          <Button size="lg">Shop Now</Button>
        </Link>
      </div>
    </div>
    )
}