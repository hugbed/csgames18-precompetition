import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

export default class Post extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            author : props.author,
            message: props.message,
            attachment : props.attachment
        };
    }
    componentDidMount() {
        console.log(this.state);
        if(this.state.attachment) {
            Image.getSize(this.state.attachment.url, (width, height) => {
                const screenWidth = Dimensions.get('window').width;
                const scaleFactor = width / screenWidth;
                const imageHeight = height / scaleFactor;
                this.state.imgWidth = screenWidth;
                this.state.imgHeight = imageHeight;
            })
        }
    }

    render() {
        return (
            <View style={styles.postContainer}>
                <Text style={styles.title}>{this.state.author}</Text>
                <Text style={styles.message}>{this.state.message}</Text>
                {this.state.attachment !== null && this.state.attachment.type === 'image' ? <Image resizeMode={'contain'} source={{uri:this.state.attachment.url}} style={{width: this.state.imgWidth, height: this.state.imgHeight}} /> : <Text></Text>}
            </View>
        );
    }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    postContainer : {
        marginBottom:10,
        paddingTop: 2,
        backgroundColor: 'white',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.4
    },
    title: {
        paddingLeft: 5,
        fontWeight: 'bold',
        color: 'black'
    },
    message: {
        paddingLeft: 5,
        textAlign: 'justify',
        marginBottom: 5
    },
    image : {
        flex:1,
        alignSelf: 'stretch',
        width: win.width,
        height: win.height
    }
});