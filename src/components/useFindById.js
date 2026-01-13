import {useContext, useEffect, useState} from 'react';
import {UseCasesContext} from '../App.jsx';
import toast from 'react-hot-toast';

export const useFindById = (id) => {
    const [productDetail, setProductDetail] = useState(null);
    const {findByIdUseCase} = useContext(UseCasesContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetail = async () => {
            setIsLoading(true);
            try {
                const result = await findByIdUseCase.execute(id);
                setProductDetail(result);
            } catch (err) {
                console.error('Error in findById:', err);
                toast.error('Failed to load product details. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProductDetail();
    }, [findByIdUseCase, id]);

    return {
        productDetail,
        isLoading
    };
};
