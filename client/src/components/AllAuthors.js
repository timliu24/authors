import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import '../App.css';

const AllAuthors = (props) => {
    const [authorList, setAuthorList] = useState([]);
        
    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
        .then((response) => {
            console.log(response);
            console.log(response.data);
            setAuthorList(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const deleteHandler = (idToDelete) =>{
        axios.delete(`http://localhost:8000/api/authors/${idToDelete}`)
        .then((response) => {
            console.log(response.data);
            setAuthorList(authorList.filter((author) => author._id !== idToDelete))
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <div>
            <header>
                <h1>Favorite authors</h1>
                <Link to={"/new"}>Add an author</Link>
            </header>
            <h3>We have quotes by:</h3>
            <table className='table'>
                <thead className='table-head'>
                    <tr>
                        <th>Author</th>
                        <th>Actions available</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authorList?
                        authorList.map((author, index) => (
                            <tr key={index}>
                                <td>{author.authorName}</td>
                                <td>
                                    <button className='button-edit' onClick={() => {navigate(`/edit/${author._id}`)}}>Edit</button>
                                    <button className='button-delete' onClick={() => deleteHandler(author._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                        :null
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllAuthors;