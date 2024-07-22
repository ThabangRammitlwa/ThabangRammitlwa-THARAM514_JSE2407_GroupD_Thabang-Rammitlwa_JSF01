function headerComponent() {
    return {
        mobileMenuOpen: false,
        searchQuery: '',
        toogleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
        search() {
            console.log('Searching for :', this.searchQuery);
        }
    }
}