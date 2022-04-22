// Importing Modules.
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request-promise');

// Application setup.
const app = express();
const PORT = process.env.PORT || 3000;

// Use JSON data format
app.use(express.json());

// API Key
const apiKey = 'fe1d02ffbe80a1f39304839f4ca54374';

// Base URL
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const generateScrapperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// Home Route.
app.get('/', (req, res) => { res.send(`Welcome to the Amazon Products API ...`) });

// Getting Product Details
app.get('/products/:productId', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error);
    }
});

// Getting Product Reviews
app.get('/products/:productId/reviews', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error);
    }
});

// Getting Product Offers
app.get('/products/:productId/offers', async(req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error);
    }
});

// Getting Search Products
app.get('/search/:searchQuery', async(req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScrapperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error);
    }
});

// Server Initialization.
app.listen(PORT, () => { console.log(`Server Application Running at http://localhost:${PORT}`); });