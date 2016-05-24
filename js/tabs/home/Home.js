/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */
'use strict';

var Navigator = require('Navigator');
var React = require('React');

var View = require('View');
var { Text } = require('F8Text');
var ListContainer = require('ListContainer');
var F8Button = require('F8Button');
var StyleSheet = require('F8StyleSheet');
var { logOutWithPrompt } = require('../../actions');

import {connect} from 'react-redux';

type Props = {
    navigator: Navigator;
    logOut: () => void;
};

class Home extends React.Component {
    props: Props;

    constructor(props: Props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>
            <ListContainer
                title="Home"
                backgroundImage={require('./img/my-f8-background.png')}
                backgroundColor={'#A8D769'}>
                    
            </ListContainer>
            <Text style={styles.text}>
                Create Something Awesome
            </Text>
            <F8Button style={styles.button}
                caption="Logout"
                onPress={() => this.props.logOut() }
            />
            </View>
        );
    }
}

function bindActions(dispatch) {
  return {
    logOut: () => dispatch(logOutWithPrompt())
  };
}

const HEIGHT = 45;
var styles = StyleSheet.create({
    conatiner: {
        backgroundColor: '#fff'
    },
    text: {
        color: '#fff',
        marginTop: 300,
        fontSize: 20,
        paddingLeft: 60
    },
    button: {
        marginTop: 50,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        ios: {
            height: HEIGHT,
            paddingHorizontal: 20,
            borderRadius: HEIGHT / 2,
            borderWidth: 1,
        },
        android: {
            paddingBottom: 6,
            paddingHorizontal: 10,
            borderBottomWidth: 3,
            marginRight: 10,
        },
    },
});

module.exports = connect(null, bindActions)(Home);
