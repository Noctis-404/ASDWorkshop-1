const productService = require('../services/productService');

async function getProducts(req, res) {
    try {
        let data = await productService.getAllProducts();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
}

async function getProductById(req, res) {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID format" });
    }
    try {
        let product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
}

async function createProduct(req, res) {
    try {
        const { name, price } = req.body;
        if (!name || price === undefined) {
            return res.status(400).json({ error: "Name and price are required" });
        }
        const newProduct = await productService.createProduct({ name, price: Number(price) });
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: "Failed to create product" });
    }
}

async function updateProduct(req, res) {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID format" });
    }
    try {
        const updatedProduct = await productService.updateProduct(id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: "Failed to update product" });
    }
}

async function deleteProduct(req, res) {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID format" });
    }
    try {
        const deleted = await productService.deleteProduct(id);
        if (!deleted) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete product" });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

