import {Link} from "react-router-dom";
import {Breadcrumb} from "./breadcrumb.jsx";
import {CartCountBadge} from "./cartCountBadge.jsx";

export const Header = () => {
    return (
        <header className="bg-white shadow-md border-b border-gray-200">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link id="header-link" to="/" className="flex items-center hover:opacity-80
 transition-opacity">
                    <img src="/react.svg" alt="React Logo" className="h-8 w-8"/>
                </Link>
                <CartCountBadge/>
            </div>
            <div className="container mx-auto px-4 pb-1">
                <Breadcrumb/>
            </div>
        </header>
    );
}