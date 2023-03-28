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

    const formik = useFormik({
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

      })
      
      const listOfCurrentPlayers = formik.values.currentPlayers.map((currentPlayer) =>  <li>{currentPlayer}</li>);
      const listOfCurrentGoalMakers = formik.values.currentGoalMakers.map((currentGoalMaker) =>  <li>{currentGoalMaker}</li>);

      const onPlayerChange = (e) => {
        if (e.target.checked) {
          formik.values.players.push(e.target.value);
        } else {
          formik.values.players.splice(formik.values.players.indexOf(e.target.value), 1);
        }
    
    }
  
      const onGoalMakerChange = (e) => {
  
        if (e.target.checked) {
          formik.values.goal_makers.push(e.target.value);
        } else {
          formik.values.goal_makers.splice(formik.values.goal_makers.indexOf(e.target.value), 1);
        }
      }

      let gamePlayers = appState.player.players.map((player) => {
        return (
           <SeasonGamePlayerRow key={player.id} onChange={onPlayerChange} players={player.player_name} />
        )
      })
      
      let gameGoalMakers = appState.player.players.map((goalMaker) => {
        return (
           <SeasonGameGoalMakerRow key={goalMaker.id} onChange={onGoalMakerChange} goalMakers={goalMaker.player_name} />
        )
      })

      return (
        <Grid>
          <Paper elevation={10}>
            <Grid align="center">
              <h1>Muokkaa kauden pelin tietoja</h1>
            </Grid>
            <form onSubmit={formik.handleSubmit}> 
            <TextField
             type="text"
             label="Kausi"
             name="season_name"
             value={formik.values.season_name}
             onChange={formik.handleChange}
             error={formik.touched.season_name&& Boolean(formik.errors.season_name)}
             helperText={formik.touched.season_name && formik.errors.season_name}
             margin="normal"
             fullWidth required
             InputLabelProps={{ shrink: true }} /> 
              <TextField type="text"
                label="Peli"
                name="game"
                value={formik.values.game}
                onChange={formik.handleChange}
                error={formik.touched.game&& Boolean(formik.errors.game)}
                helperText={formik.touched.game && formik.errors.game}
                margin="normal"
                fullWidth required
                InputLabelProps={{ shrink: true }}
              />
              <TextField type="text"
                label="Tulos"
                name="final_result"
                value={formik.values.final_result}
                onChange={formik.handleChange}
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
                value={formik.values.played}
                onChange={formik.handleChange}
                error={formik.touched.played && Boolean(formik.errors.played)}
                helperText={formik.touched.played && formik.errors.played}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
              <p>Nykyinen joukkuekokoonpano</p>
              <ul>
                {listOfCurrentPlayers}
              </ul>
              <p>Muokkaa joukkuekokoonpanoa</p>
              {gamePlayers}
              <p>Maalintekijät</p>
              <ul>
                {listOfCurrentGoalMakers}
              </ul>
              <p>Lisää poistaa maalintekijöitä</p>
              {gameGoalMakers}
              <TextField
                type="text"
                label="Lisätietoa pelistä:"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
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