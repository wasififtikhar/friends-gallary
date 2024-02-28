'use client'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUsers } from "../redux/slice"
import Link from "next/link"

const AddUser = () => {
    const [name, setName] = useState("")
    const dispatch = useDispatch();

    const userDispatched = () => {
        dispatch(addUsers(name))
    }
  return (
    <div className="add-user">
        <h1>Add Users</h1>
        <input type="text" placeholder="Add New User" className="add-user-input" onChange={(e) => setName(e.target.value)}/>
        <button className="add-user-btn" onClick={() => userDispatched()}>Add New Users</button>
        <Link href={'/archive-restore-users'}>Go to Archive users</Link> <br />
        <Link href={'/apiUsers'}>Go to API users</Link>
    </div>
  )
}

export default AddUser;