import './App.css'
import {Route, Routes} from 'react-router-dom'
import {ProductsList} from "./modules/product/infrastructure/ui/productListPage/productsList.jsx";
import {ProductFetchService} from "./modules/product/infrastructure/productFetchService.js";
import {GetAllProducts} from "./modules/product/application/getAllProducts.js";
import {FindById} from "./modules/product/application/findById.js";
import {ProductDetail} from "./modules/product/infrastructure/ui/productDetailsPage/productDetail.jsx";

const API_BASE_URL = "https://itx-frontend-test.onrender.com";

const productApiAdapter = new ProductFetchService(API_BASE_URL);

const getAllProductsUseCase = new GetAllProducts(productApiAdapter);
const findByIdUseCase = new FindById(productApiAdapter);

function App() {
    return (
        <Routes>
            <Route path="/" element={<ProductsList getAllProductsUseCase={getAllProductsUseCase}/>}/>
            <Route path="/product/:id" element={<ProductDetail findByIdUseCase={findByIdUseCase}/>}/>
        </Routes>
    )
}

export default App
