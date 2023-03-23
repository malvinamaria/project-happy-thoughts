import React, { useState, useEffect } from 'react';
import { ThoughtsList } from 'components/ThoughtsList';
import { ThoughtsForm } from 'components/ThoughtsForm';
import { MainLoading } from 'components/MainLoading';

// eslint-disable-next-line spaced-comment
//////////////// STATE  VARIABLES & THEIR SETTERS /////////////
// Declaring variables and setting states
export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newThought, setNewThought] = useState('');

  // eslint-disable-next-line spaced-comment
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
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

    // ggg
    const options = {
      method: 'POST',
      headers: {
        // eslint-disable-next-line comma-dangle
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // eslint-disable-next-line comma-dangle
        message: newThought,
        // eslint-disable-next-line comma-dangle
      }),
    };

    // here we update fetchFoughts
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', options)
      .then((response) => response.json())
      .then(() => fetchThoughts())
      .finally(() => setNewThought(''));
  };
  // increase number of likes fo id's thoughts
  const onLikesIncrease = (LikeID) => {
    const options = {
      method: 'POST',
      headers: {
        // eslint-disable-next-line comma-dangle
        'Content-Type': 'application/json',
        // eslint-disable-next-line comma-dangle
      },
    };

    fetch(
      `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${LikeID}/like`,
      options
    )
      .then((response) => response.json())
      .then(console.log('yey it works.'))
      .catch((error) => console.error(error))
      .finally(() => fetchThoughts());
  };

  if (loading) {
    return <MainLoading />;
  }

  return (
    <div>
      <ThoughtsForm
        // eslint-disable-next-line no-undef
        newThought={newThought}
        // eslint-disable-next-line no-undef
        handleNewThoughtChange={handleNewThoughtChange}
        // eslint-disable-next-line no-undef
        onFormSubmit={onFormSubmit}
        // eslint-disable-next-line react/jsx-closing-bracket-location
      />
      <ThoughtsList
        // eslint-disable-next-line no-undef
        loading={loading}
        // eslint-disable-next-line no-undef
        thoughts={thoughts}
        onLikesIncrease={onLikesIncrease}
        // eslint-disable-next-line react/jsx-closing-bracket-location
      />
    </div>
  );
};
