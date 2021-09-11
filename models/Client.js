const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const OrgSchema = new mongoose.Schema({
  _id_: {
    type: String,
    required: [true, "Please add orgnr"],
    trim: true

  },
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true
  },
  orgnr: {
    type: String,
    required: [true, "Please add orgnr"],
    trim: true,
    unique: true
  },
  adresse: {
    type: String,
    require: [true, "Please add an address"]
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//Geocode & create location
OrgSchema.pre("save", async function(next) {
  const loc = await geocoder.geocode(this.adresse);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  }

  // Do not save address
  this.adresse = undefined;
  next();
});

module.exports = mongoose.model("Client", OrgSchema);
