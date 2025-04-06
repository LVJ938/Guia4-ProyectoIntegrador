const { Sequelize } = require('sequelize');

// Establecer la conexión con la base de datos MySQL
const sequelize = new Sequelize('techlogistics_sa_g4', 'root', '', {
    port: 3306,
    host: 'localhost',
    dialect: 'mysql',
    username: "root",
    password: "admin2025",
    logging: false,
});

const models = {
    Cliente: require('../modelos/Cliente')(sequelize, Sequelize.DataTypes),
    Producto: require('../modelos/Producto')(sequelize, Sequelize.DataTypes),
    Pedido: require('../modelos/Pedido')(sequelize, Sequelize.DataTypes),
    DetallePedido: require('../modelos/DetallePedido')(sequelize, Sequelize.DataTypes),
};

// Establecer las relaciones entre modelos
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = { sequelize, models };