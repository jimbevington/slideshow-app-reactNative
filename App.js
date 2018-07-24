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
import img1 from './public/img1.jpg';
import img2 from './public/img2.jpg';
import img3 from './public/img3.jpg';
import img4 from './public/img4.jpg';
import img5 from './public/img5.jpg';
import img6 from './public/img6.jpg';
import img7 from './public/img7.jpg';
import img8 from './public/img8.jpg';
import img9 from './public/img9.jpg';
import img10 from './public/img10.jpg';
import img11 from './public/img11.jpg';
import img12 from './public/img12.jpg';
import img13 from './public/img13.jpg';
import img14 from './public/img14.jpg';
import img15 from './public/img15.jpg';
import img17 from './public/img17.jpg';
import img18 from './public/img18.jpg';
import img19 from './public/img19.jpg';
import img20 from './public/img20.jpg';
import img21 from './public/img21.jpg';
import img22 from './public/img22.jpg';
import img23 from './public/img23.jpg';
import img24 from './public/img24.jpg';
import img25 from './public/img25.jpg';
import img26 from './public/img26.jpg';
import img28 from './public/img28.jpg';
import img29 from './public/img29.jpg';
import img30 from './public/img30.jpg';
import img32 from './public/img32.jpg';
import img33_34 from './public/img33_34.jpg';
import img33 from './public/img33.jpg';
import img34 from './public/img34.jpg';
import img37 from './public/img37.jpg';
import img_37 from './public/img_37.jpg';
import img39 from './public/img39.jpg';
import img40 from './public/img40.jpg';
import last from './public/last.jpg';


// order Images for Slideshow
const picList = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img28,
  img29,
  img30,
  img32,
  img33,
  img33_34,
  img34,
  img37,
  img_37,
  img39,
  last,
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
