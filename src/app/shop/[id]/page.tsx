user client

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Header from "../../components/Header"
import { Button } from "app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "app/components/ui/select"
import { ArrowLeft } from "lucide-react"


const products = [
    {
      id: "1",
      name: "Product 1",
      image: "/placeholder.svg?height=600&width=600",
      price: 999.99,
      sizes: ["S", "M", "L", "XL"],
      stock: 10,
    },
    {
      id: "2",
      name: "Product 2",
      image: "/placeholder.svg?height=600&width=600",
      price: 1499.99,
      sizes: ["M", "L", "XL"],
      stock: 5,
    },
    {
      id: "3",
      name: "Product 3",
      image: "/placeholder.svg?height=600&width=600",
      price: 799.99,
      sizes: ["S", "M", "L"],
      stock: 0,
    },
    {
      id: "4",
      name: "Product 4",
      image: "/placeholder.svg?height=600&width=600",
      price: 2999.99,
      sizes: ["S", "M", "L", "XL"],
      stock: 3,
    },
  ]
  
  export default function ProductPage() {
    const { id } = useParams()
    const router = useRouter()
    const product = products.find((p) => p.id === id)
    const [selectedSize, setSelectedSize] = useState("")
    const [cart, setCart] = useState([])
  
    useEffect(() => {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    }, [])
  
    const addToCart = () => {
      if (!selectedSize) {
        alert("Please select a size")
        return
      }
      if (product?.stock === 0) {
        alert("Sorry, this product is out of stock")
        return
      }
      const newItem = {
        id: product?.id,
        name: product?.name,
        price: product?.price,
        size: selectedSize,
      }
      const updatedCart = [...cart, newItem]
      setCart;{updatedCart}
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      alert("Product added to cart!")
    }
  
    if (!product) {
      return <div>Product not found</div>
    }
  
    return (
      <main className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto mt-8 p-4">
          <Button variants="outline" className="mb-4" onClick={() => router.push("/shop")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
          </Button>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col items-center p-8">
              <div className="relative w-full max-w-md aspect-square mb-8">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-2xl font-semibold text-blue-600 mb-2">₱{product.price.toFixed(2)}</p>
                <p className={`text-sm mb-6 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {product.stock > 0 ? `In Stock: ${product.stock} available` : "Out of Stock"}
                </p>
                <div className="mb-6">
                  <Select onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addToCart} disabled={product.stock === 0} className="w-full max-w-xs">
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }