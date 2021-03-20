import React from 'react'
import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import classes from './App.module.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navigation } from './navigation'
import { Dashboard, EbolaChain } from './views'



const MyApp = () => (
    <BrowserRouter>

        <div className={classes.container}>
            <div className={classes.left}>
                <Navigation />
            </div>
            <div className={classes.right}>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/ebola-chain" component={EbolaChain} />
                </Switch>
            </div>
        </div>

    </BrowserRouter>
)

export default MyApp
