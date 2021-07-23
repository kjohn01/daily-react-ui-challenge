import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import styles from './mediaCard.module.scss';

export default function MediaCard({ title, description, img }) {
  return (
    <Card className={styles.card}>
      <Card.Img variant="top" src={img} />
      <Card.Body className={styles.text}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

MediaCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
};
