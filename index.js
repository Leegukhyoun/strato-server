const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
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

app.post('/userlogin', async (req, res)=>{

    const {name, birth} =  req.body;
    connection.query(
        //userId로 값을 찾는데 값의 컬럼 이름을 result로 받음. 컬럼에 나오는 결과값은 userId의 개수
        `select * from members where name = '${name}'`,
        (err, row) => {
            const result = row[0];
            //에러가 나지 않았을 때(정상적으로 값을 받아왔을 때)
            if(!err){
                if(!result){
                    res.send('id is undefined');
                    console.log(res);
                }else{
                    if(birth !== result.birth){
                        res.send('pw is undefined');
                        console.log(res);
                    }else{
                        res.send('login successed');
                        console.log(res);
                        sessionStorage.setItem("login", name);
                    }
                }
            }else{
                console.log(err);
            }
            
        }
    )
})

//요청 작성 종료

app.listen(port, ()=>{
    console.log("스트라토 서버가 돌아가고 있습니다.");
})