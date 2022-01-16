import React from 'react'
import { Actions, Router, Scene } from 'react-native-router-flux'
import ArticleScreen from '../components/ArticleScreen';
import HomeScreen from '../components/HomeScreen'

const Routes = () => (
    <Router>
       <Scene key = "root"> 
            <Scene key = "home" animationEnabled={false} component = {HomeScreen} title = "Home" initial = {true} header={null} back={false} gesturesEnabled={false} drawer={false} swipeEnabled={false}/>
            <Scene key = "article" animationEnabled={false} component = {ArticleScreen} title = "Article" header={null} back={false} gesturesEnabled={false} drawer={false} swipeEnabled={false} />
        </Scene>
    </Router>
 )
 
 export default Routes;