import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
// insert your own Image references here
import baby1 from './public/trump-baby.jpg';
import baby2 from './public/trump-baby-2.jpg';

// add Slideshow pics here
const picList = [baby1, baby2, baby1, baby2, baby1, baby2];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // pics to attach to Image elements
    this.pics = [...picList]

    this.state = {
      img1: {
        source: baby1,
        opacity: new Animated.Value(0),
      },
      img2: {
        source: baby2,
        opacity: new Animated.Value(1),
      },
      imgRefs: ['img2', 'img1'],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    // reverse the Image References, then updateImages
    this.setState({ imgRefs: this.state.imgRefs.reverse() }, this.updateImages);
  }

  updateImages(){
    // refill the list of pics when emptied
    if(this.pics.length === 0) this.pics = [...picList];

    const newState = {...this.state};
    const ref1 = this.state.imgRefs[0];
    // remove first image from this.pics and set as hidden IMG SRC
    newState[ref1]['source'] = this.pics.shift();
    this.setState(newState, this.fadeImages);
  }

  fadeImages(){
    // grab the Image references
    const ref1 = this.state.imgRefs[0];
    const ref2 = this.state.imgRefs[1];

    // fade In/Out images using references
    Animated.parallel([
      Animated.timing(this.state[ref1]['opacity'], {
        toValue: 1,
        duration: 250,
      }),
      Animated.timing(this.state[ref2]['opacity'], {
        toValue: 0,
        duration: 250,
      })
    ]).start();
  }

  render() {
    return (
      // Whole Screen is Touchable
      <TouchableOpacity
        style={styles.container}
        onPress={this.handleClick}
        activeOpacity={0.95}
      >
        {/* bind to 1 TouchableOpacity child */}
        <View style={styles.container}>

          {/* 2 Images positioned absolutely fullscreen */}
          <Animated.Image
            source={this.state.img1.source}
            style={[
              styles.image,
              { opacity: this.state.img1.opacity }
            ]}
          />

          <Animated.Image
            source={this.state.img2.source}
            style={[
              styles.image,
              { opacity: this.state.img2.opacity }
            ]}
          />

        </View>

      </TouchableOpacity>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
    height: height,
    width: width,
  },
});
