var mongoose=require('mongoose');
//'mongodb://localhost:27017/task_manager',
//'mongodb://ramtask:Rahul1402@ds163630.mlab.com:63630/task_manager'
//mongodb://ramtask:Rahul1402@ds163630.mlab.com:63630/task_manager
mongoose.connect('mongodb://localhost:27017/project_manager' ,{ useNewUrlParser: true }, function(err){
    if(!!err){
        console.log("not able to connection");
        console.error(err);
    } else {
        console.log("Connection established successfully..");
    }
});
