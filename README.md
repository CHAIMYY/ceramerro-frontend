# Ceramerro Frontend

Frontend for Ceramerro, an elegant platform connecting ceramic artisans with customers worldwide.

## 📝 Project Overview

Ceramerro is a specialized e-commerce platform designed for ceramic artisans to showcase and sell their handcrafted creations. This repository contains the frontend application built with Next.js, Tailwind CSS, and Axios, providing a seamless and interactive user experience.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access (Admin, Artisan, Customer)
  - Secure session management
- **Artisan Dashboard**
  - Profile creation and management
  - Sales and analytics dashboard
  - Order management interface
- **Product Showcase**
  - Beautifully designed product listings
  - Filtering and search capabilities
  - Limited editions and collection highlights
  - Ratings and reviews system
- **E-commerce Functionality**
  - Shopping cart and wishlist
  - Secure checkout with Stripe
- **Content Management**
  - Blog section with articles and interviews
  - Product care guides and information

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Context API / Zustand
- **API Handling**: Axios
- **Authentication**: JWT (via backend API)

## 🔧 Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- API backend running

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/ceramerro/frontend.git
   cd ceramerro-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your API URL and keys
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🦝 API Integration

All API requests are managed using Axios. Example configuration:

```js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
```

## 💪 Development Guidelines

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use Tailwind utility-first approach for styling
- Write reusable components with best practices
- Document all API calls with JSDoc comments

## 📈 Deployment

### Vercel Deployment

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy the project:
   ```bash
   vercel
   ```

### Docker Deployment

1. Build the Docker image:

   ```bash
   docker build -t ceramerro-frontend .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 -d ceramerro-frontend
   ```

## 📚 Additional Documentation

- [Component Structure](docs/components.md)
- [API Integration](docs/api.md)
- [Styling Guide](docs/styling.md)

## 🌟 Contributors

- [HOUAS CHAIMAA](https://github.com/CHAIMYY)

## 🤝 Support

Made with ❤️ .
