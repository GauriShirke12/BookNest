const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { type } = require("express/lib/response.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://media.istockphoto.com/id/1161878589/photo/bueatiful-tea-plantation-on-mountain.jpg?s=1024x1024&w=is&k=20&c=wgGafYAVLguIeeNPpU8z7K0ejO0JunU0oec2PtrPMzQ="
        }
    },
    location: String,
    price: Number,
    country: String,
    reviews:[
        {
     type : Schema.Types.ObjectId,
     ref: "Review",
    },
    ],

    owner :{
        type :Schema.Types.ObjectId,
        ref : "User",
    },
});

listingSchema.post("findOneAndDelete", async(listing) =>{
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
      }
      
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;