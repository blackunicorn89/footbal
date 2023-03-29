import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/UserActions";
import UserRow from "./UserRow";
import { Grid, Button } from "@mui/material"
import { Link } from "react-router-dom";

const Users = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers())
  }, []);


  const appState = useSelector((state) => state);
  console.log(appState)

  let user = appState.user.users.map((user) => {

    return (
      <Grid item xs={12} sm={6} md={4} lg={12} key={user.id}>
        <UserRow id={user.id} firstname={user.firstname} lastname={user.lastname} email={user.email} admin = {user.admin} />
      </Grid >
    )
  })

  return (
    <React.Fragment>
      <Grid align="center" >
        <h2>Käyttäjät</h2>
        {appState.login.admin &&
          <Button color="primary" variant="contained" margin="normal" component={Link} to={"/users/register"} fullWidth sx={{ padding: 1, margin: 2 }} >Lisää Käyttäjä</Button>
        }
      </Grid>
      <Grid container spacing={2} alignItems="center" justify="center">
        {user}
      </Grid>
    </React.Fragment>
  )
}

export default Users;
