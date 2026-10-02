const db = require('../database/index');

async function getAllProducts() {
    return await db.delayReadFile();
}

async function getProductById(id) {
    const data = await db.delayReadFile();
    return data.find((item) => item.id === id);
}

async function createProduct(productData) {
    const products = await db.readData();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { id: newId, ...productData };
    products.push(newProduct);
    await db.writeData(products);
    return newProduct;
}

async function updateProduct(id, updatedData) {
    const products = await db.readData();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updatedData, id };
    await db.writeData(products);
    return products[index];
}

async function deleteProduct(id) {
    const products = await db.readData();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) return false;

    products.splice(index, 1);
    await db.writeData(products);
    return true;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

