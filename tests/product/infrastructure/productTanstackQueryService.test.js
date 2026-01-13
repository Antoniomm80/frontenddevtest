import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {QueryClient} from '@tanstack/react-query';
import {ProductTanstackQueryService} from "../../../src/modules/product/infrastructure/productTanstackQueryService.js";
import {Product} from "../../../src/modules/product/domain/product.js";

describe('TanStack Query Product Service', () => {
    let productService;
    let queryClient;
    let mockFetch;
    const oneHour = 3600000;
    const twoHours = 7200000;

    beforeEach(() => {
        mockFetch = vi.fn();
        vi.stubGlobal('fetch', mockFetch);
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                    staleTime: oneHour,
                    gcTime: oneHour,
                },
            },
        });

        productService = new ProductTanstackQueryService('https://itx-frontend-test.onrender.com', queryClient);
    });

    afterEach(() => {
        queryClient.clear();
        vi.unstubAllGlobals();
        vi.clearAllMocks();
    });

    describe('getAll', () => {
        const mockProducts = [
            {
                id: "8hKbH2UHPM_944nRHYN1n",
                brand: "Acer",
                model: "Liquid Z6",
                price: "120",
                imgUrl: "https://itx-frontend-test.onrender.com/images/8hKbH2UHPM_944nRHYN1n.jpg"
            },
            {
                id: "xyPoqGJxYR4Nn3yVGQcfI",
                brand: "Acer",
                model: "Iconia Tab 10 A3-A40",
                price: "230",
                imgUrl: "https://itx-frontend-test.onrender.com/images/xyPoqGJxYR4Nn3yVGQcfI.jpg"
            }
        ];

        it('Debe invocar al upstream server si la cache ha expirado', async () => {
            vi.useFakeTimers();
            const now = Date.now();
            vi.setSystemTime(now);

            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => mockProducts
            });

            await productService.getAll();
            expect(mockFetch).toHaveBeenCalledTimes(1);

            vi.setSystemTime(now + twoHours);

            await productService.getAll();
            expect(mockFetch).toHaveBeenCalledTimes(2);
            expect(mockFetch).toHaveBeenCalledWith('https://itx-frontend-test.onrender.com/api/product');

            vi.useRealTimers();
        });

        it('Debe devolver el resultado de caché si no ha expirado', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => mockProducts
            });

            await productService.getAll();
            expect(mockFetch).toHaveBeenCalledTimes(1);

            const result = await productService.getAll();
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(result).toHaveLength(2);
            expect(result[0]).toBeInstanceOf(Product);
            expect(result[0].model).toBe('Liquid Z6');
            expect(result[1]).toBeInstanceOf(Product);
            expect(result[1].model).toBe('Iconia Tab 10 A3-A40');
        });

    });

    describe('findById', () => {
        const mockProduct = {
            id: "cGjFJlmqNPIwU59AOcY8H",
            brand: "Acer",
            model: "Liquid Z6 Plus",
            price: "250",
            imgUrl: "https://itx-frontend-test.onrender.com/images/cGjFJlmqNPIwU59AOcY8H.jpg",
            cpu: "Octa-core 1.3 GHz Cortex-A53",
            ram: "3 GB RAM",
            os: "Android 6.0 (Marshmallow)",
            displayResolution: "1080 x 1920 pixels",
            battery: "Removable Li-Po 4080 mAh battery",
            primaryCamera: ["13 MP", "autofocus", "LED flash"],
            secondaryCmera: "5 MP",
            dimentions: "153.8 x 75.6 x 8.5 mm",
            weight: "169",
            options: {
                colors: [
                    {code: 1000, name: "Black"},
                    {code: 1001, name: "White"}
                ],
                storages: [
                    {code: 2000, name: "32 GB"}
                ]
            }
        };

        it('Debe invocar al upstream server si la cache ha expirado', async () => {
            vi.useFakeTimers();
            const now = Date.now();
            vi.setSystemTime(now);

            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => mockProduct
            });

            await productService.findById("cGjFJlmqNPIwU59AOcY8H");
            expect(mockFetch).toHaveBeenCalledTimes(1);

            vi.setSystemTime(now + twoHours);

            await productService.findById("cGjFJlmqNPIwU59AOcY8H");
            expect(mockFetch).toHaveBeenCalledTimes(2);
            expect(mockFetch).toHaveBeenCalledWith('https://itx-frontend-test.onrender.com/api/product/cGjFJlmqNPIwU59AOcY8H');

            vi.useRealTimers();
        });

        it('Debe devolver el resultado de caché si no ha expirado', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => mockProduct
            });

            await productService.findById("cGjFJlmqNPIwU59AOcY8H");
            expect(mockFetch).toHaveBeenCalledTimes(1);

            const result = await productService.findById("cGjFJlmqNPIwU59AOcY8H");
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(result).toBeInstanceOf(Product);
            expect(result.id).toBe('cGjFJlmqNPIwU59AOcY8H');
            expect(result.model).toBe('Liquid Z6 Plus');
            expect(result.price).toBe('250');
        });
    });
});
