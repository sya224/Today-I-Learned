import React from 'react';
import Favlist from './Favlist';

const Listing = ({cards, type}) => {
    return cards.map(list=> <Favlist list={list} key={list.id}/>)
}
export default Listing;