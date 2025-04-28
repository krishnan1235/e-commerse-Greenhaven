import React, { useEffect, useState } from "react";
import axios from "axios";
 // You can create this CSS file.

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://e-commerse-greenhaven.onrender.com/api/auth/getUser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` // Assuming you save token at login
          }
        });
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put("https://e-commerse-greenhaven.onrender.com/api/auth/updateUser", user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setIsEditing(false);
      alert("Profile updated successfully ✅");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update ❌");
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-field">
        <label>Name:</label>
        <input 
          type="text" 
          name="name"
          value={user.name} 
          onChange={handleChange} 
          disabled={!isEditing}
        />
      </div>
      <div className="profile-field">
        <label>Email:</label>
        <input 
          type="email" 
          name="email"
          value={user.email} 
          onChange={handleChange} 
          disabled
        />
      </div>
      <div className="profile-field">
        <label>Address:</label>
        <input 
          type="text" 
          name="address"
          value={user.address} 
          onChange={handleChange} 
          disabled={!isEditing}
        />
      </div>
      {isEditing ? (
        <button className="save-button" onClick={handleSave}>Save</button>
      ) : (
        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </div>
  );
};

export default Profile;
