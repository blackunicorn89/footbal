import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../actions/NewsActions";
import Article from "./Article";

const NewsArticles = (props) => {

  const dispatch = useDispatch();

  //USE EFFECT ajetaan ennen renderöintiä. Se  hakee dispatchilla tiedot. Esim pelaajilla dispatch(getPlayers())

  useEffect(() => {
    dispatch(getNews())
  }, []);


  const appState = useSelector((state) => state);
  console.log(appState)
  let articles = appState.news.news.newsArticles.map((article) => {

    return (
      < tr key={article.id} >
        <td> {(article.date)}</td>
        <td> {article.header} </td>
        <td> {article.content}</td>
      </tr >
    )
  })

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Päivämäärä</th>
            <th>Otsikko</th>
            <th>Sisältö</th>

          </tr>
        </thead>
        <tbody>
          {articles}
        </tbody>
      </table>


      <Article />
    </div>

  )
}

export default NewsArticles;
