const handleBlogRoute = require('./src/routes/blog')
const querystring = require('querystring')

// 处理post数据
const getPostData = (req)=>{
    const promise = new Promise((resolve, reject) => {
        console.log('处理post数据1')
        if(req.method !=='POST'){
            console.log('处理post数据3')
            resolve({});
            return;
        }
        // if(req.headers['Content-Type']!=='application/json'){
        //     console.log('处理post数据4',req.headers['Content-Type'])
        //     resolve({});
        //     return;
        // }
        console.log('处理post数据2',req.headers['Content-Type'])

        let postData = '';
        req.on('data',(chunk)=>{
            postData+=chunk.toString();
            console.log('处理post数据7',postData)
        });
        console.log('处理post数据5',postData)
        req.on('end',()=>{
            if(!postData){
                resolve({});
                return;
            }
            console.log('处理post数据6')
            resolve(
                JSON.parse(postData)
            );
        })
    });
    return promise;
}

const serverHandler = (req,res)=>{
    // 设置相应格式
    res.setHeader('Content-Type','application/json');

    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];

    //解析query
    req.query = querystring.parse(url.split('?')[1])
    console.log('处理post')
    // 处理post数据
    getPostData(req).then((postData)=>{
        console.log('处理post数据')
        req.body = postData;
        //博客相关的路由
        const blogDataPromise = handleBlogRoute(req,res)
        if(blogDataPromise){
            blogDataPromise.then(blogData=>{
                res.end(JSON.stringify(blogData))
            });
            return;
        }
        // 未匹配到如何路由
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.write('404 Not Found')
        res.end();
    })
}

module.exports = serverHandler