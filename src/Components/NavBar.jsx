import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function NavBar() {
  const {user} = useContext(UserContext)

  return (
    <>
      <Box sx={{flexgrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" href="/">Home</Button>
            <Button color="inherit" href="/articles">All Articles</Button>
            <Button variant="outlined" color="inherit" startIcon={<PersonIcon/>}>{user ? user.username : "Login"}</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
