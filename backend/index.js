const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const Jwt = require('jsonwebtoken');

const jwtkey = process.env.JWT_KEY

const app = express();

const url = 8000;

app.listen(url, ()=>{
     console.log(`server is listening at: http://localhost:${url}`)
});

app.use(express.json());
app.use(cors());

app.post('/signup', async (req,res)=>{
    const data = new User(req.body)
    let result = await data.save()
    result = result.toObject();
    delete result.password
    Jwt.sign({result},jwtkey,{},(err,token)=>{
        if(err){
            res.send({result:'something went wrong'})
        }
        res.send({result, auth: token})
    })
});

app.post('/login', async (req,res)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select('-password')
        if(user){
            Jwt.sign({user},jwtkey,{},(err,token)=>{
                if(err){
                    res.send({result:'something went wrong'})
                }
                res.send({user, auth: token})
            })
        }
        else{
            res.send({result:'No User found'})
        }
    }
    else{
        res.send({result:'No User found'})
    }   
});

app.post('/addproduct', verifyToken, async (req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
});

app.get('/product', verifyToken, async (req,res) =>{
    let product = await Product.find();
    if(product.length>0){
        res.send(product)
    }
    else{
        res.send({result:'No Products found'})
    }
});

app.delete('/products/:_id', verifyToken, async (req,res)=>{
    const result = await Product.deleteOne({_id:req.params._id});
    res.send(result);
});

app.get('/products/:_id', verifyToken, async (req, res)=>{
    let result = await Product.findOne({_id: req.params._id});
    if(result){
        res.send(result)
    } else{
        res.send({'result':'No Records found'})
    }    
});

app.put('/product/:_id', verifyToken, async (req, res)=>{
    let result = await Product.updateOne(
        {_id: req.params._id},
        {
            $set : req.body
        }
    )
    res.send(result)
});

app.get('/search/:key', verifyToken, async (req,res)=>{
    let result = await Product.find({
        '$or':[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
        ]
    })
    res.send(result);
});

function verifyToken (req, res, next){
   let token = req.headers['authorization'];
    if(token){
       token = token.split(' ')[1]
       Jwt.verify(token, jwtkey, (err, valid)=>{
              if(err){
                res.status(404).send({result : 'Please provide valid token with header'})
              } else{
                next();
              }
       })
    } else{
      res.status(403).send({result : 'Please add token with header'})
    }
}
