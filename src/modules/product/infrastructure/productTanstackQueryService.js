import {ProductFetchService} from './productFetchService.js';

export class ProductTanstackQueryService extends ProductFetchService {
    constructor(baseUrl, queryClient) {
        super(baseUrl);
        this.queryClient = queryClient;
    }

    async getAll() {
        const queryKey = ['products', 'all'];

        return this.queryClient.fetchQuery({
            queryKey,
            queryFn: async () => {
                return await super.getAll();
            },
        });
    }

    async findById(id) {
        if (id === undefined) {
            return undefined;
        }

        const queryKey = ['product', id];

        return this.queryClient.fetchQuery({
            queryKey,
            queryFn: async () => {
                return await super.findById(id);
            },
        });
    }
}
