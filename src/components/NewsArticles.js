import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewsArticles = (props) => {

  const dispatch = useDispatch();

  const appState = useSelector((state) => {
    return {
      news: state.news
    }
  });


  return (

    <table className="table table-striped">
      <thead>
        <tr>
          <th>Type</th>
          <th>Count</th>
          <th>Price</th>
          <th>Remove</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  )
}

export default NewsArticles;
