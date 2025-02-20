"user client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "../../components/Header"
import { Button } from "app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "app/components/ui/select"
import { ArrowLeft } from "lucide-react"


export default function ProductPage({ params }: { params: { id: string } }) {
  // This would normally fetch from an API
  const product = {
    id: params.id,
    name: "School Hoodie",
    image: "/placeholder.svg?height=600&width=600",
    price: 39.99,
    stock: 50,
    description: "Comfortable school hoodie with embroidered logo.",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/shop">
        <Button variants="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold mt-2">${product.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">Stock: {product.stock} available</p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Size</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button size="lg">Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

