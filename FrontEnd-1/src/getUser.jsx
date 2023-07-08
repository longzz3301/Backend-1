import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";



const User = () => {
    const [dataSource , setDataSource] = useState([])
    useEffect (() => {
        const getDataUser = async() => {
            const response= await axios.get('http://localhost:3000/apiv2/getAllUser' ,{headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}` 
            }})
            const data = response.data
            console.log(data)
            console.log(response)
            setDataSource(data)
        }
        getDataUser()
        
    },[])
    
      
      const columns = [
        {
          title: 'username',
          dataIndex: 'username',
          key: 'name',
        },
        {
          title: 'password',
          dataIndex: 'password',
          key: 'password',
        },
        {
          title: 'Role',
          dataIndex: 'Role',
          key: 'role',
        },
      ];
      return(<Table dataSource={dataSource} columns={columns} />)
      
}

export default User
  