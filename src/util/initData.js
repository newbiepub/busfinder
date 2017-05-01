import {AsyncStorage} from 'react-native';
import faker from "faker";

export function initDatabase() {
    AsyncStorage.getItem("user", (err, user) => {
        if (user == undefined) {
            let username = "admin@example.com";
            let password = "123456";
            let AdminUser = {
                profile: {
                    name: "Admin",
                },
                username: username,
                password: password
            };
            AsyncStorage.setItem("user", JSON.stringify(AdminUser));
        }
    });

    AsyncStorage.getItem('route', (err, route) => {
        if(route == undefined) {
            let routeData = [];
            for(let i = 0; i < 50 ; i++) {
                let routeItem = {
                    routeNumber: faker.random.number(),
                    startPoint: {
                        latitude: faker.address.latitude(),
                        longitude: faker.address.longitude()
                    },
                    endPoint: {
                        latitude: faker.address.latitude(),
                        longitude: faker.address.longitude()
                    },
                    startTime: faker.date.past(),
                    endTime: faker.date.future(),
                    turn: faker.random.number()
                };
                routeData.push(routeItem);
            }
            AsyncStorage.setItem('route', JSON.stringify(routeData));
        } else {
            let routes = JSON.parse(route);
            AsyncStorage.getItem("bus", (err, bus) => {
                if (bus == undefined) {
                    let busData = [];
                    for(let i = 0; i < 50 ; i++) {
                        let busItem = {
                            routeNumber: routes[Math.floor(Math.random() * routes.length)].routeNumber,
                            timeToNextStation: faker.random.number(),
                            distanceToNextStation: faker.random.number(),
                            licensePlate: faker.lorem.word()
                        };
                        busData.push(busItem);
                    }
                    AsyncStorage.setItem('bus', JSON.stringify(busData));
                }
            });
        }
    })

    AsyncStorage.getItem('busStation', (err, station) => {
        if(station == undefined) {
            let stationData = [];
            for(let i = 0; i < 9; i ++) {
                let stationItem = {
                    stationName: faker.company.companyName(),
                    location: {
                        latitude: faker.address.latitude(),
                        longitude: faker.address.longitude()
                    }
                }
                stationData.push(stationItem);
            }
        }
    })
}