import './App.css'
import {Route, Routes} from 'react-router-dom'
import {ProductFetchService} from "./modules/product/infrastructure/productFetchService.js";
import {FindProducts} from "./modules/product/application/findProducts.js";
import {FindById} from "./modules/product/application/findById.js";
import {createContext, useState, useCallback} from "react";
import {ProductListPage} from "./modules/product/infrastructure/ui/productListPage/productListPage.jsx";
import {Header} from "./modules/product/infrastructure/ui/shared/header.jsx";
import {ProductDetailPage} from "./modules/product/infrastructure/ui/productDetailsPage/productDetailPage.jsx";

const API_BASE_URL = "https://itx-frontend-test.onrender.com";

const productApiService = new ProductFetchService(API_BASE_URL);

const findProductsUseCase = new FindProducts(productApiService);
const findByIdUseCase = new FindById(productApiService);
export const UseCasesContext = createContext({findProductsUseCase, findByIdUseCase});
export const BreadCrumbContext = createContext({
    undefined, function() {
    }
});

function App() {
    const [breadCrumb, setBreadcrumb] = useState({});

    const updateBreadcrumb = useCallback((breadcrumb) => {
        setBreadcrumb(breadcrumb);
    }, []);

    return (
        <UseCasesContext.Provider value={{findProductsUseCase, findByIdUseCase}}>
            <BreadCrumbContext.Provider value={{breadCrumb, updateBreadcrumb}}>
                <Header/>
                <Routes>
                    <Route path="/" element={<ProductListPage/>}/>
                    <Route path="/product/:id" element={<ProductDetailPage/>}/>
                </Routes>
            </BreadCrumbContext.Provider>
        </UseCasesContext.Provider>
    )
}

export default App
