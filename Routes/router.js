//path to resolve the client request
//we need routing module from express to set path

//1)import express
 const express= require('express')

 //import controller
 const userController = require('../controllers/userController')

 //import projectController
 const projectController =require('../controllers/projectController')

 //import jwt middleware
 const jwtMiddleware =require('../Middleware/jwtMiddleware')

 //import multer
 const multerConfig = require('../Middleware/multerMiddleware')



 //2)create an object for the class Router in express 
 const router = new express.Router()


 //3) path for ressolving the request
    //syntax -router.httprequest('path to ressolve req',()=>{how to resolve the request})
    //a) Register
    router.post('/user/register', userController.register)

  //b)login
  router.post('/user/login',userController.login)


  //c)add project
  router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

  //get home project
  router.get('/projects/home-project',projectController.getHomeProject)


  //get all projects
  router.get('/projects/all-project',jwtMiddleware,projectController.getAllProject)

  //get user projects
  router.get('/user/all-project',jwtMiddleware,projectController.getUserProject)

//edit project
 router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)

 //deleteproject
 router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteUserProject)


 //edit profile
 router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.editUser)



 //4)export router
 module.exports = router