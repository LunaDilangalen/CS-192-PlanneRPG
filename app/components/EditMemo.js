/*
* MIT License

* Copyright (c) 2019 Rheeca S. Guion

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

 * 4/1/19 - Rheeca Guion - created file, added textinputs for editing memo
 */

/*
 * File creation date: Apr. 1, 2019
 * Development group:
 * Client group:

 * Purpose: A screen where details of a memo are edited

 * Variables:
 *   memoId: contains memo id
 *   memoTitle: contains memo title
 *   memoText: contains memo text
 */

import React from 'react';
import {
     View,
     TextInput,
     TouchableOpacity,
     TouchableWithoutFeedback,
     Keyboard,
     StyleSheet,
} from 'react-native';

import {
     Container,
     Header,
     Content,
     List,
     ListItem,
     Text,
     Button,
     Icon,
} from 'native-base';
import styles from './Styles';

export default class EditMemo extends React.Component {
     constructor (props){
          super(props);
          this.state = {
               memoId: this.props.navigation.getParam('id', 0),
               memoTitle: this.props.navigation.getParam('title', 0),
               memoText: this.props.navigation.getParam('text', 0),
          };
     }

     render (){
          return (
               <View style={styles.editMemo}>
                    <List>
                         <ListItem>
                              <TextInput
                                   style={{flex:1}}
                                   multiline = {true}
                                   placeholder='Title'
                                   value={this.state.memoTitle}
                                   onChangeText={(text) => this.setState({memoTitle: text})}/>
                         </ListItem>
                         <ListItem>
                              <TextInput
                                   style={{flex:1}}
                                   multiline = {true}
                                   placeholder='Memo'
                                   value={this.state.memoText}
                                   onChangeText={(text) => this.setState({memoText: text})}/>
                         </ListItem>
                         <ListItem>
                              <TouchableOpacity style={{marginRight: 20}} button transparent onPress={() => {
                                        this.props.navigation.state.params.onDelete(this.state.memoId);
                                        this.props.navigation.goBack();
                                   }}>
                                   <Icon name='trash' style={{color: '#000'}}/>
                              </TouchableOpacity>
                              <TouchableOpacity button transparent onPress={() => {
                                        this.props.navigation.state.params.onUpdate(
                                             this.state.memoId,
                                             this.state.memoTitle,
                                             this.state.memoText,
                                        );
                                        this.props.navigation.goBack();
                                   }}>
                                   <Icon name='checkmark' style={{color: '#000'}}/>
                              </TouchableOpacity>
                         </ListItem>
                    </List>
               </View>
          )
     }
}
