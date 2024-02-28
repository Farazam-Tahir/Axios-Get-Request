import React from 'react';
import axios,{ Axios } from 'axios';
import { useState, useEffect } from 'react';

const ApiData = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [myData, setMyData] = useState([]);
    const [isError, setError] = useState();

    // function fetchData(){
    //     setIsLoading(true);
    //     axios.get('https://jsonplaceholder.typicode.com/posts')
    //     .then((res)=>{
    //         setMyData(res.data);
    //         setIsLoading(false);
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //         setIsLoading(false);
    //     })
    // } or by using async await

    const fetchData = async () => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setMyData(res.data.slice(0,15));
            console.log(res.data.slice(0,15));
            setError(null)
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    }

    useEffect(()=>{
        fetchData()
    }, []);

  return (
    isLoading ? <p>Loading...</p> : 

    <>
    {isError? <h1 style={{textAlign: 'center'}}>{isError}</h1>:

    <div className='item-box'>
        {myData.slice(0,15).map((val)=>{
            return(
            <div key={val.id} className='item'>
                <h1>API Item No {val.id}</h1>
                <h2>{val.title.slice(0,5).toUpperCase()}</h2>
                <p>{val.body.slice(0,100)}</p>
            </div>
            )
        })
        }
    </div>
    }
    </>
)}

export default ApiData
