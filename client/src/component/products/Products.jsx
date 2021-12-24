import React from 'react'
import Product from '../singleProduct/Product';
import './Products.css'
import {Link} from 'react-router-dom';
const Products = (props) => {
    const {items,routeName,title} =props;
    let newItems = [];
    for(let i=0; i<4;i++){
        newItems[i]=items[i];
    }
    
    return (
        <div className= 'allcontainer'>
            <h2>{title}</h2>
            <div className= 'products-container'>
            {newItems.map(item => <Product key= {item.id} {...item} />)}
            
            </div>
            <Link to={`/${routeName}`}> <button className='morebutton'>More</button> </Link>
            
        </div>
    )
}

export default Products
