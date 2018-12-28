var express=require('express');
var bodyParser=require('body-parser');
var taskrouter=require('./app/Router/task.router');
var userrouter=require('./app/Router/user.router');
var projectrouter=require('./app/Router/project.router');
var cors=require('cors');

var app=express();
var port=3000;

//For home page access- load the index.html from web folder
app.use("/",express.static('web'));
app.use(bodyParser.json());
app.use(cors());

//for url access with Task , load the task.router

app.use("/api/tasks",taskrouter);
app.use("/api/users",userrouter);
app.use("/api/projects",projectrouter);

app.listen(port,function(err){
if (!!err)
{
    throw err;
}
else
{
    console.log("listening at 3000");
    //Load my DB connection
    require("./app/db/database")
}
})
