const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());

const port = 3000 || 3000;

app.use(bodyParser.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'srv1107.hstgr.io',
    user: 'u391940495_jsww',
    password: 'Prabhu@985',
    database: 'u391940495_jsww',
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
  });

  app.get('/',(req,res)=>{
    res.json({
        status:200,
        data:"Welcome to JSWW Ministries"
    })
  })

app.get('/api/users',(req,res)=>{
    pool.query(`select * from users`,(err,results)=>{

        if(err){
            res.json({
                status:500,
                error:"Internal Server Error"
            })
        }else{
           res.json({
            status:200,
            data:results
           })
        }
    })
});

app.post('/api/insertusers',(req,res)=>{

    const data=req.body;
    pool.query(`insert into users (name,username,password) values (?,?,?)`,[data.name,data.username,data.password],(err,results)=>{
        if(err)
        {
            res.json({
                status:500,
                error:"Unable to insert the data "
            })
        }else{
            res.json({
                status:200,
                message:"Data Submitted Successfully"
            })
        }
    })
});

app.put('/api/updateusers/:id',(req,res)=>{
    const data=req.body;
    const id=req.params.id;
    pool.query(`update users set name=?,username=?,password=? where id=? `,[data.name,data.username,data.password,id],(err,results)=>{
        console.log(err)
        if(err)
        {
            res.json({
                status:500,
                error:"Internal Server Error"
            })
        }else{
            res.json({
                status:200,
                message:"Data Updated Successfully"
            })
        }
    })
});

app.delete('/api/deleteusers/:id',(req,res)=>{
    const id=req.params.id;
    pool.query(`delete from users where id=?`,[id],(err,results)=>{
        if(err)
        {
            res.json({
                status:500,
                error:"Unable to delete the data"
            })
        }else{
            res.json({
                status:200,
                data:"User Deleted Successfully"
            })
        }
    })
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    // Execute a SQL query to check if the user exists and the password is correct
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    pool.query(sql, [username, password], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          error: "Internal server error"
        });
      }
  
      if (results.length === 0) {
        return res.status(401).json({
          error: "Invalid username and password"
        });
      }
  
      // Return a success response indicating successful login
      res.json({
        message: "Login successful",
        user: results[0] 
      });
    });
  });
  



app.post('/api/social/socialservice',(req,res)=>{
    const data=req.body;
    pool.query(`insert into social (title,description,location,date) values (?,?,?,?)`,[data.title,data.description,data.location,data.date],(err,results)=>{
        if(err)
        {
            res.json({
                status:500,
                error:"Unable to Insert data"
            })
        }else{
            res.json({
                status:200,
                message:"Data Submitted Successfully"
            })
        }
    })
});

app.put('/api/social/updatesocial/:id',(req,res)=>{
    const data=req.body;
    const id=req.params.id;
    pool.query(`update social set title=?,description=?,location=?,date=? where id=?`,[data.title,data.description,data.location,data.date,id],(err,results)=>{
        if(err)
        {
            res.json({
                status:500,
                error:"Unable to update the data please contact prabhuteja"
            })
        }else{
            res.json({
                status:200,
                message:"Data Updated Successfully"
            })
        }
    })
});

app.get('/api/social',(req,res)=>{
    pool.query(`select * from social`,(err,results)=>{
        if(err)
        {
            res.json({
                status:500,
                error:"Unable to get data"
            })
        }else{
            res.json({
                status:200,
                data:results
            })
        }
    })
});

app.delete('/api/socialdelete/:id',(req,res)=>{
    const id=req.params.id;
    pool.query(`delete from social where id=${id}`,(err,results)=>{
        if(err){
            console.log(err)
            res.send("Unable to delete data")
        }else{
            res.json({
                    status:200,
                    message:"Deleted Successfully"
            })
        }
    })
})

app.post('/api/createprofile',(req,res)=>{
    const data=req.body;
    pool.query(`insert into profile (email,phone,address) values (?,?,?)`,[data.email,data.phone,data.address],(err,results)=>{
        if(err)
        {
            res.json({
                status:500,
                error:"Unable to update data"
            })
        }else{
            res.json({
                status:200,
                message:"Data Submitted Successfully "
            })
        }
    })
})
app.get('/api/profile',(req,res)=>{
    pool.query(`select * from profile`,(err,results)=>{
        if(err)
        {
            res.json({
                status:500,
                error:"Unable to get data"
            })
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
});

app.post('/api/aboutfoundation',(req,res)=>{
    const data=req.body;
    pool.query(`insert into about (title,description) values (?,?)`,[data.title,data.description],(err,results)=>{
        if(err)
        {
            console.log(err)
            res.json({
                
                status:500,
                error:"Unable to insert data"
            })
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
})
app.get('/api/foundation',(req,res)=>{
    pool.query(`select * from about`,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.send("unable to get data")
        }
        else{
            res.json({
                message:results
            })
        }
    })
})

app.put('/api/updatefoundation/:id',(req,res)=>{
    pool.query(`update about set title='${req.body.title}', description='${req.body.description}' where id=${req.params.id}`,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.send("Unable to update data")
        }else{
            res.json({
                message:results
            })
        }
    })
});

app.delete('/api/deletefoundation/:id',(req,res)=>{
    pool.query(`delete from about where id=${req.params.id}`,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.send("Unable to delete data")
        }else{
            res.json({
                message:results
            })
        }
    })
})
app.post('/api/createcontact',(req,res)=>{
    const data=req.body;
    pool.query(`insert into contactus (message,name,email,subject) values (?,?,?,?)`,[data.message,data.name,data.email,data.subject],(err,results)=>{
        if(err)
        {
            res.json({
                status:500,
                error:"Unable to insert data"
            })
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
})
app.get('/api/contact',(req,res)=>{
    pool.query(`select * from contactus`,(err,results)=>{
        if(err)
        {
            res.json({
                status:500,
                error:"Unable to get data"
            })
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
})

app.post('/api/createtestimonal',(req,res)=>{
    
    pool.query(`insert into testimonal (title) values (?)`,[req.body.title],(err,results)=>{
        if(err)
        {
            res.json({
                status:500,
                error:"Unable to update data"
            })
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
});

app.post('/api/createbank',(req,res)=>{
    pool.query(`insert into bank (name,ifsc,bankname,branch,accountno) values (?,?,?,?,?)`,[req.body.name,req.body.ifsc,req.body.bankname,req.body.branch,req.body.accountno],(err,results)=>{
        if(err)
        {
            console.log(err);
            res.send("Unable to insert the data")
        }else{
            res.json({
                status:200,
                message:"Bank Details Created Successfully"
            })
        }
    })
});

app.get('/api/bank',(req,res)=>{
    pool.query(`select * from bank`,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.status(500).send("Unable to getdata")
        }else{
            res.json({
                status:200,
                message:results
            })
        }

    })
});

app.put('/api/editbank/:id',(req,res)=>{
    pool.query(`UPDATE bank SET name='${req.body.name}', ifsc='${req.body.ifsc}', bankname='${req.body.bankname}', branch='${req.body.branch}', accountno='${req.body.accountno}' WHERE id=${req.params.id}`,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.status(500).send("Unable to update data")
        }else{
            res.json({
                status:200,
                message:"Bank Details Updated Successfully"
            })
        }
    })
})

app.delete('/api/deletebank/:id',(req,res)=>{
    pool.query(`delete from bank where id='${req.params.id}'`,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.status(500).send("Unable to delete data")
        }else{
            res.json({
                status:200,
                message:"Bank Details Deleted Successfully",

            })
        }
    })
});

app.post('/api/createonline',(req,res)=>{
    pool.query(`insert into onlinepayment (phonepe, googlepe, paytm) values (?,?,?)`,[req.body.phonepe, req.body.googlepe, req.body.paytm],(err,results)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send("Unable to insert data")
        }else{
            res.json({
                status:200,
                message:"Online Payment Created Successfully"
            })
        }
    })
});

app.get('/api/onlinepayment',(req,res)=>{
    pool.query(`select * from onlinepayment`,(err,results)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send("Unable to get data")
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
});

app.put('/api/updateonline/:id',(req,res)=>{
    pool.query(`update onlinepayment set phonepe='${req.body.phonepe}', googlepe='${req.body.googlepe}', paytm='${req.body.paytm}' where id=${req.params.id}`,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.status(500).send("Unable to update data")
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
});

app.delete('/api/deleteonline/:id',(req,res)=>{
    pool.query(`delete from onlinepayment where id=${req.params.id}`,(onlineerr,onlinecorrect)=>{
        if(onlineerr)
        {
            console.log(onlineerr)
            res.send("Unable to delete data")
        }else{
            res.json({
                status:200,
                message:onlinecorrect
            })
        }
    })
});

app.post('/api/createsocialmedia',(req,res)=>{
    pool.query(`insert into socialmedia (facebook,youtube,twitter,linkedin,google) values (?,?,?,?,?)`,[req.body.facebook,req.body.youtube,req.body.twitter,req.body.linkedin,req.body.google],(err,results)=>{
        if(err)
        {
            console.log(err)
            res.status(500).send("Unable to Insert Data")
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
});

app.get('/api/getsocialmedia',(req,res)=>{
    pool.query(`select * from socialmedia`,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.status(500).send("Unable to Get Data")
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
});

app.put('/api/updatesocialmedia/:id',(req,res)=>{
    pool.query(`update socialmedia set facebook='${req.body.facebook}', youtube='${req.body.youtube}', twitter='${req.body.twitter}', linkedin='${req.body.linkedin}', google='${req.body.google}' where id=${req.params.id}`,(err,results)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send("Unable to update data")
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
})

app.delete('/api/deletesocialmedia/:id',(req,res)=>{
    pool.query(`delete from socialmedia where id=${req.params.id}`,(err,results)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send("Unable to delete data")
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
});

app.post('/api/createcauses',(req,res)=>{
    pool.query(`insert into causes (title,description) values (?,?)`,[req.body.title,req.body.description],(err,results)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send("Unable to insert data")
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
});

app.put('/api/updatecauses',(req,res)=>{
    pool.query(`update causes set title='${req.body.title}', description='${req.body.description}'`,(err,results)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send("Unable to Update Data")
        }else{
            res.send({message:"Data Updated Successfully"})
        }
    })
})

app.get('/api/causes',(req,res)=>{
    pool.query(`select * from causes`,(err,results)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send("Unable to get data")
        }
        else{
           res.send({data:results})
        }
    })
});

app.delete('/api/deletecauses/:id',(req,res)=>{
    pool.query(`delete from causes where id=${req.params.id}`,(err,results)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send("Unable to delete data")
        }else{
            console.log(results)
            res.send({data:results})
        }
    })
})

app.post('/api/createevents',(req,res)=>{
    pool.query(`insert into updates (title,description,date) values (?,?,?)`,[req.body.title,req.body.description,req.body.date],(err,res)=>{
        if(err)
        {
            console.log(err);
            res.status
        }else{
            res.json({
                message:results
            })
        }
    })
});


app.post('/api/createactivity',(req,res)=>{
    pool.query(`insert into activity (activities, description) values(?,?)`,[req.body.activities, req.body.description],(err,results)=>{
        if(err)
        {
            console.log(err)
            res.send("Unable to insert data")
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
});


app.get('/api/acitivity',(req,res)=>{
    pool.query(`select * from activity`,(err,results)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send("Unable to get data")
        }
        else{
           res.send({data:results})
        }
    })
});

app.post('/api/createmain',(req,res)=>{
    pool.query(`insert into main (title,description) values (?,?)`,[req.body.title,req.body.description],(err,results)=>{
        if(err)
        {
            console.log(err)
            res.send("Unable to insert data")
        }else{
            res.json({
                data:results
            })
        }
    })
});

app.get('/api/main',(req,res)=>{
    pool.query(`select * from main `,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.send("Unable to get data")
        }else{
            res.json({
                data:results
            })
        }
    })
});

app.put('/api/updatemain/:id',(req,res)=>{
    pool.query(`update main set title='${req.body.title}', description='${req.body.description}' where id=${req.params.id}`,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.send("Unable to update data")
        }else{
            res.json({
                message:results
            })
        }
    })
})

app.post('/api/createcon',(req,res)=>{
    pool.query(`insert into contact (address,email,phone) values (?,?,?)`,[req.body.address,req.body.email,req.body.phone],(err,results)=>{
        if(err)
        {
            console.log(err);
            res.send("Unable to insert data")
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
})

app.get('/api/contacts',(req,res)=>{
    pool.query(`select * from contact`,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.send("Unable to get data")
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
});

app.post('/api/createfounders',(req,res)=>{
    pool.query(`insert into founders (name,designation) values (?,?)`,[req.body.name,req.body.designation],(err,results)=>{

        if(err)
        {
            console.log(err);
            res.send("Unable to insert data")
        }else{
            res.json({
                status:200,
                data:results
            })
        }
    })
});

app.get('/api/founders',(req,res)=>{
    pool.query(`select * from founders`,(err,results)=>{
        if(err)
        {
            res.json({
                status:500,
                error:"Internal Server Error"
            })
        }else{
            res.json({
                status:200,
                data:results
            })
        }
    })
})

app.put('/api/updatefounders/:id',(req,res)=>{
    pool.query(`update founders set name='${req.body.name}', designation='${req.body.designation}' where id=${req.params.id}`,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.send("unable to update data")
        }else{
            res.json({
                status:200,
                data:results
            })
        }
    })
});

app.delete('/api/deletefounders/:id',(req,res)=>{
    pool.query(`delete from founders where id=${req.params.id}`,(err,results)=>{
        if(err)
        {
            console.log(err)
            res.send("Unable to delete data")
        }else{
            res.json({
                status:200,
                data:results
                
            })
        }
    })
});

app.post('/api/createblog',(req,res)=>{
    pool.query(`insert into blog (title,description,second_description,bible_verse,idmatch) values (?,?,?,?)`,[req.body.title,req.body.description,req.body.second_description,req.body.bible_verse,req.body.idmatch],(err,results)=>{
        if(err)
        {
            console.log(err)
            res.send("Unable to insert data")
        }else{
            res.json({
                status:200,
                message:results
            })
        }
    })
})
app.get('/api/blog/:title',(req,res)=>{
    pool.query(`select * from blog where idmatch='${req.params.title}'`,(err,results)=>{
        if(err)
        {
            console.log(err);
            res.send("Unable to get data")
        }else{
            console.log(results),
            res.json({
                status:200,
                message:results,
                
            })
        }
    })
})

app.post('/api/createnav',(req,res)=>{
    pool.query(`insert into nav (home,about,social,gallery,videos) values (?,?,?,?,?)`,[req.body.home,req.body.about,req.body.social,req.body.gallery,req.body.videos],(err,results)=>{
        if(err)
        {
            console.log(err)
            res.send("Unable to insert data")
        }else{
            res.send({message:results})
        }
    })
})





app.listen(port, () => {
    console.log(`Server Running up and started on ${port}`);
    
  });
