const { Pool } = require('pg');

const dataBaseConfig = { connectionString: 'postgres://wiowggku:hXqPX__AmIB9V2hn1Ju1nEb9X6NkM8AY@tuffi.db.elephantsql.com:5432/wiowggku'  }

const pool = new Pool(dataBaseConfig);

const getTasks = async (req, res) => {
    const response = await pool.query('SELECT * FROM TASKS');
    res.status(200).json(response.rows);
};

const getTasksById = async (req, res) => {
    const idTask = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM TASKS WHERE id = $1', [idTask]);
    res.json(response.rows);
};

const createTask = async (req, res) => {
    const { taskName } = req.body;
    const response = await pool.query('INSERT INTO TASKS (name) VALUES ($1)', [taskName]);
    res.json({
        message: 'Task Adicionada com sucesso',
        body: {
            task: {taskName}
        }
    })
};

const updateTask = async (req, res) => {
    const idTask = parseInt(req.params.id);
    const { taskName } = req.body;

    const response = await pool.query('UPDATE TASKS SET name = $1 WHERE id = $2', [
        taskName,
        idTask
    ]);
    res.json('Task atualizada com sucesso');
};

const deleteTask = async (req, res) => {
    const taskName = parseInt(req.params.id);
    await pool.query('DELETE FROM TASKS where id = $1', [
        taskName
    ]);
    res.json(`Task ${taskName} apagaga com sucesso`);
};

module.exports = {
    getTasks,
    getTasksById,
    createTask,
    updateTask,
    deleteTask
};