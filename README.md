# swf2js.js

swf2js.js is a JavaScript FlashPlayer emulator that analyzes SWF files
of Adobe Animate (Flash) in real time and converts them to HTML.

This is an adapted version of swf2js, based on the free version of swf2js.js (version 0.7.24) from Toshiyuki Ienaga (see [https://github.com/ienaga/swf2js](https://github.com/ienaga/swf2js) or [https://swf2js.com](https://swf2js.com)).
The current version is 1.2.11.

swf2js.min.js is the minified version created with Google Closure Compiler.

For more information (usage/options/examples/testbed) see [https://music4classicalguitar.github.io/swf2js/index.html](https://music4classicalguitar.github.io/swf2js/index.html).

Adaptions:
- Added support for sounds and (multiple) soundstreams and synchronisation of sound and animation.
    - Sounds : mp3, raw (wave), ADPCM, NellyMoser.
    - Soundstreams : mp3, raw (wave), ADPCM.
- Corrected reading and parsing of images
    - DefineBitsLossless, DefineBitsLossless2
    - DefineBits, DefineBitsJPEG2, DefineBitsJPEG3, DefineBitsJPEG4
- Corrected reading and parsing of (morph)shapes
    - DefineShape, DefineShape2, DefineShape3, DefineShape4
    - DefineMorphShape, DefineMorphShape2
    - Support for SpreadMode reflect/repeat
    - Support for linestyle(s)
- Corrected reading and parsing of place object
    - PlaceObject, PlaceObject2, PlaceObject3
    - Corrected parsing and reading of ClipEventFlags and Filters
- Added support for external acces/control (functions: play, step stop, showInfo, showDebug)
- Corrected support for touch/non-touch devices
- Corrected previous frame, trying to go to a frame < 1


