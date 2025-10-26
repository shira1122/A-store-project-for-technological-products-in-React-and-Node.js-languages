
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../users.json');

function readData() {
    return JSON.parse(fs.readFileSync(filePath));
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

exports.getAllUsers = (req, res) => {
    res.json(readData());
};

exports.getUserById = (req, res) => {
    const users = readData();
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ error: 'User not found' });
};

exports.createUser = (req, res) => {
    const users = readData();
    const { email } = req.body;

    // בדיקה אם כבר קיים משתמש עם אותו מייל
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
    }

    // יצירת משתמש חדש כשהמייל הוא ה-id
    const newUser = {
        id: email,      // או שתשאירי id רגיל ו-email בשדה נפרד
        ...req.body
    };

    users.push(newUser);
    writeData(users);
    res.status(201).json(newUser);
};


exports.login = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("Error reading users file");
        } else {
            const users = JSON.parse(data);
            const { email, password } = req.body;

            const currentUser = users.find(user =>
                user.email === email && user.password === password
            );

            if (!currentUser) {
                res.status(401).send("Email or password is incorrect");
            } else {
                res.send(currentUser);
            }
        }
    });

};








// exports.updateUser = (req, res) => {
//     let users = readData();
//     const index = users.findIndex(u => u.id === parseInt(req.params.id));
//     if (index !== -1) {
//         users[index] = { ...users[index], ...req.body };
//         writeData(users);
//         res.json(users[index]);
//     } else {
//         res.status(404).json({ error: 'User not found' });
//     }
// };

// exports.deleteUser = (req, res) => {
//     let users = readData();
//     const index = users.findIndex(u => u.id === parseInt(req.params.id));
//     if (index !== -1) {
//         const deletedUser = users.splice(index, 1);
//         writeData(users);
//         res.json(deletedUser[0]);
//     } else {
//         res.status(404).json({ error: 'User not found' });
//     }
// };