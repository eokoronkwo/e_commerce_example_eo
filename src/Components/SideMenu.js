import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";

export default function SideMenu(props) {
  return (
    <div>
      <Drawer anchor={"left"} open={props.open} onClose={props.toggle}>
        <List>
          <ListItem divider>
            <ListItemText>Shop By Category</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to={{
              pathname: "/products",
              search: "?category=premium&page=1",
              state: { category: "Premium" },
            }}
          >
            <ListItemText>Premium</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to={{
              pathname: "/products",
              search: "?category=essentials&page=1",
              state: { category: "Essentials" },
            }}
          >
            <ListItemText>Essentials</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to={{
              pathname: "/products",
              search: "?category=used&page=1",
              state: { category: "Used" },
            }}
          >
            <ListItemText>Used</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to={{
              pathname: "/products",
              search: "?category=vintage&page=1",
              state: { category: "Vintage" },
            }}
          >
            <ListItemText>Vintage</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to={{
              pathname: "/products",
              search: "?category=outdoor&page=1",
              state: { category: "Outdoor" },
            }}
          >
            <ListItemText>Outdoor</ListItemText>
          </ListItem>
          <ListItem
            divider
            component={Link}
            to={{
              pathname: "/products",
              search: "?category=clearance&page=1",
              state: { category: "Clearance" },
            }}
          >
            <ListItemText>Clearance</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>Account</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText></ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}