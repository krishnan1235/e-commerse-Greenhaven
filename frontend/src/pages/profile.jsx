import axios from "axios";
import { useEmail } from "../emailcontext.jsx";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { HiShoppingBag } from "react-icons/hi2";
import { MdPassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Profile = () => {
  const token = localStorage.getItem("token");
  const { email, setemail } = useEmail();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",

    phone: "",
    birthdate: "",
    gender: ""
  });
  const [isEditing, setIsEditing] = useState(false);
    // const [loading, setLoading] = useState(true);
  const [orders,  setOrders] = useState(null);

  const [address, setAddress] = useState("");
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        
        // const response = await axios.get("https://e-commerse-greenhaven.onrender.com/api/orders/emailget", {
        const response = await axios.get("http://localhost:5000/api/orders/emailget", {
          params: { email: email } // Pass the email or user ID here
        });
        setOrders(response.data.orders); // Assuming the response structure contains 'orders'
        // setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders");
        // setLoading(false);
      }
    };
    const fetchUser = async () => {
      try {
        // const res = await axios.post("https://e-commerse-greenhaven.onrender.com/api/auth/getUser", {
       const res = await axios.post("http://localhost:5000/api/auth/getUser", 
      { email }, // or any required body
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Add token here
        }
      }
    );
  
        const fetchedUser = res.data.user;
        setUser({
          name: fetchedUser.name || "",
          lastName: fetchedUser.lastName || "",
          email: fetchedUser.email || "",
          phone: fetchedUser.phone || "",
          birthdate: fetchedUser.birthdate || "",
          gender: fetchedUser.gender || ""
        });
  
       
        if (fetchedUser.address) {
          try {
           
            const parsedAddress = JSON.parse(fetchedUser.address);
            setAddress(parsedAddress);
          } catch (e) {
            
            setAddress({
              addressLine1: fetchedUser.address,
              addressLine2: "",
              company: "",
              city: "",
              state: "",
              postalCode: "",
              country: ""
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
    fetchOrders();
  }, [email]);

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      // await axios.put("https://e-commerse-greenhaven.onrender.com/api/auth/updateUser", user, {
      await axios.put("http://localhost:5000/api/auth/updateUser", user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setIsEditing(false);
      toast.success("Profile updated successfully ✅");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update ❌");
    }
  };
  const handleLogout = async () => {
    console.log("Email at logout:", email); // add this
    try {
      // const response = await axios.post("https://e-commerse-greenhaven.onrender.com/api/auth/logout", {
      const response = await axios.post("http://localhost:5000/api/auth/logout", {
        email: email,
      });
      localStorage.removeItem("token");
  
      
      setemail(""); 
      navigate("/login");

      toast.success("Logged out successfully");

      console.log(response.data); // see if response comes
   
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    }
      // Check if the response indicates success
     
  };
  
  const handleSaveAddress = async () => {
    // Validate required fields
    if (!address.addressLine1 || !address.city || !address.state || !address.postalCode || !address.country) {
      alert("Please fill in all required address fields (marked with *)");
      return;
    }
  
    try {
      // await axios.put("https://e-commerse-greenhaven.onrender.com/api/auth/updateAddress", 
      await axios.put("http://localhost:5000/api/auth/updateAddress", 
        { 
          email, 
          address: JSON.stringify(address) // Convert object to string for storage
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      toast.success("Address updated successfully ✅");
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address ❌");
    }
  };
  const handleUpdatePassword = async () => {
    if (password.newPassword !== password.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      console.log(email,password.newPassword)
      // await axios.put("https://e-commerse-greenhaven.onrender.com/api/auth/updatePassword", 
      await axios.put("http://localhost:5000/api/auth/updatePassword", 
        { email: email, newPassword: password.newPassword }
      );
      toast.success("Password updated successfully ✅");
      setPassword({ newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password ❌");
    }
  };


  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="profile-content">
            <h2>Good {getGreeting()}! {user.name}</h2>
            <div className="profile-form">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleUserChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleUserChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleUserChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleUserChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  value={user.birthdate}
                  onChange={handleUserChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <div className="gender-options">
                  <label><input type="radio" name="gender" value="Male" checked={user.gender === "Male"} onChange={handleUserChange} disabled={!isEditing} /> Male</label>
                  <label><input type="radio" name="gender" value="Female" checked={user.gender === "Female"} onChange={handleUserChange} disabled={!isEditing} /> Female</label>
                  <label><input type="radio" name="gender" value="Other" checked={user.gender === "Other"} onChange={handleUserChange} disabled={!isEditing} /> Other</label>
                </div>
              </div>
              {isEditing ? (
                <button className="save-button" onClick={handleSaveProfile}>Save</button>
              ) : (
                <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
              )}
            </div>
          </div>
        );
        case "address":
          return (
            <div className="profile-content">
              <h2>Delivery Address</h2>
              <div className="address-form">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" name="name" value={user.name} disabled />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={user.lastName} disabled />
                </div>
                <div className="form-group">
                  <label>Address Line 1*</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={address.addressLine1}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={address.addressLine2}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={address.company}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="form-group">
                  <label>City*</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State/Province*</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Postal/Zip Code*</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={address.postalCode}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Country*</label>
                  <input
                    type="text"
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number</label>
                  <input type="text" name="phone" value={user.phone} disabled />
                </div>
                <button className="save-button" onClick={handleSaveAddress}>Save Address</button>
              </div>
            </div>
          );
    case "orders":
  return (
    <div className="profile-content">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <p>We can't wait to have you as a customer.</p>
          <button className="view-products" onClick={() => navigate("/")}>
            View Products
          </button>
        </div>
      ) : (
        <div className="orders-list">
  {orders.map((order, index) => (
    <div key={index} className="order-item">
      <img
        src={order.productImage}
        alt={order.productName}
        className="order-image"
      />
      <div className="order-details">
        <h3>{order.productName}</h3>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Price:</strong> ₹{order.price}</p>
       
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  );


      case "password":
        return (
          <div className="profile-content">
            <h2>Update your password for {user.email}</h2>
            <div className="password-form">
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter New Password"
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={password.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm New Password"
                />
              </div>
              <button className="update-password" onClick={handleUpdatePassword}>
                Update Password
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 18) return "Afternoon";
    return "Evening";
  };

  return (
    <div className="profile-wrapper">
      <div className="sidebar">
        <div className="profile-pic">
          <div className="circle">{user.name.charAt(0)}{user.lastName.charAt(0)}</div>
          <h2>{user.name} {user.lastName}</h2>
          <p>{new Date().toLocaleTimeString()}</p>
        </div>

        <nav className="sidebar-menu">
          <ul>
            <li 
              className={`proficons ${activeTab === "profile" ? "active" : ""}`} 
              onClick={() => setActiveTab("profile")}
            >
              <FaUser /><p className="profname"> My Profile</p>
            </li>
            <li 
              className={`proficons ${activeTab === "address" ? "active" : ""}`} 
              onClick={() => setActiveTab("address")}
            >
              <CiLocationOn /><p className="profname"> Delivery Address</p>
            </li>
            <li 
              className={`proficons ${activeTab === "orders" ? "active" : ""}`} 
              onClick={() => setActiveTab("orders")}
            >
              <HiShoppingBag /><p className="profname"> My Orders</p>
            </li>
            <li 
              className={`proficons ${activeTab === "password" ? "active" : ""}`} 
              onClick={() => setActiveTab("password")}
            >
              <MdPassword /> <p className="profname">Change Password</p>
            </li>
            <li className="proficons" onClick={handleLogout}>
              <AiOutlineLogout /><p className="profname"> Log Out</p>
            </li>
          </ul>
        </nav>
      </div>

      {renderContent()}
    </div>
  );
};

export default Profile;