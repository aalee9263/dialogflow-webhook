// Import express to create the server
const express = require("express");

// Import body-parser to parse incoming request bodies
const bodyParser = require("body-parser");

// Initialize the express application
const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define the port the server will listen on, defaulting to 8080
const PORT = process.env.PORT || 8080;

// Define the webhook endpoint to handle POST requests 
app.post("/webhook", (req, res) => {
    // Extract the tag from the request body
    console.log('Received request from Dialogflow:');
    console.log(JSON.stringify(req.body, null, 2));
    const tag = req.body.fulfillmentInfo.tag;

    // Initialize the response variable
    let response;

    // Check the intent tag and craft a response accordingly
    if (tag === "Default Welcome Intent") {
        response = {
            fulfillment_response: {
                messages: [
                    {
                        text: {
                            text: ["Welcome to our service! How can I assist you today?"],
                        },
                    },
                ],
            },
        };
    } else {
        response = {
            fulfillment_response: {
                messages: [
                    {
                        text: {
                            text: ["Sorry, I didn't understand that."],
                        },
                    },
                ],
            },
        };
    }

    // Send the response back to Dialogflow CX
    res.json(response);
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
