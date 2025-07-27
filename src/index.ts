import {Client} from "pg";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json())
const pgClient = new Client(process.env.PG_URL)
//Avoiding SQL injection
app.post("/user",async (req,res)=>{

     await pgClient.connect();
    const {username , password,email }= req.body;

    

    const insertQuery = `INSERT INTO users(username , email ,password) VALUES ($1,$2,$3);`
    const response = await pgClient.query(insertQuery,[username,email,password]);
    console.log(response.rows);

    res.send({
        msg:"Saved Credentials"
    })
    
})


async function main() {
    await pgClient.connect();
    const response = await pgClient.query("SELECT * FROM users")
    console.log(response.rows);
    
}



async function main2() {
    await pgClient.connect();

    const insertQuery = `INSERT INTO users(username , email ,password)`
    const response = await pgClient.query(insertQuery);
    console.log(response.rows);
    
}


// main()
app.listen(3000);
