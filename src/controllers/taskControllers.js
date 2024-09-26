const taskModel = require("../models/taskModel");
const {validationResult} = require('express-validator')


//Obtener todas las tareas
const getTask = async (req, res, next) => {
    try {
        const tasks = await taskModel.getTasks()
        res.json(tasks)
    } catch (error) {
        next(error)
    }
};

//Obtener tarea por ID
const getTaskById = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const tasks = await taskModel.getTasksById(req.params.id);
        if (!tasks) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        res.json(tasks)
    } catch (error) {
        next(error)
    }
};

//Crear una nueva tarea
const createTask = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const newTask = await taskModel.createTasks(req.body)
        res.status(201).json(newTask)
    } catch (error) {
        next(error)
    }
};

//Actualizar una tarea
const updateTask = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const updateTask = await taskModel.updateTasks(req.params.id, req.body)
        if (!updateTask) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        res.json(updateTask)
    } catch (error) {
        next(error)
    }
};

//Eliminar una tarea
const deleteTask = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const deleteTask = await taskModel.deleteTasks(req.params.id);
        if (!deleteTask) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        res.json({message: "Tarea eiminada", tarea_eliminada: deleteTask} )
    } catch (error) {
        next(error)
    }
};

module.exports={
    getTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};