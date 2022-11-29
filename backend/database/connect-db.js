const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://carlitos:sdRnoQYjA7iVmQFP@cluster0.vpcao9r.mongodb.net/testt", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de datos corriendo de manera exitosa!");
  } catch (error) {
    throw new Error("Error a la hora de correr la base de datos");
  }
};

module.exports = {
  connectionDB,
};
