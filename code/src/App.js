/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import { ThoughtsList } from 'components/ThoughtsList';
import { ThoughtsForm } from 'components/ThoughtsForm';
import { MainLoading } from 'components/MainLoading';

// ///////////////////////////////// STATE  VARIABLES & THEIR SETTERS ///////////////////////// //
// Declaring variables and setting states
/* Initializes a state variable thoughts with an empty array value using the useState hook. */
export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newThought, setNewThought] = useState('');

  // calling API to get messages from the server in the JSON format
  // when API is delayed setLoading will show message
  const fetchThoughts = () => {
    setLoading(true);
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts')
      .then((response) => response.json())
      .then((data) => setThoughts(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  // Using useEffect() - calling the function fetchThoughts when the component mounts
  useEffect(() => {
    fetchThoughts();
  }, []);
  // [] dependancy arrey when empty only called when component is mounted

  // when new thought is typed we set it to the event
  const handleNewThoughtChange = (event) => {
    setNewThought(event.target.value);
  };

  // here we takes object (event) as a parameter plus preventing refreshing page on submition
  const onFormSubmit = (event) => {
    event.preventDefault();
    // onFormSubmit function creates option object with key values
    // we send event to the API in the JSON format
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newThought }),
    };

    // here we update fetchFoughts
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', options)
      .then((response) => response.json())
      .then(() => fetchThoughts())
      .finally(() => setNewThought(''));
  };
  // increase number of likes for id's thoughts, again create options with two value keys
  const onLikesIncrease = (LikeID) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(
      `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${LikeID}/like`,
      options
    )
      .then((response) => response.json())
      // .then(() => fetchThoughts())
      .catch((error) => console.error(error))
      .finally(() => fetchThoughts());
  };

  if (loading) {
    return <MainLoading />;
  }
  // in the return we display our componenets which are passing the props
  return (
    <div>
      <ThoughtsForm
        newThought={newThought}
        handleNewThoughtChange={handleNewThoughtChange}
        onFormSubmit={onFormSubmit}
      />
      <ThoughtsList
        loading={loading}
        thoughts={thoughts}
        onLikesIncrease={onLikesIncrease}
      />
    </div>
  );
};
