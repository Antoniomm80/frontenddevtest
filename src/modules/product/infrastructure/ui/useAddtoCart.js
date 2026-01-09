import {useContext} from 'react';
import {CartContext, UseCasesContext} from '../../../../App.jsx';
import toast from 'react-hot-toast';

export const useAddToCart = () => {

    const {addToCartUseCase} = useContext(UseCasesContext);
    const {updateCartCount} = useContext(CartContext);
    return {
        addToCart: async (command) => {
            try {
                const cartCount = await addToCartUseCase.execute(command);
                updateCartCount(cartCount);
                toast.success('Product added to cart successfully!');
            } catch (error) {
                console.error('Error adding to cart:', error);
                toast.error('Failed to add product to cart. Please try again.');
                throw error;
            }
        }
    };
};
