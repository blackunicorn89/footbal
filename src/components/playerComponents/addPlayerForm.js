import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer } from '../actions/PlayerActions';

const addPlayerForm = (props) => {
    const[state, setState] = useState({
        image:"",
        player_name:"",
        player_number:0,
        position:"",
        description:""
    })

    const token = useSelector(loginstate => loginstate.login.token)

    const dispatch = useDispatch();

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]:event.target.value
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        let player = {
            ...state
        }
        dispatch (addPlayer(token, player));
        setState({
            image:"",
            player_name:"",
            player_number:0,
            position:"",
            description:""
    
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="image">Kuva:</label>
            <input type="image"
                            name="image"
                            id="type"
                            value={playerstate.image}
                            onChange={onChange} />
            <label htmlFor="player_name">Pelaajan Nimi:</label>
            <input type="text"
                            name="player_name"
                            id="player_name"
                            value={loginstate.player_name}
                            onChange={onChange} />
            <label htmlFor="player_number" className="form-label">Pelaajan numero:</label>
            <input type="number"
                            name="player_number"
                            id="player_number"
                            step="0.01"
                            value={loginstate.player_number}
                            onChange={onChange} />
             <label htmlFor="position" className="form-label">Paikka:</label>
             <input type="text"
                            name="position"
                            id="position"
                            value={loginstate.position}
                            onChange={onChange} />
            <label htmlFor="description" className="form-label">Kuvaus:</label>
            <input type="text"
                            name="description"
                            id="description"
                            value={loginstate.description}
                            onChange={onChange} />
            <input type="submit" value="Add"/>
        </form>
    )

}



export default addPlayerForm;