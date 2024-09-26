const pg = require("../config/db");

//Funcion mostrar tareas
const getTasks = async () => {
    try {
        const res = await pg.query("SELECT * FROM tareas");
        return res.rows;
    } catch (error) {
        throw error;
    }
};

//Funcion mostrar tareas por ID
const getTasksById = async (id) => {
    try {
        const res = await pg.query("SELECT * FROM tareas WHERE id = $1", [id]);
        return res.rows[0];

    } catch (error) {
        throw error;
    }
};

//Funcion para crear una nueva tarea
const createTasks = async(task)=>{
    const {title,descripcion}=task;
    try {
        const res = await pg.query("INSERT INTO tareas (title,descripcion) VALUES ($1, $2) RETURNING *", [title,descripcion]);
        res.rows[0];
    } catch (error) {
        throw error;
    }
};

//Funcion para editar una tarea
const updateTasks = async(id,task)=>{
    const {title,descripcion}=task;
    try {
        const res = await pg.query("UPDATE tareas SET title = $1, descripcion = $2 WHERE id = $3 RETURNING *", [title,descripcion,id]);
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};

//Funcion para eliminar tarea
const deleteTasks = async (id)=>{
    try {
        const res = await pg.query("DELETE FROM tareas WHERE id=$1 RETURNING *", [id]);
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports={
    getTasks,
    getTasksById,
    createTasks,
    updateTasks,
    deleteTasks,
};