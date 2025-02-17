import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="relative mt-4 md:mt-0 w-full md:w-96">
            <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border voder-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-1 top-3 border-gray-300 rounded-md focus:outline-none foucs:ring-2 focus:ring-blue-500">
             <Search className="h-8 w-8 text-gray-400" />
            </button>
        </div>
    )
}