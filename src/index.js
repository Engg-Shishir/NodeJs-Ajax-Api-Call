const express = require("express");
const morgan = require('morgan');
const path = require('path');

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());









//Database
const products =[
   {
      id: 1,
      name: 'Laptop',
   },
   {
       id: 2,
      name: 'Dextop',
   },
   {
      id: 3,
      name: 'Loto',
   },
   {
       id: 4,
      name: 'Bata',
   }
];
//routes
app.get('/products', (req,res)=>{
   res.json(products);
});

app.post('/products', (req,res)=>{
   const {name} = req.body;
   products.push({
      id: products.length + 1,
      name: name
   });
   res.json('Successfully insert');
});

app.delete('/products/:id', function(req, res){
   const { id } = req.params;
   products.forEach((product,i) =>{
     if(product.id == id){
        products.splice(i,1);
        console.log("Deleted Id Is"+ id);
     }
   })
   res.json('Successfully Deleted');
});


app.put('/products/:id', (req,res)=>{
     
   const { id } = req.params;
   const { name } = req.body;
   products.forEach((product,i) =>{
     if(product.id == id){
        console.log('Updated');
     }
   });
   res.json('Successfully Updataed');
});




//static file
app.use(express.static(path.join(__dirname + '/public')));
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
   console.log("server is runnning is on---- http://localhost:"+ PORT);
});

















