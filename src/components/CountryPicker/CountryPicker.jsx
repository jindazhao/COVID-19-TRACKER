import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';



const CountryPicker = () => {
    return (
        <FormControl className={styles.FormControl}>
            <NativeSelect>
                <option value="global"></option>
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;