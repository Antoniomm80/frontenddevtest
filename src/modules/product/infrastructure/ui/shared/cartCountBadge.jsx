import {useContext} from "react";
import {CartContext} from "../../../../../App.jsx";

export const CartCountBadge = () => {
    const {cartCount} = useContext(CartContext);
    return (
        <div className="flex items-center gap-2">
            {/* Cart Icon */}
            <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184
 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
            {/* Badge with Count */}
            <span className="bg-blue-600 text-white rounded-full px-2.5 py-0.5 text-sm
 font-semibold min-w-[28px] text-center">
                 {cartCount}
             </span>
        </div>
    );
};