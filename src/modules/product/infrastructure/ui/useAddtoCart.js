import {useContext} from 'react';
import {CartContext, UseCasesContext} from '../../../../App.jsx';

export const useAddToCart = () => {

    const {addToCartUseCase} = useContext(UseCasesContext);
    const {updateCartCount} = useContext(CartContext);
    return {
        addToCart: async (command) => {
            const cartCount = await addToCartUseCase.execute(command);
            updateCartCount(cartCount);
        }
    };
};
