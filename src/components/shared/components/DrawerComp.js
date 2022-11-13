import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

const DrawerComp = () => {

  const [open, setOpen] = useState(false)
  return (
    <React.Fragment>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItemButton component={Link} to={"/news"}>
            <ListItemIcon>
              <ListItemText>
                Ajankohtaista
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton component={Link} to={"/players"}>
            <ListItemIcon>
              <ListItemText>
                Pelaajat
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton sx={{ marginLeft: "auto", color: "white" }} onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton >
    </React.Fragment >
  )
}

export default DrawerComp;