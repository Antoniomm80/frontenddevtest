import {useContext} from 'react';
import {CartContext, UseCasesContext} from '../../../../App.jsx';
import {CartItem} from "../../../cart/domain/cartItem.js";

export const useAddToCart = () => {

    const {addToCartUseCase} = useContext(UseCasesContext);
    const {updateCartCount} = useContext(CartContext);
    return {
        addToCart: async (command) => {
            const cartCount = await addToCartUseCase.execute(new CartItem(command.id, command.colorCode, command.storageCode));
            updateCartCount(cartCount);
        }
    };
};
