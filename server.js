require('dotenv').config();
const app = require('./backend/app.js');


const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {


  console.log(`Corriendo en el puerto ${PORT}`);
})
