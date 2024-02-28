import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  fetchApiArchivedOrRestoreFriend,
  fetchApiDeleteFriend,
  fetchApiGetFriend,
} from "../redux/slice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "../helpers/common-functions";

const ArchivedFriend = ({ archivedFriends, token }) => {
  const dispatch = useDispatch();

  const restoreFriends = (friendId) => {
    const payload = {
      isArchived: false,
      friend_id: friendId,
      token: token,
    };
    dispatch(fetchApiArchivedOrRestoreFriend(payload))
      .then(unwrapResult)
      .then((response) => {
        if (response.status) {
          dispatch(fetchApiGetFriend({ ...payload, isArchived: true }));
          showSuccessToastMessage(response.message);
        } else {
          showErrorToastMessage(response.message);
        }
      });
  };

  const deleteFriend = (friendId) => {
    const payload = {
      friend_id: friendId,
      token: token,
    };
    dispatch(fetchApiDeleteFriend(payload))
      .then(unwrapResult)
      .then((response) => {
        if (response.status) {
          dispatch(fetchApiGetFriend({ ...payload, isArchived: true }));
          showSuccessToastMessage(response.message);
        } else {
          showErrorToastMessage(response.message);
        }
      });
  };

  return (
    <>
      <h1 style={{ textAlign: `center` }}>My Archived Friends</h1>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexWrap: `wrap`,
        }}
      >
        {archivedFriends.length > 0 ? (
          archivedFriends?.map((friend) => {
            return (
              <div className="card" key={friend._id}>
                <div
                  style={{
                    textAlign: `end`,
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `self-end`,
                  }}
                >
                  <Button
                    endIcon={<DeleteIcon />}
                    sx={{ color: `black` }}
                    onClick={() => deleteFriend(friend._id)}
                  ></Button>
                </div>
                <h1 style={{ color: `black` }}>{friend.friend_name}</h1>
                <p className="card-title">{friend.friend_type}</p>
                <p style={{ color: `black` }}>{friend.friend_address}</p>
                <p>
                  <button className="card-btn">{friend.friend_contact}</button>
                </p>
                <div
                  style={{
                    width: `100%`,
                    display: `flex`,
                    justifyContent: `center`,
                  }}
                >
                  <button
                    style={{
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                      backgroundColor: `black`,
                      color: `white`,
                      margin: `5px`,
                      border: `none`,
                      padding: `8px 12px`,
                      borderRadius: `5px`,
                      cursor: `pointer`,
                    }}
                    onClick={() => restoreFriends(friend._id)}
                  >
                    Restore
                    <RestoreIcon sx={{ marginLeft: `20px` }} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h1 style={{ color: `gray` }}>{"No Friend Archive.! :)"}</h1>
        )}
      </div>
    </>
  );
};

export default ArchivedFriend;
