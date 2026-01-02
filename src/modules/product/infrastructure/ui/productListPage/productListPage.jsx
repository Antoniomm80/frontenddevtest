import {useState} from "react";
import {useFindProducts} from "../useFindProducts.js";
import {ProductsList} from "./productsList.jsx";
import {SearchBar} from "./searchBar.jsx";

export const ProductListPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const {products} = useFindProducts(searchTerm);

    return (
        <>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
            <ProductsList products={products}/>
        </>
    );
}