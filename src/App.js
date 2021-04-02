import React from 'react'
import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Provider } from 'react-redux'
import classes from './App.module.css'
import { BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom'
import { Navigation } from './navigation'
import { Dashboard } from './views'
import EbolaChain from './views/EbolaChain'
import store from './redux/store/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';



const MyApp = () => (
    <Provider store={store}>
        <div >
            <EbolaChain />
        </div>
    </Provider>
)

export default MyApp
