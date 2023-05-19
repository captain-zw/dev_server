const { SuccessModel } = require('../model/responseModel')
const { getBlogsList ,getBlogsDetail,createNewBlog,updateBlogData,deleteBlog} = require('../../controllers/blog')
// const {execSQL} = require('../db/mysql')

//处理博客相关的路由
const handleBlogRoute = (req,res)=>{
    //定义路由逻辑
    const method = req.method;
    const id = req.query.id;
    const blogData = req.body;
    console.log('处理post数据6')
    //  博客列表路由
    if(method==='GET'&&req.path==='/api/blog/list'){
        // const sql = `select * from blog`
        // execSQL(sql,(error,result)=>{
        //         if(error){
        //             console.error('error',error)
        //             return
        //         }
        //         console.log('result',result)
        // })
        // execSQL(sql).then((result)=>{
        //     console.log('result',result)
        // })
        const author =req.query.author||''
        const keyword =req.query.keyword||''
        const listDataPromise = getBlogsList(author,keyword)
        return listDataPromise.then(listData=>{
            return new SuccessModel(listData)
        })
        
        // return{
        //     message:'获取博客列表的接口'
        // }
    }

    //博客详情路由
    if(method==='GET'&&req.path==='/api/blog/detail'){
        // const detailData =  getBlogsDetail(id)
        // return new SuccessModel(detailData)

        const detailDataPromise = getBlogsDetail(id);
        return detailDataPromise.then(detailData=>{
            return new SuccessModel(detailData)
        })
    }

    //新增博客路由
    if(method==='POST'&&req.path==='/api/blog/new'){
        // const newBlogData =  createNewBlog(blogData);
        // return new SuccessModel(newBlogData)

        const author = 'zhangsan'
        req.body.author=author;
        console.log('aaa',blogData)
        const newBlogDataPromise =createNewBlog(blogData);
        return newBlogDataPromise.then(newBlogData=>{
            return new SuccessModel(newBlogData)
        })
    }

    //更新博客路由
    if(method==='POST'&&req.path==='/api/blog/update'){
        // console.log('blogData',req)
        // return
        const updatedBlogDataPromise = updateBlogData(id,blogData)
        return updatedBlogDataPromise.then(updateBlogData=>{
            if(updateBlogData){
                return new SuccessModel('更新博客成功！')
            }else{
                return new ErrorModel('更新博客失败...')
            }
        })
    }

    //删除博客路由
    if(method==='POST'&&req.path==='/api/blog/delete'){
        const author = 'zw'
        const deleteBlogDataPromise = deleteBlog(id,author)
        return deleteBlogDataPromise.then(deleteBlogData=>{
            if(deleteBlogData){
                    return new SuccessModel('删除博客成功！')
            }else{
                return new ErrorModel('删除博客失败...')
            }
        })
        
    }

}

module.exports = handleBlogRoute