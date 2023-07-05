const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination:(req , file, cb) => {
        cb(null , './upload/');
    },
    filename:(req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage:storage});


// const upload = multer({dest:'uploads/'});

// database
// Database
mongoose
  .connect("mongodb://127.0.0.1:27017/multiple_images", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the MongoDB server");
  })
  .catch((error) => {
    console.error("Error connecting to the MongoDB server:", error);
  });

const ProductSchema = mongoose.Schema({
    name:{type:String},
    price:{type:Number},
    description:{type:String},
    quantity:{type:Number},
    images:{type:Array},
},{
    timestamps:true,
})

const ProductModel = mongoose.model("product", ProductSchema);

// adding the product to database;
app.post("/api/uploads" , upload.array("images" , 10), async(req, res) =>{
    const {name, price, description , quantity} = req.body;
    const images = req.files.map((file) => file.filename);

    const product = new ProductModel({
        name,
        price,
        description,
        quantity,
        images,
    });

    const result = await product.save();

    if(result){
        res.status(200).send(result);
    }
    else{
        res.send(400).json({"error":"unable to upload files"});
    }
})

app.get("/", async(req, res) => {
  const data = await ProductModel.find();
  if(data){
    res.send(data);
  }
});


app.listen(5000, () => console.log("server is running in port 5000"));