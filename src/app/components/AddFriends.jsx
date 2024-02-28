import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { useFormik } from "formik";
import * as Yup from "yup";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import {
  fetchApiFriendList,
  fetchApiGetFriend,
  fetchApiUpdateFriend,
} from "../redux/slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "../helpers/common-functions";
const AddFriends = ({
  handleClose,
  getFriendsPayload,
  userId,
  friendToUpdate,
  token,
}) => {
  const [friendType, setFriendType] = useState("");
  const [currentUserId, setcurrentUserId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setcurrentUserId(userId);
  }, []);

  const types = [
    "Best Friend",
    "Some time Friend",
    "selfish",
    "Topi",
    "Harami",
  ];

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setFriendType(value);
  };

  const formik = useFormik({
    initialValues: {
      friend_name: friendToUpdate ? friendToUpdate.friend_name : ``,
      friend_contact: friendToUpdate ? friendToUpdate.friend_contact : ``,
      friend_address: friendToUpdate ? friendToUpdate.friend_address : ``,
      friend_type: friendToUpdate ? friendToUpdate.friend_type : ``,
    },
    validationSchema: Yup.object({
      friend_name: Yup.string().required(`Friend Required`),
      friend_contact: Yup.string().required(`Friend Contact Required`).matches(/^[0-9]+$/, "Must be only digits").min(8, 'Invalid Contact').max(16, 'Invalid Contact'),
      friend_address: Yup.string().required(`Address Required`),
      friend_type: Yup.string().required(`Friend Type Required`),
    }),
    onSubmit: (values) => {
      const payload = {
        ...values,
        current_user_id: currentUserId,
      };
      if (friendToUpdate) {
        const payload = {
          ...values,
          _id: friendToUpdate._id,
        };
        dispatch(fetchApiUpdateFriend({ payload, token: token }))
          .then(unwrapResult)
          .then((response) => {
            console.log(response)
            handleClose();
            dispatch(fetchApiGetFriend(getFriendsPayload));
            showSuccessToastMessage(response.message);
          })
          .catch((error) => {
            showErrorToastMessage(error.message);
          });
      } else {
        dispatch(fetchApiFriendList(payload))
          .then(unwrapResult)
          .then((response) => {
            handleClose();
            dispatch(fetchApiGetFriend(getFriendsPayload));
            showSuccessToastMessage(response.message);
          })
          .catch((error) => {
            showErrorToastMessage(error.message);
          });
      }
      formik.resetForm();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
            alignItems: `center`,
            backgroundColor: `white`,
            boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px;`,
            color: `white`,
            padding: `20px`,
            borderRadius: `10px`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <h2 style={{ color: "black" }}>
              {friendToUpdate ? `Update Your Friend` : `Save Your Friend`}
            </h2>
          </Box>

          <Box
            sx={{
              display: `flex`,
              justifyContent: `space-between`,
              flexDirection: `column`,
            }}
          >
            <Box
              sx={{
                margin: `12px 10px`,
              }}
            >
              <TextField
                id="outlined-basic"
                label="Friend Name"
                variant="outlined"
                helperText={
                  formik.touched.friend_name && formik.errors.friend_name
                }
                error={
                  formik.touched.friend_name &&
                  Boolean(formik.errors.friend_name)
                }
                {...formik.getFieldProps(`friend_name`)}
              />
            </Box>
            <Box
              sx={{
                margin: `12px 10px`,
              }}
            >
              <TextField
                id="outlined-basic"
                label="Friend Contact"
                variant="outlined"
                helperText={
                  formik.touched.friend_contact && formik.errors.friend_contact
                }
                error={
                  formik.touched.friend_contact &&
                  Boolean(formik.errors.friend_contact)
                }
                {...formik.getFieldProps(`friend_contact`)}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: `flex`,
              justifyContent: `space-between`,
              flexDirection: `column`,
            }}
          >
            <Box
              sx={{
                margin: `12px 10px`,
              }}
            >
              <TextField
                id="outlined-basic"
                label="Friend Address"
                variant="outlined"
                helperText={
                  formik.touched.friend_address && formik.errors.friend_address
                }
                error={
                  formik.touched.friend_address &&
                  Boolean(formik.errors.friend_address)
                }
                {...formik.getFieldProps(`friend_address`)}
              />
            </Box>

            <FormControl sx={{ m: 1, width: 225 }}>
              <InputLabel id="friend-type-label">Friend Type</InputLabel>
              <Select
                labelId="friend-type-label"
                id="friend-type"
                value={friendType}
                onChange={handleSelectChange}
                error={
                  formik.touched.friend_type &&
                  Boolean(formik.errors.friend_type)
                }
                input={<OutlinedInput label="Friend Type" />}
                {...formik.getFieldProps(`friend_type`)}
              >
                {types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formik.touched.friend_type && formik.errors.friend_type && (
              <p
                style={{
                  margin: "3px 0px",
                  color: `red`,
                  fontSize: `12px`,
                }}
              >
                *{formik.errors.friend_type}
              </p>
            )}
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "flex-end", margin: `20px 0px` }}
          >
            <Button
              variant="contained"
              endIcon={friendToUpdate ? <UpgradeIcon /> : <SaveIcon />}
              sx={{ margin: `10px 0px` }}
              type="submit"
            >
              {friendToUpdate ? `Update` : `save`}
            </Button>
            <Button
              variant="contained"
              sx={{ margin: `10px 5px` }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>

        </Box>
      </form>
    </>
  );
};

export default AddFriends;
