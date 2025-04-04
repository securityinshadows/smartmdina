import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar'; 
import BusinessTrendingCard from '../../components/BusinessTrendingCard.tsx';
import NewsCard from '../../components/NewsCard'; 
import './css/BusinessModule.css'; 
import UserNavbar from '../../components/users/UserNavbar.tsx';

// Define interfaces for the fetched data
interface NewsItem {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  rating?: number; // Optional rating for business-related news
}

const BusinessModule = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [trendingData, setTrendingData] = useState<NewsItem[]>([]); // Array of NewsItem objects for trending news
  const [newsData, setNewsData] = useState<NewsItem[]>([]); // Array of NewsItem objects for regular news

  // Fetch the Trending News and Regular News from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/news') // Assuming your backend exposes this API endpoint
      .then(response => {
        const news: NewsItem[] = response.data;
        // For now, let's pick some random data for trending
        setTrendingData(news.slice(0, 3)); // Just selecting the first 3 news items for "Trending"
        setNewsData(news); // All fetched news
      })
      .catch(err => console.error('Error fetching data', err));
  }, []); // Empty dependency array to fetch data once when the component is mounted

  // Filter function to search based on the query
  const filteredTrending = trendingData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNews = newsData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="business-module">
      <UserNavbar />

      <div className="business-module-header">
        <SearchBar value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>

      <div className="business-content">
        <div className="trending-section">
          <div className="trending-title">Recommended for You</div>
          <div className="trending-cards">
            {filteredTrending.map((item, index) => (
              <BusinessTrendingCard 
                key={index}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                rating={item.rating || 0} // Default to 0 if no rating is available
                onRatingChange={() => {}}
              />
            ))}
          </div>
        </div>

        <div className="news-section">
          <h2>News</h2>
          <div className="news-cards">
            {filteredNews.map((item, index) => (
              <NewsCard 
                key={index}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                date={item.date}
              />
            ))}
          </div>
          <a className="more-button" href="/news">More</a>
        </div>
      </div>
    </div>
  );
};

export default BusinessModule;

