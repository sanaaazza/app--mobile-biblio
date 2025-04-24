// routes/Borrowroute.js
const express = require("express");
const router = express.Router();
const BorrowController = require("../controllers/borrowController");
const auth = require("../middlewares/authMiddleware");

// Créer un emprunt
router.post("/", auth("user"), BorrowController.createBorrow);

// Récupérer tous les emprunts
router.get("/", BorrowController.getAllBorrows);

// Récupérer un emprunt par ID
router.get("/:id", BorrowController.getBorrowById);

// Supprimer un emprunt
router.delete("/:id", auth("user"), BorrowController.deleteBorrow);

//modifier un emprunt
router.put("/:id", auth("user"), BorrowController.updateBorrow);

module.exports = router;
