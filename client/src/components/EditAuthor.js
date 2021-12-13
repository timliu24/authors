import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import '../App.css';

const EditAuthor = (props) => {
    const [errors, setErrors] = useState({});
    const [authorName, setAuthorName] =useState("");
    const {_id} = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${_id}`)
        .then((response) => {
            console.log(response.data);
            setAuthorName(response.data.authorName);
        })
        .catch((err) => {
            console.log(err);
            navigate('/error');
        })
    }, [_id])

    const updateSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/authors/${_id}`,
        {authorName}
        )
        .then((response) => {
            console.log(response.data);
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors);
        })
    }

    return (
        <div>
            <header>
                <h1>Favorite authors</h1>
                <Link to={"/"}>Home</Link>
            </header>
            <h3>Edit this author:</h3>
            <form onSubmit={updateSubmitHandler} className='form-box'>
                <label>Name: </label>
                <input onChange={(e) => setAuthorName(e.target.value)}
                value={authorName}
                name="authorName"
                type="text"
                /> 
                {errors.authorName ? <span>{errors.authorName.message}</span> :null}
                <div>
                    <button className='button-form' onClick={(e) => navigate("/")}>Cancel</button>
                    <button className='button-form'>Submit</button>
                </div>
            </form>
        </div>
    )

}

export default EditAuthor;