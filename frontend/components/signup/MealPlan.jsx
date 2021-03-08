import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Button } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';

function MealPlan({route, navigation}) {
    const [mealPlan, setMealPlan] = useState('');

    function handleLogin() {
        // Login Route
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/Login`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "user_id": 0,
                "name": "string",
                "email": route.params.email,
                "password": route.params.password
            })
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Examine the text in the response
                        response.json().then(function(data) {
                            sendMealPlan(data.UserID, data.token)
                        });
                    } else {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    function sendMealPlan(UserID, token) {
        // Send Meal Plan Route
        fetch(`https://purdueeats-304919.uc.r.appspot.com/Users/`+ UserID +`/MealPlan`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "MealPlanName": "21 Meal Plan +500"
            })

        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful POST
                        navigation.navigate("Login")
                    } else {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });

    }

    return (
        <SafeAreaView style={ styles.screen }>
            <Text style={ styles.questionTitle }>Select your meal plan.</Text>
            <DropDownPicker
                items={[
                    {label: '10 Meal Plan + 100', value: '10 Meal Plan + 100'},
                    {label: '15 Meal Plan + 450', value: '15 Meal Plan + 450'},
                    {label: '21 Meal Plan + 250', value: '21 Meal Plan + 250'},
                    {label: '21 Meal Plan + 500', value: '21 Meal Plan + 500'},
                ]}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setMealPlan(item.value)}
            />
            <Button style={ styles.continueButton } onPress={ handleLogin }>
                <Text style={ styles.continueText }>Continue</Text>
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen:{
        paddingTop: "50%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "12%"
    },
    questionTitle: {
        fontSize: 25,
        fontWeight: "bold",
    },
    textInput: {
        width: "100%",
        height: 40
    },
    continueButton: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: "red",
        borderRadius: 10,
        marginTop: "50%"
    },
    continueText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
});

export default MealPlan;