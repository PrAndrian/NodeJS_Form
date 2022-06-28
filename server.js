// import http from 'http';
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    //blank
    // if(req.url=='/'){
    //     res.writeHead(200, {'Content-type':'text/html'});
    //     res.write("<html><body><p>COOL Landing page</p></body></html>");
    //     res.end;
    // }else if (req.url =='/student'){
    //     res.write("<html><body><p>COOL Student</p></body></html>");
    //     res.end;
    // }else if (req.url =='/admin'){
    //     res.write("<html><body><p>COOL Admin</p></body></html>");
    //     res.end;
    // }else{
    //     res.end("Invalid Request !")
    // }


    if(req.url=='/data'){
        res.writeHead(200, {'Content-Type':'application/json'});
        res.write(JSON.stringify({message: 'Hello World'}));
        res.end();
    }else if (req.url=='/file'){
        fs.writeFile("TestFile.txt","Hello the world :3",function(err){
            if(err) throw err
            else 
            console.log("Write success!");
        })
        fs.appendFile("TestFile.txt","Hello the world :3",function(err){
            if(err) throw err
            else 
            console.log("Append success!");
        })
        // fs.readFile("TestFile.txt","utf8",function(err, data){
        //     if(err) throw err
        //     console.log(data);
        // })
        
    }


})

server.listen(5000)

console.log('Run serveur...')