var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser");
    port            = 4000;

var todosRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile("index.html");
});

app.use('/api/todos', todosRoutes);


app.listen(port, function(){
    console.log("Esta vivo!")
})
