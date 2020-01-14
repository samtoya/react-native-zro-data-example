import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import ZroData from 'react-native-zro-data';
import Button from './src/components/Button';

if (__DEV__) {
  import('./config/ReactotronConfig');
}

import Reactotron from 'reactotron-react-native';

export default class App extends Component {
  state = {
    message: 'Hi',
    device: null,
    sdkState: false,
    status: '',
    attributes: '',
    initialized: false,
  };

  componentDidMount() {
    ZroData.getStatus(status => {
      Reactotron.log('ZroData.getStatus', status);
      this.setState({status});
    });
    ZroData.addListener('zro-data-status', event => {
      Reactotron.log('ZroData.addListener', event.status);
      this.setState({status: event.status});
    });
  }

  _initialize = () => {
    ZroData.initialize('13cfad4b-89b9-4d41-aa5d-3f78e5d1f6fd', '64', '')
      .then(response => {
        this.setState({
          status: response.status,
          sdkState: response.initialized,
        });
        Reactotron.log('_initialize', response);
      })
      .catch(error => {
        Alert.alert('Error!', error);
      });
  };

  _startSession = async () => {
    const response = await ZroData.startSession();
    Reactotron.log('_startSession', response);
  };

  _stopSession = async () => {
    const response = await ZroData.stopSession(false);
    Reactotron.log('_stopSession', response);
  };

  _closeSession = async () => {
    const response = await ZroData.closeSession();
    Reactotron.log('_closeSession', response);
  };

  _setopSponsoredIPList = ips => {
    Reactotron.log('_setopSponsoredIPList', ips);
  };

  _setPhoneNumber = async phone => {
    const response = await ZroData.setPhoneNumber(phone);
    Reactotron.log('_setopSponsoredIPList', response);
  };

  _getStatus = () => {
    ZroData.getStatus(status => {
      this.setState({status});
      Reactotron.log('status', status);
    });
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <Text style={styles.headerText}>Testing React Native ZroData</Text>

            <View style={styles.infoContainer}>
              <View style={styles.infoWrapper}>
                <Text style={styles.infoTag}>SDK State:</Text>
                <Text style={styles.infoText}>
                  {this.state.sdkState ? 'Initialized' : 'Uninitalized'}
                </Text>
              </View>

              <View style={styles.infoWrapper}>
                <Text style={styles.infoTag}>Status:</Text>
                <Text style={styles.infoText}>{this.state.status}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              disabled={this.state.sdkState}
              title={'Initialize SDK'}
              onTap={this._initialize}
            />
            <Button title={'Start sponsorship'} onTap={this._startSession} />
            <Button title={'Stop sponsorship'} onTap={this._stopSession} />
            <Button title={'Close session'} onTap={this._closeSession} />
            <Button title={'Get status'} onTap={this._getStatus} />
            <Button title={'Open Browser'} onTap={() => {}} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {marginVertical: 0},
  container: {
    height: height * 0.28,
    marginVertical: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 30,
    backgroundColor: '#db2642',
  },
  infoContainer: {
    borderTopWidth: 1,
    borderTopColor: 'white',
    marginTop: 20,
    paddingVertical: 10,
  },
  infoWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  infoTag: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 18,
    color: 'white',
  },
  headerText: {fontSize: 26, color: 'white'},
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
});
