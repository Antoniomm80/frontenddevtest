import {useContext, useEffect, useState} from 'react';
import {UseCasesContext} from '../../../../App.jsx';

export const useFindProducts = (searchTerm) => {
    const {findProductsUseCase} = useContext(UseCasesContext);
    const [products, setProducts] = useState([]);


    const fetchProducts = async () => {
        try {
            const result = await findProductsUseCase.execute(searchTerm);
            setProducts(result);
        } catch (err) {
            console.error('Error in useFindProducts:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [searchTerm]);

    return {
        products
    };
};
