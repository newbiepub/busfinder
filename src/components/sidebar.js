import React from "react";
import {View, Image} from "react-native";
import {List, ListItem, Text, Container, Content} from "native-base";
import { connect } from "react-redux";


class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    onAdminLoginNavigator() {
        this.props.navigation.push({
            id: "adminlogin"
        })
    }

    onFeedbackNavigator() {
        this.props.navigation.push({
            id: "feedback"
        });
    }

    onAdminPageNavigator() {
        this.props.navigation.push({
            id: "adminpage"
        })
    }

    render() {
        return (
            <View style={{
            flex: 1,
            backgroundColor: "#fff"
        }}>
                <Image style={{
                        flex: 0.25
                    }}
                       source={{uri: "http://cmihino.com.au/media/filer_public/90/91/909153f2-b0d2-416d-9d14-09bafd957672/bus-hino-page-banner-1196x432.jpg"}}>

                </Image>
                <View style={{
                    flex: 0.75
                }}>
                    <Container>
                        <Content>
                            <List>
                                {
                                    !this.props.account.loginState &&
                                    <ListItem onPress={() => {this.onAdminLoginNavigator()}}>
                                        <Text>
                                            Admin Login
                                        </Text>
                                    </ListItem>
                                }
                                {
                                    this.props.account.loginState &&
                                    <ListItem onPress={() => {this.onAdminPageNavigator()}}>
                                        <Text>
                                            Admin Page
                                        </Text>
                                    </ListItem>
                                }
                                <ListItem onPress={() => {this.onFeedbackNavigator()}}>
                                    <Text>
                                        FeedBack
                                    </Text>
                                </ListItem>
                                <ListItem onPress={() => {}}>
                                    <Text>
                                        About Us
                                    </Text>
                                </ListItem>
                            </List>
                        </Content>
                    </Container>

                </View>
            </View>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        account: state.account
    }
}

export default connect(mapStateToProp, null) (SideBar);