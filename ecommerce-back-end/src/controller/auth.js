const User = require('../modles/user')
const jwt = require('jsonwebtoken')




      exports.signup = (req,res) => {
                        
                   
                        const user = new User(req.body)
                        user.save((err,user)=>{
                            if(err) {
                                 return res.status(400).json({
                                    err
                                 })
                            } 
                            
                            res.json({
                                user
                            })
                        })

                     
                    }


    exports.signin = (req, res) => {
        User.findOne({email: req.body.email})
        .exec((error,user) =>{
            if(error) return res.status(400).json({error});
            if(user){
                console.log("we have user")
                   if(req.body.password == user.password){
              
            

                   
                     const {_id,fname,email,role} = user
                     res.status(200).json({
                         
                         user: {_id,fname,email,role, }
                    })
                 }else{
                     res.status(400).json({message:'Invalid Password'})
                 }

            }else{
                return res.status(400).json({message: 'Something went wrong'})
            }
        })
    }                



    exports.signout = (req, res) =>{
        // res.clearCookie("t")
         res.json({message: 'Signout Success'})
    }




    exports.isAuth = (req, res, next) => {
        let user = req.profile 
        if(!user){
            return res.status(403).json({
                error: 'Access denied'
            })
        }
        next();
    }


    exports.isAdmin = (req, res, next) => {
      
        if(req.profile.role == 0){
            return res.status(403).json({
                error: 'Admin resource Access denied!'
            })
        }
        next();
    }

    