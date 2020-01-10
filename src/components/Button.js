import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

export default class Button extends Component {
  render() {
    const {containerSytstyles, textStyles} = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        style={[containerSytstyles, styles.container]}
        onPress={this.props.onTap}>
        <Text style={[textStyles, styles.text]}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginVertical: 3,
    marginRight: 5,
    width: width / 2 - 15,
    paddingHorizontal: 15,
    paddingVertical: 35,
    backgroundColor: '#db2642',
    borderRadius: 3,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    textTransform: 'uppercase',
  },
});
