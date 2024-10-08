const Trail = require("../models/trail");
const mongoose = require("mongoose");
const axios = require('axios')

module.exports.list = async (req, res) => {
    // Destructure and set default values for query parameters
    const {
      room_qty = '1',
      guest_qty = '1',
      bbox = '14.291283%2C14.948423%2C120.755688%2C121.136864',
      children_age = '11%2C5',
      price_filter_currencycode = 'USD',
      children_qty = '2',
      order_by = 'popularity',
      offset = '0',
      arrival_date = '2024-10-04',   // Set default arrival date
      departure_date = '2024-10-06'   // Set default departure date
    } = req.query;
  
    // Configure the API request options
    const options = {
      method: 'GET',
      url: `https://${process.env.RAPIDAPI_HOST}/properties/list-by-map`,
      params: {
        room_qty,
        guest_qty,
        bbox,
        children_age,
        price_filter_currencycode,
        children_qty,
        order_by,
        offset,
        arrival_date,
        departure_date
        // Add more query parameters as needed
      },
      headers: {
        'X-Rapidapi-Key': process.env.RAPIDAPI_KEY,
        'X-Rapidapi-Host': process.env.RAPIDAPI_HOST
      }
    };
  
    try {
      // Make the request to the API
      const response = await axios.request(options);
      res.render('list', { data: response.data });  // Send the response data back to the client
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching data from Booking API' });
    }
  };
  