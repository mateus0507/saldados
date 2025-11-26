import db from "./db.js";
import { Sequelize } from "sequelize";

const Agendamento = db.define("entrega", {
    nome: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pagamento: {
        type: Sequelize.STRING,
        allowNull: false
    },

} );

Agendamento.sync({force:false});

export default Agendamento;
