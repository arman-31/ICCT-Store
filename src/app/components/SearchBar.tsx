import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="relative mt-4 md:mt-0 w-full md:w-96">
            <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
             <Search className="h-8 w-8 text-gray-400" />
            </button>
        </div>
    )
}