import React from 'react';
import FastImage from 'react-native-fast-image';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated
} from 'react-native';

// SLIDESHOW IMAGES ///////////////////////////////////////////////////////////

// import your imgs here
import artboard37 from './public/artboard37.jpg'
import artboard35_36 from './public/artboard35_36.jpg'
import artboard38 from './public/artboard38.jpg'
import artboard34 from './public/artboard34.jpg'
import artboard36 from './public/artboard36.jpg'
import artboard33 from './public/artboard33.jpg'
import artboard32 from './public/artboard32.jpg'
import artboard30 from './public/artboard30.jpg'
import artboard29 from './public/artboard29.jpg'
import artboard22 from './public/artboard22.jpg'
import artboard24 from './public/artboard24.jpg'
import artboard28 from './public/artboard28.jpg'
import artboard26 from './public/artboard26.jpg'
import artboard25 from './public/artboard25.jpg'
import artboard21 from './public/artboard21.jpg'
import artboard23 from './public/artboard23.jpg'
import artboard17 from './public/artboard17.jpg'
import artboard20 from './public/artboard20.jpg'
import artboard11 from './public/artboard11.jpg'
import artboard18 from './public/artboard18.jpg'
import artboard15 from './public/artboard15.jpg'
import artboard12 from './public/artboard12.jpg'
import artboard13 from './public/artboard13.jpg'
import artboard16 from './public/artboard16.jpg'
import artboard19 from './public/artboard19.jpg'
import artboard14 from './public/artboard14.jpg'
import artboard6 from './public/artboard6.jpg'
import artboard9 from './public/artboard9.jpg'
import artboard10 from './public/artboard10.jpg'
import artboard4 from './public/artboard4.jpg'
import artboard8 from './public/artboard8.jpg'
import artboard7 from './public/artboard7.jpg'
import artboard3 from './public/artboard3.jpg'
import artboard35 from './public/artboard35.jpg'
import artboard5 from './public/artboard5.jpg'
import artboard2 from './public/artboard2.jpg'
import artboard1 from './public/artboard1.jpg'

// order Images for Slideshow
const picList = [
  artboard1,
  artboard2,
  artboard3,
  artboard4,
  artboard5,
  artboard6,
  artboard7,
  artboard8,
  artboard9,
  artboard10,
  artboard11,
  artboard12,
  artboard13,
  artboard14,
  artboard15,
  artboard16,
  artboard17,
  artboard18,
  artboard19,
  artboard20,
  artboard21,
  artboard22,
  artboard23,
  artboard24,
  artboard25,
  artboard26,
  // 27 - no file
  artboard28,
  artboard29,
  artboard30,
  // 31 - no file
  artboard32,
  artboard33,
  artboard34,
  artboard35,
  artboard35_36,
  artboard36,
  artboard37,
  artboard38,
];


export default class App extends React.Component {
  constructor(props) {
    super(props);

    // pics to attach to Image elements
    this.pics = [...picList]

    this.state = {
      img1: {
        source: this.pics.shift(), // extract 1st image
        opacity: new Animated.Value(1), // start visible
      },
      img2: {
        source: this.pics.shift(), // extract 2nd image
        opacity: new Animated.Value(0), // start hidden
      },
      imgRefs: ['img2', 'img1'],

      start: true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleImageLoad = this.handleImageLoad.bind(this);
  }

  handleClick(){
    // skip straight to image fades on first click
    if(this.state.start){
      this.setState({ start: false })
      this.fadeImages();
      return null;
    }
    // reverse the Image References, then updateImages
    this.setState({ imgRefs: this.state.imgRefs.reverse() }, this.updateImages);
  }

  handleImageLoad(imgRef){
    // prevent on first load
    if(!this.state.start){
      // once new Image has loaded, start Fades
      this.fadeImages();
    }
  }

  updateImages(){
    // refill the list of pics when emptied
    if(this.pics.length === 0) this.pics = [...picList];

    const newState = {...this.state};
    const ref1 = this.state.imgRefs[0];
    // remove first image from this.pics and set as hidden IMG SRC
    newState[ref1]['source'] = this.pics.shift();
    this.setState(newState);
  }

  fadeImages(){
    // grab the Image references
    const ref1 = this.state.imgRefs[0];
    const ref2 = this.state.imgRefs[1];

    // fade In/Out images using references
    Animated.parallel([
      Animated.timing(this.state[ref1]['opacity'], {
        toValue: 1,
        duration: 100,
      }),
      Animated.timing(this.state[ref2]['opacity'], {
        toValue: 0,
        duration: 200,
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
        {/* single View child for TouchableOpacity */}
        <View style={styles.container}>

          {/* IMAGE 1 - initially VISIBLE */}
          <Animated.View style={[styles.image, { opacity: this.state.img1.opacity }]}>
            <FastImage
              source={this.state.img1.source}
              style={styles.image}
              resizeMode='stretch'
              onLoad={this.handleImageLoad}
            />
          </Animated.View>
          {/* 2 Images positioned absolutely fullscreen */}

          {/* IMAGE 2 - initially HIDDEN */}
          <Animated.View style={[styles.image, { opacity: this.state.img2.opacity }]}>
            <FastImage
              source={this.state.img2.source}
              style={styles.image}
              resizeMode='stretch'
              onLoad={this.handleImageLoad}
            />
          </Animated.View>

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
