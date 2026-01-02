import {beforeEach, describe, expect, it, vi} from 'vitest';
import {Product} from '../../src/modules/product/domain/product.js';
import {FindById} from "../../src/modules/product/application/findById.js";

describe('FindById Use Case', () => {
    let findById;
    let mockProductService;

    beforeEach(() => {
        mockProductService = {
            findById: vi.fn()
        };
        findById = new FindById(mockProductService);
    });

    it('Debe invocar el método find by id del servicio', async () => {
        const detail =
            new Product({
                id: "cGjFJlmqNPIwU59AOcY8H",
                brand: "Acer",
                model: "Liquid Z6 Plus",
                price: "250",
                imgUrl: "http://itx-frontend-test.onrender.com/images/cGjFJlmqNPIwU59AOcY8H.jpg",
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
                internalMemory: [
                    "32 GB"
                ],
                ram: "3 GB RAM",
                primaryCamera: [
                    "13 MP",
                    "autofocus",
                    "LED flash"
                ],
                secondaryCmera: "5 MP",
                speaker: "Yes",
                audioJack: "Yes",
                wlan: [
                    "Wi-Fi 802.11 b/g/n",
                    "Wi-Fi Direct",
                    "hotspot"
                ],
                bluetooth: [
                    "4.0",
                    "A2DP"
                ],
                gps: "Yes with A-GPS",
                nfc: "",
                radio: "FM radio",
                usb: "microUSB 2.0",
                sensors: [
                    "Fingerprint (front-mounted)",
                    "accelerometer",
                    "proximity"
                ],
                battery: "Removable Li-Po 4080 mAh battery",
                colors: [
                    "Black",
                    "White"
                ],
                options: {
                    colors: [
                        {
                            code: 1000,
                            name: "Black"
                        },
                        {
                            code: 1001,
                            name: "White"
                        }
                    ],
                    storages: [
                        {
                            code: 2000,
                            name: "32 GB"
                        }
                    ]
                }
            });

        mockProductService.findById.mockResolvedValueOnce(detail);

        const result = await findById.execute("cGjFJlmqNPIwU59AOcY8H");

        expect(mockProductService.findById).toHaveBeenCalledTimes(1);
        expect(result).toEqual(detail);
    });

});
