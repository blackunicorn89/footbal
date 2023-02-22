import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { editSeasonGame } from "../../actions/SeasonGameActions";
import { Box, Grid, Paper, TextField, Button} from "@mui/material"
import SeasonGameGoalMakerRow from "./SeasonGameGoalMakerRow";
import SeasonGamePlayerRow from "./SeasonGamePlayerRow";
import {  useFormik } from "formik";
import * as yup from "yup";

const EditSeasonGame = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const seasonGameId = useParams()
    
    //Parsetaan numeroksi, koska id:n arvo on numero. Parametrinä tuleva seasonGameId on stringi, jonka vuoksi kauden pelin haku kaatuu
    const id = parseInt(seasonGameId.id)

    const appState = useSelector((state) => state);

    const login = useSelector((state) => 
      state.login
    );
  
    const seasonGames = useSelector((state) =>
      state.seasonGame
    )
  
    console.log("kauden pelit")
    console.log(seasonGames)

    let games = []
    seasonGames.seasonGames.map((season) => {
    if (season.active)
    {
      games = season.games
    }
  })

  const game = games.find((games => games.id === id))

  const validationSchema = yup.object({
    season_name: yup
      .string("Pakollinen kenttä.")
      .required("Pakollinen kenttä"),
    game: yup
      .string("Pakollinen kenttä.")
      .required("Pakollinen kenttä"),
    final_result: yup
      .string("Pakollinen kenttä.")
      .required("Pakollinen kenttä"),
    played: yup
      .date("Kirjoita hyväkysyttävä päivämäärä.")
      .required("Pakollinen kenttä."),
    players: yup
      .array().min(1, "Vähintään yksi pelaaja on lisättävä")
  });

    // MUI TEXTFIELD DEFAULT DATE 

  const dateNow = new Date(game.played); // Creating a new date object with the current date and time
  const year = dateNow.getFullYear(); // Getting current year from the created Date object
  const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
  const month = // Setting current Month number from current Date object
    monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 if not to adjust for date input.
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const date =
    dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
      ? `0${dateNow.getUTCDate()}`
      : dateNow.getUTCDate();
  const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>

  // END MUI TEXTFIELD DEFAULT DATE

    /*const formik = useFormik({
      initialValues: {
      id: id,   
      season_name: game.season_name,
      game: game.game,
      final_result: game.final_result,
      played: materialDateInput,
      description: game.description,
      currentPlayers: game.players,
      currentGoalMakers: game.goal_makers,
      players: [],
      goal_makers: []
      },
      validationSchema: validationSchema,
        onSubmit: (values) => {
        dispatch(editSeasonGame(login, values));
        navigate("/seasongames");
    },

      })*/
      
  const listOfCurrentPlayers = game.players.map((currentPlayer) =>  <li>{currentPlayer.name}</li>);
  const listOfCurrentGoalMakers = game.goal_makers.map((currentGoalMaker) =>  <li>{currentGoalMaker.name}{currentGoalMaker.points}</li>);

  const [playerDropDown, setPlayerDropDown] = useState('')
  const [players, setPlayers] = useState([]) 

  const [goalMakerDropDown, setGoalMakerDropDown] = useState('')
  const [points, setPoints] = useState(1)
  const [goal_makers, setGoalMakers] = useState([])

  const [generalGameInformation, setGeneralGameInformation] = useState({
    season_name: game.season_name,
    game: game.game,
    final_result: game.final_result,
    played: materialDateInput,
    description: game.description,
  })

  //Tilojen muutosten hallinta
 const handleGoalMakerDropdownChange = (event) => {
  setGoalMakerDropDown(event.target.value);
  
};

const handlePlayerDropdownChange = (event) => {
 setPlayerDropDown(event.target.value);
};

const handlePointsChange = (event) => {
  setPoints(event.target.value);
};

const handeGeneralInformationChange = (event) => {
 setGeneralGameInformation((generalGameInformation) => {
     return {
         ...generalGameInformation,
         [event.target.name]:event.target.value
     }
 })
 setGoalMakers ([
   ...goal_makers,
   
 ])
 setPlayers ([
   ...players,
 ])
}

//Submittien hallinta
const saveGoalMaker = (e) => {
    e.preventDefault()

    //Alusutkset
    let goalMaker = []
    let name = ""
    let goalMakerId = 0

    //Filteröidään dropwdownista tulleen id:perusteella oikean pelaajan tiedot
    goalMaker = goalMakersData.filter((goalmaker) => goalmaker.id === goalMakerDropDown)

    //otetaan pelaajan nimi ja ja id talteen. Pisteet tulevat points-statesta. Koska goalMaker taulukon ei pitiäsi koskaan sisältää kuin yksi arvo,
   //voidaan käyttää suoraan indeksiviittauksia
    name = goalMaker[0].player_name
    goalMakerId = goalMaker[0].id

    setGoalMakers ([
      ...goal_makers,
      {"name": name, "points": points, "id": goalMakerId}
      
    ])
}

const savePlayer = (e) => {
 e.preventDefault()

 setPlayers ([
   ...players,
   {"name":playerDropDown}
   
 ])  
}

 const onGameSubmit = (e) => {
   e.preventDefault()
   let game = {
     ...generalGameInformation,
     goal_makers,
     players
   }
   dispatch(addSeasonGame(login, game));
   navigate("/seasongames")

 }  

 //Muut
 
 //Asettaa oletusarvon pelaajan pisteille
 const inputProps = {
   min: 1,
 };
      

      return (
        <Grid>
          <Paper elevation={10}>
            <Grid align="center">
              <h1>Muokkaa kauden pelin tietoja</h1>
            </Grid>
            {/*Pelaajien lisäys formi*/}
            <form onSubmit = {savePlayer}>
            <p>Nykyinen joukkuekokoonpano</p>
              <ul>
                {listOfCurrentPlayers}
              </ul>
            <p>Muokkaa joukkuekokoonpanoa</p>  
            <InputLabel id="demo-simple-select-label">Lisää pelaajat</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value = {playerDropDown}
              label="Maalintekijät"
              onChange={handlePlayerDropdownChange}>
              {playerData.map((player) => <MenuItem key={player.id} value={player.player_name}>{player.player_name}</MenuItem>)}  
            </Select>
            <Box display="flex" justifyContent="flex-start">
            <Button type="submit" color="primary" variant="contained" margin="normal" sx={{ padding: 1, margin: 2 }} >Lisää Pelaaja</Button>
            </Box>        
            </form>
            {/*Maalientekijöiden ja pisteiden lisäysformi*/} 
            <form onSubmit = {saveGoalMaker}>
            <p>Maalintekijät</p>
              <ul>
                {listOfCurrentGoalMakers}
              </ul>
              <p>Lisää poistaa maalintekijöitä</p>  
            <InputLabel id="demo-simple-select-label">Lisää maalintekijät</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value = {goalMakerDropDown}
              label="Maalintekijät"
              onChange={handleGoalMakerDropdownChange}>
              {/*asetetaan arvoksi poikkeuksellisesti id, koska sitä tarvitaan pelaajan pistetietojen päivittämiseen*/}
              {playerData.map((goalMaker) => <MenuItem key={goalMaker.id} value={goalMaker.id}>{goalMaker.player_name}</MenuItem>)}  
            </Select>
            <TextField
             type="number"
             label="Pisteet"
             inputProps={inputProps}
             name="points"
             value={points}
             onChange={handlePointsChange}
             margin="normal"
             fullWidth required
             InputLabelProps={{ shrink: true }} /> 
            <Box display="flex" justifyContent="flex-start">
            <Button type="submit" color="primary" variant="contained" margin="normal" sx={{ padding: 1, margin: 2 }} >Lisää maalintekijä</Button>
            </Box>          
            </form>
            {/*Yleisten tietojen lisäysformi*/} 
            <form onSubmit={onGameSubmit}> 
            <TextField
             type="text"
             label="Kausi"
             name="season_name"
             value={generalGameInformation.season_name}
             onChange={handeGeneralInformationChange}
             /*error={formik.touched.season_name&& Boolean(formik.errors.season_name)}
             helperText={formik.touched.season_name && formik.errors.season_name}*/
             margin="normal"
             fullWidth required
             InputLabelProps={{ shrink: true }} /> 
              <TextField type="text"
                label="Peli"
                name="game"
                value={generalGameInformation.game}
                onChange={handeGeneralInformationChange}
                error={formik.touched.game&& Boolean(formik.errors.game)}
                helperText={formik.touched.game && formik.errors.game}
                margin="normal"
                fullWidth required
                InputLabelProps={{ shrink: true }}
              />
              <TextField type="text"
                label="Tulos"
                name="final_result"
                value={generalGameInformation.final_result}
                onChange={handeGeneralInformationChange}
                error={formik.touched.final_result&& Boolean(formik.errors.final_result)}
                helperText={formik.touched.final_result && formik.final_result}
                margin="normal"
                fullWidth required
                InputLabelProps={{ shrink: true }}
            />                 
              <TextField
                type="date"
                label="Päivämäärä"
                name="played"
                value={generalGameInformation}
                onChange={handeGeneralInformationChange}
                error={formik.touched.played && Boolean(formik.errors.played)}
                helperText={formik.touched.played && formik.errors.played}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
              <TextField
                type="text"
                label="Lisätietoa pelistä:"
                name="description"
                value={generalGameInformation.description}
                onChange={handeGeneralInformationChange}
                margin="normal"
                fullWidth required InputLabelProps={{ shrink: true }}
            />
              <Grid container>
                <Grid item xs={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <Button color="secondary" variant="contained" margin="normal" component={Link} to={"/seasongames"} fullWidth sx={{ padding: 1, margin: 2 }} >Peruuta</Button>
                  </Box>
                </Grid>
                <Grid item xs={4}>
    
                </Grid>
                <Grid item xs={4}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button type="submit" color="primary" variant="contained" margin="normal" fullWidth sx={{ padding: 1, margin: 2 }} >Tallenna </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid >
        )
    
}

export default EditSeasonGame;