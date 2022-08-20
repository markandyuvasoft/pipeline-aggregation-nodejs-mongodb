import express from 'express'
import User from '../models/data.js'

const indexrouter=express.Router()

// GET METHOD STUDENT START.............................................................................................
indexrouter.get("/users",async(req,res)=>{

   try{
       const get= await User.find()
   
       res.send(get)
      
       }catch(err){
   
        res.send(err)
       }
})
// GET METHOD STUDENT END.............................................................................................


// GET API WITH ID START.............................................................................................
indexrouter.get("/user/:id",async(req,res)=>{

   try{

       const _id= req.params.id

       const getid= await User.findById(_id)
       res.send(getid)
      
   }catch(err){
       res.send(err)
      }
})
// GET API WITH ID END........................................................................................


// POST API START...........................................................................................................

indexrouter.post("/store",(req,res,next)=>{

//   console.log(req.body);
  const user = new User(req.body)

  user.save().then(()=>{
      res.status(201).send(user)
  }).catch((err)=>{

      res.status(400).send(err)
  }) 
})
// POST API END..........................................................................................................


// UPDATE API USING PUT START.............................................................................................
//update and check mongodb(refresh)

indexrouter.put("/user/:id", async (req,res)=>{

   try{
   
       const _id= req.params.id;
   
       const update= await User.findByIdAndUpdate(_id, req.body)
   

       res.send(update)
   
   }catch(err){
   
   res.status(400).send(err)
   }
   })
// UPDATE API USING PUT END.....................................................................................


// DELETE API USING DELETE START.....................................................................
   indexrouter.delete("/user/:id",async (req,res)=>{

       try{

           const _id=req.params.id;

           const remove = await User.findOneAndRemove(_id,req.body)

           res.send(remove)
       }catch(err){
           res.status(400).send(err)
       }
   })
// DELETE API USING DELETE END............................................................................





// PIPE LINE AGGREGATION START DESIGNATION ACCORDING NAME.................................................................................
indexrouter.get("/pipe",(req,res,next)=>{

User.aggregate([

     {$match : {designation: 'node developer'}},  // ONE DETAILS FIND


    //{$match: { $and: [{designation: 'node developer'},{age: 29}]}}, // TWO OR MORE DETAILS FIND

    {$sort : {name: 1}},

    {$project : { _id : 0, name : 1, phone: 1}},      //name with phone SHOW

    // {$project : { _id : 0, name : 1, email : 1}},   //name with email SHOW
   
    {$limit : 10}   // SET TO LIMIT 

])
.then(response => {
    res.json({
        response
    })
})
.catch(error => {
    res.json({
        message: 'error occured!'
    })
})
})
// PIPE LINE AGGREGATION END.................................................................................


// PIPE LINE AGGREGATION START DEPARTMENT ACCORDING SALARY.................................................................................
indexrouter.get("/max",(req,res,next)=>{

    User.aggregate([
    
        {$group:
            {
                _id: { department: "$department" },
                totalUser: { $sum: 1 },
                averagesalary: { $avg: "$salary" },
                // _id: { name: "$name"}     //NAME FINDOUT
            }
        },  
    ])

    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'error occured!'
        })
    })
    
    })
    
// PIPE LINE AGGREGATION END DEPARTMENT ACCORDING SALARY.................................................................................

 export default indexrouter

