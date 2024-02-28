"use client";
import { useDispatch, useSelector } from "react-redux";
import { archivedUser, removeUser } from "../redux/slice";

const DisplayUser = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.userData.users);
    console.log("lkdflak" ,userData)
  console.log(userData);
  return (
    <div className="display-user">
      <h1>User List</h1>
      {userData.length > 0 ? (userData.map((item, i) => {
        return (
          <>
            <div className="user-item" key={i}>
              <span>{item.name}</span> <button onClick={() => dispatch(archivedUser(item.id))}>Archived</button>
            </div>
          </>
        );
      })) : (
        <h5>No Any User Listed</h5>
      )}
    </div>
  );
};

export default DisplayUser;

//className="user-item"
