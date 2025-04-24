// controllers/BorrowControllers.js
const { Borrow, User, Book } = require("../models");

//  Créer un emprunt
exports.createBorrow = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, bookId, borrowDate, returnDate } = req.body;

    const borrow = await Borrow.create({
      userId,
      bookId,
      borrowDate,
      returnDate,
    });
    return res.status(201).json(borrow);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  Récupérer tous les emprunts
// exports.getAllBorrows = async (req, res) => {
//   try {
//     const borrows = await Borrow.findAll({
//       include: ["user", "book"],
//     });
//     return res.status(200).json(borrows);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

exports.getAllBorrows = async (req, res) => {
  try {
    const { id: userId, role } = req.user;

    // Correction du nom du champ si nécessaire
    const whereCondition = role === "admin" ? {} : { UserId: userId };

    // Include avec les modèles corrects et alias
    const borrows = await Borrow.findAll({
      where: whereCondition,
      include: [
        { model: User, as: "user" },
        { model: Book, as: "book" },
      ],
    });

    return res.status(200).json(borrows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  Récupérer un emprunt par ID
exports.getBorrowById = async (req, res) => {
  try {
    const { id } = req.params;
    const borrow = await Borrow.findByPk(id, {
      include: ["user", "book"],
    });

    if (!borrow) {
      return res.status(404).json({ message: "Emprunt non trouvé" });
    }

    return res.status(200).json(borrow);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  Supprimer un emprunt
exports.deleteBorrow = async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);
    const deleted = await Borrow.destroy({ where: { id: intId } });

    if (!deleted) {
      return res.status(404).json({ message: "Emprunt non trouvé" });
    }

    return res.status(200).json({ message: "Emprunt supprimé avec succès" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 🔄 Modifier un emprunt
exports.updateBorrow = async (req, res) => {
  try {
    const { id } = req.params;
    const { borrowDate, returnDate } = req.body;

    const borrow = await Borrow.findByPk(id);
    if (!borrow) {
      return res.status(404).json({ message: "Emprunt non trouvé" });
    }

    await borrow.update({ borrowDate, returnDate });
    return res
      .status(200)
      .json({ message: "Emprunt mis à jour avec succès", borrow });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
