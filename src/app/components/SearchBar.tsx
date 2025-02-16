import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="relative mt-4 mdl:mt-0 w-full md:w-96">
            <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 boder voder-gray-300 rounded-md focus:ring-blue-500"
            />
            <button className="absulote righ-2 top-1/2 transform-translate-y-1/2">
             <Search className="h-5 w-5 text-gray-400" />
            </button>
        </div>
    )
}