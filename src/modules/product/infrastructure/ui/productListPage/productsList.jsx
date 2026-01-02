import {Link} from "react-router-dom";

export const ProductsList = ({products}) => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Products List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="block">
                        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
                            <img
                                src={product.imgUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover mb-2 rounded"
                            />
                            <h3 className="font-bold">{product.brand}</h3>
                            <p className="text-gray-600">{product.model}</p>
                            <p className="text-lg font-semibold mt-2">{product.price} €</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}