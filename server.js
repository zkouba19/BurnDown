console.log('made it to the server')
var express  = require('express'),
    bp       = require('body-parser'),
    path     = require('path'),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();
require('./server/config/mongoose.js')
app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));
app.use(bp.json());
require("./server/config/routes.js")(app);
app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});