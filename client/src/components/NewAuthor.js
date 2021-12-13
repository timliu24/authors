import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import '../App.css';

const NewAuthor = (props) => {
    const [errors, setErrors] = useState("");
    const [authorName, setAuthorName] =useState("");

    const newSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/authors`,
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
            <h3>Add a new author:</h3>
            <form onSubmit={newSubmitHandler} className='form-box'>
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

export default NewAuthor;