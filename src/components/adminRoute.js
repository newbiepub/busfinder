import React from "react";
import {View, TouchableNativeFeedback, AsyncStorage, RefreshControl} from "react-native";
import {Container, Content, Title, Button, Header, Icon, Left, Body, Text, Label, Input, Item, List, Right} from "native-base";
import {connect} from "react-redux";
import Indicator from "./indicator";
import GeoCoder from "../util/geoCoder";
import _ from "lodash";
import * as Animate from "react-native-animatable";

class AdminRoute extends React.Component {
    constructor(props) {
        super(props);
        this.address = [];
        this.state = {
            isLoading: true,
            refreshing: false,
            routeData: []
        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.getRouteData()
        }, 1000);
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getRouteData();
    }

    onBackNavigator() {
        this.props.navigation.pop();
    }

    onPressItem(item) {
        this.props.navigation.push({
            id: "routeform",
            data: item,
            formType: "update",
            instance: this
        })
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

    renderRow(item, keyId, rowId) {
        return (
        <TouchableNativeFeedback onPress={() => this.onPressItem(item)}>
            <Animate.View animation="slideInUp" duration={500} delay={rowId * 100} style={{
                margin: 10,
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
                        borderRightColor: "#cccccc",
                        backgroundColor: "#fff"
                    }}>
                        <Icon name="md-settings"/>
                    </View>
                    <View style={{
                         flex: 0.85,
                        paddingHorizontal: 20
                    }}>
                        <View style={{
                            flex: 0.33 ,
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

                        <View style={{
                            flex: 0.33 ,
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

                        <View style={{
                            flex: 0.33 ,
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

    getRouteData() {
        AsyncStorage.getItem('route', (err, routeData) => {
            if (!err && routeData) {
                let route = JSON.parse(routeData);
                if (route.length) {
                    _.each(route, (routeItem, index) => {
                        this.GetAddressData(routeItem.startPoint.latitude, routeItem.startPoint.longitude, routeItem.routeNumber, "startPoint");
                        this.GetAddressData(routeItem.endPoint.latitude, routeItem.endPoint.longitude, routeItem.routeNumber, "endPoint");
                        if(index === route.length - 1) {
                            setTimeout(() => {
                                this.setState({
                                    isLoading: false,
                                    refreshing: false,
                                    routeData: route
                                })
                            }, 1000);
                        }
                    });
                }
            }
        })
    }

    onCreateClick() {
        this.props.navigation.push({
            id: "routeform",
            formType: "create",
            instance: this
        })
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#fff"
            }}>
                <Header>
                    <Left>
                        <Button transparent={true} onPress={this.onBackNavigator.bind(this)}>
                            <Icon name="md-arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={{
                        color: "#fff"
                    }}>
                        Route
                    </Title>
                    </Body>
                    <Right>
                        <Button transparent={true} onPress={() => this.onCreateClick()}>
                            <Icon name={"md-add"}/>
                        </Button>
                    </Right>
                </Header>
                {this.state.isLoading &&
                    <Indicator/>
                }
                {
                    !this.state.isLoading &&
                    <List
                        refreshControl={
                                  <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                  />
                            }
                        renderRow={this.renderRow.bind(this)}
                        dataArray={this.state.routeData}
                    />
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

export default connect(mapStateToProps, null)(AdminRoute);