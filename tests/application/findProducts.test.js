import {beforeEach, describe, expect, it, vi} from 'vitest';
import {FindProducts} from '../../src/modules/product/application/findProducts.js';
import {Product} from '../../src/modules/product/domain/product.js';

describe('Find Products Use Case', () => {
    let findProducts;
    let mockProductService;

    beforeEach(() => {
        mockProductService = {
            getAll: vi.fn()
        };
        findProducts = new FindProducts(mockProductService);
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

        const result = await findProducts.execute();

        expect(mockProductService.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockProducts);
        expect(result).toHaveLength(2);
    });

    it('Si se le pasa un filtro de búsqueda, debe devolver solamente los elementos que cumplen con el criterio de búsqueda', async () => {
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

        const result = await findProducts.execute("Iconia");

        expect(mockProductService.getAll).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(1);
        expect(result[0]).toBeInstanceOf(Product);
        expect(result[0].id).toBe('xyPoqGJxYR4Nn3yVGQcfI');
        expect(result[0].model).toBe('Iconia Tab 10 A3-A40');
        expect(result[0].brand).toBe('Acer');
        expect(result[0].price).toBe('230');
        expect(result[0].imgUrl).toBe('https://itx-frontend-test.onrender.com/images/xyPoqGJxYR4Nn3yVGQcfI.jpg');
    });

});
