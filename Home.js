import React from 'react';
import { Text, Image, StyleSheet, View, Dimensions, StatusBar, ListView, ActivityIndicator, Alert} from 'react-native';
import { Header, Body, Icon, Container, Content, Button, Item, Input, List, ListItem } from 'native-base';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Permissions, Notifications } from 'expo';
import * as firebase from 'firebase';

import style from './style';


const firebaseConfig = {
  apiKey: "AIzaSyBZzFM0h4HbfZ92kGv0RBWTTDbinqPbW_0",
  authDomain: "meteo-45163.firebaseapp.com",
  databaseURL: "https://meteo-45163.firebaseio.com",
  storageBucket: "meteo-45163.appspot.com"
};
firebase.initializeApp(firebaseConfig);

export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      expenses: [],
      expense: null,
      user: null,
      email: "malika@mohamed.love",
      password: "070707070789"
    };
  }

  componentDidMount() {
    let that = this;

    firebase.auth().signInWithEmailAndPassword(that.state.email, that.state.password)
      .then((loggedInUser) => {
        that.setState({user: loggedInUser});
        console.log('login successfuly', loggedInUser);
        Alert.alert('login successfuly '+loggedInUser.providerData[0].email);
        that.registerForPushNotificationsAsync(loggedInUser);
      })
      .catch((error) => {
        console.log('error signIn', error);
        Alert.alert('error: '+error.Error);
    });

    setTimeout(function(){
      firebase.database().ref('/expenses').on('child_added', function(data){
        let newData = [...that.state.expenses];
        newData.push(data);
        that.setState({expenses: newData})
      });
    }, 1000)
  }

  registerForPushNotificationsAsync = async (user) => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    let updates = {};
    updates['/expoToken'] = token;
    firebase.database().ref('users').child(user.uid).update(updates)
  }

  addExpense = (data) => {
    let key = firebase.database().ref('/expenses').push().key;
    firebase.database().ref('/expenses').child(key).set({name: data});
  };

  onRegister = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((loggedInUser) => {
      this.setState({user: loggedInUser});
      console.log('register successfuly', loggedInUser);
      Alert.alert('register successfuly '+loggedInUser.providerData[0].email );
    })
    .catch((error) => {
      console.log('error signIn', error, typeof error);
      Alert.alert('error: '+error.Error);
    });
  };

  render() {
    if(this.state.expenses.length === 0){
      return (
        <View style={style.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else {
    const { width } = Dimensions.get('window');
    return (
        <Container>
          <Header style={{marginTop: StatusBar.currentHeight, backgroundColor: '#fff'}}>
            <Content>
              <Item>
                <Button transparent>
                  <Icon name='menu' onPress={() => this.props.navigation.navigate('DrawerOpen')} />
                </Button>
                <Input
                  placeholder="Add expense"
                  onChangeText={(expense) => this.setState({expense})}
                  value={this.state.expense}
                  />
                <Button transparent>
                  <Icon name='add' onPress={() => this.addExpense(this.state.expense)} />
                </Button>
              </Item>
            </Content>
          </Header>
          <Content>
            <Button
               onPress={this.onRegister}
               title="Register"
               color="#841584"
             />
            <List
              enableEmptySections
              dataSource={this.ds.cloneWithRows(this.state.expenses)}
              renderRow={row => <ListItem><Text>{row.val().name}</Text></ListItem>}
              renderRightHiddenRow={row => <Button full><Icon name='information-circle'/></Button>}
              rightOpenValue={-60}
            />
          </Content>
        </Container>
      );
    }
  }
}
