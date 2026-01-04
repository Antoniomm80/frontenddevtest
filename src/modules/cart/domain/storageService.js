export class StorageService {
    async getCartNumItems() {
        throw new Error('No implementado');
    }

    async saveCartNumItems(numItems) {
        if (!numItems) {
            throw new Error('Cannot be null');
        }
        throw new Error('No implementado');
    }
}
