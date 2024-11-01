import React, { useEffect, useState } from 'react'

function Header() {
// useEffect(()=>{
//     async function getData() {
//         const data = await  fetch("")   
//     }
// })

const [users, setUsers] = useState([]); // Initialize with an empty array to store multiple users
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchUserData() {
    try {
      const response = await fetch('https://dummyapi.online/api/social-profiles');
      const data = await response.json();
      setUsers(data); // Set all user data returned as an array
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }
  fetchUserData();
}, []);

if (loading) {
  return <div>Loading...</div>;
}

if (!users.length) {
  return <div>Failed to load user data.</div>;
}

  return (
    <>
 <div className='header'>
  Social Media Profile
 </div>
      <div className="profiles-container">
      {users.map((user, index) => (
        <div key={index} className="profile-container">
          <div
            className="cover-photo"
            style={{ backgroundImage: `url(${user.coverPhoto})` }}
          ></div>
          <div className="profile-info">
            <div className="profile-pic">
              <img src={user.profilePic} alt="Profile" />
            </div>
            <div className="user-details">
              <h2>{user.fullName}</h2>
              <p>@{user.username}</p>
              <p>{user.work}</p>
              <p>📍 {user.location}</p>
              <p>Status: {user.statusMessage}</p>
              <p>Bio: {user.bio}</p>
            </div>
          </div>
          <div className="stats">
            <div>
              <h3>{user.postsCount}</h3>
              <p>Posts</p>
            </div>
            <div>
              <h3>{user.followersCount}</h3>
              <p>Followers</p>
            </div>
            <div>
              <h3>{user.followingCount}</h3>
              <p>Following</p>
            </div>
          </div>
          <div className="section">
            <h3>Hobbies</h3>
            <ul className="list">
              {user.hobbies.map((hobby, index) => (
                <li key={index}>{hobby}</li>
              ))}
            </ul>
          </div>
          <div className="section">
            <h3>Interests</h3>
            <ul className="list">
              {user.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
          <div className="section">
            <h3>Languages</h3>
            <ul className="list">
              {user.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
          <div className="section">
            <h3>Additional Information</h3>
            <p><strong>Education:</strong> {user.education}</p>
            <p><strong>Relationship Status:</strong> {user.relationshipStatus}</p>
            {user.customFields.map((field, index) => (
              <p key={index}><strong>{field.fieldName}:</strong> {field.fieldValue}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Header