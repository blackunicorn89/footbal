const newsRow = (props) => {
    return(
        <tr>
            <td>{props.article.header}</td>
            <td>{props.article.content}</td>
            <td>{props.item.date}</td>
            {/*<td><button className="btn btn-danger" onClick={ () => props.changeMode("remove", props.index) }>Remove</button></td>
            <td><button className="btn btn-secondary" onClick={() => props.changeMode("edit", props.index)}>Edit</button></td>*/}
        </tr>
    )
}

export default newsRow;