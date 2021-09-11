const Client = require("../models/Client");

// @desc Get all clients
// @route GET /api/v1/clients
// @access Public
exports.getClients = async (req, res, next) => {
  try {
    const clients = await Client.find();

    return res.status(200).json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error"});
  }
};

// @desc Create a store
// @route POST /api/v1/stores
// @access Public
exports.addClient = async (req, res, next) => {
  try {
    const client = await Client.create(req.body);

    return res.status(200).json({
      success: true,
      data: client
    })
  } catch (e) {
    console.error(e);
    if(e.code === 11000){
      return res.status(400).json({ error: "This client already exists"});
    }
    res.status(500).json({ error: "Server error"});
  }
};
