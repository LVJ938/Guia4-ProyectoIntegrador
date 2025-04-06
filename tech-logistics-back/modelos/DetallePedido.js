module.exports = (sequelize, DataTypes) => {
    const DetallePedido = sequelize.define('DetallePedido', {
        id_detalle_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        }
    }, {
        tableName: 'detalle_pedido',
        timestamps: false
    });

    // Relación con Pedido (DetallePedido pertenece a un Pedido)
    DetallePedido.belongsTo(sequelize.models.Pedido, {
        foreignKey: 'id_pedido',
        as: 'pedido'
    });

    // Relación con Producto (DetallePedido pertenece a un Producto)
    DetallePedido.belongsTo(sequelize.models.Producto, {
        foreignKey: 'id_producto',
        as: 'producto'
    });

    // Crear un nuevo DetallePedido
    DetallePedido.createDetallePedido = async (data) => {
        try {
            const detallePedido = await DetallePedido.create(data);
            return detallePedido;
        } catch (error) {
            throw new Error('Error al crear detalle de pedido: ' + error.message);
        }
    };

    // Obtener todos los Detalles de Pedido
    DetallePedido.getAllDetallesPedidoByPedido = async (idPedido) => {
        try {
            const detallesPedido = await DetallePedido.findAll({
                where: {id_pedido: idPedido}
            });
            return detallesPedido;
        } catch (error) {
            throw new Error('Error al obtener detalles de pedido: ' + error.message);
        }
    };

    DetallePedido.getDetallePedidoById = async (id) => {
        try {
            const detallePedido = await DetallePedido.findByPk(id);
            if (!detallePedido) {
                throw new Error('DetallePedido no encontrado');
            }
            return detallePedido;
        } catch (error) {
            throw new Error('Error al obtener detallePedido: ' + error.message);
        }
    };

    // Eliminar un DetallePedido por ID
    DetallePedido.deleteDetallePedido = async (id) => {
        try {
            const detallePedido = await DetallePedido.destroy({
                where: { id_detalle_pedido: id }
            });
            if (detallePedido === 0) {
                throw new Error('Detalle de pedido no encontrado');
            }
            return { message: 'Detalle de pedido eliminado con éxito' };
        } catch (error) {
            throw new Error('Error al eliminar detalle de pedido: ' + error.message);
        }
    };

    return DetallePedido;
};