# Teachable Machine + p5.js
This repo holds a few basic [p5.js](http://p5js.org) examples that uses the models trained with Google's [teachable machine prototype](https://teachablemachine.withgoogle.com/io19).

## List of examples
Here are examples of image and audio classifier.
- Image classifier
  - Image classifier on images
  - Image classifier on webcam
  - Image classifier with a lamp
- Audio classifier
  - Audio classifier on the microphone

## Demo
- Image classifier on images demo:
  [Try it live](https://yining1023.github.io/teachable-machine-p5/imageclassifier/imageclassifier-on-images/)<br/>
  <kbd><img src="https://github.com/yining1023/teachable-machine-example/raw/master/images/demo1.png" width="400"></kbd>
  
- Image classifier on webcam demo:
  [Try it live](https://yining1023.github.io/teachable-machine-p5/imageclassifier/imageclassifier-on-webcam/)<br/>
  <kbd><img src="https://github.com/yining1023/teachable-machine-example/raw/master/images/demo2-1.png" width="300"></kbd><kbd><img src="https://github.com/yining1023/teachable-machine-example/raw/master/images/demo2-2.png" width="288"></kbd>

- Image classifier with lamp a demo: [Try it live](https://yining1023.github.io/teachable-machine-p5/imageclassifier/imageclassifier-with-lamp/p5)<br/>
  (It uses Arduino 101 to control a lamp, Arduino talks to p5 sketch through Bluetooth by using p5.ble.js)<br/>
  video demo is coming soon.

- Audio classifier on the microphone demo:
  [Try it live](https://yining1023.github.io/teachable-machine-p5/imageclassifier/imageclassifier-on-images/)<br/>
  <kbd><img src="https://github.com/yining1023/teachable-machine-example/raw/master/images/demo3.png" width="300"></kbd>

## Get started
Go to your terminal:
```
$ git clone
$ cd teachable-machine-example
$ python -m SimpleHTTPServer     # $ python3 -m http.server (if you are using python 3)
```
Go to `localhost:8000` in your browser, you will see a directory list like this:
- audioclassifier/
- imageclassifier/
- README.md

Click into each folder, you will see the examples.

## More Teachable Machine Prototype + p5.js Projects!
- [Your full name](Your portfolio link/twitter/Instagram/any link you like), [Project name](Your blog link with images/videos), Project short description, [Live demo](optional, live demo link)
- - Khensu-Ra [Inevitable](https://github.com/Khensura21/ml4w-hw/tree/master/final)
- Caleb - [Walmartvision](https://github.com/calebsavage/machine-learning-for-web/tree/master/walmartvision)
- Daniel - [Create your GUI with OSCAR](https://docs.google.com/presentation/d/1JTMhAxybXksrZHRMRJnUGdRB3KBwzd7ZJ21MVGX2mRo/edit?usp=sharing)
- Dylan - [Move the Little Dude](https://dylandawkinsblog.wordpress.com/2019/05/08/machine-learning-for-web-final/), Use hand gestures to move a character.
- Eva - [link](https://www.evaphilips.com/machine-learning-for-the-web/2019/5/8/week-6-7-final-project)
- Vince - [Teachable Snake](https://github.com/vince19972/TeachableSnake)
- Eva Philips, [Mood Agent](https://www.evaphilips.com/machine-learning-for-the-web/2019/4/13/week-3-mood-agent), Keep the ball afloat by saying the word "Happy"
- Xinyue Li,[RGB Composition] (http://lxy.hosting.nyu.edu/machine-learning-for-the-web/rgb-composition-with-teachable-machine/), show the RGB composition of the image/video input and turn it into abstract art.
- Caleb Savage, [Screen Locker] (https://calebsavage.github.io/ml4w-week3/) Obscure the web page when the camera can't recognize my face.
- Dylan, [Duet Machine](https://dylandawkinsblog.wordpress.com/2019/04/17/duet-machine/), Tired of singing duets alone? Try this machine!
- Daniel [mutter Shazam](https://github.com/trafalmejo/teachable-machine-example), because Shazam is just not enough
- Fenfen Chen [Audio Classifier](https://wp.nyu.edu/fenfenrita/category/2019-spring/machine-learning-for-the-web/), recognize “Dance” and “Run” according to my load model, but I originally hoped that the recognition could also trigger the corresponding GIF file to play and pause.
- Yves, [Color Detector](https://sugarskin.xyz/2019/04/17/machine-learning-assignment-3/), A webcam that detects the color of objects and show you a list of other objects that may potentially have the same color.
- August, [Left Right CYOA](https://augustluhrs.art/itp/blog/ml4web/cyoatm), Simple prototype for a webcam controller for a Choose Your Own Adventure Game in the Browser
- Khensu-Ra, [Macros Detector](https://github.com/Khensura21/ml4w-hw/tree/master/week3), Low-Fidelity prototype of a web app that shows macronutrients of certain, pre-trained food objects/classes.
- Alice Sun, [Interactive Text](https://github.com/alicehgsun/MLW19/tree/master/week3)/[Doc](https://github.com/alicehgsun/MLW19/blob/master/README.md), Interactive simulation text example with image classification
- Sachiko Nakajima, [simple review of audio classifier](http://sachikon.hosting.nyu.edu/itp/machine-learning/3-1/)[review of imgae classifier](http://sachikon.hosting.nyu.edu/itp/machine-learning/4-1/), Some reviews of how the machine classifier works or not
- Louise Lessel [Slouching? A test of two algorithms](http://itp.louiselessel.com/2019/05/are-you-slouching/)
- Suzanne Li [Sound classifier](https://medium.com/@sl7211/image-classifier-3a75ba5a36b7)
