import './App.css'
import {Route, Routes} from 'react-router-dom'
import {FindProducts} from "./modules/product/application/findProducts.js";
import {FindById} from "./modules/product/application/findById.js";
import {createContext, useCallback, useEffect, useState} from "react";
import {ProductListPage} from "./modules/product/infrastructure/ui/productListPage/productListPage.jsx";
import {Header} from "./modules/product/infrastructure/ui/shared/header.jsx";
import {ProductDetailPage} from "./modules/product/infrastructure/ui/productDetailsPage/productDetailPage.jsx";
import {BrowserStorageService} from "./modules/cart/infrastructure/browserStorageService.js";
import {AddToCart} from "./modules/cart/application/addToCart.js";
import {GetCartCount} from "./modules/cart/application/getCartCount.js";
import {ProductCachedFetchService} from "./modules/product/infrastructure/productCachedFetchService.js";
import {CartFetchService} from "./modules/cart/infrastructure/cartFetchService.js";

const API_BASE_URL = import.meta.env.DEV ? "" : "https://itx-frontend-test.onrender.com";
const ONE_HOUR = 3600000;

const productApiService = new ProductCachedFetchService(API_BASE_URL, ONE_HOUR);
const cartApiService = new CartFetchService(API_BASE_URL);

const storageService = new BrowserStorageService();

const findProductsUseCase = new FindProducts(productApiService);
const findByIdUseCase = new FindById(productApiService);
const addToCartUseCase = new AddToCart(cartApiService, storageService);
const getCartCountUseCase = new GetCartCount(storageService);
export const UseCasesContext = createContext({findProductsUseCase, findByIdUseCase, getCartCountUseCase});
export const BreadCrumbContext = createContext({
    breadCrumb: undefined,
    updateBreadcrumb: () => {}
});
export const CartContext = createContext({
    cartCount: 0,
    updateCartCount: () => {}
});

function App() {
    const [breadCrumb, setBreadcrumb] = useState({});
    const [cartCount, setCartCount] = useState(0);

    const updateBreadcrumb = useCallback((breadcrumb) => {
        setBreadcrumb(breadcrumb);
    }, []);

    const updateCartCount = useCallback((cartCount) => {
        setCartCount(cartCount);
    }, []);

    useEffect(() => {
        const initializeCart = async () => {
            try {
                const count = await getCartCountUseCase.execute();
                setCartCount(count);
            } catch (error) {
                console.error('Error initializing cart count:', error);
            }
        };
        initializeCart();
    }, []);


    return (
        <UseCasesContext.Provider value={{findProductsUseCase, findByIdUseCase, addToCartUseCase}}>
            <BreadCrumbContext.Provider value={{breadCrumb, updateBreadcrumb}}>
                <CartContext.Provider value={{cartCount, updateCartCount}}>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<ProductListPage/>}/>
                        <Route path="/product/:id" element={<ProductDetailPage/>}/>
                    </Routes>
                </CartContext.Provider>
            </BreadCrumbContext.Provider>
        </UseCasesContext.Provider>
    )
}

export default App
