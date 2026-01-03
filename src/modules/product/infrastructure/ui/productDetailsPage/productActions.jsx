import {useAddToCart} from "../useAddtoCart.js";
import {useState} from "react";

export const ProductActions = ({product}) => {
    const colorOptions = product.colorOptions;
    const storageOptions = product.storageOptions;
    const {addToCart} = useAddToCart();
    const [selectedColorOption, setSelectedColorOption] = useState(
        colorOptions.length === 1 ? colorOptions[0].code : ""
    );
    const [selectedStorageOption, setSelectedStorageOption] = useState(
        storageOptions.length === 1 ? storageOptions[0].code : ""
    );
    return (
        <div className="space-y-4">
            <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Color:</label>
                <select
                    id="select-color"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => setSelectedColorOption(e.target.value)}>
                    {colorOptions.map((option) => (
                        <option key={option.code} value={option.code}>{option.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Storage:</label>
                <select
                    id="select-storage"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => setSelectedStorageOption(e.target.value)}>
                    {storageOptions.map((option) => (
                        <option key={option.code} value={option.code}>{option.name}</option>
                    ))}
                </select>
            </div>

            <button
                className="w-full px-6 py-3 mt-4 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                onClick={() => addToCart({id: product.id, colorCode: selectedColorOption, storageCode: selectedStorageOption})}>
                Add to Cart
            </button>
        </div>
    );
};