export const SearchBar = ({searchTerm, onSearchChange}) => {
    return (
        <div className="p-4 pb-0">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by brand or model..."
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
}