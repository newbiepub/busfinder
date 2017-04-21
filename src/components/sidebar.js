import React from "react";
import {View, Image} from "react-native";
import {List, ListItem, Text, Container, Content} from "native-base";

class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    onAdminLoginNavigator() {
        this.props.navigator.push({
            id: "adminlogin"
        })
    }

    onFeedbackNavigator() {
        this.props.navigator.push({
            id: "feedback"
        });
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
                                <ListItem onPress={() => {this.onAdminLoginNavigator()}}>
                                    <Text>
                                        Admin Login
                                    </Text>
                                </ListItem>
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

export default SideBar;