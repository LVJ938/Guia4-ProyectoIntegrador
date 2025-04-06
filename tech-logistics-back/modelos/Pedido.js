module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define('Pedido', {
        id_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        fecha_pedido: {
            type: DataTypes.DATE,
            allowNull: true, // El valor puede ser null
        },
        estado_envio: {
            type: DataTypes.ENUM('PREPARANDO', 'ENVIADO', 'ENTREGADO'),
            allowNull: false, // Este campo no puede ser null
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cliente', // Relaciona con la tabla `cliente`
                key: 'id_Cliente',
            },
        },
    }, {
        tableName: 'pedido', // El nombre de la tabla en la base de datos
        timestamps: false, // No se manejan `createdAt` ni `updatedAt`
    });

    // Definición de las relaciones (si es necesario)
    Pedido.associate = (models) => {
        // Relación: Un pedido pertenece a un cliente
        Pedido.belongsTo(models.Cliente, {
            foreignKey: 'id_cliente',
            as: 'cliente',
        });
    };

    // Crear un nuevo Pedido
    Pedido.createPedido = async (data) => {
        try {
            const pedido = await Pedido.create(data);
            return pedido;
        } catch (error) {
            throw new Error('Error al crear pedido: ' + error.message);
        }
    };

    // Obtener todos los Pedidos
    Pedido.getAllPedidos = async () => {
        try {
            const pedidos = await Pedido.findAll();
            return pedidos;
        } catch (error) {
            throw new Error('Error al obtener pedidos: ' + error.message);
        }
    };

    Pedido.getPedidoById = async (id) => {
        try {
            const pedido = await Pedido.findByPk(id);
            if (!pedido) {
                throw new Error('Pedido no encontrado');
            }
            return pedido;
        } catch (error) {
            throw new Error('Error al obtener pedido: ' + error.message);
        }
    };

    // Eliminar un Pedido por ID
    Pedido.deletePedido = async (id) => {
        try {
            const pedido = await Pedido.destroy({
                where: { id_pedido: id }
            });
            if (pedido === 0) {
                throw new Error('Pedido no encontrado');
            }
            return { message: 'Pedido eliminado con éxito' };
        } catch (error) {
            throw new Error('Error al eliminar pedido: ' + error.message);
        }
    };

    return Pedido;
};