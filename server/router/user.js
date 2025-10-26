
const express = require('express');
const router = express.Router();
const controllerUser = require('../controller/user')


// GET /users - קבלת כל המשתמשים
router.get('/', controllerUser.getAllUsers);

// GET /users/:id - קבלת משתמש לפי מזהה
router.get('/:id', controllerUser.getUserById);

// POST /users - יצירת משתמש חדש
router.post('/post', controllerUser.createUser);
//התחברות למערכת עם קיים
router.post("/login", controllerUser.login);

// PUT /users/:id - עדכון משתמש קיים
// router.put('/:id', usersController.updateUser);

// DELETE /users/:id - מחיקת משתמש
// router.delete('/:id', usersController.deleteUser);

module.exports = router;