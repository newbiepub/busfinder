import React from "react";
import {View, TouchableNativeFeedback, AsyncStorage, RefreshControl, ScrollView} from "react-native";
import {
    Container,
    Content,
    Title,
    Button,
    Header,
    Icon,
    Left,
    Body,
    Text,
    Label,
    Input,
    Item,
    List,
    Right,
    H2
} from "native-base";
import {connect} from "react-redux";
import Indicator from "./indicator";
import _ from 'lodash';
import MapView from 'react-native-maps';
import * as Animate from "react-native-animatable";

class RouteInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            busRoute: [],
            isLoading: true,
            showRoute: false
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('bus', (err, busData) => {
            if (!err && busData) {
                let bus = JSON.parse(busData);
                if (bus.length) {
                    let getBusRoute = _.filter(bus, (item) => item.routeNumber == this.props.data.routeNumber);
                    this.setState({
                        busRoute: getBusRoute,
                        isLoading: false
                    })
                }
            }
        })
    }

    onBackNavigator() {
        this.props.navigation.pop();
    }

    onFeedbackNavigator(item) {
        this.props.navigation.push({
            id: "feedback",
            data: item,
            routeData: this.props.data,
            instance: this
        });
    }

    renderItem(item, keyId, rowId) {
        return (
            <TouchableNativeFeedback onPress={() => {this.onFeedbackNavigator(item)}}>
                <View key={keyId} style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                elevation: 3,
                margin: 5
            }}>
                    <View style={{
                    flex: 0.25,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                        <Icon name="ios-bus-outline"/>
                    </View>
                    <View style={{
                    flex: 0.72,
                    flexDirection: "row",
                    marginBottom: 20
                }}>
                        <Label>
                            Bus License
                        </Label>
                        <Text style={{
                    color: "#000",
                    marginLeft: 10
                }}>
                            {item.licensePlate}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#fff",
                marginBottom: 15
            }}>
                <Header>
                    <Left>
                        <Button transparent={true} onPress={this.onBackNavigator.bind(this)}>
                            <Icon name="md-arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Text style={{
                        color: "#fff"
                    }}>
                        Dashboard
                    </Text>
                    </Body>
                </Header>
                <ScrollView>

                    <View>
                        <MapView
                            style={{
                            height: 300,
                            width: null
                        }}
                            region={{
                                  latitude: parseFloat(this.props.data.startPoint.latitude),
                                  longitude: parseFloat(this.props.data.startPoint.longitude),
                                  latitudeDelta: 0.0922,
                                  longitudeDelta: 0.0421
                            }}
                            initialRegion={{
                          latitude: 37.78825,
                          longitude: -122.4324,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                        >
                            {
                                this.state.showRoute &&
                                <MapView.Marker
                                    coordinate={{
                                    latitude: parseFloat(this.props.data.startPoint.latitude),
                                    longitude: parseFloat(this.props.data.startPoint.longitude)
                                }}/>
                            }
                            {
                                this.state.showRoute &&
                                <MapView.Marker
                                    coordinate={{
                                    latitude: parseFloat(this.props.data.endPoint.latitude),
                                    longitude: parseFloat(this.props.data.endPoint.longitude)
                                }}/>
                            }
                        </MapView>
                    </View>
                    {
                        this.state.busRoute.length > 0 &&
                        <View>
                            <View style={{
                            padding: 15
                        }}>
                                <H2>
                                    List Bus
                                </H2>
                                <List
                                    dataArray={this.state.busRoute}
                                    renderRow={this.renderItem.bind(this)}
                                />
                            </View>
                            <View style={{
                            flexDirection: "row",
                            paddingHorizontal: 15,
                            justifyContent: "space-between"
                        }}>
                                <Button onPress={() => this.setState({showRoute: true})}>
                                    <Text>
                                        Show Route
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    }
                    {
                        this.state.busRoute.length == 0 &&
                        <Text>
                            No Data
                        </Text>
                    }
                </ScrollView>
            </View>
        )
    }
}

export default connect(null, null)(RouteInfo);