export class ProductService {
    async getAll() {
        throw new Error('No implementado');
    }

    async findById(id) {
        if (id === undefined) {
            return undefined;
        }
        throw new Error('No implementado');
    }
}
