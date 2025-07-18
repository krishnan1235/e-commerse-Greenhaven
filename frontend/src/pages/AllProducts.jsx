import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AllProducts = () => {

    const [allData, setAllData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/v1/get");
                // const res = await axios.get("https://e-commerse-greenhaven.onrender.com/api/v1/get");
                console.log("Response Data:", res.data.data); // Log fetched data
                setAllData(res.data.data); // Update the state
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


//   return (
//     <>
//         <div>
//             <h1>Fetched Data</h1>
//             <ul>
//                 {allData.map((item, index) => (
//                     <div key={index}>
//                     <li>{JSON.stringify(item)}</li>
                   
//                     </div>
//                 ))}
//             </ul>
//         </div>
//     </>
//   )
}

export default AllProducts