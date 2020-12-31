import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
    const userId = useParams().id
    const user = useSelector(state => state.users.find(item => item.id===userId))
    if (!user) {
        return null
    }
    return(
        <Card style={{padding:20}}>
            <h4>{user.name}</h4>
            <div>
                <h5>added blogs</h5>
                <ul>
                    {user.blogs.map((blog)=>(
                        <div key={blog.id}>
                        <li>{blog.title}</li>
                        </div>
                     ))
                    }   
                </ul>
                
            </div>
        </Card>
    )
    
}

export default User
