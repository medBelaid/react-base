import React from 'react';
import { Text, Image, StyleSheet, View, WebView, Dimensions, StatusBar } from 'react-native';
import { Header, Body, Container, Content, Icon, Button } from 'native-base';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import style from './style';


export default class France24 extends React.Component {
  render() {
    const { width } = Dimensions.get('window');
    return (
      <Container>
        <StatusBar hidden={true}/>
        <Header>
          <Body>
            <Text style={style.headerTitle}>My Expense</Text>
          </Body>
        </Header>
        <Content contentContainerStyle={style.container}>
          <Button transparent>
            <Icon name='menu' onPress={() => this.props.navigation.navigate('DrawerOpen')} />
          </Button>
          <WebView
             style={{ width, height: 300 }}
             javaScriptEnabled={true}
             source={{uri: 'https://youtu.be/hL0sEdVJs3U'}}
         />
        </Content>
      </Container>
    );
  }
}
