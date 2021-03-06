import React, {Component} from 'react';
import {View, PermissionsAndroid, TouchableNativeFeedback, AsyncStorage} from "react-native";
import {Header, Left, Body, Right, Icon, Button, Title, Drawer, Fab, Text, List, Label} from "native-base";
import _ from "lodash";
import MapView from 'react-native-maps';
import SideBar from "./sidebar";
import * as Animate from "react-native-animatable";
import GeoCoder from "../util/geoCoder";
import Indicator from './indicator';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.fabRef = null;
        this._drawer = null;
        this.currentPosition = null;
        this.region = null;
        this.routeData = null;
        this.address = [];
        this.state={
            isUpdateLocation: false,
            currentPosition: null,
            isLoading: true
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('route', (err, route) => {
            if(!err && route) {
                let routes = JSON.parse(route);
                this.routeData = JSON.parse(JSON.stringify(routes.splice(0, 10)));
                _.each(this.routeData, (routeItem, index) => {
                    this.GetAddressData(routeItem.startPoint.latitude, routeItem.startPoint.longitude, routeItem.routeNumber, "startPoint");
                    this.GetAddressData(routeItem.endPoint.latitude, routeItem.endPoint.longitude, routeItem.routeNumber, "endPoint");
                    if(index === this.routeData.length - 1) {
                        setTimeout(() => {
                            this.setState({isLoading: false})
                        }, 1000);
                    }
                });
            }
        });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.currentPosition = position;
                this.region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                };
                this.setState({isUpdateLocation: true})
            },
            (error) => {
                console.log(error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    GetAddressData(latitude, longitude, id, type) {
        GeoCoder.geocodePosition({lat: parseFloat(latitude), lng: parseFloat(longitude)})
            .then(res => {
                this.address.push({dataId: id, address: res, type: type})
            });
    }

    showFormatAddress(id, type) {
        let getAddress = _.find(this.address, (item) => item.dataId === id && item.type === type);
        if(getAddress != undefined && getAddress.address.length) {
            return getAddress.address[0].formattedAddress;
        }
        return "Not Found";
    }

    getCurrentPosition () {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.currentPosition = position;
                this.region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                };
                this.setState({isUpdateLocation: true, currentPosition: position});
            },
            (error) => {
                console.log(error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    onPressItem(item) {
        this.props.navigation.push({
            id:'routeinfo',
            data: item,
            instance: this
        })
    }

    renderRow(item, keyId, rowId) {
        return (
        <TouchableNativeFeedback onPress={() => {this.onPressItem(item)}}>
            <Animate.View animation="slideInUp" duration={500} delay={rowId * 100} style={{
                marginBottom: 10,
                paddingVertical: 15,
                borderWidth: 1,
                borderColor: "#cccccc",
                backgroundColor: "#fff",
                elevation: 5
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: "row"
                }}>
                    <View style={{
                        flex: 0.15,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                        borderRightColor: "#cccccc"
                    }}>
                        <Icon name="md-bus"/>
                    </View>
                    <View style={{
                        flex: 0.85,
                        paddingHorizontal: 20
                    }}>
                        <View style={{flex: 0.33 ,
                            flexDirection: "row"
                        }}>
                            <Label>
                                Route Number:
                            </Label>
                            <Text style={{
                                marginLeft: 10
                            }}>
                                {item.routeNumber}
                            </Text>
                        </View>
                        <View style={{flex: 0.33 ,
                            flexDirection: "row"
                        }}>
                            <Label>
                                From
                            </Label>
                            <Text style={{
                                marginLeft: 10
                            }}>
                                {this.showFormatAddress(item.routeNumber, "startPoint")}
                            </Text>
                        </View>
                        <View style={{flex: 0.33 ,
                            flexDirection: "row"
                        }}>
                            <Label>
                                To
                            </Label>
                            <Text style={{
                                marginLeft: 10
                            }}>
                                {this.showFormatAddress(item.routeNumber, "endPoint")}
                            </Text>
                        </View>
                    </View>
                </View>
            </Animate.View>
        </TouchableNativeFeedback>
        )
    }

    render() {
        return (
            <View style={{
              flex: 1
            }}>
                <Drawer
                    ref={(ref) => { this._drawer = ref; }}
                    content={
                        <SideBar navigation={this.props.navigation}/>
                    }
                    onClose={() => this._drawer._root.close()}
                >
                    <Header>
                        <TouchableNativeFeedback onPress={() => this._drawer._root.open()}>
                            <Left>
                                <Icon name="md-menu" style={{
                            color: "#fff"
                        }}/>
                            </Left>
                        </TouchableNativeFeedback>
                        <Body>
                        <Title> Home </Title>
                        </Body>
                        <Right>
                            <TouchableNativeFeedback>
                                <Icon name="md-bus" style={{
                            color: "#fff"
                        }}/>
                            </TouchableNativeFeedback>
                        </Right>

                    </Header>
                    <View style={{flex: 0.5}}>

                        <MapView
                            style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                            region={this.region}
                            initialRegion={{
                          latitude: 37.78825,
                          longitude: -122.4324,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                        >
                            {
                                this.state.isUpdateLocation &&
                                <MapView.Marker
                                    coordinate={{
                                    latitude: this.currentPosition.coords.latitude,
                                    longitude: this.currentPosition.coords.longitude
                                }}
                                />
                            }
                        </MapView>
                    </View>
                    <View style={{
                  flex: 0.5
                }}>
                        {this.state.isLoading &&
                            <Indicator/>
                        }
                        {
                            !this.state.isLoading &&
                                <List
                                    renderRow={this.renderRow.bind(this)}
                                    dataArray={this.routeData}
                                />
                        }
                    </View>
                    <TouchableNativeFeedback onPress={() => {
                        this.fabRef.bounceIn(800);
                        this.getCurrentPosition();
                    }}>
                        <Animate.View animation="bounceIn" ref={(ref) => this.fabRef = ref}
                                      style={{ height: 56, width: 56,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  position: "absolute",
                                  right: 20,
                                  borderRadius: 50,
                                  elevation: 3,
                                  backgroundColor: "#3f51b5",
                                  bottom: 20}}>
                            <Icon name="ios-locate-outline" style={{color: "#fff"}}/>
                        </Animate.View>
                    </TouchableNativeFeedback>
                </Drawer>
            </View>
        );
    }
}
