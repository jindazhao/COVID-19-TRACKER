import React, { useState } from 'react';
import Cards from './components/Cards/Cards'
import Chart from './components/Chart/Chart'
import CountryPicker from './components/CountryPicker/CountryPicker'
import styles from './App.module.css'
import {fetchData } from './api';
import image from './images/image.png';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {Paper } from '@material-ui/core';



class App extends React.Component {

    state = {
        data: {},    
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country: country})

    }

    render() {


        const { data, country } = this.state;

        const theme = createMuiTheme({
            palette: {
                type: "dark"
            },
        });
        

        return (
            <ThemeProvider theme={theme}>
                <Paper style={{ height: "100vh"}}>
                    <div className={styles.container}>
                        <img className={styles.image} src={image} alt="COVID-19"/>
                        <Cards data={data}/>
                        <CountryPicker handleCountryChange={this.handleCountryChange}/>
                        <Chart data={data} country={country}/>
                    </div>
                </Paper>
                
            </ThemeProvider>
        )
    }
}

export default App;