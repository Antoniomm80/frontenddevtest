import {useEffect, useState} from 'react';

export const useFindById = (findByIdUseCase, id) => {
    const [productDetail, setProductDetail] = useState(null);

    const fetchProductDetail = async () => {
        try {
            const result = await findByIdUseCase.execute(id);
            setProductDetail(result);
        } catch (err) {
            console.error('Error in findById:', err);
        }
    };

    useEffect(() => {
        fetchProductDetail();
    }, []);

    return {
        productDetail: productDetail
    };
};
