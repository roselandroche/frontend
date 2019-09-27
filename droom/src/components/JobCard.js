import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegHeart, FaRegTimesCircle } from "react-icons/fa";
import { Spinner } from 'reactstrap';


function JobCard(props) {
    const [listings, setListings] = useState([])
    console.log(listings)
    useEffect(() => {
        axios
            .get('https://droomapi.herokuapp.com/api/sample/postings')
            .then((res) => {
                // console.log(res)
                setListings(res.data)
            })
            .catch((err) => {
                console.log(`Error: ${err}`)
            })
    }, [])

    useEffect (() => {
        const timer = setTimeout(() => {
            if(props.loading === true) {
                return <Spinner color='dark' />
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        listings.map((job, index) => (
            <div className='jobCard' key={index}>
                <p>Company: {job.company_name}</p>
                <p>Position: {job.position}</p>
                <p>Required Skills: {job.req_skills}</p>
                <p>Bonus Skills: {job.bonus_skills}</p>

                <div className='reaction'>
                    <div className='like'>
                        <FaRegHeart onClick={(e) => e.target.style.color = 'green'} />
                    </div>
                    <div className='dislike'  >
                        <FaRegTimesCircle onClick={(e) => e.target.style.color = 'red'} />
                    </div>
                </div>
            </div>
    )))
}

export default JobCard;