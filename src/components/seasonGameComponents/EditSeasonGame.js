import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { editSeasonGame } from "../../actions/SeasonGameActions";
import { Box, Grid, Paper, TextField, Button, InputLabel, Select, MenuItem, Typography, Divider} from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useForm } from "react-hook-form";

const EditSeasonGame = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const seasonGameId = useParams()
    
    //Parsetaan numeroksi, koska id:n arvo on numero. Parametrinä tuleva seasonGameId on stringi, jonka vuoksi kauden pelin haku kaatuu
    const gameId = parseInt(seasonGameId.id)

    const appState = useSelector((state) => state);

    const login = useSelector((state) => 
      state.login
    );
  
    const seasonGames = useSelector((state) =>
      state.seasonGame
    )

    let games = []


    seasonGames.seasonGames.map((season) => {
    if (season.active)
    {
      games = season.games
    }
      return games
  })

  const game = games.find((games => games.id === gameId))

  let current_goal_makers = game.goal_makers


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


  const [playerDropDown, setPlayerDropDown] = useState('')
  const [players, setNewPlayers] = useState(game.players) 

  const [goalMakerDropDown, setGoalMakerDropDown] = useState('')
  const [points, setPoints] = useState(1)
  const [goal_makers, setNewGoalMakers] = useState(game.goal_makers)

  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      season_name: game.season_name,
      game: game.game,
      final_result: game.final_result,
      played: materialDateInput,
      description: game.description,
    }
  });

   //UI:n pelaajarivit
  const [playerRows, setPlayerRows] = useState(game.players)

  //UI:n maalintekijärivit  
  const [goalMakerRows, setGoalMakerRows] = useState(game.goal_makers)
 
  //Tilatietojan haku
  let playerData = appState.player.players
  let goalMakersData = appState.player.players

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


  //Submittien hallinta
  const saveGoalMaker = (e) => {
    
    e.preventDefault()

    //Alusutkset
    let goalMaker = [];
    let name = "";
    let names = []
    let goalMakerId = 0;
    let goalMakerRow = {};
    let goalMakerRowId = [];

    //Filteröidään dropwdownista tulleen id:perusteella oikean pelaajan tiedot
    goalMaker = goalMakersData.filter((goalmaker) => goalmaker.id === goalMakerDropDown)

    //otetaan pelaajan nimi ja ja id talteen. Pisteet tulevat points-statesta. Koska goalMaker taulukon ei pitiäsi koskaan sisältää kuin yksi arvo,
    //voidaan käyttää suoraan indeksiviittauksia
    name = goalMaker[0].player_name
    goalMakerId = goalMaker[0].id

    //Tarkistetaan, sisältääkö pelaajat yhtään pelaajaa. Jos ei, ei anneta lisätä maalintekijöitä
    if (playerRows.length === 0) {
      alert("Maalintekjiä " + name + " pitää lisätä pelaajiin ennen kuin hänet voidaan lisätä maalintekijöihin!");
      return;
    }

   //Lisätään pelaajariviobjektitaulukosta pelaajat erilliseen taulukkoon, jotta voidaan, tarkistaako onko maalintekijä jo pelaajissa 
   for (let i = 0; i < playerRows.length; i++) {
    names.push(playerRows[i].name)
   }

   //Jos maalintekijä ei ole pelaajissa, annetaan virhe
   if (!names.includes(name)) {
    alert("Maalintekjiä " + name + "pitää lisätä pelaajiin ennen kuin hänet voidaan lisätä maalintekijöihin!");
    return
   }

    //Haetaan tieto, sisältääkö ui:n maalintekijärivit jo maalintekijän id:n perusteella
    goalMakerRowId = goalMakerRows.filter((row) => row.id === goalMakerId)
    //Jos ui:n maalintekijärrivit sisältää jo pelaajan, ei lisätä sitä duplikaattina varsinaisiin lisättäviin maalintekijöihin sekä uissa näkyviin maalintekijöihin
    if (goalMakerRowId.length > 0) {
      alert("Maalintekijä " + goalMakerRowId[0].name + " on jo lisätty listalle")
      return
    }

    setNewGoalMakers ([
      ...goal_makers,
      {"name": name, "points": points, "id": goalMakerId}
    ])
    goalMakerRow = {"name": name, "points": points, "id": goalMakerId}
    setGoalMakerRows([
      ...goalMakerRows,
      goalMakerRow
    ])

  }

  const savePlayer = (e) => {
    e.preventDefault()

    let player = [];
    let playerName = "";
    let playerId = 0;
    let playerRow = {};
    let playerRowId = []

    player = playerData.filter((player) => player.id === playerDropDown)

    playerName = player[0].player_name;
    playerId = player[0].id; 
    
    //Haetaan tieto, sisältääkö pelaajarivit jo pelaajan id:n perusteella
    playerRowId = playerRows.filter((row) => row.id === playerId)
    
    //Jos pelaajarivit sisältää jo pelaajan, ei lisätä sitä duplikaattina varsinaisiin lisättäviin pelaajiin sekä muissa näkymiin pelaajiin
    if (playerRowId.length > 0) {
      alert("Pelaaja " + playerRowId[0].name + " on jo lisätty listalle")
      return
    }
    setNewPlayers ([
      ...players,
      {"name": playerName, "id": playerId}
    ])
    
    playerRow = {"name": playerName, "id": playerId}

    setPlayerRows([
      ...playerRows,
      playerRow
    ])
  }

  const onGameSubmit = (formValues) => {

    //Otetaan talteen haetun pelin id id-muuttujaan. Muuttujan nimi on id, koska sen
    //tulee vastata tietokannasta löytyvää saraketta.
    let id = gameId
    
    if (players.length === 0)
    {
      alert("Tarkista pelaajien määrä");
      return;
    }

    let game = {
      ...formValues,
      goal_makers,
      players,
      current_goal_makers,
      id
    }
    console.log(game)
    dispatch(editSeasonGame(login, game));
    navigate("/seasongames")
  }  


   //Pelaajarivin poistonapin handlaus
   const removePlayerRow = (playerRowId) => {

    let index = playerRows.findIndex(playerRow => playerRow.id === playerRowId);

    playerRows.splice(index, 1);
    setPlayerRows([
      ...playerRows
    ])

    players.splice(index, 1)
    setNewPlayers([
      ...players
    ])
  };

  //Maalintekijäivin poistonapin handlaus
  const removeGoalMakerRow = (goalMakerRowId) => {

    let index = goalMakerRows.findIndex(goalMakerRow => goalMakerRow.id === goalMakerRowId);

    goalMakerRows.splice(index, 1);
    setGoalMakerRows([
      ...goalMakerRows
    ])

    goal_makers.splice(index, 1)
    setNewGoalMakers([
      ...goal_makers
    ])

  };

 //Muut
 
 //Määrittää minimiarvon pisteille. Pisteet eivät voi olla alle yhden.
 const inputProps = {
   min: 1,
 };
      
  return (
    <Grid>
      <Paper elevation={10}>
        <Grid align="center">
          <Typography variant="h3" sx={{paddingBottom: 3}}>Muokkaa kauden pelin tietoja</Typography>
        </Grid>
        <Divider />
        {/*Pelaajien lisäys formi*/}
        <form onSubmit = {savePlayer}>
        <InputLabel id="demo-simple-select-label">Muokkaa joukkuekokoonpanoa</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value = {playerDropDown}
          label="Maalintekijät"
          onChange={handlePlayerDropdownChange}>
          {playerData.map((player) => <MenuItem key={player.id} value={player.id}>{player.player_name}</MenuItem>)}  
        </Select>
        <Box display="flex" justifyContent="flex-start">
        <Button type="submit" color="primary" variant="contained" margin="normal" sx={{ padding: 1, margin: 2 }} >Lisää Pelaaja</Button>
        </Box>        
        </form>
        <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Pelaajat</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {playerRows.map((row) =>
                 <TableRow key={row.id}>
                   <TableCell>{row.name}</TableCell>
                   <TableCell><Button onClick={() => removePlayerRow(row.id)} color="warning" variant="contained">Poista</Button></TableCell>
                 </TableRow>)}
              </TableBody>
           </Table>
          </TableContainer>
        <Divider />
        {/*Maalientekijöiden ja pisteiden lisäysformi*/} 
        <form onSubmit = {saveGoalMaker}>
        <InputLabel id="demo-simple-select-label">Muokkaa maalintekijöitä</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value = {goalMakerDropDown}
          label="Maalintekijät"
          onChange={handleGoalMakerDropdownChange}>
          {/*asetetaan arvoksi id, koska sitä tarvitaan pelaajan pistetietojen päivittämiseen*/}
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
        <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Maalintekijät</TableCell>
                    <TableCell>Pisteet</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {goalMakerRows.map((goalMakerRow) =>
                 <TableRow key={goalMakerRow.id}>
                   <TableCell>{goalMakerRow.name}</TableCell>
                   <TableCell>{goalMakerRow.points}</TableCell>
                   <TableCell><Button onClick={() => removeGoalMakerRow(goalMakerRow.id)} color="warning" variant="contained">Poista</Button></TableCell>
                 </TableRow>)}
              </TableBody>
           </Table>
          </TableContainer>
        {/*Yleisten tietojen lisäysformi*/} 
        <form onSubmit={handleSubmit(onGameSubmit)}> 
        <TextField
          type="text"
          label="Kausi"
          required
          disabled={true}
          {...register("season_name")}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }} /> 
          <TextField type="text"
            label="Peli"
            required
            {...register("game", {
              required:true,
              pattern:/[A-Za-zäöÄÖåÅ]+-[A-Za-zäöÄÖåÅ]+$/
            }) }
            error={(errors.game && errors.game.type === "required") || (errors.game && errors.game.type === "pattern") } 
            helperText=  {(errors.game && errors.game.type === "required" && (
              "Pelin tulos on pakollinen tieto.")) || (errors.game && errors.game.type === "pattern" && (
                "Peli on oltava muodossa peli-peli"))}
            margin="normal"
            fullWidth 
            InputLabelProps={{ shrink: true }}
          />
          <TextField type="text"
            label="Tulos"
            required
            {...register("final_result", {
              required:true,
              pattern: /\d+\-\d+/
             })}
             error={(errors.final_result && errors.final_result.type === "required") || (errors.final_result && errors.final_result.type === "pattern") } 
             helperText=  {(errors.final_result && errors.final_result.type === "required" && (
               "Pelin tulos on pakollinen tieto.")) || (errors.final_result && errors.final_result.type === "pattern" && (
                 "Pelin tulos on oltava numeromuodosssa 1-1 eikä saa sisältää kirjaimia,"))} 
            margin="normal"
            fullWidth 
            InputLabelProps={{ shrink: true }}
          />                 
          <TextField
            type="date"
            label="Päivämäärä"
            required
            {...register("played", {
              required:true
            })}
            error={errors.date && errors.date.type === "required" } 
            helperText=  {errors.date && errors.date.type === "required" && (
              "Pelipäivä on pakollinen tieto.")}     
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="text"
            label="Lisätietoa pelistä:"
            {...register("description")}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
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