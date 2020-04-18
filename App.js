var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var passwordHash = require('password-hash');
var cookieSession = require('cookie-session');
var app = express();

const urlencodedParser = bodyParser.urlencoded({extended:false});

let db = new sqlite3.Database("my.db")

 // db.run(`
 //     CREATE TABLE Users (
 // 	id integer PRIMARY KEY AUTOINCREMENT,
 // 	username text,
 // 	pasword_hash text
 // );
 // 	`)

 // db.close();
db.run(`INSERT INTO Users (username,pasword_hash) VALUES ('75234','sha1$5ecb5529$1$e4998eef1dfd41709195ce484a807f27aba3832a')`);

app.set('views', './views')
app.set('view engine', 'pug')

app.use(cookieSession({
   name:'session',
   keys:['key1','key2']
	}))


app.get('/register', urlencodedParser, function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.post('/register', urlencodedParser, function(req, res){
	if(!req.body){
		return res.sendStatus(400);
	}

	res.sendStatus(200);
});
                                          
app.get('/posts', urlencodedParser, 
function(req, res, next){
	res.sendFile(__dirname + "/posts.html");
    next();
},
function(req,res){
	res.redirect('/all');
}
);

app.post('/posts', urlencodedParser, function(req, res){
	if(!req.body){
		return res.sendStatus(400);
	}

	var ttl = req.body.title
    var txt = req.body.text

    db.run(`INSERT INTO Posts (title,text) VALUES ('${ttl}','${txt}')`);

	res.sendStatus(200);
});


app.get('/p', urlencodedParser, function(req, res){
	let id = req.query.id;

	sql = `SELECT * FROM Posts WHERE id=${id}`;
    db.each(sql, function(err,row){
    	let title = row.title
    	let text = row.text
  
		res.send(`
	     <h2>${title}</h2>
	     <h3><i>${id}</i></h3>
	     <hr>
	     <p>${text}</p>
		`);
	});
});



app.get('/', function (req, res) {
	let a = "QWERTY"
	res.send(`
		<h1>Hello!</h1>
		<ul>
			<li>`+a+`</li>
			<li>`+2+99+`<li>
			<li>`+3+90+`<li>
		</ul>
		`);
});


app.get('/second', function (req, res){
	res.send(`
		<script type="text/javascript">
			alert("Hello");
		</script>
		`);
})

app.get('/site', function (req, res) {
	var name = "Hey";
	var text = "azaazazazazazazazazazazazazazazaaz"
	var a = "John"

	res.render('index', {title:'Article', name: name, text: text, author: a})
});

app.get('/user', function(req, res){
	let id = req.query.id;
	// res.send("User"+id);

    users = {
    	"1": {
    		"name":"John",
    		"age":123
    	},
    	"2": {
    		"name":"Bob",
    		"age":321
    	}
    };

    res.send("User "+users[id]['name']+
    	" age= "+users[id]["age"]);
});


app.get('/tev', urlencodedParser,function(req,res){
	res.sendFile(__dirname + "/тевтонскиийорден.html");
});
app.post('/year', urlencodedParser, function(req, res){
	if(!req.body){
		return res.sendStatus(400);
	}

	yrs = {
		"1242":{
			"соб":"Ледовое побоище",
			"опис":"Первое сражение между силами тевтонского орден и новгородской республикой."
		},
        "1380":{
            "соб":"Битва на куликовском поле",
            "опис":"Битва обьединёных русских княжеств во главе с князем великого Московского княжества Дмитрия Донского против части Золотой Орды во главе с Мамаем."
        }



	};
	y = req.body.year;
	t = yrs[y]["соб"];
	d = yrs[y]["опис"];
	
	res.render('index', {title: req.body.year, name: t, text: d, author: "Морзов Георгий"})
});



app.get('/all', function(req, res){
	let page = ""
	sql = `SELECT * FROM Posts`;
    db.each(sql, function(err,row){
    	let title = row.title
    	let text = row.text
        console.log(title)

     page +=`<h2>${title}</h2><hr>
		`
	});
	res.send(page);
});


app.get('/login', urlencodedParser, function(req, res){
	res.sendFile(__dirname + "/login.html");
});

app.post('/login', urlencodedParser, function(req, res){
	if(!req.body){
		return res.sendStatus(400);
	}

	var l = req.body.login
    var p = req.body.password
    console.log(l+":"+p)
    console.log(passwordHash.generate(p));

	sql = `SELECT * FROM Users WHERE username=${l}`;
    db.each(sql, function(err,row){
    if(passwordHash.verify(p,row.pasword_hash)) {
    	console.log("Good")
    }
    else{
    	console.log("Bad")
    }
  });
    res.sendStatus(200);
});

app.get('/whoami', urlencodedParser, function(req, res){
	if(req.session.auth){
		res.send("Вы вошли!")
	}
	else{
		res.send("Вы не вошли! :(")
	}
});


app.listen(3000, function () {
	console.log('I am alive! On 3000');
});


const urlencodedParser = bodyParser.urlencoded({extended:false});

let db = new sqlite3.Database("my.db")

 // db.run(`
 //     CREATE TABLE Users (
 // 	id integer PRIMARY KEY AUTOINCREMENT,
 // 	username text,
 // 	pasword_hash text
 // );
 // 	`)

 // db.close();
db.run(`INSERT INTO Users (username,pasword_hash) VALUES ('75234','sha1$5ecb5529$1$e4998eef1dfd41709195ce484a807f27aba3832a')`);

app.set('views', './views')
app.set('view engine', 'pug')

app.use(cookieSession({
   name:'session',
   keys:['key1','key2']
	}))


app.get('/register', urlencodedParser, function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.post('/register', urlencodedParser, function(req, res){
	if(!req.body){
		return res.sendStatus(400);
	}

	res.sendStatus(200);
});
                                          
app.get('/posts', urlencodedParser, 
function(req, res, next){
	res.sendFile(__dirname + "/posts.html");
    next();
},
function(req,res){
	res.redirect('/all');
}
);

app.post('/posts', urlencodedParser, function(req, res){
	if(!req.body){
		return res.sendStatus(400);
	}

	var ttl = req.body.title
    var txt = req.body.text

    db.run(`INSERT INTO Posts (title,text) VALUES ('${ttl}','${txt}')`);

	res.sendStatus(200);
});


app.get('/p', urlencodedParser, function(req, res){
	let id = req.query.id;

	sql = `SELECT * FROM Posts WHERE id=${id}`;
    db.each(sql, function(err,row){
    	let title = row.title
    	let text = row.text
  
		res.send(`
	     <h2>${title}</h2>
	     <h3><i>${id}</i></h3>
	     <hr>
	     <p>${text}</p>
		`);
	});
});



app.get('/', function (req, res) {
	let a = "QWERTY"
	res.send(`
		<h1>Hello!</h1>
		<ul>
			<li>`+a+`</li>
			<li>`+2+99+`<li>
			<li>`+3+90+`<li>
		</ul>
		`);
});


app.get('/second', function (req, res){
	res.send(`
		<script type="text/javascript">
			alert("Hello");
		</script>
		`);
})

app.get('/site', function (req, res) {
	var name = "Hey";
	var text = "azaazazazazazazazazazazazazazazaaz"
	var a = "John"

	res.render('index', {title:'Article', name: name, text: text, author: a})
});

app.get('/user', function(req, res){
	let id = req.query.id;
	// res.send("User"+id);

    users = {
    	"1": {
    		"name":"John",
    		"age":123
    	},
    	"2": {
    		"name":"Bob",
    		"age":321
    	}
    };

    res.send("User "+users[id]['name']+
    	" age= "+users[id]["age"]);
});


app.get('/tev', urlencodedParser,function(req,res){
	res.sendFile(__dirname + "/тевтонскиийорден.html");
});
app.post('/year', urlencodedParser, function(req, res){
	if(!req.body){
		return res.sendStatus(400);
	}

	yrs = {
		"1242":{
			"соб":"Ледовое побоище",
			"опис":"Первое сражение между силами тевтонского орден и новгородской республикой."
		},
        "1380":{
            "соб":"Битва на куликовском поле",
            "опис":"Битва обьединёных русских княжеств во главе с князем великого Московского княжества Дмитрия Донского против части Золотой Орды во главе с Мамаем."
        }



	};
	y = req.body.year;
	t = yrs[y]["соб"];
	d = yrs[y]["опис"];
	
	res.render('index', {title: req.body.year, name: t, text: d, author: "Морзов Георгий"})
});



app.get('/all', function(req, res){
	let page = ""
	sql = `SELECT * FROM Posts`;
    db.each(sql, function(err,row){
    	let title = row.title
    	let text = row.text
        console.log(title)

     page +=`<h2>${title}</h2><hr>
		`
	});
	res.send(page);
});


app.get('/login', urlencodedParser, function(req, res){
	res.sendFile(__dirname + "/login.html");
});

app.post('/login', urlencodedParser, function(req, res){
	if(!req.body){
		return res.sendStatus(400);
	}

	var l = req.body.login
    var p = req.body.password
    console.log(l+":"+p)
    console.log(passwordHash.generate(p));

	sql = `SELECT * FROM Users WHERE username=${l}`;
    db.each(sql, function(err,row){
    if(passwordHash.verify(p,row.pasword_hash)) {
    	console.log("Good")
    }
    else{
    	console.log("Bad")
    }
  });
    res.sendStatus(200);
});

app.get('/whoami', urlencodedParser, function(req, res){
	if(req.session.auth){
		res.send("Вы вошли!")
	}
	else{
		res.send("Вы не вошли! :(")
	}
});


app.listen(3000, function () {
	console.log('I am alive! On 3000');
});
