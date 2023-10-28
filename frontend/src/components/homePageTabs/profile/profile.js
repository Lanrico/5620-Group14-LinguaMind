import React, { useEffect, useState } from 'react';
import UserProfile from "../userProfile"
import AdminUserService from "../../../services/adminUserService";

const Profile = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);


  const findUser = (event) => {
    event.preventDefault();
    AdminUserService.findByEmail(email).then(({ data }) => {
      if (data) {
        setUser(data);
        setShowProfile(true)
      }
      else return
    });
  }

  if (showProfile) return <UserProfile user={user} />
  return <>
    {/* <form onSubmit={() => setShowProfile(true)}> */}
    <form onSubmit={findUser}>
      <label>Enter the account:</label>
      <input onInput={(e) => setEmail(e.target.value)} value={email}></input>
    </form>
  </>
}

export default Profile;