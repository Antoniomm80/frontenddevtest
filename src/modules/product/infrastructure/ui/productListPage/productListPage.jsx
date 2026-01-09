import {useContext, useEffect, useState} from "react";
import {useFindProducts} from "../useFindProducts.js";
import {ProductsList} from "./productsList.jsx";
import {SearchBar} from "./searchBar.jsx";
import {PageContainer} from "../shared/pageContainer.jsx";
import {BreadCrumbContext} from "../../../../../App.jsx";
import {Spinner} from "../shared/spinner.jsx";

export const ProductListPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const {products, isLoading} = useFindProducts(searchTerm);
    const {updateBreadcrumb} = useContext(BreadCrumbContext);

    useEffect(() => {
        updateBreadcrumb(null);
    }, [updateBreadcrumb]);
    if (isLoading) return (
        <PageContainer>
            <Spinner/>
        </PageContainer>
    );

    return (
        <PageContainer>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
            <ProductsList products={products}/>
        </PageContainer>
    );
}