export class Product {
    constructor({
                    id,
                    brand,
                    model,
                    price,
                    imgUrl,
                    options = {}
                }) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.imgUrl = imgUrl;
        this.options = options;
    }
}
