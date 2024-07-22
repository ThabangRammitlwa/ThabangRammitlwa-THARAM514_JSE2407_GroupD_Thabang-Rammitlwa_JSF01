function productListComponent() {
    return {
        selectedCategory: '',
        sortOption: '',
        resetFilters() {
            this.selectedCategory = '';
            this.sortOption = '';
        },
        get filteredAndSortedProducts() {
            let filteredProducts = this.selectedCategory
                ? Alpine.store('products').filter(p => p.category === this.selectedCategory)
                : Alpine.store('product');
            
            if (this.sortOption === 'lowest') {
                return filteredProducts.sort((a, b) => a.price - b.price);
            } else if (this.sortOption === 'highest') {
                return filteredProducts.sort((a, b) => b.price - a.price);
            }

            return filteredProducts;
        }
    }
}