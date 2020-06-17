import React from 'react';
import { Item, Input } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native'

class PasswordTextBox extends React.Component {

    state = {
        icon: "eye",
        password: true
    };

    _changeIcon() {
        this.setState(prevState => ({
            icon: prevState.icon === 'eye-slash' ? 'eye' : 'eye-slash',
            password: !prevState.password
        }));
    }

    render() {
        const { icon, onChange } = this.props;
        return (
            <Item style={styles.textInput}>
                <FontAwesome active name={icon} color='#ffffff' size={18} />
                <Input
                    style={{ fontSize: 15, color: '#fff', paddingLeft: 10, height: 40 }}
                    placeholder='Mot de passe'
                    placeholderTextColor={'#d3d0d2'}
                    secureTextEntry={this.state.password}
                    onChangeText={(e) => onChange(e)} />
                <FontAwesome name={this.state.icon} color='#ffffff' size={18} onPress={() => this._changeIcon()} />
            </Item>
        );
    }
}

export default PasswordTextBox;


const styles = StyleSheet.create({
    textInput: {
        width: '75%',
        borderBottomColor: '#d3d0d2',
        borderBottomWidth: 1,
        marginBottom: 25,
    },
}
);