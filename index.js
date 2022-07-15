const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mysql = require("mysql");
const fs = require("fs");

const dbinfo = fs.readFileSync('./database.json');

const conf = JSON.parse(dbinfo);

const connection = mysql.createConnection({
    host:conf.host,
    user:conf.user,
    password:conf.password,
    port:conf.port,
    database:conf.database,
});
app.use(express.json());
app.use(cors());

//요청 작성 시작

app.get('/reservation', async (req, res)=> {
    connection.query(
        "select * from reservation",
        (err, rows, fields)=>{
            res.send(rows);
        }
    )
})
app.get('/members', async (req, res)=> {
    connection.query(
        "select * from members",
        (err, rows, fields)=>{
            res.send(rows);
        }
    )
})

app.post('/createRes', async (req, res)=> {
    console.log(req.body);
    connection.query("", (err, rows, fields)=>{
        res.send(rows);
    })
})
app.post('/createMem', async (req, res)=> {
    const { name, phone, birth, gender, addr1, addr2} = req.body;
    connection.query(`insert into members(name, phone, birth, gender, addr1, addr2) values("${name}","${phone}","${birth}","${gender}","${addr1}","${addr2}")`,
    (err, rows, fields)=>{
        res.send(`${name} 회원가입 성공`);
    })
})


//요청 작성 종료

app.listen(port, ()=>{
    console.log("스트라토 서버가 돌아가고 있습니다.");
})