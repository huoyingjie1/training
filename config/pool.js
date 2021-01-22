const mysql = require("mysql");
const db = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'lm1'
};
const dbPool = {
    pool : {},
    create(){
        this.pool = mysql.createPool(db);
    },
    connect(sql,arr,fun){
        this.pool.getConnection(function(err,connection){
            connection.query(sql,arr,fun);
            connection.release();
        });
    }
}
dbPool.create();
module.exports = dbPool