import React from 'react';
import { Text, Image, StyleSheet, View, WebView, Dimensions, StatusBar } from 'react-native';
import { Header, Body, Container, Content, Icon, Button } from 'native-base';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Video } from 'expo';

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
          <Video
        	  source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                  shouldPlay
        	  resizeMode="cover"
        	  style={{ width, height: 300 }}
	         />
        </Content>
      </Container>
    );
  }
}
