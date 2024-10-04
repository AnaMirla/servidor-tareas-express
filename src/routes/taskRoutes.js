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

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     responses:
 *       200:
 *         description: Lista de todas las tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task' 
 * 
 */
router.get("/", taskController.getTask);


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task' 
 *       404:
 *         description: Tarea no encontrada
 */
router.get("/:id", validateParamTaskId, taskController.getTaskById);


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     requestBody:    # Corrección: se añade ":"
 *       required: true
 *       content: 
 *         application/json:    # Corrección: ajuste de indentación
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validación
 */
router.post("/", validateBodyTask, taskController.createTask);


/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     requestBody:    # Corrección: se añade ":"
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *       400:
 *         description: Error de validación
 */
router.put("/:id", validateParamTaskId.concat(validateBodyTask), taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 */
router.delete("/:id", validateParamTaskId, taskController.deleteTask);

module.exports = router;
