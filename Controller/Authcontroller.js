const usermodel = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ---------------- SIGNUP ----------------

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const user = await usermodel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exist", success: false });
        }

        // Create new user
        const userModel = new usermodel({ name, email, password });

        // Hash password
        userModel.password = await bcrypt.hash(password, 10);

        // Save user
        await userModel.save();

        res.status(201).json({ message: "SignUp Successfully", success: true });

    } catch (err) {
        res.status(500).json({ message: "internal server error", success: false });
    }
};

// ---------------- LOGIN ----------------

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user exists
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "User Not Exist please Signup", success: false });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "Email or Password is Wrong", success: false });
        }

        // Generate JWT Token
        const JWTtoken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Send response
        res.status(200).json({
            message: "Login Successfully",
            success: true,
            JWTtoken,
            email: user.email,
            name: user.name
        });

    } catch (err) {
        res.status(500).json({ message: "internal server error", success: false });
    }
};

module.exports = {
    signup,
    login
};
