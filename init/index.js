const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/TestDB";
 
main().then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.error("Failed to connect to DB", err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "68162c5d05a7116dbfe11a7c" }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized!");
};

initDB();