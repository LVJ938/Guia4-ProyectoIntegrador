module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define('Producto', {
        id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(120),
            allowNull: true
        },
        descripcion: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'producto',
        timestamps: false
    });

    // Crear un nuevo Producto
    Producto.createProducto = async (data) => {
        try {
            const producto = await Producto.create(data);
            return producto;
        } catch (error) {
            throw new Error('Error al crear producto: ' + error.message);
        }
    };

    // Obtener todos los Productos
    Producto.getAllProductos = async () => {
        try {
            const productos = await Producto.findAll();
            return productos;
        } catch (error) {
            throw new Error('Error al obtener productos: ' + error.message);
        }
    };

    // Eliminar un Producto por ID
    Producto.deleteProducto = async (id) => {
        try {
            const producto = await Producto.destroy({
                where: { id_producto: id }
            });
            if (producto === 0) {
                throw new Error('Producto no encontrado');
            }
            return { message: 'Producto eliminado con éxito' };
        } catch (error) {
            throw new Error('Error al eliminar producto: ' + error.message);
        }
    };

    return Producto;
};