const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const dbPath = path.resolve(__dirname, '../../database.sqlite')
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log("Ошибка подключения:", err.message);
    } else {
        console.log("База SQLite подключена!");
    }
})

const initDb = () => {
    return new Promise((res, rej) => {
       db.run(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT,
                completed INTEGER
            )
        `, (err) => {
            if (err) {
                console.error("Ошибка при создании таблицы:", err.message)
                rej(err)
            } else {
                console.log("Таблица tasks готова к работе!")
                res()
            }
        }) 
    })
}


module.exports = {initDb, db}