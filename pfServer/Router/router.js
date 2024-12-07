const express = require('express')
const router =express.Router()
const userController =require('../Controller/userController')
const projectController =require('../Controller/projectController')

const jwtMiddileware =require('../Middleware/jwtMiddleware')
const multerConfig=require('../Middleware/multerMiddleware')
// register 
router.post('/register',userController.register)


// login
router.post('/login',userController.login)

//add projects

//router specific middleware
router.post('/addproject',jwtMiddileware,multerConfig.single('projectImage'),projectController.addProject)

// getHomeProjects
router.get('/homeprojects',projectController.getHomeProjects)


//getAllProjects
router.get('/allprojects',jwtMiddileware,projectController.getAllProjects)

//get home projects
router.get('/userprojects',jwtMiddileware,projectController.getUserProjects)


// update
router.put('/projects/edit/:pid',jwtMiddileware,multerConfig.single('projectImage'),projectController.editProject)

//delete
router.delete('/projects/remove/:pid',jwtMiddileware,projectController.deleteProject)





module.exports =router 



