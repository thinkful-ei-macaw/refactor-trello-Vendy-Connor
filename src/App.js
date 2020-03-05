import React, { Component } from 'react';
import List from './List';
import Card from './Card';
import './App.css';

class App extends Component {

  state = {
    lists: [
      {
        id: '1',
        header: 'First list',
        cardIds: [ 'a', 'b', 'e', 'f', 'g', 'j', 'l', 'm' ],
      },
      {
        id: '2',
        header: 'Second list',
        cardIds: ['b', 'c', 'd', 'f', 'h', 'i', 'k'],
      },
      {
        id: '3',
        header: 'Third list',
        cardIds: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm' ],
      },
      {
        id: '4',
        header: 'Fourth list',
        cardIds: [ 'l', 'm' ],
      },
    ],
    allCards: {
      'a': { id: 'a', title: 'First card', content: 'lorem ipsum' },
      'b': { id: 'b', title: 'Second card', content: 'lorem ipsum' },
      'c': { id: 'c', title: 'Third card', content: 'lorem ipsum' },
      'd': { id: 'd', title: 'Fourth card', content: 'lorem ipsum' },
      'e': { id: 'e', title: 'Fifth card', content: 'lorem ipsum' },
      'f': { id: 'f', title: 'Sixth card', content: 'lorem ipsum' },
      'g': { id: 'g', title: 'Seventh card', content: 'lorem ipsum' },
      'h': { id: 'h', title: 'Eighth card', content: 'lorem ipsum' },
      'i': { id: 'i', title: 'Ninth card', content: 'lorem ipsum' },
      'j': { id: 'j', title: 'Tenth card', content: 'lorem ipsum' },
      'k': { id: 'k', title: 'Eleventh card', content: 'lorem ipsum' },
      'l': { id: 'l', title: 'Twelfth card', content: 'lorem ipsum' },
      'm': { id: 'm', title: 'Thirteenth card', content: 'lorem ipsum' },
    },
  }

  handleDeleteCard = (cardId) =>{
    let newAllCards = this.omit(this.state.allCards, cardId);
    
    let newLists = this.state.lists.map(list => {

      return {
        ...list,
        cardIds: list.cardIds.filter(id => id !== cardId)
      }
    })

    this.setState(
      {
        allCards: newAllCards,
        lists: newLists,
      }

    )
  }
  
  omit(obj, keyToOmit) {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
          key === keyToOmit ? newObj : {...newObj, [key]: value},
      {}
    );
  }
  

  handleCardAdd = (listId) => {
    //call random card to generate new function
    const newCard = this.newRandomCard();
    //need to update the state to add new random card
    
    this.setState({
      lists: this.state.lists.map(list => {
        if (listId === list.id) {
          // add card id
          return {
            // gets all old properties from the object
            ...list,
            // replaces cardIds value with new value 
            cardIds: [...list.cardIds, newCard.id],
            // alternative to using spread: list.cardIds.concat(newCard.id) - concat gives back new array instead of changing old one
          }
        } else {
          return list
        }
      }),

      allCards: {...this.state.allCards,
        [newCard.id]: newCard,
      }
    })
  }

  newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }

  render() {
    // const { state } = this;
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.allCards[id])}
              onClickAdd={this.handleCardAdd}
              onClickDelete={this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
