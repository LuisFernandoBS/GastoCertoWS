const express = require("express")
const router = express.Router()

const gastoController = require('../controllers/gasto.controller')

router.get("/", gastoController.getAll)
router.get("/:id", gastoController.getById)
router.post("/", gastoController.create)
router.put("/:id", gastoController.updateById)
router.delete("/:id", gastoController.deleteById)

module.exports = router