// importa a classe Sequelize
import { Sequelize } from "sequelize";

// Cria uma nova instância de conexão com o banco de dados
const db = new Sequelize(
    "salgados_h7py", // nome do banco 
    "salgados_h7py_user", // Usuário administrador do banco
    "EVpPNtPj99krXzRPBTFOC62Czs4DecGT",     // senha do banco
    {
        host: "dpg-d4joua49c44c73efrf8g-a.oregon-postgres.render.com", // onde o banco está
        dialect: "postgres", // o drive do tipo do banco
        dialectOptions:{
            ssl:{
                require: true, rejectUnauthorized: false
            }
        },
    }
);

db.authenticate().then((function(){
    console.log("Conectado ao banco com sucesso")
})).catch(function(erro){
    console.log("Erro ao conectar ao banco de dados" + erro)
});

export default db;
