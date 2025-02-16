import Link from "next/link"
import Image from "next/image"

export default function Logo() {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder.svg?height=32&width=32"
            alt="School Logo" width={32} height={32} className="w-8 h-8" />
            <span className="text-x1 font-bold text-gray-800">ICCT Store</span>
        </Link>
    )
}
