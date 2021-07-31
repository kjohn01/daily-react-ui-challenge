import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ItemDisplay from '../components/ItemDisplay';
import ItemEditInput from '../components/ItemEditInput';
import styles from '../styles/todoItem.module.scss';

export default function TodoItem({ todoItem }) {
    const [isEditing, setIsEditing] = useState(false);
    const toggleIsEditing = useCallback(() => setIsEditing(!isEditing), [isEditing]);
    let cx = classNames.bind(styles);

    return (
        <li className={cx({ todoItem: true, editing: isEditing })}>
            {
                isEditing 
                ? <ItemEditInput todoItem={todoItem} toggleIsEditing={toggleIsEditing} /> 
                : <ItemDisplay todoItem={todoItem} toggleIsEditing={toggleIsEditing} />
            }
        </li>
    );
}

TodoItem.propTypes = {
    todoItem: PropTypes.shape({
        id: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired
};
