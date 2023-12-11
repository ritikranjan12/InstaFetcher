/**
 * @file This file contains the main logic for fetching media details from the Instagram Graph API.
 * @author Ritik Ranjan
 * @version 1.0.0
 * @license MIT
 */

const axios = require('axios'); // Promise based HTTP client for the browser and node.js
require('dotenv').config(); // Loads environment variables from a .env file into process.env
const fs = require('fs'); // File system module

const accessToken = process.env.accessToken;   // Access Token for the Instagram Graph API

const dataUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,username,timestamp&access_token=${accessToken}`; // URL to fetch media IDs

/**
 * Saves an array of objects into a single file as JSON.
 * @param {Array} data - The array of objects to be saved.
 * @param {string} filePath - The path of the file to save the data.
 * @returns {Promise<void>} - A promise that resolves when the data is saved.
 */
function saveArrayToFile(data, filePath) { // Function to save data to a file
    console.log("Saving the details in the file");
    return new Promise((resolve, reject) => { // Return a promise
        const jsonData = JSON.stringify(data, null, 2); // Convert data to JSON string
        fs.writeFile(filePath, jsonData, 'utf8', (error) => { // Write data to file
            if (error) {
                reject(error); // Reject promise
            } else {
                resolve(); // Resolve promise
            }
        });
    });
}

/**
 * Fetches media IDs and retrieves their details.
 * @returns {Promise<void>} A Promise that resolves when the media details are fetched.
 */
async function getMediaID(){
    let mediaData = []; // Array to store the medias
    await axios.get(dataUrl) // Fetch medias
        .then(response => {
            const data = response.data;
            const newdata = data.data.slice(0,20);
            mediaData.push(newdata)
        })
        .catch(error => {
            console.log('Error:', error.message);
        });    
    saveArrayToFile(mediaData,'output.json') // Save media details to a file
    console.log("Results saved");
    console.log("Thank You for using the software");
};

/**
 * This is the main function that initiates the data fetching process.
 */
function main () {
    console.log("Waiting for Data to be fetched");
    getMediaID(); // Fetch media IDs and details
}

main() // Call the main function


