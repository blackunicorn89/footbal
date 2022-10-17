import { width } from "@mui/system";

const PlayerRow = (props) => {
    let imgSrc = "http:\\\\localhost:3000\\" + props.player.image
    return(
     <tr>
        <td><img src={imgSrc} width="80 px"></img></td>
        <td> {props.player.player_name}</td>
        <td> {props.player.player_number} </td>
        <td> {props.player.position}</td>
        <td> {props.player.description}</td>
      </tr>
    )
 
}

export default PlayerRow;