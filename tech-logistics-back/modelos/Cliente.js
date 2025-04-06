module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('Cliente', {
        id_Cliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        telefono: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        direccion: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        tableName: 'cliente',
        timestamps: false
    });

    // Crear un nuevo Cliente
    Cliente.createCliente = async (data) => {
        try {
            const cliente = await Cliente.create(data);
            return cliente;
        } catch (error) {
            throw new Error('Error al crear cliente: ' + error.message);
        }
    };

    // Obtener todos los clientes
    Cliente.getAllClientes = async () => {
        try {
            const clientes = await Cliente.findAll();
            return clientes;
        } catch (error) {
            throw new Error('Error al obtener clientes: ' + error.message);
        }
    };

    Cliente.getClienteById = async (id) => {
        try {
            const cliente = await Cliente.findByPk(id);
            if (!cliente) {
                throw new Error('Cliente no encontrado');
            }
            return cliente;
        } catch (error) {
            throw new Error('Error al obtener cliente: ' + error.message);
        }
    };

    // Eliminar un Cliente por ID
    Cliente.deleteCliente = async (id) => {
        try {
            const cliente = await Cliente.destroy({
                where: { id_Cliente: id }
            });
            if (cliente === 0) {
                throw new Error('Cliente no encontrado');
            }
            return { message: 'Cliente eliminado con éxito' };
        } catch (error) {
            throw new Error('Error al eliminar cliente: ' + error.message);
        }
    };

    return Cliente;
};