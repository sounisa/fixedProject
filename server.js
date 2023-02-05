import express from "express";
const app = express();
import {pool} from './db.js';
//import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(express.static("public"));
//ROUTES
app.get('/', (req, res) => {
    res.send(`Welcome to my page`)
});

//GET ALL
app.get('/pokemons', async (req, res) => {
    const {rows} = await pool.query(`select * from pokemons order by id ASC`);
    res.status(200).type('application/JSON').send(rows)
});
//POST 1
app.post('/pokemons', async (req, res) => {
    const {name, type, hp} = req.body
    try {
        const {rows} = await pool.query(`insert into pokemons (name, type, hp) values ('${name}', '${type}', ${hp}) returning *`);
        res.status(201).type('application/JSON').send(rows)
    } catch (error) {
        res.status(404).type('text/plain').send(error.message)
    }


    
});
//GET 1
app.get('/pokemons/:id', async (req, res) => {
    const {id} = req.params //access to params object
    if (isNaN(id)) { //if not a number
        res.status(404).type('text/plain').send('Please Input A Number For The ID') //error
    } else { 
        const {rows} = await pool.query(`select * from pokemons where id = ${id}`);        if (rows.length === 0) { //then if id doesnt exist
            res.status(404).type('text/plain').send('Pokemon Not Found') //error
        } else {
            res.status(200).type('application/JSON').send(rows) //send donut w/that id
        }
    }
});

//UPDATE "PUT" 1
app.put('/pokemons/:id', async (req, res) => {
    const {id} = req.params
    const {name, type, hp} = req.body
    if (isNaN(id)) { //if not a number
        res.status(404).type('text/plain').send('Please Input A Number For The ID') //error
    } else { 
        const {rows} = await pool.query(`update pokemons set name = '${name}',type = '${type}', hp = ${hp} where id = ${id} returning *`);
        if (rows.length === 0) { //then if id doesnt exist
            res.status(404).type('text/plain').send('Pokemon Not Found') //error
        } else {
            res.status(200).type('application/JSON').send(rows) //send donut that was updated
        }
    }
});

//DELETE 1
app.delete('/pokemons/:id', async (req, res) => {
    const {id} =req.params
    if (isNaN(id)) { //if not a number
        res.status(404).type('text/plain').send('Please Input A Number For The ID') //error
    } else { 
    const {rows} = await pool.query(`delete from pokemons where id = ${id} returning *`)
        if (rows.length === 0) { //then if id doesnt exist
            res.status(404).type('text/plain').send('Pokemon Not Found') //error
        } else {
            res.status(200).type('text/plain').send(`This pokemon was deleted ${JSON.stringify(rows)}`) //send donut that was updated
        }
    }
})

//listen for PORT
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`)
});
