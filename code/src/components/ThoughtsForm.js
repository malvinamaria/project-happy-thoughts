import React from 'react';

// The ThoughtsForm component receives three props:
// newThought, handleNewThoughtChange, and onFormSubmit. The newThought prop represents
// the message that the user is typing, and the handleNewThoughtChange prop is a callback
// function that is called whenever the user types something in the input field.
// The onFormSubmit prop is a callback function that is called when the user submits the form

export const ThoughtsForm = ({
  newThought /*  message that user is typing */,
  handleNewThoughtChange,
  // eslint-disable-next-line comma-dangle
  onFormSubmit,
}) => {
  return (
    <form className="form-container" onSubmit={onFormSubmit}>
      <h3>What is making me happy right now?</h3>
      <textarea
        placeholder="What is on your mind?"
        rows="5"
        cols="48"
        value={newThought}
        onChange={handleNewThoughtChange}
        maxLength="140"
        required
        spellCheck="true"
        // eslint-disable-next-line react/style-prop-object
        // eslint-disable-next-line react/jsx-closing-bracket-location
      />
      <div className="form-btn">
        <button className="submit-btn" type="submit">
          🖤 Send a happy thought! 🖤
        </button>
      </div>
    </form>
  );
};
