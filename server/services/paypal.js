import axios from "axios";
import dotenv from "dotenv";
import prices from "../index.js";
dotenv.config();

async function generateAccessToken() {
    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + "/v1/oauth2/token",
        method: "post",
        data: "grant_type=client_credentials",
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_SECRET
        }
    })
    return response.data.access_token
}

const createOrder = async () => {
    const accessToken = await generateAccessToken();
    
    // const items = prices[0].splice(0, prices[0].length - 1).map((item) => {        
    //     return ({
    //         name: item.name,
    //         description: "Complete",
    //         quantity: 1,
    //         unit_amount: {
    //             currency_code: "USD",
    //             value: item.price
    //         }
    //     })
    // })
    
    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + "/v2/checkout/orders",
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        data: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    items: [
                                   { name: "item",
                                    description: "Complete",
                                    quantity: 1,
                                    unit_amount: {
                                        currency_code: "USD",
                                        value: 100
                                    }}
                    ],
                    amount: {
                        currency_code: "USD",
                        value: 150,
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: 100
                            },
                            shipping: {
                                currency_code: "USD",
                                value: 50
                            },
                        }
                    }
                }
            ],
            application_context: {
                return_url: "https://merncafe.vercel.app/complete-order",
                cancel_url: "https://merncafe.vercel.app/cancel-order",
                user_action: "PAY_NOW",
                brand_name: "Café Dulcet"
            }
        })
    })
    return response.data.links.find(link => link.rel === "approve").href;
    
}

export default createOrder