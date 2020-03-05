import React from 'react';
import List from './List';
import './Card.css';

export default function Card(props) {

  Card.defaultProps = {
    onDeleteCard: () => {},
  }

  return (
    <div className='Card'>
      <button
        type='button'
        onClick={() => props.onClickDelete(props.cardId)}
      >
        delete
      </button>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  )
}
