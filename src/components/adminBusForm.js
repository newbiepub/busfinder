import React from "react";
import {View, TouchableNativeFeedback, AsyncStorage} from "react-native";
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
    Picker,
    Form
} from "native-base";
import {connect} from "react-redux";
import Indicator from "./indicator";
import * as Animate from "react-native-animatable";

class BusForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeData: [],
            routeNumber: this.props.data.routeNumber,
            timeToNextStation: 0,
            distanceToNextStation: 0,
            isLoading: true
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('route', (err, routeData) => {
            if (!err && routeData) {
                let route = JSON.parse(routeData);
                if (route.length) {
                    this.setState({
                        routeData: route,
                        routeNumber: this.props.data.routeNumber,
                        timeToNextStation: this.props.data.timeToNextStation,
                        distanceToNextStation: this.props.data.distanceToNextStation,
                    });
                    setTimeout(() => {
                        this.setState({
                            isLoading: false
                        })
                    }, 500)
                }
            }
        })
    }

    onValueChange(value: string) {
        this.setState({
            selectedItem: value
        });
    }

    onBackNavigator() {
        this.props.navigation.pop();
    }

    onUpdateRoute() {
        AsyncStorage.getItem("bus", (err, busData) => {
            if(!err && busData) {

            }
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
                        Bus Form
                    </Title>
                    </Body>
                </Header>
                <View style={{
                    flex: 1
                }}>
                    <Label>Route Number</Label>
                    {
                        !this.state.isLoading &&
                        <Picker
                            mode="dropdown"
                            selectedValue={this.state.routeNumber}
                            onValueChange={this.onValueChange.bind(this)}>
                            {
                                this.state.routeData.map(item => {
                                    return <Item key={`${item.routeNumber}`} label={`${item.routeNumber}`} value={`${item.routeNumber}`} />
                                })
                            }
                        </Picker>
                    }
                    <Form>
                        <Item inlineLabel={true}>
                            <Label>
                                Time To Next Station
                            </Label>
                            <Input editable={false} value={this.state.timeToNextStation.toString()}/>
                        </Item>
                        <Item inlineLabel={true}>
                            <Label>
                                Distance To Next Station
                            </Label>
                            <Input editable={false} value={this.state.distanceToNextStation.toString()}/>
                        </Item>
                    </Form>
                    <Button block onPress={() => {this.onUpdateRoute.bind(this)}}>
                        <Text>
                            Update Route
                        </Text>
                    </Button>
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

export default connect(mapStateToProps, null)(BusForm);