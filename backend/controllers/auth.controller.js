import User from "../models/users.model.js";

export const registerUser = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            phone,
            email,
            password
        });

        res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


// Login
export const loginUser= async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(email)
        if (!user) {
            return res.status(404).json({  message: "User not found" });
        }

        if (!password) {
            return res.status(400).json({success: false, message: "Invalid credentials" });
        }

        res.status(200).json({ success: true } );
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
};
