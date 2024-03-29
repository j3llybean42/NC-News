import NavBar from "./NavBar";
import { useState } from "react";
import {Routes, Route} from 'react-router-dom'
import HomePage from './HomePage'
import ArticlesList from './ArticlesList'
import ArticlePage from "./ArticlePage";
import TopicsPage from "./TopicsPage";
import ErrorHandler from "./ErrorHandler";

export default function Manager() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([])

  return (
    <>
      <NavBar topics={topics} setTopics={setTopics}/>
      <Routes>
        <Route path="/" element={<HomePage articles={articles}/>}/>
        <Route path="/articles" element={<ArticlesList articles={articles} setArticles={setArticles} topics={topics}/>}/>
        <Route path="/articles/:article_id" element={<ArticlePage />}/>
        <Route path="/topics" element={<TopicsPage topics={topics} />}/>
        <Route path="*" element={<ErrorHandler />} />
      </Routes>
    </>
  );
}
