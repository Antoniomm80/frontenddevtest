import './App.css'
import {ProductsList} from "./modules/product/infrastructure/ui/productsList.jsx";
import {ProductFetchService} from "./modules/product/infrastructure/productFetchService.js";
import {GetAllProducts} from "./modules/product/application/getAllProducts.js";
import {FindById} from "./modules/product/application/findById.js";

const API_BASE_URL = "https://itx-frontend-test.onrender.com";

const productApiAdapter = new ProductFetchService(API_BASE_URL);

const getAllProductsUseCase = new GetAllProducts(productApiAdapter);
const findByIdUseCase = new FindById(productApiAdapter);

function App() {
    return (
        <>
            <ProductsList getAllProductsUseCase={getAllProductsUseCase}/>
        </>
    )
}

export default App
