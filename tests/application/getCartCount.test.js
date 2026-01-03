import {beforeEach, describe, expect, it, vi} from 'vitest';
import {GetCartCount} from "../../src/modules/product/application/getCartCount.js";

describe('Get Cart Count Use Case', () => {
    let getCartCount;
    let mockStorageService;

    beforeEach(() => {

        mockStorageService = {
            getCartNumItems: vi.fn()
        };
        getCartCount = new GetCartCount(mockStorageService);
    });

    it('Debe invocar el método getCartNumItems del servicio de persistencia', async () => {
        mockStorageService.getCartNumItems.mockResolvedValueOnce(5);

        await getCartCount.execute();

        expect(mockStorageService.getCartNumItems).toHaveBeenCalledTimes(1);

    });
});
