import React, { useState, useContext } from "react";

//utility functions
import { axiosWithAuth } from "../utils/axiosWithAuth";

//context
import { FriendsContext } from "../contexts/FriendsContext";

const FriendForm = () => {
  const { addFriends } = useContext(FriendsContext);

  const initialFormValues = {
    name: "",
    age: "",
    email: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const submitFriend = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("api/friends", formValues)
      .then((res) => {
        addFriends(res.data);
      })
      .catch((err) => console.log(err));

    setFormValues(initialFormValues);
  };

  const handleChanges = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={submitFriend}>
      <label htmlFor="name">
        Name: &nbsp;
        <input
          type="text"
          name="name"
          id="name"
          value={formValues.name}
          onChange={handleChanges}
        />
      </label>
      <label htmlFor="age">
        Age: &nbsp;
        <input
          type="number"
          min="0"
          step="1"
          id="age"
          name="age"
          value={formValues.age}
          onChange={handleChanges}
        />
      </label>
      <label htmlFor="email">
        Email: &nbsp;
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChanges}
        />
      </label>
      <button>Add Friend</button>
    </form>
  );
};

export default FriendForm;
