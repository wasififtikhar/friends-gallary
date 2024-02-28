"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApiArchivedOrRestoreFriend,
  fetchApiGetFriend,
} from "../redux/slice";
import { useEffect, useState } from "react";
import CustomModal from "../components/CustomModal";
import Navbar from "../components/Navbar";
import { Box, Button, Tab, Tabs } from "@mui/material";
import AddFriends from "../components/AddFriends";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import TabPanel from "../components/TabPanel";
import ArchivedFriend from "../components/ArchivedFriend";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "../helpers/common-functions";

const UserApi = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedUserIndex, setSelecteduserIndex] = useState(null);
  const [friends, setFriends] = useState([]);
  const [value, setValue] = useState(0);
  const [friendToUpdate, setFriendToUpdate] = useState(null);

  const { loggedInUser } = useSelector((data) => data.userData);
  const { currentUserFriends } = useSelector((data) => data.userData);

  const payload = {
    isArchived: false,
    token: loggedInUser?.token,
  };

  useEffect(() => {
    dispatch(fetchApiGetFriend(payload));
  }, []);

  useEffect(() => {
    setFriends(currentUserFriends);
  }, [currentUserFriends]);

  useEffect(() => {
    setUsername(loggedInUser?.user_name);
  }, [loggedInUser]);

  const archivedFriends = (friendId) => {
    const payload = {
      isArchived: true,
      friend_id: friendId,
      token: loggedInUser?.token,
    };
    dispatch(fetchApiArchivedOrRestoreFriend(payload))
      .then(unwrapResult)
      .then((response) => {
        if (response.status) {
          dispatch(fetchApiGetFriend({ ...payload, isArchived: false }));
          showSuccessToastMessage(response.message);
        } else {
          showErrorToastMessage(response.message);
        }
      });
  };

  const updateFriend = (friend) => {
    setShow(true);
    setFriendToUpdate(friend);
  };

  const handleChange = (__, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      dispatch(fetchApiGetFriend({ ...payload, isArchived: true }))
        .then(unwrapResult)
        .then((response) => {});
    } else {
      dispatch(fetchApiGetFriend({ ...payload, isArchived: false }))
        .then(unwrapResult)
        .then((response) => {});
    }
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Navbar username={username} />
      <Box sx={{ width: "100%" }}>
        <Box
          style={{ backgroundColor: `white` }}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Friends" {...a11yProps(0)} />
            <Tab label="Archived Friends" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <h1 style={{ textAlign: `center` }}>My Friends</h1>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setShow(!show)}
              sx={{ margin: `10px` }}
            >
              {selectedUserIndex ? `Edit Friend` : `Add Friends`}
            </Button>
          </div>

          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              flexWrap: `wrap`,
            }}
          >
            {friends.length > 0 ? (
              friends?.map((friend) => {
                return (
                    <div className="card" key={friend._id}>
                      <div style={{ textAlign: `end` }}>
                        <Button
                          endIcon={<EditIcon />}
                          sx={{ margin: `10px 0px`, color: `black` }}
                          onClick={() => updateFriend(friend)}
                        ></Button>
                      </div>
                      <h1 style={{ color: `black` }}>{friend.friend_name}</h1>
                      <p className="card-title">{friend.friend_type}</p>
                      <p style={{ color: `black` }}>{friend.friend_address}</p>
                      <p>
                        <button className="card-btn">
                          {friend.friend_contact}
                        </button>
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
                          onClick={() => archivedFriends(friend._id)}
                        >
                          Archived
                          <ArchiveIcon sx={{ marginLeft: `20px` }} />
                        </button>
                      </div>
                    </div>
                );
              })
            ) : (
              <h1 style={{ color: `gray` }}>{"Now You are friendless.! :("}</h1>
            )}
          </div>

          <CustomModal
            open={show}
            handleClose={() => {
              setShow(false);
              setFriendToUpdate(null);
            }}
          >
            <AddFriends
              handleClose={() => {
                setShow(false);
                setFriendToUpdate(null);
              }}
              userId={loggedInUser._id}
              getFriendsPayload={payload}
              friendToUpdate={friendToUpdate}
              token={loggedInUser?.token}
            />
          </CustomModal>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ArchivedFriend
            archivedFriends={friends}
            token={loggedInUser?.token}
          />
        </TabPanel>
      </Box>
    </>
  );
};

export default UserApi;
