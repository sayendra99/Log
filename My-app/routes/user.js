const express=require('express');
const router=express.Router();
const User=require("../model/User");
const bycrypt=require("bycryptjs");

//Now Router for register user

router.post('/register',async(req,res)=>
    {
        
        const{ name,email,password}=req.body;
try{
    if(existingUser)
        {
            return res.status(400).json({message:"User already exists"});

        }

const hashedPassword=await bycrypt.hash(password,10);

const newUser= new User({name,email,password:hashedPassword});
await newUser.save();
res.status(201).json({message:'User registered successfully'});



}

catch(error)
{
    res.status(500).json({message:'Server error'});

}
});


//User -login routes


router.post('/login',async(req,res)=>{

const{email,password}=req.body;
try
{
const user=await User.findOne({email});

// check the userid existed or not
if(!user)
{
    return res.status(400).json({message:"No user  found"});


}

// check the password is correct or not
const isMatch=await bycrypt.compare(password,user.password);
if(!isMatch)
{
    return res.status(400).json({message:" Password Invalid "});

}

res.status(200).json({success: true, user:{name: user.name,email:user.email}});




}

catch(error){
res.status(500).json({message:'Server error'});

}


});
module.exports=router;
