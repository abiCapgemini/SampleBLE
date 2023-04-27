


//
//dev test commit
//dev abi testing commit
import Swipeable from 'react-native-swipeable';
import React, {useEffect, useState,Component} from 'react';
import color from '../../../assets/colors/color';
import Icon from 'react-native-vector-icons/Entypo';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,ScrollView, StyleSheet,  
} from 'react-native';
import globalStyles from '../../styles/golbalStyles';
import styles from './styles';
// import CheckBox from 'react-native-check-box';
// import SwipeToDelete from 'react-swipe-to-delete-component';
// import 'react-swipe-to-delete-component/dist/swipe-to-delete.css';

import GlobalHeader from '../../components/GlobalHeader/GlobalHeader';
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(false);
import {openDatabase} from 'react-native-sqlite-storage';



var temp = [];
    
  // const [tagsitems, set_tag_items] = useState([]);

  

const db = SQLite.openDatabase(
  {
    name: 'smart_pet_care.db',
    location: 'default',
   
  },
  () => { },
  error => {
    console.log("ERROR: " + error);
  }
);

const getData = () => {
  try {
    
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM tbl_tags",
            [],
            (tx, results) => {
              
                var len = results.rows.length;
                console.log(len);
                if (len > 0) {
                  for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
                    console.log(temp);
                    // set_tag_items.push(results.rows.item(i));
                    // set_tag_items(temp);
                    // console.log('Hello : '+set_tag_items);
                                       
                }
                else{
                  console.log('No');
                }
            }
        )
    })
} catch (error) {
    console.log("get data exception: "+error);
}
}
export default class SwipeableExample extends Component {  
  
  state = {
    currentlyOpenSwipeable: null
  };

  handleScroll = () => {
    const {currentlyOpenSwipeable} = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  render() {
    const {currentlyOpenSwipeable} = this.state;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({currentlyOpenSwipeable: swipeable});
      },
      onClose: () => this.setState({currentlyOpenSwipeable: null})
    };

    return (
      <ScrollView onScroll={this.handleScroll} style={styles.container}>
        <Example1 {...itemProps}/>
        <Example2 {...itemProps}/>
        <Example3 {...itemProps}/>
      </ScrollView>
    );
  }
}

function Example1({onOpen, onClose}) {
  return (
    <Swipeable
      
      rightButtons={[
        <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: 'lightseagreen'}]}>
          <Text>1</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: 'orchid'}]}>
          <Text>2</Text>
        </TouchableOpacity>
      ]}
      // onRightButtonsOpenRelease={onOpen}
      // onRightButtonsCloseRelease={onClose}
    >
      <View style={[styles.listItem, {backgroundColor: 'salmon'}]}>
        <Text>Example 1</Text>
        
      </View>
    </Swipeable>
  );
}

function Example2({onOpen, onClose}) {
  return (
    <Swipeable
      leftButtonWidth={45}
      leftButtons={[
        <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'papayawhip'}]}>
          <Text>1</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'olivedrab'}]}>
          <Text>2</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'mistyrose'}]}>
          <Text>3</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'mediumaquamarine'}]}>
          <Text>4</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'lightslategray'}]}>
          <Text>5</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: 'ivory'}]}>
          <Text>6</Text>
        </TouchableOpacity>
      ]}
      rightContent={(
        <View style={[styles.rightSwipeItem, {backgroundColor: 'linen'}]}>
          <Text>Pull action</Text>
        </View>
      )}
      onLeftButtonsOpenRelease={onOpen}
      onLeftButtonsCloseRelease={onClose}
    >
      <View style={[styles.listItem, {backgroundColor: 'paleturquoise'}]}>
        <Text>Example 2</Text>
      </View>
    </Swipeable>
  );
}

class Example3 extends Component {

  state = {
    leftActionActivated: false,
    toggle: false
  };

  render() {
    const {leftActionActivated, toggle} = this.state;

    return (
      <Swipeable
        leftActionActivationDistance={200}
        leftContent={(
          <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? 'lightgoldenrodyellow' : 'steelblue'}]}>
            {leftActionActivated ?
              <Text>release!</Text> :
              <Text>keep pulling!</Text>}
          </View>
        )}
        onLeftActionActivate={() => this.setState({leftActionActivated: true})}
        onLeftActionDeactivate={() => this.setState({leftActionActivated: false})}
        onLeftActionComplete={() => this.setState({toggle: !toggle})}
      >
        <View style={[styles.listItem, {backgroundColor: toggle ? 'thistle' : 'darkseagreen'}]}>
          <Text>Example 3</Text>
        </View>
      </Swipeable>
    );
  }
}

