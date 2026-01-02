import {useContext, useState, useEffect} from "react";
import {useFindProducts} from "../useFindProducts.js";
import {ProductsList} from "./productsList.jsx";
import {SearchBar} from "./searchBar.jsx";
import {PageContainer} from "../shared/pageContainer.jsx";
import {BreadCrumbContext} from "../../../../../App.jsx";

export const ProductListPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const {products} = useFindProducts(searchTerm);
    const {updateBreadcrumb} = useContext(BreadCrumbContext);

    useEffect(() => {
        updateBreadcrumb(null);
    }, [updateBreadcrumb]);

    return (
        <PageContainer>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
            <ProductsList products={products}/>
        </PageContainer>
    );
}