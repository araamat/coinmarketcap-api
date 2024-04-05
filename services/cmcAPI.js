import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const cmc_API = axios.create({
    baseURL: process.env.COINMARTKETCAP_BASE_URL,
    headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY
    },
});

export default cmc_API;