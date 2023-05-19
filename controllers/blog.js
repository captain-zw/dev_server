const {execSQL} = require('../src/db/mysql')
//获取博客列表
const getBlogsList = (author,keyword)=>{
    let sql = `select * from blog where 1=1 `
    if(author){
        sql+=`and author='${author}'`
    }
    if(keyword){
        sql+=`and author='%${keyword}%'`
    }

    return execSQL(sql)
    // return [
    //     {
    //         id:1,
    //         title:'标题1',
    //         content:'内容1',
    //         author:'zs',
    //         createAt:1610555518935
    //     },
    //     {
    //         id:2,
    //         title:'标题1',
    //         content:'内容2',
    //         author:'ls',
    //         createAt:1610555518936
    //     },
    // ]
}
//获取博客详情
const getBlogsDetail = (id)=>{
    const sql = `select * from blog where id='${id}'`
    return execSQL(sql).then(rows=>{
        return rows[0]
    })
//  先返回假数据
//  return {
//         id:1,
//         title:'标题1',
//         content:'内容1',
//         author:'zs',
//         createAt:1610555518935
//     }
}

//创建新的博客
const createNewBlog = (blogData={})=>{
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createdAt = Date.now();
    console.log('444',blogData)
    const sql = `
        insert into blog (title,content,author,createdAt) value ('${title}','${content}','${author}',${createdAt})
    `
    return  execSQL(sql).then(insertedResult =>{
        console.log('insertedResult',insertedResult)
        return {
            id:insertedResult.insertId
        }
    })

    // return {
    //     id:1
    // }
}

//更新博客
const updateBlogData = (id,blogData)=>{
    console.log('blogData',blogData)
    const title = blogData.title
    const content = blogData.content
    const sql = `update blog set title='${title}',content='${content}' where id=${id};`
    console.log('updateBlogData',title,content)
    return execSQL(sql).then(updateResult=>{
        if(updateResult.affectedRows>0){
            return true
        }
        return false
    })
    // return true
}

//删除博客
const deleteBlog = (id,author)=>{
    const sql = `delete from blog where ${id} and author='${author}'`;
    return execSQL(sql).then(deleteResult=>{
        if(deleteResult.affectedRows>0){
            return true
        }
        return false
    })
    // return true
}

module.exports = {
    getBlogsList,
    getBlogsDetail,
    createNewBlog,
    updateBlogData,
    deleteBlog
}