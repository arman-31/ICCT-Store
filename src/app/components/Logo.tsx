import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/icct_logo.svg" // Place icct_logo.svg in the public folder
        alt="School Logo"
        width={32}  // Actual width of your logo
        height={32} // Actual height of your logo
        className="w-8 h-8" // Optional: Tailwind classes for styling
      />
      <span className="text-x5 font-bold text-gray-800">ICCT Store</span>
    </Link>
  );
}
