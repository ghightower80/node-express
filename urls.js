const fs = require('fs');
const http = require('http');
const https = require('https');
const { URL } = require('url');

// perform a GET request and save the response to a file
function fetchAndSave(url) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const protocol = parsedUrl.protocol === 'https:' ? https : http;

        protocol.get(url, (response) => {
            let data = '';

            // Append data chunks to the response
            response.on('data', (chunk) => {
                data += chunk;
            });

            // Save the response to a file
            response.on('end', () => {
                const filename = parsedUrl.hostname.replace(/\./g, '_');
                fs.writeFile(`${filename}.html`, data, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(`Saved HTML from ${url} to ${filename}.html`);
                    }
                });
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// Read URLs from the specified file and process
function processUrls(filename) {
    fs.readFile(filename, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        //filter empty lines
        const urls = data.split('\n').filter(Boolean);
        for (const url of urls) {
            try {
                const message = await fetchAndSave(url);
                console.log(message);
            } catch (error) {
                console.error(`Error fetching ${url}:`, error);
            }
        }
    });
}

// Check for filename argument
const filename = process.argv[2];
if (!filename) {
    console.error('Usage: node urls.js FILENAME');
} else {
    processUrls(filename);
}