var express = require('express'),
	zerver  = require('zerver');

var app = express();

app.use( zerver.middleware() );
app.use( express.static(__dirname + '/') );

app.use(express.cookieParser('keyboard cat'));

// Populates req.session
app.use(express.session());

app.listen(3000);