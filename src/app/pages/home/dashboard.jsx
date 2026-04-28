import { Container, Typography } from "@mui/material";
//import ItemTable from "../components/ItemTable";
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="body1">
        Welcome, {userInfo?.username}!
      </Typography>
    </Container>
  );
}