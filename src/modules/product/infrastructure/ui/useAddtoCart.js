import {useContext} from 'react';
import {CartContext, UseCasesContext} from '../../../../App.jsx';

export const useAddToCart = () => {

    const {addToCartUseCase} = useContext(UseCasesContext);
    const {updateCartCount} = useContext(CartContext);
    return {
        addToCart: async (data) => {
            console.log('addToCartUseCase:', data);
            const cartCount = await addToCartUseCase.execute(data);
            updateCartCount(cartCount);
        }
    };
};
