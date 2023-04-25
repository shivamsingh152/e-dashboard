import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const ProductList = ()=>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
      getProducts();
    }, []) //eslint disable-line

    const getProducts = async ()=>{
        let result = await fetch('http://localhost:8000/product',{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }) 
            result = await result.json()
            setProducts(result)
    }

    const handledelete =  async (_id)=>{
        let result = await fetch(`http://localhost:8000/products/${_id}`,{
            method:'Delete',
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result){
            alert('Record is deleted')
            getProducts();
        }
    }
    
    const handlesearch = async (event) => {
        let key = event.target.value;
        if(key){
        let result = await fetch(`http://localhost:8000/search/${key}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result){
            setProducts(result)
        }
        }
        else{
            getProducts();
        }
        
    }
     
    return (
        <div>
            <input className="search-list" type="text" placeholder="Search Product"
            onChange={handlesearch}/>
            <div className="product-list">
            <h1>Product List</h1>
            <ul className="ul-list ">
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length >0 ? products.map((item,index)=>
                <ul className="li-list" key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>Rs {item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li>
                    <button onClick={()=>handledelete(item._id)}>Delete</button>
                    <button className="btn-update"><Link to={'/update/'+item._id}>Update</Link></button>
                    </li>
                </ul>
                )
                : <h1>No Result Found</h1>
            }
            
            
        </div>
        </div>
    )
}

export default ProductList;