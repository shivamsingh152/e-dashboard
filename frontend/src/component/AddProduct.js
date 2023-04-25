import React from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = ()=>{
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    const navigate = useNavigate();

    const handleAddproduct = async ()=>{
        console.warn(!name)
        if(!name  || !price  || !category  || !company ){
            setError(true)
            return false;
        }

          const userId  = JSON.parse(localStorage.getItem('user'))._id;
          let result = await fetch('http://localhost:8000/addproduct',{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          });
          result = await result.json();
          console.warn(result)
          if(result){
            navigate('/')
        }

    }

    return (
        <div className="inputbox">
            <h1>Add Product</h1> 

            <input className="input" type="text" placeholder="Enter product name" 
            onChange={(e)=>{setName(e.target.value)}} value={name} required
            />
            {error && !name && <span className="invalidinput">Enter valid name</span>}
            
            <input className="input" type="text" placeholder="Enter product price"
            onChange={(e)=>{setPrice(e.target.value)}} value={price} required
            />
            {error && !price && <span className="invalidinput">Enter valid price</span>}
            
            <input className="input" type="text" placeholder="Enter product category"
            onChange={(e)=>{setCategory(e.target.value)}} value={category} required
            />
            {error && !category && <span className="invalidinput">Enter valid category</span>}
            
            <input className="input" type="text" placeholder="Enter product company"
            onChange={(e)=>{setCompany(e.target.value)}} value={company} required
            />
            {error && !company && <span className="invalidinput">Enter valid company</span>}
            
            <button className="btn" type="submit" onClick={handleAddproduct}>
                Add Product</button>
        </div>
    )
}

export default AddProduct;