import newsRow from "../actions/newsRow";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const NewsArticles = (props) => {

  const dispatch = useDispatch();

  const appState = useSelector((state) => {
    return {
      news: state.news.news
    }
  });

  let NewsArticles = appState.news.news.map((news, index) => {
    /*Sif (state.editIndex === index) {
        return <EditRow key={item.id} item={item} editItem={editItem} changeMode={changeMode}></EditRow>
    }

    if (state.removeIndex === index) {
       return <RemoveRow key={item.id} item={item} changeMode={changeMode} removeItem={removeItem}></RemoveRow>
    }*/
    return <newsRow key={news.id} news={news} index={index}/> /*changeMode={changeMode}/>*/
})


  return (

    <table className="table table-striped">
      <thead>
        <tr>
          <th>Header</th>
          <th>Content</th>
          <th>Date</th>
         {/* <th>Remove</th> 
          <th>Edit</th>*/}
        </tr>
      </thead>
      <tbody>
          {NewsArticles}

      </tbody>
    </table>
  )
}

export default NewsArticles;
