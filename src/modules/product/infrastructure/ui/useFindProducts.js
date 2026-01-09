import {useContext, useEffect, useState} from 'react';
import {UseCasesContext} from '../../../../App.jsx';
import toast from 'react-hot-toast';

export const useFindProducts = (searchTerm) => {
    const {findProductsUseCase} = useContext(UseCasesContext);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const result = await findProductsUseCase.execute(searchTerm);
            setProducts(result);
        } catch (err) {
            console.error('Error in useFindProducts:', err);
            toast.error('Failed to load products. Please refresh the page.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [searchTerm]);

    return {
        products, isLoading
    };
};
