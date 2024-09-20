import axios from "axios";
import { useEffect,useState } from "react";
import './App.css';

function App() {
    const [users,setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);

    const getAllusers = async () => {
      await axios.get("http://localhost:8000/users").then
      ((res) => {
          setUsers(res.data);
          setFilterUsers(res.data);
      });
    };
    useEffect(()=>{
      getAllusers();
    }, []);

    //search function
    const handleSearchChange = (e) => {
      const searchText = e.target.value.toLowerCase();
      const filteredUsers = users.filter((user) => user.name.
      toLowerCase().includes(searchText) || user.city.toLowerCase().includes(searchText)
    );
    setFilterUsers(filteredUsers);
    };

  return (
    <>
      <div className='container'>
        <h3>Student Management System</h3>
        <div className="input-search">
          <input type = "search" placeholder="Search Text Here" onChange ={handleSearchChange}/>
          <button className="btn green">Add button</button>
        </div>
        <table className = "table"> 
         <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
         </thead>
         <tbody>
          {filterUsers && filterUsers.map((user, index)=>{
            return(
              <tr key={user.id}> 
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.city}</td>
                <td>
                  <button className="btn green"> Edit</button>
                </td>
                <td>
                  <button className="btn red">Delete</button>
                </td>
              </tr> 
            );
          }
          )}   
         </tbody>
        </table>
      </div>
    </>
  )
}

export default App
