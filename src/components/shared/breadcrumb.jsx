import {useContext} from "react";
import {BreadCrumbContext} from "../../App.jsx";
import {Link} from "react-router-dom";

export const Breadcrumb = () => {
    const {breadCrumb} = useContext(BreadCrumbContext);
    let items;
    if (!breadCrumb) {
        items = <li className="flex items-center">
            <span className="text-gray-400">Home</span>
        </li>;
    } else {
        items = <>
            <li className="flex items-center">
                <Link to="/" className="text-gray-600 hover:text-gray-600">Home</Link>
            </li>
            <li className="flex items-center">
                <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
                <span className="text-gray-400">{breadCrumb.label}</span>
            </li>
        </>;
    }

    return (
        <nav>
            <ol className="list-none p-0 inline-flex">
                {items}
            </ol>
        </nav>
    );
};