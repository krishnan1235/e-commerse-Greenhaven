import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    // Normally fetch user data from API/localStorage
    const storedUser = {
      name: "Krishnan",
      email: "krishnan@example.com",
      phone: "+91 9876543210",
      address: "Coimbatore, Tamil Nadu, India"
    };
    setUser(storedUser);
    setEditedUser(storedUser);
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
    // You can also send updated user info to your backend here using axios.post()
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      <div className="profile-card">
        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                placeholder="Enter Name"
                className="input-field"
              />
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                className="input-field"
              />
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
                placeholder="Enter Phone"
                className="input-field"
              />
              <input
                type="text"
                name="address"
                value={editedUser.address}
                onChange={handleInputChange}
                placeholder="Enter Address"
                className="input-field"
              />
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
            </>
          )}
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={handleEditToggle}>Cancel</button>
            </>
          ) : (
            <>
              <button className="edit-btn" onClick={handleEditToggle}>Edit Profile</button>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
