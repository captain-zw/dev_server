const mysql = require('mysql')

// 创建链接参数 
const connection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1429897058',
    port:3306,
    database:'blogs'
});

//开始连接
connection.connect();

//执行 sql 语句
const sql = `select * from blog`;
connection.query(sql,(error,result)=>{
    if(error){
        console.error('error',error)
        return
    }
    console.log('result',result)
})

//  关闭连接
connection.end()