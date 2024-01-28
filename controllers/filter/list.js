const { ProductProvider } = require('../../providers/product');

class GetAllProductsByFilters {
    constructor(filters) {
        this.filters = filters;
    }
    async execute() {
        try {
            const filterCondition = {};
            // Add category filter
            if (this.filters.category) {
                filterCondition.category = this.filters.category;
            }

            // Add price range filter
            if (this.filters.minPrice !== undefined && this.filters.maxPrice !== undefined) {
                filterCondition.price = {
                    $gte: this.filters.minPrice,
                    $lte: this.filters.maxPrice,
                };
            } else if (this.filters.minPrice !== undefined) {
                filterCondition.price = { $gte: this.filters.minPrice };
            } else if (this.filters.maxPrice !== undefined) {
                filterCondition.price = { $lte: this.filters.maxPrice };
            }

            // Add rating range filter
            if (this.filters.minRating !== undefined && this.filters.maxRating !== undefined) {
                filterCondition.ratings = {
                    $gte: this.filters.minRating,
                    $lte: this.filters.maxRating,
                };
            } else if (this.filters.minRating !== undefined) {
                filterCondition.ratings = { $gte: this.filters.minRating };
            } else if (this.filters.maxRating !== undefined) {
                filterCondition.ratings = { $lte: this.filters.maxRating };
            }

            const productProvider = new ProductProvider();
            const result = await productProvider.list(filterCondition);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

exports.GetAllProductsByFilters = GetAllProductsByFilters;