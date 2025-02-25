import { readFile, writeFile } from "node:fs/promises";
import * as d3 from "d3";

export const AirBnBDataHandler = {
  listings: [],

  /**
   * Load CSV file and parse into JSON
   * @param {string} filePath - Path to the CSV file
   * @returns {Promise<AirBnBDataHandler>} - Returns itself for chaining
   */
  async load(filePath) {
    const data = await readFile(filePath, "utf-8");
    this.listings = d3.csvParse(data).map((listing) => ({
      ...listing, // keep all original fields
      price: parseFloat(listing.price.replace(/[$,]/g, "")) || 0,
      bedrooms: parseInt(listing.bedrooms) || 0,
      review_score: parseFloat(listing.review_scores_rating) || 0,
      host_id: listing.host_id,
    }));
    return this;
  },

  /**
   * Filter listings based on price, number of rooms, or review score
   * @param {Object} filters - Object containing filter criteria
   * @param {number} [filters.minPrice]
   * @param {number} [filters.maxPrice]
   * @param {number} [filters.minRooms]
   * @param {number} [filters.maxRooms]
   * @param {number} [filters.minScore]
   * @param {number} [filters.maxScore]
   * @returns {AirBnBDataHandler} - Returns itself for chaining
   */
  filter(filters) {
    this.listings = this.listings.filter(
      (listing) =>
        (!filters.minPrice || listing.price >= filters.minPrice) &&
        (!filters.maxPrice || listing.price <= filters.maxPrice) &&
        (!filters.minRooms || listing.bedrooms >= filters.minRooms) &&
        (!filters.maxRooms || listing.bedrooms <= filters.maxRooms) &&
        (!filters.minScore || listing.review_score >= filters.minScore) &&
        (!filters.maxScore || listing.review_score <= filters.maxScore)
    );
    return this;
  },

  /**
   * Compute statistics on filtered listings
   * @returns {Object} Statistics object
   */
  computeStats() {
    const count = this.listings.length;
    const avgPricePerRoom =
      this.listings.reduce(
        (acc, listing) => acc + listing.price / (listing.bedrooms || 1),
        0
      ) / count || 0;
    return { count, avgPricePerRoom };
  },

  /**
   * Compute host listing rankings
   * @returns {Array} Sorted array of hosts by number of listings
   */
  computeHostRankings() {
    const hostCounts = this.listings.reduce((acc, { host_id }) => {
      acc[host_id] = (acc[host_id] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(hostCounts).sort((a, b) => b[1] - a[1]);
  },

  /**
   * Export results to a file
   * @param {string} filePath - Output file path
   * @returns {Promise<void>}
   */
  async exportResults(filePath) {
    const data = JSON.stringify(
      {
        filteredListings: this.listings,
        stats: this.computeStats(),
        hostRankings: this.computeHostRankings(),
      },
      null, //include all fields
      2 //indent with 2
    );
    await writeFile(filePath, data);
  },
};
