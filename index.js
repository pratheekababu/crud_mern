const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/bit")
.then(() => console.log("BIT connected"))
.catch(err => console.log("ERROR",err));

const Person = mongoose.model(
    "Person",new mongoose.Schema({name: String, age: Number}),"students");
app.get("/",async(_req, res) =>
{
    try{
        const people = await Person.find().sort({name: 1});
        res.json(people);
    }catch{
        res.status(500).json({error:e.error});
    }
});
app.post("/",async (req, res) =>
{
    try{
        const people = await Person.create({
            name: req.body.name,
            age: Number(req.body.age)
        });
        res.status(201).json(people);
    }catch{
        res.status(500).json({error:e.message});
    }
})
//update route
app.put("/:id",async(req, res) => {
    try{
        const updated = await Person.findByIdAndUpdate(
            req.params.id,
            {name: req.body.name,
                age: Number(req.body.age)
            },
            {new: true}   //it returns the new update value
        );
        if (!updated) return res.status(400).json({error:"Not Found"});
        res.json(updated6);
    }catch(e){
        res.status(400).json({error:e.message});
    }
});
//delete
app.delete("/:id", async(req, res) =>
{
    try{
        const deleted = await Person.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({error: "Not Found"});
        res.json({ok:true});
    }catch(e){
        res.status(400).json({error:e.message});
    }
})

app.listen(4000, () => console.log("Server is running in http://localhost:4000"));