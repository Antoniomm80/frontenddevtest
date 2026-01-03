export class Product {
    constructor({
                    id,
                    brand,
                    model,
                    price,
                    imgUrl,
                    cpu,
                    ram,
                    os,
                    displayResolution,
                    battery,
                    primaryCamera,
                    secondaryCmera,
                    dimentions,
                    weight,
                    options = {}
                }) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.imgUrl = imgUrl;
        this.cpu = cpu;
        this.ram = ram;
        this.os = os;
        this.displayResolution = displayResolution;
        this.battery = battery;
        this.primaryCamera = primaryCamera;
        this.secondaryCmera = secondaryCmera;
        this.dimentions = dimentions;
        this.weight = weight;
        this.options = options;
    }

    get fullName() {
        return `${this.brand} ${this.model}`;
    }

    get colorOptions() {
        return this.options.colors || [];
    }

    get storageOptions() {
        return this.options.storages || [];
    }
}
