import {beforeEach, describe, expect, it, vi} from 'vitest';
import {AddToCart} from "../../src/modules/product/application/addToCart.js";

describe('Add to Cart Use Case', () => {
    let addToCart;
    let mockProductService;
    let mockStorageService;

    beforeEach(() => {
        mockProductService = {
            addToCart: vi.fn()
        };
        mockStorageService = {
            saveCartNumItems: vi.fn()
        };
        addToCart = new AddToCart(mockProductService, mockStorageService);
    });

    it('Debe invocar el método addToCart del servicio de gestión de productos y luego guardarlo mediante el servicio de persistencia', async () => {
        mockProductService.addToCart.mockResolvedValueOnce(3);

        await addToCart.execute({id: "8hKbH2UHPM_944nRHYN1n", colorCode: 1000, storageCode: 2000});

        expect(mockProductService.addToCart).toHaveBeenCalledTimes(1);
        expect(mockProductService.addToCart).toHaveBeenCalledWith({id: "8hKbH2UHPM_944nRHYN1n", colorCode: 1000, storageCode: 2000});
        expect(mockStorageService.saveCartNumItems).toHaveBeenCalledTimes(1);
        expect(mockStorageService.saveCartNumItems).toHaveBeenCalledWith(3);
    });
});
