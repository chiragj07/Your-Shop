import React,{useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import SHOP_DATA from '../../assets/shop';
import Product from '../../component/singleProduct/Product';
import '../../component/products/Products.css'
const CategProPage = () => {
    const param = useParams();
    const cat =param.title;
    

    const [catItems, setCatItems] = useState([]);
    useEffect(() => {
        const addItems = ()=>{
            const items = SHOP_DATA.filter(it => it.routeName === cat );
            const listItems= items[0].items;
            setCatItems(listItems);
            
        }

        addItems();
    }, [cat])
    
    
    return (
        <div className='allcontainer'>
            <h2>{cat.toUpperCase()}</h2>
            <div className="products-container">
        {catItems.map(item=><Product key={item.id} {...item} />)}
        </div>

        </div>
    )
}

export default CategProPage
