import { AppBar, Box, Button, Toolbar} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import TopicSelect from './TopicSelect';

export default function NavBar({topics, setTopics}) {
  const {user} = useContext(UserContext)

  return (
    <>
      <Box sx={{flexgrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" href="/">Home</Button>
            <Button color="inherit" href="/articles">All Articles</Button>
            <TopicSelect topics={topics} setTopics={setTopics}/>
            <Button size="small" variant="outlined" color="inherit" startIcon={<PersonIcon/>}>{user ? `User: ${user.username}` : "Login"}</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
