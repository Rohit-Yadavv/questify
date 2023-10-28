import React from 'react';
import styles from './sliderCard.module.css';
import moment from 'moment'
import { TbWriting } from "react-icons/tb";
import { Link } from 'react-router-dom';
const SliderCard = ({ id, slug, title, createdAt }) => {
    return (
        <Link to={`/blog/${slug}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img className={styles.image} src={`${process.env.REACT_APP_API}/api/v1/blog/blog-photo/${id}`} alt={title} />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.title}>
                    <h2>{title}</h2>
                </div>
                <div className={styles.time}>
                    <span>{moment(createdAt).fromNow()}</span>
                    <span> <TbWriting /> Rohit Yadav</span>
                </div>
            </div>
        </Link>
    )
}

export default SliderCard