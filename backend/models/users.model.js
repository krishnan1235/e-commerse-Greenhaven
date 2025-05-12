import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: { type: String, required: true },
    password: {
      type: String,
      required: true
    },
    birthdate: { type: Date },
    gender: { type: String },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String
    }
  }, {
    timestamps: true
  });
  

const Users = mongoose.model("login_auth", userSchema);
export default Users;
