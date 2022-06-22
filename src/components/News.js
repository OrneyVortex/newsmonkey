import React, { useEffect, useState } from 'react';

import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    // document.title = ` NewsMonkey - ${this.capitalizeFirstLetter(props.category)}`;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(50);
        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);

    }
    useEffect(() => {
        updateNews();

    }, [])

// handlePreviousClick = async () => {
//     this.setState({ page: this.state.page - 1 });
//     this.updateNews();
// }
// handleNextClick = async () => {
//     this.setState({ page: this.state.page + 1 });
//     this.updateNews();

// }

const fetchMoreData = async () => {
    setPage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setLoading(true)
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
};


return (
    <>
        <h1 className="text-center" style={{marginTop:'65px'}}>
            News Monkey |Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}
        >

            <div className="container">
                <div className="row">


                    {articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem source={element.source.name} author={element.author} date={element.publishedAt} title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
            </div>


        </InfiniteScroll>
    </>

)
    
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
}


News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News

