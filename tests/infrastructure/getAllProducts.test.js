import {beforeEach, describe, expect, it} from 'vitest';
import {ProductService} from '../../src/modules/product/domain/productService.js';

class InMemoryMockProductService extends ProductService {
    constructor(mockProducts = []) {
        super();
        this.mockProducts = mockProducts;
    }

    async getAll() {
        return this.mockProducts;
    }
}

describe('Product Service', () => {
    let mockProductService;

    beforeEach(() => {
        mockProductService = new InMemoryMockProductService();
    });

    describe('getAll', () => {
        it('Debe obtener objetos de dominio a partir de su representación JSON', async () => {
            const mockProducts = JSON.parse("[{\n" +
                "        \"id\": \"8hKbH2UHPM_944nRHYN1n\",\n" +
                "        \"brand\": \"Acer\",\n" +
                "        \"model\": \"Liquid Z6\",\n" +
                "        \"price\": \"120\",\n" +
                "        \"imgUrl\": \"https://itx-frontend-test.onrender.com/images/8hKbH2UHPM_944nRHYN1n.jpg\"\n" +
                "    },\n" +
                "    {\n" +
                "        \"id\": \"xyPoqGJxYR4Nn3yVGQcfI\",\n" +
                "        \"brand\": \"Acer\",\n" +
                "        \"model\": \"Iconia Tab 10 A3-A40\",\n" +
                "        \"price\": \"230\",\n" +
                "        \"imgUrl\": \"https://itx-frontend-test.onrender.com/images/xyPoqGJxYR4Nn3yVGQcfI.jpg\"\n" +
                "    }]");

            mockProductService.mockProducts = mockProducts;

            const result = await mockProductService.getAll();

            expect(result).toEqual(mockProducts);
            expect(result).toHaveLength(2);
            expect(result[0].model).toBe('Liquid Z6');
            expect(result[1].model).toBe('Iconia Tab 10 A3-A40');
        });

        it('Debe devolver una colección vacia si no se obtienen resultados del upstream server', async () => {
            mockProductService.mockProducts = [];

            const result = await mockProductService.getAll();

            expect(result).toEqual([]);
            expect(result).toHaveLength(0);
        });

    });
});
