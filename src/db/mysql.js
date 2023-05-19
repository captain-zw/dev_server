const {MYSQL_CONFIG} = require('../config/db')
const mysql = require('mysql')

// 创建链接参数 
const connection =mysql.createConnection( MYSQL_CONFIG );

//开始连接
connection.connect();

//执行 sql 语句
    // const sql = `select * from blog`;
    // connection.query(sql,(error,result)=>{
    //     if(error){
    //         console.error('error',error)
    //         return
    //     }
    //     console.log('result',result)
    // })

//  关闭连接
// connection.end()

// function execSQL(sql,callback){
//     connection.query(sql,callback);
// }

function execSQL(sql,callback){
    const promise = new Promise((resolve, reject) => {
        connection.query(sql,(error,result)=>{
            if(error){
                reject(error)
                // console.error('error',error)
                return
            }
            resolve(result)
            // console.log('result',result)
        })
    })
    return promise
}

module.exports={
    execSQL
}