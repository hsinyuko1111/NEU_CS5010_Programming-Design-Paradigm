// ❌ Bad Example: Using a Class That Introduces Impurity
class CounterExample {
  constructor(listings) {
    this.listings = listings; // Stores mutable state
  }

  // ❌ Impure: Modifies internal state instead of returning a new value
  filterListings(minPrice) {
    this.listings = this.listings.filter(
      (listing) => listing.price >= minPrice
    ); // Changes internal data
  }

  // ❌ Impure: Mutates original listings array
  removeLowRated(minRating) {
    for (let i = this.listings.length - 1; i >= 0; i--) {
      if (this.listings[i].review_score < minRating) {
        this.listings.splice(i, 1); // Directly mutates array
      }
    }
  }
}

// Example Usage
const sampleListings = [
  { id: 1, price: 200, review_score: 4.5 },
  { id: 2, price: 300, review_score: 4.8 },
  { id: 3, price: 100, review_score: 3.9 },
];

const airbnb = new CounterExample(sampleListings);

airbnb.filterListings(150); // Modifies internal listings
console.log(airbnb.listings); // Listings are changed

airbnb.removeLowRated(4.0); // Further modifies listings
console.log(airbnb.listings); // Data keeps changing unpredictably
