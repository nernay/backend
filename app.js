// this type of development is called as full stack development
// front-end , back

// express it's a web frame work application 
// importing all the important liberaries
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const mysql = require('mysql');
// creating database
const db = mysql.createPool({
    host: 'localhost',
    user:  'root',
    password: '',
    database: 'cruddb',
})
//middle ware 
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
// middle ware 

// this part is used to display the data from the sql table we can use this to send to the front end 
// of the front end page we have
// important error
app.get('/api/get',(req,res)=> {
    const sqlSelect = 
    "SELECT * FROM movie_reviews";
    db.query(sqlSelect,(err, result) => {
        // display the result in the console
        // it will send data in the front 
        console.log(result);
        res.send(result);
    });
});

// this part is used for inserting the data in sql table
app.post('/api/insert',(req,res)=> {
    console.log(req.body);
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = "INSERT INTO movie_reviews (movie , movie_reviews) VALUES (?,?)";
    db.query(sqlInsert ,[movieName, movieReview] , (err, result) => {
        // 
        res.send(result)

    });
});

// this is the api for the delete button api end point
app.delete(`/api/delete/:movie`, (req , res) => {
    const id = req.params.movie;
    const sqlDelete =
     "DELETE FROM movie_reviews WHERE id = ?";
    db.query( sqlDelete , id , (err,result) =>{
        res.send(result);

    });
});
// adding an update api in to get the update from
app.put('/api/update',(req,res) => {
    console.log(req.body)
    let movieid = req.body.movieid;
    let movieName = req.body.movieName;
    let movieReview = req.body.movieReview;
    const sqlUpdate = `UPDATE movie_reviews SET movie = '${movieName}' , movie_reviews = '${movieReview}' WHERE id = '${movieid}'`
    db.query(sqlUpdate, (err,result)=> {
        if (err) console.log(err)
        res.send(result)
    })
    // const name = req.params.movieName;
    // const review = req.body.movieReview;
    // const sqlUpdate = "UPDATE SET movie_reviews (movie , movie_reviews) VALUES (?,?) "

    // db.query(sqlUpdate, [review,name] , (err,  result) => {
    //     if (err) console.log(err);
    // });
    
});
// and we have to add the update button in the
// important this part used identify the port number on which data is getting displayed we have
app.listen('3001', () => {
    console.log("Running on port 3001");
})

