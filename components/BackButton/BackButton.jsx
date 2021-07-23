import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import styles from './backButton.module.scss';

export default function BackButton() {
  return (
    <Button className={styles.back} variant="secondary">
        <Link href="/">  
          <a className="text-white"><ArrowLeft /></a>
        </Link>
    </Button>
  );
}
