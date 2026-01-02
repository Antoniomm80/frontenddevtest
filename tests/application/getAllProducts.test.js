import {beforeEach, describe, expect, it, vi} from 'vitest';
import {GetAllProducts} from '../../src/modules/product/application/getAllProducts.js';
import {Product} from '../../src/modules/product/domain/product.js';

describe('GetAllProducts Use Case', () => {
    let getAllProducts;
    let mockProductService;

    beforeEach(() => {
        mockProductService = {
            getAll: vi.fn()
        };
        getAllProducts = new GetAllProducts(mockProductService);
    });

    it('Debe invocar el método getAll del servicio', async () => {
        const mockProducts = [
            new Product({
                id: "8hKbH2UHPM_944nRHYN1n",
                brand: "Acer",
                model: "Liquid Z6",
                price: "120",
                imgUrl: "https://itx-frontend-test.onrender.com/images/8hKbH2UHPM_944nRHYN1n.jpg"
            }),
            new Product({
                id: "xyPoqGJxYR4Nn3yVGQcfI",
                brand: "Acer",
                model: "Iconia Tab 10 A3-A40",
                price: "230",
                imgUrl: "https://itx-frontend-test.onrender.com/images/xyPoqGJxYR4Nn3yVGQcfI.jpg"
            })
        ];

        mockProductService.getAll.mockResolvedValueOnce(mockProducts);

        const result = await getAllProducts.execute();

        expect(mockProductService.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockProducts);
        expect(result).toHaveLength(2);
    });
    
});
