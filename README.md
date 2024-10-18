# E-commerce Product Listing and Filtering

This is a **Next.js** project with e-commerce functionality for **product listing, filtering**, and **detailed views**. The application integrates with an API to dynamically load products and categories, with features like **Context API** for state management and **server-side** rendering to enhance performance.

## Features
**1. Product Listing**
* Products are fetched from an API and displayed in a responsive grid layout.
* Users can filter products by name, category, and price range.

**2. Dynamic Filters**
* Search by name: Users can search for products by their name.
* Category filter: Available categories are fetched from the API and displayed as dynamic filters.
* Price filter: Users can adjust a price range slider to filter products within that range.

**3. Product Details**
* Each product has a dedicated details page showing its image, description, price, and category.

**4. Category Navigation**
* Users can navigate through available categories via a dynamic menu, which reflects the categories currently available in the system.

**5. Incremental Revalidation and Server-Side Rendering**
* The project uses incremental revalidation every 60 seconds to ensure that product and category data are up to date without frequent rebuilds.
* Server-side rendered pages ensure that data is always fresh for each request.

## Technologies Used
* Next.js: Main framework for server-side rendering and static page generation.
* React: Library for building user interfaces.
* Context API: Used for global state management of filters and search functionality.
* TypeScript: Provides static typing for improved code reliability and maintainability.
* Fetch API: Used for making requests to external APIs to fetch data.
* Tailwind CSS: Utility-first CSS framework for fast and responsive design.
* Directory Structure

## Directory Structure

```

├── components/
│   ├── CategoryMenu.tsx        # Dynamic category menu
│   ├── SearchBar.tsx           # Search bar component
│   ├── CategoryFilter.tsx      # Category filter component
│   ├── PriceFilter.tsx         # Price filter component
│   ├── ProductSlider.tsx       # Related product slider
│   └── Footer.tsx              # Website footer
├── context/
│   └── FilterContext.tsx       # State management of filters using Context API
├── pages/
│   ├── index.tsx               # Main product listing page
│   ├── product/[id].tsx        # Product details page
│   └── _app.tsx                # Global project configuration component
├── api/
│   └── products.ts             # Functions to fetch products, categories, and product details

```

## Installation and Running the Project

### Prerequisites
* Node.js
* Yarn or npm

### Getting Started

First, clone the repository and install the dependencies:
```

git clone git@github.com:fzabra/store-next-fakeapi.git

```
cd repository store-next-fakeapi
```

npm install
# or
yarn install

```
And then Start the development server
```

yarn dev
# or 
npm run dev

```
Open your browser and visit
```

http://localhost:3000

```

## APIs Used
**1. Products**
Endpoint: `https://fakestoreapi.com/products`

Returns all available products.

**2. Categories**
Endpoint: `https://fakestoreapi.com/products/categories`

Returns a list of product categories.

**3. Product by ID**
Endpoint: `https://fakestoreapi.com/products/{id}`

Returns detailed information about a specific product.
