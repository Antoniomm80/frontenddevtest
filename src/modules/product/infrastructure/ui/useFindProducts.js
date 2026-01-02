import {useEffect, useState} from 'react';

export const useFindProducts = (findProductsUseCase) => {
    const [products, setProducts] = useState([]);


    const fetchProducts = async () => {
        try {
            const result = await findProductsUseCase.execute();
            setProducts(result);
        } catch (err) {

            console.error('Error in useFindProducts:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products
    };
};
