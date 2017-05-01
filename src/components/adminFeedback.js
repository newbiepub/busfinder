import React from "react";
import {View, TouchableNativeFeedback, AsyncStorage, RefreshControl, Alert} from "react-native";
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
    Card,
    CardItem
} from "native-base";
import {connect} from "react-redux";
import Indicator from "./indicator";
import * as Animate from "react-native-animatable";

class AdminFeedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: [],
            isLoaded: false
        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.loadFeedbackData();
        }, 1000);
    }

    loadFeedbackData () {
        AsyncStorage.getItem('feedback', (err, feedbackData) => {
            if(!err && feedbackData) {
                let feedback = JSON.parse(feedbackData);
                if(feedback.length) {
                    this.setState({feedback})
                }
            } else {
                alert(err);
            }
        })
    }

    onDeleteFeedback(item) {
        AsyncStorage.getItem('feedback', (err, feedbackData) => {
            if(!err && feedbackData) {
                let feedback = JSON.parse(feedbackData);
                if(feedback.length) {
                    let selectedFeedback = feedback.find(feedbackItem => feedbackItem.id == item.id);
                    if(selectedFeedback) {
                        let selectedFeedbackIndex = feedback.indexOf(selectedFeedback);
                        Alert.alert(
                            'Alert Title',
                            "My Message",
                            [
                                {text: 'OK', onPress: () => {
                                    feedback.splice(selectedFeedbackIndex, 1);
                                    AsyncStorage.setItem("feedback", JSON.stringify(feedback));
                                }},
                                {text: 'Cancel', onPress: () => console.log('Canceled !')}
                            ]
                        )
                    } else {
                        alert("Not found");
                    }
                }
            } else {
                alert("No data");
            }
        })
    }

    renderRow(item, keyId, rowId) {
        return (
        <TouchableNativeFeedback onLongPress={() => this.onDeleteFeedback(item)}>
            <Card>
                <CardItem header style={{
                    borderBottomWidth: 1,
                    borderColor: "#000"
                }}>
                    <Text>{item.busLicense}</Text>
                </CardItem>
                <CardItem style={{
                    borderBottomWidth: 1,
                    borderColor: "#000"
                }}>
                    <Body>
                    <Text>
                        {item.comment}
                    </Text>
                    </Body>
                </CardItem>
                <CardItem header>
                    <Text>{item.email}</Text>
                </CardItem>
            </Card>
        </TouchableNativeFeedback>

        )
    }

    render() {
        return (
            <View style={{
                flex: 1,
                padding: 15
            }}>
                <List
                    renderRow={this.renderRow.bind(this)}
                    dataArray={this.state.feedback}
                />
            </View>
        )
    }
}

export default connect(null, null) (AdminFeedback);