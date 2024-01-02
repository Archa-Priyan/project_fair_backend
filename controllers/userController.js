//import model
const users = require('../Models/userSchema')

//import jwt
const jwt = require('jsonwebtoken')


//logic fro register
exports.register = async(req,res)=>{
    //logic
    console.log('inside userController register logic');
    //destructuring data from the client request body
    //(since json formate s converted into javascript object by the .json() method used in index.js file)
    const {username,email,password} = req.body

    try{//since email is the unique value we are chechinkg that email is already parent in the database
    //for that we are using findOne method which retur entire document when the condition is true else return null
      const existingUser = await users.findOne({email})

      if(existingUser){
        //if ifndOne return document it means that the user already exist
        //so we are sending a repsonse in the 400 series(client request error)
        res.status(406).json("Account already Exist....please Login")
      }
      else{
        //if findOne returns null, it mean the email or the user doesnogt exist in the database
        //we register the user
            //1)Create an object for the model
                const newUser =new users({
                    username,
                    email,
                    password,
                    github:"",
                    linkedin:"",
                    profile:""
                })
                //2)add the object use save() method in mongoose
                //inorder to dd the above object use save() method in mongoose
                await newUser.save()


        //response
        res.status(200).json(newUser)
    }
      }
      catch(err){
        res.status(401).json("Registration Request Failed due to",err)
      }

}

//logic for login

exports.login = async (req,res)=>{

  console.log('inside login function');
  /* console.log(req.body) */

  const { email , password} = req.body
  

 try { const existingUser = await users.findOne({email,password})

  if(existingUser){

//sign is a method used to create token
//first argumet is payload - the information that is secretly transmitted
//second argumnet - secret key -based on which the token is generated
   const token =  jwt.sign({userId: existingUser._id},"secretekey12345")        
    res.status(200).json({

      existingUser,
      token
    })
  }
  else{
    res.status(404).json('Invalid email id or password')
  }
}
catch (err){
  res.status(401).json('Login request failed due to:',err)
}

}


//edit profile
exports.editUser = async (req,res)=>{
   const userId = req.payload
   const {username,email,password,github,linkedin,profile} = req.body
   const profileImage = req.file?req.file.filename:profile

   try {
    const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true})

    await updateUser.save()
    res.status(200).json(updateUser)
   } catch (err) {
    res.status(401).json(err)
    
   }
}