import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
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
            onClick={props.toggle}
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
            onClick={props.toggle}
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
            onClick={props.toggle}
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
            onClick={props.toggle}
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
            onClick={props.toggle}
          >
            <ListItemText>Outdoor</ListItemText>
          </ListItem>
          <ListItem
            button
            divider
            component={Link}
            to={{
              pathname: "/products",
              search: "?category=clearance&page=1",
              state: { category: "Clearance" },
            }}
            onClick={props.toggle}
          >
            <ListItemText>Clearance</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>Account</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
