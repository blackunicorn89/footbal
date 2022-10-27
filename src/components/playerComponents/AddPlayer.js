import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer } from '../../actions/PlayerActions';
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, Paper, TextField, Button } from "@mui/material"




const AddPlayerForm = () => {
  const [state, setState] = useState({
    image: "",
    player_name: "",
    player_number: 0,
    position: "",
    description: ""
  })

  /*const [selectedFile, setSelectedFile] = useState({
      image:""
  })*/

  const login = useSelector((state) =>
    state.login
  );


  const dispatch = useDispatch();
  const navigate = useNavigate()

  //const fileInput = useRef(null)


  /*const handleFileInput = (event) => {
   
    setSelectedFile((selectedFile) => {
      return {
          ...selectedFile,
          [event.target.name]:event.target.files[0]
      }
  })
  
  }

  /*const FileUploader = ({onFileSelect}) => {

    const fileInput = useRef(null)
 
 
    const handleFileInput = (e) => {
 
        // handle validations
 
        onFileSelect(e.target.files[0])
 
    }
  }*/

  const onChange = (event) => {
    //console.log(event.value)

    //const file = event.target.files[0];		
    //const fileReader = new FileReader();
    //console.log("testataa kuvaa " + fileReader.readAsDataURL(file));




    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value
      }
    })

  }

  /*const onInput = (event) => {
    setState((state) => {
        return {
            ...state,
            readFile(event),
            [event.target.name]:event.target.value
        }
    })
}*/

  const onSubmit = (event) => {
    event.preventDefault();
    let player = {
      //...selectedFile,
      ...state
    }
    //console.log("Mitä syntyy " + player)
    dispatch(addPlayer(login, player));
    setState({

      image: "",
      player_name: "",
      player_number: 0,
      position: "",
      description: ""

    })
    /*setSelectedFile({
      image:""
  })*/
    navigate("/players");
  }

  return (
    <form encType="multipart/form-data">
      <label>File</label>
      <input type="file" name="image" />
      <hr />
      <label>Player Name</label>
      <input type="text" name="player_name" />
      <hr />
      <label>Player Number</label>
      <input type="text" name="player_number" />
      <hr />
      <label>Position</label>
      <input type="text" name="position" />
      <hr />
      <hr />
      <label>Description</label>
      <input type="text" name="description" />
      <hr />
      <button type="submit" onSubmit={onSubmit}>Lähetä!</button>
    </form>

  )



}



export default AddPlayerForm;