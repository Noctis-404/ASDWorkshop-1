const express = require("express");
const productRoutes = require('./routes/productRoutes');

const port = 3000;
const app = express();

app.use(express.json());
app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
