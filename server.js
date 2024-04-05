import express, { request, response } from "express"; // node raamistik
import dotenv from "dotenv";  // annab ligipääsu env failidele
import morgan from "morgan"; // kes liikus, mida küsis?
import cors from "cors"; // saab piirata url-e
import cmc_API from "./services/cmcAPI.js";

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 3000; // "või" Kui.env muudan, siis 3000 ei tööta

app.use(express.json());

app.use(morgan());

app.use(cors({
    origin: ["http://localhost:5173"],
    optionsSuccessStatus: 200, //200 on hästi, kõik on OK, mida edasi.
 })
);

app.get('/', (request, response) => {          // see kaldkriips seal on endpoint
    response.send({
        message: "Tere tulemast minu backendi",
    })
});  //see nagu readonly

app.get('/cryptocurrency/categories', async (request, response) => {
    const categoryResponse = await cmc_API.get("/v1/cryptocurrency/categories");

    if(!categoryResponse) {
        response.status(404).send({
            message: "Kategooriaid ei leitud. Hoia FIATis",
        })
    }

    response.status(200).json(categoryResponse);
});

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
});