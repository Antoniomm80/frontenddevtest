import {useEffect, useState} from 'react';

export const useGetAllProducts = (getAllProductsUseCase) => {
    const [products, setProducts] = useState([]);


    const fetchProducts = async () => {
        try {
            const result = await getAllProductsUseCase.execute();
            setProducts(result);
        } catch (err) {

            console.error('Error in useGetAllProducts:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products
    };
};
