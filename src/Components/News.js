// src/News.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader'
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const[loading,setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.REACT_APP_NEWS_API}`;
   console.log(apiUrl);
    axios.get(apiUrl)
      .then(response => {setNews(response.data.articles)
      setLoading(false)})
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <ClipLoader size={50} />
      </div>
    );
  }
  return (
    <div className="NewsContainer">
    <div className='News'>
      {news.map(article => (
        article.urlToImage &&
        <div key={article.url} className='NewsCard'  onClick={() => window.open(article.url, '_blank')}>
          {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
          <div className='NewsContent'>
            <h3>{article.title}</h3>
          </div>
        </div>
      ))}
      
    </div></div>
  );
};

export default News;
