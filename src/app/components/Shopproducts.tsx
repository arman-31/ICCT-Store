import Image from "next/image"
import Link from "next/link"

const products = [
  { id: "1", name: "", image: "/placeholder.svg?height=300&width=300", price: 999.99, stock: 10 },
  { id: "2", name: "", image: "/placeholder.svg?height=300&width=300", price: 1499.99, stock: 5 },
  { id: "3", name: "", image: "/placeholder.svg?height=300&width=300", price: 799.99, stock: 0 },
  { id: "4", name: "", image: "/placeholder.svg?height=300&width=300", price: 2999.99, stock: 3 },

]

export default function ShopProducts() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2
        lg:grid-cols-4 gap-6">
          {products.map((product) =>(
            <Link
             href={'/shop/${product.id}'}
             key={product.id}
             className="bg-white rounded-lg shadow-md
             overflow-hidden hover:shadow-lg transition-shadow duation-300">
             <div className="relatice aspect-square">
                <Image
                 src={product.image || "/placeholder.svg"}
                 alt={product.name}
                 fill
                 sizes="(max-width: 640px) 100vw, (max-width:1024px) 50vw, 25vw"
                 className="object-cover"
                />
               </div>
               <div className="p-4 space y-2">
                 <h2 className="text-lg font-semibold">{product.name}</h2>
                 <p className="text-xl font-bold text-blue-600">₱{product.price.toFixed(2)}</p>
                 <p className={'text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}'}>
                    {product.stock > 0 ? 'In Stock: ${product.stock}' : "out of Stock's"}
                 </p>
                </div>    
             </Link>
          ))}
        </div>
    )
}