/*
* MIT License
* Copyright (c) 2019 Datuluna Ali G. Dilangalen, Rheeca Guion, Angelo Vincent R. Delos Santos
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
* This is a course requirement for CS 192 Software Engineering II under the
* supervision of Asst. Prof. Ma. Rowena C. Solamo of the Department of Computer
* Science, College of Engineering, University of the Philippines, Diliman for the
* AY 2018-2019
*/

/*
* Code History
* 2/07/19 - Datuluna Dilangalen - Added UI
* 2/20/19 - Rheeca Guion - Added tab navigation, styles
* 3/22/19 - Rheeca Guion - Replaced tab navigation with React Navigation:
*                            Added AppContainer, StackNavigator, and
*                            MaterialTopTabNavigator for navigation
* 4/01/19 - Rheeca Guion - Added StackNavigators for Corkboard and TaskList
* 4/04/19 - Rheeca Guion - Added getData and saveData, and passing screenProps to
*                          AppContainer
* 4/04/19 - Vince Delos Santos - Modified AppTabNavigator & StackNavigators for TaskList and Corkboard
* 4/08/19 - Rheeca Guion - Created function updatePoints
* 4/30/19 - Rheeca Guion - Created completedTasks, totalTasks, and totalEvents
*                        - Created function updateTotalTasks, updateTotalEvents, updateExp
*                        - Renamed updatePoints to updateCompletedTasks
*                        - Created function saveTotalTasks, saveTotalEvents, saveExp
*                        - Renamed saveData to saveCompletedTasks
*/

/*
* File creation date: Feb. 3, 2019
* Development group:
* Client group:
* Purpose: Index of the app. Contains navigation for Progress, Calendar, Corkboard
*   and Tasklist
* Variables:
*
*/

import React, { Component } from 'react';
import {
     AsyncStorage,
     View,
     Button,
} from 'react-native';
import {
     Container,
     Text,
     StyleProvider
} from 'native-base';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import getTheme from './native-base-theme/components';
import variable from './native-base-theme/variables/variable';
import { Font, AppLoading } from 'expo';
import Calendar from './app/components/Calendar';
import Corkboard from './app/components/Corkboard';
import TaskList from './app/components/TaskList';
import EditSchedule from './app/components/EditSchedule';
import EditMemo from './app/components/EditMemo';
import EditTask from './app/components/EditTask';
import ViewProgress from './app/components/ViewProgress';

import styles from './app/components/Styles';

const CalendarNavigator = createStackNavigator(

     {
          Calendar: Calendar,
          EditSchedule: EditSchedule,
     },
     {
          initialRouteName: "Calendar",
          headerMode: 'none',
     },
);

const CorkboardNavigator = createStackNavigator(

     {
          Corkboard: Corkboard,
          EditMemo: EditMemo,
     },
     {
          initialRouteName: "Corkboard",
          headerMode: 'none',
     },
);

const TaskListNavigator = createStackNavigator(

     {
          TaskList: TaskList,
          EditTask: EditTask,
     },
     {
          initialRouteName: "TaskList",
          headerMode: 'none',
     },
);

const AppTabNavigator = createMaterialTopTabNavigator(
     {
          Progress: ViewProgress,
          Calendar: CalendarNavigator,
          "Task List": TaskListNavigator,
          Corkboard: CorkboardNavigator,
     },
     {
          tabBarPosition: 'bottom',
          tabBarOptions: {
               style: {
                    backgroundColor: 'black',
               },
               labelStyle: {
                    color: 'white',
               },
          }
     },
);

const MainNavigator = createStackNavigator(
     {
          HomeTabs: AppTabNavigator
     },
     {
          headerMode: 'none',
          navigationOptions: {
               headerTitle: "PlanneRPG",
          },
     }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
     constructor() {
          super();
          this.state = {
               isReady: false,
               completedTasks: 0,
               totalTasks: 0,
               totalEvents: 0,
               exp: 0,
          };
     }

     componentDidMount (){
          this.getData();
     }

     componentWillMount() {
          this.loadFonts();
     }
     async loadFonts() {
          /*
          * loadFonts
          * Creation date: Feb. 6, 2019
          * Purpose: Loads a custom font (error fix for incompatible fonts for android devices)
          */
          await Expo.Font.loadAsync({
               Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
               Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
          });
          this.setState({ isReady: true });
     }

     clearAsyncStorage = async() => {
          AsyncStorage.clear();
          alert("Cleared Storage");
     }

     updateCompletedTasks(value) {
          /*
          * updateCompletedTasks
          * Creation date: Apr. 8, 2019
          * Purpose: update completedTasks
          */
          this.setState({ completedTasks: value });
          this.saveCompletedTasks();
     }

     updateTotalTasks(value) {
          /*
          * updateTotalTasks
          * Creation date: Apr. 30, 2019
          * Purpose: update totalTasks
          */
          this.setState({ totalTasks: value });
          this.saveTotalTasks();
     }

     updateTotalEvents(value) {
          /*
          * updateTotalEvents
          * Creation date: Apr. 30, 2019
          * Purpose: update totalEvents
          */
          this.setState({ totalEvents: value });
          this.saveTotalEvents();
     }

     updateExp(value) {
          /*
          * updateExp
          * Creation date: Apr. 30, 2019
          * Purpose: update exp
          */
          let newExp = this.state.exp + value;
          this.setState({ exp: newExp });
          this.saveExp();
     }

     render() {
          if (!this.state.isReady) {
               return <Expo.AppLoading />;
          }

          return (
               <Container>
                    <AppContainer screenProps={{
                         completedTasks: this.state.completedTasks,
                         totalTasks: this.state.totalTasks,
                         totalEvents: this.state.totalEvents,
                         exp: this.state.exp,
                         updateCompletedTasks: this.updateCompletedTasks.bind(this),
                         updateTotalTasks: this.updateTotalTasks.bind(this),
                         updateTotalEvents: this.updateTotalEvents.bind(this),
                         updateExp: this.updateExp.bind(this),
                    }} />
               </Container>
          );
     }

     saveCompletedTasks = async() => {
          /*
          * saveCompletedTasks
          * Creation date: Apr. 4, 2019
          * Purpose: Save completedTasks in AsyncStorage
          */
          try {
               await AsyncStorage.setItem('completedTasks', JSON.stringify(this.state.completedTasks));
          } catch (error) {
               alert(error);
          }
     };

     saveTotalTasks = async() => {
          /*
          * saveTotalTasks
          * Creation date: Apr. 30, 2019
          * Purpose: Save totalTasks in AsyncStorage
          */
          try {
               await AsyncStorage.setItem('totalTasks', JSON.stringify(this.state.totalTasks));
          } catch (error) {
               alert(error);
          }
     };

     saveTotalEvents = async() => {
          /*
          * saveTotalEvents
          * Creation date: Apr. 30, 2019
          * Purpose: Save totalEvents in AsyncStorage
          */
          try {
               await AsyncStorage.setItem('totalEvents', JSON.stringify(this.state.totalEvents));
          } catch (error) {
               alert(error);
          }
     };

     saveExp = async() => {
          /*
          * saveExp
          * Creation date: Apr. 30, 2019
          * Purpose: Save exp in AsyncStorage
          */
          try {
               await AsyncStorage.setItem('exp', JSON.stringify(this.state.exp));
          } catch (error) {
               alert(error);
          }
     };

     getData = async () => {
          /*
          * getData
          * Creation date: Apr. 04, 2019
          * Purpose: Get saved data from AsyncStorage
          */
          try {
               let temp = await AsyncStorage.getItem('completedTasks');
               let parsed = JSON.parse(temp);
               if(parsed) {
                    this.setState({completedTasks: parsed})
               }
          } catch (error) {
               alert(error);
          }
          try {
               let temp = await AsyncStorage.getItem('totalTasks');
               let parsed = JSON.parse(temp);
               if(parsed) {
                    this.setState({totalTasks: parsed})
               }
          } catch (error) {
               alert(error);
          }
          try {
               let temp = await AsyncStorage.getItem('totalEvents');
               let parsed = JSON.parse(temp);
               if(parsed) {
                    this.setState({totalEvents: parsed})
               }
          } catch (error) {
               alert(error);
          }
          try {
               let temp = await AsyncStorage.getItem('exp');
               let parsed = JSON.parse(temp);
               if(parsed) {
                    this.setState({exp: parsed})
               }
          } catch (error) {
               alert(error);
          }
     };
}
