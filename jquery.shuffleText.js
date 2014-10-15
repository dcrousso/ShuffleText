/*
The MIT License (MIT)

Copyright (c) 2014 Devin Rousso

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function($) {
	$.fn.shuffleText = function(options) {
		var settings = {
			animate: false,
			bound: "none",
			include_punctuation: false,
			interval: 0,
			keep_caps: true,
			timeout: 0
		};
		if (options) $.extend(settings, options);
		var allChars = "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?";

		return this.each(function() {
			var target = $(this);
			var text = target.text();
			var shuffledText;

			if(settings.bound === "word") {
				var words = text.split(/ +/);
				for(var i = 0; i < words.length; i++) {
					if(words[i].length > 1) {
						if(!settings.include_punctuation) {
							words[i] = words[i].split(/([\.,-\/#!$%\^&\*;:{}=\-_`~()])/).filter(Boolean);
							words[i][0] = shuffle(words[i][0]);
							words[i] = words[i].join("");
						} else {
							words[i] = shuffle(words[i]);
						}
					}
				}
				shuffledText = words.join(" ");
			} else if(settings.bound === "sentence") {
				var words = text.split(/([!?.] +|[!?.]$)/).filter(Boolean);
				for(var i = 0; i < words.length; i++) {
					if(!words[i].match(/[!?.]/)) {
						words[i] = shuffle(words[i]);
					}
				}
				shuffledText = words.join("");
			} else {
				shuffledText = shuffle(text);
			}
			setTimeout(function() {
				if(settings.interval > 0) {
					var i = 0;
					var t = text;
					var interval = setInterval(function() {
						if(settings.animation) {
							changeLetter(i, text, shuffledText, target);
						} else {
							t = t.substr(0, i) + shuffledText[i] + t.substr(i + 1);
							target.text(t);
						}
						
						if(i >= text.length - 1) {
							clearInterval(interval);
						}
						i++;
					}, settings.interval);
				} else {
					target.text(shuffledText);
				}
			}, settings.timeout);
		});

		function shuffle(s) {
			var chars = s.split(""), shuffledChars = [];
			for(var i = 0; i < s.length; i++) {
				var num = Math.round(Math.random() * (chars.length - 1));
				var c = chars[num];
				if(!settings.keep_caps) {
					c = chars[num].toLowerCase();
				} else if(settings.keep_caps === "random") {
					c = Math.random() >= 0.5 ? chars[num].toUpperCase() : chars[num].toLowerCase();
				}
				shuffledChars[i] = c;
				chars.splice(num, 1);
			}
			return shuffledChars.join("");
		}

		function changeLetter(i, text, shuffledText, target) {
			var j = 0;
			var t = text;
			var animation = setInterval(function() {
				var rnum = Math.round(Math.random() * (allChars.length - 1));
				t = target.text().substr(0, i) + allChars[rnum];
				if(j > 10) {
					clearInterval(animation);
					t = shuffledText.substr(0, i + 1);
				}
				t += text.substr(i + 1);
				target.text(t);
				j++;
			}, 25);
		}
	};
})(jQuery);