import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Cookies from "js-cookie";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/user/profile`,
          {
            headers: {
              authorization: Cookies.get("token"),
            },
          }
        );
        setProfile(response.data);
      } catch (err) {
        console.log("[Profile.err] = ", err);
      }
    }
    fetchProfile();
  }, []);

  return profile ? (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 2,
      }}
    >
      <Card>
        <CardHeader title="Profile" />
        <CardContent>
          <Typography>{`UserName: ${profile.userName}`}</Typography>
          <Typography>{`Name: ${profile.firstName} ${profile.lastName}`}</Typography>
        </CardContent>
      </Card>
    </Container>
  ) : (
    <p>Loading</p>
  );
}
