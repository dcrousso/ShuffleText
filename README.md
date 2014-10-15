#A jQuery Plugin for shuffling text

## Download
 Get the [raw](https://raw.github.com/dcrousso/ShuffleText/master/jquery.shuffleText.js) script, download the complete [package](https://github.com/dcrousso/ShuffleText/zipball/master) or fork it on [GitHub](https://github.com/dcrousso/ShuffleText/).

 [Let me know](http://devinrousso.com/contact) if you used this plugin and had fun with it.


## Installation
Add the following script before your closing ```</body>``` tag:

```<script src="jquery.shuffleText.min.js"></script>```


## Options
Option | Type | Default | Description | Values
------ | ---- | ------- | ----------- | ------
animate | boolean | false | Adds randomization when changing characters | true and false
bound | string | 'none' | Determines where string will be split | "none", "word", and "sentence"
keep_caps | boolean | true | Determines whether letters stay capitalized | true, false, and "random"
include_punctuation | boolean | false | Determines whether punctuation marks are shuffled | true and false
interval | int | 0 | Amount of time between letter changes | Integer
timeout | int | 0 | Amount of time before text starts to change | Integer

## Initialization
Replace ```element``` with the ID/class of any object with text in it
```javascript
$(element).shuffleText({
	bound: "word",
	keep_caps: "random",
	include_punctuation: true
});
```
__Make sure that ```element``` has no other child elements except for text__

## Dependencies
jQuery 1.8
```<script src="//code.jquery.com/jquery-1.8.0.min.js"></script>```


## License
The MIT License (MIT)

Copyright (c) 2014 Devin Rousso