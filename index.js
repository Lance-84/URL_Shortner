let Express = require("express");
let app = Express();
let port = 3000
let bodyParser = require("body-parser")

let arr = {};
let i = 0;

function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
  
app.use(Express.static(__dirname));
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html");
})

app.post("/api/shorturl", function(req, res) {
    if(isValidUrl(req.body.url)) {
      i++;
      arr[i] = req.body.url;
      res.json({"original_url": req.body.url, "shorturl": i});
    }
    else {
      res.json({"error": "Invalid URL"});
    }
})

app.get("/api/shorturl/:urlno", function(req, res) {
  if(arr.hasOwnProperty(req.params.urlno)) {
    res.redirect(arr[req.params.urlno]);
  }
  res.json({"error": "not a valid shorturl"})
})

app.listen(port, function() {
    console.log("Server has been started on port: "+port);
})