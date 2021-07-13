import React from 'react';
import { Button } from 'react-bootstrap';

export default function DigitButton(value, className, onClick) {
  return (
    <Button className={className} onClick={() => onClick(value)}>
      {value}
    </Button>
  );
}
