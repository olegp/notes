var Application = require("stick").Application;

var app = exports.app = Application();
app.configure("notfound", "error", "static", "params", "mount");
app.static(resolve(module, "public"));
app.mount("/", require("./actions"));
