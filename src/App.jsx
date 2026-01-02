import './App.css'
import {Route, Routes} from 'react-router-dom'
import {ProductsList} from "./modules/product/infrastructure/ui/productListPage/productsList.jsx";
import {ProductFetchService} from "./modules/product/infrastructure/productFetchService.js";
import {FindProducts} from "./modules/product/application/findProducts.js";
import {FindById} from "./modules/product/application/findById.js";
import {ProductDetail} from "./modules/product/infrastructure/ui/productDetailsPage/productDetail.jsx";
import {createContext} from "react";

const API_BASE_URL = "https://itx-frontend-test.onrender.com";

const productApiAdapter = new ProductFetchService(API_BASE_URL);

const findProductsUseCase = new FindProducts(productApiAdapter);
const findByIdUseCase = new FindById(productApiAdapter);
export const UseCasesContext = createContext({findProductsUseCase, findByIdUseCase});

function App() {
    return (
        <UseCasesContext.Provider value={{findProductsUseCase, findByIdUseCase}}>
            <Routes>
                <Route path="/" element={<ProductsList/>}/>
                <Route path="/product/:id" element={<ProductDetail/>}/>
            </Routes>
        </UseCasesContext.Provider>
    )
}

export default App
