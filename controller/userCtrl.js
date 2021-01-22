const mysql = require("mysql");
const dao = require("../Dao/dao");

module.exports= {

    seleteAll:function(req,resp){
        console.log("查询所有");//拦截get方法
        dao.getStuDao("SELECT * FROM users",function(err,result){
            console.log(result);
            resp.send(result);
            resp.end();
        });
    },
    
    seleteOnly:function(req,resp){
        console.log("查询id");//拦截get方法
        dao.getStuDao("SELECT * FROM users",function(err,result){
            console.log(req.params);
            const id = req.params.id;
            for (let user of result) {
                if (user.id === id) {
                    resp.send([user]);
                    break;
                }
            }
            resp.end();
        });
    },

    add:function(req,resp){
        console.log("添加");//拦截get方法
        dao.getStuDao("INSERT INTO users (id,userName,password) VALUES (?,?,?)",[req.body.id, req.body.userName, req.body.password],function(err,result){
            console.log(req.body);
            resp.send({ succ: true });
            resp.end();
        });
    },

    update:function(req,resp){
        console.log("修改");
        dao.getStuDao("UPDATE users SET userName=?,password=? WHERE id=?",[req.body.userName, req.body.password, req.body.id],function(err,result){
            console.log(req.body);
            resp.send({ succ: true });
            resp.end();
        });
    },


    delete:function(req,resp){
        console.log("删除");
        dao.getStuDao("DELETE  FROM  users WHERE id=?",[req.params.id],function(err,result){
            console.log(req.params);
            resp.send({ succ: true });
            resp.end();
        });
    }

}
