var Application = require("stick").Application;
var mongo = new (require("mongo-sync").Server)();

var app = exports.app = Application();
app.configure("params", "route", "render");
app.render.base = resolve(module, "templates");
app.render.master = "page.html";

function get(request) {
	var context = {
		title : "Notes",
		notes : mongo.db("notes").getCollection("notes").find().toArray()
	};
	return app.render("index.html", context);
}

app.get("/", get);

app.post("/", function(request) {
	mongo.db("notes").getCollection("notes").save({
		name : request.params.name
	});
	return get();
});
