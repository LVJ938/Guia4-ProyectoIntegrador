// Modelo Item para MySQL
class Item {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    // Método para guardar el item en la base de datos
    save(connection, callback) {
        const query = 'INSERT INTO items (name, description) VALUES (?, ?)';
        connection.query(query, [this.name, this.description], (err, results) => {
            if (err) {
                console.error("Error al insertar el item:", err);
                callback(err);
            } else {
                callback(null, results.insertId);  // Devuelve el ID del nuevo item insertado
            }
        });
    }

    // Método para obtener todos los items de la base de datos
    static getAll(connection, callback) {
        connection.query('SELECT * FROM items', (err, results) => {
            if (err) {
                console.error("Error al obtener los items:", err);
                callback(err);
            } else {
                callback(null, results);  // Devuelve todos los items
            }
        });
    }
}

// Exportar el modelo
module.exports = Item;