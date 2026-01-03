import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {BrowserStorageService} from '../../src/modules/product/infrastructure/browserStorageService.js';

describe('Browser Storage Service', () => {
    let storageService;
    let mockLocalStorage;

    beforeEach(() => {
        mockLocalStorage = {
            getItem: vi.fn(),
            setItem: vi.fn(),
        };
        vi.stubGlobal('localStorage', mockLocalStorage);
        storageService = new BrowserStorageService();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    describe('getCartNumItems', () => {
        it('Debe devolver el número de elementos del carrito guardados en localStorage', async () => {
            mockLocalStorage.getItem.mockReturnValue('5');

            const result = await storageService.getCartNumItems();

            expect(mockLocalStorage.getItem).toHaveBeenCalledWith('cartNumItems');
            expect(result).toBe(5);
        });

        it('Debe devolver 0 si no hay elementos guardados en localStorage', async () => {
            mockLocalStorage.getItem.mockReturnValue(null);

            const result = await storageService.getCartNumItems();

            expect(mockLocalStorage.getItem).toHaveBeenCalledWith('cartNumItems');
            expect(result).toBe(0);
        });
        
    });

    describe('saveCartNumItems', () => {
        it('Debe guardar el número de elementos del carrito en localStorage como string', async () => {
            await storageService.saveCartNumItems(10);

            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('cartNumItems', '10');
        });
    });
});
