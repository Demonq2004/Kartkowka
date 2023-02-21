const sqlite = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite.Database(DBSOURCE, (err) =>{
    if(err){
        console.log(err.message);
        throw err;
    }else{
        //console.log("Dodano baze danych");
        db.run(`CREATE TABLE Kontakt(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            imie text,
            nazwisko text,
            email text,
            zawod text,
            hobby text
        )
        `, (err)=>{
            if(err){
                //console.log("Baza istnieje");
            }else{
                console.log("Dodano")
                let sql = "INSERT INTO Kontakt (imie,nazwisko,email,zawod,hobby) VALUES ('Dawid','Grzegorzek','dawidg2004@o2.pl','Uczen','Plywanie'), ('Max','Rembiasz','maxr@o2.pl','Uczen','Pizza'), ('Artur','Wybranczyk','arturko123@o2.pl','Tro','Komputer')";
                db.run(sql);
            }
        });

        db.run(`CREATE TABLE Programowanie(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nazwa text,
            opis text
        )
        `, (err)=>{
            if(err){
                //console.log("Baza istnieje");
            }else{
                let sql = "INSERT INTO Programowanie (nazwa,opis) VALUES ('C++','Fajny jezyk'), ('C#','Nie fajny jezyk')";
                db.run(sql);


                console.log("Dodano")
            }
        });

    }
});

module.exports = db;