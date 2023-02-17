import { useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { addSeasonGame } from '../../actions/SeasonGameActions';
import {Box, Grid, Paper, TextField, Button, InputLabel, Select, MenuItem } from "@mui/material"
import SeasonGamePlayerRow from './SeasonGamePlayerRow';
import SeasonGameGoalMakerRow from './SeasonGameGoalMakerRow';
import SeasonGameGoalScoreRow from './SeasonGameGoalScoreRow';
import {  useFormik } from "formik";
import * as yup from "yup";


const AddPSeasonGameForm = (props) => { 

 
  

  //Pelaajien ja maalivahtien lisäysformin actionit
  const [goalMakerDropDown, setGoalMakerDropDown] = useState('')
  const [points, setPoints] = useState(1)
  const [goalMakers, setGoalMakers] = useState([])


  const handleGoalMakerChange = (event) => {
    setGoalMakerDropDown(event.target.value);
  };

  const handlePointsChange = (event) => {
    setPoints(event.target.value);
  };

  //console.log("tuliko arvo")  
  //console.log(goalMaker)

  const saveGoalMaker = (e) => {
      e.preventDefault()

      setGoalMakers ([
        ...goalMakers,
        {"name": goalMakerDropDown, "points": points}
        
      ])
      /*let juu = goalMaker
      let pisteet = points 
      let goalmaker = 
      goalMakers.push(goalmaker)

      console.log("Tuleeko submitin jälkeen arvo ja pisteet?")
      console.log(juu)
      console.log(pisteet)*/
      
  
  }
  console.log(goalMakers)

  const inputProps = {
    min: 1,
  };
  
  

  
  // MUI TEXTFIELD DEFAULT DATE 

  const dateNow = new Date(); // Creating a new date object with the current date and time
  const year = dateNow.getFullYear(); // Getting current year from the created Date object
  const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
  const month = // Setting current Month number from  current Date object
    monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 if not to adjust for date input.
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const date =
    dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
      ? `0${dateNow.getUTCDate()}`
      : dateNow.getUTCDate();

  const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>  

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

  const appState = useSelector((state) => state);

  const login = useSelector((state) =>
    state.login
  );

  const season = useSelector((state) =>
    state.season
  )
  
  let seasonname=""
  season.season.map((season) => {
    if (season.active) {
        seasonname = season.season_name
    }
    
  })

  

  const formik = useFormik({
    initialValues:{
    season_name: seasonname,
		game: "",
		final_result: "",
    played: materialDateInput,
		description: "",
    players: [],
    goal_makers: []

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addSeasonGame(login, values));
      navigate("/seasongames");
    },
  })

  /*const onPlayerChange = (e) => {
      if (e.target.checked) {
        formik.values.players.push(e.target.value);
      } else {
        formik.values.players.splice(formik.values.players.indexOf(e.target.value), 1);
      }
  
  }*/


  /*const onGoalMakerChange = (e) => {

    let goals
    setGoalState((gaolState) => {
      return {
          ...gaolState,
          goals: e.target.value
      }
  })


    let goalMaker
    if (e.target.checked) {
      goalMaker = {"player": e.target.value, "goals": e.target.value}
      console.log(goalMaker)
      formik.values.goal_makers.push(goalMaker);
    } else {
      formik.values.goal_makers.splice(formik.values.goal_makers.indexOf(goalMaker), 1);
    }

  }*/

  const dispatch = useDispatch();
  const navigate = useNavigate()

  /*let gamePlayers = appState.player.players.map((player) => {

  return (
     <SeasonGamePlayerRow key={player.id} onChange={onPlayerChange} players={player.player_name} />
  )
})*/

/*let gameGoalMakers = appState.player.players.map((goalMaker) => {

  return (
     <SeasonGameGoalMakerRow key={goalMaker.id} goalArray={formik.values.goal_makers} goalMakers={goalMaker.player_name} />
  )
})
*/

/*let testing = [
  { label: "Apple", value: "🍎" },
  { label: "Banana", value: "🍌" },
  { label: "Orange", value: "🍊" }
]
console.log("Mitä sisältää testing")
console.log(testing)*/

let players = appState.player.players



//let belaaja;


    return (
      <Grid>
        <Paper elevation={10}>
            <Grid align="center">
              <h1>Lisää uusi peli kauteen</h1>
            </Grid>
            {/*Pelaajien lisäys formi*/}
            <form onSubmit = {saveGoalMaker}>
            <InputLabel id="demo-simple-select-label">Lisää maalintekijät</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value = {goalMakerDropDown}
              label="Maalintekijät"
              onChange={handleGoalMakerChange}>
              {players.map((player) => <MenuItem value={player.player_name}>{player.player_name}</MenuItem>)}  
            </Select>
            <TextField
             type="number"
             label="Pisteet"
             inputProps={inputProps}
             name="points"
             value={points}
             min="0"
             onChange={handlePointsChange}
             margin="normal"
             fullWidth required
             InputLabelProps={{ shrink: true }} /> 
            <Box display="flex" justifyContent="flex-start">
            <Button type="submit" color="primary" variant="contained" margin="normal" fullWidth sx={{ padding: 1, margin: 2 }} >Tallenna </Button>
            </Box>        
            </form>
            
            {/*Maalientekijöiden ja pisteiden lisäysformi*/} 

            <form>
              
            </form>
            <form onSubmit={formik.handleSubmit}>
            <TextField
             type="text"
             label="Kausi"
             disabled = {true}
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
              id="date"
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
          <p >Pelaajat: </p>
          <p>Maalintekijät</p>
          
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
        </Grid>
  )
}



export default AddPSeasonGameForm;