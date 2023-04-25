import React, {useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = ()=>{
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      getProductDetails();
    }, []) //eslint-disable-line
    
    const getProductDetails =  async()=>{
        let result = await fetch(`http://localhost:8000/products/${params._id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const handleUpdateproduct = async ()=>{
        console.warn(name,price,category,company);
        let result = await fetch(`http://localhost:8000/product/${params._id}`,{
            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
           navigate('/')
     
    }

    return (
        <div className="inputbox">
            <h1>Update Product</h1> 

            <input className="input" type="text" placeholder="Enter product name" 
            onChange={(e)=>{setName(e.target.value)}} value={name} required
            />
            
            <input className="input" type="text" placeholder="Enter product price"
            onChange={(e)=>{setPrice(e.target.value)}} value={price} required
            />
            
            <input className="input" type="text" placeholder="Enter product category"
            onChange={(e)=>{setCategory(e.target.value)}} value={category} required
            />
            
            <input className="input" type="text" placeholder="Enter product company"
            onChange={(e)=>{setCompany(e.target.value)}} value={company} required
            />
            
            <button className="btn" type="submit" onClick={handleUpdateproduct}>
                Update Product</button>
        </div>
    )
}

export default UpdateProduct;