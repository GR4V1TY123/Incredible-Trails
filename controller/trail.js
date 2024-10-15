const Trail = require("../models/trail");
const mongoose = require("mongoose");
const axios = require('axios');

module.exports.list = async (req, res) => {
    // Destructure and set default values for query parameters
    const {
        room_qty = '1',
        guest_qty = '1',
        price_filter_currencycode = 'USD',
        query = 'mumbai',  // Default query for the destination search
        checkin = '2024-10-20',  // Default check-in date
        checkout = '2024-10-22'  // Default check-out date
    } = req.query;

    try {
        // Step 1: Use /api/v1/hotels/searchDestinationOrHotel to get entityId based on query
        const destinationOptions = {
            method: 'GET',
            url: `https://${process.env.RAPIDAPI_HOST}/api/v1/hotels/searchDestinationOrHotel`,
            params: {
                query: query,  // e.g., "New York", "Mumbai"
                market: 'en-US'
            },
            headers: {
                'X-Rapidapi-Key': process.env.RAPIDAPI_KEY,
                'X-Rapidapi-Host': process.env.RAPIDAPI_HOST
            }
        };

        // Make the request to get entityId
        const destinationResponse = await axios.request(destinationOptions);
        const destinationData = destinationResponse.data.data;

        // Assume the first result in the list is the desired destination
        const entityId = destinationData.length > 0 ? destinationData[0].entityId : '27537542'; // Fallback to a default value if not found
        console.log(entityId)

        // Step 2: Use the retrieved entityId to get hotels
        const hotelsOptions = {
            method: 'GET',
            url: `https://${process.env.RAPIDAPI_HOST}/api/v1/hotels/searchHotels`,
            params: {
                adults: guest_qty,
                rooms: room_qty,
                limit: 30,
                sorting: '-relevance',
                currency: price_filter_currencycode,
                market: 'en-US',
                countryCode: 'US',
                entityId: entityId, // Use the retrieved or default entityId
                checkin: checkin,   // Use the valid check-in date
                checkout: checkout  // Use the valid check-out date
            },
            headers: {
                'X-Rapidapi-Key': process.env.RAPIDAPI_KEY,
                'X-Rapidapi-Host': process.env.RAPIDAPI_HOST
            }
        };

        // Make the request to the hotel search API
        const hotelsResponse = await axios.request(hotelsOptions);

        // Send the response data to the client
        res.render('list', { data: hotelsResponse.data });

    } catch (error) {
        console.error("API Request Error:", error.message);
        res.status(500).json({ error: 'Error fetching data from Hotels API' });
    }
};
