const asyncHandler = require("express-async-handler");
const userSchema = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

//@desc Register a User
//@route POst =>  /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error('all filed are mandatory')
    }
    const userAvailable = await userSchema.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error('user already Exits')
    }

    //hass passowrd
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("hashedPassword", hashedPassword);

    const user = await userSchema.create({
        username,
        email,
        password: hashedPassword
    })

    console.log("user created successfully ", user);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("user data is not valie")
    }
    res.json({ message: "register the user" })
})


//@desc login a User
//@route Post =>  /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    if (!email || !password) {
        res.status(400)
        throw new Error("all filed are mandatory")

    }
    const user = await userSchema.findOne({ email })
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.name,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        res.status(200).json({ accessToken })
    } else {
        res.status(401).json("password not correct")
        throw new Error("password not correct")
    }
})



//@desc Current User
//@route get =>  /api/users/current
//@access Private 
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})


module.exports = {
    registerUser,
    loginUser,
    currentUser
}