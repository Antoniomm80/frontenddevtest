import {useContext} from 'react';
import {UseCasesContext} from '../../../../App.jsx';

export const useAddToCart = () => {

    const {addToCartUseCase} = useContext(UseCasesContext);
    return {
        addToCart: (data) => addToCartUseCase.execute(data)
    };
};
