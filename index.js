var express    = require("express");
var mongoose   = require("mongoose");
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var app = express();

// DB setting
mongoose.connect(process.env.MONGO_DB); // 1
var db = mongoose.connection;
db.once("open", function(){
 console.log(process.env.MONGO_DB);
});
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// Routes
app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts")); // 1
 
// Port setting
app.listen(3000, function(){
 console.log("server on!");
});
