# Airbnb Data Analysis Project

## Project Overview
This project was designed to process and analyze Airbnb listing data using a functional programming approach in JavaScript. The goal was to implement filtering, statistical calculations, and host ranking without modifying the original dataset, ensuring pure functions and method chaining.

## Tools and Technologies Used
* **JavaScript (ES Modules)**: The main programming language used.
* **Node.js**: Used for executing JavaScript outside the browser.
* **`fs/promises` (Node.js)**: For reading and writing CSV files asynchronously.
* **`d3-dsv`**: A library used for parsing CSV data efficiently.
* **ESLint + Prettier**: Ensured code quality and consistency.
* **JSDoc**: Used for documentation and generating API documentation.
* **GitHub**: Version control and project repository.

## Development Process
1. **Initial Planning**:
   * Defined the core functionalities: Filtering, statistical analysis, and exporting results.
   * Chose a functional programming approach to maintain purity in functions.
2. **Implementation**:
   * **Data Handling (`AirBnBDataHandler.js`)**:
      * Implemented CSV parsing and data loading.
      * Applied `.filter()`, `.reduce()`, and `.map()` for functional programming.
      * Used pure functions to prevent state mutation.
   * **Command-Line Interface (`cli.js`)**:
      * Used `readline` to interact with users.
      * Allowed users to input filtering criteria dynamically.
      * Provided statistical insights and ranking.
3. **Debugging and Testing**:
   * Used `console.log()` extensively for debugging.
   * Ensured correctness using sample CSV data.
   * Verified that functions returned expected values without modifying the original dataset.

## My Creative Addition
**Introduction to **`computePriceStatistics()` 
The `computePriceStatistics()` function provides **detailed insights into the pricing trends** of Airbnb listings. Instead of just showing an **average price**, this function calculates multiple key price metrics to give a **more complete picture** of the dataset. 
**Key Statistics Computed:** 
* **Median Price** – The middle value when prices are sorted, offering a better central tendency than the mean. 
* **Mean (Average) Price** – The total sum of prices divided by the number of listings. 
* **Mode Price** – The most frequently occurring price, helping identify the most common price point. 
* **Minimum Price** – The lowest price in the dataset, showing the cheapest listing available. 
* **Maximum Price** – The highest price in the dataset, useful for spotting luxury or extreme outliers. 
* **Price Standard Deviation** – Measures how much prices vary from the mean; higher values indicate more pricing inconsistency. 

By computing these statistics, **users can better understand pricing distribution, detect outliers, and make informed decisions about renting or listing a property**. This feature enhances the project's data analysis capabilities and ensures pricing insights are more meaningful than a simple average." the section will be my special creative addition

## Use of Generative AI
Generative AI (ChatGPT) was used to:
* **Refine JavaScript syntax**: Ensured efficient use of functional programming concepts.
* **Generate test cases**: Suggested edge cases to test filtering logic.
* **Debug issues**: Helped resolve unexpected behavior in asynchronous operations.
* **Improve readability**: Suggested refactors for better function composition.

**Prompts Used**:
1. *"How can I filter an array of objects in JavaScript using a functional approach?"*
   * **GPT's Response:** *Use the `.filter()` method, which creates a new array containing only the elements that match the filtering condition. Example: `array.filter(item => item.price > 100)`.*
2. *"How do I ensure my function does not modify the original array?"*
   * **GPT's Response:** *Use methods like `.map()`, `.filter()`, and `.reduce()` which return new arrays rather than modifying the original. Avoid direct mutation with `.push()` or `.splice()`.*
3. *"What is the best way to sort an object by values in JavaScript?"*
   * **GPT's Response:** *Convert the object into an array of key-value pairs using `Object.entries(obj)`, then use `.sort((a, b) => b[1] - a[1])` to sort by value, and convert it back if needed.*
4. *"How can I use `d3-dsv` to parse a CSV file in Node.js?"*
   * **GPT's Response:** *Use `d3.csvParse(data)`, where `data` is the CSV string read from the file. Example: `const listings = d3.csvParse(csvData)`.*
5. *"How do I use `readline/promises` to create a Node.js CLI?"*
   * **GPT's Response:** *Use `import readline from 'node:readline/promises'` to create an interface, then use `rl.question('Enter value: ')` to take user input asynchronously.*
6. *"Help me add the JSDoc in the code."*
   * **GPT's Response:** *Added JSDoc comments for all functions with parameter descriptions, return types, and examples.*
7. *"What's the most efficient way to calculate statistics from a large dataset?"*
   * **GPT's Response:** *Use `.reduce()` to calculate multiple statistics in a single pass rather than multiple iterations. Example: `listings.reduce((stats, item) => { stats.sum += item.price; stats.count++; return stats; }, { sum: 0, count: 0 })`.*
8. *"How can I chain methods in JavaScript effectively?"*
   * **GPT's Response:** *Return `this` from each method to enable chaining. Example: `filter() { this.listings = this.listings.filter(...); return this; }`.*
9. *"How to optimize memory usage when processing large CSV files?"*
    * **GPT's Response:** *Process data in chunks using streams rather than loading the entire file into memory at once. Parse only necessary fields and use efficient data structures.*

## What Was Learned
* **Functional programming improves maintainability**: Using `.map()`, `.reduce()`, and `.filter()` makes code more predictable and reusable.
* **Using `d3-dsv` for CSV parsing**: It provides a lightweight alternative to `csv-parse/sync`.
* **Importance of debugging with small datasets**: Testing functions on a small dataset helped validate behavior before scaling.
* **Generative AI accelerates development**: It provided syntax corrections, best practices, and debugging insights but required manual verification for correctness.
* **Method chaining enhances readability**: Returning `this` from methods allowed for clean, pipeline-style operations.
* **Proper error handling is essential**: Especially when dealing with external data sources and asynchronous operations.

## Conclusion
The project successfully met the requirements while maintaining best practices in functional programming. The use of JavaScript ES modules, pure functions, and method chaining resulted in a clean, reusable, and scalable codebase.
