import User from "../models/users.model.js";
import bcrypt from "bcryptjs"; 

export const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

   
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await User.create({
      name,
      phone,
      email,
      password: hashedPassword, 
      lastName: '', 
      birthdate: null, 
      gender: '', 
      isAdmin: false, 
      isActive: false, 
      shippingAddress: { address: '', city: '', postalCode: '', country: '' }
    });

    res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
// Login
// or require if using CommonJS

export const login= async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    // Find user in the database
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    user.isActive = true;
    await user.save();
  

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getuser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// import User from "../models/user.model.js"; // adjust path if different

export const getUser = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const updateUser = async (req, res) => {
    try {
      const { name, lastName, email, phone, birthdate, gender } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Update all fields regardless of whether they're undefined or empty
      user.name = name || user.name;
      user.lastName = lastName || user.lastName;
      user.phone = phone || user.phone;
      user.birthdate = birthdate || user.birthdate;
      user.gender = gender || user.gender;
  
      await user.save();
  
      res.status(200).json({ success: true, message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};
// In auth.controller.js
export const updateAddress = async (req, res) => {
  try {
    const { email, address } = req.body;
    
    if (!email || !address) {
      return res.status(400).json({ success: false, message: "Email and address are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Store the address as a string (it's already stringified from frontend)
    user.address = address;
    await user.save();

    res.status(200).json({ success: true, message: "Address updated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  console.log(req.body);
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(hashedPassword)
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      user.isActive = false;
      await user.save();
      res.status(200).json({ success: true, message: "User logged out successfully" });
    } else {
      res.status(400).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
