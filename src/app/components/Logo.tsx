import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/icct_logo.svg" // Place icct_logo.svg in the public folder
        alt="School Logo"
        width={100}  // Actual width of your logo
        height={100} // Actual height of your logo
        className="w-70 h-70" // Optional: Tailwind classes for styling
      />
      <span className="text-[30px] font-bold text-white-800">ICCT Store</span>
    </Link>
  );
}
