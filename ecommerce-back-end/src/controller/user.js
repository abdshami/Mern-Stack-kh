const User = require("../modles/user")


exports.userById = (req,res,next,id)=>{
   User.findById(id).exec((err,user) =>{
         if(err || !user){
             return res.status(400).json({
                 error: "user not found"
             })
         }

         req.profile = user;
         next();
   })
}

exports.read = (req,res) =>{
    req.profile.password = undefined
    return res.json(req.profile)

}
exports.update = (req,res) => {
    User.findOneAndUpdate({_id: req.profile._id} , {$set: req.body}, {new: true}, (err,user)=>{
        if(err){
            return res.status(400).json({
                error: "you are not authurized to perform this action"
            })
        }

        user.password = undefined
        return res.json(user)
        next();
    })
}