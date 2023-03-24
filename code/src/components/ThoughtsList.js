/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/button-has-type */
import React from 'react';
import { formatDistance } from 'date-fns';
// import { MainLoading } from './MainLoading';

// The ThoughtsList component receives three props: loading, thoughtsList, and onLikesIncrease.
// The loading prop is used to display a loading message while the thoughts are being
// fetched from the server. The thoughtsList prop contains an array of objects that represent
// the happy thoughts, and the onLikesIncrease prop is a callback function that is called
// when the user clicks the heart button to like a thought.

export const ThoughtsList = ({ thoughts, onLikesIncrease }) => {
  return (
    <section>
      {thoughts.map((thoughtsArray) => (
        <div className="thoughts-input" key={thoughtsArray._id}>
          <p className="thought-text">{thoughtsArray.message}</p>
          <div className="thought-details">
            <div>
              <button
                className={
                  thoughtsArray.hearts === 0 ? 'like-button' : 'unliked-button'
                }
                onClick={() => onLikesIncrease(thoughtsArray._id)}
              >
                🖤
              </button>
              <p className="count">x {thoughtsArray.hearts}</p>
            </div>
            <p className="date">
              {formatDistance(new Date(thoughtsArray.createdAt), Date.now(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};
