"use client";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, restoreUser } from "../redux/slice";

const DisplayUser = () => {
  const dispatch = useDispatch();
  const archivedData = useSelector((state) => state.userData.archived);
  console.log(archivedData);
  return (
    <div className="display-user">
      <h1>Archived Users</h1>
      {archivedData.length > 0 ? (archivedData.map((item, i) => {
        return (
          <>
            <div className="user-item" key={i}>
              <span>{item.name}</span>{" "}
              <span>
              <button onClick={() => dispatch(restoreUser(item.id))}>Restore</button>{" "}
              <button onClick={() => dispatch(deleteUser(item.id))}>
                Permanent Delete
              </button>
              </span>
            </div>
          </>
        );
      })) : (
        <h5>No Any User Archived Now!</h5>
      )}
    </div>
  );
};

export default DisplayUser;

//className="user-item"
