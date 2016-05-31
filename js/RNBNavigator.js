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
 * @providesModule RNBNavigator
 * @flow
 */

'use strict';

var React = require('React');
var Platform = require('Platform');
var BackAndroid = require('BackAndroid');
var Navigator = require('Navigator');
var F8TabsView = require('F8TabsView');
var { connect } = require('react-redux');
var Account = require('./tabs/account/Account');
var Home = require('./tabs/home/Home');

var RNBNavigator = React.createClass({
    _handlers: ([]: Array<() => boolean>),

    componentDidMount: function() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    },

    componentWillUnmount: function() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    },

    getChildContext() {
        return {
            addBackButtonListener: this.addBackButtonListener,
            removeBackButtonListener: this.removeBackButtonListener,
        };
    },

    addBackButtonListener: function(listener) {
        this._handlers.push(listener);
    },

    removeBackButtonListener: function(listener) {
        this._handlers = this._handlers.filter((handler) => handler !== listener);
    },

    handleBackButton: function() {
        for (let i = this._handlers.length - 1; i >= 0; i--) {
            if (this._handlers[i]()) {
                return true;
        }
    }

    const {navigator} = this.refs;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }

        return false;
    },

    render: function() {
        return (
            <Navigator
            ref="navigator"
            configureScene={(route) => {
                if (Platform.OS === 'android') {
                    return Navigator.SceneConfigs.FloatFromBottomAndroid;
                }
                // TODO: Proper scene support
                if (route.account) {
                    return Navigator.SceneConfigs.FloatFromRight;
                } else {
                    return Navigator.SceneConfigs.FloatFromLeft;
                }
            }}
            initialRoute={{}}
            renderScene={this.renderScene}
            />
        );
    },

    renderScene: function(route, navigator) {

        if (route.login) {
            return (
                <LoginModal
                navigator={navigator}
                onLogin={route.callback}
                />
            );
        }
        if (route.account) {
            return <Account navigator={navigator} />;
        }

        if (route.home) {
            return <Home navigator={navigator} />;
        }
        return <F8TabsView navigator={navigator} />;
    },
});

RNBNavigator.childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
};


function select(store) {
    return {
        tab: store.navigation.tab,
        isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    };
}

module.exports = connect(select)(RNBNavigator);
