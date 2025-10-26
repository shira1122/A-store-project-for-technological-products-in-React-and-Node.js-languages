
// const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, '../orders.json');

// function readData() {
//     return JSON.parse(fs.readFileSync(filePath));
// }

// function writeData(data) {
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// }

// exports.getAllOrders = (req, res) => {
//     res.json(readData());
// };

// exports.getOrderById = (req, res) => {
//     const orders = readData();
//     const order = orders.find(o => o.id === parseInt(req.params.id));
//     order ? res.json(order) : res.status(404).json({ error: 'Order not found' });
// };

// exports.createOrder = (req, res) => {
//     const orders = readData();
//     const newOrder = { id: Date.now(), ...req.body };
//     orders.push(newOrder);
//     writeData(orders);
//     res.status(201).json(newOrder);
// };

// exports.updateOrder = (req, res) => {
//     let orders = readData();
//     const index = orders.findIndex(o => o.id === parseInt(req.params.id));
//     if (index !== -1) {
//         orders[index] = { ...orders[index], ...req.body };
//         writeData(orders);
//         res.json(orders[index]);
//     } else {
//         res.status(404).json({ error: 'Order not found' });
//     }
// };

// exports.deleteOrder = (req, res) => {
//     let orders = readData();
//     const index = orders.findIndex(o => o.id === parseInt(req.params.id));
//     if (index !== -1) {
//         const deleted = orders.splice(index, 1);
//         writeData(orders);
//         res.json(deleted[0]);
//     } else {
//         res.status(404).json({ error: 'Order not found' });
//     }
// };

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../orders.json');

function readData() {
    return JSON.parse(fs.readFileSync(filePath));
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

exports.getAllOrders = (req, res) => {
    res.json(readData());
};

exports.getOrderById = (req, res) => {
    const orders = readData();
    const order = orders.find(o => o.id === parseInt(req.params.id));
    order ? res.json(order) : res.status(404).json({ error: 'Order not found' });
};

exports.createOrder = (req, res) => {
    const orders = readData();
    const newOrder = { id: Date.now(), ...req.body };
    orders.push(newOrder);
    writeData(orders);
    res.status(201).json(newOrder);
};

exports.updateOrder = (req, res) => {
    let orders = readData();
    const index = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index !== -1) {
        orders[index] = { ...orders[index], ...req.body };
        writeData(orders);
        res.json(orders[index]);
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
};

exports.deleteOrder = (req, res) => {
    let orders = readData();
    const index = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index !== -1) {
        const deleted = orders.splice(index, 1);
        writeData(orders);
        res.json(deleted[0]);
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
};
exports.getOrdersByEmail = (req, res) => {
    const orders = readData();
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ error: 'Missing email parameter' });
    }
    const filtered = orders.filter(o => o.userId === email);
    res.json(filtered);
};