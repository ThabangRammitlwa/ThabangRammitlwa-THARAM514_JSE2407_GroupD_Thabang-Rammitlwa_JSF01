function mainStore() {
    return {
        init() {
            this.fetchProducts();
            this.initializeCart();
        },
        async fetchProducts() {
            try {
                const [productResponse, categoriesResponse] = await Promise.all([
                    fetch('https://fakestoreapi.com/products'),
                    fetch('https://fakestoreapi.com/products/categories')
                ]);
                Alpine.store('products', await productResponse.json())
                Alpine.store('categories', await categoriesResponse.json())
            } catch (error) {
                console.log('Error fetching data:',error);
            } finally {
                Alpine.store('loading', false);
            }
        
        },
        initializeCart() {
            Alpine.store('cart', {
                items: [],
                open: false,
                addItem(product) {
                    const existingItem = this.items.find(item => item.id === product.id);
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        this.items.push({ ...product, quantity: 1 });
                    }
                    this.open = true;
                },
                removeItem(productId) {
                    this.items = this.items.filter(item => item.id !== productId)
                },
                get length() {
                    return this.items.reduce((total, item) => total + item.quantity, 0)
                },
                get total() {
                    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
                       
                }
            });
        }
        }
        }
