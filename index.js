let http = require("http");
let allurl = require("url");
let fs = require("fs"); // 引入文件核心模块
let path = require("path"); //引入路径核心模块
let template = require("art-template"); //模板引擎
let views = path.join(__dirname, "views"); //获取views路径
let mysql = require('mysql'); //引入mysql
const connection  = mysql.createConnection({ //连接数据库 看README.md 安装本地数据库和表
    host    : 'localhost',
    user    : 'root',  //本地 mysql 用户名
    password: 'root', //本地 mysql 密码
    database: 'test' //本地 mysql 名称
});

function handleDisconnect(){
    connection.connect(function (err) {
        // callback(err,result);
        if(err){
            console.log(err);
            console.log("try to connect");
            setTimeout(handleDisconnect,1000);  //链接失败经过1秒后尝试重新连接
            return;
        }
        console.log("Success");
    });
}
handleDisconnect();

http
  .createServer(function(req, res) {
    // url.parse 参数转成对象 true
    let parseObj = allurl.parse(req.url, true);
    //单独获取？前面的url参数路径
    let url = parseObj.pathname;
    if (url === "/") {
      fs.readFile(path.join(views, "view.html"), function(err, data) {
        if (err) {
          return res.end("找不到渲染文件");
        }
        res.end(data.toString());
      });
    } else if (url === "/list") {
      fs.readFile(path.join(views, "template.html"), function(err, data) {
        if (err) {
          res.end("读取template文件失败");
        }

        let select = 'select * from first'
        connection.query(select, function(err, rows){
            if(err){
                console.log("Query select ERROR!");
            }
            console.log(rows,'rows111111111111111111111111');
            let htmlstr = template.render(data.toString(), {
                header: "评论日志",
                title: "list",
                files: rows
              });
              res.end(htmlstr);
        });

        // });  
      });
    } else if (url === "/post") {
      fs.readFile(path.join(views, "public", "post.html"), function(err, data) {
        if (err) {
          res.end("读取post文件失败");
        }
        res.end(data.toString());
      });
    } else if (url === "/delete") {
       let  addSql = 'delete from  first where Id=?';
       let  addSqlParams = parseObj.query.Id;
       connection.query(addSql,addSqlParams, function(err, rows){
           if(err){
               console.log(err,"Query delete ERROR!");
           }
           res.statusCode = 302;
           res.setHeader("Location", "/list");
           console.log(rows,'delete')
          res.end();
       });
    } else if (url === "/pinglun") {
      console.log(parseObj.query, "query");

      const date = new Date();

      const current_date = date.getDate();
      // 获取本  日
      const current_month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      // 获取本  月
      const current_year = date.getFullYear();
      res.statusCode = 302;
      res.setHeader("Location", "/list");
      let  addSql = 'INSERT INTO first(Id,name,message,date) VALUES(0,?,?,?)';
      let  addSqlParams = [parseObj.query.name,parseObj.query.message, current_year + "-" + current_month + "-" + current_date];
      connection.query(addSql,addSqlParams, function(err, rows){
          if(err){
              console.log(err,"Query add ERROR!");
          }
          console.log(rows,'add')
         res.end();
      });
    } else if (url.indexOf("/public/") === 0) {
      fs.readFile(path.join(__dirname, "views", url), function(err, data) {
        if (err) {
          return res.end("找不到public渲染文件");
        }
        res.end(data.toString());
      });
    } else {
      return res.end("not found 404");
    }
  })
  .listen(3333, function() {
    console.log(views, `node is runing...${3333}`);
  });
