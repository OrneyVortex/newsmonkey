import React from 'react'

const NewsItem = (props) => {


        let { title, description, imageUrl, newsUrl, author, date, source } = props;

        return (

            <div className='my-3'>
                <div className="card" >
                    <div style={{
                        display: 'flex',
                        justifyContent: "flex-end", position: "absolute", right: 0
                    }}>
                        <span className='badge rounded-pill bg-danger'>{source}</span>
                    </div>
                    <img src={!imageUrl ? "https://www.bag.admin.ch/bag/en/home/das-bag/aktuell/news/news-02-08-2021/_jcr_content/image.imagespooler.png/1646310847290/588.1000/Icons-18.png" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a rel="nonreferrer" href={newsUrl} target="__blank" className="btn btn-sm btn-dark">Read More</a>
                        <p className='card-text'><small className="text-muted">By {!author ? "Unknown" : author} on {date} </small></p>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem