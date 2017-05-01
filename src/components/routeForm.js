import React from "react";
import {View, TouchableNativeFeedback, AsyncStorage, RefreshControl, Text, DatePickerAndroid} from "react-native";
import {
    Container,
    Content,
    Form,
    Title,
    Button,
    Header,
    Icon,
    Left,
    Body,
    Label,
    Input,
    Item,
    List,
    ListItem
} from "native-base";
import {connect} from "react-redux";
import Indicator from "./indicator";
import GeoCoder from "../util/geoCoder";
import _ from "lodash";
import * as Animate from "react-native-animatable";

class RouteForm extends React.Component {
    constructor(props) {
        super(props);
        let data = this.props.data;
        this.currentRouteNumber = data != undefined ? data.routeNumber : 0;
        this.state = {
            routeNumber: data != undefined ? data.routeNumber : 0,
            startTime: data != undefined ? data.startTime : "",
            endTime: data != undefined ? data.endTime : "",
            startPoint: {
                latitude: data != undefined ? data.startPoint.latitude : "",
                longitude: data != undefined ? data.startPoint.longitude : ""
            },
            endPoint: {
                latitude: data != undefined ? data.endPoint.latitude : "",
                longitude: data != undefined ? data.endPoint.longitude : ""
            },
            turn: 0
        }
    }

    onFocus(type) {
        DatePickerAndroid.open({
            mode: "spinner",
            date: new Date()
        }).then(result => {
            if (type === "startTime") {
                this.setState({
                    startTime: new Date(result.year, result.month, result.day)
                });
            } else {
                this.setState({
                    endTime: new Date(result.year, result.month, result.day)
                });
            }
        })
    }

    onBackNavigator() {
        this.props.navigation.pop();
    }

    onPressUpdate() {
        AsyncStorage.getItem('route', (err, routeData) => {
            if (!err && routeData) {
                let route = JSON.parse(routeData);
                if (route.length) {
                    let currentRoute = route.find(item => item.routeNumber == this.currentRouteNumber);
                    if (currentRoute) {
                        let currentRouteIndex = route.indexOf(currentRoute);
                        Object.assign(currentRoute, this.state);
                        route.splice(currentRouteIndex, 1, currentRoute);
                        AsyncStorage.setItem('route', JSON.stringify(route));
                        this.props.navigation.pop();
                        this.props.instance.setState({isLoading: false});
                        this.props.instance.getRouteData();
                    }
                } else {
                    alert("No Data");
                }
            }
        })
    }

    onPressCreate() {
        let routeItem = this.state;
        AsyncStorage.getItem('route', (err, routeData) => {
            if (!err && routeData) {
                let route = JSON.parse(routeData);
                if (route.length) {
                    let currentRoute = route.find(item => item.routeNumber == this.state.routeNumber);
                    if(!currentRoute) {
                        route.push(routeItem);
                        AsyncStorage.setItem('route', JSON.stringify(route));
                    } else {
                        alert("Duplicate");
                    }
                } else {
                    AsyncStorage.setItem('route', JSON.stringify([routeItem]));
                }
            }
        })
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
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
                        Route Form
                    </Title>
                    </Body>
                </Header>
                <View style={{
                    flex: 1
                }}>
                    <List>
                        <ListItem itemDivider={true}>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 16
                            }}>
                                Infomation
                            </Text>
                        </ListItem>
                        <Form>
                            <Item inlineLabel={true}>
                                <Label>
                                    Route Number
                                </Label>
                                <Input
                                    value={this.state.routeNumber.toString()}
                                    onChangeText={(routeNumber) => this.setState({routeNumber})}/>
                            </Item>
                            <Item inlineLabel={true}>
                                <Label>
                                    Start Time
                                </Label>
                                <Input
                                    value={this.state.startTime.toString()}
                                    onFocus={() => this.onFocus("startTime")}
                                    onChangeText={(startTime) => this.setState({startTime})}/>
                            </Item>
                            <Item inlineLabel={true}>
                                <Label>
                                    End Time
                                </Label>
                                <Input
                                    value={this.state.endTime.toString()}
                                    onFocus={() => this.onFocus("endTime")}
                                    onChangeText={(endTime) => this.setState({endTime})}/>
                            </Item>
                            <Item inlineLabel={true}>
                                <Label>
                                    Turn
                                </Label>
                                <Input
                                    value={this.state.turn.toString()}
                                    onChangeText={(turn) => this.setState({turn})}/>
                            </Item>
                        </Form>
                        <ListItem itemDivider={true}>
                            <Text style={{
                            fontWeight: "bold",
                                fontSize: 16
                        }}>
                                Start Point
                            </Text>
                        </ListItem>
                        <Form>
                            <Item inlineLabel={true}>
                                <Label>
                                    Latitude
                                </Label>
                                <Input
                                    value={this.state.startPoint.latitude}
                                    onChangeText={(latitude) => this.setState({startPoint: {latitude: latitude}})}/>
                            </Item>
                            <Item inlineLabel={true}>
                                <Label>
                                    Longitude
                                </Label>
                                <Input
                                    value={this.state.startPoint.longitude}
                                    onChangeText={(longitude) => {this.setState({startPoint: {longitude: longitude}})}}/>
                            </Item>
                        </Form>
                        <ListItem itemDivider={true}>
                            <Text style={{
                            fontWeight: "bold",
                                fontSize: 16
                        }}>
                                End Point
                            </Text>
                        </ListItem>
                        <Form>
                            <Item inlineLabel={true}>
                                <Label>
                                    Latitude
                                </Label>
                                <Input
                                    value={this.state.endPoint.latitude}
                                    onChangeText={(latitude) => this.setState({endPoint: {latitude: latitude}})}/>
                            </Item>
                            <Item inlineLabel={true}>
                                <Label>
                                    Longitude
                                </Label>
                                <Input
                                    value={this.state.endPoint.longitude}
                                    onChangeText={(longitude) => this.setState({endPoint: {longitude: longitude}})}/>
                            </Item>
                        </Form>
                        <Button block={true} onPress={() => {
                            if(this.props.formType === "create") {
                                this.onPressCreate();
                            } else if(this.props.formType === "update") {
                                this.onPressUpdate();
                            }
                        }}>
                            <Text style={{
                        fontSize: 16,
                        color: "#fff"
                        }}>
                                Submit
                            </Text>
                        </Button>
                    </List>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

export default connect(mapStateToProps, null)(RouteForm)
