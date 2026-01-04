import {useContext, useEffect, useState} from 'react';
import {UseCasesContext} from '../../../../App.jsx';

export const useFindById = (id) => {
    const [productDetail, setProductDetail] = useState(null);
    const {findByIdUseCase} = useContext(UseCasesContext);
    
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const result = await findByIdUseCase.execute(id);
                setProductDetail(result);
            } catch (err) {
                console.error('Error in findById:', err);
            }
        };
        fetchProductDetail();
    }, [findByIdUseCase, id]);

    return {
        productDetail: productDetail
    };
};
