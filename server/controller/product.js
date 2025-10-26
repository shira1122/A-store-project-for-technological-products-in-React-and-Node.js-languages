const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../products.json');

function readData() {
    return JSON.parse(fs.readFileSync(filePath));
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

exports.getAllProducts = (req, res) => {
    res.json(readData());
};

exports.getProductById = (req, res) => {
    const products = readData();
    const product = products.find(p => p.id === parseInt(req.params.id));
    product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
};

exports.createProduct = (req, res) => {
    const products = readData();
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    writeData(products);
    res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
    let products = readData();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        writeData(products);
        res.json(products[index]);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
};

exports.deleteProduct = (req, res) => {
    let products = readData();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        const deleted = products.splice(index, 1);
        writeData(products);
        res.json(deleted[0]);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
};