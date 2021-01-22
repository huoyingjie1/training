const dbpool = require("../config/pool")

module.exports={
    getStuDao(sql,arr,cb){
        dbpool.connect(sql,arr,function(err,data){
            cb(err,data);
        })
    }
}