
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader'
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const[loading,setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);

    axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_NEWS_API}`)
      .then(response => {
        setNews(response.data.results)
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
        article.image_url  &&
        <div key={article.link} className='NewsCard'  onClick={() => window.open(article.link, '_blank')}>
          {article.image_url && <img src={article.image_url} alt={article.title} />}
          <div className='NewsContent'>
            <h3>{article.title}</h3>
          </div>
        </div>
      ))}
      
    </div></div>
  );
};

export default News;
