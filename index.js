const express = require("express");
const db = require("./database.js");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'pug')

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html")
});

app.get("/kalkulator", (req,res)=>{
    res.render('kalkulator', { title: 'Kalkulator', wynikD: "",wynikK: "" });
})

app.post("/kalkulator", (req,res)=>{
    if(req.body.dzul != null){
        console.log("Dzule");
        let dzule = parseInt(req.body.dzul);
        let wynik = dzule *  0.0002388458966275;
        res.render('kalkulator', { title: 'Kalkulator', wynikD: "Wynik: "+wynik+"Kcal", wynikK: "" });


    }else if(req.body.kcal != null){
        console.log("Kcal");
        let kcal = parseInt(req.body.kcal);
        let wynik = kcal *  4186.8;
        res.render('kalkulator', { title: 'Kalkulator', wynikD: "", wynikK:"Wynik: "+wynik+" J" });
    }

})

app.get("/programowanie",(req,res)=>{
    let sql="SELECT * FROM Programowanie";
    let params = [];
    db.all(sql,params, (err,rows)=>{
        if(err){
            console.log("Błąd");
            return
        }
        let programowanie = rows;
        let link = "/programowanie/";
        res.render('programowanie', { title: 'Programowanie', programowanie: programowanie, link: link });

    })
})

app.get("/programowanie/:id",(req,res)=>{
    let sql="SELECT * FROM Programowanie WHERE id = ?";
    let params = [req.params.id];
    db.all(sql,params, (err,row)=>{
        if(err){
            console.log("Błąd");
            return
        }
        
        res.json(row);
        //res.render('programowaniePojedyncze', {nazwa: row.nazwa, opis: row.opis });

    })
})

app.get("/tatry", (req,res)=>{
    res.render('tatry');
})

app.get("/kontakt",(req,res)=>{
    let sql="SELECT * FROM Kontakt";
    let params = [];
    db.all(sql,params, (err,rows)=>{
        if(err){
            console.log("Błąd");
            return
        }
        res.json(rows);

    })
})

app.listen(3000, ()=>{console.log("Serwer chodzi na porcie 3000")});

