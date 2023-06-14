import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const ExpiredSession = () =>  {

    return(
        <Typography>Istuntosi on vanhentunut. <Link to={"/login"}>Kirjaudu sisään uudeeleen</Link> jatkaaksesi</Typography>
    )

} 

export default ExpiredSession;
