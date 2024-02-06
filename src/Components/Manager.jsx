import NavBar from "./NavBar";
import { useState } from "react";
import {Routes, Route} from 'react-router-dom'
import HomePage from './HomePage'
import ArticlesList from './ArticlesList'
import ArticlePage from "./ArticlePage";

export default function Manager() {
  const [articles, setArticles] = useState([]);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/articles" element={<ArticlesList articles={articles} setArticles={setArticles}/>}/>
        <Route path="/articles/:article_id" element={<ArticlePage />}/>
      </Routes>
    </>
  );
}
