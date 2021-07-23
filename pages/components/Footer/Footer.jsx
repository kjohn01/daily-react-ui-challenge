import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './footer.module.scss';

export default function Footer({ text="Design created by", link, author, className }) {
  return (
    <footer className={classNames(styles.footer, className)}>{text} <a href={link}>{author}</a></footer>
  );
}

Footer.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
};
