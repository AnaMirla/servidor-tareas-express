const express = require('express');
const router = express.Router();
const taskController = require("../controllers/taskControllers");
const { body, param, validationResult } = require('express-validator');

// Validación para el cuerpo del request (task)
const validateBodyTask = [
    body("title")
        .isLength({ min: 1 }).withMessage("Title es requerido")
        .isString().withMessage("Title es un string").trim().escape(),
    body("descripcion")
        .optional()
        .isString().withMessage("Descripcion es un string").trim().escape()
];

// Validación para el parámetro ID
const validateParamTaskId = [
    param("id")
        .isInt({ gt: 0 }).withMessage("Id de la tarea tiene que ser mayor que 0 y positivo")
        .toInt()
];

router.get("/", taskController.getTask);
router.get("/:id", validateParamTaskId, taskController.getTaskById);
router.post("/", validateBodyTask, taskController.createTask);
router.put("/:id", validateParamTaskId.concat(validateBodyTask), taskController.updateTask);
router.delete("/:id", validateParamTaskId, taskController.deleteTask);

module.exports = router;
