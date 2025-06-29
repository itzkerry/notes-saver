import User from '../models/user.js';

export const loginUser = async (req,res) => {
    const {userName, password, isNewUser} = req.body;

    try{
        if(isNewUser){
            const exist = await User.findOne({userName});
             if (exist) {
                    return res.status(400).json({ message: "Username already taken" });
                }
            const newUser = await User.create({userName,password});
            res.status(200).json({userId:newUser._id})
        }else{
            const user = await User.findOne({userName});
            if(user){
                if(user.password === password){
                    res.status(200).json({userId:user._id});
                }else{
                    res.status(401).json({message:"Incorrect password"});
                }
            }else{
                res.status(404).json({message:"User Not Found"});
            }
        }
    }catch(err){
        console.log("login error : "+ err.message);
        res.status(500).json({message: 'Internal server error'});   
    }
}
