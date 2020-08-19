import React, { useState, useEffect } from "react";

// utility functions
import { axiosWithAuth } from "../utils/axiosWithAuth";

//contexts
import { FriendsContext } from "../contexts/FriendsContext";

//components
import FriendForm from "./FriendForm";

const Friends = (props) => {
  const [friends, addFriends] = useState([]);

  const getFriends = () => {
    axiosWithAuth()
      .get("api/friends")
      .then((res) => {
        addFriends(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div>
      <h1>Friends</h1>
      {
        <div>
          <h2>Add a new Friend</h2>

          <FriendsContext.Provider value={{ addFriends }}>
            <FriendForm />
          </FriendsContext.Provider>
        </div>
      }

      {friends.length > 0 ? <span></span> : <p>Loading...</p>}
      {friends.map((friend) => {
        return (
          <div key={friend.id}>
            <h3>{friend.name}</h3>
            <p>Age: {friend.age}</p>
            <p>Email: {friend.email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Friends;
