import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {ProductFetchService} from '../../../src/modules/product/infrastructure/productFetchService.js';
import {Product} from '../../../src/modules/product/domain/product.js';

describe('Product Service', () => {
    let productService;
    let mockFetch;

    beforeEach(() => {
        mockFetch = vi.fn();
        vi.stubGlobal('fetch', mockFetch);
        productService = new ProductFetchService('https://itx-frontend-test.onrender.com');
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    describe('getAll', () => {
        it('Debe obtener objetos de dominio a partir de su representación JSON', async () => {
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

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockProducts
            });

            const result = await productService.getAll();

            expect(mockFetch).toHaveBeenCalledWith('https://itx-frontend-test.onrender.com/api/product');
            expect(result).toHaveLength(2);
            expect(result[0]).toBeInstanceOf(Product);
            expect(result[0].model).toBe('Liquid Z6');
            expect(result[1]).toBeInstanceOf(Product);
            expect(result[1].model).toBe('Iconia Tab 10 A3-A40');
        });

        it('Debe devolver una colección vacia si no se obtienen resultados del upstream server', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => []
            });

            const result = await productService.getAll();

            expect(result).toEqual([]);
            expect(result).toHaveLength(0);
        });

    });

    describe('findById', () => {
        it('Debe obtener un objeto completo a partir de su id', async () => {
            const mockProduct = {
                id: "cGjFJlmqNPIwU59AOcY8H",
                brand: "Acer",
                model: "Liquid Z6 Plus",
                price: "250",
                imgUrl: "https://itx-frontend-test.onrender.com/images/cGjFJlmqNPIwU59AOcY8H.jpg",
                networkTechnology: "GSM / HSPA / LTE",
                networkSpeed: "HSPA 42.2/5.76 Mbps  LTE Cat4 150/50 Mbps",
                gprs: "Yes",
                edge: "Yes",
                announced: "2016  August",
                status: "Available. Released 2016  December",
                dimentions: "153.8 x 75.6 x 8.5 mm (6.06 x 2.98 x 0.33 in)",
                weight: "169",
                sim: [
                    "Single SIM (Micro-SIM) or Dual SIM (Micro-SIM",
                    "dual stand-by)"
                ],
                displayType: "IPS LCD capacitive touchscreen  16M colors",
                displayResolution: "5.5 inches (~71.7% screen-to-body ratio)",
                displaySize: "1080 x 1920 pixels (~401 ppi pixel density)",
                os: "Android 6.0 (Marshmallow)",
                cpu: "Octa-core 1.3 GHz Cortex-A53",
                chipset: "Mediatek MT6753",
                gpu: "Mali-T720MP3",
                externalMemory: "microSD  up to 256 GB (uses SIM 2 slot)",
                internalMemory: ["32 GB"],
                ram: "3 GB RAM",
                primaryCamera: ["13 MP", "autofocus", "LED flash"],
                secondaryCmera: "5 MP",
                speaker: "Yes",
                audioJack: "Yes",
                wlan: ["Wi-Fi 802.11 b/g/n", "Wi-Fi Direct", "hotspot"],
                bluetooth: ["4.0", "A2DP"],
                gps: "Yes with A-GPS",
                nfc: "",
                radio: "FM radio",
                usb: "microUSB 2.0",
                sensors: ["Fingerprint (front-mounted)", "accelerometer", "proximity"],
                battery: "Removable Li-Po 4080 mAh battery",
                colors: ["Black", "White"],
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

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockProduct
            });

            const result = await productService.findById("cGjFJlmqNPIwU59AOcY8H");

            expect(mockFetch).toHaveBeenCalledWith('https://itx-frontend-test.onrender.com/api/product/cGjFJlmqNPIwU59AOcY8H');
            expect(result).toBeDefined();
            expect(result).toBeInstanceOf(Product);
            expect(result.id).toBe('cGjFJlmqNPIwU59AOcY8H');
            expect(result.model).toBe('Liquid Z6 Plus');
            expect(result.price).toBe('250');
            expect(result.brand).toBe('Acer');

        });

        it('Debe devolver undefined si no se le pasa id', async () => {
            const result = await productService.findById();

            expect(result).toBeUndefined();
            expect(mockFetch).not.toHaveBeenCalled();
        });

    });
});
