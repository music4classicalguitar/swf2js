/**
 * swf2js 1.2.14
 * Based on : swf2js from Toshiyuki Ienaga (version 0.7.24 from https://github.com/ienaga/swf2js)
 * Develop: https://github.com/music4classicalguitar/swf2js
 * Info and demo : https://music4classicalguitar.github.io/swf2js/
 * Web: https://github.com/music4classicalguitar
 * Licensed under the MIT License.
*/
/*jshint esversion: 6*/
window.onerror = function(message, source, lineno, colno, error) {
	if (lineno>0)
	window.alert("Message : " + message + "\nSource : " + source + "\nLine : " + lineno + "\nCol : " + colno + "\nError : " + error + " " + JSON.stringify(error));
};

let getTimeStamp;

/* use performance if available to get better timing/precision */
if (window.performance.now) {
	getTimeStamp = function() {
		return window.performance.now();
	};
} else {
	if (window.performance.webkitNow) {
		getTimeStamp = function() {
			return window.performance.webkitNow();
		};
	} else {
		getTimeStamp = function() {
			return new Date().getTime();
		};
	}
}

/*jshint expr:true*/
"use strict";
/*jshint expr:false*/

let autoPlayAudioAllowed = true;
let audio = document.createElement("audio");
audio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";

let promiseAudio = audio.play();
if (promiseAudio instanceof Promise) {
	promiseAudio.catch(function(error) {
		// Check if it is the right error
		if (error.name === 'NotAllowedError') {
			autoPlayAudioAllowed = false;
		} else {
			console.log(JSON.stringify(error,null,'  '));
			// Don't throw the error so that we get to the then
			// or throw it but set the autoPlayAudioAllowed to true in here
		}
	}).then(function() {
		if (autoPlayAudioAllowed) {
			// Autoplay is allowed - continue with initialization
		} else {
			// Autoplay is not allowed - wait for the user to trigger the play button manually
		}
	});
} else {
	// Unknown if allowed
	// Note: you could fallback to simple event listeners in this case
}

let autoPlayVideoAllowed = true;
let video = document.createElement("video");
video.src = URL.createObjectURL(new Blob([new Uint8Array([0, 0, 0, 28, 102, 116, 121, 112, 105, 115, 111, 109, 0, 0, 2, 0, 105, 115, 111, 109, 105, 115, 111, 50, 109, 112, 52, 49, 0, 0, 0, 8, 102, 114, 101, 101, 0, 0, 2, 239, 109, 100, 97, 116, 33, 16, 5, 32, 164, 27, 255, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 167, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 33, 16, 5, 32, 164, 27, 255, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 167, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 2, 194, 109, 111, 111, 118, 0, 0, 0, 108, 109, 118, 104, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 232, 0, 0, 0, 47, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 236, 116, 114, 97, 107, 0, 0, 0, 92, 116, 107, 104, 100, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 101, 100, 116, 115, 0, 0, 0, 28, 101, 108, 115, 116, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 47, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 100, 109, 100, 105, 97, 0, 0, 0, 32, 109, 100, 104, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 68, 0, 0, 8, 0, 85, 196, 0, 0, 0, 0, 0, 45, 104, 100, 108, 114, 0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0, 0, 0, 1, 15, 109, 105, 110, 102, 0, 0, 0, 16, 115, 109, 104, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 100, 105, 110, 102, 0, 0, 0, 28, 100, 114, 101, 102, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1, 0, 0, 0, 211, 115, 116, 98, 108, 0, 0, 0, 103, 115, 116, 115, 100, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 87, 109, 112, 52, 97, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 16, 0, 0, 0, 0, 172, 68, 0, 0, 0, 0, 0, 51, 101, 115, 100, 115, 0, 0, 0, 0, 3, 128, 128, 128, 34, 0, 2, 0, 4, 128, 128, 128, 20, 64, 21, 0, 0, 0, 0, 1, 244, 0, 0, 1, 243, 249, 5, 128, 128, 128, 2, 18, 16, 6, 128, 128, 128, 1, 2, 0, 0, 0, 24, 115, 116, 116, 115, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0, 28, 115, 116, 115, 99, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 28, 115, 116, 115, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 115, 0, 0, 1, 116, 0, 0, 0, 20, 115, 116, 99, 111, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 44, 0, 0, 0, 98, 117, 100, 116, 97, 0, 0, 0, 90, 109, 101, 116, 97, 0, 0, 0, 0, 0, 0, 0, 33, 104, 100, 108, 114, 0, 0, 0, 0, 0, 0, 0, 0, 109, 100, 105, 114, 97, 112, 112, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 105, 108, 115, 116, 0, 0, 0, 37, 169, 116, 111, 111, 0, 0, 0, 29, 100, 97, 116, 97, 0, 0, 0, 1, 0, 0, 0, 0, 76, 97, 118, 102, 53, 54, 46, 52, 48, 46, 49, 48, 49])], {
	type: 'video/mp4'
}));

let promiseVideo = video.play();
if (promiseVideo instanceof Promise) {
	promiseVideo.catch(function(error) {
		// Check if it is the right error
		if (error.name === 'NotAllowedError') {
			autoPlayVideoAllowed = false;
		} else {
			console.log(JSON.stringify(error,null,'  '));
			// Don't throw the error so that we get to the then
			// or throw it but set the autoPlayVideoAllowed to true in here
		}
	}).then(function() {
		if (autoPlayVideoAllowed) {
			// Autoplay is allowed - continue with initialization
			// console.log('autoplay allowed')
		} else {
			// Autoplay is not allowed - wait for the user to trigger the play button manually
		}
	});
} else {
	// Unknown if allowed
	// Note: you could fallback to simple event listeners in this case
}
if (!("swf2js" in window)) {
	(function(window) {
		let _document = window.document;
		let _Math = Math;
		let _min = _Math.min;
		let _max = _Math.max;
		let _floor = _Math.floor;
		let _ceil = _Math.ceil;
		let _pow = _Math.pow;
		let _random = _Math.random;
		let _atan2 = _Math.atan2;
		let _sqrt = _Math.sqrt;
		let _cos = _Math.cos;
		let _sin = _Math.sin;
		let _log = _Math.log;
		let _abs = _Math.abs;
		let _SQRT2 = _Math.SQRT2;
		let _LN2 = _Math.LN2;
		let _LN2_2 = _LN2 / 2;
		let _LOG1P = 0.29756328478758615;
		let _PI = _Math.PI;
		let _Number = Number;
		let _fromCharCode = String.fromCharCode;
		let _isNaN = isNaN;
		let Func = Function;
		let requestAnimationFrame =
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.setTimeout;
		// params
		let resizeId = 0;
		let stageId = 0;
		let stages = [];
		let loadStages = [];
		let instanceId = 0;
		let tmpContext;
		let StartDate = new Date();
		let _navigator = window.navigator;
		let ua = _navigator.userAgent;
		let isAndroid = (ua.indexOf("Android") > 0);
		let isAndroid4x = (ua.indexOf("Android 4.") > 0);
		let isChrome = (ua.indexOf("Chrome") > 0);

		let isTouch = false;
		if ("maxTouchPoints" in navigator) {
			isTouch = navigator.maxTouchPoints > 0;
		} else if ("msMaxTouchPoints" in navigator) {
			isTouch = navigator.msMaxTouchPoints > 0;
		} else {
			let mQ = window.matchMedia && window.matchMedia("(pointer:coarse)");
			if (mQ && mQ.media === "(pointer:coarse)") {
				isTouch = !!mQ.matches;
			} else if ('orientation' in window) {
				isTouch = true; // deprecated, but good fallback
			} else {
				// Only as a last resort, fall back to user agent sniffing
				let UA = navigator.userAgent;
				isTouch = (
					/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
					/\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
				);
			}
		}

		let xmlHttpRequest = new XMLHttpRequest();
		let isXHR2 = (typeof xmlHttpRequest.responseType !== "undefined");
		let isArrayBuffer = window.ArrayBuffer;
		let quality = (isTouch) ? 0.6 : 0.8;
		let devicePixelRatio = window.devicePixelRatio || 1;
		let _devicePixelRatio = devicePixelRatio * quality;
		let _event = null;
		let _isTouchEvent;
		let _keyEvent = null;
		// Alpha Bug
		let isAlphaBug = isAndroid;
		let chkCanvas = _document.createElement("canvas");
		chkCanvas.width = 1;
		chkCanvas.height = 1;
		tmpContext = chkCanvas.getContext("2d");
		if (isAndroid) {
			let imageData = tmpContext.createImageData(1, 1);
			let pixelArray = imageData.data;
			pixelArray[0] = 128;
			pixelArray[3] = 128;
			tmpContext.putImageData(imageData, 0, 0);
			imageData = tmpContext.getImageData(0, 0, 1, 1);
			pixelArray = imageData.data;
			isAlphaBug = (pixelArray[0] === 255);
			imageData = null;
			pixelArray = null;
		}

		if (typeof Object.defineProperty !== "function") {
			Object.defineProperty = function(obj, prop, desc)
			{
				if ("value" in desc) {
					obj[prop] = desc.value;
				}
				if ("get" in desc) {
					obj.__defineGetter__(prop, desc.get);
				}
				if ("set" in desc) {
					obj.__defineSetter__(prop, desc.set);
				}
				return obj;
			};
		}

		if (typeof Object.defineProperties !== "function") {
			Object.defineProperties = function(obj, descs)
			{
				for (let prop in descs) {
					if (descs.hasOwnProperty(prop)) {
						Object.defineProperty(obj, prop, descs[prop]);
					}
				}
				return obj;
			};
		}

		if (typeof Object.getPrototypeOf !== "function") {
			Object.getPrototypeOf = function(obj)
			{
				return Object.getPrototypeOf(obj);
			};
		}

		if (typeof Object.setPrototypeOf !== "function") {
			Object.setPrototypeOf = function(obj, proto) {
				Object.setPrototypeOf(obj,proto);
				return obj;
			};
		}

		// shift-jis
		let JCT11280 = new Func('let a="zKV33~jZ4zN=~ji36XazM93y!{~k2y!o~k0ZlW6zN?3Wz3W?{EKzK[33[`y|;-~j^YOTz$!~kNy|L1$353~jV3zKk3~k-4P4zK_2+~jY4y!xYHR~jlz$_~jk4z$e3X5He<0y!wy|X3[:~l|VU[F3VZ056Hy!nz/m1XD61+1XY1E1=1y|bzKiz!H034zKj~mEz#c5ZA3-3X$1~mBz$$3~lyz#,4YN5~mEz#{ZKZ3V%7Y}!J3X-YEX_J(3~mAz =V;kE0/y|F3y!}~m>z/U~mI~j_2+~mA~jp2;~m@~k32;~m>V}2u~mEX#2x~mBy+x2242(~mBy,;2242(~may->2&XkG2;~mIy-_2&NXd2;~mGz,{4<6:.:B*B:XC4>6:.>B*BBXSA+A:X]E&E<~r#z+625z s2+zN=`HXI@YMXIAXZYUM8X4K/:Q!Z&33 3YWX[~mB`{zKt4z (zV/z 3zRw2%Wd39]S11z$PAXH5Xb;ZQWU1ZgWP%3~o@{Dgl#gd}T){Uo{y5_d{e@}C(} WU9|cB{w}bzvV|)[} H|zT}d||0~{]Q|(l{|x{iv{dw}(5}[Z|kuZ }cq{{y|ij}.I{idbof%cu^d}Rj^y|-M{ESYGYfYsZslS`?ZdYO__gLYRZ&fvb4oKfhSf^d<Yeasc1f&a=hnYG{QY{D`Bsa|u,}Dl|_Q{C%xK|Aq}C>|c#ryW=}eY{L+`)][YF_Ub^h4}[X|?r|u_ex}TL@YR]j{SrXgo*|Gv|rK}B#mu{R1}hs|dP{C7|^Qt3|@P{YVV |8&}#D}ef{e/{Rl|>Hni}R1{Z#{D[}CQlQ||E}[s{SG_+i8eplY[=[|ec[$YXn#`hcm}YR|{Ci(_[ql|?8p3]-}^t{wy}4la&pc|3e{Rp{LqiJ],] `kc(]@chYnrM`O^,ZLYhZB]ywyfGY~aex!_Qww{a!|)*lHrM{N+n&YYj~Z b c#e_[hZSon|rOt`}hBXa^i{lh|<0||r{KJ{kni)|x,|0auY{D!^Sce{w;|@S|cA}Xn{C1h${E]Z-XgZ*XPbp]^_qbH^e[`YM|a||+=]!Lc}]vdBc=j-YSZD]YmyYLYKZ9Z>Xcczc2{Yh}9Fc#Z.l{}(D{G{{mRhC|L3b#|xK[Bepj#ut`H[,{E9Yr}1b{[e]{ZFk7[ZYbZ0XL]}Ye[(`d}c!|*y`Dg=b;gR]Hm=hJho}R-[n}9;{N![7k_{UbmN]rf#pTe[x8}!Qcs_rs[m`|>N}^V})7{^r|/E}),}HH{OYe2{Skx)e<_.cj.cjoMhc^d}0uYZd!^J_@g,[[[?{i@][|3S}Yl3|!1|eZ|5IYw|1D}e7|Cv{OHbnx-`wvb[6[4} =g+k:{C:}ed{S]|2M]-}WZ|/q{LF|dYu^}Gs^c{Z=}h>|/i|{W]:|ip{N:|zt|S<{DH[p_tvD{N<[8Axo{X4a.^o^X>Yfa59`#ZBYgY~_t^9`jZHZn`>G[oajZ;X,i)Z.^~YJe ZiZF^{][[#Zt^|]Fjx]&_5dddW]P0C[-]}]d|y {C_jUql] |OpaA[Z{lp|rz}:Mu#]_Yf6{Ep?f5`$[6^D][^u[$[6^.Z8]]ePc2U/=]K^_+^M{q*|9tYuZ,s(dS{i=|bNbB{uG}0jZOa:[-]dYtu3]:]<{DJ_SZIqr_`l=Yt`gkTnXb3d@kiq0a`Z{|!B|}e}Ww{Sp,^Z|0>_Z}36|]A|-t}lt{R6pi|v8hPu#{C>YOZHYmg/Z4nicK[}hF_Bg|YRZ7c|crkzYZY}_iXcZ.|)U|L5{R~qi^Uga@Y[xb}&qdbd6h5|Btw[}c<{Ds53[Y7]?Z<|e0{L[ZK]mXKZ#Z2^tavf0`PE[OSOaP`4gi`qjdYMgys/?[nc,}EEb,eL]g[n{E_b/vcvgb.{kcwi`~v%|0:|iK{Jh_vf5lb}KL|(oi=LrzhhY_^@`zgf[~g)[J_0fk_V{T)}I_{D&_/d9W/|MU[)f$xW}?$xr4<{Lb{y4}&u{XJ|cm{Iu{jQ}CMkD{CX|7A}G~{kt)nB|d5|<-}WJ}@||d@|Iy}Ts|iL|/^|no|0;}L6{Pm]7}$zf:|r2}?C_k{R(}-w|`G{Gy[g]bVje=_0|PT{^Y^yjtT[[[l!Ye_`ZN]@[n_)j3nEgMa]YtYpZy].d-Y_cjb~Y~[nc~sCi3|zg}B0}do{O^{|$`_|D{}U&|0+{J3|8*]iayx{a{xJ_9|,c{Ee]QXlYb]$[%YMc*]w[aafe]aVYi[fZEii[xq2YQZHg]Y~h#|Y:thre^@^|_F^CbTbG_1^qf7{L-`VFx Zr|@EZ;gkZ@slgko`[e}T:{Cu^pddZ_`yav^Ea+[#ZBbSbO`elQfLui}.F|txYcbQ`XehcGe~fc^RlV{D_0ZAej[l&jShxG[ipB_=u:eU}3e8[=j|{D(}dO{Do[BYUZ0/]AYE]ALYhZcYlYP/^-^{Yt_1_-;YT`P4BZG=IOZ&]H[e]YYd[9^F[1YdZxZ?Z{Z<]Ba2[5Yb[0Z4l?]d_;_)a?YGEYiYv`_XmZs4ZjY^Zb]6gqGaX^9Y}dXZr[g|]Y}K aFZp^k^F]M`^{O1Ys]ZCgCv4|E>}8eb7}l`{L5[Z_faQ|c2}Fj}hw^#|Ng|B||w2|Sh{v+[G}aB|MY}A{|8o}X~{E8paZ:]i^Njq]new)`-Z>haounWhN}c#{DfZ|fK]KqGZ=:u|fqoqcv}2ssm}.r{]{nIfV{JW)[K|,Z{Uxc|]l_KdCb%]cfobya3`p}G^|LZiSC]U|(X|kBlVg[kNo({O:g:|-N|qT}9?{MBiL}Sq{`P|3a|u.{Uaq:{_o|^S}jX{Fob0`;|#y_@[V[K|cw[<_ }KU|0F}d3|et{Q7{LuZttsmf^kYZ`Af`}$x}U`|Ww}d]| >}K,r&|XI|*e{C/a-bmr1fId4[;b>tQ_:]hk{b-pMge]gfpo.|(w[jgV{EC1Z,YhaY^q,_G[c_g[J0YX]`[h^hYK^_Yib,` {i6vf@YM^hdOKZZn(jgZ>bzSDc^Z%[[o9[2=/YHZ(_/Gu_`*|8z{DUZxYt^vuvZjhi^lc&gUd4|<UiA`z]$b/Z?l}YI^jaHxe|;F}l${sQ}5g}hA|e4}?o{ih}Uz{C)jPe4]H^J[Eg[|AMZMlc}:,{iz}#*|gc{Iq|/:|zK{l&}#u|myd{{M&v~nV};L|(g|I]ogddb0xsd7^V})$uQ{HzazsgxtsO^l}F>ZB]r|{7{j@cU^{{CbiYoHlng]f+nQ[bkTn/}<-d9q {KXadZYo+n|l[|lc}V2{[a{S4Zam~Za^`{HH{xx_SvF|ak=c^[v^7_rYT`ld@]:_ub%[$[m](Shu}G2{E.ZU_L_R{tz`vj(f?^}hswz}GdZ}{S:h`aD|?W|`dgG|if{a8|J1{N,}-Ao3{H#{mfsP|[ bzn+}_Q{MT{u4kHcj_q`eZj[8o0jy{p7}C|[}l){MuYY{|Ff!Ykn3{rT|m,^R|,R}$~Ykgx{P!]>iXh6[l[/}Jgcg{JYZ.^qYfYIZl[gZ#Xj[Pc7YyZD^+Yt;4;`e8YyZVbQ7YzZxXja.7SYl[s]2^/Ha$[6ZGYrb%XiYdf2]H]kZkZ*ZQ[ZYS^HZXcCc%Z|[(bVZ]]:OJQ_DZCg<[,]%Zaa [g{C00HY[c%[ChyZ,Z_`PbXa+eh`^&jPi0a[ggvhlekL]w{Yp^v}[e{~;k%a&k^|nR_z_Qng}[E}*Wq:{k^{FJZpXRhmh3^p>de^=_7`|ZbaAZtdhZ?n4ZL]u`9ZNc3g%[6b=e.ZVfC[ZZ^^^hD{E(9c(kyZ=bb|Sq{k`|vmr>izlH[u|e`}49}Y%}FT{[z{Rk}Bz{TCc/lMiAqkf(m$hDc;qooi[}^o:c^|Qm}a_{mrZ(pA`,}<2sY| adf_%|}`}Y5U;}/4|D>|$X{jw{C<|F.hK|*A{MRZ8Zsm?imZm_?brYWZrYx`yVZc3a@f?aK^ojEd {bN}/3ZH]/$YZhm^&j 9|(S|b]mF}UI{q&aM]LcrZ5^.|[j`T_V_Gak}9J[ ZCZD|^h{N9{~&[6Zd{}B}2O|cv]K}3s}Uy|l,fihW{EG`j_QOp~Z$F^zexS`dcISfhZBXP|.vn|_HYQ|)9|cr]<`&Z6]m_(ZhPcSg>`Z]5`~1`0Xcb4k1{O!bz|CN_T{LR|a/gFcD|j<{Z._[f)mPc:1`WtIaT1cgYkZOaVZOYFrEe[}T$}Ch}mk{K-^@]fH{Hdi`c*Z&|Kt{if[C{Q;{xYB`dYIX:ZB[}]*[{{p9|4GYRh2ao{DS|V+[zd$`F[ZXKadb*A] Ys]Maif~a/Z2bmclb8{Jro_rz|x9cHojbZ{GzZx_)]:{wAayeDlx}<=`g{H1{l#}9i|)=|lP{Qq}.({La|!Y{i2EZfp=c*}Cc{EDvVB|;g}2t{W4av^Bn=]ri,|y?|3+}T*ckZ*{Ffr5e%|sB{lx^0]eZb]9[SgAjS_D|uHZx]dive[c.YPkcq/}db{EQh&hQ|eg}G!ljil|BO]X{Qr_GkGl~YiYWu=c3eb}29v3|D|}4i||.{Mv})V{SP1{FX}CZW6{cm|vO{pS|e#}A~|1i}81|Mw}es|5[}3w{C`h9aL]o{}p[G`>i%a1Z@`Ln2bD[$_h`}ZOjhdTrH{[j_:k~kv[Sdu]CtL}41{I |[[{]Zp$]XjxjHt_eThoa#h>sSt8|gK|TVi[Y{t=}Bs|b7Zpr%{gt|Yo{CS[/{iteva|cf^hgn}($_c^wmb^Wm+|55jrbF|{9^ q6{C&c+ZKdJkq_xOYqZYSYXYl`8]-cxZAq/b%b*_Vsa[/Ybjac/OaGZ4fza|a)gY{P?| I|Y |,pi1n7}9bm9ad|=d{aV|2@[(}B`d&|Uz}B}{`q|/H|!JkM{FU|CB|.{}Az}#P|lk}K{|2rk7{^8^?`/|k>|Ka{Sq}Gz}io{DxZh[yK_#}9<{TRdgc]`~Z>JYmYJ]|`!ZKZ]gUcx|^E[rZCd`f9oQ[NcD_$ZlZ;Zr}mX|=!|$6ZPZYtIo%fj}CpcN|B,{VDw~gb}@hZg`Q{LcmA[(bo`<|@$|o1|Ss}9Z_}tC|G`{F/|9nd}i=}V-{L8aaeST]daRbujh^xlpq8|}zs4bj[S`J|]?G{P#{rD{]I`OlH{Hm]VYuSYUbRc*6[j`8]pZ[bt_/^Jc*[<Z?YE|Xb|?_Z^Vcas]h{t9|Uwd)_(=0^6Zb{Nc} E[qZAeX[a]P^|_J>e8`W^j_Y}R{{Jp__]Ee#e:iWb9q_wKbujrbR}CY`,{mJ}gz{Q^{t~N|? gSga`V_||:#mi}3t|/I`X{N*|ct|2g{km}gi|{={jC}F;|E}{ZZjYf*frmu}8Tdroi{T[|+~}HG{cJ}DM{Lp{Ctd&}$hi3|FZ| m}Kr|38}^c|m_|Tr{Qv|36}?Up>|;S{DV{k_as}BK{P}}9p|t`jR{sAm4{D=b4pWa[}Xi{EjwEkI}3S|E?u=X0{jf} S|NM|JC{qo^3cm]-|JUx/{Cj{s>{Crt[UXuv|D~|j|d{YXZR}Aq}0r}(_{pJfi_z}0b|-vi)Z mFe,{f4|q`b{}^Z{HM{rbeHZ|^x_o|XM|L%|uFXm}@C_{{Hhp%a7|0p[Xp+^K}9U{bP}: tT}B|}+$|b2|[^|~h{FAby[`{}xgygrt~h1[li`c4vz|,7p~b(|mviN}^pg[{N/|g3|^0c,gE|f%|7N{q[|tc|TKA{LU}I@|AZp(}G-sz{F |qZ{}F|f-}RGn6{Z]_5})B}UJ{FFb2]4ZI@v=k,]t_Dg5Bj]Z-]L]vrpdvdGlk|gF}G]|IW}Y0[G| /bo|Te^,_B}#n^^{QHYI[?hxg{[`]D^IYRYTb&kJ[cri[g_9]Ud~^_]<p@_e_XdNm-^/|5)|h_{J;{kacVopf!q;asqd}n)|.m|bf{QW|U)}b+{tL|w``N|to{t ZO|T]jF}CB|0Q{e5Zw|k |We}5:{HO{tPwf_uajjBfX}-V_C_{{r~gg|Ude;s+}KNXH}! `K}eW{Upwbk%ogaW}9EYN}YY|&v|SL{C3[5s.]Y]I]u{M6{pYZ`^,`ZbCYR[1mNg>rsk0Ym[jrE]RYiZTr*YJ{Ge|%-lf|y(`=[t}E6{k!|3)}Zk} ][G{E~cF{u3U.rJ|a9p#o#ZE|?|{sYc#vv{E=|LC}cu{N8`/`3`9rt[4|He{cq|iSYxY`}V |(Q|t4{C?]k_Vlvk)BZ^r<{CL}#h}R+[<|i=}X|{KAo]|W<`K{NW|Zx}#;|fe{IMr<|K~tJ_x}AyLZ?{GvbLnRgN}X&{H7|x~}Jm{]-| GpNu0}.ok>|c4{PYisrDZ|fwh9|hfo@{H~XSbO]Odv]%`N]b1Y]]|eIZ}_-ZA]aj,>eFn+j[aQ_+]h[J_m_g]%_wf.`%k1e#Z?{CvYu_B^|gk`Xfh^M3`afGZ-Z|[m{L}|k3cp[it ^>YUi~d>{T*}YJ{Q5{Jxa$hg|%4`}|LAgvb }G}{P=|<;Ux{_skR{cV|-*|s-{Mp|XP|$G|_J}c6cM{_=_D|*9^$ec{V;|4S{qO|w_|.7}d0|/D}e}|0G{Dq]Kdp{}dfDi>}B%{Gd|nl}lf{C-{y}|ANZr}#={T~|-(}c&{pI|ft{lsVP}){|@u}!W|bcmB{d?|iW|:dxj{PSkO|Hl]Li:}VYk@|2={fnWt{M3`cZ6|)}|Xj}BYa?vo{e4|L7|B7{L7|1W|lvYO}W8nJ|$Vih|{T{d*_1|:-n2dblk``fT{Ky|-%}m!|Xy|-a{Pz}[l{kFjz|iH}9N{WE{x,|jz}R {P|{D)c=nX|Kq|si}Ge{sh|[X{RF{t`|jsr*fYf,rK|/9}$}}Nf{y!1|<Std}4Wez{W${Fd_/^O[ooqaw_z[L`Nbv[;l7V[ii3_PeM}.h^viqYjZ*j1}+3{bt{DR[;UG}3Og,rS{JO{qw{d<_zbAh<R[1_r`iZTbv^^a}c{iEgQZ<exZFg.^Rb+`Uj{a+{z<[~r!]`[[|rZYR|?F|qppp]L|-d|}K}YZUM|=Y|ktm*}F]{D;g{uI|7kg^}%?Z%ca{N[_<q4xC]i|PqZC]n}.bDrnh0Wq{tr|OMn6tM|!6|T`{O`|>!]ji+]_bTeU}Tq|ds}n|{Gm{z,f)}&s{DPYJ`%{CGd5v4tvb*hUh~bf]z`jajiFqAii]bfy^U{Or|m+{I)cS|.9k:e3`^|xN}@Dnlis`B|Qo{`W|>||kA}Y}{ERYuYx`%[exd`]|OyiHtb}HofUYbFo![5|+]gD{NIZR|Go}.T{rh^4]S|C9_}xO^i`vfQ}C)bK{TL}cQ|79iu}9a];sj{P.o!f[Y]pM``Jda^Wc9ZarteBZClxtM{LW}l9|a.mU}KX}4@{I+f1}37|8u}9c|v${xGlz}jP{Dd1}e:}31}%3X$|22i<v+r@~mf{sN{C67G97855F4YL5}8f{DT|xy{sO{DXB334@55J1)4.G9A#JDYtXTYM4, YQD9;XbXm9SX]IB^4UN=Xn<5(;(F3YW@XkH-X_VM[DYM:5XP!T&Y`6|,^{IS-*D.H>:LXjYQ0I3XhAF:9:(==.F*3F1189K/7163D,:@|e2{LS36D4hq{Lw/84443@4.933:0307::6D7}&l{Mx657;89;,K5678H&93D(H<&<>0B90X^I;}Ag1{P%3A+>><975}[S{PZE453?4|T2{Q+5187;>447:81{C=hL6{Me^:=7ii{R=.=F<81;48?|h8}Uh{SE|,VxL{ST,7?9Y_5Xk3A#:$%YSYdXeKXOD8+TXh7(@>(YdXYHXl9J6X_5IXaL0N?3YK7Xh!1?XgYz9YEXhXaYPXhC3X`-YLY_XfVf[EGXZ5L8BXL9YHX]SYTXjLXdJ: YcXbQXg1PX]Yx4|Jr{Ys4.8YU+XIY`0N,<H%-H;:0@,74/:8546I=9177154870UC]d<C3HXl7ALYzXFXWP<<?E!88E5@03YYXJ?YJ@6YxX-YdXhYG|9o{`iXjY_>YVXe>AYFX[/(I@0841?):-B=14337:8=|14{c&93788|di{cW-0>0<097/A;N{FqYpugAFT%X/Yo3Yn,#=XlCYHYNX[Xk3YN:YRT4?)-YH%A5XlYF3C1=NWyY}>:74-C673<69545v {iT85YED=64=.F4..9878/D4378?48B3:7:7/1VX[f4{D,{l<5E75{dAbRB-8-@+;DBF/$ZfW8S<4YhXA.(5@*11YV8./S95C/0R-A4AXQYI7?68167B95HA1*<M3?1/@;/=54XbYP36}lc{qzSS38:19?,/39193574/66878Yw1X-87E6=;964X`T734:>86>1/=0;(I-1::7ALYGXhF+Xk[@W%TYbX7)KXdYEXi,H-XhYMRXfYK?XgXj.9HX_SX]YL1XmYJ>Y}WwIXiI-3-GXcYyXUYJ$X`Vs[7;XnYEZ;XF! 3;%8;PXX(N3Y[)Xi1YE&/ :;74YQ6X`33C;-(>Xm0(TYF/!YGXg8 9L5P01YPXO-5%C|qd{{/K/E6,=0144:361:955;6443@?B7*7:F89&F35YaX-CYf,XiFYRXE_e{}sF 0*7XRYPYfXa5YXXY8Xf8Y~XmA[9VjYj*#YMXIYOXk,HHX40YxYMXU8OXe;YFXLYuPXP?EB[QV0CXfY{:9XV[FWE0D6X^YVP*$4%OXiYQ(|xp|%c3{}V`1>Y`XH00:8/M6XhQ1:;3414|TE|&o@1*=81G8<3}6<|(f6>>>5-5:8;093B^3U*+*^*UT30XgYU&7*O1953)5@E78--F7YF*B&0:%P68W9Zn5974J9::3}Vk|-,C)=)1AJ4+<3YGXfY[XQXmT1M-XcYTYZXCYZXEYXXMYN,17>XIG*SaS|/eYJXbI?XdNZ+WRYP<F:R PXf;0Xg`$|1GX9YdXjLYxWX!ZIXGYaXNYm6X9YMX?9EXmZ&XZ#XQ>YeXRXfAY[4 ;0X!Zz0XdN$XhYL XIY^XGNXUYS/1YFXhYk.TXn4DXjB{jg|4DEX]:XcZMW=A.+QYL<LKXc[vV$+&PX*Z3XMYIXUQ:ZvW< YSXFZ,XBYeXMM)?Xa XiZ4/EXcP3%}&-|6~:1(-+YT$@XIYRBC<}&,|7aJ6}bp|8)K1|Xg|8C}[T|8Q.89;-964I38361<=/;883651467<7:>?1:.}le|:Z=39;1Y^)?:J=?XfLXbXi=Q0YVYOXaXiLXmJXO5?.SFXiCYW}-;|=u&D-X`N0X^,YzYRXO(QX_YW9`I|>hZ:N&X)DQXP@YH#XmNXi$YWX^=!G6YbYdX>XjY|XlX^XdYkX>YnXUXPYF)FXT[EVTMYmYJXmYSXmNXi#GXmT3X8HOX[ZiXN]IU2>8YdX1YbX<YfWuZ8XSXcZU%0;1XnXkZ_WTG,XZYX5YSX Yp 05G?XcYW(IXg6K/XlYP4XnI @XnO1W4Zp-9C@%QDYX+OYeX9>--YSXkD.YR%Q/Yo YUX].Xi<HYEZ2WdCE6YMXa7F)=,D>-@9/8@5=?7164;35387?N<618=6>7D+C50<6B03J0{Hj|N9$D,9I-,.KB3}m |NzE0::/81YqXjMXl7YG; [.W=Z0X4XQY]:MXiR,XgM?9$9>:?E;YE77VS[Y564760391?14941:0=:8B:;/1DXjFA-564=0B3XlH1+D85:0Q!B#:-6&N/:9<-R3/7Xn<*3J4.H:+334B.=>30H.;3833/76464665755:/83H6633:=;.>5645}&E|Y)?1/YG-,93&N3AE@5 <L1-G/8A0D858/30>8<549=@B8] V0[uVQYlXeD(P#ID&7T&7;Xi0;7T-$YE)E=1:E1GR):--0YI7=E<}n9|aT6783A>D7&4YG7=391W;Zx<5+>F#J39}o/|cc;6=A050EQXg8A1-}D-|d^5548083563695D?-.YOXd37I$@LYLWeYlX<Yd+YR A$;3-4YQ-9XmA0!9/XLY_YT(=5XdDI>YJ5XP1ZAW{9>X_6R(XhYO65&J%DA)C-!B:97#A9;@?F;&;(9=11/=657/H,<8}bz|j^5446>.L+&Y^8Xb6?(CYOXb*YF(8X`FYR(XPYVXmPQ%&DD(XmZXW??YOXZXfCYJ79,O)XnYF7K0!QXmXi4IYFRXS,6<%-:YO(+:-3Q!1E1:W,Zo}Am|n~;3580534*?3Zc4=9334361693:30C<6/717:<1/;>59&:4}6!|rS36=1?75<8}[B|s809983579I.A.>84758=108564741H*9E{L{|u%YQ<%6XfH.YUXe4YL@,>N}Tv|ve*G0X)Z;/)3@A74(4P&A1X:YVH97;,754*A66:1 D739E3553545558E4?-?K17/770843XAYf838A7K%N!YW4.$T19Z`WJ*0XdYJXTYOXNZ 1XaN1A+I&Xi.Xk3Z3GB&5%WhZ1+5#Y[X<4YMXhQYoQXVXbYQ8XSYUX4YXBXWDMG0WxZA[8V+Z8X;D],Va$%YeX?FXfX[XeYf<X:Z[WsYz8X_Y]%XmQ(!7BXIZFX]&YE3F$(1XgYgYE& +[+W!<YMYFXc;+PXCYI9YrWxGXY9DY[!GXiI7::)OC;*$.>N*HA@{C|}&k=:<TB83X`3YL+G4XiK]i}(fYK<=5$.FYE%4*5*H*6XkCYL=*6Xi6!Yi1KXR4YHXbC8Xj,B9ZbWx/XbYON#5B}Ue}+QKXnF1&YV5XmYQ0!*3IXBYb71?1B75XmF;0B976;H/RXU:YZX;BG-NXj;XjI>A#D3B636N;,*%<D:0;YRXY973H5)-4FXOYf0:0;/7759774;7;:/855:543L43<?6=E,.A4:C=L)%4YV!1(YE/4YF+ F3%;S;&JC:%/?YEXJ4GXf/YS-EXEYW,9;E}X$}547EXiK=51-?71C%?57;5>463553Zg90;6447?<>4:9.7538XgN{|!}9K/E&3-:D+YE1)YE/3;37/:05}n<}:UX8Yj4Yt864@JYK..G=.(A Q3%6K>3(P3#AYE$-6H/456*C=.XHY[#S.<780191;057C)=6HXj?955B:K1 E>-B/9,;5.!L?:0>/.@//:;7833YZ56<4:YE=/:7Z_WGC%3I6>XkC*&NA16X=Yz2$X:Y^&J48<99k8}CyB-61<18K946YO4{|N}E)YIB9K0L>4=46<1K0+R;6-=1883:478;4,S+3YJX`GJXh.Yp+Xm6MXcYpX(>7Yo,/:X=Z;Xi0YTYHXjYmXiXj;*;I-8S6N#XgY}.3XfYGO3C/$XjL$*NYX,1 6;YH&<XkK9C#I74.>}Hd`A748X[T450[n75<4439:18A107>|ET}Rf<1;14876/Yb983E<5.YNXd4149>,S=/4E/<306443G/06}0&}UkYSXFYF=44=-5095=88;63844,9E6644{PL}WA8:>)7+>763>>0/B3A545CCnT}Xm|dv}Xq1L/YNXk/H8;;.R63351YY747@15YE4J8;46;.38.>4A369.=-83,;Ye3?:3@YE.4-+N353;/;@(X[YYD>@/05-I*@.:551741Yf5>6A443<3535;.58/86=D4753442$635D1>0359NQ @73:3:>><Xn?;43C14 ?Y|X611YG1&<+,4<*,YLXl<1/AIXjF*N89A4Z576K1XbJ5YF.ZOWN.YGXO/YQ01:4G38Xl1;KI0YFXB=R<7;D/,/4>;$I,YGXm94@O35Yz66695385.>:6A#5}W7n^4336:4157597434433<3|XA}m`>=D>:4A.337370?-6Q96{`E|4A}C`|Qs{Mk|J+~r>|o,wHv>Vw}!c{H!|Gb|*Ca5}J||,U{t+{CN[!M65YXOY_*B,Y[Z9XaX[QYJYLXPYuZ%XcZ8LY[SYPYKZM<LMYG9OYqSQYM~[e{UJXmQYyZM_)>YjN1~[f3{aXFY|Yk:48YdH^NZ0|T){jVFYTZNFY^YTYN~[h{nPYMYn3I]`EYUYsYIZEYJ7Yw)YnXPQYH+Z.ZAZY]^Z1Y`YSZFZyGYHXLYG 8Yd#4~[i|+)YH9D?Y^F~Y7|-eYxZ^WHYdYfZQ~[j|3>~[k|3oYmYqY^XYYO=Z*4[]Z/OYLXhZ1YLZIXgYIHYEYK,<Y`YEXIGZI[3YOYcB4SZ!YHZ*&Y{Xi3~[l|JSY`Zz?Z,~[m|O=Yi>??XnYWXmYS617YVYIHZ(Z4[~L4/=~[n|Yu{P)|];YOHHZ}~[o33|a>~[r|aE]DH~[s|e$Zz~[t|kZFY~XhYXZB[`Y}~[u|{SZ&OYkYQYuZ2Zf8D~[v}% ~[w3},Q[X]+YGYeYPIS~[y}4aZ!YN^!6PZ*~[z}?E~[{3}CnZ=~[}}EdDZz/9A3(3S<,YR8.D=*XgYPYcXN3Z5 4)~[~}JW=$Yu.XX~] }KDX`PXdZ4XfYpTJLY[F5]X~[2Yp}U+DZJ::<446[m@~]#3}]1~]%}^LZwZQ5Z`/OT<Yh^ -~]&}jx[ ~m<z!%2+~ly4VY-~o>}p62yz!%2+Xf2+~ly4VY-zQ`z (=] 2z~o2",C={" ":0,"!":1},c=34,i=2,p,s="",u=String.fromCharCode,t=u(12539);for(;++c<127;)C[u(c)]=c^39&&c^92?i++:0;i=0;for(;0<=(c=C[a.charAt(i++)]);)if(16===c)if((c=C[a.charAt(i++)])<87){if(86===c)c=1879;for(;c--;)s+=u(++p)}else s+=s.substr(8272,360);else if(c<86)s+=u(p+=c<51?c-16:(c-55)*92+C[a.charAt(i++)]);else if((c=((c-86)*92+C[a.charAt(i++)])*92+C[a.charAt(i++)])<49152)s+=u(p=c<40960?c:c|57344);else{c&=511;for(;c--;)s+=t;p=12539}return s')();

		let soundFormats = [
			"Uncompressed native-endian", "ADPCM", "MP3", "Uncompressed little-endian",
			"NellyMoser 16 kHz", "NellyMoser 8 kHz", "NellyMoser 22.050 kHz", "?",
			"?", "?", "?", "Speex",
			"?", "?", "?", "x-aiff"
		];
		// first four : mp3, last three : nellymoser
		let soundRates = [5512, 11025, 22050, 44100, 16000, 8000, 22050];
		let soundSizes = ["8bit", "16bit"];
		let soundTypes = ["mono", "stereo"];

		/**
		   convert APCPM to WAV
		   conversion to javascript from jexs compiler :
		   SWFInputStream.java, SWFOutputStream.java, AdpcmDecoder.java and SWF.java
		 */

		/**
		 * @constructor
		 */
		let AdpcmState = function() {
			this.index = 0;
			this.sample = 0;
		};

		/**
		 * @constructor
		 */
		let AdpcmInput = function(data) {
			this.data = data;
			this.bitPos = 0;
			this.tempByte = 0;
			this.length = this.data.length;
			this.offset = 0;
		};

		AdpcmInput.prototype.readUB = function(nBits) {
			if (nBits == 0) {
				return 0;
			}
			let ret = this.readUBInternal(nBits);
			return ret;
		};

		AdpcmInput.prototype.readSB = function(nBits) {
			if (nBits == 0) {
				return 0;
			}
			let ret = this.readSBInternal(nBits);
			return ret;
		};
/*jshint bitwise: false*/
		AdpcmInput.prototype.readSBInternal = function(nBits) {
			let uval = this.readUBInternal(nBits);

			let shift = 32 - nBits;
			// sign extension
			uval = (uval << shift) >> shift;
			return uval;
		};

		AdpcmInput.prototype.readUBInternal = function(nBits) {
			if (nBits == 0) {
				return 0;
			}
			let ret = 0;
			if (this.bitPos == 0) {
				this.tempByte = this.readNoBitReset();
			}
			for (let bit = 0; bit < nBits; bit++) {
				let nb = (this.tempByte >> (7 - this.bitPos)) & 1;
				ret += (nb << (nBits - 1 - bit));
				this.bitPos++;
				if (this.bitPos == 8) {
					this.bitPos = 0;
					if (bit != nBits - 1) {
						this.tempByte = this.readNoBitReset();
					}
				}
			}
			return ret;
		};

		AdpcmInput.prototype.readNoBitReset = function() {
			let r;
			if (this.offset < this.length) {
				r = this.data[this.offset];
				this.offset++;
			} else r = -1;
			if (r == -1) {
				console.log('EndOfStreamException');
				throw new Error('EndOfStreamException');
			}
			return r;
		};

		AdpcmInput.prototype.available = function() {
			return (this.length - this.offset);
		};

		AdpcmInput.prototype.availableBits = function() {
			if (this.bitPos > 0) {
				return this.available() * 8 + (8 - this.bitPos);
			}
			return this.available() * 8;
		};

		/**
		 * @constructor
		 */
		let AdpcmOutput = function() {
			this.indexAdjustTable2bit = [
				-1, 2,
				-1, 2
			];
			this.indexAdjustTable3bit = [
				-1, -1, 2, 4,
				-1, -1, 2, 4
			];
			this.indexAdjustTable4bit = [
				-1, -1, -1, -1, 2, 4, 6, 8,
				-1, -1, -1, -1, 2, 4, 6, 8
			];
			this.indexAdjustTable5bit = [
				-1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 4, 6, 8, 10, 13, 16,
				-1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 4, 6, 8, 10, 13, 16
			];
			this.stepSizeTable = [
				7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34,
				37, 41, 45, 50, 55, 60, 66, 73, 80, 88, 97, 107, 118, 130, 143,
				157, 173, 190, 209, 230, 253, 279, 307, 337, 371, 408, 449, 494,
				544, 598, 658, 724, 796, 876, 963, 1060, 1166, 1282, 1411, 1552,
				1707, 1878, 2066, 2272, 2499, 2749, 3024, 3327, 3660, 4026,
				4428, 4871, 5358, 5894, 6484, 7132, 7845, 8630, 9493, 10442,
				11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623,
				27086, 29794, 32767
			];
		};

		AdpcmOutput.prototype.decode2bit = function(deltaCode, state) {
			//		assert (deltaCode == (deltaCode & 3));

			let step = this.stepSizeTable[state.index];

			let difference = step >> 1;
			if ((deltaCode & 1) == 1) {
				difference += step;
			}
			if ((deltaCode & 2) == 2) {
				difference = -difference;
			}

			state.sample += difference;
			if (state.sample > 32767) {
				state.sample = 32767;
			} else if (state.sample < -32768) {
				state.sample = -32768;
			}

			state.index += this.indexAdjustTable2bit[deltaCode];
			if (state.index < 0) {
				state.index = 0;
			} else if (state.index > 88) {
				state.index = 88;
			}

			return state.sample;
		};

		AdpcmOutput.prototype.decode3bit = function(deltaCode, state) {
			//		assert (deltaCode == (deltaCode & 7));

			let step = this.stepSizeTable[state.index];

			let difference = step >> 2;
			if ((deltaCode & 1) == 1) {
				difference += step >> 1;
			}
			if ((deltaCode & 2) == 2) {
				difference += step;
			}
			if ((deltaCode & 4) == 4) {
				difference = -difference;
			}

			state.sample += difference;
			if (state.sample > 32767) {
				state.sample = 32767;
			} else if (state.sample < -32768) {
				state.sample = -32768;
			}

			state.index += this.indexAdjustTable3bit[deltaCode];
			if (state.index < 0) {
				state.index = 0;
			} else if (state.index > 88) {
				state.index = 88;
			}

			return state.sample;
		};

		AdpcmOutput.prototype.decode4bit = function(deltaCode, state) {
			//		assert (deltaCode == (deltaCode & 15));

			let step = this.stepSizeTable[state.index];

			let difference = step >> 3;
			if ((deltaCode & 1) == 1) {
				difference += step >> 2;
			}
			if ((deltaCode & 2) == 2) {
				difference += step >> 1;
			}
			if ((deltaCode & 4) == 4) {
				difference += step;
			}
			if ((deltaCode & 8) == 8) {
				difference = -difference;
			}

			state.sample += difference;
			if (state.sample > 32767) {
				state.sample = 32767;
			} else if (state.sample < -32768) {
				state.sample = -32768;
			}

			state.index += this.indexAdjustTable4bit[deltaCode];
			if (state.index < 0) {
				state.index = 0;
			} else if (state.index > 88) {
				state.index = 88;
			}

			return state.sample;
		};

		AdpcmOutput.prototype.decode5bit = function(deltaCode, state) {
			//		assert (deltaCode >= 0);
			//		assert (deltaCode <= 31 /* 2#11111 */);

			let step = this.stepSizeTable[state.index];

			let difference = step >> 4;
			if ((deltaCode & 1) == 1) {
				difference += step >> 3;
			}
			if ((deltaCode & 2) == 2) {
				difference += step >> 2;
			}
			if ((deltaCode & 4) == 4) {
				difference += step >> 1;
			}
			if ((deltaCode & 8) == 8) {
				difference += step;
			}
			if ((deltaCode & 16) == 16) {
				difference = -difference;
			}

			state.sample += difference;
			if (state.sample > 32767) {
				state.sample = 32767;
			} else if (state.sample < -32768) {
				state.sample = -32768;
			}

			state.index += this.indexAdjustTable5bit[deltaCode];
			if (state.index < 0) {
				state.index = 0;
			} else if (state.index > 88) {
				state.index = 88;
			}

			return state.sample;
		};

		AdpcmOutput.prototype.decode = function(soundType, soundSize, soundRate, input) {
			// SWF SoundType Number of channels in the sound data. 0 = sndMono; 1 = sndStereo
			// SWF SoundSize The sample size of the sound data. 0 = 8bit, 1 = 16bit
			// SWF SoundRate The sampling rate of the sound data: 0 = 5.5 kHz; 1 = 11 kHz; 2 = 22 kHz; 3 = 44 kHz
			try {
				let sis = new AdpcmInput(input);
				let pcmOutput = new PcmOutput(soundType, soundSize, soundRate, []);
				let adpcm_code_size = sis.readUB(2);
				let bits_per_code = adpcm_code_size + 2;
				do {
					if (soundType == 1) { // stereo
						let initialSampleLeft = sis.readSB(16);
						let initialIndexLeft = sis.readUB(6);
						let initialSampleRight = sis.readSB(16);
						let initialIndexRight = sis.readUB(6);
						let stateLeft = new AdpcmState();
						stateLeft.index = initialIndexLeft;
						stateLeft.sample = initialSampleLeft;
						let stateRight = new AdpcmState();
						stateRight.index = initialIndexRight;
						stateRight.sample = initialSampleRight;
						for (let i = 1;
							(i <= 4095) && (sis.availableBits() >= bits_per_code * 2); i++) {
							let codeLeft = sis.readUB(bits_per_code);
							let codeRight = sis.readUB(bits_per_code);
							let valLeft = 0;
							let valRight = 0;
							switch (bits_per_code) {
								case 2:
									valLeft = this.decode2bit(codeLeft, stateLeft);
									valRight = this.decode2bit(codeRight, stateRight);
									break;
								case 3:
									valLeft = this.decode3bit(codeLeft, stateLeft);
									valRight = this.decode3bit(codeRight, stateRight);
									break;
								case 4:
									valLeft = this.decode4bit(codeLeft, stateLeft);
									valRight = this.decode4bit(codeRight, stateRight);
									break;
								case 5:
									valLeft = this.decode5bit(codeLeft, stateLeft);
									valRight = this.decode5bit(codeRight, stateRight);
									break;
							}
							pcmOutput.writeSI16(valLeft);
							pcmOutput.writeSI16(valRight);
						}
					} else {
						let initialSample = sis.readSB(16);
						let initialIndex = sis.readUB(6);
						let state = new AdpcmState();
						state.index = initialIndex;
						state.sample = initialSample;
						for (let p = 1;
							(p <= 4095) && (sis.availableBits() >= bits_per_code); p++) {
							let code = sis.readUB(bits_per_code);
							let val = 0;
							switch (bits_per_code) {
								case 2:
									val = this.decode2bit(code, state);
									break;
								case 3:
									val = this.decode3bit(code, state);
									break;
								case 4:
									val = this.decode4bit(code, state);
									break;
								case 5:
									val = this.decode5bit(code, state);
									break;
							}
							pcmOutput.writeSI16(val);
						}
					}
				} while (sis.available() > 0);
				return pcmOutput.data;
			} catch (eos) {
				window.alert("Exception : " + eos);
				return null;
			}
		};

		AdpcmOutput.prototype.convertADPCMtoWave = function(isSoundStream, soundType, soundSize, soundRate, input) {
			let sos = new AdpcmOutput();
			let data = [];
			if (isSoundStream) {
				for (let i = 0; i < input.length; i++) {
					data = data.concat(sos.decode(soundType, soundSize, soundRate, input[i]));
				}
			} else {
				data = sos.decode(soundType, soundSize, soundRate, input);
			}
			let pcmOutput = new PcmOutput(soundType, soundSize, soundRate, data);
			return pcmOutput.createWave();

		};

		/**
		 * @constructor
		 */
		let PcmOutput = function(soundType, soundSize, soundRate, data) {
			this.data = data;
			this.soundType = soundType; // 0 : mono, 1 : stereo
			this.soundSize = soundSize; // 0 : 8 bits, 1 : 16 bits
			this.soundRate = soundRate; // 0..6 : 5512, 11025, 22050, 44100, 16000, 8000, 22050 Hz
		};

		PcmOutput.prototype.writeSI16 = function(value) {
			if (value > 0x7fff) {
				//Logger.getLogger(SWFOutputStream.class.getName()).log(Level.WARNING, "Value is too large for SI16: " + value + ", 0 written", new Exception());
				console.log("WARNING, Value is too large for SI16: " + value);
				value = 0;
			}
			value = value > 32768 ? value - 65536 : value;

			this.writeUI16(value);
		};

		PcmOutput.prototype.writeUI16 = function(value) {
			if (value > 0xffff) {
				throw new Error("WARNING, Value is too large for UI16: " + value);
			}
			this.data.push((value & 0xff));
			this.data.push(((value >> 8) & 0xff));
		};

		PcmOutput.prototype.convertString = function(s) {
			let result = [];
			for (let i = 0; i < s.length; i++) result[i] = s.charCodeAt(i);
			return result;
		};

		PcmOutput.prototype.convert2LE = function(value, size) {
			let bytes = [];
			for (let i = 0; i < size; i++) {
				bytes[i] = value & 0xff;
				value >>= 8;
			}
			return bytes;
		};

		PcmOutput.prototype.createWave = function() {
			let subChunk1Data = [];
			let audioFormat = 1; //PCM
			subChunk1Data = this.convert2LE(audioFormat, 2);
			// SWF SoundType Number of channels in the streaming sound data. 0 = sndMono; 1 = sndStereo
			let numChannels = this.soundType == 1 ? 2 : 1;
			subChunk1Data = subChunk1Data.concat(this.convert2LE(numChannels, 2));
			// SWF SoundRate The sampling rate of the streaming sound data: 0 = 5.5 kHz; 1 = 11 kHz; 2 = 22 kHz; 3 = 44 kHz
			let sampleRate = soundRates[this.soundRate];
			subChunk1Data = subChunk1Data.concat(this.convert2LE(sampleRate, 4));
			// SWF StreamSoundSize The sample size of the streaming sound data. 0 : 8 bit, 1 : 16 bit.
			let bitsPerSample = this.soundSize ? 16 : 8;
			let byteRate = sampleRate * numChannels * bitsPerSample / 8;
			subChunk1Data = subChunk1Data.concat(this.convert2LE(byteRate, 4));
			let blockAlign = numChannels * bitsPerSample / 8;
			subChunk1Data = subChunk1Data.concat(this.convert2LE(blockAlign, 2));
			subChunk1Data = subChunk1Data.concat(this.convert2LE(bitsPerSample, 2));

			let chunks = [];
			chunks = this.convertString("fmt ");
			chunks = chunks.concat(this.convert2LE(subChunk1Data.length, 4));
			chunks = chunks.concat(subChunk1Data);
			chunks = chunks.concat(this.convertString("data"));
			let data;
			if (this.data.constructor === Uint8Array) {
				data = Array.from(this.data);
			} else data = this.data;
			chunks = chunks.concat(this.convert2LE(data.length, 4));
			chunks = chunks.concat(data);

			let result = [];
			result = this.convertString("RIFF");
			result = result.concat(this.convert2LE(4 + chunks.length, 4));
			result = result.concat(this.convertString("WAVE"));
			result = result.concat(chunks);
			return result;
		};

		/**
			convert NellyMoser to WAV
			conversion to javascript from jpexs compiler :
			SWFInputStream.java, SWFOutputStream.java, NellyMoserDecoder.java, CodecImpl.java and SWF.java
			https://github.com/jindrapetrik/jpexs-decompiler
		 */
		let bandBound = [
			0, 2, 4, 6,
			8, 10, 12, 14,
			16, 18, 21, 24,
			28, 32, 37, 43,
			49, 56, 64, 73,
			83, 95, 109, 124
		];

		let gainBit = [
			6, 5, 5, 5, 5, 5, 5, 5,
			5, 5, 5, 5, 5, 5, 5, 5,
			5, 5, 5, 5, 5, 5, 5, 0,
			0, 0, 0, 0, 0, 0, 0, 0
		];

		let table1 = [
			3134, 5342, 6870, 7792,
			8569, 9185, 9744, 10191,
			10631, 11061, 11434, 11770,
			12116, 12513, 12925, 13300,
			13674, 14027, 14352, 14716,
			15117, 15477, 15824, 16157,
			16513, 16804, 17090, 17401,
			17679, 17948, 18238, 18520,
			18764, 19078, 19381, 19640,
			19921, 20205, 20500, 20813,
			21162, 21465, 21794, 22137,
			22453, 22756, 23067, 23350,
			23636, 23926, 24227, 24521,
			24819, 25107, 25414, 25730,
			26120, 26497, 26895, 27344,
			27877, 28463, 29426, 31355
		];

		let table2 = [
			-11725, -9420, -7910, -6801,
			-5948, -5233, -4599, -4039,
			-3507, -3030, -2596, -2170,
			-1774, -1383, -1016, -660,
			-329, -1, 337, 696,
			1085, 1512, 1962, 2433,
			2968, 3569, 4314, 5279,
			6622, 8154, 10076, 12975
		];

		let table3 = [
			0.0, -0.847256005, 0.722470999, -1.52474797,
			-0.453148007, 0.375360996, 1.47178996, -1.98225796,
			-1.19293797, -0.582937002, -0.0693780035, 0.390956998,
			0.906920016, 1.486274, 2.22154093, -2.38878703,
			-1.80675399, -1.41054201, -1.07736099, -0.799501002,
			-0.555810988, -0.333402008, -0.132449001, 0.0568020009,
			0.254877001, 0.477355003, 0.738685012, 1.04430604,
			1.39544594, 1.80987501, 2.39187598, -2.38938308,
			-1.98846805, -1.75140405, -1.56431198, -1.39221299,
			-1.216465, -1.04694998, -0.890510023, -0.764558017,
			-0.645457983, -0.52592802, -0.405954987, -0.302971989,
			-0.209690005, -0.123986997, -0.0479229987, 0.025773,
			0.100134, 0.173718005, 0.258554012, 0.352290004,
			0.456988007, 0.576775014, 0.700316012, 0.842552006,
			1.00938797, 1.18213499, 1.35345602, 1.53208196,
			1.73326194, 1.97223496, 2.39781404, -2.5756309,
			-2.05733204, -1.89849198, -1.77278101, -1.66626,
			-1.57421803, -1.49933195, -1.43166399, -1.36522806,
			-1.30009902, -1.22809303, -1.15885794, -1.09212506,
			-1.013574, -0.920284986, -0.828705013, -0.737488985,
			-0.644775987, -0.559094012, -0.485713989, -0.411031991,
			-0.345970005, -0.285115987, -0.234162003, -0.187058002,
			-0.144250005, -0.110716999, -0.0739680007, -0.0365610011,
			-0.00732900016, 0.0203610007, 0.0479039997, 0.0751969963,
			0.0980999991, 0.122038998, 0.145899996, 0.169434994,
			0.197045997, 0.225243002, 0.255686998, 0.287010014,
			0.319709986, 0.352582991, 0.388906986, 0.433492005,
			0.476945996, 0.520482004, 0.564453006, 0.612204015,
			0.668592989, 0.734165013, 0.803215981, 0.878404021,
			0.956620991, 1.03970695, 1.12937701, 1.22111595,
			1.30802798, 1.40248001, 1.50568199, 1.62277305,
			1.77249599, 1.94308805, 2.29039311, 0.0
		];

		/**
		 * Lookup table.
		 * <pre>
		 * for (int i = 0; i < 64; ++i) {
		 *	 table4[i] = Math.cos((i + 0.25) / 64 * (Math.PI / 2));
		 * }
		 * </pre>
		 */
		let table4 = [
			0.999981225, 0.999529421, 0.998475611, 0.996820271,
			0.994564593, 0.991709828, 0.988257587, 0.984210074,
			0.979569793, 0.974339426, 0.968522072, 0.962121427,
			0.955141187, 0.947585583, 0.939459205, 0.930767,
			0.921513975, 0.911705971, 0.901348829, 0.890448689,
			0.879012227, 0.867046177, 0.854557991, 0.841554999,
			0.828045011, 0.81403631, 0.799537301, 0.784556627,
			0.769103289, 0.753186822, 0.736816585, 0.720002472,
			0.702754676, 0.685083687, 0.666999876, 0.64851439,
			0.629638195, 0.610382795, 0.590759695, 0.570780694,
			0.550458014, 0.529803574, 0.50883007, 0.487550199,
			0.465976506, 0.444122106, 0.422000289, 0.399624199,
			0.377007395, 0.354163498, 0.331106305, 0.307849586,
			0.284407496, 0.260794103, 0.237023607, 0.213110298,
			0.189068705, 0.164913103, 0.1406582, 0.116318598,
			0.0919089988, 0.0674438998, 0.0429382995, 0.0184067003
		];

		/**
		 * Lookup table.
		 * <pre>
		 * for (int i = 0; i < 64; ++i) {
		 *	 table5[i] = Math.cos(i / 64.0 * (Math.PI / 2)) * Math.sqrt(2.0 / 128);
		 * }
		 * </pre>
		 */
		let table5 = [
			0.125, 0.124962397, 0.124849401, 0.124661297,
			0.124398097, 0.124059901, 0.123647101, 0.123159699,
			0.122598201, 0.121962801, 0.1212539, 0.120471999,
			0.119617499, 0.118690997, 0.117693, 0.116624102,
			0.115484901, 0.114276201, 0.112998702, 0.111653,
			0.110240199, 0.108760901, 0.107216097, 0.105606697,
			0.103933699, 0.102198102, 0.100400902, 0.0985433012,
			0.0966262966, 0.094651103, 0.0926188976, 0.0905309021,
			0.0883883014, 0.0861926004, 0.0839449018, 0.0816465989,
			0.0792991966, 0.076903902, 0.0744623989, 0.0719759986,
			0.069446303, 0.0668746978, 0.0642627999, 0.0616123006,
			0.0589246005, 0.0562013984, 0.0534444004, 0.0506552011,
			0.0478353985, 0.0449868999, 0.0421111993, 0.0392102003,
			0.0362856016, 0.0333391018, 0.0303725004, 0.0273876991,
			0.0243862998, 0.0213702004, 0.0183412991, 0.0153013002,
			0.0122520998, 0.0091955997, 0.00613350002, 0.00306769996
		];

		/**
		 * Lookup table.
		 * <pre>
		 * for (int i = 0; i < 64; ++i) {
		 *	 table6[i] = -Math.sin((i + 0.25) / 64 * (Math.PI / 2));
		 * }
		 * </pre>
		 */
		let table6 = [
			-0.00613590004, -0.0306748003, -0.0551952012, -0.0796824023,
			-0.104121603, -0.128498107, -0.152797207, -0.177004203,
			-0.201104596, -0.225083902, -0.248927593, -0.272621393,
			-0.296150893, -0.319501996, -0.342660695, -0.365613014,
			-0.388345003, -0.410843194, -0.433093786, -0.455083609,
			-0.47679919, -0.498227686, -0.519356012, -0.540171504,
			-0.560661614, -0.580814004, -0.600616515, -0.620057225,
			-0.639124393, -0.657806695, -0.676092684, -0.693971515,
			-0.711432219, -0.728464425, -0.745057821, -0.761202395,
			-0.77688849, -0.792106628, -0.806847572, -0.8211025,
			-0.834862888, -0.848120272, -0.860866904, -0.873094976,
			-0.884797096, -0.895966172, -0.906595707, -0.916679084,
			-0.926210225, -0.935183525, -0.943593502, -0.95143503,
			-0.958703518, -0.965394378, -0.971503913, -0.977028072,
			-0.981963873, -0.986308098, -0.990058184, -0.993211925,
			-0.995767415, -0.997723103, -0.999077678, -0.999830604
		];

		/**
		 * Lookup table.
		 * <pre>
		 * for (int i = 0; i < 128; ++i) {
		 *	 table7[i] = Math.sin((i + 0.5) / 128 * (Math.PI / 2));
		 * }
		 * </pre>
		 */
		let table7 = [
			0.00613590004, 0.0184067003, 0.0306748003, 0.0429382995,
			0.0551952012, 0.0674438998, 0.0796824023, 0.0919089988,
			0.104121603, 0.116318598, 0.128498107, 0.1406582,
			0.152797207, 0.164913103, 0.177004203, 0.189068705,
			0.201104596, 0.213110298, 0.225083902, 0.237023607,
			0.248927593, 0.260794103, 0.272621393, 0.284407496,
			0.296150893, 0.307849586, 0.319501996, 0.331106305,
			0.342660695, 0.354163498, 0.365613014, 0.377007395,
			0.388345003, 0.399624199, 0.410843194, 0.422000289,
			0.433093786, 0.444122106, 0.455083609, 0.465976506,
			0.47679919, 0.487550199, 0.498227686, 0.50883007,
			0.519356012, 0.529803574, 0.540171504, 0.550458014,
			0.560661614, 0.570780694, 0.580814004, 0.590759695,
			0.600616515, 0.610382795, 0.620057225, 0.629638195,
			0.639124393, 0.64851439, 0.657806695, 0.666999876,
			0.676092684, 0.685083687, 0.693971515, 0.702754676,
			0.711432219, 0.720002472, 0.728464425, 0.736816585,
			0.745057821, 0.753186822, 0.761202395, 0.769103289,
			0.77688849, 0.784556627, 0.792106628, 0.799537301,
			0.806847572, 0.81403631, 0.8211025, 0.828045011,
			0.834862888, 0.841554999, 0.848120272, 0.854557991,
			0.860866904, 0.867046177, 0.873094976, 0.879012227,
			0.884797096, 0.890448689, 0.895966172, 0.901348829,
			0.906595707, 0.911705971, 0.916679084, 0.921513975,
			0.926210225, 0.930767, 0.935183525, 0.939459205,
			0.943593502, 0.947585583, 0.95143503, 0.955141187,
			0.958703518, 0.962121427, 0.965394378, 0.968522072,
			0.971503913, 0.974339426, 0.977028072, 0.979569793,
			0.981963873, 0.984210074, 0.986308098, 0.988257587,
			0.990058184, 0.991709828, 0.993211925, 0.994564593,
			0.995767415, 0.996820271, 0.997723103, 0.998475611,
			0.999077678, 0.999529421, 0.999830604, 0.999981225
		];

		let table9 = [
			32767, 30840, 29127, 27594, 26214, 24966, 23831, 22795,
			21845, 20972, 20165, 19418, 18725, 18079, 17476, 16913,
			16384, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0
		];

		/**
		 * Lookup table.
		 * <pre>
		 * for (int i = 0; i <= 128; ++i) {
		 *	 table10[i] = Math.sin((i / 128.0) * (Math.PI / 2));
		 * }
		 * </pre>
		 */
		let table10 = [
			0.0, 0.0122715384, 0.024541229, 0.0368072242,
			0.0490676723, 0.061320737, 0.0735645667, 0.0857973099,
			0.0980171412, 0.110222213, 0.122410677, 0.134580716,
			0.146730468, 0.158858135, 0.170961887, 0.183039889,
			0.195090324, 0.207111374, 0.219101235, 0.231058106,
			0.242980182, 0.254865646, 0.266712755, 0.27851969,
			0.290284693, 0.302005947, 0.313681751, 0.32531029,
			0.336889863, 0.348418683, 0.359895051, 0.371317178,
			0.382683426, 0.393992037, 0.405241311, 0.416429549,
			0.427555084, 0.438616246, 0.449611336, 0.460538715,
			0.471396744, 0.482183784, 0.492898196, 0.50353837,
			0.514102757, 0.524589658, 0.534997642, 0.545324981,
			0.555570245, 0.565731823, 0.575808167, 0.585797846,
			0.59569931, 0.605511069, 0.615231574, 0.624859512,
			0.634393275, 0.643831551, 0.653172851, 0.662415802,
			0.671558976, 0.680601001, 0.689540565, 0.698376238,
			0.707106769, 0.715730846, 0.724247098, 0.732654274,
			0.740951121, 0.749136388, 0.757208824, 0.765167296,
			0.773010433, 0.780737221, 0.78834641, 0.795836926,
			0.803207517, 0.81045723, 0.817584813, 0.824589312,
			0.831469595, 0.838224709, 0.84485358, 0.851355195,
			0.857728601, 0.863972843, 0.870086968, 0.876070082,
			0.881921232, 0.887639642, 0.893224299, 0.898674488,
			0.903989315, 0.909168005, 0.914209783, 0.919113874,
			0.923879504, 0.928506076, 0.932992816, 0.937339008,
			0.941544056, 0.945607305, 0.949528158, 0.953306019,
			0.956940353, 0.960430503, 0.963776052, 0.966976464,
			0.970031261, 0.972939968, 0.975702107, 0.97831738,
			0.980785251, 0.983105481, 0.985277653, 0.987301409,
			0.989176512, 0.990902662, 0.992479503, 0.993906975,
			0.99518472, 0.996312618, 0.997290432, 0.998118103,
			0.99879545, 0.999322355, 0.999698818, 0.999924719,
			1.0
		];

		/**
		   convert NellyMoser to WAV
		   conversion to javascript from jexs compiler :
		   CodecImpl.java
		 */

		/**
		 * @constructor
		 */
		let NellyMoserBitStream = function() {
			this.byteOffset = 0;
			this.bitOffset = 0;
		};

		NellyMoserBitStream.prototype.push = function(val, len, buf) {
			if (this.bitOffset == 0) {
				buf[this.byteOffset] = val;
			} else {
				buf[this.byteOffset] |= (val << this.bitOffset);
			}
			this.bitOffset += len;
			if (this.bitOffset >= 8) {
				++this.byteOffset;
				this.bitOffset -= 8;
				if (this.bitOffset > 0) {
					buf[this.byteOffset] = (val >> (len - this.bitOffset));
				}
			}
		};

		NellyMoserBitStream.prototype.pop = function(len, buf) {
			let val = (buf[this.byteOffset] & 0xff) >> this.bitOffset;
			let bits_read = 8 - this.bitOffset;

			if (len >= bits_read) {
				++this.byteOffset;
				if (len > bits_read) {
					val |= buf[this.byteOffset] << bits_read;
				}
			}

			this.bitOffset = (this.bitOffset + len) & 7;
			return val & ((1 << len) - 1);
		};

		/**
		 * @constructor
		 */
/* xxx jshint expr:true*/
		let NellyMoserNormalizedInt32 = function(val) {
			this.value = 0;
			this.scale = 0;

			if (val == 0) {
				this.value = val;
				this.scale = 31;
				return;
			} else if (val >= (1 << 30)) {
				this.value = 0;
				this.scale = 0;
				return;
			}

			let v = val;
			let s = 0;

			if (v > 0) {
				do {
					v <<= 1;
					++s;
				} while (v < (1 << 30));
			} else {
				let floor = 1 << 31; // lowest possible 32bit value
				do {
					v <<= 1;
					++s;
				} while (v > floor + (1 << 30));
			}

			this.value = v;
			this.scale = s;
		};

		let NellyMoserFactor = function(val) {
			this.value = 0;
			this.shift = 0;

			if (val == 124) {
				// Common case optimization.
				this.value = 4228;
				this.shift = 19;
				return;
			} else if (val == 0) {
				this.value = 0;
				this.shift = 0;
				return;
			}

			let sign = ((~val >>> 31) << 1) - 1;

			let abs = val * sign;

			let scale = -1;
			while ((abs & (1 << 15)) == 0) {
				abs <<= 1;
				++scale;
			}
			abs >>= 1;

			this.shift = 27 - scale;

			let table_val = table9[(abs - 0x3e00) >> 10];
			let tmp = abs * table_val;
			tmp = (1 << 30) - tmp;
			tmp += (1 << 14);
			tmp >>= 15;
			tmp *= table_val;
			tmp += (1 << 14);
			tmp >>= 15;
			let tmp2 = tmp;
			tmp *= abs;
			tmp = (1 << 29) - tmp;
			tmp += (1 << 14);
			tmp >>= 15;
			tmp *= tmp2;
			tmp += (1 << 13);
			tmp >>= 14;
			tmp *= sign;

			if (tmp > 32767 && sign == 1) {
				tmp = 32767;
			} else if (tmp < -32768 && sign == -1) {
				tmp = -32768;
			}

			this.value = tmp;
		};
/*  xxx jshint expr:true*/

		let NellyMoser = function() {};

		NellyMoser.prototype.decode = function(state, input, output) {
			let bs = new NellyMoserBitStream(input);

			let unpacked_input = new Array(124);
			let var_808 = new Array(128);
			let var_608 = new Array(124);
			let var_418 = new Array(124);
			let unpacked_byte = bs.pop(gainBit[0], input);
			unpacked_input[0] = unpacked_byte;
			var_808[0] = table1[unpacked_byte];

			for (let i = 1; i < 23; ++i) {
				unpacked_byte = bs.pop(gainBit[i], input);
				unpacked_input[i] = unpacked_byte;
				var_808[i] = var_808[i - 1] + table2[unpacked_byte];
			}

			for (let i = 0; i < 23; ++i) {
				let pow = Math.fround(Math.pow(
					2.0, var_808[i] * (0.5 * 0.0009765625)
				));

				let bound = bandBound[i];
				let next_bound = bandBound[i + 1];
				for (; bound < next_bound; ++bound) {
					var_418[bound] = var_808[i];
					var_608[bound] = pow;
				}
			}

			let packed_byte_sizes = new Array(124);
			let leftover = this.wc(var_418, 124, 198, packed_byte_sizes);

			for (let out_off = 0; out_off < 256; out_off += 128) {
				for (let i = 0; i < 124; ++i) {
					let packed_size = packed_byte_sizes[i];
					let val = var_608[i];
					if (packed_size > 0) {
						let pow2 = 1 << packed_size;
						unpacked_byte = bs.pop(packed_size, input);
						unpacked_input[i] = unpacked_byte;
						val *= table3[pow2 - 1 + unpacked_byte];
					} else {
						let rnd_u32 = Math.random() * 4294967296.0;
						if (rnd_u32 < (1 << 30) + (1 << 14)) {
							val *= -0.707099974;
						} else {
							val *= 0.707099974;
						}
					}
					var_808[i] = val;
				}

				for (let i = 124; i < 128; ++i) {
					var_808[i] = 0;
				}

				for (let i = leftover; i > 0; i -= 8) {
					if (i > 8) {
						bs.pop(8, input);
					} else {
						bs.pop(i, input);
						break;
					}
				}

				this.iTransfm(state, var_808, 7, output, out_off);
			}
		};

		NellyMoser.prototype.iTransfm = function(state, input, len_log2, output, out_off) {

			let len = 1 << len_log2;
			let quarter_len = len >> 2;
			let y = len - 1;
			let x = len >> 1;
			let j = x - 1;
			let i = 0;

			/*
			i-->	  <--j
			----------------------------
						  x-->	  <--y

			i, j, x, y are indexes into table7.
			table7 is defined as follows:
			for (int i = 0; i < 128; ++i) {
				table7[i] = Math.sin((i + 0.5) / 128 * (Math.PI / 2));
			}
			*/

			this.auxceps(input, 0, len_log2, output, out_off);

			for (; i < quarter_len; ++i, --j, ++x, --y) {
				let state_i = state[i];
				let state_j = state[j];
				let out_x = output[out_off + x];
				let out_y = output[out_off + y];

				state[i] = -output[out_off + j];
				state[j] = -output[out_off + i];

				output[out_off + i] = Math.fround((state_i * table7[y] + out_x * table7[i]));
				output[out_off + j] = Math.fround((state_j * table7[x] + out_y * table7[j]));

				output[out_off + x] = Math.fround((table7[x] * -out_y + table7[j] * state_j));
				output[out_off + y] = Math.fround((table7[y] * -out_x + table7[i] * state_i));
			}
		};

		NellyMoser.prototype.auxceps = function(input, in_off, len_log2, output, out_off) {

			let len = 1 << len_log2;
			let half_len_m1 = (len >> 1) - 1;
			let quarter_len = len >> 2;

			for (let i = 0; i < quarter_len; ++i) {
				let i2 = i << 1;
				let j = len - 1 - i2;
				let k = j - 1;

				let in_i2 = input[in_off + i2];
				let in_i2_1 = input[in_off + i2 + 1];
				let in_j = input[in_off + j];
				let in_k = input[in_off + k];

				output[out_off + i2] = Math.fround((table4[i] * in_i2 - table6[i] * in_j));
				output[out_off + i2 + 1] = Math.fround((in_j * table4[i] + in_i2 * table6[i]));

				output[out_off + k] = Math.fround((table4[half_len_m1 - i] * in_k - table6[half_len_m1 - i] * in_i2_1));
				output[out_off + j] = Math.fround((in_i2_1 * table4[half_len_m1 - i] + in_k * table6[half_len_m1 - i]));
			}

			this.HarXfm(output, out_off, len_log2 - 1);

			let last_out = output[out_off + len - 1];
			let pre_last_out = output[out_off + len - 2];

			output[out_off] = table5[0] * output[out_off];
			output[out_off + len - 1] = output[out_off + 1] * -table5[0];

			output[out_off + len - 2] = table5[half_len_m1] * output[out_off + len - 2] + table5[1] * last_out;
			output[out_off + 1] = pre_last_out * table5[1] - last_out * table5[half_len_m1];

			let i_out = len - 3;
			let i_tbl = half_len_m1;
			let j = 3;
			for (let i = 1; i < quarter_len; ++i, --i_tbl, i_out -= 2, j += 2) {
				let old_out_a = output[out_off + i_out];
				let old_out_b = output[out_off + i_out - 1];
				let old_out_c = output[out_off + j];
				let old_out_d = output[out_off + j - 1];

				output[out_off + j - 1] = Math.fround((table5[i_tbl] * old_out_c + table5[(j - 1) >> 1] * old_out_d));
				output[out_off + j] = Math.fround((old_out_b * table5[(j + 1) >> 1] - old_out_a * table5[i_tbl - 1]));
				output[out_off + i_out] = Math.fround((old_out_d * table5[i_tbl] - old_out_c * table5[(j - 1) >> 1]));
				output[out_off + i_out - 1] = Math.fround((table5[(j + 1) >> 1] * old_out_a + table5[i_tbl - 1] * old_out_b));
			}
		};

		NellyMoser.prototype.HarXfm = function(data, data_off, half_len_log2) {
			let half_len = 1 << half_len_log2;

			this.HarXfmHelper(data, data_off, half_len);

			let j = 0;
			for (let i = half_len >> 1; i > 0; --i, j += 4) {
				let j0 = data[data_off + j];
				let j1 = data[data_off + j + 1];
				let j2 = data[data_off + j + 2];
				let j3 = data[data_off + j + 3];
				data[data_off + j] = j0 + j2;
				data[data_off + j + 1] = j1 + j3;
				data[data_off + j + 2] = j0 - j2;
				data[data_off + j + 3] = j1 - j3;
			}

			j = 0;
			for (let i = half_len >> 2; i > 0; --i, j += 8) {
				let j0 = data[data_off + j];
				let j1 = data[data_off + j + 1];
				let j2 = data[data_off + j + 2];
				let j3 = data[data_off + j + 3];
				let j4 = data[data_off + j + 4];
				let j5 = data[data_off + j + 5];
				let j6 = data[data_off + j + 6];
				let j7 = data[data_off + j + 7];
				data[data_off + j] = j0 + j4;
				data[data_off + j + 1] = j1 + j5;
				data[data_off + j + 2] = j2 + j7;
				data[data_off + j + 3] = j3 - j6;
				data[data_off + j + 4] = j0 - j4;
				data[data_off + j + 5] = j1 - j5;
				data[data_off + j + 6] = j2 - j7;
				data[data_off + j + 7] = j3 + j6;
			}

			let i = 0;
			let x = half_len >> 3;
			let y = 64;
			let z = 4;
			for (let idx1 = half_len_log2 - 2; idx1 > 0; --idx1, z <<= 1, y >>= 1, x >>= 1) {
				j = 0;
				for (let idx2 = x; idx2 != 0; --idx2, j += z << 1) {
					for (let idx3 = z >> 1; idx3 > 0; --idx3, j += 2, i += y) {
						let k = j + (z << 1);

						let j0 = data[data_off + j];
						let j1 = data[data_off + j + 1];
						let k0 = data[data_off + k];
						let k1 = data[data_off + k + 1];

						data[data_off + k] = Math.fround((j0 - (k0 * table10[128 - i] + k1 * table10[i])));
						data[data_off + j] = Math.fround((j0 + (k0 * table10[128 - i] + k1 * table10[i])));
						data[data_off + k + 1] = Math.fround((j1 + (k0 * table10[i] - k1 * table10[128 - i])));
						data[data_off + j + 1] = Math.fround((j1 - (k0 * table10[i] - k1 * table10[128 - i])));
					}
					for (let idx4 = z >> 1; idx4 > 0; --idx4, j += 2, i -= y) {
						let k = j + (z << 1);

						let j0 = data[data_off + j];
						let j1 = data[data_off + j + 1];
						let k0 = data[data_off + k];
						let k1 = data[data_off + k + 1];

						data[data_off + k] = Math.fround((j0 + (k0 * table10[128 - i] - k1 * table10[i])));
						data[data_off + j] = Math.fround((j0 - (k0 * table10[128 - i] - k1 * table10[i])));
						data[data_off + k + 1] = Math.fround((j1 + (k1 * table10[128 - i] + k0 * table10[i])));
						data[data_off + j + 1] = Math.fround((j1 - (k1 * table10[128 - i] + k0 * table10[i])));
					}
				}
			}
		};

		NellyMoser.prototype.HarXfmHelper = function(data, data_off, half_len) {

			let len = half_len << 1;

			let j = 1;
			for (let i = 1; i < len; i += 2) {
				if (i < j) {
					let tmp1 = data[data_off + i];
					data[data_off + i] = data[data_off + j];
					data[data_off + j] = tmp1;

					let tmp2 = data[data_off + i - 1];
					data[data_off + i - 1] = data[data_off + j - 1];
					data[data_off + j - 1] = tmp2;
				}

				let x = half_len;
				while (x > 1 && x < j) {
					j -= x;
					x >>= 1;
				}
				j += x;
			}
		};

		NellyMoser.prototype.wc = function(input, len, total_bits, packed_sizes) {
			let max_input = 0;
			for (let i = 0; i < len; ++i) {
				if (input[i] > max_input) {
					max_input = input[i];
				}
			}

			let max_input_scale = 0;
			{
				let normalized = new NellyMoserNormalizedInt32(Math.floor(max_input));
				max_input_scale = normalized.scale - 16;
			}

			let scaled_input = new Array(124);

			if (max_input_scale < 0) {
				for (let i = 0; i < len; ++i) {
					scaled_input[i] = (Math.floor(input[i]) >> -max_input_scale);
				}
			} else {
				for (let i = 0; i < len; ++i) {
					scaled_input[i] = (Math.floor(input[i]) << max_input_scale);
				}
			}

			let factor = new NellyMoserFactor(len);

			for (let i = 0; i < len; ++i) {
				scaled_input[i] = ((Math.floor(scaled_input[i]) * 3) >> 2); // *= 0.75
			}

			let scaled_input_sum = 0;
			for (let i = 0; i < len; ++i) {
				scaled_input_sum += scaled_input[i];
			}

			max_input_scale += 11;
			scaled_input_sum -= total_bits << max_input_scale;
			let scaled_input_base = 0; {
				let val = scaled_input_sum - (total_bits << max_input_scale);
				let normalized = new NellyMoserNormalizedInt32(Math.floor(val));
				scaled_input_base = ((val >> 16) * factor.value) >> 15;

				let shift = 31 - factor.shift - normalized.scale;
				if (shift >= 0) {
					scaled_input_base <<= shift;
				} else {
					scaled_input_base >>= -shift;
				}
			}

			let bits_used = this.getD(scaled_input, max_input_scale, len, 6, scaled_input_base);
			if (bits_used != total_bits) {
				let diff = bits_used - total_bits;
				let diff_scale = 0;
				if (diff <= 0) {
					for (; diff >= -16384; diff <<= 1) {
						++diff_scale;
					}
				} else {
					for (; diff < 16384; diff <<= 1) {
						++diff_scale;
					}
				}

				let base_delta = (diff * factor.value) >> 15;
				diff_scale = max_input_scale - (factor.shift + diff_scale - 15);
				if (diff_scale >= 0) {
					base_delta <<= diff_scale;
				} else {
					base_delta >>= -diff_scale;
				}

				let num_revisions = 1;
				let last_bits_used;
				let last_scaled_input_base;
				for (;;) {
					last_bits_used = bits_used;
					last_scaled_input_base = scaled_input_base;
					scaled_input_base += base_delta;
					bits_used = this.getD(scaled_input, max_input_scale, len, 6, scaled_input_base);
					if (++num_revisions > 19) {
						break;
					}
					if ((bits_used - total_bits) * (last_bits_used - total_bits) <= 0) {
						break;
					}

				}

				if (bits_used != total_bits) {
					let scaled_input_base_1;
					let bits_used_1;
					let bits_used_2;
					if (bits_used > total_bits) {
						scaled_input_base_1 = scaled_input_base;
						scaled_input_base = last_scaled_input_base;
						bits_used_1 = bits_used;
						bits_used_2 = last_bits_used;
					} else {
						scaled_input_base_1 = last_scaled_input_base;
						bits_used_1 = last_bits_used;
						bits_used_2 = bits_used;
					}

					while (bits_used != total_bits && num_revisions < 20) {
						let avg = (scaled_input_base + scaled_input_base_1) >> 1;
						bits_used = this.getD(scaled_input, max_input_scale, len, 6, avg);
						++num_revisions;
						if (bits_used > total_bits) {
							scaled_input_base_1 = avg;
							bits_used_1 = bits_used;
						} else {
							scaled_input_base = avg;
							bits_used_2 = bits_used;
						}
					}

					let dev_1 = Math.abs(bits_used_1 - total_bits);
					let dev_2 = Math.abs(bits_used_2 - total_bits);

					if (dev_1 < dev_2) {
						scaled_input_base = scaled_input_base_1;
						bits_used = bits_used_1;
					} else {
						bits_used = bits_used_2;
					}
				}
			}

			for (let i = 0; i < len; ++i) {
				let tmp = Math.floor(scaled_input[i]) - scaled_input_base;
				if (tmp >= 0) {
					tmp = (tmp + (1 << (max_input_scale - 1))) >> max_input_scale;
				} else {
					tmp = 0;
				}
				packed_sizes[i] = Math.min(tmp, 6);
			}

			if (bits_used > total_bits) {
				let i = 0;
				let bit_count = 0;
				for (; bit_count < total_bits; ++i) {
					bit_count += packed_sizes[i];
				}

				bit_count -= packed_sizes[i - 1];
				packed_sizes[i - 1] = total_bits - bit_count;
				bits_used = total_bits;
				for (; i < len; ++i) {
					packed_sizes[i] = 0;
				}
			}

			return total_bits - bits_used;

		};

		NellyMoser.prototype.getD = function(input, scale, len, upper_bound, base) {
			let d = 0;
			if (len <= 0) {
				return d;
			}

			let var_1 = 1 << (scale - 1);

			for (let i = 0; i < len; ++i) {
				let var_2 = input[i] - base;
				if (var_2 < 0) {
					var_2 = 0;
				} else {
					var_2 = (var_2 + var_1) >> scale;
				}
				d += Math.min(var_2, upper_bound);
			}

			return d;
		};

		// jpexs decompiler SWFInputStream.java
		let NellyMoserReader = function(data) {
			this.data = data;
			this.length = this.data.length;
			this.bitpos = 0;
			this.offset = 0;
		};

		NellyMoserReader.prototype.readBytesEx = function(count, name) {
			if (count <= 0) return [];
			return this.readBytesInternalEx(count);
		};

		NellyMoserReader.prototype.readBytesInternalEx = function(count) {
			if (count <= 0) return [];
			this.bitPos = 0;
			let ret = new Array(count);
			this.read(ret);
			if (ret.length != count) {
				throw new Error('End of stream');
			}
			return ret;
		};

		NellyMoserReader.prototype.read = function(bytes) {
			for (let i = 0; i < bytes.length; i++) {
				if (this.offset < this.length) {
					bytes[i] = this.data[this.offset];
					this.offset++;
				} else throw new Error('EndOfStreamException');
			}
		};

		// jpexs decompiler NellyMoserDecoder.java
		const NELLY_BLOCK_LEN = 64;
		const NELLY_BUF_LEN = 128;
		const NELLY_SAMPLES = 2 * NELLY_BUF_LEN;

		let NellyMoserDecoder = function(soundType, soundSize, soundRate, data) {
			this.soundType = soundType;
			this.soundSize = soundSize;
			this.soundRate = soundRate;
			this.data = data;
			this.result = [];
		};

		NellyMoserDecoder.prototype.toWave = function() {
			let sis = new NellyMoserReader(this.data);
			let nellyMoser = new NellyMoser();
			let audioD = new Array(NELLY_SAMPLES);
			let state = new Array(64);
			let blockCount = sis.length / NELLY_BLOCK_LEN;
			for (let j = 0; j < blockCount; j++) {
				let block = sis.readBytesEx(NELLY_BLOCK_LEN, "block");
				nellyMoser.decode(state, block, audioD);
				let audio = new Array(NELLY_SAMPLES);
				for (let i = 0; i < audioD.length; i++) {
					audio[i] = audioD[i] | 0; // convert to short
				}
				let d = new Array(audio.length * 2);
				for (let i = 0; i < audio.length; i++) {
					let s = audio[i];
					d[i * 2] = (s & 0xff);
					d[i * 2 + 1] = ((s >> 8) & 0xff);
				}
				this.result = this.result.concat(d);
			}
			this.soundSize = 2; // 16 bits
			this.soundType = 0; // mono
			let pcmOutput = new PcmOutput(this.soundType, this.soundSize, this.soundRate, this.result);
			return pcmOutput.createWave();
		};

		let AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
		let audioCtx;
		if (typeof AudioContext !== 'undefined') {
			audioCtx = new AudioContext();
		}

		let AudioInstance = function(obj) {
			// webaudio
			this.audioCtx = null;
			this.audioData = null;
			this.audioBuffer = null;
			// webmedia
			this.audioMediaElement = null;
			// webaudio & webmedia
			this.gainNode = null;
			this.panNode = null;
			// webaudio & webmedia & html5 & audio
			this.audio = null;
			this.audioDuration = 0;
			this.currentTime = 0;
			this.currentVolume = 1;
			this.pan = 0;
			this.isPlaying = false;
			this.loadState = "loading";
			// load state requestAnimationFrame
			this.loadRaf = null;
			// play state requestAnimationFrame
			this.playRaf = null;
			this.audioHasLoops = false;
			this.audioLoopCount = 0;
			this.audioLoopCurrent = 0;
			this.audioLoopStart = 0;
			this.audioLoopEnd = 0;
			this.soundEnvelopes = null;
			this.audioPlayStart = 0;
			this.audioPlayOffset = 0;
			this.audioPlayTime = 0;
			this.audioStopFlag = false;
			this.outputLatency = 0;
			this.id = "unknown";

			this.type = "webaudio";
			if (!obj.data || obj.data.length === 0) {
				console.warn("Audio : No data specified.");
				return;
			}
			this.id = obj.id;
			if (obj.type) this.type = obj.type;
			this.mimeType = obj.mimeType;
			this.data = obj.data;
			this.load(obj.mimeType, obj.data);
		};

		AudioInstance.prototype.load = function(mimeType, data) {
			switch (this.type) {
				case "webaudio":
					this.loadWebBufferAudio(mimeType, data);
					break;
				case "webmedia":
					this.loadWebMediaElementAudio(mimeType, data);
					break;
				case "html5":
					this.loadHtml5Audio(mimeType, data);
					break;
				case "audio":
					this.loadAudio(mimeType, data);
					break;
				default:
					console.error("Unsupported type '" + this.type + "'");
					return;
			}
		};

		AudioInstance.prototype.decodeBase64 = function(s) {
			let e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
			let A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			for(i=0;i<64;i++){e[A.charAt(i)]=i;}
			for(x=0;x<L;x++){
				c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
				while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
			}
			return r;
		};

		AudioInstance.prototype.loadWebBufferAudio = function(mimeType, data) {
			let _this = this;
			if (typeof AudioContext !== 'undefined') {
				_this.audioCtx = audioCtx;
			} else {
				console.warn("Warning : webaudio not supported");
				_this.loadHtml5Audio(mimeType, data);
				return;
			}
			let dataView = new Uint8Array(data.length);
			for (let i = 0; i < data.length; ++i) {
				dataView[i] = data[i]; //.charCodeAt(i);
			}
			_this.audioCtx.decodeAudioData(dataView.buffer,
				function(buffer) {
					_this.audioBuffer = buffer;
					_this.audio = _this.audioCtx.createBufferSource();
					_this.audio.buffer = _this.audioBuffer;
					_this.gainNode = _this.audioCtx.createGain();
					_this.audio.connect(_this.gainNode);
					_this.gainNode.connect(_this.audioCtx.destination);
					_this.audioDuration = _this.audio.buffer.duration;
					_this.gainNode.gain.value = _this.currentVolume;
					_this.loadState = "loaded";
				},
				function(err) {
					console.warn("AudioContext.decodeAudioData() " + err);
					console.warn("Fallback to html5 audio");
					_this.loadHtml5Audio(mimeType, data);
					return;
				}
			);
		};

		// Warning gives garbage sound with Safari 11 on Mac Os X 10.11
		AudioInstance.prototype.loadWebMediaElementAudio = function(mimeType, data) {
			if (typeof AudioContext !== 'undefined') {
				this.audioCtx = audioCtx;
			} else {
				console.warn("Warning : webmedia not supported");
				this.loadHtml5Audio(mimeType, data);
				return;
			}
			let swfTag = new SwfTag();
			let url = "data:audio/" + mimeType + ";base64," +swfTag.base64encode(data);
			this.audio = new Audio(url);
			this.audioMediaElement = this.audioCtx.createMediaElementSource(this.audio);
			if (typeof this.audioMediaElement == 'undefined' || this.audioMediaElement == null) {
				this.audio = null;
				console.warn("Warning : webmedia not supported");
				this.loadHtml5Audio(mimeType, data);
				return;
			}
			this.gainNode = this.audioCtx.createGain();
			this.audioMediaElement.connect(this.gainNode);
			this.audioDuration = this.audioMediaElement.duration;

			if (typeof StereoPannerNode !== 'undefined') {
				this.panNode = this.audioCtx.createStereoPanner();
				this.gainNode.connect(this.panNode);
				this.panNode.connect(this.audioCtx.destination);
			} else {
				this.gainNode.connect(this.audioCtx.destination);
			}
			this.gainNode.gain.value = this.currentVolume;
			this.type = "webmedia";
			this.getLoadState(this);
		};

		AudioInstance.prototype.getLoadState = function() {
			let _this = this;
			switch (_this.type) {
				case "webaudio":
					if (_this.audio.readyState == 4 && _this.audio.duration != Infinity && !isNaN(_this.audio.duration)) {
						_this.audioDuration = _this.audio.duration;
						_this.outputLatency = _this.audioCtx.outputLatency ? _this.audioCtx.outputLatency : 0;
						_this.loadState = "loaded";
					} else {
						_this.loadRaf = requestAnimationFrame(function(timeStamp) {
							_this.getLoadState();
						});
					}
					break;
				default:
					if (_this.audio.duration != Infinity && !isNaN(_this.audio.duration)) {
						if (_this.loadRaf) cancelAnimationFrame(_this.loadRaf);
						if (_this.type == "webmedia")
							_this.outputLatency = _this.audioCtx.outputLatency ? _this.audioCtx.outputLatency : 0;
						_this.audioDuration = _this.audio.duration;
						_this.loadState = "loaded";
					} else {
						_this.loadRaf = requestAnimationFrame(function(timeStamp) {
							_this.getLoadState();
						});
					}
					break;
			}
		};

		AudioInstance.prototype.getUrl = function(mimeType, data) {
			let swfTag = new SwfTag();
			return "data:audio/" + mimeType + ";base64," + swfTag.base64encode(data);
		};

		AudioInstance.prototype.loadHtml5Audio = function(mimeType, data) {
			if (typeof Audio == 'undefined') {
				console.warn("Audio() not defined");
				console.warn("Fallback to <audio>");
				this.loadAudio(mimeType, data);
				return;
			}
			this.audio = new Audio(this.getUrl(mimeType, data));
			this.type = "html5";
			this.getLoadState(this);
		};

		AudioInstance.prototype.loadAudio = function(mimeType, data) {
			this.audio = window.document.createElement("audio");
			this.audio.src = this.getUrl(mimeType, data);
			this.type = "audio";
			this.getLoadState(this);
		};

		AudioInstance.prototype.state = function() {
			return this.loadState;
		};

		AudioInstance.prototype.duration = function() {
			return this.audioDuration;
		};

		AudioInstance.prototype.volume = function(vol) {
			if (vol) {
				if (vol >= 1) vol = 1;
				if (vol <= 0) vol = 0;
				switch (this.type) {
					case "webaudio":
					case "webmedia":
						// zero does not seem to work
						if (this.isPlaying) this.gainNode.gain.value = (vol <= 0.001 ? 0.001 : vol);
						break;
					default:
						this.audio.volume = vol;
						break;
				}
				this.currentVolume = vol;
			} else {
				return this.currentVolume;
			}
		};

		AudioInstance.prototype.stereo = function(pan) {
			if (pan) {
				if (pan >= 1) pan = 1;
				if (pan <= -1) pan = -1;
				this.pan = pan;
				switch (this.type) {
					case "webaudio":
					case "webmedia":
						if (this.panNode) this.panNode.pan.value = this.pan;
				}
			} else {
				return this.pan;
			}
		};

		AudioInstance.prototype.seek = function(pos) {
			if (pos) {
				if (this.isPlaying) {
					this.pause();
					if (pos > this.audioDuration) console.warn("Warning : id "+this.id+" AudioInstance.prototype.seek " + pos + " > " + this.audioDuration);
					this.currentTime = pos;
					this.restart();
				} else this.currentTime = pos;
			} else {
				if (this.isPlaying) switch (this.type) {
					case "webaudio":
						// getOutputTimestamp not supported on Safari, Firefox/Android, Internet Explorer
						let t = this.audioCtx.getOutputTimestamp ? this.audioCtx.getOutputTimestamp().contextTime : this.audioCtx.currentTime;
						let ts = this.audioPlayOffset+t-this.audioPlayStart;
						if (ts > this.audioDuration) ts = this.audioDuration;
						return ts;
					default:
						return this.audio.currentTime;
				} else return this.currentTime;
			}
		};

		AudioInstance.prototype.setLoop = function(audioLoopCount, audioLoopStart, audioLoopEnd) {
			this.audioHasLoops = true;
			this.audioLoopCount = audioLoopCount;
			this.audioLoopCurrent = audioLoopCount-1;
			this.audioLoopStart = audioLoopStart ? audioLoopStart : 0;
			this.audioLoopEnd = audioLoopEnd ? audioLoopEnd : this.audioDuration;
			this.currentTime = audioLoopStart;
			this.audioPlayTime = 0;
		};

		AudioInstance.prototype.getPlayState = function() {
			let _this = this;
			if (this.audioStopFlag || !this.isPlaying) return;
			if (this.soundEnvelopes) {
				let cpos = this.seek();
				let ppos = -1,
					npos = -1,
					pvol = -1,
					nvol = -1,
					pstereo = -1,
					nstereo = -1;
				for (let i = 0; i < this.soundEnvelopes.length; i++) {
					if (this.soundEnvelopes[i].Position>=cpos) {
						npos = this.soundEnvelopes[i].Position;
						nvol = (this.soundEnvelopes[i].LeftLevel + this.soundEnvelopes[i].RightLevel)/2;
						nstereo = (this.soundEnvelopes[i].RightLevel - this.soundEnvelopes[i].LeftLevel);
						this.volume(pvol + (cpos - ppos) / (npos - ppos) * (nvol - pvol));
						this.stereo(pstereo + (cpos - ppos) / (npos - ppos) * (nstereo - pstereo));
						break;
					}
					ppos = this.soundEnvelopes[i].Position;
					pvol = (this.soundEnvelopes[i].LeftLevel + this.soundEnvelopes[i].RightLevel)/2;
					pstereo = (this.soundEnvelopes[i].RightLevel - this.soundEnvelopes[i].LeftLevel);
				}
			}
			switch (this.type) {
				case "webaudio":
					// getOutputTimestamp not supported on Safari, Firefox/Android, Internet Explorer
					this.currentTime = this.audioCtx.getOutputTimestamp ? this.audioCtx.getOutputTimestamp().contextTime - this.audioPlayStart + this.audioLoopStart : this.audioCtx.currentTime - this.audioPlayStart + this.audioLoopStart;
					if (this.audioHasLoops) {
						if (this.currentTime >= this.audioLoopEnd) {
							if (this.audioLoopCurrent) {
								this.audioLoopCurrent--;
								this.currentTime = this.audioLoopStart;
								console.log('restart');
								this.restart();
							} else {
								this.pause();
							}
						} else {
							this.playRaf = requestAnimationFrame(function(timeStamp) {
								_this.getPlayState();
							});
						}
					} else if (this.audioDuration - this.currentTime <= 0) {
						this.pause();
					} else {
						this.playRaf = requestAnimationFrame(function(timeStamp) {
							_this.getPlayState();
						});
					}
					break;
				default:
					this.currentTime = this.audio.currentTime;
					if (this.audioHasLoops) {
						if (this.audioLoopEnd - this.currentTime < 0.01) {
							if (this.audioLoopCurrent) {
								this.audioLoopCurrent--;
								this.currentTime = this.audioLoopStart;
								this.restart();
							} else {
								this.pause();
							}
						} else {
							this.playRaf = requestAnimationFrame(function(timeStamp) {
								_this.getPlayState();
							});
						}
					} else if (this.audioDuration - this.audio.currentTime <= 0 || this.audio.ended) {
						this.pause();
					} else {
						this.playRaf = requestAnimationFrame(function(timeStamp) {
							_this.getPlayState();
						});
					}
					break;
			}
		};

		AudioInstance.prototype.setSoundInfo = function(soundInfo) {
			if (soundInfo.SyncStop) {
				this.stop();
				return;
			} else if (soundInfo.SyncNoMultiple) {
				if (this.isPlaying) return;
			}
			this.currentTime = 0;
			this.currentVolume = 1;
			this.pan = 0;
			this.audioHasLoops = false;
			this.audioLoopCount = 0;
			this.audioLoopCurrent = 0;
			this.audioLoopStart = 0;
			this.audioLoopEnd = 0;
			this.audioPlayStart = 0;
			this.audioPlayOffset = 0;
			this.audioPlayTime = 0;
			this.audioStopFlag = false;
			this.outputLatency = 0;
			this.soundEnvelopes = null;
			let inPoint = soundInfo.HasInPoint ? soundInfo.InPoint / soundRates[3] : 0;
			let outPoint = soundInfo.HasOutPoint ? soundInfo.OutPoint / soundRates[3] : this.audioDuration;
			let loopCount = soundInfo.HasLoops ? soundInfo.LoopCount : 1;
			this.currentTime = 0;
			if (soundInfo.HasEnvelope) {
				this.soundEnvelopes = [];
				for (let i = 0; i < soundInfo.EnvPoints; i++) {
					let position = soundInfo.EnvelopeRecords[i].Pos44 / 44100+inPoint;
					let leftLevel = soundInfo.EnvelopeRecords[i].LeftLevel / 32768;
					let rightLevel = soundInfo.EnvelopeRecords[i].RightLevel / 32768;
					this.soundEnvelopes.push({
						"Position": position,
						"LeftLevel": leftLevel,
						"RightLevel": rightLevel
					});
				}
			}

			if (soundInfo.HasLoops) {
				this.setLoop(loopCount, inPoint, outPoint);
				this.play();
			} else {
				if (soundInfo.HasInPoint || soundInfo.HasOutPoint) this.setLoop(loopCount, inPoint, outPoint);
				else this.seek(0);
				this.play();
			}
		};

		AudioInstance.prototype.play = function() {
			let _this = this;
			switch (_this.type) {
				case "webaudio":
					this.audio = this.audioCtx.createBufferSource();
					this.audio.buffer = this.audioBuffer;
					this.gainNode = this.audioCtx.createGain();
					this.audio.connect(this.gainNode);
					this.gainNode.connect(this.audioCtx.destination);
					this.gainNode.gain.value = this.currentVolume;
					this.outputLatency = this.audioCtx.outputLatency ? this.audioCtx.outputLatency : 0;
					this.audio.start(0, this.currentTime);
					this.audioPlayStart = this.audioCtx.getOutputTimestamp ? this.audioCtx.getOutputTimestamp().contextTime : this.audioCtx.currentTime;
					this.audioPlayOffset = this.currentTime;
					break;
				default:
					this.audio.currentTime = this.currentTime;
					this.audio.play();
					this.audioPlayStart = getTimeStamp();
					break;
			}
			this.isPlaying = true;
			this.audioStopFlag = false;
			this.getPlayState();
		};

		AudioInstance.prototype.pause = function() {
			this.audioStopFlag = true;
			switch (this.type) {
				case "webaudio":
					this.currentTime = this.seek();
					try {
						if (this.isPlaying) this.audio.stop();
					} catch (exc) {
						console.error(exc);
					}
					break;
				default:
					this.currentTime = this.seek();
					this.audioPlayTime += getTimeStamp() - this.audioPlayStart;
					this.audio.pause();
					break;
			}
			this.isPlaying = false;
		};

		AudioInstance.prototype.stop = function() {
			this.audioStopFlag = true;
			switch (this.type) {
				case "webaudio":
					try {
						this.audio.stop();
					} catch (exc) {
						console.error(exc);
					}
					break;
				default:
					this.audio.pause();
					break;
			}
			this.isPlaying = false;
		};

		AudioInstance.prototype.restart = function() {
			switch (this.type) {
				case "webaudio":
					try {
						if (this.isPlaying) this.audio.stop();
						this.audio = this.audioCtx.createBufferSource();
						this.audio.buffer = this.audioBuffer;
						this.gainNode = this.audioCtx.createGain();
						this.audio.connect(this.gainNode);
						this.gainNode.connect(this.audioCtx.destination);
						this.gainNode.gain.value = this.currentVolume;
					} catch (exc) {
						console.error(exc);
					}
					this.audio.start(0, this.currentTime);
					this.audioPlayStart = this.audioCtx.getOutputTimestamp ? this.audioCtx.getOutputTimestamp().contextTime : this.audioCtx.currentTime;
					break;
				default:
					if (this.isPlaying) this.audio.pause();
					this.audio.currentTime = this.currentTime;
					this.audio.play();
					this.audioPlayStart = getTimeStamp();
					break;
			}
			this.isPlaying = true;
			this.audioStopFlag = false;
			this.getPlayState();
		};

		/**
		 * resize
		 */
		function resizeCanvas()
		{
			for (let i in stages) {
				if (!stages.hasOwnProperty(i)) {
					continue;
				}
				let stage = stages[i];
				if (!stage.isLoad) {
					continue;
				}
				stage.resize();
			}
		}

		/**
		 * resize event
		 */
		window.addEventListener("resize", function()
		{
			clearTimeout(resizeId);
			resizeId = setTimeout(resizeCanvas, 300);
		});

		/**
		 * unload event
		 */
		window.addEventListener("unload", function()
		{
			stages = void 0;
			loadStages = void 0;
		});

		/**
		 * @constructor
		 */
		let VectorToCanvas = function() {};

		/**
		 * Function
		 */
		VectorToCanvas.prototype.FUNCTION = Function;

		/**
		 * @param src
		 * @returns {{}}
		 */
		VectorToCanvas.prototype.clone = function(src)
		{
			let execute = function(src, obj)
			{
				let prop;
				for (prop in src) {
					if (!src.hasOwnProperty(prop)) {
						continue;
					}
					let value = src[prop];
					if (value instanceof Array) {
						obj[prop] = [];
						execute(value, obj[prop]);
					} else if (value instanceof Object) {
						obj[prop] = {};
						execute(value, obj[prop]);
					} else {
						obj[prop] = value;
					}
				}
			};

			let obj = {};
			execute(src, obj);
			return obj;
		};

		/**
		 * @param shapes
		 * @param isMorph
		 * @returns {Array}
		 */
		VectorToCanvas.prototype.convert = function(shapes, isMorph)
		{
			let _this = this;
			let lineStyles = shapes.lineStyles.lineStyles;
			let fillStyles = shapes.fillStyles.fillStyles;
			let records = shapes.ShapeRecords;
			let idx = 0;
			let obj = {};
			let cache = [];
			let AnchorX = 0;
			let AnchorY = 0;
			let MoveX = 0;
			let MoveY = 0;
			let LineX = 0;
			let LineY = 0;
			let FillStyle0 = 0;
			let FillStyle1 = 0;
			let LineStyle = 0;
			let fills0 = [];
			let fills1 = [];
			let lines = [];
			let stack = [];
			let depth = 0;
			let length = records.length;
			for (let i = 0; i < length; i++) {
				let record = records[i];
				if (!record) {
					stack = _this.setStack(stack, _this.fillMerge(fills0, fills1, isMorph));
					stack = _this.setStack(stack, lines);
					break;
				}

				if (record.isChange) {
					depth++;
					if (record.StateNewStyles) {
						AnchorX = 0;
						AnchorY = 0;
						stack = _this.setStack(stack, _this.fillMerge(fills0, fills1, isMorph));
						stack = _this.setStack(stack, lines);
						fills0 = [];
						fills1 = [];
						lines = [];

						if (record.NumFillBits) {
							fillStyles = record.FillStyles.fillStyles;
						}
						if (record.NumLineBits) {
							lineStyles = record.LineStyles.lineStyles;
						}
					}

					MoveX = AnchorX;
					MoveY = AnchorY;
					if (record.StateMoveTo) {
						MoveX = record.MoveX;
						MoveY = record.MoveY;
					}
					LineX = MoveX;
					LineY = MoveY;

					if (record.StateFillStyle0) {
						FillStyle0 = record.FillStyle0;
					}
					if (record.StateFillStyle1) {
						FillStyle1 = record.FillStyle1;
					}
					if (record.StateLineStyle) {
						LineStyle = record.LineStyle;
					}
					continue;
				}

				AnchorX = record.AnchorX;
				AnchorY = record.AnchorY;
				let ControlX = record.ControlX;
				let ControlY = record.ControlY;
				let isCurved = record.isCurved;
				if (FillStyle0) {
					idx = FillStyle0 - 1;
					if (!(idx in fills0)) {
						fills0[idx] = [];
					}

					if (!(depth in fills0[idx])) {
						fills0[idx][depth] = {
							obj: fillStyles[idx],
							startX: MoveX,
							startY: MoveY,
							endX: 0,
							endY: 0,
							cache: []
						};
					}

					obj = fills0[idx][depth];
					cache = obj.cache;
					cache[cache.length] = _this.clone(record);
					obj.endX = AnchorX;
					obj.endY = AnchorY;
				}

				if (FillStyle1) {
					idx = FillStyle1 - 1;
					if (!(idx in fills1)) {
						fills1[idx] = [];
					}

					if (!(depth in fills1[idx])) {
						fills1[idx][depth] = {
							obj: fillStyles[idx],
							startX: MoveX,
							startY: MoveY,
							endX: 0,
							endY: 0,
							cache: []
						};
					}

					obj = fills1[idx][depth];
					cache = obj.cache;
					cache[cache.length] = _this.clone(record);
					obj.endX = AnchorX;
					obj.endY = AnchorY;
				}

				if (LineStyle) {
					idx = LineStyle - 1;
					if (!(idx in lines)) {
						lines[idx] = {
							obj: lineStyles[idx],
							cache: []
						};
					}

					obj = lines[idx];
					cache = obj.cache;
					cache[cache.length] = [0, LineX, LineY];
					let code = [2, AnchorX, AnchorY];
					if (isCurved) {
						code = [1, ControlX, ControlY, AnchorX, AnchorY];
					}
					cache[cache.length] = code;
				}

				LineX = AnchorX;
				LineY = AnchorY;
			}

			return stack;
		};

		/**
		 * @param fills0
		 * @param fills1
		 * @param isMorph
		 * @returns {*}
		 */
		VectorToCanvas.prototype.fillMerge = function(fills0, fills1, isMorph)
		{
			let _this = this;
			fills0 = _this.fillReverse(fills0);
			if (fills0.length) {
				for (let i in fills0) {
					if (!fills0.hasOwnProperty(i)) {
						continue;
					}
					let fills = fills0[i];
					if (i in fills1) {
						let fill1 = fills1[i];
						for (let depth in fills) {
							if (!fills.hasOwnProperty(depth)) {
								continue;
							}
							fill1[fill1.length] = fills[depth];
						}
					} else {
						fills1[i] = fills;
					}
				}
			}
			return _this.coordinateAdjustment(fills1, isMorph);
		};

		/**
		 * @param fills0
		 * @returns {*}
		 */
		VectorToCanvas.prototype.fillReverse = function(fills0)
		{
			if (!fills0.length) {
				return fills0;
			}

			for (let i in fills0) {
				if (!fills0.hasOwnProperty(i)) {
					continue;
				}
				let fills = fills0[i];
				for (let depth in fills) {
					if (!fills.hasOwnProperty(depth)) {
						continue;
					}
					let AnchorX = 0;
					let AnchorY = 0;
					let obj = fills[depth];
					let cacheX = obj.startX;
					let cacheY = obj.startY;
					let cache = obj.cache;
					let length = cache.length;
					if (length) {
						for (let idx in cache) {
							if (!cache.hasOwnProperty(idx)) {
								continue;
							}
							let recode = cache[idx];
							AnchorX = recode.AnchorX;
							AnchorY = recode.AnchorY;
							recode.AnchorX = cacheX;
							recode.AnchorY = cacheY;
							cacheX = AnchorX;
							cacheY = AnchorY;
						}
						let array = [];
						if (length > 0) {
							while (length--) {
								array[array.length] = cache[length];
							}
						}
						obj.cache = array;
					}

					cacheX = obj.startX;
					cacheY = obj.startY;
					obj.startX = obj.endX;
					obj.startY = obj.endY;
					obj.endX = cacheX;
					obj.endY = cacheY;
				}
			}
			return fills0;
		};

		/**
		 * @param fills1
		 * @param isMorph
		 */
		VectorToCanvas.prototype.coordinateAdjustment = function(fills1, isMorph)
		{
			for (let i in fills1) {
				if (!fills1.hasOwnProperty(i)) {
					continue;
				}
				let array = [];
				let fills = fills1[i];

				for (let depth in fills) {
					if (!fills.hasOwnProperty(depth)) {
						continue;
					}
					array[array.length] = fills[depth];
				}

				let adjustment = [];
				if (array.length > 1 && !isMorph) {
					while (true) {
						if (!array.length) {
							break;
						}

						let fill = array.shift();
						if (fill.startX === fill.endX && fill.startY === fill.endY) {
							adjustment[adjustment.length] = fill;
							continue;
						}

						let mLen = array.length;
						if (mLen < 0) {
							break;
						}

						let isMatch = 0;
						while (mLen--) {
							let comparison = array[mLen];
							if (comparison.startX === fill.endX && comparison.startY === fill.endY) {
								fill.endX = comparison.endX;
								fill.endY = comparison.endY;
								let cache0 = fill.cache;
								let cache1 = comparison.cache;
								let cLen = cache1.length;
								for (let cIdx = 0; cIdx < cLen; cIdx++) {
									cache0[cache0.length] = cache1[cIdx];
								}
								array.splice(mLen, 1);
								array.unshift(fill);
								isMatch = 1;
								break;
							}
						}

						if (!isMatch) {
							array.unshift(fill);
						}
					}
				} else {
					adjustment = array;
				}

				let aLen = adjustment.length;
				let cache = [];
				let obj = {};
				for (let idx = 0; idx < aLen; idx++) {
					let data = adjustment[idx];
					obj = data.obj;
					let caches = data.cache;
					let cacheLength = caches.length;
					cache[cache.length] = [0, data.startX, data.startY];
					for (let compIdx = 0; compIdx < cacheLength; compIdx++) {
						let r = caches[compIdx];
						let code = [2, r.AnchorX, r.AnchorY];
						if (r.isCurved) {
							code = [1, r.ControlX, r.ControlY, r.AnchorX, r.AnchorY];
						}
						cache[cache.length] = code;
					}
				}

				fills1[i] = {cache: cache, obj: obj};
			}
			return fills1;
		};

		/**
		 * @param stack
		 * @param array
		 * @returns {*}
		 */
		VectorToCanvas.prototype.setStack = function(stack, array)
		{
			let _this = this;
			let _buildCommand = _this.buildCommand;
			if (array.length) {
				for (let i in array) {
					if (!array.hasOwnProperty(i)) {
						continue;
					}
					let data = array[i];
					stack[stack.length] = {
						obj: data.obj,
						cmd: _buildCommand.call(_this, data.cache)
					};
				}
			}
			return stack;
		};

		/**
		 * @param cache
		 * @returns {*}
		 */
		VectorToCanvas.prototype.buildCommand = function(cache)
		{
			let _this = this;
			return _this.toCanvas2D(cache);
		};

		/**
		 * @param cache
		 * @returns {*}
		 */
		VectorToCanvas.prototype.toCanvas2D = function(cache)
		{
			let length = cache.length;
			let str = "";
			let i = 0;
			while (i < length) {
				let a = cache[i];
				switch (a[0]) {
					case 0:
						str += "ctx.moveTo(" + a[1] + "," + a[2] + ");";
						break;
					case 1:
						str += "ctx.quadraticCurveTo(" + a[1] + "," + a[2] + "," + a[3] + "," + a[4] + ");";
						break;
					case 2:
						str += "ctx.lineTo(" + a[1] + "," + a[2] + ");";
						break;
					case 3:
						str += "ctx.bezierCurveTo(" + a[1] + "," + a[2] + "," + a[3] + "," + a[4] + "," + a[5] + "," + a[6] + ");";
						break;
					case 4:
						str += "ctx.moveTo(" + (a[1] + a[3]) + "," + a[2] + ");";
						str += "ctx.arc(" + a[1] + "," + a[2] + "," + a[3] + ",0 , Math.PI*2, false);";
						break;

						// Graphics
					case 5: // fillStyle
						str += "let r = Math.max(0, Math.min((" + a[1] + " * ct[0]) + ct[4], 255))|0;";
						str += "let g = Math.max(0, Math.min((" + a[2] + " * ct[1]) + ct[5], 255))|0;";
						str += "let b = Math.max(0, Math.min((" + a[3] + " * ct[2]) + ct[6], 255))|0;";
						str += "let a = Math.max(0, Math.min((" + a[4] + " * 255 * ct[3]) + ct[7], 255)) / 255;";
						str += "ctx.fillStyle = 'rgba('+r+', '+g+', '+b+', '+a+')';";
						break;
					case 6: // strokeStyle
						str += "let r = Math.max(0, Math.min((" + a[1] + " * ct[0]) + ct[4], 255))|0;";
						str += "let g = Math.max(0, Math.min((" + a[2] + " * ct[1]) + ct[5], 255))|0;";
						str += "let b = Math.max(0, Math.min((" + a[3] + " * ct[2]) + ct[6], 255))|0;";
						str += "let a = Math.max(0, Math.min((" + a[4] + " * 255 * ct[3]) + ct[7], 255)) / 255;";
						str += "ctx.strokeStyle = 'rgba('+r+', '+g+', '+b+', '+a+')';";
						break;
					case 7: // fill
						str += "if (!isClip) { ctx.fill(); }";
						break;
					case 8: // stroke
						str += "if (!isClip) { ctx.stroke(); }";
						break;
					case 9: // width
						str += "ctx.lineWidth = " + a[1] + ";";
						break;
					case 10: // lineCap
						str += "ctx.lineCap = '" + a[1] + "';";
						break;
					case 11: // lineJoin
						str += "ctx.lineJoin = '" + a[1] + "';";
						break;
					case 12: // miterLimit
						str += "ctx.lineJoin = '" + a[1] + "';";
						break;
					case 13: // beginPath
						str += "ctx.beginPath();";
						break;
				}
				i++;
			}
			return new this.FUNCTION("ctx", "ct", "isClip", str);
		};

		let vtc = new VectorToCanvas();

		/**
		 * @constructor
		 */
		let CacheStore = function()
		{
			this.store = {};
			this.pool = [];
			this.size = 73400320; // 70M
		};

		/**
		 * reset
		 */
		CacheStore.prototype.reset = function()
		{
			let _this = this;
			let store = _this.store;
			for (let key in store) {
				if (!store.hasOwnProperty(key)) {
					continue;
				}
				let value = store[key];
				if (!(value instanceof CanvasRenderingContext2D)) {
					continue;
				}
				_this.destroy(value);
			}
			_this.store = {};
			_this.size = 73400320;
		};

		/**
		 * @param ctx
		 */
		CacheStore.prototype.destroy = function(ctx)
		{
			let pool = this.pool;
			let canvas = ctx.canvas;
			ctx.clearRect(0, 0, canvas.width + 1, canvas.height + 1);
			canvas.width = canvas.height = 1;
			pool[pool.length] = canvas;
		};

		/**
		 * @returns {*}
		 */
		CacheStore.prototype.getCanvas = function()
		{
			return this.pool.pop() || _document.createElement("canvas");
		};

		/**
		 * @param key
		 * @returns {*}
		 */
		CacheStore.prototype.getCache = function(key)
		{
			return this.store[key];
		};

		/**
		 * @param key
		 * @param value
		 */
		CacheStore.prototype.setCache = function(key, value)
		{
			let _this = this;
			if (value instanceof CanvasRenderingContext2D) {
				let canvas = value.canvas;
				_this.size -= (canvas.width * canvas.height);
			}
			this.store[key] = value;
		};

		/**
		 * @param name
		 * @param id
		 * @param matrix
		 * @param cxForm
		 * @returns {string}
		 */
		CacheStore.prototype.generateKey = function(name, id, matrix, cxForm)
		{
			let key = name + "_" + id;
			if (matrix instanceof Array) {
				key += "_" + matrix.join("_");
			}
			if (cxForm instanceof Array) {
				key += "_" + cxForm.join("_");
			}
			return key;
		};
		let cacheStore = new CacheStore();

		/**
		 * @constructor
		 */
		let BitIO = function()
		{
			let _this = this;
			_this.data = null;
			_this.bit_offset = 0;
			_this.byte_offset = 0;
			_this.bit_buffer = null;
		};

		/**
		 * @param data
		 */
		BitIO.prototype.init = function(data)
		{
			let _this = this;
			let length = data.length;
			let array = _this.createArray(length);
			let i = 0;
			while (i < length) {
				array[i] = data.charCodeAt(i) & 0xff;
				i++;
			}
			_this.data = array;
		};

		/**
		 * @param str
		 * @returns {XML|string|void|*}
		 */
		BitIO.prototype.decodeToShiftJis = function(str)
		{
			return str.replace(/%(8[1-9A-F]|[9E][0-9A-F]|F[0-9A-C])(%[4-689A-F][0-9A-F]|%7[0-9A-E]|[@-~])|%([0-7][0-9A-F]|A[1-9A-F]|[B-D][0-9A-F])/ig,
				function(s)
				{
					let c = parseInt(s.substring(1, 3), 16);
					let l = s.length;
					return 3 === l ? _fromCharCode(c < 160 ? c : c + 65216) : JCT11280.charAt((c < 160 ? c - 129 : c - 193) * 188 + (4 === l ? s.charCodeAt(3) - 64 : (c = parseInt(s.substring(4), 16)) < 127 ? c - 64 : c - 65));
				}
			);
		};

		/**
		 * @param compressed
		 * @returns {Array}
		 */
		BitIO.prototype.unlzma = function(compressed)
		{
			return [];
		};

		/**
		 * @param compressed
		 * @param isDeCompress
		 * @returns {Array}
		 */
		BitIO.prototype.unzip = function(compressed, isDeCompress)
		{
			let _this = this;
			let sym = 0;
			let i = 0;
			let length = 0;
			let data = [];
			let bitLengths = [];
			let bitio = new BitIO();
			bitio.setData(compressed);

			let ORDER =
				[16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

			let LEXT = [
				0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
				3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99
			];

			let LENS = [
				3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
				35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
			];

			let DEXT = [
				0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6,
				7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13
			];

			let DISTS = [
				1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
				257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
				8193, 12289, 16385, 24577
			];

			if (isArrayBuffer) {
				ORDER = new Uint8Array(ORDER);
				LEXT = new Uint8Array(LEXT);
				LENS = new Uint16Array(LENS);
				DEXT = new Uint8Array(DEXT);
				DISTS = new Uint16Array(DISTS);
			}

			let startOffset = 2;
			if (isDeCompress) {
				startOffset = 10;
			}
			bitio.setOffset(startOffset, 8);

			for (let flag = 0; !flag;) {
				flag = bitio.readUB(1);
				let type = bitio.readUB(2);
				let distTable = {};
				let litTable = {};
				let fixedDistTable = false;
				let fixedLitTable = false;

				if (type) {
					if (type === 1) {
						distTable = fixedDistTable;
						litTable = fixedLitTable;

						if (!distTable) {
							bitLengths = [];
							for (i = 32; i--;) {
								bitLengths[bitLengths.length] = 5;
							}
							distTable = fixedDistTable = _this.buildHuffTable(bitLengths);
						}

						if (!litTable) {
							bitLengths = [];
							i = 0;
							while (i < 144) {
								i++;
								bitLengths[bitLengths.length] = 8;
							}
							while (i < 256) {
								i++;
								bitLengths[bitLengths.length] = 9;
							}
							while (i < 280) {
								i++;
								bitLengths[bitLengths.length] = 7;
							}
							while (i < 288) {
								i++;
								bitLengths[bitLengths.length] = 8;
							}
							litTable = fixedLitTable = _this.buildHuffTable(bitLengths);
						}
					} else {
						let numLitLengths = bitio.readUB(5) + 257;
						let numDistLengths = bitio.readUB(5) + 1;
						let numCodeLengths = bitio.readUB(4) + 4;
						let codeLengths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
						if (isArrayBuffer) {
							codeLengths = new Uint8Array(codeLengths);
						}
						for (i = 0; i < numCodeLengths; i++) {
							codeLengths[ORDER[i]] = bitio.readUB(3);
						}
						let codeTable = _this.buildHuffTable(codeLengths);
						codeLengths = null;

						let litLengths = [];
						let prevCodeLen = 0;
						let maxLengths = numLitLengths + numDistLengths;
						while (litLengths.length < maxLengths) {
							sym = _this.decodeSymbol(bitio, codeTable);
							switch (sym) {
								case 16:
									i = bitio.readUB(2) + 3;
									while (i--) {
										litLengths[litLengths.length] = prevCodeLen;
									}
									break;
								case 17:
									i = bitio.readUB(3) + 3;
									while (i--) {
										litLengths[litLengths.length] = 0;
									}
									break;
								case 18:
									i = bitio.readUB(7) + 11;
									while (i--) {
										litLengths[litLengths.length] = 0;
									}
									break;
								default:
									if (sym <= 15) {
										litLengths[litLengths.length] = sym;
										prevCodeLen = sym;
									}
									break;
							}
						}
						distTable = _this.buildHuffTable(litLengths.splice(numLitLengths, numDistLengths));
						litTable = _this.buildHuffTable(litLengths);
					}

					sym = 0;
					while (sym !== 256) {
						sym = _this.decodeSymbol(bitio, litTable);
						if (sym < 256) {
							data[data.length] = sym;
						} else if (sym > 256) {
							let mapIdx = sym - 257;
							length = LENS[mapIdx] + bitio.readUB(LEXT[mapIdx]);
							let distMap = _this.decodeSymbol(bitio, distTable);
							let dist = DISTS[distMap] + bitio.readUB(DEXT[distMap]);
							i = data.length - dist;
							while (length--) {
								data[data.length] = data[i++];
							}
						}
					}
				} else {
					bitio.bit_offset = 8;
					bitio.bit_buffer = null;
					length = bitio.readNumber(2);
					bitio.readNumber(2); // nlen
					while (length--) {
						data[data.length] = bitio.readNumber(1);
					}
				}
			}
			return data;
		};

		/**
		 * @param data
		 * @returns {{}}
		 */
		BitIO.prototype.buildHuffTable = function(data)
		{
			let length = data.length;
			let blCount = [];
			let nextCode = [];
			let table = {};
			let code = 0;
			let len = 0;
			let maxBits = 0;
			for (let i = 0; i < length; i++) {
				maxBits = _max(maxBits, data[i]);
			}
			maxBits++;

			let i = length;
			while (i--) {
				len = data[i];
				blCount[len] = (blCount[len] || 0) + (len > 0);
			}

			for (let i = 1; i < maxBits; i++) {
				len = i - 1;
				if (!(len in blCount)) {
					blCount[len] = 0;
				}
				code = (code + blCount[len]) << 1;
				nextCode[i] = code | 0;
			}

			for (let i = 0; i < length; i++) {
				len = data[i];
				if (len) {
					table[nextCode[len]] = {length: len, symbol: i};
					nextCode[len]++;
				}
			}
			return table;
		};

		/**
		 * @param bitio
		 * @param table
		 * @returns {*}
		 */
		BitIO.prototype.decodeSymbol = function(bitio, table)
		{
			let code = 0;
			let len = 0;
			while (true) {
				code = (code << 1) | bitio.readUB(1);
				len++;
				if (!(code in table)) {
					continue;
				}
				let entry = table[code];
				if (entry.length === len) {
					return entry.symbol;
				}
			}
		};

		/**
		 * @param length
		 * @returns {Array}
		 */
		BitIO.prototype.createArray = function(length)
		{
			return (isArrayBuffer) ? new Uint8Array(length) : [];
		};

		/**
		 * @param data
		 */
		BitIO.prototype.setData = function(data)
		{
			this.data = data;
		};

		/**
		 * @returns {string}
		 */
		BitIO.prototype.getHeaderSignature = function()
		{
			let _this = this;
			let str = "";
			let count = 3;
			while (count) {
				let code = _this.getUI8();
				switch (code) { // trim
					case 32:
					case 96:
					case 127:
						continue;
					default:
						break;
				}
				str += _fromCharCode(code);
				count--;
			}
			return str;
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.getVersion = function()
		{
			return this.getUI8();
		};

		/**
		 * byteAlign
		 */
		BitIO.prototype.byteAlign = function()
		{
			let _this = this;
			if (!_this.bit_offset) {
				return;
			}
			_this.byte_offset += ((_this.bit_offset + 7) / 8) | 0;
			_this.bit_offset = 0;
		};

		/**
		 * readString
		 */
		BitIO.prototype.readString = function()
		{
			let _this = this;
			_this.byteAlign();
			let s = "";
			let c;
			while (true) {
				c = _this.data[_this.byte_offset++];
				if (c == 0) return s;
				s += String.fromCharCode(c);
			}
		};

		/**
		 * @param length
		 * @returns {Array}
		 */
		BitIO.prototype.getData = function(length)
		{
			let _this = this;
			_this.byteAlign();
			let array = _this.createArray(length);
			let key = 0;
			let data = _this.data;
			let limit = length;
			while (limit--) {
				array[key++] = data[_this.byte_offset++];
			}
			return array;
		};

		/**
		 * @param value
		 * @param isJis
		 * @returns {string}
		 */
		BitIO.prototype.getDataUntil = function(value, isJis)
		{
			let _this = this;
			let data = _this.data;

			_this.byteAlign();
			let bo = _this.byte_offset;
			let offset = 0;
			if (value === null) {
				offset = -1;
			} else {
				let length = data.length;
				while (true) {
					let val = data[bo + offset];
					offset++;
					if (val === 0 || (bo + offset) >= length) {
						break;
					}
				}
			}

			let n = (offset === -1) ? data.length - bo : offset;
			let array = [];
			let ret = "";
			let _join = Array.prototype.join;
			let i = 0;
			if (value !== null) {
				for (i = 0; i < n; i++) {
					let code = data[bo + i];
					if (code === 10 || code === 13) {
						array[array.length] = "\n";
					}
					if (code < 32) {
						continue;
					}
					array[array.length] = "%" + code.toString(16);
				}

				if (array.length) {
					let str = _join.call(array, "");
					if (str.length > 5 && str.substr(-5) === "\n") {
						str = str.slice(0, -5);
					}

					if (isJis) {
						ret = _this.decodeToShiftJis(str);
					} else {
						try {
							ret = decodeURIComponent(str);
						} catch (e) {
							ret = _this.decodeToShiftJis(str);
						}
					}
				}
			} else {
				for (i = 0; i < n; i++) {
					ret += _fromCharCode(data[bo + i]);
				}
			}
			_this.byte_offset = bo + n;
			return ret;
		};

		/**
		 * byteCarry
		 */
		BitIO.prototype.byteCarry = function()
		{
			let _this = this;
			if (_this.bit_offset > 7) {
				_this.byte_offset += ((_this.bit_offset + 7) / 8) | 0;
				_this.bit_offset &= 0x07;
			} else {
				while (_this.bit_offset < 0) {
					_this.byte_offset--;
					_this.bit_offset += 8;
				}
			}
		};

		/**
		 * @param n
		 * @returns {number}
		 */
		BitIO.prototype.getUIBits = function(n)
		{
			let value = 0;
			let _this = this;
			let _getUIBit = _this.getUIBit;
			while (n--) {
				value <<= 1;
				value |= _getUIBit.call(_this);
			}
			return value;
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.getUIBit = function()
		{
			let _this = this;
			_this.byteCarry();
			return (_this.data[_this.byte_offset] >> (7 - _this.bit_offset++)) & 0x1;
		};

		/**
		 * @param n
		 * @returns {number}
		 */
		BitIO.prototype.getSIBits = function(n)
		{
			let _this = this;
			let value = _this.getUIBits(n);
			let msb = value & (0x1 << (n - 1));
			if (msb) {
				let bitMask = (2 * msb) - 1;
				return -(value ^ bitMask) - 1;
			}
			return value;
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.getUI8 = function()
		{
			let _this = this;
			_this.byteAlign();
			return _this.data[_this.byte_offset++];
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.getUI16 = function()
		{
			let _this = this;
			let data = _this.data;
			_this.byteAlign();
			return (data[_this.byte_offset++] | (data[_this.byte_offset++]) << 8);
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.getUI24 = function()
		{
			let _this = this;
			let data = _this.data;
			_this.byteAlign();
			return (data[_this.byte_offset++] | (data[_this.byte_offset++]
				| (data[_this.byte_offset++]) << 8) << 8);
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.getUI32 = function()
		{
			let _this = this;
			let data = _this.data;
			_this.byteAlign();
			return (data[_this.byte_offset++] | (data[_this.byte_offset++]
				| (data[_this.byte_offset++] | (data[_this.byte_offset++]) << 8) << 8) << 8);
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.getUI16BE = function()
		{
			let _this = this;
			let data = _this.data;
			_this.byteAlign();
			return (((data[_this.byte_offset++]) << 8) | (data[_this.byte_offset++]));
		};

		/**
		 * @returns {*}
		 */
		BitIO.prototype.getFloat16 = function()
		{
			let data = this.getData(2);
			let float = 0;
			for (let i = 2; i--;) {
				float |= data[i] << (i * 8);
			}
			return float;
		};

		/**
		 * Reads one FIXED (Fixed point 16.16) signed value from the stream.
		 * @returns {*}
		 */
		BitIO.prototype.getFixed = function()
		{
			let float = this.getSI32();
			return float / (1 << 16);
		};

		/**
		 * Reads one FIXED8 (Fixed point 8.8) signed value from the stream.
		 * @returns {*}
		 */
		BitIO.prototype.getFixed8 = function()
		{
			let float = this.getSI16();
			return float / (1 << 8);
		};

		/**
		 * @returns {*}
		 */
		BitIO.prototype.getFloat32 = function()
		{
			let data = this.getData(4);
			let rv = 0;
			for (let i = 4; i--;) {
				rv |= data[i] << (i * 8);
			}
			let sign = rv & 0x80000000;
			let exp = (rv >> 23) & 0xff;
			let fraction = rv & 0x7fffff;
			if (!rv || rv === 0x80000000) {
				return 0;
			}
			return (sign ? -1 : 1) * (fraction | 0x800000) * _pow(2, (exp - 127 - 23));
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.getFloat64 = function()
		{
			let _this = this;
			let upperBits = _this.getUI32();
			let lowerBits = _this.getUI32();
			let sign = upperBits >>> 31 & 0x1;
			let exp = upperBits >>> 20 & 0x7FF;
			let upperFraction = upperBits & 0xFFFFF;
			return (!upperBits && !lowerBits) ? 0 : ((sign === 0) ? 1 : -1) *
				(upperFraction / 1048576 + lowerBits / 4503599627370496 + 1) *
				_pow(2, exp - 1023);
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.getFloat64LittleEndian = function()
		{
			let _this = this;
			let signBits = 1;
			let exponentBits = 11;
			let fractionBits = 52;
			let min = -1022;
			let max = 1023;

			let data = _this.data;
			let str = "";
			for (let i = 0; i < 8; i++) {
				let bits = data[_this.byte_offset++].toString(2);
				while (bits.length < 8) {
					bits = "0" + bits;
				}
				str = bits + str;
			}

			let sign = (str.charAt(0) === "1") ? -1 : 1;
			let exponent = parseInt(str.substr(signBits, exponentBits), 2) - max;
			let significandBase = str.substr(signBits + exponentBits, fractionBits);
			let significandBin = "1" + significandBase;

			let val = 1;
			let significand = 0;
			if (exponent === -max) {
				if (significandBase.indexOf("1") === -1) {
					return 0;
				} else {
					exponent = min;
					significandBin = "0" + significandBase;
				}
			}

			let l = 0;
			while (l < significandBin.length) {
				let sb = significandBin.charAt(l);
				significand += val * +sb;
				val = val / 2;
				l++;
			}

			return sign * significand * _pow(2, exponent);
		};

		/**
		 * @param data
		 * @returns {number}
		 */
		BitIO.prototype.toUI16 = function(data)
		{
			return data[0] + (data[1] << 8);
		};

		/**
		 * @param data
		 * @returns {number}
		 */
		BitIO.prototype.toSI16LE = function(data)
		{
			let _this = this;
			let value = _this.toUI16(data);
			return (value < 0x8000) ? value : (value - 0x10000);
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.getSI8 = function()
		{
			let _this = this;
			let value = _this.getUI8();
			if (value >> 7) { // nBits = 8;
				value -= 256; // Math.pow(2, 8)
			}
			return value;
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.getSI16 = function()
		{
			let _this = this;
			let value = _this.getUI16();
			if (value >> 15) { // nBits = 16;
				value -= 65536; // Math.pow(2, 16)
			}
			return value;
		};

		/**
		 * @returns {*}
		 */
		BitIO.prototype.getSI24 = function()
		{
			let _this = this;
			let value = _this.getUI24();
			if (value >> 23) { // nBits = 24;
				value -= 16777216; // Math.pow(2, 24)
			}
			return value;
		};

		/**
		 * @returns {*}
		 */
		BitIO.prototype.getSI32 = function()
		{
			let _this = this;
			let value = _this.getUI32();
			if (value >= 0x80000000) {
				value = -(((~value) & 0xffffffff) + 1);
			}
			return value;
		};

		/**
		 * @param byteInt
		 * @param bitInt
		 */
		BitIO.prototype.incrementOffset = function(byteInt, bitInt)
		{
			let _this = this;
			_this.byte_offset += byteInt;
			_this.bit_offset += bitInt;
			_this.byteCarry();
		};

		/**
		 * @param byteInt
		 * @param bitInt
		 */
		BitIO.prototype.setOffset = function(byteInt, bitInt)
		{
			let _this = this;
			_this.byte_offset = byteInt;
			_this.bit_offset = bitInt;
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.getU30 = function()
		{
			let _this = this;
			let value = 0;
			let data = _this.data;
			for (let i = 0; i < 5; i++) {
				let num = data[_this.byte_offset++];
				value |= ((num & 0x7f) << (7 * i));
				if (!(num & 0x80)) {
					break;
				}
			}
			return value;
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.getS30 = function()
		{
			let _this = this;
			let startOffset = _this.byte_offset;
			let value = _this.getU30();
			let nBits = (_this.byte_offset - startOffset) * 8;
			if (value >> (nBits - 1)) {
				value -= _pow(2, nBits);
			}
			return value;
		};

		/**
		 * @param offset
		 * @returns {number}
		 */
		BitIO.prototype.ReadU30 = function(offset)
		{
			let _this = this;
			let value = 0;
			let data = _this.data;
			for (let i = 0; i < 5; i++) {
				let num = data[offset++];
				value |= ((num & 0x7f) << (7 * i));
				if (!(num & 0x80)) {
					break;
				}
			}
			return value;
		};

		/**
		 * @returns {string}
		 */
		BitIO.prototype.AbcReadString = function()
		{
			let _this = this;
			let offset = _this.byte_offset;
			let data = _this.data;
			let length = _this.ReadU30(offset) + 1;
			let ret = [];
			for (let i = 0; i < length; i++) {
				let code = data[_this.byte_offset++];
				if (code < 33) {
					continue;
				}

				switch (code) {
					default:
						break;
					case 34:
					case 35:
					case 36:
					case 37:
					case 38:
					case 39:
					case 43:
					case 45:
						continue;
				}

				ret[ret.length] = _fromCharCode(code);
			}
			return ret.join("");
		};

		/**
		 * @param length
		 * @returns {number}
		 */
		BitIO.prototype.readUB = function(length)
		{
			let _this = this;
			let value = 0;
			for (let i = 0; i < length; i++) {
				if (_this.bit_offset === 8) {
					_this.bit_buffer = _this.readNumber(1);
					_this.bit_offset = 0;
				}
				value |= (_this.bit_buffer & (0x01 << _this.bit_offset++) ? 1 : 0) << i;
			}
			return value;
		};

		/**
		 * @returns {number}
		 */
		BitIO.prototype.readNumber = function(n)
		{
			let _this = this;
			let value = 0;
			let o = _this.byte_offset;
			let i = o + n;
			while (i > o) {
				value = (value << 8) | _this.data[--i];
			}
			_this.byte_offset += n;
			return value;
		};

		/**
		 * @param size
		 * @param mode
		 */
		BitIO.prototype.deCompress = function(size, mode)
		{
			let _this = this;
			let cacheOffset = _this.byte_offset;
			_this.byte_offset = 0;

			let data = _this.getData(cacheOffset);
			let deCompress = (mode === "ZLIB") ? _this.unzip(_this.data, true) : _this.unlzma(_this.data);

			let i = 0;
			let key = 0;
			let array = _this.createArray(size);
			let length = data.length;
			while (i < length) {
				array[key++] = data[i];
				i++;
			}

			i = 0;
			length = deCompress.length;
			while (i < length) {
				array[key++] = deCompress[i];
				i++;
			}

			_this.data = array;
			_this.byte_offset = cacheOffset;
		};

		/**
		 * @constructor
		 */
		let PlaceObject = function()
		{
			let _this = this;
			_this.matrix = _this.cloneArray([1, 0, 0, 1, 0, 0]);
			_this.colorTransform = _this.cloneArray([1, 1, 1, 1, 0, 0, 0, 0]);
			_this.filters = null;
			_this.blendMode = "normal";
			_this.visible = true;
		};

		/**
		 * @param src
		 * @returns {Array}
		 */
		PlaceObject.prototype.cloneArray = function(src)
		{
			let arr = [];
			let length = src.length;
			for (let i = 0; i < length; i++) {
				arr[i] = src[i];
			}
			return arr;
		};

		/**
		 * @param blendMode
		 * @returns {String}
		 */
		PlaceObject.prototype.getBlendName = function(blendMode)
		{
			let mode = null;
			switch (blendMode) {
				case 1:
				case "normal":
					mode = "normal";
					break;
				case 2:
				case "layer":
					mode = "layer";
					break;
				case 3:
				case "multiply":
					mode = "multiply";
					break;
				case 4:
				case "screen":
					mode = "screen";
					break;
				case 5:
				case "lighten":
					mode = "lighten";
					break;
				case 6:
				case "darken":
					mode = "darken";
					break;
				case 7:
				case "difference":
					mode = "difference";
					break;
				case 8:
				case "add":
					mode = "add";
					break;
				case 9:
				case "subtract":
					mode = "subtract";
					break;
				case 10:
				case "invert":
					mode = "invert";
					break;
				case 11:
				case "alpha":
					mode = "alpha";
					break;
				case 12:
				case "erase":
					mode = "erase";
					break;
				case 13:
				case "overlay":
					mode = "overlay";
					break;
				case 14:
				case "hardlight":
					mode = "hardlight";
					break;
			}
			return mode;
		};

		/**
		 * @returns {PlaceObject}
		 */
		PlaceObject.prototype.clone = function()
		{
			let _this = this;
			let placeObject = new PlaceObject();
			placeObject.setMatrix(_this.getMatrix());
			placeObject.setColorTransform(_this.getColorTransform());
			placeObject.setFilters(_this.getFilters());
			placeObject.setBlendMode(_this.getBlendMode());
			return placeObject;
		};

		/**
		 * @returns {*}
		 */
		PlaceObject.prototype.getMatrix = function()
		{
			return this.matrix;
		};

		/**
		 * @param matrix
		 */
		PlaceObject.prototype.setMatrix = function(matrix)
		{
			let _this = this;
			_this.matrix = _this.cloneArray(matrix);
		};

		/**
		 * @returns {*}
		 */
		PlaceObject.prototype.getColorTransform = function()
		{
			return this.colorTransform;
		};

		/**
		 * @param colorTransform
		 */
		PlaceObject.prototype.setColorTransform = function(colorTransform)
		{
			let _this = this;
			_this.colorTransform = _this.cloneArray(colorTransform);
		};

		/**
		 * @returns {*}
		 */
		PlaceObject.prototype.getFilters = function()
		{
			return this.filters;
		};

		/**
		 * @param filters
		 */
		PlaceObject.prototype.setFilters = function(filters)
		{
			this.filters = filters;
		};

		/**
		 * @returns {string}
		 */
		PlaceObject.prototype.getBlendMode = function()
		{
			return this.blendMode;
		};

		/**
		 * @param blendMode
		 */
		PlaceObject.prototype.setBlendMode = function(blendMode)
		{
			let _this = this;
			_this.blendMode = _this.getBlendName(blendMode);
		};

		/**
		 * @returns {Visible}
		 */
		PlaceObject.prototype.getVisible = function()
		{
			return this.visible;
		};

		/**
		 * @param visible
		 */
		PlaceObject.prototype.setVisible = function(visible)
		{
			let _this = this;
			_this.visible = visible;
		};

		/**
		 * @param stage
		 * @param bitio
		 * @constructor
		 */
		let SwfTag = function(stage, bitio)
		{
			let _this = this;
			_this.stage = stage;
			_this.bitio = bitio;
			_this.currentPosition = {x: 0, y: 0};
			_this.jpegTables = null;
		};

		/**
		 * @param mc
		 * @returns {Array}
		 */
		SwfTag.prototype.parse = function(mc)
		{
			let _this = this;
			let length = _this.bitio.data.length;
			_this.stage.tags_offset = _this.bitio.byte_offset;
			return _this.parseTags(length, mc.characterId, 0);
		};

		/**
		 * @param tags
		 * @param parent
		 */
		SwfTag.prototype.build = function(tags, parent)
		{
			let _this = this;
			let length = tags.length;
			if (length) {
				let _showFrame = _this.showFrame;
				let originTags = [];
				for (let frame in tags) {
					if (!tags.hasOwnProperty(frame)) {
						continue;
					}
					let tag = tags[frame];
					_showFrame.call(_this, tag, parent, originTags);
				}
			}
		};

		/**
		 * @param obj
		 * @param mc
		 * @param originTags
		 */
		SwfTag.prototype.showFrame = function(obj, mc, originTags)
		{
			let _this = this;
			let _buildTag = _this.buildTag;
			let newDepth = [];
			let i;
			let tag;
			let frame = obj.frame;
			let stage = _this.stage;

			if (!(frame in originTags)) {
				originTags[frame] = [];
			}
			mc.setTotalFrames(_max(mc.getTotalFrames(), frame));

			// add ActionScript
			let actions = obj.actionScript;
			if (actions.length) {
				for (i in actions) {
					if (!actions.hasOwnProperty(i)) {
						continue;
					}
					mc.setActions(frame, actions[i]);
				}
			}

			// add label
			let labels = obj.labels;
			if (labels.length) {
				for (i in labels) {
					if (!labels.hasOwnProperty(i)) {
						continue;
					}
					let label = labels[i];
					mc.addLabel(label.frame, label.name);
				}
			}

			// add startSounds
			let startSounds = obj.startSounds;
			if (startSounds.length) {
				for (i in startSounds) {
					if (!startSounds.hasOwnProperty(i)) {
						continue;
					}
					mc.addSound(frame, startSounds[i]);
				}
			}

			let cTags = obj.cTags;
			if (cTags.length) {
				for (i in cTags) {
					if (!cTags.hasOwnProperty(i)) {
						continue;
					}
					tag = cTags[i];
					newDepth[tag.Depth] = true;
					_buildTag.call(_this, frame, tag, mc, originTags);
				}
			}

			// remove tag
			let tags = obj.removeTags;
			if (tags.length) {
				mc.setRemoveTag(frame, tags);
				for (i in tags) {
					if (!tags.hasOwnProperty(i)) {
						continue;
					}
					let rTag = tags[i];
					newDepth[rTag.Depth] = true;
				}
			}

			// copy
			if (frame > 1) {
				let prevFrame = frame - 1;
				let container = mc.container;
				if (prevFrame in container) {
					let prevTags = container[prevFrame];
					if (!(frame in container)) {
						container[frame] = [];
					}

					let length = prevTags.length;
					if (length) {
						let parentId = mc.instanceId;
						for (let d in prevTags) {
							if (!prevTags.hasOwnProperty(d)) {
								continue;
							}
							if (d in newDepth) {
								continue;
							}
							container[frame][d] = prevTags[d];
							stage.copyPlaceObject(parentId, d, frame);
							originTags[frame][d] = originTags[prevFrame][d];
						}
					}
				}
			}
		};

		/**
		 * @param frame
		 * @param tag
		 * @param parent
		 * @param originTags
		 */
		SwfTag.prototype.buildTag = function(frame, tag, parent, originTags)
		{
			let _this = this;
			let container = parent.container;
			if (!(frame in container)) {
				container[frame] = [];
			}

			let isCopy = true;
			if (tag.PlaceFlagMove) {
				let oTag = originTags[frame - 1][tag.Depth];
				if (oTag !== undefined) {
					if (tag.PlaceFlagHasCharacter) {
						if (tag.CharacterId !== oTag.CharacterId) {
							isCopy = false;
						}
					} else {
						tag.PlaceFlagHasCharacter = oTag.PlaceFlagHasCharacter;
						tag.CharacterId = oTag.CharacterId;
					}

					if (!tag.PlaceFlagHasMatrix && oTag.PlaceFlagHasMatrix) {
						tag.PlaceFlagHasMatrix = oTag.PlaceFlagHasMatrix;
						tag.Matrix = oTag.Matrix;
					}

					if (!tag.PlaceFlagHasColorTransform && oTag.PlaceFlagHasColorTransform) {
						tag.PlaceFlagHasColorTransform = oTag.PlaceFlagHasColorTransform;
						tag.ColorTransform = oTag.ColorTransform;
					}

					if (!tag.PlaceFlagHasClipDepth && oTag.PlaceFlagHasClipDepth) {
						tag.PlaceFlagHasClipDepth = oTag.PlaceFlagHasClipDepth;
						tag.ClipDepth = oTag.ClipDepth;
					}

					if (!tag.PlaceFlagHasClipActions && oTag.PlaceFlagHasClipActions) {
						tag.PlaceFlagHasClipActions = oTag.PlaceFlagHasClipActions;
						tag.ClipActionRecords = oTag.ClipActionRecords;
					}

					if (!tag.PlaceFlagHasRatio && !isCopy) {
						tag.PlaceFlagHasRatio = 1;
						tag.Ratio = frame - 1;
					}

					if (!tag.PlaceFlagHasFilterList && oTag.PlaceFlagHasFilterList) {
						tag.PlaceFlagHasFilterList = oTag.PlaceFlagHasFilterList;
						tag.SurfaceFilterList = oTag.SurfaceFilterList;
					}

					if (!tag.PlaceFlagHasBlendMode && oTag.PlaceFlagHasBlendMode) {
						tag.PlaceFlagHasBlendMode = oTag.PlaceFlagHasBlendMode;
						tag.BlendMode = oTag.BlendMode;
					}

					if (!tag.PlaceFlagHasVisible && oTag.PlaceFlagHasVisible) {
						tag.PlaceFlagHasVisible = oTag.PlaceFlagHasVisible;
						tag.Visible = oTag.Visible;
					}
				}
			}

			originTags[frame][tag.Depth] = tag;
			let buildObject = _this.buildObject(tag, parent, isCopy, frame);
			if (buildObject) {
				let stage = _this.stage;
				let placeObject = _this.buildPlaceObject(tag);
				stage.setPlaceObject(placeObject, parent.instanceId, tag.Depth, frame);
				container[frame][tag.Depth] = buildObject.instanceId;
			}
		};

		/**
		 * @param tag
		 * @param parent
		 * @param isCopy
		 * @param frame
		 * @returns {*}
		 */
		SwfTag.prototype.buildObject = function(tag, parent, isCopy, frame)
		{
			let _this = this;
			let stage = _this.stage;
			let char = stage.getCharacter(tag.CharacterId);
			let tagType = char.tagType;
			let isMorphShape = false;
			if (tagType === 46 || tagType === 84) {
				isMorphShape = true;
			}

			let obj = {};
			if (!isMorphShape && tag.PlaceFlagMove && isCopy) {
				let id = parent.container[frame - 1][tag.Depth];
				obj = stage.getInstance(id);
			} else {
				if (char instanceof Array) {
					obj = _this.buildMovieClip(tag, char, parent);
				} else {
					switch (tagType) {
						case 11: // DefineText
						case 33: // DefineText2
							obj = _this.buildText(tag, char);
							break;
						case 37: // DefineEditText
							obj = _this.buildTextField(tag, char, parent);
							break;
						case 2: // DefineShape
						case 22: // DefineShape2
						case 32: // DefineShape3
						case 83: // DefineShape4
							obj = _this.buildShape(tag, char);
							break;
						case 46: // MorphShape
						case 84: // MorphShape2
							let MorphShape = _this.buildMorphShape(char, tag.Ratio);
							MorphShape.tagType = tagType;
							obj = _this.buildShape(tag, MorphShape);
							break;
						case 7: // DefineButton
						case 34: // DefineButton2
							obj = _this.buildButton(char, tag, parent);
							break;
						default:
							return 0;
					}
				}
				obj.setParent(parent);
				obj.setStage(stage);
				obj.setCharacterId(tag.CharacterId);
				obj.setRatio(tag.Ratio || 0);
				obj.setLevel(tag.Depth);
			}

			if (tag.PlaceFlagHasClipDepth) {
				obj.isClipDepth = true;
				obj.clipDepth = tag.ClipDepth;
			}

			return obj;
		};

		/**
		 * @param tag
		 * @returns {PlaceObject}
		 */
		SwfTag.prototype.buildPlaceObject = function(tag)
		{
			let placeObject = new PlaceObject();
			// Matrix
			if (tag.PlaceFlagHasMatrix) {
				placeObject.setMatrix(tag.Matrix);
			}
			// ColorTransform
			if (tag.PlaceFlagHasColorTransform) {
				placeObject.setColorTransform(tag.ColorTransform);
			}
			// Filter
			if (tag.PlaceFlagHasFilterList) {
				placeObject.setFilters(tag.SurfaceFilterList);
			}
			// BlendMode
			if (tag.PlaceFlagHasBlendMode) {
				placeObject.setBlendMode(tag.BlendMode);
			}
			// Visibility
			if (tag.PlaceFlagHasVisible) {
				placeObject.setVisible(tag.Visible);
			}
			return placeObject;
		};


		/**
		 * @param tag
		 * @param character
		 * @param parent
		 * @returns {MovieClip}
		 */
		SwfTag.prototype.buildMovieClip = function(tag, character, parent)
		{
			let _this = this;
			let stage = _this.stage;
			let mc = new MovieClip();
			mc.setStage(stage);
			mc._url = parent._url;
			let target = "instance" + mc.instanceId;
			if (tag.PlaceFlagHasName) {
				mc.setName(tag.Name);
				target = tag.Name;
			}
			mc.setTarget(parent.getTarget() + "/" + target);
			_this.build(character, mc);

			if (tag.PlaceFlagHasClipActions) {
				let ClipActionRecords = tag.ClipActionRecords;
				let length = ClipActionRecords.length;
				let eventName;
				for (let i = 0; i < length; i++) {
					let actionRecord = ClipActionRecords[i];
					let eventFlag = actionRecord.EventFlags;
					for (eventName in eventFlag) {
						if (!eventFlag.hasOwnProperty(eventName)) {
							continue;
						}
						if (!eventFlag[eventName]) {
							continue;
						}
						let action = mc.createActionScript(actionRecord.Actions);
						mc.addEventListener(eventName, action);
					}
				}
			}

			return mc;
		};

		/**
		 * @param tag
		 * @param character
		 * @param parent
		 * @returns {TextField}
		 */
		SwfTag.prototype.buildTextField = function(tag, character, parent)
		{
			let _this = this;
			let stage = _this.stage;

			let textField = new TextField();
			textField.setStage(stage);
			textField.setParent(parent);
			textField.setInitParams();
			textField.setTagType(character.tagType);
			textField.setBounds(character.bounds);
			let target = "instance" + textField.instanceId;
			if (tag.PlaceFlagHasName) {
				textField.setName(tag.Name);
				target = tag.Name;
			}
			textField.setTarget(parent.getTarget() + "/" + target);

			let data = character.data;
			let obj = {};
			let fontData = null;
			let fontId = data.FontID;
			if (data.HasFont) {
				fontData = stage.getCharacter(fontId);
			}

			textField.fontId = fontId;
			textField.fontScale = data.FontHeight / 1024;
			if (fontData && fontData.ZoneTable) {
				textField.fontScale /= 20;
			}
			textField.initialText = data.InitialText;
			obj.autoSize = data.AutoSize;
			obj.border = data.Border;
			if (obj.border) {
				obj.background = 1;
			}
			obj.bottomScroll = 1;
			obj.condenseWhite = 0;
			obj.embedFonts = (data.HasFont && data.UseOutlines && fontData.FontFlagsHasLayout && !data.Password) ? 1 : 0;
			obj.hscroll = 0;
			obj.maxscroll = 0;
			obj.scroll = 0;
			obj.maxhscroll = 0;
			obj.html = data.HTML;
			obj.htmlText = (data.HTML) ? data.InitialText : null;
			obj.length = 0;
			obj.maxChars = 0;
			obj.multiline = data.Multiline;
			obj.password = data.Password;
			obj.selectable = data.NoSelect;
			obj.tabEnabled = 0;
			obj.tabIndex = 0;
			obj.text = data.InitialText;
			obj.textColor = data.TextColor;
			obj.textHeight = 0;
			obj.textWidth = 0;
			obj.type = data.ReadOnly ? "dynamic" : "input";

			let variable = data.VariableName;
			obj.variable = variable;
			if (variable) {
				parent.setVariable(variable, data.InitialText);
			}

			obj.wordWrap = data.WordWrap;

			// TextFormat
			obj.blockIndent = 0;
			obj.bullet = 0;

			if (fontData) {
				obj.bold = fontData.FontFlagsBold;
				let font = textField.getVariable("font");
				obj.font = "'" + fontData.FontName + "', " + font;
				obj.italic = fontData.FontFlagsItalic;
			}

			if (data.HasLayout) {
				switch (data.Align) {
					case 1:
						obj.align = "right";
						break;
					case 2:
						obj.align = "center";
						break;
					case 3:
						obj.align = "justify";
						break;
				}
				obj.leftMargin = data.LeftMargin;
				obj.rightMargin = data.RightMargin;
				obj.indent = data.Indent;
				obj.leading = (14400 > data.Leading) ? data.Leading : data.Leading - 65535;
			}

			obj.size = data.FontHeight / 20;
			obj.tabStops = [];
			obj.target = null;
			obj.underline = 0;
			obj.url = null;

			for (let name in obj) {
				if (!obj.hasOwnProperty(name)) {
					continue;
				}
				textField.setProperty(name, obj[name]);
			}

			if (obj.type === "input") {
				textField.setInputElement();
			}

			return textField;
		};

		/**
		 * @param tag
		 * @param character
		 * @returns {StaticText}
		 */
		SwfTag.prototype.buildText = function(tag, character)
		{
			let _this = this;
			let stage = _this.stage;
			let staticText = new StaticText();
			staticText.setTagType(character.tagType);
			staticText.setBounds(character.bounds);

			let records = character.textRecords;
			let length = records.length;
			let offsetX = 0;
			let offsetY = 0;
			let scale = 1;
			let textHeight = 0;
			let ShapeTable = null;
			let cMatrix = character.matrix;
			let color = null;
			let isZoneTable = false;
			for (let i = 0; i < length; i++) {
				let record = records[i];
				if ("FontId" in record) {
					let fontId = record.FontId;
					let fontData = stage.getCharacter(fontId);
					ShapeTable = fontData.GlyphShapeTable;
					isZoneTable = false;
					if ("ZoneTable" in fontData) {
						isZoneTable = true;
					}
				}
				if ("XOffset" in record) {
					offsetX = record.XOffset;
				}
				if ("YOffset" in record) {
					offsetY = record.YOffset;
				}
				if ("TextColor" in record) {
					color = record.TextColor;
				}
				if ("TextHeight" in record) {
					textHeight = record.TextHeight;
					if (isZoneTable) {
						textHeight /= 20;
					}
				}

				let entries = record.GlyphEntries;
				let count = record.GlyphCount;
				scale = textHeight / 1024;
				for (let idx = 0; idx < count; idx++) {
					let entry = entries[idx];
					let shapes = ShapeTable[entry.GlyphIndex];
					let data = vtc.convert(shapes);
					let matrix = [scale, cMatrix[1], cMatrix[2], scale, cMatrix[4] + offsetX, cMatrix[5] + offsetY];
					let textRecode = new TextRecord();
					textRecode.setData(data);
					textRecode.setColor(color);
					textRecode.setMatrix(matrix);
					staticText.addRecord(textRecode);
					offsetX += entry.GlyphAdvance;
				}
			}

			return staticText;
		};

		SwfTag.prototype.gradientSpreadMode = function(gradient)
		{
			let SpreadMode = gradient.SpreadMode;
			let GradientRecords = gradient.GradientRecords;
			let NumGradients = GradientRecords.length;
			if (SpreadMode == 1) { // reflect mode
				let ReflectGradientRecords = [];
				let t = 0.0, r = 0, step = 1/NumGradients*0.5, last = NumGradients-1; ///2.0;
				while (t<1.0) {
					if (GradientRecords[0].Ratio != 0) {
						ReflectGradientRecords[r] = {
							Ratio: 0,
							Color: GradientRecords[0].Color
						};
						r++;
					}
					// Add the colors forward.
					for (let i=0; i<NumGradients; i++) {
						ReflectGradientRecords[r] = {
							Ratio: t+GradientRecords[i].Ratio*step,
							Color: GradientRecords[i].Color
						};
						r++;
					}
					t += step;
					if (GradientRecords[last].Ratio != 1) {
						ReflectGradientRecords[r] = {
							Ratio: 1,
							Color: GradientRecords[last].Color
						};
						r++;
					}
					// Add the colors backward.
					for (let i=NumGradients-1; i>=0; i--) {
						ReflectGradientRecords[r] = {
							Ratio: t+(1-GradientRecords[i].Ratio)*step,
							Color: GradientRecords[i].Color
						};
						r++;
					}
					t += step;
				}
				gradient.GradientRecords = ReflectGradientRecords;
				gradient.Adapted = true;

			} else if (SpreadMode == 2) { // repeat mode
				let RepeatGradientRecords = [];
				let NumRepeats = 4;
				let t = 0.0, r=0, step = 1/NumRepeats, last = NumGradients-1;
				while (t<1.0) {
					// Duplicate the start/end stops to ensure we don't blend between the seams.
					if (GradientRecords[0].Ratio != 0) {
						RepeatGradientRecords[r] = {
							Ratio: 0,
							Color: GradientRecords[0].Color
						};
						r++;
					}
					for (let i=0; i<NumGradients; i++) {
						RepeatGradientRecords[r] = {
							Ratio: t+GradientRecords[i].Ratio*step,
							Color: GradientRecords[i].Color
						};
						r++;
					}
					if (GradientRecords[last].Ratio != 1) {
						RepeatGradientRecords[r] = {
							Ratio: 1,
							Color: GradientRecords[last].Color
						};
						r++;
					}
					t += step;
				}
				gradient.GradientRecords = RepeatGradientRecords;
				gradient.Adapted = true;
			}
			return gradient;
		};

		/**
		 * @param tag
		 * @param character
		 * @returns {Shape}
		 */
		SwfTag.prototype.buildShape = function(tag, character)
		{
			let _this = this;
			let shape = new Shape();
			shape.setTagType(character.tagType);
			shape.setBounds(character.bounds);
			if (character.data.gradient && character.data.gradient.SpreadMode) character.data = _this.spreadMode(character.data);
			shape.setData(character.data);
			return shape;
		};

		/**
		 * @param character
		 * @param tag
		 * @param parent
		 * @returns {SimpleButton}
		 */
		SwfTag.prototype.buildButton = function(character, tag, parent)
		{
			let _this = this;
			let stage = _this.stage;
			let characters = character.characters;
			let button = new SimpleButton();
			button.setStage(stage);
			button.setParent(parent);
			button.setLevel(tag.Depth);

			if ("actions" in character) {
				button.setActions(character.actions);
			}

			let target = "instance" + button.instanceId;
			if (tag.PlaceFlagHasName) {
				button.setName(tag.Name);
				target = tag.Name;
			}
			button.setTarget(parent.getTarget() + "/" + target);

			// OverUpToOverDown : Press, down
			let downState = button.getSprite("down");
			if (character.ButtonStateDownSoundId) {
				downState.soundId = character.ButtonStateDownSoundId;
				downState.soundInfo = character.ButtonStateDownSoundInfo;
			}

			// OverDownToOverUp : Release, hit
			let hitState = button.getSprite("hit");
			if (character.ButtonStateHitTestSoundId) {
				hitState.soundId = character.ButtonStateHitTestSoundId;
				hitState.soundInfo = character.ButtonStateHitTestSoundInfo;
			}

			// IdleToOverUp : Roll Over, over
			let overState = button.getSprite("over");
			if (character.ButtonStateOverSoundId) {
				overState.soundId = character.ButtonStateOverSoundId;
				overState.soundInfo = character.ButtonStateOverSoundInfo;
			}

			// OverUpToIdle : Roll Out, up
			let upState = button.getSprite("up");
			if (character.ButtonStateUpSoundId) {
				upState.soundId = character.ButtonStateUpSoundId;
				upState.soundInfo = character.ButtonStateUpSoundInfo;
			}

			for (let depth in characters) {
				if (!characters.hasOwnProperty(depth)) {
					continue;
				}

				let tags = characters[depth];
				for (let idx in tags) {
					if (!tags.hasOwnProperty(idx)) {
						continue;
					}

					let bTag = tags[idx];
					let obj = _this.buildObject(bTag, button, false, 1);
					let placeObject = _this.buildPlaceObject(bTag);
					let Depth = bTag.Depth;
					if (bTag.ButtonStateDown) {
						downState.addTag(Depth, obj);
						stage.setPlaceObject(placeObject, downState.instanceId, Depth, 0);
					}
					if (bTag.ButtonStateHitTest) {
						hitState.addTag(Depth, obj);
						stage.setPlaceObject(placeObject, hitState.instanceId, Depth, 0);
					}
					if (bTag.ButtonStateOver) {
						overState.addTag(Depth, obj);
						stage.setPlaceObject(placeObject, overState.instanceId, Depth, 0);
					}
					if (bTag.ButtonStateUp) {
						upState.addTag(Depth, obj);
						stage.setPlaceObject(placeObject, upState.instanceId, Depth, 0);
					}
				}
			}

			button.setSprite("down", downState);
			button.setSprite("hit", hitState);
			button.setSprite("over", overState);
			button.setSprite("up", upState);
			button.setTagType(character.tagType);
			return button;
		};

		/**
		 * @param frame
		 * @param characterId
		 * @returns {{ }}
		 */
		SwfTag.prototype.generateDefaultTagObj = function(frame, characterId)
		{
			return {
				frame: frame,
				characterId: characterId,
				cTags: [],
				removeTags: [],
				actionScript: [],
				labels: [],
				startSounds: []
			};
		};
		let TagTypes = [
			[ 0, "End"],
			[ 1, "ShowFrame"],
			[ 2, "DefineShape"],
			[ 3, "FreeCharacter"],
			[ 4, "PlaceObject"],
			[ 5, "RemoveObject"],
			[ 6, "DefineBits"],
			[ 7, "DefineButton"],
			[ 8, "JPEGTables"],
			[ 9, "SetBackgroundColor"],
			[ 10, "DefineFont"],
			[ 11, "DefineText"],
			[ 12, "DoAction"],
			[ 13, "DefineFontInfo"],
			[ 14, "DefineSound"],
			[ 15, "StartSound"],
			[ 16, "StopSound"],
			[ 17, "DefineButtonSound"],
			[ 18, "SoundStreamHead"],
			[ 19, "SoundStreamBlock"],
			[ 20, "DefineBitsLossless"],
			[ 21, "DefineBitsJPEG2"],
			[ 22, "DefineShape2"],
			[ 23, "DefineButtonCxform"],
			[ 24, "Protect"],
			[ 25, "PathsArePostScript"],
			[ 26, "PlaceObject2"],
			[ 28, "RemoveObject2"],
			[ 29, "SyncFrame"],
			[ 31, "FreeAll"],
			[ 32, "DefineShape3"],
			[ 33, "DefineText2"],
			[ 34, "DefineButton2"],
			[ 35, "DefineBitsJPEG3"],
			[ 36, "DefineBitsLossless2"],
			[ 37, "DefineEditText"],
			[ 38, "DefineVideo"],
			[ 39, "DefineSprite"],
			[ 40, 'NameCharacter'],
			[ 41, 'ProductInfo'],
			[ 42, 'DefineTextFormat'],
			[ 43, "FrameLabel"],
			[ 44, "DefineBehavior"],
			[ 45, "SoundStreamHead2"],
			[ 46, "DefineMorphShape"],
			[ 47, "FrameTag"],
			[ 48, "DefineFont2"],
			[ 49, "GeProSet"],
			[ 52, "FontRef"],
			[ 54, "PlaceFunction"],
			[ 55, "GenTagObject"],
			[ 56, "ExportAssets"],
			[ 57, "ImportAssets"],
			[ 58, "EnableDebugger"],
			[ 59, "DoInitAction"],
			[ 60, "DefineVideoStream"],
			[ 61, "VideoFrame"],
			[ 62, "DefineFontInfo2"],
			[ 63, "DebugID"],
			[ 64, "EnableDebugger2"],
			[ 65, "ScriptLimits"],
			[ 66, "SetTabIndex"],
			[ 69, "FileAttributes"],
			[ 70, "PlaceObject3"],
			[ 71, "ImportAssets2"],
			[ 72, "DoABC"],
			[ 73, "DefineFontAlignZones"],
			[ 74, "CSMTextSettings"],
			[ 75, "DefineFont3"],
			[ 76, "SymbolClass"],
			[ 77, "Metadata"],
			[ 78, "DefineScalingGrid"],
			[ 82, "DoABC2"],
			[ 83, "DefineShape4"],
			[ 84, "DefineMorphShape2"],
			[ 86, "DefineSceneAndFrameLabelData"],
			[ 87, "DefineBinaryData"],
			[ 88, "DefineFontName"],
			[ 89, "StartSound2"],
			[ 90, "DefineBitsJPEG4"],
			[ 91, "DefineFont4"],
			[ 93, "EnableTelemetry"]
		];

		/**
		 * @param dataLength
		 * @param characterId
		 * @returns {Array}
		 */
		SwfTag.prototype.parseTags = function(dataLength, characterId, tagLevel)
		{
			let _this = this;
			_this.tagLevel = tagLevel;
			let _parseTag = _this.parseTag;
			let _addTag = _this.addTag;
			let _generateDefaultTagObj = _this.generateDefaultTagObj;
			let frame = 1;
			let stage = _this.stage;
			_this.lastFrame = -1;
			stage.currentFrame = frame;
			let tags = [];
			let tagType = 0;
			let bitio = _this.bitio;

			// default set
			tags[frame] = _generateDefaultTagObj.call(_this, frame, characterId);

			while (bitio.byte_offset < dataLength) {
				let tagStartOffset = bitio.byte_offset;
				if (tagStartOffset + 2 > dataLength) {
					break;
				}

				let pos = { byte: bitio.byte_offset, bit: bitio.bit_offset, value: bitio.data[bitio.byte_offset]};
				let tagLength = bitio.getUI16();
				tagType = tagLength >> 6;

				// long
				let length = tagLength & 0x3f;
				if (length === 0x3f) {
					if (tagStartOffset + 6 > dataLength) {
						bitio.byte_offset = tagStartOffset;
						bitio.bit_offset = 0;
						break;
					}
					length = bitio.getUI32();
				}

				let tagDataStartOffset = bitio.byte_offset;
				// ShowFrame
				if (tagType === 1) {
					frame++;
					stage.currentFrame = frame;

					if (dataLength > tagDataStartOffset + 2) {
						tags[frame] = _generateDefaultTagObj.call(_this, frame, characterId);
					}
				}
				if (stage.debug) {
					const l = (tagType == 39)?4:length;
					stage.tags_total+=l;
					const spaces = '    ' ;
					const t = TagTypes.filter(element => element[0] == tagType);
					const tt = t.length==0?'Unknown tag '+tagType.toString():t[0][1];
					stage.debug_lines.push(pos.byte.toString().padStart(6, ' ')+'/'+pos.bit+' '+pos.value.toString(2).padStart(8, '0')+' ['+tagType.toString(16).padStart(3,'0')+'] '+
					l.toString().padStart(9,' ')+' '+
						(stage.tags_total).toString().padStart(9,' ')+' '+spaces.repeat(stage.tagLevel)+
						tt);
				}

				let tag = _parseTag.call(_this, tagType, length, _this.tagLevel);

				let o = bitio.byte_offset - tagDataStartOffset;
				if (o !== length) {
					if (o < length) {
						let b = bitio.bit_offset>0?1:0;
						if (o+b<length) {
							const t = TagTypes.filter(element => element[0] == tagType);
							const tt = t.length==0?' Unknown tag '+tagType.toString():' '+t[0][1];
							let cid = tag?(tag.CharacterId?' CharacterId: '+tag.CharacterId:''):'';
							console.log('Bitio: offset: '+pos.byte+' length: '+length+' read: '+o+'  tagType: '+tagType+tt+' '+cid);
							console.log(JSON.stringify(tag,null,' '));
						}
						let eat = (length - o);
						if (eat > 0) {
							bitio.byte_offset += eat;
						}
					} else {
						const t = TagTypes.filter(element => element[0] == tagType);
						const tt = t.length==0?' Unknown tag '+tagType.toString():' '+t[0][1];
						let cid = tag?(tag.CharacterId?' CharacterId: '+tag.CharacterId:''):'';
						console.log('Error bitio: offset: '+pos.byte+' length: '+length+' read: '+o+'  tagType: '+tagType+' '+TagTypes[tagType]+tt+' '+cid);
					}
				}

				if (tag) {
					tags = _addTag.call(_this, tagType, tags, tag, frame);
				}

				bitio.bit_offset = 0;
			}
			return tags;
		};

		/**
		 * @param tagType
		 * @param length
		 * @returns {*}
		 */
		SwfTag.prototype.parseTag = function(tagType, length, tagLevel)
		{
			let _this = this;
			let obj = null;
			let bitio = _this.bitio;
			let stage = _this.stage;

			switch (tagType) {
				case 0: // End
					break;
				case 1: // ShowFrame
					break;
				case 2: // DefineShape
				case 22: // DefineShape2
				case 32: // DefineShape3
				case 83: // DefineShape4
					if (length < 10) {
						bitio.byte_offset += length;
					} else {
						_this.parseDefineShape(tagType);
					}
					break;
				case 9: // BackgroundColor
					if (stage.bgcolor) {
						stage.backgroundColor = stage.bgcolor;
					} else {
						stage.setBackgroundColor(
							bitio.getUI8(),
							bitio.getUI8(),
							bitio.getUI8()
						);
					}
					break;
				case 10: // DefineFont
				case 48: // DefineFont2
				case 75: // DefineFont3
					_this.parseDefineFont(tagType, length);
					break;
				case 13: // DefineFontInfo
				case 62: // DefineFontInfo2
					_this.parseDefineFontInfo(tagType, length);
					break;
				case 11: // DefineText
				case 33: // DefineText2
					_this.parseDefineText(tagType);
					break;
				case 4: // PlaceObject
				case 26: // PlaceObject2
				case 70: // PlaceObject3
				case 94: // PlaceObject4
					obj = _this.parsePlaceObject(tagType, length);
					break;
				case 37: // DefineEditText
					_this.parseDefineEditText(tagType);
					break;
				case 39: // DefineSprite
					_this.parseDefineSprite(bitio.byte_offset + length,tagLevel);
					break;
				case 12: // DoAction
					// DoAction should be ignored if SWF-version>= 9 and ActionScript3
					if (parseInt(stage.version)>=9 && stage.SWF_HAS_AS3)
						console.warn('DoAction should be ignored for SWF '+stage.version+' (>=9) with Actionscript 3.');
					obj = _this.parseDoAction(length);
					break;
				case 59: // DoInitAction
					_this.parseDoInitAction(length);
					break;
				case 5: // RemoveObject
				case 28: // RemoveObject2
					obj = _this.parseRemoveObject(tagType);
					break;
				case 7: // DefineButton
				case 34: // DefineButton2
					obj = _this.parseDefineButton(tagType, length);
					break;
				case 43: // FrameLabel
					obj = _this.parseFrameLabel();
					break;
				case 88: // DefineFontName
					_this.parseDefineFontName();
					break;
				case 20: // DefineBitsLossless
				case 36: // DefineBitsLossless2
					_this.parseDefineBitsLossLess(tagType, length);
					break;
				case 6: // DefineBits
				case 21: // DefineBitsJPEG2
				case 35: // DefineBitsJPEG3
				case 90: // DefineBitsJPEG4
					_this.parseDefineBits(tagType, length, _this.jpegTables);
					_this.jpegTables = null;
					break;
				case 8: // JPEGTables
					_this.jpegTables = _this.parseJPEGTables(length);
					break;
				case 56: // ExportAssets
					_this.parseExportAssets();
					break;
				case 46: // DefineMorphShape
				case 84: // DefineMorphShape2
					_this.parseDefineMorphShape(tagType);
					break;
				case 40: // NameCharacter
					bitio.getUI16(); // CharacterId
					bitio.getDataUntil("\0"); // NameCharacter
					break;
				case 24: // Protect
					if (length) bitio.readString(); // passwordHash MD5
					else bitio.byteAlign();
					break;
				case 63: // DebugID
					bitio.getUI8(); // UUID
					break;
				case 64: // EnableDebugger2
					bitio.getUI16(); // Reserved
					bitio.getDataUntil("\0"); // Password
					break;
				case 65: // ScriptLimits
					bitio.getUI16(); // MaxRecursionDepth
					bitio.getUI16(); // ScriptTimeoutSeconds
					break;
				case 69: // FileAttributes
					_this.parseFileAttributes();
					break;
				case 77: // MetaData
					bitio.getDataUntil("\0"); // MetaData
					break;
				case 86: // DefineSceneAndFrameLabelData
					obj = _this.parseDefineSceneAndFrameLabelData();
					break;
				case 18: // SoundStreamHead
				case 45: // SoundStreamHead2
					_this.parseSoundStreamHead(tagType);
					break;
				case 72: // DoABC
				case 82: // DoABC2
					_this.parseDoABC(tagType, length);
					break;
				case 76: // SymbolClass
					_this.parseSymbolClass();
					break;
				case 14: // DefineSound
					stage.soundCount++;
					_this.parseDefineSound(tagType, length);
					break;
				case 15: // StartSound
				case 89: // StartSound2
					obj = _this.parseStartSound(tagType);
					break;
				case 17: // DefineButtonSound
					_this.parseDefineButtonSound();
					break;
				case 73: // DefineFontAlignZones
					_this.parseDefineFontAlignZones();
					break;
				case 74: // CSMTextSettings
					_this.parseCSMTextSettings(tagType);
					break;
				case 19: // SoundStreamBlock
					_this.parseSoundStreamBlock(tagType, length);
					break;
				case 60: // DefineVideoStream
					_this.parseDefineVideoStream(tagType);
					break;
				case 61: // VideoFrame
					_this.parseVideoFrame(tagType, length);
					break;
				case 78: // DefineScalingGrid
					_this.parseDefineScalingGrid();
					break;
				case 41: // ProductInfo
					stage.ProductInfo = {};
					stage.ProductInfo.ProductId = bitio.getUI32(); // ProductID
					stage.ProductInfo.Edition = bitio.getUI32(); // Edition
					stage.ProductInfo.MajorVersion = bitio.getUI8(); // MajorVersion
					stage.ProductInfo.MinorVersion = bitio.getUI8(); // MinorVersion
					stage.ProductInfo.BuildLow = bitio.getUI32(); // BuildLow
					stage.ProductInfo.BuildHigh = bitio.getUI32(); // BuildHigh
					stage.ProductInfo.CompilationDate = bitio.getUI32(); // CompilationDate
					bitio.getUI32(); // TODO
					break;
				case 3: // FreeCharacter
				case 16: // StopSound
				case 23: // DefineButtonCxform
				case 25: // PathsArePostScript
				case 29: // SyncFrame
				case 31: // FreeAll
				case 38: // DefineVideo
				case 42: // DefineTextFormat
				case 44: // DefineBehavior
				case 47: // FrameTag
				case 49: // GeProSet
				case 52: // FontRef
				case 53: // DefineFunction
				case 54: // PlaceFunction
				case 55: // GenTagObject
				case 57: // ImportAssets
				case 58: // EnableDebugger
				case 66: // SetTabIndex
				case 71: // ImportAssets2
				case 87: // DefineBinaryData
				case 91: // DefineFont4
				case 93: // EnableTelemetry
					console.log("[base] tagType -> " + tagType);
					break;
				case 27: // 27 (invalid)
				case 30: // 30 (invalid)
				case 67: // 67 (invalid)
				case 68: // 68 (invalid)
				case 79: // 79 (invalid)
				case 80: // 80 (invalid)
				case 81: // 81 (invalid)
				case 85: // 85 (invalid)
				case 92: // 92 (invalid)
					console.log("invalid tagType -> " + tagType);
					break;
				default: // null
					console.log("null tagType -> " + tagType);
					break;
			}

			return obj;
		};

		/**
		 * @param tagType
		 * @param tags
		 * @param tag
		 * @param frame
		 * @returns {*}
		 */
		SwfTag.prototype.addTag = function(tagType, tags, tag, frame)
		{
			let tagsArray = tags[frame];
			switch (tagType) {
				case 4: // PlaceObject
				case 26: // PlaceObject2
				case 70: // PlaceObject3
				case 94: // PlaceObject4
					let cTags = tagsArray.cTags;
					tagsArray.cTags[cTags.length] = tag;
					break;
				case 12: // DoAction
					let as = tagsArray.actionScript;
					tagsArray.actionScript[as.length] = tag;
					break;
				case 5: // RemoveObject
				case 28: // RemoveObject2
					let removeTags = tagsArray.removeTags;
					tagsArray.removeTags[removeTags.length] = tag;
					break;
				case 43: // FrameLabel
					let labels = tagsArray.labels;
					tag.frame = frame;
					tagsArray.labels[labels.length] = tag;
					break;
				case 15: // StartSound
				case 89: // StartSound2
					let startSounds = tagsArray.startSounds;
					tagsArray.startSounds[startSounds.length] = tag;
					break;
			}

			return tags;
		};

		/**
		 * @param tagType
		 */
		SwfTag.prototype.parseDefineShape = function(tagType)
		{
			let _this = this;
			let bitio = _this.bitio;
			let characterId = bitio.getUI16();
			let bounds = _this.rect();

			if (tagType === 83) {
				let obj = {};
				obj.EdgeBounds = _this.rect();
				bitio.getUIBits(5); // Reserved
				obj.UsesFillWindingRule = bitio.getUIBits(1);
				obj.UsesNonScalingStrokes = bitio.getUIBits(1);
				obj.UsesScalingStrokes = bitio.getUIBits(1);
			}

			let shapes = _this.shapeWithStyle(tagType);
			_this.appendShapeTag(characterId, bounds, shapes, tagType);
		};

		/**
		 * @returns {{xMin: number, xMax: number, yMin: number, yMax: number}}
		 */
		SwfTag.prototype.rect = function()
		{
			let bitio = this.bitio;

			let nBits = bitio.getUIBits(5);
			let ret = {
				xMin: bitio.getSIBits(nBits),
				xMax: bitio.getSIBits(nBits),
				yMin: bitio.getSIBits(nBits),
				yMax: bitio.getSIBits(nBits)
			};
			bitio.byteAlign();
			return ret;
		};

		/**
		 * @param tagType
		 * @returns {{}}
		 */
		SwfTag.prototype.shapeWithStyle = function(tagType)
		{
			let _this = this;
			let bitio = _this.bitio;
			let fillStyles;
			let lineStyles;

			if (tagType === 46 || tagType === 84) {
				fillStyles = {fillStyleCount: 0, fillStyles: []};
				lineStyles = {lineStyleCount: 0, lineStyles: []};
			} else {
				fillStyles = _this.fillStyleArray(tagType);
				lineStyles = _this.lineStyleArray(tagType);
			}

			//let numBits = bitio.getUI8();
			//let NumFillBits = numBits >> 4;
			//let NumLineBits = numBits & 0x0f;
			let NumFillBits = bitio.getUIBits(4);
			let NumLineBits = bitio.getUIBits(4);
			let ShapeRecords = _this.shapeRecords(tagType, {
				FillBits: NumFillBits,
				LineBits: NumLineBits
			});

			return {
				fillStyles: fillStyles,
				lineStyles: lineStyles,
				ShapeRecords: ShapeRecords
			};
		};

		/**
		 * @param tagType
		 * @returns {{}}
		 */
		SwfTag.prototype.fillStyleArray = function(tagType)
		{
			let _this = this;
			let bitio = _this.bitio;
			let fillStyleCount = bitio.getUI8();
			if ((tagType > 2) && (fillStyleCount === 0xff)) {
				fillStyleCount = bitio.getUI16();
			}

			let fillStyles = [];
			for (let i = fillStyleCount; i--;) {
				fillStyles[fillStyles.length] = _this.fillStyle(tagType);
			}

			return {
				fillStyleCount: fillStyleCount,
				fillStyles: fillStyles
			};
		};

		/**
		 * @param tagType
		 * @returns {{}}
		 */
		SwfTag.prototype.fillStyle = function(tagType)
		{
			let _this = this;
			let bitio = _this.bitio;
			let obj = {};
			let bitType = bitio.getUI8();
			obj.fillStyleType = bitType;
			switch (bitType) {
				case 0x00: // solid fill
					if (tagType === 32 || tagType === 83) {
						obj.Color = _this.rgba();
					} else if (tagType === 46 || tagType === 84) {
						obj.StartColor = _this.rgba();
						obj.EndColor = _this.rgba();
					} else {
						obj.Color = _this.rgb();
					}
					break;
				case 0x10: // linear gradient fill
				case 0x12: // radial gradient fill
					if (tagType === 46 || tagType === 84) {
						obj.startGradientMatrix = _this.matrix();
						obj.endGradientMatrix = _this.matrix();
						obj.gradient = _this.gradient(tagType);
					} else {
						obj.gradientMatrix = _this.matrix();
						obj.gradient = _this.gradient(tagType);
						if (obj.gradient.SpreadMode) obj.gradient = _this.gradientSpreadMode(obj.gradient);
					}
					break;
				case 0x13: // focal radial gradient fill (SWF 8 file format and later only)
					if (tagType === 46 || tagType === 84) {
						obj.startGradientMatrix = _this.matrix();
						obj.endGradientMatrix = _this.matrix();
						obj.gradient = _this.focalGradient(tagType);
					} else {
						obj.gradientMatrix = _this.matrix();
						obj.gradient = _this.focalGradient(tagType);
						if (obj.gradient.SpreadMode) obj.gradient = _this.gradientSpreadMode(obj.gradient);
					}
					break;
				case 0x40: // repeating bitmap fill
				case 0x41: // clipped bitmap fill
				case 0x42: // non-smoothed repeating bitmap
				case 0x43: // non-smoothed clipped bitmap
					obj.bitmapId = bitio.getUI16();
					if (tagType === 46 || tagType === 84) {
						obj.startBitmapMatrix = _this.matrix();
						obj.endBitmapMatrix = _this.matrix();
					} else {
						obj.bitmapMatrix = _this.matrix();
					}
					break;
			}
			return obj;
		};

		/**
		 * @returns {{}}
		 */
		SwfTag.prototype.rgb = function()
		{
			let bitio = this.bitio;
			return {
				R: bitio.getUI8(),
				G: bitio.getUI8(),
				B: bitio.getUI8(),
				A: 1
			};
		};

		/**
		 * @returns {{}}
		 */
		SwfTag.prototype.rgba = function()
		{
			let bitio = this.bitio;
			return {
				R: bitio.getUI8(),
				G: bitio.getUI8(),
				B: bitio.getUI8(),
				A: bitio.getUI8() / 255
			};
		};

		/**
		 * @returns {Array}
		 */
		SwfTag.prototype.matrix = function()
		{
			let bitio = this.bitio;

			let result = [1, 0, 0, 1, 0, 0];
			if (bitio.getUIBit()) {
				let nScaleBits = bitio.getUIBits(5);
				result[0] = bitio.getSIBits(nScaleBits) / 0x10000;
				result[3] = bitio.getSIBits(nScaleBits) / 0x10000;
			}

			if (bitio.getUIBit()) {
				let nRotateBits = bitio.getUIBits(5);
				result[1] = bitio.getSIBits(nRotateBits) / 0x10000;
				result[2] = bitio.getSIBits(nRotateBits) / 0x10000;
			}

			let nTranslateBits = bitio.getUIBits(5);
			result[4] = bitio.getSIBits(nTranslateBits);
			result[5] = bitio.getSIBits(nTranslateBits);

			bitio.byteAlign();

			return result;
		};

		/**
		 * gradient
		 * @param tagType
		 * @returns {{SpreadMode: number, InterpolationMode: number, GradientRecords: Array}}
		 */
		SwfTag.prototype.gradient = function(tagType)
		{
			let _this = this;
			let SpreadMode = 0;
			let InterpolationMode = 0;
			let NumGradients;
			let bitio = this.bitio;

			bitio.byteAlign();

			if (tagType === 46 || tagType === 84) {
				// Despite of documentation (UI8 1-8), there are two fields
				// spreadMode and interpolationMode which are same as in GRADIENT
				SpreadMode = bitio.getUIBits(2);
				InterpolationMode = bitio.getUIBits(2);
				NumGradients = bitio.getUIBits(4);
			} else {
				SpreadMode = bitio.getUIBits(2);
				InterpolationMode = bitio.getUIBits(2);
				NumGradients = bitio.getUIBits(4);
			}

			let GradientRecords = [];
			for (let i = NumGradients; i--;) {
				GradientRecords[GradientRecords.length] = _this.gradientRecord(tagType);
			}

			return {
				SpreadMode: SpreadMode,
				InterpolationMode: InterpolationMode,
				GradientRecords: GradientRecords
			};
		};

		/**
		 * @param tagType
		 * @returns {{}}
		 */
		SwfTag.prototype.gradientRecord = function(tagType)
		{
			let _this = this;
			let bitio = _this.bitio;
			if (tagType === 46 || tagType === 84) {
				return {
					StartRatio: bitio.getUI8() / 255,
					StartColor: _this.rgba(),
					EndRatio: bitio.getUI8() / 255,
					EndColor: _this.rgba()
				};
			} else {
				let Ratio = bitio.getUI8();
				let Color = (tagType < 32) ? _this.rgb() : _this.rgba();
				return {Ratio: Ratio / 255, Color: Color};
			}
		};

		/**
		 * @param tagType
		 * @returns {{SpreadMode: number, InterpolationMode: number, GradientRecords: Array, StartFocalPoint: number, EndFocalPoint: number}}
		 */
		SwfTag.prototype.focalGradient = function(tagType)
		{
			let bitio = this.bitio;
			bitio.byteAlign();
			let _this = this;
			let SpreadMode = bitio.getUIBits(2);
			let InterpolationMode = bitio.getUIBits(2);
			let numGradients = bitio.getUIBits(4);

			let gradientRecords = [];
			for (let i = numGradients; i--;) {
				gradientRecords[gradientRecords.length] =
					_this.gradientRecord(tagType);
			}
			let FocalPoint = bitio.getFixed8();
			if (tagType === 46 || tagType === 84) {
				let EndFocalPoint = bitio.getFixed8();
				return {
					SpreadMode: SpreadMode,
					InterpolationMode: InterpolationMode,
					GradientRecords: gradientRecords,
					StartFocalPoint: FocalPoint,
					EndFocalPoint: EndFocalPoint
				};
			} else {
				return {
					SpreadMode: SpreadMode,
					InterpolationMode: InterpolationMode,
					GradientRecords: gradientRecords,
					FocalPoint: FocalPoint
				};
			}
		};

		/**
		 * @param tagType
		 * @returns {{lineStyleCount: number, lineStyles: Array}}
		 */
		SwfTag.prototype.lineStyleArray = function(tagType)
		{
			let _this = this;
			let bitio = _this.bitio;
			let lineStyleCount = bitio.getUI8();
			if ((tagType > 2) && (lineStyleCount === 0xff)) {
				lineStyleCount = bitio.getUI16();
			}

			let array = [];
			for (let i = lineStyleCount; i--;) {
				array[array.length] = _this.lineStyles(tagType);
			}

			return {
				lineStyleCount: lineStyleCount,
				lineStyles: array
			};
		};

		/**
		 * @param tagType
		 * @returns {{}}
		 */
		SwfTag.prototype.lineStyles = function(tagType)
		{
			let _this = this;
			let bitio = _this.bitio;
			let obj = {};

			obj.fillStyleType = 0;
			if (tagType === 46) {
				obj = {
					StartWidth: bitio.getUI16(),
					EndWidth: bitio.getUI16(),
					StartColor: _this.rgba(),
					EndColor: _this.rgba()
				};
			} else if (tagType === 84) {
				obj.StartWidth = bitio.getUI16();
				obj.EndWidth = bitio.getUI16();

				obj.StartCapStyle = bitio.getUIBits(2);
				obj.JoinStyle = bitio.getUIBits(2);
				obj.HasFillFlag = bitio.getUIBit();
				obj.NoHScaleFlag = bitio.getUIBit();
				obj.NoVScaleFlag = bitio.getUIBit();
				obj.PixelHintingFlag = bitio.getUIBit();
				bitio.getUIBits(5); // Reserved
				obj.NoClose = bitio.getUIBit();
				obj.EndCapStyle = bitio.getUIBits(2);

				if (obj.JoinStyle === 2) {
					obj.MiterLimitFactor = bitio.getFixed8();
				}

				if (obj.HasFillFlag) {
					obj.FillType = _this.fillStyle(tagType);
				} else {
					obj.StartColor = _this.rgba();
					obj.EndColor = _this.rgba();
				}
			} else {
				obj.Width = bitio.getUI16();
				if (tagType === 83) {
					// DefineShape4
					obj.StartCapStyle = bitio.getUIBits(2);
					obj.JoinStyle = bitio.getUIBits(2);
					obj.HasFillFlag = bitio.getUIBit();
					obj.NoHScaleFlag = bitio.getUIBit();
					obj.NoVScaleFlag = bitio.getUIBit();
					obj.PixelHintingFlag = bitio.getUIBit();
					bitio.getUIBits(5); // Reserved
					obj.NoClose = bitio.getUIBit();
					obj.EndCapStyle = bitio.getUIBits(2);

					if (obj.JoinStyle === 2) {
						obj.MiterLimitFactor = bitio.getFixed8();
					}

					if (obj.HasFillFlag) {
						obj.FillType = _this.fillStyle(tagType);
					} else {
						obj.Color = _this.rgba();
					}
				} else if (tagType === 32) {
					// DefineShape3
					obj.Color = _this.rgba();
				} else {
					// DefineShape1or2
					obj.Color = _this.rgb();
				}
			}

			return obj;
		};

		/**
		 * @param tagType
		 * @param currentNumBits
		 * @returns {Array}
		 */
		SwfTag.prototype.shapeRecords = function(tagType, currentNumBits)
		{
			let _this = this;
			let bitio = _this.bitio;
			let shapeRecords = [];
			_this.currentPosition = {x: 0, y: 0};
			let _straightEdgeRecord = _this.straightEdgeRecord;
			let _curvedEdgeRecord = _this.curvedEdgeRecord;
			let _styleChangeRecord = _this.styleChangeRecord;

			while (true) {
				let first6Bits = bitio.getUIBits(6);
				let shape = 0;
				if (first6Bits & 0x20) { // typeFlag === 1
					let numBits = first6Bits & 0x0f;
					if (first6Bits & 0x10) { // straightFlag === 1
						shape = _straightEdgeRecord.call(_this, tagType, numBits);
					} else {
						shape = _curvedEdgeRecord.call(_this, tagType, numBits);
					}
				} else if (first6Bits) {
					shape =
						_styleChangeRecord.call(_this, tagType, first6Bits, currentNumBits);
				}

				shapeRecords[shapeRecords.length] = shape;
				if (!shape) {
					bitio.byteAlign();
					break;
				}
			}
			return shapeRecords;
		};

		/**
		 * @param tagType
		 * @param numBits
		 * @returns {{}}
		 */
		SwfTag.prototype.straightEdgeRecord = function(tagType, numBits)
		{
			let _this = this;
			let bitio = _this.bitio;
			let deltaX = 0;
			let deltaY = 0;
			let GeneralLineFlag = bitio.getUIBit();
			if (GeneralLineFlag) {
				deltaX = bitio.getSIBits(numBits + 2);
				deltaY = bitio.getSIBits(numBits + 2);
			} else {
				let VertLineFlag = bitio.getUIBit();
				if (VertLineFlag) {
					deltaX = 0;
					deltaY = bitio.getSIBits(numBits + 2);
				} else {
					deltaX = bitio.getSIBits(numBits + 2);
					deltaY = 0;
				}
			}

			let AnchorX = deltaX;
			let AnchorY = deltaY;
			if (tagType !== 46 && tagType !== 84) {
				AnchorX = _this.currentPosition.x + deltaX;
				AnchorY = _this.currentPosition.y + deltaY;
				_this.currentPosition.x = AnchorX;
				_this.currentPosition.y = AnchorY;
			}

			return {
				ControlX: 0,
				ControlY: 0,
				AnchorX: AnchorX,
				AnchorY: AnchorY,
				isCurved: false,
				isChange: false
			};
		};

		/**
		 * @param tagType
		 * @param numBits
		 * @returns {{}}
		 */
		SwfTag.prototype.curvedEdgeRecord = function(tagType, numBits)
		{
			let _this = this;
			let bitio = _this.bitio;
			let controlDeltaX = bitio.getSIBits(numBits + 2);
			let controlDeltaY = bitio.getSIBits(numBits + 2);
			let anchorDeltaX = bitio.getSIBits(numBits + 2);
			let anchorDeltaY = bitio.getSIBits(numBits + 2);

			let ControlX = controlDeltaX;
			let ControlY = controlDeltaY;
			let AnchorX = anchorDeltaX;
			let AnchorY = anchorDeltaY;
			if (tagType !== 46 && tagType !== 84) {
				ControlX = _this.currentPosition.x + controlDeltaX;
				ControlY = _this.currentPosition.y + controlDeltaY;
				AnchorX = ControlX + anchorDeltaX;
				AnchorY = ControlY + anchorDeltaY;

				_this.currentPosition.x = AnchorX;
				_this.currentPosition.y = AnchorY;
			}

			return {
				ControlX: ControlX,
				ControlY: ControlY,
				AnchorX: AnchorX,
				AnchorY: AnchorY,
				isCurved: true,
				isChange: false
			};
		};

		/**
		 * @param tagType
		 * @param changeFlag
		 * @param currentNumBits
		 * @returns {{}}
		 */
		SwfTag.prototype.styleChangeRecord = function(tagType, changeFlag, currentNumBits)
		{
			let _this = this;
			let bitio = _this.bitio;
			let obj = {};
			obj.StateNewStyles = (changeFlag >> 4) & 1;
			obj.StateLineStyle = (changeFlag >> 3) & 1;
			obj.StateFillStyle1 = (changeFlag >> 2) & 1;
			obj.StateFillStyle0 = (changeFlag >> 1) & 1;
			obj.StateMoveTo = changeFlag & 1;

			if (obj.StateMoveTo) {
				let moveBits = bitio.getUIBits(5);
				obj.MoveX = bitio.getSIBits(moveBits);
				obj.MoveY = bitio.getSIBits(moveBits);
				_this.currentPosition.x = obj.MoveX;
				_this.currentPosition.y = obj.MoveY;
			}

			obj.FillStyle0 = 0;
			if (obj.StateFillStyle0) {
				obj.FillStyle0 = bitio.getUIBits(currentNumBits.FillBits);
			}

			obj.FillStyle1 = 0;
			if (obj.StateFillStyle1) {
				obj.FillStyle1 = bitio.getUIBits(currentNumBits.FillBits);
			}

			obj.LineStyle = 0;
			if (obj.StateLineStyle) {
				obj.LineStyle = bitio.getUIBits(currentNumBits.LineBits);
			}

			if (obj.StateNewStyles) {
				obj.FillStyles = _this.fillStyleArray(tagType);
				obj.LineStyles = _this.lineStyleArray(tagType);
				let numBits = bitio.getUI8();
				currentNumBits.FillBits = obj.NumFillBits = numBits >> 4;
				currentNumBits.LineBits = obj.NumLineBits = numBits & 0x0f;
			}
			obj.isChange = true;
			return obj;
		};

		/**
		 * @param characterId
		 * @param bounds
		 * @param shapes
		 * @param tagType
		 */
		SwfTag.prototype.appendShapeTag = function(characterId, bounds, shapes, tagType)
		{
			let stage = this.stage;
			stage.setCharacter(characterId, {
				tagType: tagType,
				data: vtc.convert(shapes, false),
				bounds: bounds
			});
		};

		/**
		 * @param tagType
		 * @param length
		 */
		SwfTag.prototype.parseDefineBitsLossLess = function(tagType, length)
		{
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let startOffset = bitio.byte_offset;
			let CharacterId = bitio.getUI16();
			let format = bitio.getUI8();
			let width = bitio.getUI16();
			let height = bitio.getUI16();

			let isAlpha = (tagType === 36);
			let colorTableSize = 0;
			if (format === 3) {
				colorTableSize = bitio.getUI8() + 1;
			}

			// unCompress
			let sub = bitio.byte_offset - startOffset;
			let compressed = bitio.getData(length - sub);
			let data = bitio.unzip(compressed, false);

			// canvas
			let canvas = cacheStore.getCanvas();
			canvas.width = width;
			canvas.height = height;
			let imageContext = canvas.getContext("2d");
			let imgData = imageContext.createImageData(width, height);
			let pxData = imgData.data;

			let idx = 0;
			let pxIdx = 0;
			let x = width;
			let y = height;
			if (format === 5 && !isAlpha) {
				idx = 0;
				pxIdx = 0;
				for (y = height; y--;) {
					for (x = width; x--;) {
						idx++;
						pxData[pxIdx++] = data[idx++];
						pxData[pxIdx++] = data[idx++];
						pxData[pxIdx++] = data[idx++];
						pxData[pxIdx++] = 255;
					}
				}
			} else {
				let bpp = (isAlpha) ? 4 : 3;
				let cmIdx = colorTableSize * bpp;
				let pad = 0;
				if (colorTableSize) {
					pad = ((width + 3) & ~3) - width;
				}

				for (y = height; y--;) {
					for (x = width; x--;) {
						idx = (colorTableSize) ? data[cmIdx++] * bpp : cmIdx++ * bpp;
						if (!isAlpha) {
							pxData[pxIdx++] = data[idx++];
							pxData[pxIdx++] = data[idx++];
							pxData[pxIdx++] = data[idx++];
							idx++;
							pxData[pxIdx++] = 255;
						} else {
							let alpha = (format === 3) ? data[idx + 3] : data[idx++];
							if (!isAlphaBug) {
								pxData[pxIdx++] = data[idx++] * 255 / alpha;
								pxData[pxIdx++] = data[idx++] * 255 / alpha;
								pxData[pxIdx++] = data[idx++] * 255 / alpha;
							} else {
								pxData[pxIdx++] = data[idx++];
								pxData[pxIdx++] = data[idx++];
								pxData[pxIdx++] = data[idx++];
							}
							pxData[pxIdx++] = alpha;

							if (format === 3) {
								idx++;
							}
						}
					}
					cmIdx += pad;
				}
			}

			imageContext.putImageData(imgData, 0, 0);
			stage.setCharacter(CharacterId, imageContext);
		};

		/**
		 * parseExportAssets
		 */
		SwfTag.prototype.parseExportAssets = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let count = bitio.getUI16();

			let exportAssets = stage.exportAssets;
			let packages = stage.packages;
			while (count--) {
				let id = bitio.getUI16();
				let name = bitio.getDataUntil("\0");
				if (name.substr(0, 10) === "__Packages") {
					packages[id] = 1;
				}
				exportAssets[name] = id;
			}

			stage.exportAssets = exportAssets;
		};

		/**
		 * @param length
		 * @returns {string}
		 */
		SwfTag.prototype.parseJPEGTables = function(length)
		{
			return this.bitio.getData(length);
		};
		/**
		 * @param tagType
		 * @param length
		 * @param jpegTables
		 */
		SwfTag.prototype.getImageMimeType = function(data)
		{
			if (data.length>4 && (data[0] & 0xff) == 0xff && (data[1] & 0xff) == 0xd9 &&
				(data[2] & 0xff) == 0xff && (data[3] & 0xff) == 0xd8) return "image/jpeg";
			else if (data.length>2 && ((data[0] & 0xff) == 0xff) && ((data[1] & 0xff) == 0xd8)) return "image/jpeg";
			else if (data.length > 6 && ((data[0] & 0xff) == 0x47) && ((data[1] & 0xff) == 0x49) && ((data[2] & 0xff) == 0x46) &&
				((data[3] & 0xff) == 0x38) && ((data[4] & 0xff) == 0x39) && ((data[5] & 0xff) == 0x61)) return "image/gif";
			else if (data.length > 8 && ((data[0] & 0xff) == 0x89) && ((data[1] & 0xff) == 0x50) &&
				((data[2] & 0xff) == 0x4e) && ((data[3] & 0xff) == 0x47) && ((data[4] & 0xff) == 0x0d) &&
				((data[5] & 0xff) == 0x0a) && ((data[6] & 0xff) == 0x1a) &&
				((data[7] & 0xff) == 0x0a)) return "image/png";
			else {
				window.alert('Unknown image format');
				return null;
			}
		};

		/**
		 * @param tagType
		 * @param length
		 * @param jpegTables
		 */
		SwfTag.prototype.parseDefineBits = function(tagType, length, jpegTables)
		{
			let _this = this;
			let bitio = _this.bitio;
			let startOffset = bitio.byte_offset;
			let CharacterId = bitio.getUI16();
			let sub = bitio.byte_offset - startOffset;

			let ImageDataLen = length - sub;
			if (tagType === 35 || tagType === 90) {
				ImageDataLen = bitio.getUI32(); // alphaDataOffset
			}

			if (tagType === 90) {
				let DeblockParam = bitio.getUI16();
				console.log("DeblockParam", DeblockParam);
			}

			let JPEGData = bitio.getData(ImageDataLen);
			let imageMimeType = _this.getImageMimeType(JPEGData);
			let BitmapAlphaData = false;
			if (tagType === 35 || tagType === 90) {
				BitmapAlphaData =
					bitio.getData(length - sub - ImageDataLen);
			}
			bitio.byte_offset = startOffset + length;

			// render
			let stage = _this.stage;
			stage.imgUnloadCount++;
			stage.imageCount++;
			let image = _document.createElement("img");

			image.addEventListener("load", function()
			{
				let width = this.width;
				let height = this.height;
				let canvas = cacheStore.getCanvas();
				canvas.width = width;
				canvas.height = height;
				let imageContext = canvas.getContext("2d");
				imageContext.drawImage(this, 0, 0, width, height);

				if (BitmapAlphaData) {
					let data = bitio.unzip(BitmapAlphaData, false);
					let imgData = imageContext.getImageData(0, 0, width, height);
					let pxData = imgData.data;
					let pxIdx = 3;
					let len = width * height;
					for (let i = 0; i < len; i++) {
						pxData[pxIdx] = data[i];
						pxIdx += 4;
					}
					imageContext.putImageData(imgData, 0, 0);
				}

				stage.setCharacter(CharacterId, imageContext);
				stage.imgUnloadCount--;
			});

			if (jpegTables !== null && jpegTables.length > 4) {
				let margeData = [];
				let len = jpegTables.length - 2;
				for (let idx = 0; idx < len; idx++) {
					margeData[margeData.length] = jpegTables[idx];
				}

				len = JPEGData.length;
				for (let idx = 2; idx < len; idx++) {
					margeData[margeData.length] = JPEGData[idx];
				}

				JPEGData = margeData;
			}
			image.src = "data:"+imageMimeType+";base64," +
				_this.base64encode(_this.parseJpegData(JPEGData));

			// for android bug
			setTimeout(function() {}, 0);
		};
		/**
		 * @param marker
		 * @returns {hex}
		 */
		SwfTag.prototype.markerHasLength = function(marker)
		{
/*
			const SOF0 = 0xC0; //Start of Frame 0
			const SOF1 = 0xC1; //Start of Frame 1
			const SOF2 = 0xC2; //Start of Frame 2
			const SOF3 = 0xC3; //Start of Frame 3

			const DHT = 0xC4; //Define Huffman Table

			const SOF5 = 0xC5; //Start of Frame 5
			const SOF6 = 0xC6; //Start of Frame 6
			const SOF7 = 0xC7; //Start of Frame 7

			const JPG = 0xC8; //JPEG Extensions

			const SOF9 = 0xC9; //Start of Frame 9
			const SOF10 = 0xCA; //Start of Frame 10
			const SOF11 = 0xCB; //Start of Frame 11

			const DAC = 0xCC; //Define Arithmetic Coding

			const SOF13 = 0xCD; //Start of Frame 13
			const SOF14 = 0xCE; //Start of Frame 14
			const SOF15 = 0xCF; //Start of Frame 15
*/
			const RST0 = 0xD0; //Restart Marker 0
			const RST1 = 0xD1; //Restart Marker 1
			const RST2 = 0xD2; //Restart Marker 2
			const RST3 = 0xD3; //Restart Marker 3
			const RST4 = 0xD4; //Restart Marker 4
			const RST5 = 0xD5; //Restart Marker 5
			const RST6 = 0xD6; //Restart Marker 6
			const RST7 = 0xD7; //Restart Marker 7

			const SOI = 0xD8; //Start of Image
			const EOI = 0xD9; //End of Image
/*
			const SOS = 0xDA; //Start of Scan
			const DQT = 0xDB; //Define Quantization Table
			const DNL = 0xDC; //Define Number of Lines
			const DRI = 0xDD; //Define Restart Interval
			const DHP = 0xDE; //Define Hierarchical Progression
			const EXP = 0xDF; //Expand Reference Component

			const APP0 = 0xE0; //Application Segment 0
			const APP1 = 0xE1; //Application Segment 1
			const APP2 = 0xE2; //Application Segment 2
			const APP3 = 0xE3; //Application Segment 3
			const APP4 = 0xE4; //Application Segment 4
			const APP5 = 0xE5; //Application Segment 5
			const APP6 = 0xE6; //Application Segment 6
			const APP7 = 0xE7; //Application Segment 7
			const APP8 = 0xE8; //Application Segment 8
			const APP9 = 0xE9; //Application Segment 9
			const APP10 = 0xEA; //Application Segment 10
			const APP11 = 0xEB; //Application Segment 11
			const APP12 = 0xEC; //Application Segment 12
			const APP13 = 0xED; //Application Segment 13
			const APP14 = 0xEE; //Application Segment 14
			const APP15 = 0xEF; //Application Segment 15

			const JPG0 = 0xF0; //JPEG Extension 0
			const JPG1 = 0xF1; //JPEG Extension 1
			const JPG2 = 0xF2; //JPEG Extension 2
			const JPG3 = 0xF3; //JPEG Extension 3
			const JPG4 = 0xF4; //JPEG Extension 4
			const JPG5 = 0xF5; //JPEG Extension 5
			const JPG6 = 0xF6; //JPEG Extension 6
			const JPG7 = 0xF7; //JPEG Extension 7
			const SOF48 = 0xF7; //JPEG-LS
			const JPG8 = 0xF8; //JPEG Extension 8
			const LSE = 0xF8; //JPEG Extension 8
			const JPG9 = 0xF9; //JPEG Extension 9
			const JPG10 = 0xFA; //JPEG Extension 10
			const JPG11 = 0xFB; //JPEG Extension 11
			const JPG12 = 0xFC; //JPEG Extension 12
			const JPG13 = 0xFD; //JPEG Extension 13
			const COM = 0xFE; //Comment
*/
			return marker != 0 &&
				marker != SOI &&
				marker != EOI &&
				marker != RST0 &&
				marker != RST1 &&
				marker != RST2 &&
				marker != RST3 &&
				marker != RST4 &&
				marker != RST5 &&
				marker != RST6 &&
				marker != RST7;
		};

		/**
		 * @param JPEGData
		 * @returns {string}
		 * conversion to javascript from jexs compiler :
		 */
		SwfTag.prototype.parseJpegData = function(JPEGData)
		{
			let _this = this;
			const SOI = 0xD8; // 216
			const EOI = 0xD9; // 217
			let prevEoi = false;
			let data = [];
			let i = 0;
			let p = 0;
			let length = JPEGData.length;
			let val;
			val = i<length?val=JPEGData[i++]:-1;
			let val2;
			if (val == -1) return data;

			if (val == 0xFF) {
				val = i<length?val=JPEGData[i++]:-1;
				if (val == -1) {
					data[p++] = 0xFF;
					return data;
				}
				if ((val != SOI) && (val != EOI)) {
					//not a JPEG file, nor invalid header, proceed as is
					data[p++] = 0xFF;
					data[p++] = val;
					while ((val = i<length?JPEGData[i++]:-1) > -1) {
						data[p++] = val;
					}
					return data;
				}
				//Check for erroneous header at the beginning, before first SOI marker
				if (val == EOI) {
					val=i<length?JPEGData[i++]:-1;
					val2 = i<length?JPEGData[i++]:-1;
					if ((val == 0xFF) && (val2 == SOI)) {
						val = JPEGData[i++];
						val2 = JPEGData[i++];
						if ((val != 0xFF) || (val2 != SOI)) {
							//not a JPEG file, proceed as is
							data[p++] = 0xFF;
							data[p++] = EOI;
							data[p++] = 0xFF;
							data[p++] = SOI;
							if (val != -1) {
								data[p++] = val;
							}
							if (val2 != -1) {
								data[p++] = val2;
							}
							while ((val = i<length?JPEGData[i++]:-1) > -1) {
								data[p++] = val;
							}
							return data;
						}
					} else {
						//not a JPEG file, proceed as is
						data[p++] = 0xFF;
						data[p++] = EOI;
						if (val != -1) {
							data[p++] = val;
						}
						if (val2 != -1) {
							data[p++] = val2;
						}
						while ((val = i<length?JPEGData[i++]:-1) > -1) {
							data[p++] = val;
						}
						return data;
					}
				}
				data[p++] = 0xFF;
				data[p++] = SOI;
			} else {
				//not a JPEG file, proceed as is
				data[p++] = val;
				while ((val = i<length?JPEGData[i++]:-1) > -1) {
					data[p++] = val;
				}
				return data;
			}

			//main removing EOI+SOI
			loopread:
			while ((val = i<length?JPEGData[i++]:-1) > -1) {
				if (val == 0xFF) {
					val = i<length?JPEGData[i++]:-1;
					if (val == 0) {
						data[p++] = 0xFF;
						data[p++] = val;
						prevEoi = false;
						continue;
					}
					if ((val == SOI) && prevEoi) {
						//ignore, effectively removing EOI and SOI
					} else if (val == SOI) {
						//second or more SOI in the file, remove that too
					} else if (prevEoi) {
						data[p++] = 0xFF;
						data[p++] = EOI;
						data[p++] = 0xFF;
						if (val != -1) {
							data[p++] = val;
						}
					} else if (val != EOI) {
						data[p++] = 0xFF;
						if (val != -1) {
							data[p++] = val;
						}
					}
					if ((val != -1) && _this.markerHasLength(val)) {
						let len1 = i<length?JPEGData[i++]:-1;
						if (len1 == -1) {
							break;
						}
						let len2 = i<length?JPEGData[i++]:-1;
						if (len2 == -1) {
							data[p++] = len1;
							break;
						}
						data[p++] = len1;
						data[p++] = len2;
						let len = (len1 << 8) + len2;
						for (let k = 0; k < len - 2; k++) {
							val2 = i<length?JPEGData[i++]:-1;
							if (val2 == -1) {
								break loopread;
							}
							data[p++] = val2;
						}
					}
					prevEoi = (val == EOI);
				} else {
					data[p++] = val;
					prevEoi = false;
				}
			}
			if (prevEoi) {
				data[p++] = 0xFF;
				data[p++] = EOI;
			}
			return data;
		};

		/**
		 * @param data
		 * @returns {*}
		 */
		SwfTag.prototype.base64encode = function(data)
		{
			//if (isBtoa) {
			//	return window.btoa(data);
			//}
			let base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			let out = [];
			let i = 0;
			let len = data.length;

			while (i < len) {
				//let c1 = data.charCodeAt(i++) & 0xff;
				let c1 = data[i++] & 0xff;
				if (i === len) {
					out[out.length] = base64EncodeChars.charAt(c1 >> 2);
					out[out.length] = base64EncodeChars.charAt((c1 & 0x3) << 4);
					out[out.length] = "==";
					break;
				}

				//let c2 = data.charCodeAt(i++);
				let c2 = data[i++];
				if (i === len) {
					out[out.length] = base64EncodeChars.charAt(c1 >> 2);
					out[out.length] = base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
					out[out.length] = base64EncodeChars.charAt((c2 & 0xF) << 2);
					out[out.length] = "=";
					break;
				}

				//let c3 = data.charCodeAt(i++);
				let c3 = data[i++];
				out[out.length] = base64EncodeChars.charAt(c1 >> 2);
				out[out.length] = base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
				out[out.length] = base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
				out[out.length] = base64EncodeChars.charAt(c3 & 0x3F);
			}
			return out.join("");
/*
			// oneliner
			//let c = "";for (let a=e=b=0;a<4*data.length/3;f=b>>2*(++a&3)&63,c+=String.fromCharCode(f+71-(f<26?6:f<52?0:f<62?75:f^63?90:87)))a&3^3&&(b=b<<8^data[e++]);for(;a++&3;)c+="=";return c;
			let c = "";for (let a=e=b=0;a<4*data.length/3;f=b>>2*(++a&3)&63,c+=String.fromCharCode(f+71-(f<26?6:f<52?0:f<62?75:f^63?90:87)))a&3^3&&(b=b<<8^data[e++]);for(;a++&3;)c+="=";
			console.log('base64 '+(c == out.join("")));
			*/
		};

		/**
		 * @param tagType
		 * @param length
		 */
		SwfTag.prototype.parseDefineFont = function(tagType, length)
		{
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let endOffset = bitio.byte_offset + length;
			let i = 0;
			let len = 0;
			let obj = {};
			obj.tagType = tagType;
			obj.FontId = bitio.getUI16();

			let numGlyphs = 0;
			if (tagType === 48 || tagType === 75) {
				let fontFlags = bitio.getUI8();
				obj.FontFlagsHasLayout = (fontFlags >>> 7) & 1;
				obj.FontFlagsShiftJIS = (fontFlags >>> 6) & 1;
				obj.FontFlagsSmallText = (fontFlags >>> 5) & 1;
				obj.FontFlagsANSI = (fontFlags >>> 4) & 1;
				obj.FontFlagsWideOffsets = (fontFlags >>> 3) & 1;
				obj.FontFlagsWideCodes = (fontFlags >>> 2) & 1;
				obj.FontFlagsItalic = (fontFlags >>> 1) & 1;
				obj.FontFlagsBold = (fontFlags) & 1;
				bitio.byteAlign();

				obj.LanguageCode = bitio.getUI8();
				obj.FontNameLen = bitio.getUI8();
				if (obj.FontNameLen) {
					let startOffset = bitio.byte_offset;
					let data = bitio.getData(obj.FontNameLen);
					let str = "";
					len = obj.FontNameLen;
					for (i = 0; i < len; i++) {
						if (data[i] > 127) {
							continue;
						}
						str += _fromCharCode(data[i]);
					}

					let fontName;
					if (obj.FontFlagsShiftJIS || obj.LanguageCode === 2) {
						fontName = bitio.decodeToShiftJis(str);
					} else {
						fontName = decodeURIComponent(str);
					}

					obj.FontName = _this.getFontName(fontName);
					bitio.byte_offset = startOffset + obj.FontNameLen;
				}

				numGlyphs = bitio.getUI16();
				obj.NumGlyphs = numGlyphs;
			}

			// offset
			let offset = bitio.byte_offset;
			if (tagType === 10) {
				numGlyphs = bitio.getUI16();
			}

			if (numGlyphs) {
				let OffsetTable = [];
				if (tagType === 10) {
					OffsetTable[0] = numGlyphs;
					numGlyphs /= 2;
					numGlyphs--;
				}

				if (obj.FontFlagsWideOffsets) {
					for (i = numGlyphs; i--;) {
						OffsetTable[OffsetTable.length] = bitio.getUI32();
					}
					if (tagType !== 10) {
						obj.CodeTableOffset = bitio.getUI32();
					}
				} else {
					for (i = numGlyphs; i--;) {
						OffsetTable[OffsetTable.length] = bitio.getUI16();
					}
					if (tagType !== 10) {
						obj.CodeTableOffset = bitio.getUI16();
					}
				}

				// Shape
				let GlyphShapeTable = [];
				if (tagType === 10) {
					numGlyphs++;
				}

				for (i = 0; i < numGlyphs; i++) {
					bitio.setOffset(OffsetTable[i] + offset, 0);

					let numBits = bitio.getUI8();
					let NumFillBits = numBits >> 4;
					let NumLineBits = numBits & 0x0f;

					let currentNumBits = {
						FillBits: NumFillBits,
						LineBits: NumLineBits
					};

					let shapes = {};
					shapes.ShapeRecords = _this.shapeRecords(tagType, currentNumBits);
					shapes.lineStyles = {
						lineStyles: [{
							Color: {R: 0, G: 0, B: 0, A: 1},
							lineStyleType: 0
						}]
					};
					shapes.fillStyles = {
						fillStyles: [{
							Color: { R: 0, G: 0, B: 0, A: 1},
							fillStyleType: 0
						}]
					};

					GlyphShapeTable[GlyphShapeTable.length] = shapes;
				}
				obj.GlyphShapeTable = GlyphShapeTable;

				if (tagType === 48 || tagType === 75) {
					bitio.setOffset(obj.CodeTableOffset + offset, 0);
					let CodeTable = [];
					if (obj.FontFlagsWideCodes) {
						for (i = numGlyphs; i--;) {
							CodeTable[CodeTable.length] = bitio.getUI16();
						}
					} else {
						for (i = numGlyphs; i--;) {
							CodeTable[CodeTable.length] = bitio.getUI8();
						}
					}
					obj.CodeTable = CodeTable;

					if (obj.FontFlagsHasLayout) {
						obj.FontAscent = bitio.getUI16();
						obj.FontDescent = bitio.getUI16();
						obj.FontLeading = bitio.getUI16();

						let FontAdvanceTable = [];
						for (i = numGlyphs; i--;) {
							FontAdvanceTable[FontAdvanceTable.length] = bitio.getUI16();
						}
						obj.FontAdvanceTable = FontAdvanceTable;

						let FontBoundsTable = [];
						for (i = numGlyphs; i--;) {
							FontBoundsTable[FontBoundsTable.length] = _this.rect();
						}
						obj.FontBoundsTable = FontBoundsTable;

						if (tagType === 75) {
							obj.KerningCount = bitio.getUI16();
							obj.KerningRecord = [];
							for (i = obj.KerningCount; i--;) {
								let FontKerningCode1 = (obj.FontFlagsWideCodes) ? bitio.getUI16() : bitio.getUI8();
								let FontKerningCode2 = (obj.FontFlagsWideCodes) ? bitio.getUI16() : bitio.getUI8();
								let FontKerningAdjustment = bitio.getSIBits(16);
								obj.KerningRecord[obj.KerningRecord.length] = {
									FontKerningCode1: FontKerningCode1,
									FontKerningCode2: FontKerningCode2,
									FontKerningAdjustment: FontKerningAdjustment
								};
							}
						}
					}
				}
			}

			bitio.byte_offset = endOffset;
			stage.setCharacter(obj.FontId, obj);
			stage.fonts[obj.FontName] = obj;
		};

		/**
		 * @param tagType
		 * @param length
		 */
		SwfTag.prototype.parseDefineFontInfo = function(tagType, length)
		{
			let _this = this;
			let bitio = _this.bitio;
			let endOffset = bitio.byte_offset + length;

			let obj = {};
			obj.tagType = tagType;
			obj.FontId = bitio.getUI16();
			let len = bitio.getUI8();
			let data = bitio.getData(len);
			let str = "";
			for (let i = 0; i < len; i++) {
				if (data[i] > 127) {
					continue;
				}
				str += _fromCharCode(data[i]);
			}

			obj.FontFlagsReserved = bitio.getUIBits(2);
			obj.FontFlagsSmallText = bitio.getUIBits(1);
			obj.FontFlagsShiftJIS = bitio.getUIBits(1);
			obj.FontFlagsANSI = bitio.getUIBits(1);
			obj.FontFlagsItalic = bitio.getUIBits(1);
			obj.FontFlagsBold = bitio.getUIBits(1);
			obj.FontFlagsWideCodes = bitio.getUIBits(1);
			if (tagType === 62) {
				obj.LanguageCode = bitio.getUI8();
			}

			let fontName;
			if (obj.FontFlagsShiftJIS || obj.LanguageCode === 2) {
				fontName = bitio.decodeToShiftJis(str);
			} else {
				fontName = decodeURIComponent(str);
			}
			obj.FontName = _this.getFontName(fontName);

			let CodeTable = [];
			bitio.byteAlign();
			let tLen = endOffset - bitio.byte_offset;
			if (obj.FontFlagsWideCodes || tagType === 62) {
				while (tLen) {
					CodeTable[CodeTable.length] = bitio.getUI16();
					tLen -= 2;
				}
			} else {
				while (tLen) {
					CodeTable[CodeTable.length] = bitio.getUI8();
					tLen--;
				}
			}
			obj.CodeTable = CodeTable;
		};

		/**
		 * @param fontName
		 * @returns {string}
		 */
		SwfTag.prototype.getFontName = function(fontName)
		{
			let length = fontName.length;
			let str = fontName.substr(length - 1);
			if (str.charCodeAt(0) === 0) {
				fontName = fontName.slice(0, -1);
			}

			switch (fontName) {
				case "_sans":
					return "sans-serif";
				case "_serif":
					return "serif";
				case "_typewriter":
					return "monospace";
				default:
					let ander = fontName.substr(0, 1);
					if (ander === "_") {
						return "sans-serif";
					}
					return fontName;
			}
		};

		/**
		 * parseDefineFontName
		 */
		SwfTag.prototype.parseDefineFontName = function()
		{
			let bitio = this.bitio;
			bitio.getUI16(); // FontId
			bitio.getDataUntil("\0"); // FontName
			bitio.getDataUntil("\0"); // FontCopyright
		};

		/**
		 * @param tagType
		 */
		SwfTag.prototype.parseDefineText = function(tagType)
		{
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let obj = {};
			let characterId = bitio.getUI16();
			obj.tagType = tagType;
			obj.bounds = _this.rect();
			obj.matrix = _this.matrix();
			let GlyphBits = bitio.getUI8();
			let AdvanceBits = bitio.getUI8();
			obj.textRecords = _this.getTextRecords(tagType, GlyphBits, AdvanceBits);
			stage.setCharacter(characterId, obj);
		};

		/**
		 * @param tagType
		 * @param GlyphBits
		 * @param AdvanceBits
		 * @returns {Array}
		 */
		SwfTag.prototype.getTextRecords = function(tagType, GlyphBits, AdvanceBits)
		{
			let _this = this;
			let bitio = _this.bitio;
			let array = [];
			while (bitio.getUI8() !== 0) {
				bitio.incrementOffset(-1, 0);

				let obj = {};
				obj.TextRecordType = bitio.getUIBits(1);
				obj.StyleFlagsReserved = bitio.getUIBits(3);
				obj.StyleFlagsHasFont = bitio.getUIBits(1);
				obj.StyleFlagsHasColor = bitio.getUIBits(1);
				obj.StyleFlagsHasYOffset = bitio.getUIBits(1);
				obj.StyleFlagsHasXOffset = bitio.getUIBits(1);
				if (obj.StyleFlagsHasFont) {
					obj.FontId = bitio.getUI16();
				}

				if (obj.StyleFlagsHasColor) {
					if (tagType === 11) {
						obj.TextColor = _this.rgb();
					} else {
						obj.TextColor = _this.rgba();
					}
				}

				if (obj.StyleFlagsHasXOffset) {
					obj.XOffset = bitio.getUI16();
				}

				if (obj.StyleFlagsHasYOffset) {
					obj.YOffset = bitio.getUI16();
				}

				if (obj.StyleFlagsHasFont) {
					obj.TextHeight = bitio.getUI16();
				}

				obj.GlyphCount = bitio.getUI8();
				obj.GlyphEntries = _this.getGlyphEntries(
					obj.GlyphCount, GlyphBits, AdvanceBits
				);

				array[array.length] = obj;
			}

			return array;
		};

		/**
		 * @param count
		 * @param GlyphBits
		 * @param AdvanceBits
		 * @returns {Array}
		 */
		SwfTag.prototype.getGlyphEntries = function(count, GlyphBits, AdvanceBits)
		{
			let bitio = this.bitio;
			let array = [];
			for (let i = count; i--;) {
				array[array.length] = {
					GlyphIndex: bitio.getUIBits(GlyphBits),
					GlyphAdvance: bitio.getSIBits(AdvanceBits)
				};
			}
			return array;
		};

		/**
		 * @param tagType
		 */
		SwfTag.prototype.parseDefineEditText = function(tagType)
		{
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let obj = {};
			let isJis = false;

			obj.CharacterId = bitio.getUI16();
			let bounds = _this.rect();

			let flag1 = bitio.getUI8();
			obj.HasText = (flag1 >>> 7) & 1;
			obj.WordWrap = (flag1 >>> 6) & 1;
			obj.Multiline = (flag1 >>> 5) & 1;
			obj.Password = (flag1 >>> 4) & 1;
			obj.ReadOnly = (flag1 >>> 3) & 1;
			obj.HasTextColor = (flag1 >>> 2) & 1;
			obj.HasMaxLength = (flag1 >>> 1) & 1;
			obj.HasFont = flag1 & 1;

			let flag2 = bitio.getUI8();
			obj.HasFontClass = (flag2 >>> 7) & 1;
			obj.AutoSize = (flag2 >>> 6) & 1;
			obj.HasLayout = (flag2 >>> 5) & 1;
			obj.NoSelect = (flag2 >>> 4) & 1;
			obj.Border = (flag2 >>> 3) & 1;
			obj.WasStatic = (flag2 >>> 2) & 1;
			obj.HTML = (flag2 >>> 1) & 1;
			obj.UseOutlines = flag2 & 1;

			if (obj.HasFont) {
				obj.FontID = bitio.getUI16();
				let fontData = stage.getCharacter(obj.FontID);
				isJis = (fontData.FontFlagsShiftJIS) ? true : false;
				if (obj.HasFontClass) {
					obj.FontClass = bitio.getDataUntil("\0");
				}
				obj.FontHeight = bitio.getUI16();
			}

			if (obj.HasTextColor) {
				obj.TextColor = _this.rgba();
			}

			if (obj.HasMaxLength) {
				obj.MaxLength = bitio.getUI16();
			}

			if (obj.HasLayout) {
				obj.Align = bitio.getUI8();
				obj.LeftMargin = bitio.getUI16();
				obj.RightMargin = bitio.getUI16();
				obj.Indent = bitio.getUI16();
				obj.Leading = bitio.getUI16();
			}

			let VariableName = bitio.getDataUntil("\0", isJis) + "";
			obj.VariableName = (VariableName === "") ? null : VariableName;
			obj.InitialText = "";
			if (obj.HasText) {
				let text = bitio.getDataUntil("\0", isJis);
				if (obj.HTML) {
					if (text.indexOf("<sbr />") !== -1) {
						text = text.replace(new RegExp("<sbr />", "gi"), "\n");
					}
					if (text.indexOf("<b>") !== -1) {
						text = text.replace(new RegExp("<b>", "gi"), "");
						text = text.replace(new RegExp("</b>", "gi"), "");
					}

					let span = _document.createElement("span");
					span.innerHTML = text;

					let tags = span.getElementsByTagName("p");
					let length = tags.length;
					let tagData = [];
					for (let i = 0; i < length; i++) {
						tagData[i] = tags[i];
					}
					obj.InitialText = tagData;
				} else {
					obj.InitialText = text;
				}
			}

			stage.setCharacter(obj.CharacterId, {
				data: obj,
				bounds: bounds,
				tagType: tagType
			});
		};

		/**
		 * @param tagType
		 */
		SwfTag.prototype.parseDefineMorphShape = function(tagType)
		{
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let obj = {};
			obj.tagType = tagType;
			obj.CharacterId = bitio.getUI16();

			obj.StartBounds = _this.rect();
			obj.EndBounds = _this.rect();

			if (tagType === 84) {
				obj.StartEdgeBounds = _this.rect();
				obj.EndEdgeBounds = _this.rect();
				bitio.getUIBits(6); // Reserved
				obj.UsesNonScalingStrokes = bitio.getUIBits(1);
				obj.UsesScalingStrokes = bitio.getUIBits(1);
			}

			let offset = bitio.getUI32();
			// let endOffset = bitio.byte_offset + offset;

			obj.MorphFillStyles = _this.fillStyleArray(tagType);
			obj.MorphLineStyles = _this.lineStyleArray(tagType);

			obj.StartEdges = _this.shapeWithStyle(tagType);
			// Ignore endOffset
			obj.EndEdges = _this.shapeWithStyle(tagType);

			let startPosition = {x: 0, y: 0};
			let endPosition = {x: 0, y: 0};
			let StartRecords = obj.StartEdges.ShapeRecords;
			let EndRecords = obj.EndEdges.ShapeRecords;
			let StartRecordLength = StartRecords.length;
			let EndRecordLength = EndRecords.length;
			let length = _max(StartRecordLength, EndRecordLength);
			for (let i = 0; i < length; i++) {
				let addRecode = {};
				let StartRecord = StartRecords[i];
				let EndRecord = EndRecords[i];
				if (!StartRecord && !EndRecord) {
					continue;
				}

				if (!StartRecord.isChange && !EndRecord.isChange) {
					if (StartRecord.isCurved) {
						startPosition.x += StartRecord.ControlX + StartRecord.AnchorX;
						startPosition.y += StartRecord.ControlY + StartRecord.AnchorY;
					} else {
						startPosition.x += StartRecord.AnchorX;
						startPosition.y += StartRecord.AnchorY;
					}

					if (EndRecord.isCurved) {
						endPosition.x += EndRecord.ControlX + EndRecord.AnchorX;
						endPosition.y += EndRecord.ControlY + EndRecord.AnchorY;
					} else {
						endPosition.x += EndRecord.AnchorX;
						endPosition.y += EndRecord.AnchorY;
					}
					continue;
				}

				if (StartRecord.isChange && !EndRecord.isChange) {
					addRecode = {
						FillStyle0: StartRecord.FillStyle0,
						FillStyle1: StartRecord.FillStyle1,
						LineStyle: StartRecord.LineStyle,
						StateFillStyle0: StartRecord.StateFillStyle0,
						StateFillStyle1: StartRecord.StateFillStyle1,
						StateLineStyle: StartRecord.StateLineStyle,
						StateMoveTo: StartRecord.StateMoveTo,
						StateNewStyles: StartRecord.StateNewStyles,
						isChange: true
					};

					if (StartRecord.StateMoveTo) {
						addRecode.MoveX = endPosition.x;
						addRecode.MoveY = endPosition.y;
						startPosition.x = StartRecord.MoveX;
						startPosition.y = StartRecord.MoveY;
					}

					EndRecords.splice(i, 0, addRecode);
				} else if (!StartRecord.isChange && EndRecord.isChange) {
					addRecode = {
						FillStyle0: EndRecord.FillStyle0,
						FillStyle1: EndRecord.FillStyle1,
						LineStyle: EndRecord.LineStyle,
						StateFillStyle0: EndRecord.StateFillStyle0,
						StateFillStyle1: EndRecord.StateFillStyle1,
						StateLineStyle: EndRecord.StateLineStyle,
						StateMoveTo: EndRecord.StateMoveTo,
						StateNewStyles: EndRecord.StateNewStyles,
						isChange: true
					};

					if (EndRecord.StateMoveTo) {
						addRecode.MoveX = startPosition.x;
						addRecode.MoveY = startPosition.y;
						endPosition.x = EndRecord.MoveX;
						endPosition.y = EndRecord.MoveY;
					}

					StartRecords.splice(i, 0, addRecode);
				} else {
					if (StartRecord.StateMoveTo) {
						startPosition.x = StartRecord.MoveX;
						startPosition.y = StartRecord.MoveY;
					}

					if (EndRecord.StateMoveTo) {
						endPosition.x = EndRecord.MoveX;
						endPosition.y = EndRecord.MoveY;
					}
				}
			}

			let FillType = 0;
			let FillStyle = 0;
			length = obj.StartEdges.ShapeRecords.length;
			for (let i = 0; i < length; i++) {
				let record = StartRecords[i];
				if (!record.isChange) {
					continue;
				}
				if (record.StateFillStyle0) {
					FillStyle = record.FillStyle0;
				}

				if (FillStyle) {
					record.StateFillStyle0 = 1;
					record.StateFillStyle1 = 1;
					if (FillType) {
						record.FillStyle0 = 0;
						record.FillStyle1 = FillStyle;
					} else {
						record.FillStyle0 = FillStyle;
						record.FillStyle1 = 0;
					}
				} else {
					record.StateFillStyle1 = 1;
					record.FillStyle1 = 0;
				}

				FillType = (FillType) ? 0 : 1;
			}

			stage.setCharacter(obj.CharacterId, obj);
		};

		/**
		 * @param char
		 * @param ratio
		 * @returns {{data: Array, bounds: {xMax: number, xMin: number, yMax: number, yMin: number}}}
		 */
		SwfTag.prototype.buildMorphShape = function(char, ratio)
		{
			let per = (ratio === undefined) ? 0 : ratio / 65535;
			let startPer = 1 - per;
			let newShapeRecords = [];

			let morphLineStyles = char.MorphLineStyles;
			let lineStyles = morphLineStyles.lineStyles;
			let lineStyleCount = morphLineStyles.lineStyleCount;

			let morphFillStyles = char.MorphFillStyles;
			let fillStyles = morphFillStyles.fillStyles;
			let fillStyleCount = morphFillStyles.fillStyleCount;

			let StartEdges = char.StartEdges;
			let StartShapeRecords = StartEdges.ShapeRecords;

			let EndEdges = char.EndEdges;
			let EndShapeRecords = EndEdges.ShapeRecords;

			let shapes = {
				lineStyles: {
					lineStyleCount: lineStyleCount,
					lineStyles: []
				},
				fillStyles: {
					fillStyleCount: fillStyleCount,
					fillStyles: []
				},
				ShapeRecords: []
			};

			let position = { x: 0, y: 0};
			let len = StartShapeRecords.length;
			for (let i = 0; i < len; i++) {
				let StartRecord = StartShapeRecords[i];
				if (!StartRecord) {
					continue;
				}

				let newRecord = {};
				let EndRecord = EndShapeRecords[i];
				if (StartRecord.isChange) {
					let MoveX = 0;
					let MoveY = 0;

					if (StartRecord.StateMoveTo === 1) {
						MoveX = StartRecord.MoveX * startPer + EndRecord.MoveX * per;
						MoveY = StartRecord.MoveY * startPer + EndRecord.MoveY * per;
						position.x = MoveX;
						position.y = MoveY;
					}

					newRecord = {
						FillStyle0: StartRecord.FillStyle0,
						FillStyle1: StartRecord.FillStyle1,
						LineStyle: StartRecord.LineStyle,
						MoveX: MoveX,
						MoveY: MoveY,
						StateFillStyle0: StartRecord.StateFillStyle0,
						StateFillStyle1: StartRecord.StateFillStyle1,
						StateLineStyle: StartRecord.StateLineStyle,
						StateMoveTo: StartRecord.StateMoveTo,
						StateNewStyles: StartRecord.StateNewStyles,
						isChange: true
					};
				} else {
					let AnchorX = 0;
					let AnchorY = 0;
					let ControlX = 0;
					let ControlY = 0;

					let startAnchorX = StartRecord.AnchorX;
					let startAnchorY = StartRecord.AnchorY;
					let endAnchorX = EndRecord.AnchorX;
					let endAnchorY = EndRecord.AnchorY;

					let startControlX = StartRecord.ControlX;
					let startControlY = StartRecord.ControlY;
					let endControlX = EndRecord.ControlX;
					let endControlY = EndRecord.ControlY;

					if (per > 0 && per < 1 && StartRecord.isCurved !== EndRecord.isCurved) {
						if (!StartRecord.isCurved) {
							startAnchorX = StartRecord.AnchorX / 2;
							startAnchorY = StartRecord.AnchorY / 2;
							startControlX = startAnchorX;
							startControlY = startAnchorY;
						}
						if (!EndRecord.isCurved) {
							endAnchorX = EndRecord.AnchorX / 2;
							endAnchorY = EndRecord.AnchorY / 2;
							endControlX = endAnchorX;
							endControlY = endAnchorY;
						}
					}

					ControlX = startControlX * startPer + endControlX * per + position.x;
					ControlY = startControlY * startPer + endControlY * per + position.y;
					AnchorX = startAnchorX * startPer + endAnchorX * per + ControlX;
					AnchorY = startAnchorY * startPer + endAnchorY * per + ControlY;

					position.x = AnchorX;
					position.y = AnchorY;

					newRecord = {
						AnchorX: AnchorX,
						AnchorY: AnchorY,
						ControlX: ControlX,
						ControlY: ControlY,
						isChange: false,
						isCurved: (StartRecord.isCurved || EndRecord.isCurved)
					};
				}

				newShapeRecords[i] = newRecord;
			}
			newShapeRecords[newShapeRecords.length] = 0;
			shapes.ShapeRecords = newShapeRecords;

			let EndColor;
			let StartColor;
			let color;
			let matrix;
			let ls=-1;
			for (let i = 0; i < lineStyleCount; i++) {
				let lineStyle = lineStyles[i];
				let EndWidth = lineStyle.EndWidth;
				let StartWidth = lineStyle.StartWidth;
				if (StartWidth==0 && EndWidth==0) {
					continue;
				}
				ls++;
				if (lineStyle.FillType === undefined) {
					EndColor = lineStyle.EndColor;
					StartColor = lineStyle.StartColor;
					color = {
						R: _floor(StartColor.R * startPer + EndColor.R * per),
						G: _floor(StartColor.G * startPer + EndColor.G * per),
						B: _floor(StartColor.B * startPer + EndColor.B * per),
						A: StartColor.A * startPer + EndColor.A * per
					};

					shapes.lineStyles.lineStyles[ls] = {
						Width: _floor(StartWidth * startPer + EndWidth * per),
						Color: color,
						fillStyleType: 0
					};
				} else {
					let fillStyleType = lineStyle.FillType.fillStyleType;
					switch(fillStyleType) {
						case 0x00: // solid fill
							EndColor = lineStyle.EndColor;
							StartColor = lineStyle.StartColor;
							color = {
								R: _floor(StartColor.R * startPer + EndColor.R * per),
								G: _floor(StartColor.G * startPer + EndColor.G * per),
								B: _floor(StartColor.B * startPer + EndColor.B * per),
								A: StartColor.A * startPer + EndColor.A * per
							};

							shapes.lineStyles.lineStyles[ls] = {
								Width: _floor(StartWidth * startPer + EndWidth * per),
								Color: color,
								fillStyleType: 0
							};
							break;
						case 0x10: // linear gradient fill
						case 0x12: // radial gradient fill
						case 0x13: // focal radial gradient fill (SWF 8 file format and later only)
							let EndGradientMatrix = lineStyle.FillType.endGradientMatrix;
							let StartGradientMatrix = lineStyle.FillType.startGradientMatrix;
							matrix = [
								StartGradientMatrix[0] * startPer + EndGradientMatrix[0] * per,
								StartGradientMatrix[1] * startPer + EndGradientMatrix[1] * per,
								StartGradientMatrix[2] * startPer + EndGradientMatrix[2] * per,
								StartGradientMatrix[3] * startPer + EndGradientMatrix[3] * per,
								StartGradientMatrix[4] * startPer + EndGradientMatrix[4] * per,
								StartGradientMatrix[5] * startPer + EndGradientMatrix[5] * per
							];

							let gRecords = [];
							let gradient = lineStyle.FillType.gradient;
							let GradientRecords = gradient.GradientRecords;
							let gLen = GradientRecords.length;
							for (let gIdx = 0; gIdx < gLen; gIdx++) {
								let gRecord = GradientRecords[gIdx];
								EndColor = gRecord.EndColor;
								StartColor = gRecord.StartColor;
								color = {
									R: _floor(StartColor.R * startPer + EndColor.R * per),
									G: _floor(StartColor.G * startPer + EndColor.G * per),
									B: _floor(StartColor.B * startPer + EndColor.B * per),
									A: StartColor.A * startPer + EndColor.A * per
								};

								gRecords[gIdx] = {
									Color: color,
									Ratio: gRecord.StartRatio * startPer + gRecord.EndRatio * per
								};
							}
							let FocalPoint = 0;
							if (fillStyleType == 0x13) FocalPoint = gradient.StartFocalPoint * startPer + gradient.EndFocalPoint * per;

							let shapeGradient = {
								SpreadMode: lineStyle.FillType.SpreadMode,
								InterpolationMode: lineStyle.FillType.InterpolationMode,
								GradientRecords: gRecords
							};
							if (fillStyleType == 0x13)  shapeGradient = {
								GradientRecords: gRecords,
								FocalPoint: FocalPoint
							};

							shapes.lineStyles.lineStyles[ls] = {
								Width: _floor(StartWidth * startPer + EndWidth * per),
								gradient: shapeGradient,
								gradientMatrix: matrix,
								fillStyleType: fillStyleType
							};
							break;
						case 0x40: // repeating bitmap fill
						case 0x41: // clipped bitmap fill
						case 0x42: // non-smoothed repeating bitmap
						case 0x43: // non-smoothed clipped bitmap
							let EndBitmapMatrix = lineStyle.FillType.endBitmapMatrix;
							let StartBitmapMatrix = lineStyle.FillType.startBitmapMatrix;
							let bitmapId = lineStyle.FillType.bitmapId;
							matrix = [
								StartBitmapMatrix[0] * startPer + EndBitmapMatrix[0] * per,
								StartBitmapMatrix[1] * startPer + EndBitmapMatrix[1] * per,
								StartBitmapMatrix[2] * startPer + EndBitmapMatrix[2] * per,
								StartBitmapMatrix[3] * startPer + EndBitmapMatrix[3] * per,
								StartBitmapMatrix[4] * startPer + EndBitmapMatrix[4] * per,
								StartBitmapMatrix[5] * startPer + EndBitmapMatrix[5] * per
							];
							shapes.lineStyles.lineStyles[ls] = {
								Width: _floor(StartWidth * startPer + EndWidth * per),
								fillStyleType: fillStyleType,
								bitmapId: bitmapId,
								bitmapMatrix: matrix
							};
							break;
					}
				}
			}

			for (let i = 0; i < fillStyleCount; i++) {
				let fillStyle = fillStyles[i];
				let fillStyleType = fillStyle.fillStyleType;

				switch(fillStyleType) {
					case 0x00: // solid fill
						EndColor = fillStyle.EndColor;
						StartColor = fillStyle.StartColor;
						color = {
							R: _floor(StartColor.R * startPer + EndColor.R * per),
							G: _floor(StartColor.G * startPer + EndColor.G * per),
							B: _floor(StartColor.B * startPer + EndColor.B * per),
							A: StartColor.A * startPer + EndColor.A * per
						};

						shapes.fillStyles.fillStyles[i] = {
							Color: color,
							fillStyleType: fillStyleType
						};
						break;
					case 0x10: // linear gradient fill
					case 0x12: // radial gradient fill
					case 0x13: // focal radial gradient fill (SWF 8 file format and later only)
						let EndGradientMatrix = fillStyle.endGradientMatrix;
						let StartGradientMatrix = fillStyle.startGradientMatrix;
						matrix = [
							StartGradientMatrix[0] * startPer + EndGradientMatrix[0] * per,
							StartGradientMatrix[1] * startPer + EndGradientMatrix[1] * per,
							StartGradientMatrix[2] * startPer + EndGradientMatrix[2] * per,
							StartGradientMatrix[3] * startPer + EndGradientMatrix[3] * per,
							StartGradientMatrix[4] * startPer + EndGradientMatrix[4] * per,
							StartGradientMatrix[5] * startPer + EndGradientMatrix[5] * per
						];

						let gRecords = [];
						let gradient = fillStyle.gradient;
						let GradientRecords = gradient.GradientRecords;
						let gLen = GradientRecords.length;
						for (let gIdx = 0; gIdx < gLen; gIdx++) {
							let gRecord = GradientRecords[gIdx];
							EndColor = gRecord.EndColor;
							StartColor = gRecord.StartColor;
							color = {
								R: _floor(StartColor.R * startPer + EndColor.R * per),
								G: _floor(StartColor.G * startPer + EndColor.G * per),
								B: _floor(StartColor.B * startPer + EndColor.B * per),
								A: StartColor.A * startPer + EndColor.A * per
							};

							gRecords[gIdx] = {
								Color: color,
								Ratio: gRecord.StartRatio * startPer + gRecord.EndRatio * per
							};
						}
						let FocalPoint = 0;
						if (fillStyleType == 0x13) FocalPoint = gradient.StartFocalPoint * startPer + gradient.EndFocalPoint * per;
						let shapeGradient = { GradientRecords: gRecords};
						if (fillStyleType == 0x13)  shapeGradient = {
							SpreadMode: fillStyle.SpreadMode,
							InterpolationMode: fillStyle.InterpolationMode,
							GradientRecords: gRecords,
							FocalPoint: FocalPoint
						};

						shapes.fillStyles.fillStyles[i] = {
							gradient: shapeGradient,
							gradientMatrix: matrix,
							fillStyleType: fillStyleType
						};
						break;
					case 0x40: // repeating bitmap fill
					case 0x41: // clipped bitmap fill
					case 0x42: // non-smoothed repeating bitmap
					case 0x43: // non-smoothed clipped bitmap
						let EndBitmapMatrix = fillStyle.endBitmapMatrix;
						let StartBitmapMatrix = fillStyle.startBitmapMatrix;
						let bitmapId = fillStyle.bitmapId;
						matrix = [
							StartBitmapMatrix[0] * startPer + EndBitmapMatrix[0] * per,
							StartBitmapMatrix[1] * startPer + EndBitmapMatrix[1] * per,
							StartBitmapMatrix[2] * startPer + EndBitmapMatrix[2] * per,
							StartBitmapMatrix[3] * startPer + EndBitmapMatrix[3] * per,
							StartBitmapMatrix[4] * startPer + EndBitmapMatrix[4] * per,
							StartBitmapMatrix[5] * startPer + EndBitmapMatrix[5] * per
						];
						shapes.fillStyles.fillStyles[i] = {
							fillStyleType: fillStyleType,
							bitmapId: bitmapId,
							bitmapMatrix: matrix
						};
						break;
				}
			}

			let EndBounds = char.EndBounds;
			let StartBounds = char.StartBounds;
			let bounds = {
				xMax: StartBounds.xMax * startPer + EndBounds.xMax * per,
				xMin: StartBounds.xMin * startPer + EndBounds.xMin * per,
				yMax: StartBounds.yMax * startPer + EndBounds.yMax * per,
				yMin: StartBounds.yMin * startPer + EndBounds.yMin * per
			};

			return {
				data: vtc.convert(shapes, true),
				bounds: bounds
			};
		};

		/**
		 * @returns {{}}
		 */
		SwfTag.prototype.parseFrameLabel = function()
		{
			return {
				name: this.bitio.getDataUntil("\0"),
				frame: 0
			};
		};

		/**
		 * @param tagType
		 * @returns {*}
		 */
		SwfTag.prototype.parseRemoveObject = function(tagType)
		{
			let bitio = this.bitio;
			if (tagType === 5) {
				return {
					CharacterId: bitio.getUI16(),
					Depth: bitio.getUI16()
				};
			}
			return {Depth: bitio.getUI16()};
		};

		/**
		 * @param tagType
		 * @param length
		 * @returns {{}}
		 */
		SwfTag.prototype.parseDefineButton = function(tagType, length)
		{
			let obj = {};
			obj.tagType = tagType;

			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let endOffset = bitio.byte_offset + length;
			obj.ButtonId = bitio.getUI16();

			let ActionOffset = 0;
			if (tagType !== 7) {
				obj.ReservedFlags = bitio.getUIBits(7);
				obj.TrackAsMenu = bitio.getUIBits(1);
				ActionOffset = bitio.getUI16();
			}

			obj.characters = _this.buttonCharacters(tagType);

			// actionScript
			if (tagType === 7) {
				obj.actions = _this.parseDoAction(endOffset - bitio.byte_offset);
			} else if (ActionOffset > 0) {
				obj.actions = _this.buttonActions(endOffset);
			}

			// set layer
			stage.setCharacter(obj.ButtonId, obj);
			if (bitio.byte_offset !== endOffset) {
				bitio.byte_offset = endOffset;
			}

			return obj;
		};

		/**
		 * @returns {Array}
		 */
		SwfTag.prototype.buttonCharacters = function(tagType)
		{
			let characters = [];
			let _this = this;
			let bitio = _this.bitio;
			while (bitio.getUI8() !== 0) {
				bitio.incrementOffset(-1, 0);
				let record = _this.buttonRecord(tagType);
				let depth = record.Depth;
				if (!(record.Depth in characters)) {
					characters[depth] = [];
				}
				characters[depth].push(record);
			}
			return characters;
		};

		/**
		 * @returns {{}}
		 */
		SwfTag.prototype.buttonRecord = function(tagType)
		{
			let _this = this;
			let bitio = _this.bitio;
			let obj = {};

			let reserved = bitio.getUIBits(2); // Reserved
			obj.PlaceFlagHasBlendMode = bitio.getUIBits(1);
			obj.PlaceFlagHasFilterList = bitio.getUIBits(1);
			obj.ButtonStateHitTest = bitio.getUIBits(1);
			obj.ButtonStateDown = bitio.getUIBits(1);
			obj.ButtonStateOver = bitio.getUIBits(1);
			obj.ButtonStateUp = bitio.getUIBits(1);
			if (!reserved && !obj.PlaceFlagHasBlendMode && !obj.PlaceFlagHasFilterList &&!obj.ButtonStateHitTest &&
				!obj.ButtonStateDown && !obj.ButtonStateOver && !obj.ButtonStateUp) return null;
			obj.CharacterId = bitio.getUI16();
			obj.Depth = bitio.getUI16();
			obj.PlaceFlagHasMatrix = 1;
			obj.Matrix = _this.matrix();
			if (tagType == 34) {
				obj.ColorTransform = _this.colorTransformWithAlpha();
				if (obj.PlaceFlagHasFilterList) {
					obj.SurfaceFilterList = _this.getFilterList();
				}
				if (obj.PlaceFlagHasBlendMode) {
					obj.BlendMode = bitio.getUI8();
				}
			}
			obj.PlaceFlagHasColorTransform = (obj.ColorTransform === undefined) ? 0 : 1;
			obj.PlaceFlagHasRatio = 0;
			obj.PlaceFlagHasClipDepth = 0;
			obj.Sound = null;
			return obj;
		};

		/**
		 * @param endOffset
		 * @returns {Array}
		 */
		SwfTag.prototype.buttonActions = function(endOffset)
		{
			let _this = this;
			let bitio = _this.bitio;
			let results = [];

			while (true) {
				let obj = {};
				let startOffset = bitio.byte_offset;
				let CondActionSize = bitio.getUI16();
				obj.CondIdleToOverDown = bitio.getUIBits(1);
				obj.CondOutDownToIdle = bitio.getUIBits(1);
				obj.CondOutDownToOverDown = bitio.getUIBits(1);
				obj.CondOverDownToOutDown = bitio.getUIBits(1);
				obj.CondOverDownToOverUp = bitio.getUIBits(1);
				obj.CondOverUpToOverDown = bitio.getUIBits(1);
				obj.CondOverUpToIdle = bitio.getUIBits(1);
				obj.CondIdleToOverUp = bitio.getUIBits(1);
				obj.CondKeyPress = bitio.getUIBits(7);
				obj.CondOverDownToIdle = bitio.getUIBits(1);

				// ActionScript
				let length = endOffset - bitio.byte_offset + 1;
				obj.ActionScript = _this.parseDoAction(length);
				results[results.length] = obj;

				if (!CondActionSize) {
					break;
				}
				bitio.byte_offset = startOffset + CondActionSize;
			}

			return results;
		};

		/**
		 * @param tagType
		 * @param length
		 * @returns {{}}
		 */
		SwfTag.prototype.parsePlaceObject = function(tagType, length)
		{
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let obj = {};
			obj.tagType = tagType;
			let startOffset = bitio.byte_offset;

			// 4 PlaceObject, 26 PlaceObject2, 70 PlaceObject3, 94 PlaceObject4
			if (tagType === 4) { // PlaceObject
				obj.CharacterId = bitio.getUI16();
				obj.Depth = bitio.getUI16();
				obj.Matrix = _this.matrix();
				obj.PlaceFlagHasMatrix = 1;

				if ((bitio.byte_offset - startOffset) < length) {
					obj.ColorTransform = _this.colorTransform();
					obj.PlaceFlagHasColorTransform = 1;
				}
			} else { // 26 PlaceObject2, 70 PlaceObject3, 94 PlaceObject4
				obj.PlaceFlagHasClipActions = bitio.getUIBits(1);
				if (stage.getVersion() < 5) {
					obj.PlaceFlagHasClipActions = 0;
				}
				obj.PlaceFlagHasClipDepth = bitio.getUIBits(1);
				obj.PlaceFlagHasName = bitio.getUIBits(1);
				obj.PlaceFlagHasRatio = bitio.getUIBits(1);
				obj.PlaceFlagHasColorTransform = bitio.getUIBits(1);
				obj.PlaceFlagHasMatrix = bitio.getUIBits(1);
				obj.PlaceFlagHasCharacter = bitio.getUIBits(1);
				obj.PlaceFlagMove = bitio.getUIBits(1);

				// PlaceObject3
				if (tagType === 70 || tagType === 94) {
					bitio.getUIBits(1); // Reserved
					obj.PlaceFlagOpaqueBackground = bitio.getUIBits(1);
					obj.PlaceFlagHasVisible = bitio.getUIBits(1);
					obj.PlaceFlagHasImage = bitio.getUIBits(1);
					obj.PlaceFlagHasClassName = bitio.getUIBits(1);
					obj.PlaceFlagHasCacheAsBitmap = bitio.getUIBits(1);
					obj.PlaceFlagHasBlendMode = bitio.getUIBits(1);
					obj.PlaceFlagHasFilterList = bitio.getUIBits(1);
				}

				obj.Depth = bitio.getUI16();

				if (obj.PlaceFlagHasClassName ||
					(obj.PlaceFlagHasImage && obj.PlaceFlagHasCharacter)
				) {
					obj.ClassName = bitio.getDataUntil("\0");
				}
				if (obj.PlaceFlagHasCharacter) {
					obj.CharacterId = bitio.getUI16();
				}
				if (obj.PlaceFlagHasMatrix) {
					obj.Matrix = _this.matrix();
				}
				if (obj.PlaceFlagHasColorTransform) {
					obj.ColorTransform = _this.colorTransformWithAlpha();
				}
				if (obj.PlaceFlagHasRatio) {
					obj.Ratio = bitio.getUI16();
				}
				if (obj.PlaceFlagHasName) {
					obj.Name = bitio.getDataUntil("\0");
				}
				if (obj.PlaceFlagHasClipDepth) {
					obj.ClipDepth = bitio.getUI16();
				}

				if (tagType === 70 || tagType === 94) {
					if (obj.PlaceFlagHasFilterList) {
						obj.SurfaceFilterList = _this.getFilterList();
					}
					if (obj.PlaceFlagHasBlendMode) {
						obj.BlendMode = bitio.getUI8();
					}
					// bitmapCacheBug ?
					if (obj.PlaceFlagHasCacheAsBitmap) {
						obj.BitmapCache = bitio.getUI8();
					}
					if (obj.PlaceFlagHasVisible) {
						obj.Visible = bitio.getUI8();
					}
					if (obj.PlaceFlagOpaqueBackground) {
						obj.BackgroundColor = _this.rgba();
					}
				}

				if (obj.PlaceFlagHasClipActions) {
					bitio.getUI16(); // Reserved
					obj.AllEventFlags = _this.parseClipEventFlags();
					obj.ClipActionRecords = _this.parseClipActionRecords();
				}

				// AMF3 encoded value
				if (tagType === 94 && this.byte_offset < startOffset+length-1) {
					window.alert('PlaceObject4: AMF3 encoded value not supported');
				}
			}

			return obj;
		};

		/**
		 * @returns {{}}
		 */
		SwfTag.prototype.parseClipEventFlags = function()
		{
			let _this = this;
			let obj = {};
			let bitio = _this.bitio;
			let stage = _this.stage;

			obj.keyUp = bitio.getUIBits(1);
			obj.keyDown = bitio.getUIBits(1);
			obj.mouseUp = bitio.getUIBits(1);
			obj.mouseDown = bitio.getUIBits(1);
			obj.mouseMove = bitio.getUIBits(1);
			obj.unload = bitio.getUIBits(1);
			obj.enterFrame = bitio.getUIBits(1);
			obj.load = bitio.getUIBits(1);

			// SWF version < 6 : always 0
			obj.dragOver = bitio.getUIBits(1);
			obj.rollOut = bitio.getUIBits(1);
			obj.rollOver = bitio.getUIBits(1);
			obj.releaseOutside = bitio.getUIBits(1);
			obj.release = bitio.getUIBits(1);
			obj.press = bitio.getUIBits(1);
			obj.initialize = bitio.getUIBits(1);

			obj.data = bitio.getUIBits(1);

			if (stage.getVersion() >= 6) {
				bitio.getUIBits(5); // Reserved
				obj.construct = bitio.getUIBits(1);
				obj.keyPress = bitio.getUIBits(1);
				obj.dragOut = bitio.getUIBits(1);
				bitio.getUIBits(8); // Reserved
			} else {
				obj.construct = 0;
				obj.keyPress = 0;
				obj.dragOut = 0;
			}

			return obj;
		};

		/**
		 * @returns {{}}
		 */
		SwfTag.prototype.clipEventFlagsIsClear = function(obj)
		{
			if (obj.keyUp) return false;
			if (obj.keyDown) return false;
			if (obj.mouseUp) return false;
			if (obj.mouseDown) return false;
			if (obj.mouseMove) return false;
			if (obj.unload) return false;
			if (obj.enterFrame) return false;
			if (obj.load) return false;
			if (obj.dragOver) return false;
			if (obj.rollOut) return false;
			if (obj.rollOver) return false;
			if (obj.releaseOutside) return false;
			if (obj.release) return false;
			if (obj.press) return false;
			if (obj.initialize) return false;
			if (obj.data) return false;
			if (obj.construct) return false;
			if (obj.keyPress) return false;
			if (obj.dragOut) return false;
			return true;

		};

		/**
		 * @returns {{}}
		 */
		SwfTag.prototype.parseClipActionRecords = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			let ClipActionRecords = [];
			let r = 0;
			while (true) {
				let EventFlags = _this.parseClipEventFlags();
				if (_this.clipEventFlagsIsClear(EventFlags)) break;
				ClipActionRecords[r] = {};
				ClipActionRecords[r].EventFlags = EventFlags;
				let ActionRecordSize = bitio.getUI32();
				if (EventFlags.keyPress) {
					ClipActionRecords[r].KeyCode = bitio.getUI8();
				}
				ClipActionRecords[r].Actions = _this.parseDoAction(ActionRecordSize);
				r++;
			}
			return ClipActionRecords;
		};

		/**
		 * @returns {Array}
		 */
		SwfTag.prototype.getFilterList = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			let result = [];
			let _getFilter = _this.getFilter;
			let NumberOfFilters = bitio.getUI8();
			for (let i = 0; i < NumberOfFilters; i++) {
				let filter = _getFilter.call(_this);
				if (filter) {
					result[result.length] = filter;
				}
			}
			return (result.length) ? result : null;
		};

		/**
		 * @return {{}}
		 */
		SwfTag.prototype.getFilter = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			let filterId = bitio.getUI8();
			let filter;
			switch (filterId) {
				case 0:
					filter = _this.dropShadowFilter();
					break;
				case 1:
					filter = _this.blurFilter();
					break;
				case 2:
					filter = _this.glowFilter();
					break;
				case 3:
					filter = _this.bevelFilter();
					break;
				case 4:
					filter = _this.gradientGlowFilter();
					break;
				case 5:
					filter = _this.convolutionFilter();
					break;
				case 6:
					filter = _this.colorMatrixFilter();
					break;
				case 7:
					filter = _this.gradientBevelFilter();
					break;
			}
			return filter;
		};

		/**
		 * @returns {DropShadowFilter}
		 */
		SwfTag.prototype.dropShadowFilter = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			let rgba = _this.rgba();
			let alpha = rgba.A;
			let color = rgba.R << 16 | rgba.G << 8 | rgba.B;
			let blurX = bitio.getFixed();
			let blurY = bitio.getFixed();
			let angle = bitio.getFixed() * 180 / _PI;
			let distance = bitio.getUI32() / 0x10000;
			let strength = bitio.getFixed8();
			let inner = (bitio.getUIBits(1)) ? true : false;
			let knockout = (bitio.getUIBits(1)) ? true : false;
			// CompositeSource:  Always 1
			let hideObject = (bitio.getUIBits(1)) ? false : true;
			// passes: Number of blur passes
			let quality = bitio.getUIBits(5);

			if (!strength) {
				return null;
			}

			return new DropShadowFilter(
				distance, angle, color, alpha, blurX, blurY,
				strength, quality, inner, knockout, hideObject
			);
		};

		/**
		 * @returns {BlurFilter}
		 */
		SwfTag.prototype.blurFilter = function()
		{
			let bitio = this.bitio;
			let blurX = bitio.getFixed();
			let blurY = bitio.getFixed();
			// passes
			let quality = bitio.getUIBits(5);
			bitio.getUIBits(3); // Reserved

			return new BlurFilter(blurX, blurY, quality);
		};

		/**
		 * @returns {GlowFilter}
		 */
		SwfTag.prototype.glowFilter = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			// glowcolor
			let rgba = _this.rgba();
			let alpha = rgba.A;
			let color = rgba.R << 16 | rgba.G << 8 | rgba.B;
			let blurX = bitio.getFixed();
			let blurY = bitio.getFixed();
			let strength = bitio.getFixed8() / 256;
			// innerGlow
			let inner = (bitio.getUIBits(1)) ? true : false;
			let knockout = (bitio.getUIBits(1)) ? true : false;
			// compositeSource
			bitio.getUIBits(1);
			// passes
			let quality = bitio.getUIBits(5);

			if (!strength) {
				return null;
			}

			return new GlowFilter(
				color, alpha, blurX, blurY,
				strength, quality, inner, knockout
			);
		};

		/**
		 * @returns {BevelFilter}
		 */
		SwfTag.prototype.bevelFilter = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			let rgba;
			// highlightColor
			rgba = _this.rgba();
			let highlightAlpha = rgba.A;
			let highlightColor = rgba.R << 16 | rgba.G << 8 | rgba.B;
			// shadowColor
			rgba = _this.rgba();
			let shadowAlpha = rgba.A;
			let shadowColor = rgba.R << 16 | rgba.G << 8 | rgba.B;

			let blurX = bitio.getFixed();
			let blurY = bitio.getFixed();
			let angle = bitio.getFixed() * 180 / _PI;
			let distance = bitio.getFixed();
			let strength = bitio.getFixed8();
			// innerShadow
			let inner = (bitio.getUIBits(1)) ? true : false;
			let knockout = (bitio.getUIBits(1)) ? true : false;
			bitio.getUIBits(1); // CompositeSource
			let OnTop = bitio.getUIBits(1);
			// passes
			let quality = bitio.getUIBits(4);

			let type = "inner";
			if (!inner) {
				if (OnTop) {
					type = "full";
				} else {
					type = "outer";
				}
			}

			if (!strength) {
				return null;
			}

			return new BevelFilter(
				distance, angle, highlightColor, highlightAlpha,
				shadowColor, shadowAlpha, blurX, blurY,
				strength, quality, type, knockout
			);
		};

		/**
		 * @returns {GradientGlowFilter}
		 */
		SwfTag.prototype.gradientGlowFilter = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			let i;
			let NumColors = bitio.getUI8();

			// gradientColors
			let colors = [];
			let alphas = [];
			for (i = 0; i < NumColors; i++) {
				let rgba = _this.rgba();
				alphas[alphas.length] = rgba.A;
				colors[colors.length] = rgba.R << 16 | rgba.G << 8 | rgba.B;
			}

			// gradientRatio
			let ratios = [];
			for (i = 0; i < NumColors; i++) {
				ratios[ratios.length] = bitio.getUI8();
			}

			let blurX = bitio.getFixed();
			let blurY = bitio.getFixed();
			let angle = bitio.getFixed() * 180 / _PI;
			let distance = bitio.getFixed();
			let strength = bitio.getFixed8();
			// innerShadow
			let inner = (bitio.getUIBits(1)) ? true : false;
			let knockout = (bitio.getUIBits(1)) ? true : false;
			// compositeSource
			bitio.getUIBits(1);
			let OnTop = bitio.getUIBits(1);
			// passes
			let quality = bitio.getUIBits(4);

			let type = "inner";
			if (!inner) {
				if (OnTop) {
					type = "full";
				} else {
					type = "outer";
				}
			}

			if (!strength) {
				return null;
			}

			return new GradientGlowFilter(
				distance, angle, colors, alphas, ratios,
				blurX, blurY, strength, quality, type, knockout
			);
		};

		/**
		 * @returns {ConvolutionFilter}
		 */
		SwfTag.prototype.convolutionFilter = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			let obj = {};

			obj.MatrixX = bitio.getUI8();
			obj.MatrixY = bitio.getUI8();
			obj.Divisor = bitio.getFloat16(); // | bitio.getFloat16();
			obj.Bias = bitio.getFloat16(); // | bitio.getFloat16();

			let count = obj.MatrixX * obj.MatrixY;
			let MatrixArr = [];
			while (count--) {
				MatrixArr[MatrixArr.length] = bitio.getFloat16(); // bitio.getUI32();
			}
			obj.DefaultColor = _this.rgba();
			bitio.getUIBits(6); // Reserved
			obj.Clamp = bitio.getUIBits(1);
			obj.PreserveAlpha = bitio.getUIBits(1);

			return new ConvolutionFilter(
			);
		};

		/**
		 * @returns {GradientBevelFilter}
		 */
		SwfTag.prototype.gradientBevelFilter = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			let NumColors = bitio.getUI8();

			let i;
			// gradientColors
			let colors = [];
			let alphas = [];
			for (i = 0; i < NumColors; i++) {
				let rgba = _this.rgba();
				alphas[alphas.length] = rgba.A;
				colors[colors.length] = rgba.R << 16 | rgba.G << 8 | rgba.B;
			}
			// gradientRatio
			let ratios = [];
			for (i = 0; i < NumColors; i++) {
				ratios[ratios.length] = bitio.getUI8();
			}

			let blurX = bitio.getFixed();
			let blurY = bitio.getFixed();
			let angle = bitio.getFixed() * 180 / _PI;
			let distance = bitio.getFixed();
			let strength = bitio.getFixed8();
			// innerShadow
			let inner = (bitio.getUIBits(1)) ? true : false;
			let knockout = (bitio.getUIBits(1)) ? true : false;
			bitio.getUIBits(1); // CompositeSource
			let OnTop = bitio.getUIBits(1);
			// passes: Number of blur passes
			let quality = bitio.getUIBits(4);

			let type = "inner";
			if (!inner) {
				if (OnTop) {
					type = "full";
				} else {
					type = "outer";
				}
			}

			if (!strength) {
				return null;
			}

			return new GradientBevelFilter(
				distance, angle, colors, alphas, ratios,
				blurX, blurY, strength, quality, type, knockout
			);
		};

		/**
		 * @returns {ColorMatrixFilter}
		 */
		SwfTag.prototype.colorMatrixFilter = function()
		{
			let bitio = this.bitio;
			let MatrixArr = [];
			for (let i = 0; i < 20; i++) {
				MatrixArr[MatrixArr.length] = bitio.getFloat32();
			}
			return new ColorMatrixFilter(
				MatrixArr
			);
		};

		/**
		 * @returns {Array}
		 */
		SwfTag.prototype.colorTransform = function()
		{
			let bitio = this.bitio;

			let result = [1, 1, 1, 1, 0, 0, 0, 0];
			// let first6bits = bitio.getUIBits(6);
			// first6bits >> 5;
			// let HasMultiTerms = (first6bits >> 4) & 1;
			// let nbits = first6bits & 0x0f;
			let HasAddTerms = bitio.getUIBit();
			let HasMultiTerms = bitio.getUIBit();
			let nbits = bitio.getUIBits(4);

			if (HasMultiTerms) {
				result[0] = bitio.getSIBits(nbits) / 256;
				result[1] = bitio.getSIBits(nbits) / 256;
				result[2] = bitio.getSIBits(nbits) / 256;
			}

			if (HasAddTerms) {
				result[4] = bitio.getSIBits(nbits);
				result[5] = bitio.getSIBits(nbits);
				result[6] = bitio.getSIBits(nbits);
			}
			bitio.byteAlign();

			return result;
		};

		/**
		 * @returns {Array}
		 */
		SwfTag.prototype.colorTransformWithAlpha = function()
		{
			let bitio = this.bitio;

			let result = [1, 1, 1, 1, 0, 0, 0, 0];
			let HasAddTerms = bitio.getUIBit();
			let HasMultiTerms = bitio.getUIBit();
			let nbits = bitio.getUIBits(4);

			if (HasMultiTerms) {
				result[0] = bitio.getSIBits(nbits) / 256;
				result[1] = bitio.getSIBits(nbits) / 256;
				result[2] = bitio.getSIBits(nbits) / 256;
				result[3] = bitio.getSIBits(nbits) / 256;
			}

			if (HasAddTerms) {
				result[4] = bitio.getSIBits(nbits);
				result[5] = bitio.getSIBits(nbits);
				result[6] = bitio.getSIBits(nbits);
				result[7] = bitio.getSIBits(nbits);
			}
			bitio.byteAlign();

			return result;
		};

		/**
		 * @param dataLength
		 */
		SwfTag.prototype.parseDefineSprite = function(dataLength,tagLevel)
		{
			let _this = this;
			let bitio = _this.bitio;
			let characterId = bitio.getUI16();
			let frameCount = bitio.getUI16();
			let stage = _this.stage;
			_this.tagLevel = tagLevel;
			//stage.soundStreamLevels[_this.tagLevel].currentSoundStream = stage.currentSoundStream;
			stage.soundStreamLevels[stage.soundStreamLevels.length-1].currentFrame = stage.currentFrame;
			stage.soundStreamLevels.push({"CharacterId":characterId, "SoundStreamFirstBlock":true});
			stage.setCharacter(characterId, _this.parseTags(dataLength, characterId,tagLevel+1));
			stage.soundStreamLevels.pop();
			_this.tagLevel--;
			stage.currentFrame = stage.soundStreamLevels[stage.soundStreamLevels.length-1].currentFrame;
		};

		/**
		 * @param length
		 * @returns {ActionScript}
		 */
		SwfTag.prototype.parseDoAction = function(length)
		{
			let _this = this;
			let bitio = _this.bitio;
			let data = bitio.getData(length);
			return new ActionScript(data);
		};

		/**
		 * @param length
		 */
		SwfTag.prototype.parseDoInitAction = function(length)
		{
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let spriteId = bitio.getUI16();

			let as = new ActionScript(bitio.getData(length - 2), undefined, undefined, true);
			let mc = stage.getParent();
			mc.variables = {};
			let action = mc.createActionScript2(as);
			let packages = stage.packages;
			if (spriteId in packages) {
				mc.active = true;
				action.apply(mc);
				mc.active = false;
			}
			stage.initActions[spriteId] = action;
		};

		/**
		 * @returns {{}}
		 */
		SwfTag.prototype.parseDefineSceneAndFrameLabelData = function()
		{
			let i;
			let bitio = this.bitio;
			let obj = {};
			obj.SceneCount = bitio.getU30();
			obj.sceneInfo = [];
			for (i = 0; i < obj.SceneCount; i++) {
				obj.sceneInfo[i] = {
					offset: bitio.getU30(),
					name: decodeURIComponent(bitio.getDataUntil("\0"))
				};
			}

			obj.FrameLabelCount = bitio.getU30();
			obj.frameInfo = [];
			for (i = 0; i < obj.FrameLabelCount; i++) {
				obj.frameInfo[i] = {
					num: bitio.getU30(),
					label: decodeURIComponent(bitio.getDataUntil("\0"))
				};
			}
			return obj;
		};

		/**
		 * @param tagType
		 * @returns {{}}
		 */
		SwfTag.prototype.parseSoundStreamHead = function(tagType)
		{
			let obj = {};
			obj.tagType = tagType;
			let _this = this;
			let stage = _this.stage;
			let bitio = this.bitio;
			bitio.getUIBits(4); // Reserved

			// 0 = 5.5kHz, 1 = 11kHz, 2 = 22kHz, 3 = 44kHz
			obj.PlaybackSoundStreamRate = bitio.getUIBits(2);

			// 0 = 8-bit, 1 = 16-bit
			obj.PlaybackSoundStreamSize = bitio.getUIBits(1);

			// 0 = Mono, 1 = Stereo
			obj.PlaybackSoundStreamType = bitio.getUIBits(1);

			// 0 = Uncompressed(native-endian)
			// 1 = ADPCM
			// 2 = MP3
			// 3 = Uncompressed(little-endian)
			// 4 = NellyMoser 16 kHz
			// 5 = NellyMoser 8 kHz
			// 6 = NellyMoser 22.050 kHz
			// 11 = Speex
			obj.SoundStreamCompression = bitio.getUIBits(4);
			// 0 = 5.5kHz, 1 = 11kHz, 2 = 22kHz, 3 = 44kHz
			obj.SoundStreamRate = bitio.getUIBits(2);

			// 0 = 8-bit, 1 = 16-bit
			obj.SoundStreamSize = bitio.getUIBits(1);

			// 0 = Mono, 1 = Stereo
			obj.SoundStreamType = bitio.getUIBits(1);

			// Average number of samples in each SoundStreamBlock.
			obj.SoundStreamSampleCount = bitio.getUI16();

			obj.LatencySeek = 0;
			// The value of LatencySeek here should match the SeekSamples field in the first SoundStreamBlock for this stream.
			if (obj.SoundStreamCompression == 2) {
				obj.LatencySeek = bitio.getSI16();
			}
			obj.SoundStreamOffsetCurrentTime = obj.LatencySeek / soundRates[obj.SoundStreamRate];

			obj.SoundStreamId = stage.soundStreamLevels[this.tagLevel].CharacterId;
			obj.FrameRanges = [];
			obj.soundStreamOutputLatency = 0;
			obj.soundStreamFirstBlock = true;
			obj.tagLevel = this.tagLevel;
			stage.soundStreams[stage.soundStreams.length] = obj;
			stage.soundStreamCount++;

			return obj;
		};

		/**
		 * @param tagType
		 * @param length
		 */
		SwfTag.prototype.parseDoABC = function(tagType, length)
		{
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			stage.abcFlag = true;
			let startOffset = bitio.byte_offset;

			let obj = {};
			obj.tagType = tagType;
			obj.Flags = bitio.getUI32();
			obj.Name = bitio.getDataUntil("\0");
			let offset = length - (bitio.byte_offset - startOffset);
			let ABCData = bitio.getData(offset);
			let ABCBitIO = new BitIO();
			ABCBitIO.setData(ABCData);

			// version
			obj.minorVersion = ABCBitIO.getUI16();
			obj.majorVersion = ABCBitIO.getUI16();

			// integer
			obj.integer = _this.ABCInteger(ABCBitIO);

			// uinteger
			obj.uinteger = _this.ABCUinteger(ABCBitIO);

			// double
			obj.double = _this.ABCDouble(ABCBitIO);

			// string_info
			obj.string = _this.ABCStringInfo(ABCBitIO);

			// namespace_info
			obj.namespace = _this.ABCNameSpaceInfo(ABCBitIO);

			// ns_set_info
			obj.nsSet = _this.ABCNsSetInfo(ABCBitIO);

			// multiname_info;
			obj.multiname_info = _this.ABCMultiNameInfo(ABCBitIO);

			let i = 0;

			// method_info
			obj.method = [];
			let methodCount = ABCBitIO.getU30();
			if (methodCount) {
				let method = [];
				for (i = 0; i < methodCount; i++) {
					method[i] = _this.ABCMethodInfo(ABCBitIO);
				}
				obj.method = method;
			}

			// metadata_info
			obj.metadata = [];
			let metadataCount = ABCBitIO.getU30();
			if (metadataCount) {
				let metadataInfo = [];
				for (i = 0; i < metadataCount; i++) {
					metadataInfo[i] = _this.ABCMetadataInfo(ABCBitIO);
				}
				obj.metadata = metadataInfo;
			}

			let classCount = ABCBitIO.getU30();
			obj.instance = [];
			obj.class = [];
			if (classCount) {
				// instance_info
				let instance = [];
				for (i = 0; i < classCount; i++) {
					instance[i] = _this.ABCInstanceInfo(ABCBitIO);
				}
				obj.instance = instance;

				// class_info
				let classInfo = [];
				for (i = 0; i < classCount; i++) {
					classInfo[i] = _this.ABCClassInfo(ABCBitIO);
				}
				obj.class = classInfo;
			}

			// script_info
			obj.script = [];
			let scriptCount = ABCBitIO.getU30();
			if (scriptCount) {
				let script = [];
				for (i = 0; i < scriptCount; i++) {
					script[i] = _this.ABCScriptInfo(ABCBitIO);
				}
				obj.script = script;
			}

			// method_body_info
			obj.methodBody = [];
			let methodBodyCount = ABCBitIO.getU30();
			if (methodBodyCount) {
				let methodBody = [];
				for (i = 0; i < methodBodyCount; i++) {
					let mBody = _this.ABCMethodBodyInfo(ABCBitIO);
					methodBody[mBody.method] = mBody;
				}
				obj.methodBody = methodBody;
			}

			// build names
			obj = _this.ABCMultinameToString(obj);

			// build instance
			_this.ABCBuildInstance(obj);
		};

		/**
		 * @param obj
		 */
		SwfTag.prototype.ABCBuildInstance = function(obj)
		{
			let _this = this;
			let instances = obj.instance;
			let length = instances.length;
			let namespaces = obj.namespace;
			let string = obj.string;
			let stage = _this.stage;
			let names = obj.names;
			for (let i = 0; i < length; i++) {
				let instance = instances[i];
				let flag = instance.flags;

				let nsIndex = null;
				if (flag & 0x08) {
					nsIndex = instance.protectedNs;
				}

				let object = {};
				if (nsIndex) {
					let nObj = namespaces[nsIndex];
					object = string[nObj.name];
				} else {
					object = names[instance.name];
				}

				let values = object.split(":");
				let className = values.pop();
				let ns = values.pop();

				// build parent
				let AVM2 = function (mc) { this["__swf2js__::builder"] = mc; };
				let prop = AVM2.prototype;

				// constructor
				prop[className] = _this.ABCCreateActionScript3(obj, instance.iinit, object);

				// prototype
				let traits = instance.trait;
				let tLength = traits.length;
				let register = [];
				let rCount = 1;
				if (tLength) {
					for (let idx = 0; idx < tLength; idx++) {
						let trait = traits[idx];
						let tName = names[trait.name];
						let tNames = tName.split("::");
						let pName = tNames.pop();
						let kind = trait.kind;

						let val;
						switch (kind) {
							case 0: // Slot
								register[rCount++] = pName;
								break;
							case 1: // Method
							case 2: // Getter
							case 3: // Setter
								val = _this.ABCCreateActionScript3(obj, trait.data.info, object);
								break;
							case 4: // Class
								console.log("build: Class");
								break;
							case 5: // Function
								console.log("build: Function");
								break;
							case 6: // Const
								console.log("build: Const");
								break;
						}
						prop[pName] = val;
					}
				}

				let localName = "__swf2js__:" + object;
				prop[localName] = {};

				// extends
				let superName = instance.superName;
				prop[localName].extends = names[superName];

				// register
				prop[localName].register = register;

				// build
				let abc = stage.abc;
				let classObj = stage.avm2;
				if (ns) {
					let nss = ns.split(".");
					let nLen = nss.length;
					for (let nIdx = 0; nIdx < nLen; nIdx++) {
						if (!(nss[nIdx] in classObj)) {
							classObj[nss[nIdx]] = {};
							abc[nss[nIdx]] = {};
						}
						classObj = classObj[nss[nIdx]];
						abc = abc[nss[nIdx]];
					}
				}

				abc[className] = AVM2;
				classObj[className] = new AVM2();
			}
		};

		/**
		 * @param obj
		 * @param methodId
		 * @param abcKey
		 */
		SwfTag.prototype.ABCCreateActionScript3 = function(obj, methodId, abcKey)
		{
			let stage = this.stage;
			return (function(data, id, ns, stage)
			{
				return function()
				{
					let as3 = new ActionScript3(data, id, ns, stage);
					as3.caller = this;
					as3.args = arguments;
					return as3.execute();
				};
			})(obj, methodId, abcKey, stage);
		};

		/**
		 * @param obj
		 * @returns {*}
		 */
		SwfTag.prototype.ABCMultinameToString = function(obj)
		{
			let multinames = obj.multiname_info;
			let length = multinames.length;
			let string = obj.string;
			let ns = obj.namespace;
			let names = [];
			for (let i = 1; i < length; i++) {
				let info = multinames[i];
				let str = "";

				switch (info.kind) {
					case 0x07: // QName
					case 0x0D: // QNameA
						let namespace_info = ns[info.ns];
						switch (namespace_info.kind) {
							default:
								str += string[namespace_info.name];
								break;
							case 0x05:
								str += "private";
								break;
						}

						if (str !== "") {
							str += "::";
						}

						str += string[info.name];
						break;
					case 0x0F: // RTQName
					case 0x10: // RTQNameA
						console.log("RTQName", i, info);
						break;
					case 0x09: // Multiname
					case 0x0E: // MultinameA
						str = string[info.name];
						break;
					case 0x1B: // MultinameL
					case 0x1C: // MultinameLA
						str = null;
						break;
					case 0x11: // RTQNameL
					case 0x12: // RTQNameLA
						console.log("RTQNameL", i, info);

						break;
				}
				names[i] = str;
			}
			obj.names = names;
			return obj;
		};

		/**
		 * @param ABCBitIO
		 * @returns {Array}
		 */
		SwfTag.prototype.ABCInteger = function(ABCBitIO)
		{
			let array = [];
			let count = ABCBitIO.getU30();
			if (count) {
				for (let i = 1; i < count; i++) {
					array[i] = ABCBitIO.getS30();
				}
			}
			return array;
		};

		/**
		 * @param ABCBitIO
		 * @returns {Array}
		 */
		SwfTag.prototype.ABCUinteger = function(ABCBitIO)
		{
			let array = [];
			let count = ABCBitIO.getU30();
			if (count) {
				for (let i = 1; i < count; i++) {
					array[i] = ABCBitIO.getU30();
				}
			}
			return array;
		};

		/**
		 * @param ABCBitIO
		 * @returns {Array}
		 */
		SwfTag.prototype.ABCDouble = function(ABCBitIO)
		{
			let array = [];
			let count = ABCBitIO.getU30();
			if (count) {
				for (let i = 1; i < count; i++) {
					array[i] = ABCBitIO.getFloat64LittleEndian();
				}
			}
			return array;
		};

		/**
		 * @param ABCBitIO
		 * @returns {Array}
		 */
		SwfTag.prototype.ABCStringInfo = function(ABCBitIO)
		{
			let array = [];
			let count = ABCBitIO.getU30();
			if (count) {
				for (let i = 1; i < count; i++) {
					array[i] = ABCBitIO.AbcReadString();
				}
			}
			return array;
		};

		/**
		 * @param ABCBitIO
		 * @returns {Array}
		 */
		SwfTag.prototype.ABCNameSpaceInfo = function(ABCBitIO)
		{
			let array = [];
			let count = ABCBitIO.getU30();
			if (count) {
				for (let i = 1; i < count; i++) {
					array[i] =
					{
						kind: ABCBitIO.getUI8(),
						name: ABCBitIO.getU30()
					};
				}
			}
			return array;
		};

		/**
		 * @param ABCBitIO
		 * @returns {Array}
		 */
		SwfTag.prototype.ABCNsSetInfo = function(ABCBitIO)
		{
			let array = [];
			let count = ABCBitIO.getU30();
			if (count) {
				for (let i = 1; i < count; i++) {
					let nsCount = ABCBitIO.getU30();
					let ns = [];
					if (nsCount) {
						for (let j = 0; j < nsCount; j++) {
							ns[j] = ABCBitIO.getU30();
						}
					}
					array[i] = ns;
				}
			}
			return array;
		};

		/**
		 * @param ABCBitIO
		 * @returns {Array}
		 */
		SwfTag.prototype.ABCMultiNameInfo = function(ABCBitIO)
		{
			let array = [];
			let count = ABCBitIO.getU30();
			if (count) {
				for (let i = 1; i < count; i++) {
					let obj = {};
					obj.kind = ABCBitIO.getUI8();
					switch (obj.kind) {
						case 0x07: // QName
						case 0x0D: // QNameA
							obj.ns = ABCBitIO.getU30();
							obj.name = ABCBitIO.getU30();
							break;
						case 0x0F: // RTQName
						case 0x10: // RTQNameA
							obj.name = ABCBitIO.getU30();
							break;
						case 0x09: // Multiname
						case 0x0E: // MultinameA
							obj.name = ABCBitIO.getU30();
							obj.ns_set = ABCBitIO.getU30();
							break;
						case 0x1B: // MultinameL
						case 0x1C: // MultinameLA
							obj.ns_set = ABCBitIO.getU30();
							break;
						case 0x11: // RTQNameL
						case 0x12: // RTQNameLA
							break;
					}
					array[i] = obj;
				}
			}
			return array;
		};

		/**
		 * @param ABCBitIO
		 * @returns {{}}
		 */
		SwfTag.prototype.ABCMethodInfo = function(ABCBitIO)
		{
			let obj = {};
			let i;
			let count = ABCBitIO.getU30();
			obj.paramCount = count;
			obj.returnType = ABCBitIO.getU30();
			obj.paramType = [];
			if (count) {
				let paramType = [];
				for (i = 0; i < count; i++) {
					paramType[paramType.length] = ABCBitIO.getU30();
				}
				obj.paramType = paramType;
			}

			obj.name = ABCBitIO.getU30();
			obj.flags = ABCBitIO.getUI8();

			obj.options = [];
			if (obj.flags === 0x08) {
				let options = [];
				let optionCount = ABCBitIO.getU30();
				if (optionCount) {
					for (i = 0; i < optionCount; i++) {
						options[options.length] = {
							val: ABCBitIO.getU30(),
							kind: ABCBitIO.getUI8()
						};
					}
				}
				obj.options = options;
			}

			obj.paramName = [];
			if (obj.flags === 0x80) {
				let paramName = [];
				if (count) {
					for (i = 0; i < count; i++) {
						paramName[paramName.length] = ABCBitIO.getU30();
					}
				}
				obj.paramName = paramName;
			}

			return obj;
		};

		/**
		 * @param ABCBitIO
		 * @returns {{}}
		 */
		SwfTag.prototype.ABCMetadataInfo = function(ABCBitIO)
		{
			let obj = {};
			obj.name = ABCBitIO.getU30();
			obj.items = [];

			let count = ABCBitIO.getU30();
			if (count) {
				let items = [];
				for (let i = 0; i < count; i++) {
					items[items.length] = {
						key: ABCBitIO.getU30(),
						value: ABCBitIO.getU30()
					};
				}
				obj.items = items;
			}

			return obj;
		};

		/**
		 * @param ABCBitIO
		 * @returns {{}}
		 */
		SwfTag.prototype.ABCInstanceInfo = function(ABCBitIO)
		{
			let obj = {};
			obj.name = ABCBitIO.getU30();
			obj.superName = ABCBitIO.getU30();
			obj.flags = ABCBitIO.getUI8();
			if (obj.flags & 0x08) {
				obj.protectedNs = ABCBitIO.getU30();
			}

			let count = ABCBitIO.getU30();
			obj.interfaces = [];
			if (count) {
				let interfaces = [];
				for (let i = 0; i < count; i++) {
					interfaces[interfaces.length] = ABCBitIO.getU30();
				}
				obj.interfaces = interfaces;
			}

			obj.iinit = ABCBitIO.getU30();
			obj.trait = this.ABCTrait(ABCBitIO);

			return obj;
		};

		/**
		 * @param ABCBitIO
		 * @returns {{}}
		 */
		SwfTag.prototype.ABCClassInfo = function(ABCBitIO)
		{
			let obj = {};
			obj.cinit = ABCBitIO.getU30();
			obj.trait = this.ABCTrait(ABCBitIO);
			return obj;
		};

		/**
		 * @param ABCBitIO
		 */
		SwfTag.prototype.ABCScriptInfo = function(ABCBitIO)
		{
			let obj = {};
			obj.init = ABCBitIO.getU30();
			obj.trait = this.ABCTrait(ABCBitIO);
			return obj;
		};

		/**
		 * @param ABCBitIO
		 * @returns {{}}
		 */
		SwfTag.prototype.ABCMethodBodyInfo = function(ABCBitIO)
		{
			let _this = this;
			let obj = {};
			obj.method = ABCBitIO.getU30();
			obj.maxStack = ABCBitIO.getU30();
			obj.localCount = ABCBitIO.getU30();
			obj.initScopeDepth = ABCBitIO.getU30();
			obj.maxScopeDepth = ABCBitIO.getU30();
			let i;
			let count = ABCBitIO.getU30();
			let codes = [];
			if (count) {
				codes = _this.ABCBuildCode(ABCBitIO, count);
			}
			obj.codes = codes;

			count = ABCBitIO.getU30();
			let exceptions = [];
			if (count) {
				for (i = 0; i < count; i++) {
					exceptions[exceptions.length] = _this.ABCException(ABCBitIO);
				}
			}
			obj.exceptions = exceptions;
			obj.trait = _this.ABCTrait(ABCBitIO);
			return obj;
		};

		/**
		 * @param ABCBitIO
		 * @param count
		 * @returns {Array}
		 */
		SwfTag.prototype.ABCBuildCode = function(ABCBitIO, count)
		{
			let array = [];
			let cacheOffset;
			for (let i = 0; i < count; i++) {
				let obj = {};
				let offset = 0;

				let code = ABCBitIO.getUI8();
				obj.code = code;
				switch (code) {
					case 0x86: // astype
					case 0x41: // call
					case 0x80: // coerce
					case 0x42: // construct
					case 0x49: // constructsuper
					case 0xf1: // debugfile
					case 0xf0: // debugline
					case 0x94: // declocal
					case 0xc3: // declocal_i
					case 0x6a: // deleteproperty
					case 0x06: // dxns
					case 0x5e: // findproperty
					case 0x5d: // findpropstrict
					case 0x59: // getdescendants
					case 0x6e: // getglobalslot
					case 0x60: // getlex
					case 0x62: // getlocal
					case 0x66: // getproperty
					case 0x6c: // getslot
					case 0x04: // getsuper
					case 0x92: // inclocal
					case 0xc2: // inclocal_i
					case 0x68: // initproperty
					case 0xb2: // istype
					case 0x08: // kill
					case 0x56: // newarray
					case 0x5a: // newcatch
					case 0x58: // newclass
					case 0x40: // newfunction
					case 0x55: // newobject
					case 0x2f: // pushdouble
					case 0x2d: // pushint
					case 0x31: // pushnamespace
					case 0x25: // pushshort
					case 0x2c: // pushstring
					case 0x2e: // pushuint
					case 0x63: // setlocal
					case 0x6f: // setglobalslot
					case 0x61: // setproperty
					case 0x6d: // setslot
					case 0x05: // setsuper
						cacheOffset = ABCBitIO.byte_offset;
						obj.value1 = ABCBitIO.getU30();
						offset += (ABCBitIO.byte_offset - cacheOffset);
						break;
					case 0x1b: // lookupswitch
						obj.value1 = ABCBitIO.getSI24();
						offset += 3;
						cacheOffset = ABCBitIO.byte_offset;
						obj.value2 = ABCBitIO.getSI24();
						offset += (ABCBitIO.byte_offset - cacheOffset);
						obj.value3 = ABCBitIO.getSI24();
						offset += 3;
						break;
					case 0x65: // getscopeobject
					case 0x24: // pushbyte
						obj.value1 = ABCBitIO.getSI8();
						offset += 1;
						break;
					case 0x32: // hasnext2
						obj.value1 = ABCBitIO.getSI8();
						obj.value2 = ABCBitIO.getSI8();
						offset += 2;
						break;
					case 0x13: // ifeq
					case 0x12: // iffalse
					case 0x18: // ifge
					case 0x17: // ifgt
					case 0x16: // ifle
					case 0x15: // iflt
					case 0x0f: // ifnge
					case 0x0e: // ifngt
					case 0x0d: // ifnle
					case 0x0c: // ifnlt
					case 0x14: // ifne
					case 0x19: // ifstricteq
					case 0x1a: // ifstrictne
					case 0x11: // iftrue
					case 0x10: // jump
						obj.value1 = ABCBitIO.getSI24();
						offset += 3;
						break;
					case 0x43: // callmethod
					case 0x46: // callproperty
					case 0x4c: // callproplex
					case 0x4f: // callpropvoid
					case 0x44: // callstatic
					case 0x45: // callsuper
					case 0x4e: // callsupervoid
					case 0x4a: // constructprop
					case 0xef: // debug
						cacheOffset = ABCBitIO.byte_offset;
						obj.value1 = ABCBitIO.getU30();
						obj.value2 = ABCBitIO.getU30();
						offset += (ABCBitIO.byte_offset - cacheOffset);
						break;
					//default:
					//	console.log('SwfTag.prototype.ABCBuildCode, code: '+code);
					//	break;
				}

				obj.offset = offset;
				array[i] = obj;

				i += offset;
			}
			return array;
		};

		/**
		 * @param ABCBitIO
		 * @returns {{}}
		 */
		SwfTag.prototype.ABCException = function(ABCBitIO)
		{
			let obj = {};
			obj.from = ABCBitIO.getU30();
			obj.to = ABCBitIO.getU30();
			obj.target = ABCBitIO.getU30();
			obj.excType = ABCBitIO.getU30();
			obj.varName = ABCBitIO.getU30();
			return obj;
		};

		/**
		 * @param ABCBitIO
		 * @returns {Array}
		 */
		SwfTag.prototype.ABCTrait = function(ABCBitIO)
		{
			let count = ABCBitIO.getU30();
			let trait = [];
			if (count) {
				for (let i = 0; i < count; i++) {
					let tObj = {};
					tObj.name = ABCBitIO.getU30();
					let tag = ABCBitIO.getUI8();
					let kind = tag & 0x0f;
					let attributes = (kind >> 4) & 0x0f;

					let data = {};
					switch (kind) {
						default:
							console.log("ERROR:" + kind);
							break;
						case 0: // Trait_Slot
						case 6: // Trait_Const
							data.id = ABCBitIO.getU30();
							data.name = ABCBitIO.getU30();
							data.index = ABCBitIO.getU30();
							data.kind = null;
							if (data.index !== 0) {
								data.kind = ABCBitIO.getUI8();
							}
							break;
						case 1: // Trait_Method
						case 2: // Trait_Getter
						case 3: // Trait_Setter
							data.id = ABCBitIO.getU30();
							data.info = ABCBitIO.getU30();
							break;
						case 4: // Trait_Class
							data.id = ABCBitIO.getU30();
							data.info = ABCBitIO.getU30();
							break;
						case 5: // Trait_Function
							data.id = ABCBitIO.getU30();
							data.info = ABCBitIO.getU30();
							break;
					}
					tObj.kind = kind;
					tObj.data = data;

					if (attributes & 0x04) {
						let metadataCount = ABCBitIO.getU30();
						let metadata = [];
						if (metadataCount) {
							for (let j = 0; j < metadataCount; j++) {
								metadata[metadata.length] = ABCBitIO.getU30();
							}
						}
						tObj.metadata = metadata;
					}

					trait[trait.length] = tObj;
				}
			}

			return trait;
		};

		/**
		 * parseSymbolClass
		 */
		SwfTag.prototype.parseSymbolClass = function()
		{
			let bitio = this.bitio;
			let stage = this.stage;
			let symbols = stage.symbols;
			let count = bitio.getUI16();
			if (count) {
				while (count--) {
					let tagId = bitio.getUI16();
					symbols[tagId] = bitio.getDataUntil("\0");
				}
			}
		};

		/**
		 * @param tagType
		 * @param length
		 */
		SwfTag.prototype.parseDefineSound = function(tagType, length)
		{
			let obj = {};
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let startOffset = bitio.byte_offset;

			obj.tagType = tagType;
			obj.SoundId = bitio.getUI16();
			obj.SoundFormat = bitio.getUIBits(4);
			obj.SoundRate = bitio.getUIBits(2);
			obj.SoundSize = bitio.getUIBit();
			obj.SoundType = bitio.getUIBit();
			// Number of samples. Not affected by mono/stereo setting; for stereo sounds this is the number of sample pairs.
			obj.SoundSampleCount = bitio.getUI32();
			obj.Duration = obj.SoundSampleCount / soundRates[obj.SoundRate];

			let sub = bitio.byte_offset - startOffset;
			let dataLength = length - sub;
			let data = bitio.getData(dataLength);
			bitio.byte_offset = startOffset + length;

			let mimeType = "";
			switch (obj.SoundFormat) {
				case 0: // Uncompressed native-endian
				case 3: // Uncompressed little-endian
					mimeType = "wave";
					break;
				case 1: // ADPCM ? 32KADPCM
					mimeType = "wave";
					break;
				case 2: // MP3
					mimeType = "mpeg";
					break;
				case 4: // NellyMoser 16 kHz
				case 5: // NellyMoser 8 kHz
				case 6: // NellyMoser 22.050 kHz
					mimeType = "nellymoser";
					break;
				case 11: // Speex
					mimeType = "speex";
					break;
				case 15:
					mimeType = "x-aiff";
					break;
			}
			if (obj.SoundFormat == 0 || obj.SoundFormat == 3) {
				let pcmOutput = new PcmOutput(obj.SoundType, obj.SoundSize, obj.SoundRate, data);
				obj.bytes = pcmOutput.createWave();
				mimeType = "wave";
			} else if (obj.SoundFormat == 1) {
				let adpcmOutput = new AdpcmOutput();
				obj.bytes = adpcmOutput.convertADPCMtoWave(false, obj.SoundType, obj.SoundSize, obj.SoundRate, data);
				mimeType = "wave";
			} else if (obj.SoundFormat == 4 || obj.SoundFormat == 5 || obj.SoundFormat == 6) {
				let nellyMoserDecoder = new NellyMoserDecoder(obj.SoundType, obj.SoundSize, obj.SoundRate, data);
				obj.bytes = nellyMoserDecoder.toWave();
				mimeType = "wave";
			} else if (obj.SoundFormat == 2) {
				obj.bytes = data.slice(2,data.length-2);
			} else window.alert('Sound: '+obj.SoundFormat+' '+mimeType+' not supported');

			obj.Loaded = false;
			obj.Audio = new AudioInstance({
				"mimeType": mimeType,
				"data": obj.bytes,
				"id": obj.SoundId
			});
			stage.sndUnloadCount++;
			stage.sounds[obj.SoundId] = obj;
		};

		/**
		 * @param tagType
		 */
		SwfTag.prototype.parseStartSound = function(tagType)
		{
			let _this = this;
			let bitio = _this.bitio;
			let obj = {};
			let stage = _this.stage;

			obj.tagType = tagType;
			obj.SoundId = bitio.getUI16();
			if (tagType === 89) {
				obj.SoundClassName = bitio.getDataUntil("\0");
			}

			obj.SoundInfo = _this.parseSoundInfo();
			stage.setCharacter(obj.SoundId, obj);

			return {
				SoundId: obj.SoundId,
				SoundInfo: obj.SoundInfo,
				tagType: tagType
			};
		};

		/**
		 * parseDefineButtonSound
		 */
		SwfTag.prototype.parseDefineButtonSound = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let buttonId = bitio.getUI16();
			let btnObj = stage.getCharacter(buttonId);
			for (let i = 0; i < 4; i++) {
				let soundId = bitio.getUI16();
				if (soundId) {
					let soundInfo = _this.parseSoundInfo();
					switch (i) {
						case 0: // OverUpToIdle : Roll Out, up
							btnObj.ButtonStateUpSoundInfo = soundInfo;
							btnObj.ButtonStateUpSoundId = soundId;
							break;
						case 1: // IdleToOverUp : Roll Over, over
							btnObj.ButtonStateOverSoundInfo = soundInfo;
							btnObj.ButtonStateOverSoundId = soundId;
							break;
						case 2: // OverUpToOverDown : Press, down
							btnObj.ButtonStateDownSoundInfo = soundInfo;
							btnObj.ButtonStateDownSoundId = soundId;
							break;
						case 3: // OverDownToOverUp : Release, hit
							btnObj.ButtonStateHitTestSoundInfo = soundInfo;
							btnObj.ButtonStateHitTestSoundId = soundId;
							break;
					}
				}
			}
			stage.setCharacter(buttonId, btnObj);
		};

		/**
		 * @returns {{}}
		 */
		SwfTag.prototype.parseSoundInfo = function()
		{
			let obj = {};
			let bitio = this.bitio;
			bitio.getUIBits(2); // Reserved
			obj.SyncStop = bitio.getUIBit();
			obj.SyncNoMultiple = bitio.getUIBit();
			obj.HasEnvelope = bitio.getUIBit();
			obj.HasLoops = bitio.getUIBit();
			obj.HasOutPoint = bitio.getUIBit();
			obj.HasInPoint = bitio.getUIBit();

			if (obj.HasInPoint) {
				obj.InPoint = bitio.getUI32();
			}
			if (obj.HasOutPoint) {
				obj.OutPoint = bitio.getUI32();
			}
			if (obj.HasLoops) {
				obj.LoopCount = bitio.getUI16();
			}
			if (obj.HasEnvelope) {
				obj.EnvPoints = bitio.getUI8();
				obj.EnvelopeRecords = [];
				for (let i = 0; i < obj.EnvPoints; i++) {
					// SoundEnvelope
					obj.EnvelopeRecords[i] = {
						Pos44: bitio.getUI32(),
						LeftLevel: bitio.getUI16(),
						RightLevel: bitio.getUI16()
					};
				}
			}

			return obj;
		};

		/**
		 * parseDefineFontAlignZones
		 */
		SwfTag.prototype.parseDefineFontAlignZones = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let FontId = bitio.getUI16();
			let tag = stage.getCharacter(FontId);
			tag.CSMTableHint = bitio.getUIBits(2);
			bitio.getUIBits(6); // Reserved
			let NumGlyphs = tag.NumGlyphs;
			let ZoneTable = [];
			for (let i = 0; i < NumGlyphs; i++) {
				let NumZoneData = bitio.getUI8();
				let ZoneData = [];
				for (let idx = 0; idx < NumZoneData; idx++) {
					ZoneData[idx] = bitio.getUI32();
				}
				ZoneTable[i] = {
					ZoneData: ZoneData,
					Mask: bitio.getUI8()
				};
			}

			bitio.byteAlign();
			tag.ZoneTable = ZoneTable;
			stage.setCharacter(FontId, tag);
		};

		/**
		 * @param tagType
		 */
		SwfTag.prototype.parseCSMTextSettings = function(tagType)
		{
			let _this = this;
			let obj = {};
			let bitio = _this.bitio;
			obj.tagType = tagType;
			obj.TextID = bitio.getUI16();
			obj.UseFlashType = bitio.getUIBits(2);
			obj.GridFit = bitio.getUIBits(3);
			bitio.getUIBits(3); // Reserved
			obj.Thickness = bitio.getUI32();
			obj.Sharpness = bitio.getUI32();
			bitio.getUI8(); // Reserved
		};

		const MIN_NUM_FRAMES_NO_SOUND = 2;

		/**
		 * @param tagType
		 * @param length
		 */
		SwfTag.prototype.parseSoundStreamBlock = function(tagType, length) {
			let _this = this;
			let bitio = _this.bitio;
			let obj = {};
			obj.tagType = tagType;
			obj.compressed = bitio.getData(length);
			let sampleCount = 0;
			let seekSamples = 0;
			let stage = _this.stage;
			let soundStreamFirstBlock = false;
			let i, cid;
			if (stage.soundStreamLevels[this.tagLevel].SoundStreamFirstBlock) {
				cid = stage.soundStreamLevels[this.tagLevel].CharacterId;
				for (i=0; i<stage.soundStreams.length; i++) {
					if (stage.soundStreams[i].SoundStreamId == cid) {
						stage.currentSoundStream = i;
						stage.currentFrameRange = stage.soundStreams[i].FrameRanges.length;
						stage.soundStreams[i].FrameRanges[stage.currentFrameRange] = {
							"Loaded": false,
							"startFrame": -1,
							"startAudio": 0,
							"endFrame": -1,
							"endAudio":0,
							"totalSampleCount": 0,
							"Data": []
						};
						stage.soundStreamLevels[this.tagLevel].SoundStreamFirstBlock = false;
						soundStreamFirstBlock = true;
						break;
					}
				}
			} else if (stage.currentSoundStream != -1) {
				if (stage.soundStreams[stage.currentSoundStream].tagLevel != this.tagLevel) {
					cid = stage.soundStreamLevels[this.tagLevel].CharacterId;
					for (i=0; i<stage.soundStreams.length; i++) {
						if (stage.soundStreams[i].SoundStreamId == cid) {
							stage.currentSoundStream = i;
							stage.currentFrameRange = stage.soundStreams[i].FrameRanges.length;
							stage.soundStreams[i].FrameRanges[stage.currentFrameRange] = {
								"Loaded": false,
								"startFrame": -1,
								"startAudio": 0,
								"endFrame": -1,
								"endAudio":0,
								"totalSampleCount": 0,
								"Data": []
							};
							soundStreamFirstBlock = true;
							break;
						}
					}
				}
			}
			if (stage.currentSoundStream == -1) console.log('Error SoundStreamBlock, not found corresponding SoundStreamHead');
			let s = stage.soundStreams[stage.currentSoundStream];
			let fr = s.FrameRanges[stage.currentFrameRange];

			if (fr && fr.endFrame != -1 && stage.currentFrame - fr.lastFrame > MIN_NUM_FRAMES_NO_SOUND) {
				stage.currentFrameRange++;
				s.FrameRanges[stage.currentFrameRange] = {
					"Loaded": false,
					"startFrame": -1,
					"startAudio": 0,
					"endFrame": -1,
					"endAudio":0,
					"totalSampleCount": 0,
					"Data": []
				};
				fr = s.FrameRanges[stage.currentFrameRange];
				soundStreamFirstBlock = true;
			}
			if (s.SoundStreamCompression == 2) { // MP3
				if (length > 4) {
/*jshint bitwise:false*/
					sampleCount = obj.compressed[0] + (obj.compressed[1] << 8); // UI16
					seekSamples = obj.compressed[2] + (obj.compressed[3] << 8); // UI16
/*jshint bitwise:false*/
					seekSamples = seekSamples > 32768 ? seekSamples - 65536 : seekSamples; // SI16
					if (soundStreamFirstBlock) {
						fr.Loaded = false;
						fr.startAudio = seekSamples / soundRates[s.SoundStreamRate];
						fr.startFrame = stage.currentFrame;
						fr.totalSampleCount = 0;
					}
					fr.totalSampleCount += sampleCount;
					fr.endAudio = fr.totalSampleCount/soundRates[s.SoundStreamRate];
					fr.endFrame = stage.currentFrame;
					fr.Data.push(obj.compressed.slice(4, obj.compressed.length + 1));
				}
			} else { // converted to wave
				if (soundStreamFirstBlock) {
					fr.Loaded = false;
					fr.startAudio = 0;
					fr.startFrame = stage.currentFrame;
					fr.totalSampleCount = 0;
				}
				fr.totalSampleCount += s.SoundStreamSampleCount;
				fr.endAudio = fr.totalSampleCount/soundRates[s.SoundStreamRate];
				fr.endFrame = stage.currentFrame;
				fr.Data.push(obj.compressed);
			}
			fr.lastFrame = stage.currentFrame;
		};

		/**
		 * @param tagType
		 */
		SwfTag.prototype.parseDefineVideoStream = function(tagType)
		{
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let obj = {};
			obj.tagType = tagType;
			obj.CharacterId = bitio.getUI16();
			obj.NumFrames = bitio.getUI16();
			obj.Width = bitio.getUI16();
			obj.Height = bitio.getUI16();
			bitio.getUIBits(4); // Reserved
			obj.VideoFlagsDeblocking = bitio.getUIBits(3);
			obj.VideoFlagsSmoothing = bitio.getUIBits(1);
			obj.CodecID = bitio.getUI8();
			obj.Data = [] ;
			stage.setCharacter(obj.CharacterId, obj);
			stage.videoStreams.push(obj);
			stage.videoCount++;
		};

		/**
		 *
		 * @param tagType
		 * @param length
		 */
		SwfTag.prototype.parseVideoFrame = function(tagType, length)
		{
			let _this = this;
			let bitio = _this.bitio;
			let stage = _this.stage;
			let startOffset = bitio.byte_offset;
			let obj = {};
			obj.tagType = tagType;
			obj.StreamID = bitio.getUI16();
			obj.FrameNum = bitio.getUI16();
			let videoStream = stage.getCharacter(obj.StreamID);
			let sub = bitio.byte_offset - startOffset;
			let dataLength = length - sub;
			obj.VideoData = bitio.getData(dataLength);
			/*
					switch (StreamData.CodecID) {
						case 1: // Jpeg
						case 2: // Sorenson H.263
						case 3: // Screen video (SWF 7 and later only)
						case 4: // VP6 (SWF 8 and later only)
						case 5: // VP6 video with alpha channel (SWF 8 and later only)
						case 6 : // Screen_video_V2
						case 7: // AVC
					}
					// videoStream.Data.push(obj);
			*/
		};

		/**
		 * parseFileAttributes
		 */
		SwfTag.prototype.parseFileAttributes = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			let obj = {};
			let stage = this.stage;
			bitio.getUIBit(); // Reserved
			obj.UseDirectBlit = bitio.getUIBit();
			obj.UseGPU = bitio.getUIBit();
			obj.HasMetadata = bitio.getUIBit();
			obj.ActionScript3 = bitio.getUIBit();
			obj.Reserved2 = bitio.getUIBits(3);
			obj.UseNetwork = bitio.getUIBit();
			obj.Reserved3 = bitio.getUIBits(24);
			stage.SWF_HAS_AS3 = (obj.ActionScript3==1);
		};

		/**
		 * parseDefineScalingGrid
		 */
		SwfTag.prototype.parseDefineScalingGrid = function()
		{
			let _this = this;
			let bitio = _this.bitio;
			let obj = {};
			obj.CharacterId = bitio.getUI16();
			obj.Splitter = _this.rect();
		};

		/**
		 * @constructor
		 */
		let Activation = function() {};


		/**
		 * @param data
		 * @param id
		 * @param ns
		 * @param stage
		 * @constructor
		 */
		let ActionScript3 = function(data, id, ns, stage)
		{
			let _this = this;

			// params
			_this.id = id;
			_this.caller = null;
			_this.parent = null;
			_this.activation = null;
			_this.scopeStack = [];
			_this.currentIndex = 0;
			_this.stage = stage;
			_this.args = [];
			_this.variables = {};

			// ABC code and info
			let methodBody = data.methodBody[id];
			_this.body = methodBody;
			_this.codes = methodBody.codes;
			_this.info = data.method[methodBody.method];

			// pool and data
			_this.names = data.names;
			_this.data = data;

			// ns
			_this.ns = ns;

			// register
			_this.AVM2 = _this.getAVM2();
			_this.register = _this.AVM2["__swf2js__:" + ns].register;
			_this.register[0] = _this.AVM2;

			// trait
			let trait = methodBody.trait;
			let length = trait.length;
			for (let i = 0; i < length; i++) {
				let obj = trait[i];
				let kind = obj.kind;
				switch (kind) {
					case 0:
						// let key = _this.names[obj.name];

						break;
				}
			}
		};

		/**
		 * @type {{}}
		 */
		ActionScript3.prototype.methods = {
			gotoAndStop: 1,
			gotoAndPlay: 1,
			play: 1,
			stop: 1,
			duplicateMovieClip: 1,
			getProperty: 1,
			removeMovieClip: 1,
			setProperty: 1,
			startDrag: 1,
			stopDrag: 1,
			targetPath: 1,
			updateAfterEvent: 1,
			nextFrame: 1,
			nextScene: 1,
			prevFrame: 1,
			prevScene: 1,
			stopAllSounds: 1,
			setMask: 1,
			getURL: 1,
			loadMovie: 1,
			loadMovieNum: 1,
			loadVariables: 1,
			loadVariablesNum: 1,
			unloadMovie: 1,
			unloadMovieNum: 1,
			swapDepths: 1,
			getInstanceAtDepth: 1,
			attachMovie: 1,
			attachAudio: 1,
			attachBitmap: 1,
			getNextHighestDepth: 1,
			getBytesLoaded: 1,
			getBytesTotal: 1,
			ASSetPropFlags: 1,
			lineStyle: 1,
			lineGradientStyle: 1,
			beginFill: 1,
			beginGradientFill: 1,
			beginBitmapFill: 1,
			graphics: 1,
			buttonMode: 1,
			clear: 1,
			moveTo: 1,
			lineTo: 1,
			curveTo: 1,
			endFill: 1,
			hitTest: 1,
			getDepth: 1,
			createEmptyMovieClip: 1,
			createTextField: 1,
			getBounds: 1,
			getRect: 1,
			getSWFVersion: 1,
			getTextSnapshot: 1,
			globalToLocal: 1,
			localToGlobal: 1,
			addFrameScript: 1,
			trace: 1,
			addEventListener: 1,
			removeEventListener: 1,
			x: 1,
			y: 1,
			alpha: 1,
			name: 1,
			blendMode: 1,
			filters: 1,
			visible: 1,
			rotation: 1,
			height: 1,
			width: 1,
			scaleX: 1,
			scaleY: 1,
			mouseX: 1,
			mouseY: 1,
			mask: 1,
			mouseEnabled: 1
		};

		/**
		 * @returns {*}
		 */
		ActionScript3.prototype.getAVM2 = function()
		{
			let _this = this;
			let ns = _this.ns;
			let stage = _this.stage;
			let values = ns.split(":");
			let className = values.pop();
			let nLen = values.length;
			let classObj = stage.avm2;
			for (let i = 0; i < nLen; i++) {
				classObj = classObj[values[i]];
			}
			return classObj[className];
		};

		/**
		 * @returns {*}
		 */
		ActionScript3.prototype.getBuilder = function()
		{
			return this.AVM2["__swf2js__::builder"];
		};

		/**
		 * @returns {*}
		 */
		ActionScript3.prototype.getSuperClass = function()
		{
			let _this = this;
			return _this.AVM2["__swf2js__:" + _this.ns].superClass;
		};

		/**
		 * @param superClass
		 */
		ActionScript3.prototype.setSuperClass = function(superClass)
		{
			let _this = this;
			_this.AVM2["__swf2js__:" + _this.ns].superClass = superClass;
		};

		/**
		 * @returns {*}
		 */
		ActionScript3.prototype.getParent = function()
		{
			return this.parent;
		};

		/**
		 * @param name
		 * @returns {*}
		 */
		ActionScript3.prototype.getProperty = function(name)
		{
			let _this = this;
			let stage = _this.stage;
			let value;

			// local1
			if (_this.activation) {
				value = _this.activation[name];
			}

			// parent
			if (value === undefined) {
				let parent = _this.getParent();
				if (parent) {
					value = parent.getProperty(name);
				}
			}

			// property
			if (value === undefined) {
				let builder = _this.getBuilder();
				if (builder) {
					if (name in _this.methods) {
						value = builder[name];
					}
					if (value === undefined) {
						value = builder.getProperty(name);
					}
				}
			}

			// local2
			if (value === undefined && name.indexOf("::") !== -1) {
				let values = name.split("::");
				let className = values.pop();
				let path = values.pop();
				if (path !== "private") {
					let pathArr = path.split(".");
					let pLen = pathArr.length;
					let classObj = stage.avm2;
					for (let pIdx = 0; pIdx < pLen; pIdx++) {
						classObj = classObj[pathArr[pIdx]];
					}
					value = classObj[className];

					if (value === undefined) {
						value = _this.AVM2[className];
					}
				} else {
					value = _this.AVM2["private::" + className];
				}
			}

			// global
			if (value === undefined) {
				value = stage.avm2[name];
			}

			return value;
		};

		/**
		 * setOptions
		 */
		ActionScript3.prototype.setOptions = function()
		{
			let _this = this;
			let info = _this.info;
			let paramCount = info.paramCount;
			if (paramCount) {
				let data = _this.data;
				let options = info.options;
				let paramType = info.paramType;
				let stage = _this.stage;

				for (let i = 0; i < paramCount; i++) {
					let value;

					if (i in options) {
						let option = options[i];
						let val = option.val;
						switch (option.kind) {
							case 0x01: // string
								value = data.string[val];
								break;
							default:
								console.log("options", option);
								break;
						}
					}

					if (i in paramType) {
						let pType = paramType[i];
						if (pType) {
							let mName = data.multiname_info[pType];
							let className = null;
							let path = "";
							switch (mName.kind) {
								case 0x07: // QName
									let ns = data.namespace[mName.ns];
									switch (ns.kind) {
										case 0x16:
											path = data.string[ns.name];
											break;
										default:
											console.log("SetOptions", ns);
											break;
									}

									className = data.string[mName.name];
									break;
							}

							if (path) {
								let values = path.split(".");
								let pLen = values.length;
								let classObj = stage.avm2;
								for (let idx = 0; idx < pLen; idx++) {
									classObj = classObj[values[idx]];
								}
								value = classObj[className];
							}
						}
					}

					if (_this.args[i] === undefined) {
						_this.args[i] = value;
					}
				}
			}
		};

		/**
		 * execute
		 */
		ActionScript3.prototype.execute = function()
		{
			let _this = this;
			let stack = [];
			_this.scopeStack = [];

			let i = 0;
			let offset = 0;
			let codes = _this.codes;
			let length = codes.length;

			_this.setOptions();

			while (i < length) {
				let obj = codes[i];
				switch (obj.code) {
					case 0xa0:
						_this.ActionAdd(stack);
						break;
					case 0xc5:
						_this.ActionAddI(stack);
						break;
					case 0x86:
						_this.ActionAsType(stack, obj.value1);
						break;
					case 0x87:
						_this.ActionAsTypeLate(stack);
						break;
					case 0xa8:
						_this.ActionBitAnd(stack);
						break;
					case 0x97:
						_this.ActionBitNot(stack);
						break;
					case 0xa9:
						_this.ActionBitOr(stack);
						break;
					case 0xaa:
						_this.ActionBitXOr(stack);
						break;
					case 0x41:
						_this.ActionCall(stack, obj.value1);
						break;
					case 0x43:
						_this.ActionCallMethod(stack, obj.value1, obj.value2);
						break;
					case 0x46:
						_this.ActionCallProperty(stack, obj.value1, obj.value2);
						break;
					case 0x4c:
						_this.ActionCallPropLex(stack, obj.value1, obj.value2);
						break;
					case 0x4f:
						_this.ActionCallPropVoid(stack, obj.value1, obj.value2);
						break;
					case 0x44:
						_this.ActionCallStatic(stack, obj.value1, obj.value2);
						break;
					case 0x45:
						_this.ActionCallSuper(stack, obj.value1, obj.value2);
						break;
					case 0x4e:
						_this.ActionCallSuperVoid(stack, obj.value1, obj.value2);
						break;
					case 0x78:
						_this.ActionCheckFilter(stack);
						break;
					case 0x80:
						_this.ActionCoerce(stack, obj.value1);
						break;
					case 0x82:
						_this.ActionCoerceA(stack);
						break;
					case 0x85:
						_this.ActionCoerceS(stack);
						break;
					case 0x42:
						_this.ActionConstruct(stack, obj.value1);
						break;
					case 0x4a:
						_this.ActionConstructProp(stack, obj.value1, obj.value2);
						break;
					case 0x49:
						_this.ActionConstructSuper(stack, obj.value1);
						break;
					case 0x76:
						_this.ActionConvertB(stack);
						break;
					case 0x73:
						_this.ActionConvertI(stack);
						break;
					case 0x75:
						_this.ActionConvertD(stack);
						break;
					case 0x77:
						_this.ActionConvertO(stack);
						break;
					case 0x74:
						_this.ActionConvertU(stack);
						break;
					case 0x70:
						_this.ActionConvertS(stack);
						break;
					case 0xef:
						_this.ActionDebug(stack, obj.value1, obj.value2, obj.value3, obj.value4);
						break;
					case 0xf1:
						_this.ActionDebugFile(stack, obj.value1);
						break;
					case 0xf0:
						_this.ActionDebugLine(stack);
						break;
					case 0x94:
						_this.ActionDecLocal(stack, obj.value1);
						break;
					case 0xc3:
						_this.ActionDecLocalI(stack, obj.value1);
						break;
					case 0x93:
						_this.ActionDecrement(stack);
						break;
					case 0xc1:
						_this.ActionDecrementI(stack);
						break;
					case 0x6a:
						_this.ActionDeleteProperty(stack, obj.value1);
						break;
					case 0xa3:
						_this.ActionDivide(stack);
						break;
					case 0x2a:
						_this.ActionDup(stack);
						break;
					case 0x06:
						_this.ActionDxns(stack, obj.value1);
						break;
					case 0x07:
						_this.ActionDxnsLate(stack);
						break;
					case 0xab:
						_this.ActionEquals(stack);
						break;
					case 0x72:
						_this.ActionEscXAttr(stack);
						break;
					case 0x71:
						_this.ActionEscXElem(stack);
						break;
					case 0x5e:
						_this.ActionFindProperty(stack, obj.value1);
						break;
					case 0x5d:
						_this.ActionFindPropStrict(stack, obj.value1);
						break;
					case 0x59:
						_this.ActionGetDescendAnts(stack, obj.value1);
						break;
					case 0x64:
						_this.ActionGetGlobalScope(stack);
						break;
					case 0x6e:
						_this.ActionGetGlobalsLot(stack, obj.value1);
						break;
					case 0x60:
						_this.ActionGetLex(stack, obj.value1);
						break;
					case 0x62:
						_this.ActionGetLocal(stack, obj.value1);
						break;
					case 0xd0:
						_this.ActionGetLocal0(stack);
						break;
					case 0xd1:
						_this.ActionGetLocal1(stack);
						break;
					case 0xd2:
						_this.ActionGetLocal2(stack);
						break;
					case 0xd3:
						_this.ActionGetLocal3(stack);
						break;
					case 0x66:
						_this.ActionGetProperty(stack, obj.value1);
						break;
					case 0x65:
						_this.ActionGetScopeObject(stack, obj.value1);
						break;
					case 0x6c:
						_this.ActionGetSlot(stack, obj.value1);
						break;
					case 0x04:
						_this.ActionGetSuper(stack, obj.value1);
						break;
					case 0xb0:
						_this.ActionGreaterEquals(stack);
						break;
					case 0xaf:
						_this.ActionGreaterThan(stack);
						break;
					case 0x1f:
						_this.ActionHasNext(stack);
						break;
					case 0x32:
						_this.ActionHasNext2(stack, obj.value1, obj.value2);
						break;
					case 0x12:
						offset = _this.ActionIfFalse(stack, obj.value1);
						i += offset;
						break;
					case 0x18:
						offset = _this.ActionIfGe(stack, obj.value1);
						i += offset;
						break;
					case 0x17:
						offset = _this.ActionIfGt(stack, obj.value1);
						i += offset;
						break;
					case 0x16:
						offset = _this.ActionIfLe(stack, obj.value1);
						i += offset;
						break;
					case 0x15:
						offset = _this.ActionIfLt(stack, obj.value1);
						i += offset;
						break;
					case 0x0f:
						offset = _this.ActionIfNge(stack, obj.value1);
						i += offset;
						break;
					case 0x0e:
						offset = _this.ActionIfNgt(stack, obj.value1);
						i += offset;
						break;
					case 0x0d:
						offset = _this.ActionIfNle(stack, obj.value1);
						i += offset;
						break;
					case 0x0c:
						offset = _this.ActionIfNlt(stack, obj.value1);
						i += offset;
						break;
					case 0x14:
						offset = _this.ActionIfNe(stack, obj.value1);
						i += offset;
						break;
					case 0x19:
						offset = _this.ActionIfStrictEq(stack, obj.value1);
						i += offset;
						break;
					case 0x1a:
						offset = _this.ActionIfStrictNe(stack, obj.value1);
						i += offset;
						break;
					case 0x11:
						offset = _this.ActionIfTrue(stack, obj.value1);
						i += offset;
						break;
					case 0xb4:
						_this.ActionIn(stack, obj.value1);
						break;
					case 0x92:
						_this.ActionIncLocal(stack, obj.value1);
						break;
					case 0xc2:
						_this.ActionIncLocalI(stack, obj.value1);
						break;
					case 0x91:
						_this.ActionIncrement(stack);
						break;
					case 0xc0:
						_this.ActionIncrementI(stack);
						break;
					case 0x68:
						_this.ActionInitProperty(stack, obj.value1);
						break;
					case 0xb1:
						_this.ActionInstanceOf(stack);
						break;
					case 0xb2:
						_this.ActionIsType(stack, obj.value1);
						break;
					case 0xb3:
						_this.ActionIsTypeLate(stack);
						break;
					case 0x10: // ActionJump
						offset = obj.value1;
						i += offset;
						break;
					case 0x08:
						_this.ActionKill(stack, obj.value1);
						break;
					case 0x09:
						_this.ActionLabel(stack);
						break;
					case 0xae:
						_this.ActionLessEquals(stack);
						break;
					case 0xad:
						_this.ActionLessThan(stack);
						break;
					case 0x1b:
						_this.ActionLookupSwitch(stack, obj.value1, obj.value1, obj.value3);
						break;
					case 0xa5:
						_this.ActionLShift(stack);
						break;
					case 0xa4:
						_this.ActionModulo(stack);
						break;
					case 0xa2:
						_this.ActionMultiply(stack);
						break;
					case 0xc7:
						_this.ActionMultiplyI(stack);
						break;
					case 0x90:
						_this.ActionNeGate(stack);
						break;
					case 0xc4:
						_this.ActionNeGateI(stack);
						break;
					case 0x57:
						_this.ActionNewActivation(stack);
						break;
					case 0x56:
						_this.ActionNewArray(stack, obj.value1);
						break;
					case 0x5a:
						_this.ActionNewCatch(stack, obj.value1);
						break;
					case 0x58:
						_this.ActionNewClass(stack, obj.value1);
						break;
					case 0x40:
						_this.ActionNewFunction(stack, obj.value1);
						break;
					case 0x55:
						_this.ActionNewObject(stack, obj.value1);
						break;
					case 0x1e:
						_this.ActionNextName(stack);
						break;
					case 0x23:
						_this.ActionNextValue(stack);
						break;
					case 0x02:
						_this.ActionNop(stack);
						break;
					case 0x96:
						_this.ActionNot(stack);
						break;
					case 0x29:
						_this.ActionPop(stack);
						break;
					case 0x1d:
						_this.ActionPopScope();
						break;
					case 0x24:
						_this.ActionPushByte(stack, obj.value1);
						break;
					case 0x2f:
						_this.ActionPushDouble(stack, obj.value1);
						break;
					case 0x27:
						_this.ActionPushFalse(stack, obj.value1);
						break;
					case 0x2d:
						_this.ActionPushInt(stack, obj.value1);
						break;
					case 0x31:
						_this.ActionPushNameSpace(stack, obj.value1);
						break;
					case 0x28:
						_this.ActionPushNan(stack);
						break;
					case 0x20:
						_this.ActionPushNull(stack);
						break;
					case 0x30:
						_this.ActionPushScope(stack);
						break;
					case 0x25:
						_this.ActionPushShort(stack, obj.value1);
						break;
					case 0x2c:
						_this.ActionPushString(stack, obj.value1);
						break;
					case 0x26:
						_this.ActionPushTrue(stack);
						break;
					case 0x2e:
						_this.ActionPushUInt(stack, obj.value1);
						break;
					case 0x21:
						_this.ActionPushUndefined(stack);
						break;
					case 0x1c:
						_this.ActionPushWith(stack);
						break;
					case 0x48: // ActionReturnValue
						return stack.pop();
					case 0x47: // ReturnVoid
						return undefined;
					case 0xa6:
						_this.ActionRShift(stack);
						break;
					case 0x63:
						_this.ActionSetLocal(stack, obj.value1);
						break;
					case 0xd4:
						_this.ActionSetLocal0(stack);
						break;
					case 0xd5:
						_this.ActionSetLocal1(stack);
						break;
					case 0xd6:
						_this.ActionSetLocal2(stack);
						break;
					case 0xd7:
						_this.ActionSetLocal3(stack);
						break;
					case 0x6f:
						_this.ActionSetGlobalSlot(stack, obj.value1);
						break;
					case 0x61:
						_this.ActionSetProperty(stack, obj.value1);
						break;
					case 0x6d:
						_this.ActionSetSlot(stack, obj.value1);
						break;
					case 0x05:
						_this.ActionSetSuper(stack, obj.value1);
						break;
					case 0xac:
						_this.ActionStrictEquals(stack);
						break;
					case 0xa1:
						_this.ActionSubtract(stack);
						break;
					case 0xc6:
						_this.ActionSubtractI(stack);
						break;
					case 0x2b:
						_this.ActionSwap(stack);
						break;
					case 0x03:
						_this.ActionThrow(stack);
						break;
					case 0x95:
						_this.ActionTypeof(stack);
						break;
					case 0xa7:
						_this.ActionURShift(stack);
						break;
				}

				i += obj.offset;
				i += 1;
			}
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionAdd = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			stack[stack.length] = value1 + value2;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionAddI = function(stack)
		{
			let value2 = +stack.pop();
			let value1 = +stack.pop();
			stack[stack.length] = value1 + value2;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionAsType = function(stack, index)
		{
			let type = this.names[index];
			let value = stack.pop();
			stack[stack.length] = (typeof value === type) ? true : null;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionAsTypeLate = function(stack)
		{
			let cValue = stack.pop(); // class
			let value = stack.pop();
			stack[stack.length] = (typeof cValue === value) ? true : null;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionBitAnd = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
/*jshint bitwise: false*/
			stack[stack.length] = value1 & value2;
/*jshint bitwise: true*/
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionBitNot = function(stack)
		{
			let value = stack.pop();
/*jshint bitwise: false*/
			stack[stack.length] = ~value;
/*jshint bitwise: true*/
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionBitOr = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
/*jshint bitwise: false*/
			stack[stack.length] = value1 | value2;
/*jshint bitwise: true*/
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionBitXOr = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
/*jshint bitwise: false*/
			stack[stack.length] = value1 ^ value2;
/*jshint bitwise: true*/
		};

		/**
		 * @param stack
		 * @param argCount
		 */
		ActionScript3.prototype.ActionCall = function(stack, argCount)
		{
			let params = [];
			for (let i = argCount; i--;) {
				params[i] = stack.pop();
			}
			let receiver = stack.pop();
			let func = stack.pop();

			let value;
			if (typeof func === "function") {
				value = func.apply(receiver, params);
			}
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 * @param argCount
		 */
		ActionScript3.prototype.ActionCallMethod = function(stack, index, argCount)
		{
			let params = [];
			for (let i = 0; i < argCount; i++) {
				params[params.length] = stack.pop();
			}
			let receiver = stack.pop();
			let value;
			if (typeof receiver === "function") {
				value = receiver.apply(this.caller, params);
			}
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 * @param argCount
		 */
		ActionScript3.prototype.ActionCallProperty = function(stack, index, argCount)
		{
			let _this = this;
			let params = [];
			for (let i = argCount; i--;) {
				params[params.length] = stack.pop();
			}
			let prop = _this.names[index];
			let obj = stack.pop();

			let value;
			if (obj) {
				let func = null;
				if (obj instanceof DisplayObject) {
					if (prop in _this.methods) {
						func = obj[prop];
					}

					if (!func) {
						func = obj.getProperty(prop);
					}
				} else {
					func = obj[prop];
				}

				if (func) {
					value = func.apply(_this.caller, params);
				}
			}

			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 * @param argCount
		 */
		ActionScript3.prototype.ActionCallPropLex = function(stack, index, argCount)
		{
			let _this = this;
			let params = [];
			for (let i = argCount; i--;) {
				params[params.length] = stack.pop();
			}

			let prop = _this.names[index];
			let obj = stack.pop();

			let value;
			if (obj) {
				value = obj[prop].apply(_this.getBuilder(), params);
			}
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 * @param argCount
		 */
		ActionScript3.prototype.ActionCallPropVoid = function(stack, index, argCount)
		{
			let _this = this;
			let params = [];
			for (let i = argCount; i--;) {
				params[i] = stack.pop();
			}

			let obj = stack.pop();
			let name = _this.names[index];

			let values = name.split("::"); // implements
			let prop = values.pop();
			let ns = values.pop();
			if (ns) {
			}

			let func = obj[prop];
			if (!func && obj instanceof MovieClip) {
				let stage = obj.getStage();
				let symbol = stage.symbols[obj.getCharacterId()];
				if (symbol) {
					let names = symbol.split(".");
					let classMethod = names.pop();
					let length = names.length;
					let classObj = stage.avm2;
					for (let i = 0; i < length; i++) {
						classObj = classObj[names[i]];
					}

					if (classObj) {
						let AVM2 = classObj[classMethod];
						while (true) {
							func = AVM2[prop];
							if (func) {
								break;
							}
							AVM2 = AVM2.super;
							if (!AVM2 || AVM2 instanceof MovieClip) {
								break;
							}
						}
					}
				}
			}

			if (!func) {
				while (true) {
					let SuperClass = obj.super;
					if (!SuperClass) {
						break;
					}

					if (SuperClass instanceof MovieClip) {
						obj = _this.caller;
						func = obj[prop];
						break;
					}

					func = SuperClass[prop];
					if (func) {
						break;
					}

					obj = SuperClass;
				}
			}

			// fscommand
			if (prop === "fscommand") {
				obj = _this.stage;
			}

			if (func) {
				func.apply(obj, params);
			}
		};

		/**
		 * @param stack
		 * @param index
		 * @param argCount
		 */
		ActionScript3.prototype.ActionCallStatic = function(stack, index, argCount)
		{
			console.log("ActionCallStatic");
			let params = [];
			for (let i = argCount; i--;) {
				params[params.length] = stack.pop();
			}
			let receiver = stack.pop();
			let value;
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 * @param argCount
		 */
		ActionScript3.prototype.ActionCallSuper = function(stack, index, argCount)
		{
			let params = [];
			for (let i = argCount; i--;) {
				params[params.length] = stack.pop();
			}
			let porp = this.names[index];
			let receiver = stack.pop();

		};

		/**
		 * @param stack
		 * @param index
		 * @param argCount
		 */
		ActionScript3.prototype.ActionCallSuperVoid = function(stack, index, argCount)
		{
			let params = [];
			for (let i = argCount; i--;) {
				params[params.length] = stack.pop();
			}
			let porp = this.names[index];
			let receiver = stack.pop();
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionCheckFilter = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionCoerce = function(stack, index)
		{
			let value = stack.pop();
			let str = this.names[index];
			stack[stack.length] = str;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionCoerceA = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionCoerceS = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = String(value);
		};

		/**
		 * @param stack
		 * @param argCount
		 */
		ActionScript3.prototype.ActionConstruct = function(stack, argCount)
		{
			let params = [];
			for (let i = argCount; i--;) {
				params[params.length] = stack.pop();
			}
			let obj = stack.pop();
			stack[stack.length] = obj.construct.apply(obj, params);
		};

		/**
		 * @param stack
		 * @param index
		 * @param argCount
		 */
		ActionScript3.prototype.ActionConstructProp = function(stack, index, argCount)
		{
			let _this = this;
			let params = [];
			for (let i = argCount; i--;) {
				params[params.length] = stack.pop();
			}

			let prop = _this.names[index];
			let obj = stack.pop();

			let value;
			let stage = _this.stage;
			let DoABC = stage.abc[prop];
			if (DoABC) {
				let builder = _this.getBuilder();
				let AVM2 = new DoABC(builder);
				stage.avm2[prop] = AVM2;
				AVM2[prop].apply(builder, params);
				value = AVM2;
			} else {
				value = new(Function.prototype.bind.apply(obj[prop], params))();
			}

			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param argCount
		 */
		ActionScript3.prototype.ActionConstructSuper = function(stack, argCount)
		{
			let _this = this;
			let params = [];
			for (let i = argCount; i--;) {
				params[i] = stack.pop();
			}

			let obj = stack.pop();
			let SuperClassName = obj["__swf2js__:" + _this.ns].extends;
			let values = SuperClassName.split("::");
			let prop = values.pop();
			let ns = values.pop();
			let stage = _this.stage;
			let abcObj = stage.abc;
			let avmObj = stage.avm2;

			if (ns) {
				let names = ns.split(".");
				let length = names.length;
				for (let i = 0; i < length; i++) {
					abcObj = abcObj[names[i]];
					avmObj = avmObj[names[i]];
				}
			}

			let sClass = null;
			let SuperClass = abcObj[prop];
			let builder = _this.getBuilder();
			switch (SuperClass) {
				case MovieClip:
					sClass = new MovieClip();
					sClass.setStage(stage);
					sClass._extend = true;
					break;
				case Sound:
					sClass = new Sound();
					sClass.movieClip = builder;
					break;
				default:
					if (SuperClass in window) { // Object
						sClass = new(Function.prototype.bind.apply(window[SuperClassName], params))();
					} else {
						sClass = new SuperClass(builder);
						avmObj[prop] = sClass;
						sClass[prop].apply(builder, params);
					}
					break;
			}

			obj["super"] = sClass;
			obj["__swf2js__:" + _this.ns].superClass = sClass;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionConvertB = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = (value) ? true : false;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionConvertI = function(stack)
		{
			let value = stack.pop();
/*jshint bitwise: false*/
			stack[stack.length] = value | 0;
/*jshint bitwise: true*/
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionConvertD = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = +value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionConvertO = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = (typeof value === "object") ? value : null;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionConvertU = function(stack)
		{
			let value = stack.pop();
/*jshint bitwise: false*/
			value = value | 0;
/*jshint bitwise: true*/
			if (value < 0) {
				value *= -1;
			}
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionConvertS = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = String(value);
		};

		/**
		 * @param stack
		 * @param type
		 * @param index
		 * @param reg
		 * @param extra
		 */
		ActionScript3.prototype.ActionDebug = function(stack, type, index, reg, extra)
		{


		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionDebugFile = function(stack, index)
		{


		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionDebugLine = function(stack)
		{


		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionDecLocal = function(stack, index)
		{

		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionDecLocalI = function(stack, index)
		{

		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionDecrement = function(stack)
		{
			let value = stack.pop();
			value -= 1;
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionDecrementI = function(stack)
		{
			let value = stack.pop();
			value -= 1;
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionDeleteProperty = function(stack, index)
		{
			let prop = this.name[index];
			let obj = stack.pop();
			if (obj) {
				if (prop in obj) {
					delete obj[prop];
				} else {
					// TODO
					console.log("ActionDeleteProperty");
				}
			}
			stack[stack.length] = true;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionDivide = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			stack[stack.length] = value1 / value2;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionDup = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = value;
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionDxns = function(stack, index)
		{

		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionDxnsLate = function(stack)
		{
			let value = stack.pop();
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionEquals = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			stack[stack.length] = (value1 == value2);
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionEscXAttr = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = String(value);
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionEscXElem = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = String(value);
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionFindProperty = function(stack, index)
		{
			let prop = this.names[index];
			let obj;
			stack[stack.length] = obj;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionFindPropStrict = function(stack, index)
		{
			let _this = this;
			let name = _this.names[index];
			let values = name.split("::");
			let prop = values.pop();
			let ns = values.pop();
			let obj = null;
			let AVM2;
			// caller
			let caller = _this.caller;
			if (caller && !(caller instanceof MovieClip)) {
				if (name in caller) {
					obj = caller;
				}
			}

			if (!obj) {
				AVM2 = _this.AVM2;
				if (ns) {
					let names = ns.split(".");
					let length = names.length;
					if (length > 1) {
						let avmObj = _this.stage.avm2;
						for (let i = 0; i < length; i++) {
							avmObj = avmObj[names[i]];
						}
						AVM2 = avmObj;
					}
				}

				// local
				if (prop in AVM2) {
					obj = AVM2;
				}
			}

			// find avm
			if (!obj) {
				let avm2s = _this.stage.avm2;
				if (prop in avm2s) {
					obj = avm2s[prop];
				}
			}

			// builder
			if (!obj) {
				let builder = _this.getBuilder();
				if (builder) {
					if (builder instanceof MovieClip) {
						if (prop in _this.methods) {
							obj = builder;
						}

						if (builder.getProperty() !== undefined) {
							obj = builder;
						}
					}
				}
			}

			if (!obj) {
				console.log("ActionFindPropStrict::ERROR", name, AVM2, this);
			}

			stack[stack.length] = obj;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionGetDescendAnts = function(stack, index)
		{
			console.log("ActionGetDescendAnts");
			let porp = this.names[index];
			let obj;
			stack[stack.length] = obj;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionGetGlobalScope = function(stack)
		{
			let _this = this;
			let scopeStack = _this.scopeStack;
			stack[stack.length] = scopeStack[scopeStack.length - 1];
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionGetGlobalsLot = function(stack, index)
		{
			console.log("ActionGetGlobalsLot");
			let value;
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionGetLex = function(stack, index)
		{
			let _this = this;
			let name = _this.names[index];
			stack[stack.length] = _this.getProperty(name);
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionGetLocal = function(stack, index)
		{
			let _this = this;
			let value = _this.args[index - 1];
			if (value === undefined) {
				value = _this.register[index];
			}
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionGetLocal0 = function(stack)
		{
			stack[stack.length] = this.register[0];
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionGetLocal1 = function(stack)
		{
			let _this = this;
			let value = _this.args[0];
			if (value === undefined) {
				value = _this.register[1];
			}
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionGetLocal2 = function(stack)
		{
			let _this = this;
			let value = _this.args[1];
			if (value === undefined) {
				value = _this.register[2];
			}
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionGetLocal3 = function(stack)
		{
			let _this = this;
			let value = _this.args[2];
			if (value === undefined) {
				value = _this.register[3];
			}
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionGetProperty = function(stack, index)
		{
			let _this = this;
			let prop = _this.names[index];
			if (prop === null) {
				prop = stack.pop();
			}
			let obj = stack.pop();

			let value;
			if (obj && prop) {
				if (obj instanceof DisplayObject) {
					if (prop in _this.methods) {
						value = obj[prop];
					}
					if (!value && prop === "parent") {
						value = obj;
					}
					if (!value) {
						value = obj.getProperty(prop);
					}
				} else {
					value = obj[prop];
				}

				if (value === undefined) {
					value = _this.getProperty(prop);
				}
			}
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionGetScopeObject = function(stack, index)
		{
			let activation = this.activation;
			if (!index) {
				stack[stack.length] = activation;
			} else {
				stack[stack.length] = (index in activation) ? activation : null;
			}
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionGetSlot = function(stack, index)
		{
			let obj = stack.pop();
			let name = obj[index];
			stack[stack.length] = this.activation[name];
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionGetSuper = function(stack, index)
		{
			let prop = this.prop;
			let obj = stack.pop();
			let value;
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionGreaterEquals = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			stack[stack.length] = (value1 >= value2);
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionGreaterThan = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			stack[stack.length] = (value1 > value2);
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionHasNext = function(stack)
		{
			let currentIndex = stack.pop();
			let obj = stack.pop();

			currentIndex++;
			let result = 0;
			if (obj) {
				let index = 0;
				for (let key in obj) {
					if (!obj.hasOwnProperty(key)) {
						continue;
					}

					if (index === currentIndex) {
						result = currentIndex;
						break;
					}
					index++;
				}
			}

			stack[stack.length] = result;
		};

		/**
		 * @param stack
		 * @param objectReg
		 * @param indexReg
		 */
		ActionScript3.prototype.ActionHasNext2 = function(stack, objectReg, indexReg)
		{
			let _this = this;
			let obj = _this.register[objectReg];
			let currentIndex = _this.currentIndex;

			let value = false;
			let index = 0;
			if (obj) {
				for (let key in obj) {
					if (!obj.hasOwnProperty(key)) {
						continue;
					}

					if (index === currentIndex) {
						value = true;
						currentIndex++;
						break;
					}

					index++;
				}
			}

			if (!value) {
				currentIndex = 0;
			}

			_this.currentIndex = currentIndex;
			_this.register[indexReg] = index;
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 * @returns {number}
		 */
		ActionScript3.prototype.ActionIfFalse = function(stack, index)
		{
			let value = stack.pop();
			return (value === false) ? index : 0;
		};

		/**
		 * @param stack
		 * @param index
		 * @returns {number}
		 */
		ActionScript3.prototype.ActionIfGe = function(stack, index)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			return (value1 < value2) ? index : 0;
		};

		/**
		 * @param stack
		 * @param index
		 * @returns {number}
		 */
		ActionScript3.prototype.ActionIfGt = function(stack, index)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			return (value1 > value2) ? index : 0;
		};

		/**
		 * @param stack
		 * @param index
		 * @returns {number}
		 */
		ActionScript3.prototype.ActionIfLe = function(stack, index)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			return (value2 < value1) ? index : 0;
		};

		/**
		 * @param stack
		 * @param index
		 * @returns {number}
		 */
		ActionScript3.prototype.ActionIfLt = function(stack, index)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			return (value1 < value2) ? index : 0;
		};

		/**
		 * @param stack
		 * @param index
		 * @returns {number}
		 */
		ActionScript3.prototype.ActionIfNge = function(stack, index)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			return (value1 < value2) ? index : 0;
		};

		/**
		 * @param stack
		 * @param index
		 * @returns {number}
		 */
		ActionScript3.prototype.ActionIfNgt = function(stack, index)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			return (value2 < value1) ? index : 0;
		};

		/**
		 * @param stack
		 * @param index
		 * @returns {number}
		 */
		ActionScript3.prototype.ActionIfNle = function(stack, index)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			return (value2 < value1) ? index : 0;
		};

		/**
		 * @param stack
		 * @param index
		 * @returns {number}
		 */
		ActionScript3.prototype.ActionIfNlt = function(stack, index)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			return (value1 < value2) ? index : 0;
		};

		/**
		 * @param stack
		 * @param index
		 * @returns {number}
		 */
		ActionScript3.prototype.ActionIfNe = function(stack, index)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			return (value1 == value2) ? 0 : index;
		};

		/**
		 * @param stack
		 * @param index
		 * @returns {number}
		 */
		ActionScript3.prototype.ActionIfStrictEq = function(stack, index)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			return (value1 === value2) ? index : 0;
		};

		/**
		 * @param stack
		 * @param index
		 * @returns {number}
		 */
		ActionScript3.prototype.ActionIfStrictNe = function(stack, index)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			return (value1 === value2) ? 0 : index;
		};

		/**
		 * @param stack
		 * @param index
		 * @returns {number}
		 */
		ActionScript3.prototype.ActionIfTrue = function(stack, index)
		{
			let value = stack.pop();
			return (value === true) ? index : 0;
		};


		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionIn = function(stack)
		{
			let obj = stack.pop();
			let name = stack.pop();
			stack[stack.length] = (name in obj);
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionIncLocal = function(stack, index)
		{
			this.register[index] += 1;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionIncLocalI = function(stack, index)
		{
			this.register[index] += 1;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionIncrement = function(stack)
		{
			let value = stack.pop();
			value++;
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionIncrementI = function(stack)
		{
			let value = stack.pop();
			value++;
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionInitProperty = function(stack, index)
		{
			let value = stack.pop();
			let prop = this.names[index];
			let obj = stack.pop();
			if (obj) {
				if (obj instanceof DisplayObject) {
					obj.setProperty(prop, value);
				} else {
					obj[prop] = value;
				}
			}
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionInstanceOf = function(stack)
		{
			let type = stack.pop();
			let value = stack.pop();
			stack[stack.length] = (value instanceof type);
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionIsType = function(stack, index)
		{
			let value = stack.pop();
			let type = this.name[index];
			stack[stack.length] = (value == type);
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionIsTypeLate = function(stack)
		{
			let type = stack.pop();
			let value = stack.pop();
			stack[stack.length] = (value == type);
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionKill = function(stack, index)
		{
			delete this.register[index];
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionLabel = function(stack)
		{

		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionLessEquals = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			stack[stack.length] = (value1 <= value2);
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionLessThan = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			stack[stack.length] = (value1 < value2);
		};

		/**
		 * @param stack
		 * @param offset
		 * @param count
		 * @param array
		 */
		ActionScript3.prototype.ActionLookupSwitch = function(stack, offset, count, array)
		{
			let index = stack.pop();
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionLShift = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
/*jshint bitwise: false*/
			stack[stack.length] = value1 << value2;
/*jshint bitwise: true*/
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionModulo = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			stack[stack.length] = value1 % value2;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionMultiply = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			stack[stack.length] = value1 * value2;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionMultiplyI = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			stack[stack.length] = value1 * value2;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionNeGate = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = -value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionNeGateI = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = -value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionNewActivation = function(stack)
		{
			let _this = this;
			let trait = _this.body.trait;
			let length = trait.length;
			let activation = new Activation();
			for (let i = 0; i < length; i++) {
				let obj = trait[i];
				let kind = obj.kind;
				switch (kind) {
					case 0:
						activation[i + 1] = _this.names[obj.name];
						break;
				}
			}

			_this.activation = activation;
			stack[stack.length] = activation;
		};

		/**
		 * @param stack
		 * @param argCount
		 */
		ActionScript3.prototype.ActionNewArray = function(stack, argCount)
		{
			let array = [];
			for (let i = argCount; i--;) {
				array[i] = stack.pop();
			}
			stack[stack.length] = array;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionNewCatch = function(stack, index)
		{
			let catchScope;
			stack[stack.length] = catchScope;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionNewClass = function(stack, index)
		{
			let basetype = stack.pop();
			let data = this.data;
			let classInfo = data.class[index];
			let id = classInfo.cinit;

			stack[stack.length] = basetype;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionNewFunction = function(stack, index)
		{
			stack[stack.length] = (function(self, id)
			{
				return function()
				{
					let as3 = new ActionScript3(self.data, id, self.ns, self.stage);
					as3.caller = this;
					as3.parent = self;
					as3.args = arguments;
					return as3.execute();
				};
			})(this, index);
		};

		/**
		 * @param stack
		 * @param argCount
		 */
		ActionScript3.prototype.ActionNewObject = function(stack, argCount)
		{
			let obj = {};
			for (let i = argCount; i--;) {
				let value = stack.pop();
				let prop = stack.pop();
				obj[prop] = value;
			}
			stack[stack.length] = obj;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionNextName = function(stack)
		{
			let index = +stack.pop();
			let obj = stack.pop();

			let name;
			if (obj) {
				let count = 0;
				for (let prop in obj) {
					if (!obj.hasOwnProperty(prop)) {
						continue;
					}

					if (count === index) {
						name = prop;
						break;
					}
					count++;
				}
			}
			stack[stack.length] = name;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionNextValue = function(stack)
		{
			let index = stack.pop();
			let obj = stack.pop();
			let value;
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionNop = function(stack)
		{


		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionNot = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = (!value);
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionPop = function(stack)
		{
			stack.pop();
		};

		/**
		 *
		 */
		ActionScript3.prototype.ActionPopScope = function()
		{
			this.scopeStack.pop();
		};

		/**
		 * @param stack
		 * @param value
		 */
		ActionScript3.prototype.ActionPushByte = function(stack, value)
		{
/*jshint bitwise: false*/
			stack[stack.length] = value | 0;
/*jshint bitwise: true*/
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionPushDouble = function(stack, index)
		{
			let data = this.data;
			let double = data.double;
			let value = double[index];
			stack[stack.length] = +value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionPushFalse = function(stack)
		{
			stack[stack.length] = false;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionPushInt = function(stack, index)
		{
			let data = this.data;
			let integer = data.integer;
			let value = integer[index];
			stack[stack.length] = +value;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionPushNameSpace = function(stack, index)
		{
			let data = this.data;
			let names = data.names;
			let value = names[index];
			stack[stack.length] = +value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionPushNan = function(stack)
		{
			stack[stack.length] = NaN;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionPushNull = function(stack)
		{
			stack[stack.length] = null;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionPushScope = function(stack)
		{
			let scope = stack.pop();
			if (scope) {
				let scopeStack = this.scopeStack;
				scopeStack[scopeStack.length] = scope;
			}
		};

		/**
		 * @param stack
		 * @param value
		 */
		ActionScript3.prototype.ActionPushShort = function(stack, value)
		{
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionPushString = function(stack, index)
		{
			let data = this.data;
			let string = data.string;
			stack[stack.length] = "" + string[index];
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionPushTrue = function(stack)
		{
			stack[stack.length] = true;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionPushUInt = function(stack, index)
		{
			let data = this.data;
			let uinteger = data.uinteger;
			stack[stack.length] = uinteger[index];
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionPushUndefined = function(stack)
		{
			stack[stack.length] = undefined;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionPushWith = function(stack)
		{
			let obj = stack.pop();
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionRShift = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
/*jshint bitwise: false*/
			stack[stack.length] = value1 >> value2;
/*jshint bitwise: true*/
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionSetLocal = function(stack, index)
		{
			this.register[index] = stack.pop();
		};


		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionSetLocal0 = function(stack)
		{
			this.register[0] = stack.pop();
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionSetLocal1 = function(stack)
		{
			this.register[1] = stack.pop();
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionSetLocal2 = function(stack)
		{
			this.register[2] = stack.pop();
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionSetLocal3 = function(stack)
		{
			this.register[3] = stack.pop();
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionSetGlobalSlot = function(stack, index)
		{
			let value = stack.pop();
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionSetProperty = function(stack, index)
		{
			let _this = this;
			let value = stack.pop();
			let prop = _this.names[index];
			let obj = stack.pop();

			if (obj) {
				if (obj instanceof DisplayObject) {
					if (prop in _this.methods) {
						obj[prop] = value;
					} else {
						console.log("ActionSetProperty", prop);
					}
				} else if (prop in obj) {
					obj[prop] = value;
				} else {
					let builder = _this.getBuilder();
					let caller = _this.caller;
					if (caller instanceof MovieClip) {
						builder = caller;
					}

					if (builder instanceof DisplayObject) {
						if (prop in _this.methods) {
							builder[prop] = value;
						} else {
							obj[prop] = value;
						}
					}
				}
			}
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionSetSlot = function(stack, index)
		{
			let value = stack.pop();
			let obj = stack.pop();
			let name = obj[index];
			this.activation[name] = value;
		};

		/**
		 * @param stack
		 * @param index
		 */
		ActionScript3.prototype.ActionSetSuper = function(stack, index)
		{
			let value = stack.pop();
			let prop = this.names[index];
			let obj = stack.pop();

		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionStrictEquals = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			stack[stack.length] = (value1 === value2);
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionSubtract = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			stack[stack.length] = value1 - value2;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionSubtractI = function(stack)
		{
			let value2 = +stack.pop();
			let value1 = +stack.pop();
			stack[stack.length] = value1 - value2;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionSwap = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
			stack[stack.length] = value2;
			stack[stack.length] = value1;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionThrow = function(stack)
		{
			let value = stack.pop();
			console.log(value);
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionTypeof = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = typeof value;
		};

		/**
		 * @param stack
		 */
		ActionScript3.prototype.ActionURShift = function(stack)
		{
			let value2 = stack.pop();
			let value1 = stack.pop();
/*jshint bitwise:false*/
			stack[stack.length] = value2 >> value1;
/*jshint bitwise:true*/
		};
		let ActionCodes = [
			[  45, "ActionFSCommand2" ], // 0x2D
			[ 137, "ActionStrictMode" ], // 0x89
			// SWF3 Actions
			[ 129, "ActionGotoFrame" ], // 0x81
			[ 131, "ActionGetURL" ], // 0x83
			[   4, "ActionNextFrame" ], // 0x04
			[   5, "ActionPrevFrame" ], // 0x05
			[   6, "ActionPlay" ], // 0x06
			[   7, "ActionStop" ], // 0x07
			[   8, "ActionToggleQuality" ], // 0x08
			[   9, "ActionStopSounds" ], // 0x09
			[ 138, "ActionWaitForFrame" ], // 0x8A
			[ 139, "ActionSetTarget" ], // 0x8B
			[ 140, "ActionGoToLabel" ], // 0x8C
			// SWF4 Actions
			// Stack operations
			[ 150, "ActionPush" ], // 0x96
			[  23, "ActionPop" ], // 0x17
			// Arithmetic operators
			[  10, "ActionAdd" ], // 0x0A
			[  11, "ActionSubtract" ], // 0x0B
			[  12, "ActionMultiply" ], // 0x0C
			[  13, "ActionDivide" ], // 0x0D
			// Numerical comparison
			[  14, "ActionEquals" ], // 0x0E
			[  15, "ActionLess" ], // 0x0F
			// Logical operators
			[  16, "ActionAnd" ], // 0x10
			[  17, "ActionOr" ], // 0x11
			[  18, "ActionNot" ], // 0x12
			// String comparison
			[  19, "ActionStringEquals" ], // 0x13
			[  41, "ActionStringLess" ], // 0x29
			// String manipulation
			[  20, "ActionStringLength" ], // 0x14
			[  33, "ActionStringAdd" ], // 0x21
			[  21, "ActionStringExtract" ], // 0x15
			[  49, "ActionMBStringLength" ], // 0x31
			[  53, "ActionMBStringExtract" ], // 0x35
			// Type conversion
			[  24, "ActionToInteger" ], // 0x18
			[  50, "ActionCharToAscii" ], // 0x32
			[  51, "ActionAsciiToChar" ], // 0x33
			[  54, "ActionMBCharToAscii" ], // 0x36
			[  55, "ActionMBAsciiToChar" ], // 0x37
			// Control flow
			[ 153, "ActionJump" ], // 0x99
			[ 157, "ActionIf" ], // 0x9D
			[ 158, "ActionCall" ], // 0x9E
			// Variables
			[  28, "ActionGetVariable" ], // 0x1C
			[  29, "ActionSetVariable" ], // 0x1D
			// Movie control
			[ 154, "ActionGetURL2" ], // 0x9A
			[ 159, "ActionGotoFrame2" ], // 0x9F
			[  32, "ActionSetTarget2" ], // 0x20
			[  34, "ActionGetProperty" ], // 0x22
			[  35, "ActionSetProperty" ], // 0x23
			[  36, "ActionCloneSprite" ], // 0x24
			[  37, "ActionRemoveSprite" ], // 0x25
			[  39, "ActionStartDrag" ], // 0x27
			[  40, "ActionEndDrag" ], // 0x28
			[ 141, "ActionWaitForFrame2" ], // 0x8D
			// Utilities
			[  38, "ActionTrace" ], // 0x26
			[  52, "ActionGetTime" ], // 0x34
			[  48, "ActionRandomNumber" ], // 0x30
			// SWF5 Actions
			// ScriptObject actions
			[  61, "ActionCallFunction" ], // 0x3D
			[  82, "ActionCallMethod" ], // 0x52
			[ 136, "ActionConstantPool" ], // 0x88
			[ 155, "ActionDefineFunction" ], // 0x9B
			[  60, "ActionDefineLocal" ], // 0x3C
			[  65, "ActionDefineLocal2" ], // 0x41
			[  58, "ActionDelete" ], // 0x3A
			[  59, "ActionDelete2" ], // 0x3B
			[  70, "ActionEnumerate" ], // 0x46
			[  73, "ActionEquals2" ], // 0x49
			[  78, "ActionGetMember" ], // 0x4E
			[  66, "ActionInitArray" ], // 0x42
			[  67, "ActionInitObject" ], // 0x43
			[  83, "ActionNewMethod" ], // 0x53
			[  64, "ActionNewObject" ], // 0x40
			[  79, "ActionSetMember" ], // 0x4F
			[  69, "ActionTargetPath" ], // 0x45
			[ 148, "ActionWith" ], // 0x94
			// Type actions
			[  74, "ActionToNumber" ], // 0x4A
			[  75, "ActionToString" ], // 0x4B
			[  68, "ActionTypeOf" ], // 0x44
			// Math actions
			[  71, "ActionAdd2" ], // 0x47
			[  72, "ActionLess2" ], // 0x48
			[  63, "ActionModulo" ], // 0x3F
			// Stack operator actions
			[  96, "ActionBitAnd" ], // 0x60
			[  99, "ActionBitLShift" ], // 0x63
			[  97, "ActionBitOr" ], // 0x61
			[ 100, "ActionBitRShift" ], // 0x64
			[ 101, "ActionBitURShift" ], // 0x65
			[  98, "ActionBitXor" ], // 0x62
			[  81, "ActionDecrement" ], // 0x51
			[  80, "ActionIncrement" ], // 0x50
			[  76, "ActionPushDuplicate" ], // 0x4C
			[  62, "ActionReturn" ], // 0x3E
			[  77, "ActionStackSwap" ], // 0x4D
			[ 135, "ActionStoreRegister" ], // 0x87
			// SWF6 Actions
			[  84, "ActionInstanceOf" ], // 0x54
			[  85, "ActionEnumerate2" ], // 0x55
			[ 102, "ActionStrictEquals" ], // 0x66
			[ 103, "ActionGreater" ], // 0x67
			[ 104, "ActionStringGreater" ], // 0x68
			// SWF7 Actions
			[ 142, "ActionDefineFunction2" ], // 0x8E
			[ 105, "ActionExtends" ], // 0x69
			[  43, "ActionCastOp" ], // 0x2B
			[  44, "ActionImplementsOp" ], // 0x2C
			[ 143, "ActionTry" ], // 0x8F
			[  42, "ActionThrow" ], // 0x2A
			// dummy
			[   0, "Action End of Actions"]
		];

		let BitmapData = function()
		{
		};

		BitmapData.prototype.loadBitmap = function(name)
		{
			console.log('BitmapData.prototype.loadBitmap '+name);
		};


		/**
		 * @param data
		 * @param constantPool
		 * @param register
		 * @param initAction
		 * @constructor
		 */
		let ActionScript = function(data, constantPool, register, initAction)
		{
			let _this = this;
			_this.cache = [];
			_this.params = [];
			_this.constantPool = constantPool || [];
			_this.register = register || [];
			_this.variables = {};
			_this.initAction = (initAction) ? true : false;
			_this.scope = null;
			_this.parent = null;
			_this.arg = null;
			_this.version = 7;
			_this.superClass = null;
			if (data.length) {
				_this.initialize(data);
			}
			_this.initParam();
		};

		/**
		 * reset
		 */
		ActionScript.prototype.reset = function()
		{
			let _this = this;
			_this.arg = null;
			_this.variables = {};
			_this.initParam();
		};

		/**
		 * initParam
		 */
		ActionScript.prototype.initParam = function()
		{
			let _this = this;
			let register = _this.register;
			let length = register.length;
			let params = [];
			for (let i = 0; i < length; i++) {
				let obj = register[i];
				if (obj.name === null) {
					params[obj.register] = obj.value;
				} else {
					params[obj.register] = obj.name;
				}
			}
			_this.params = params;
		};

		/**
		 * @param values
		 */
		ActionScript.prototype.initVariable = function(values)
		{
			let _this = this;
			_this.arg = values;
			let register = _this.register;
			let length = register.length;
			let variables = _this.variables;
			let key = 0;
			for (let i = 0; i < length; i++) {
				let obj = register[i];
				if (obj.name === null) {
					continue;
				}
				variables[obj.name] = values[key++];
			}
			_this.variables = variables;
			_this.initParam();
		};

		/**
		 * @returns {{}}
		 */
		ActionScript.prototype.getSuperClass = function()
		{
			let _this = this;
			let superClass = _this.superClass;
			if (!superClass) {
				let parent = _this.parent;
				if (parent) {
					superClass = parent.getSuperClass();
				}
			}
			return superClass;
		};

		/**
		 * @param name
		 * @param value
		 */
		ActionScript.prototype.setVariable = function(name, value)
		{
			let _this = this;
			let finish = false;
			if (name in _this.variables) {
				_this.variables[name] = value;
				finish = true;
			}
			if (!finish) {
				let parent = _this.parent;
				if (parent) {
					finish = parent.setVariable(name, value);
				}
			}
			return finish;
		};

		/**
		 * @param name
		 * @returns {*}
		 */
		ActionScript.prototype.getVariable = function(name)
		{
			let _this = this;
			let value, parent;
			switch (name) {
				case "this":
					value = _this.variables["this"];
					break;
				case "arguments":
					value = _this.arg;
					break;
				default:
					value = _this.variables[name];
					if (value === undefined) {
						parent = _this.parent;
						if (parent) {
							value = parent.getVariable(name);
						}
					}
					break;
			}
			return value;
		};

		/**
		 * @param value
		 * @returns {string}
		 */
		ActionScript.prototype.valueToString = function(value)
		{
			if (typeof value !== "string") {
				value += "";
			}
			return value;
		};

		/**
		 * @param str
		 * @param mc
		 * @returns {*}
		 */
		ActionScript.prototype.stringToObject = function(str, mc)
		{
			let object = this.getVariable(str);
			if (object === undefined) {
				object = mc.getProperty(str);
			}
			return object;
		};

		/**
		 * @param data
		 */
		ActionScript.prototype.initialize = function(data)
		{
			let _this = this;
			let isEnd = false;
			let obj = {};
			let i = 0;
			let idx = 0;
			let cache = [];
			let indexes = [];
			let asData;
			let register;
			let values;
			let NumParams;
			let payloadLength;
			let withEndPoint = 0;
			let bitio = new BitIO();
			bitio.setData(data);

			let pBitio = new BitIO();
			let endPoint = data.length;

			_this.initParam();
			while (bitio.byte_offset < endPoint) {
				let startOffset = bitio.byte_offset;
				obj = {};

				if (withEndPoint && withEndPoint === bitio.byte_offset) {
					withEndPoint = 0;
					obj.actionCode = 0x94;
					obj.Size = 0;
					cache[cache.length] = obj;
					continue;
				}

				let actionCode = bitio.getUI8();
				obj.actionCode = actionCode;

				let payload = null;
				if (actionCode >= 0x80) {
					payloadLength = bitio.getUI16();
					payload = bitio.getData(payloadLength);
					pBitio.setData(payload);
					pBitio.setOffset(0, 0);
				}

				switch (actionCode) {
					// GotoFrame
					case 0x81: // 129
/*jshint bitwise: false*/
						obj.frame = (pBitio.getUI16() | 0) + 1;
/*jshint bitwise: true*/
						break;
						// WaitForFrame
					case 0x8A: // 138
						obj.frame = pBitio.getUI16();
						obj.skipCount = pBitio.getUI8();
						break;
						// SetTarget
					case 0x8B: // 139
						obj.targetName = pBitio.getDataUntil("\0");
						break;
						// GoToLabel
					case 0x8C: // 140
						obj.label = pBitio.getDataUntil("\0");
						break;
					case 0x83: // 131
						let len = payload.length - 1;
						let urls = [[]];
						idx = 0;
						for (i = 0; i < len; i++) {
							let str = _fromCharCode(payload[i]);
							if (payload[i] === 0) {
								idx++;
								urls[idx] = [];
								continue;
							}
							urls[idx] += str;
						}

						let urlString = urls[0];
						if (typeof urlString === "string") {
							let splitUrl = urlString.split("?");
							if (2 in splitUrl) {
								urlString = splitUrl[0];
								urlString += "?" + splitUrl[1];
								let paramLength = splitUrl.length;
								for (i = 2; i < paramLength; i++) {
									urlString += "&" + splitUrl[i];
								}
							}
						}

						obj.url = urlString;
						obj.target = urls[1];
						break;
						// Push
					case 0x96: // 150
						values = [];
						while (pBitio.byte_offset < payloadLength) {
							let type = pBitio.getUI8();
							switch (type) {
								case 0: // String
									values[values.length] = String(pBitio.getDataUntil("\0"));
									break;
								case 1: // Float
									values[values.length] = pBitio.getFloat32();
									break;
								case 2: // null
									values[values.length] = null;
									break;
								case 3: // undefined
									values[values.length] = undefined;
									break;
								case 4: // RegisterNumber
									values[values.length] = {"key": pBitio.getUI8()};
									break;
								case 5: // Boolean
									values[values.length] = (pBitio.getUI8()) ? true : false;
									break;
								case 6: // Double
									values[values.length] = pBitio.getFloat64();
									break;
								case 7: // Integer
									values[values.length] = pBitio.getUI32();
									break;
								case 8: // Constant8
									values[values.length] = _this.constantPool[pBitio.getUI8()];
									break;
								case 9: // Constant16
									values[values.length] = _this.constantPool[pBitio.getUI16()];
									break;
								default:
									break;
							}
						}
						obj.values = values;
						break;
						// If
					case 0x9D: // 157
						obj.offset = bitio.byte_offset + bitio.toSI16LE(payload);
						break;
						// Jump
					case 0x99: // 153
						obj.offset = bitio.byte_offset + bitio.toSI16LE(payload);
						break;
						// GetURL2
					case 0x9A: // 154
						obj.LoadVariablesFlag = pBitio.getUIBits(1); // 0=none, 1=LoadVariables
						obj.LoadTargetFlag = pBitio.getUIBits(1); // 0=web, 1=Sprite
						pBitio.getUIBits(4); // Reserved
						obj.SendVarsMethod = pBitio.getUIBits(2); // 0=NONE, 1=GET, 2=POST
						break;
						// GoToFrame2
					case 0x9F: // 159
						pBitio.getUIBits(6); // Reserved
						obj.SceneBiasFlag = pBitio.getUIBit();
						obj.PlayFlag = pBitio.getUIBit(); // 0=stop, 1=play
						if (obj.SceneBiasFlag === 1) {
							obj.SceneBias = pBitio.getUI16();
						}
						break;
						// WaitForFrame2
					case 0x8D: // 141
						obj.skipCount = pBitio.getUI8();
						break;
						// ConstantPool
					case 0x88: // 136
						let count = pBitio.getUI16();
						let constantPool = [];
						if (count > 0) {
							while (count--) {
								constantPool[constantPool.length] = pBitio.getDataUntil("\0");
							}
						}
						obj.constantPool = constantPool;
						_this.constantPool = constantPool;
						break;
						// ActionDefineFunction
					case 0x9b: // 155
						obj.FunctionName = pBitio.getDataUntil("\0");
						NumParams = pBitio.getUI16();
						register = [];
						if (NumParams > 0) {
							idx = 1;
							while (NumParams--) {
								register[register.length] = {
									register: idx,
									name: pBitio.getDataUntil("\0"),
									value: null
								};
							}
						}

						asData = bitio.getData(pBitio.getUI16());
						obj.ActionScript = new ActionScript(asData, _this.constantPool, register, _this.initAction);
						break;
						// ActionWith
					case 0x94: // 148
						obj.Size = pBitio.getUI16();
						withEndPoint = obj.Size + bitio.byte_offset;
						break;
						// ActionStoreRegister
					case 0x87: // 135
						obj.RegisterNumber = pBitio.getUI8();
						break;
						// SWF 7 ***********************************
						// ActionDefineFunction2
					case 0x8e: // 142
						register = [];
						values = [];

						obj.FunctionName = pBitio.getDataUntil("\0");
						NumParams = pBitio.getUI16();
						let RegisterCount = pBitio.getUI8();
						obj.PreloadParentFlag = pBitio.getUIBits(1);
						obj.PreloadRootFlag = pBitio.getUIBits(1);
						obj.SuppressSuperFlag = pBitio.getUIBits(1);
						obj.PreloadSuperFlag = pBitio.getUIBits(1);
						obj.SuppressArgumentsFlag = pBitio.getUIBits(1);
						obj.PreloadArgumentsFlag = pBitio.getUIBits(1);
						obj.SuppressThisFlag = pBitio.getUIBits(1);
						obj.PreloadThisFlag = pBitio.getUIBits(1);
						pBitio.getUIBits(7); // Reserved
						obj.PreloadGlobalFlag = pBitio.getUIBits(1);

						if (obj.PreloadThisFlag) {
							values[values.length] = "this";
						}
						if (obj.PreloadArgumentsFlag) {
							values[values.length] = "arguments";
						}
						if (obj.PreloadSuperFlag) {
							values[values.length] = "super";
						}
						if (obj.PreloadRootFlag) {
							values[values.length] = "_root";
						}
						if (obj.PreloadParentFlag) {
							values[values.length] = "_parent";
						}
						if (obj.PreloadGlobalFlag) {
							values[values.length] = "_global";
						}
						for (idx = 1; idx < RegisterCount; idx++) {
							let rIdx = idx - 1;
							if (!(rIdx in values)) {
								continue;
							}
							register[register.length] = {
								register: idx,
								name: null,
								value: values[rIdx]
							};
						}

						if (NumParams > 0) {
							while (NumParams--) {
								let Register = pBitio.getUI8();
								let ParamName = pBitio.getDataUntil("\0");
								register[register.length] = {
									register: Register,
									name: ParamName,
									value: null
								};
							}
						}

						asData = bitio.getData(pBitio.getUI16());
						obj.ActionScript = new ActionScript(asData, _this.constantPool, register, _this.initAction);
						break;
						// ActionTry
					case 0x8f: // 143
						pBitio.getUIBits(5); // Reserved
						let CatchInRegisterFlag = pBitio.getUIBits(1);
						obj.FinallyBlockFlag = pBitio.getUIBits(1);
						obj.CatchBlockFlag = pBitio.getUIBits(1);
						let TrySize = pBitio.getUI16();
						let CatchSize = pBitio.getUI16();
						let FinallySize = pBitio.getUI16();

						let CatchName;
						if (!CatchInRegisterFlag) {
							CatchName = pBitio.getDataUntil("\0");
						} else {
							CatchName = pBitio.getUI8();
						}

						i = 0;
						let TryBody = [];
						if (TrySize) {
							while (TrySize) {
								TryBody[TryBody.length] = bitio.getUI8();
								TrySize--;
							}
						}

						obj.try = (function(data)
						{
							let as = new ActionScript(data);
							return function()
							{
								as.reset();
								as.variables["this"] = this;
								return as.execute(this);
							};
						})(TryBody);

						if (obj.CatchBlockFlag) {
							let CatchBody = [];
							if (CatchSize) {
								while (CatchSize) {
									CatchBody[CatchBody.length] = bitio.getUI8();
									CatchSize--;
								}
							}

							obj.catch = (function(data, catchName)
							{
								let as = new ActionScript(data);
								return function()
								{
									as.reset();
									as.variables["this"] = this;
									as.variables[catchName] = arguments[0];
									return as.execute(this);
								};
							})(CatchBody, CatchName);
						}

						if (obj.FinallyBlockFlag) {
							let FinallyBody = [];
							if (FinallySize) {
								while (FinallySize) {
									FinallyBody[FinallyBody.length] = bitio.getUI8();
									FinallySize--;
								}
							}

							obj.finally = (function(data)
							{
								let as = new ActionScript(data);
								return function()
								{
									as.reset();
									as.variables["this"] = this;
									return as.execute(this);
								};
							})(FinallyBody);
						}

						break;
					case 0x00: // 0
						isEnd = true;
						break;
				}

				indexes[startOffset] = cache.length;
				cache[cache.length] = obj;

				if (isEnd) {
					break;
				}
			}

			// If and Jump
			let length = cache.length;
			for (i = 0; i < length; i++) {
				obj = cache[i];
				let code = obj.actionCode;
				if (code === 0x9D || code === 0x99) {
					let index = indexes[obj.offset];
					if (index !== undefined) {
						obj.offset = index - 1;
					} else {
						obj.offset = cache.length - 1;
					}
				}
			}
			_this.cache = cache;
		};

		/**
		 * @param value
		 * @returns {*}
		 */
		ActionScript.prototype.calc = function(value)
		{
			let calc;
			switch (typeof value) {
				case "boolean":
					calc = (value) ? 1 : 0;
					break;
				case "object":
					if (value === null) {
						calc = 0;
					} else if (value instanceof Array) {
						calc = value.length;
					} else if (value instanceof Object) {
						calc = 1;
					}
					break;
				default:
					calc = +value;
					break;
			}

			if (_isNaN(calc)) {
				calc = 0;
			}

			return calc;
		};

		/**
		 * @param value
		 * @returns {*}
		 */
		ActionScript.prototype.logicValue = function(value)
		{
			let calc;
			switch (typeof value) {
				case "boolean":
					calc = (value) ? 1 : 0;
					break;
				case "object":
					if (value === null) {
						calc = 0;
					} else if (value instanceof Array) {
						calc = value.length;
					} else if (value instanceof Object) {
						calc = 1;
					}
					break;
				case "string":
					if (value === "") {
						calc = 0;
					} else {
						calc = 1;
					}
					break;
				case "function":
					calc = 1;
					break;
				default:
					calc = +value;
					if (_isNaN(calc)) {
						calc = 0;
					}
					break;
			}
			return calc;
		};

		/**
		 * @param stack
		 * @returns {Number}
		 */
		ActionScript.prototype.operationValue = function(stack)
		{
			let value = +stack.pop();
			if (_isNaN(value)) {
				value = 0;
			}
			return value;
		};

		/**
		 * @param mc
		 * @returns {*}
		 */
		ActionScript.prototype.execute = function(mc)
		{
			let _this = this;
			let scope = _this.scope;
			let movieClip = (scope instanceof MovieClip) ? scope : mc;
			if (!movieClip.active) {
				return undefined;
			}
			let stage = movieClip.getStage();
			if (stage) {
				_this.version = stage.getVersion();
			}

			let stack = [];
			let cache = _this.cache;
			let cLength = cache.length;
			let cIdx = 0;
			while (cIdx < cLength) {
				if (!(cIdx in cache)) {
					cIdx++;
					continue;
				}

				let aScript = cache[cIdx];
				let actionCode = aScript.actionCode;

				if (actionCode === 0) {
					break;
				}

				switch (actionCode) {
					// ********************************************
					// SWF 3
					// ********************************************
					case 0x81:
						_this.ActionGotoFrame(movieClip, aScript.frame);
						break;
					case 0x04:
						_this.ActionNextFrame(movieClip);
						break;
					case 0x05:
						_this.ActionPreviousFrame(movieClip);
						break;
					case 0x06:
						_this.ActionPlay(movieClip);
						break;
					case 0x07:
						_this.ActionStop(movieClip);
						break;
					case 0x08: // ActionToggleQuality
					case 0x8A: // ActionWaitForFrame
						break;
					case 0x09:
						_this.ActionStopSounds(movieClip);
						break;
					case 0x8B:
						movieClip = _this.ActionSetTarget(movieClip, mc, aScript.targetName);
						break;
					case 0x8C:
						_this.ActionGoToLabel(movieClip, aScript.label);
						break;
					case 0x83:
						_this.ActionGetURL(movieClip, aScript.url, aScript.target);
						break;

						// ********************************************
						// SWF 4
						// ********************************************
					case 0x0A: // ActionAdd
						_this.ActionOperation(stack, 0);
						break;
					case 0x0B: // ActionSubtract
						_this.ActionOperation(stack, 1);
						break;
					case 0x0C: // ActionMultiply
						_this.ActionOperation(stack, 2);
						break;
					case 0x0D: // ActionDivide
						_this.ActionOperation(stack, 3);
						break;
					case 0x0E:
						_this.ActionEquals(stack);
						break;
					case 0x0F:
						_this.ActionLess(stack);
						break;
					case 0x10:
						_this.ActionAnd(stack);
						break;
					case 0x11:
						_this.ActionOr(stack);
						break;
					case 0x12:
						_this.ActionNot(stack);
						break;
					case 0x13:
						_this.ActionStringEquals(stack);
						break;
					case 0x14: // ActionStringLength
					case 0x31: // ActionMBStringLength
						_this.ActionStringLength(stack);
						break;
					case 0x21:
						_this.ActionStringAdd(stack);
						break;
					case 0x15: // ActionStringExtract
					case 0x35: // ActionMBStringExtract
						_this.ActionStringExtract(stack);
						break;
					case 0x29:
						_this.ActionStringLess(stack);
						break;
					case 0x17: // ActionPop
						stack.pop();
						break;
					case 0x96:
						_this.ActionPush(stack, movieClip, aScript.values);
						break;
					case 0x33: // ActionAsciiToChar
					case 0x37: // ActionMBAsciiToChar
						_this.ActionAsciiToChar(stack);
						break;
					case 0x36: // ActionMBCharToAscii
					case 0x32: // ActionCharToAscii
						_this.ActionCharToAscii(stack);
						break;
					case 0x18:
						_this.ActionToInteger(stack);
						break;
					case 0x9E:
						_this.ActionCall(stack, movieClip);
						break;
					case 0x9D:
						cIdx = _this.ActionIf(stack, aScript.offset, cIdx);
						break;
					case 0x99: // ActionJump
						cIdx = aScript.offset;
						break;
					case 0x1C:
						_this.ActionGetVariable(stack, movieClip);
						break;
					case 0x1D:
						_this.ActionSetVariable(stack, movieClip);
						break;
					case 0x9A:
						_this.ActionGetURL2(stack, aScript, movieClip);
						break;
					case 0x22:
						_this.ActionGetProperty(stack, movieClip);
						break;
					case 0x9F:
						_this.ActionGoToFrame2(stack, aScript, movieClip);
						break;
					case 0x20:
						movieClip = _this.ActionSetTarget2(stack, movieClip, mc);
						break;
					case 0x23:
						_this.ActionSetProperty(stack, movieClip);
						break;
					case 0x27:
						_this.ActionStartDrag(stack, movieClip);
						break;
					case 0x8D: // ActionWaitForFrame2
						stack.pop();
						break;
					case 0x24:
						_this.ActionCloneSprite(stack, movieClip);
						break;
					case 0x25:
						_this.ActionRemoveSprite(stack, movieClip);
						break;
					case 0x28:
						_this.ActionEndDrag(movieClip);
						break;
					case 0x34:
						_this.ActionGetTime(stack);
						break;
					case 0x30:
						_this.ActionRandomNumber(stack);
						break;
					case 0x26:
						_this.ActionTrace(stack);
						break;
					case 0x00:
						break;
					case 0x2D:
						_this.ActionFsCommand2(stack, movieClip);
						break;

						// ********************************************
						// SWF 5
						// ********************************************
					case 0x52:
						_this.ActionCallMethod(stack, movieClip);
						break;
					case 0x88: // ActionConstantPool
						_this.constantPool = aScript.constantPool;
						break;
					case 0x3d:
						_this.ActionCallFunction(stack, movieClip);
						break;
					case 0x9b:
						_this.ActionDefineFunction(stack, aScript, movieClip);
						break;
					case 0x3c:
						_this.ActionDefineLocal(stack, movieClip);
						break;
					case 0x41:
						_this.ActionDefineLocal2(stack, movieClip);
						break;
					case 0x3a:
						_this.ActionDelete(stack, movieClip);
						break;
					case 0x3b:
						_this.ActionDelete2(stack, movieClip);
						break;
					case 0x46:
						_this.ActionEnumerate(stack, movieClip);
						break;
					case 0x49:
						_this.ActionEquals2(stack);
						break;
					case 0x4e:
						_this.ActionGetMember(stack, movieClip);
						break;
					case 0x42:
						_this.ActionInitArray(stack);
						break;
					case 0x43:
						_this.ActionInitObject(stack);
						break;
					case 0x53:
						_this.ActionNewMethod(stack, movieClip);
						break;
					case 0x40:
						_this.ActionNewObject(stack, movieClip);
						break;
					case 0x4f:
						_this.ActionSetMember(stack, movieClip);
						break;
					case 0x45:
						_this.ActionTargetPath(stack);
						break;
					case 0x94:
						movieClip = _this.ActionWith(stack, aScript.Size, mc);
						break;
					case 0x4a:
						_this.ActionToNumber(stack);
						break;
					case 0x4b:
						_this.ActionToString(stack);
						break;
					case 0x44:
						_this.ActionTypeOf(stack);
						break;
					case 0x47:
						_this.ActionAdd2(stack);
						break;
					case 0x48:
						_this.ActionLess2(stack);
						break;
					case 0x3f:
						_this.ActionModulo(stack);
						break;
					case 0x60:
						_this.ActionBitAnd(stack);
						break;
					case 0x63:
						_this.ActionBitLShift(stack);
						break;
					case 0x61:
						_this.ActionBitOr(stack);
						break;
					case 0x64:
						_this.ActionBitRShift(stack);
						break;
					case 0x65:
						_this.ActionBitURShift(stack);
						break;
					case 0x62:
						_this.ActionBitXor(stack);
						break;
					case 0x51:
						_this.ActionDecrement(stack);
						break;
					case 0x50:
						_this.ActionIncrement(stack);
						break;
					case 0x4c:
						_this.ActionPushDuplicate(stack);
						break;
					case 0x3e: // ActionReturn
						return stack.pop();
					case 0x4d:
						_this.ActionStackSwap(stack);
						break;
					case 0x87:
						_this.ActionStoreRegister(stack, aScript.RegisterNumber);
						break;

						// ********************************************
						// SWF 6
						// ********************************************
					case 0x54:
						_this.ActionInstanceOf(stack);
						break;
					case 0x55:
						_this.ActionEnumerate(stack, movieClip);
						break;
					case 0x66:
						_this.ActionStrictEquals(stack);
						break;
					case 0x67: // ActionGreater
					case 0x68: // ActionStringGreater
						_this.ActionGreater(stack);
						break;

						// ********************************************
						// SWF 7
						// ********************************************
					case 0x8e: // ActionDefineFunction2
						_this.ActionDefineFunction(stack, aScript, movieClip);
						break;
					case 0x69:
						_this.ActionExtends(stack);
						break;
					case 0x2b:
						_this.ActionCastOp(stack);
						break;
					case 0x2c:
						_this.ActionImplementsOp(stack);
						break;
					case 0x8f:
						_this.ActionTry(aScript, movieClip);
						break;
					case 0x2a:
						_this.ActionThrow(stack);
						break;

					default:
						console.log("[ActionScript Error] Code: " + actionCode);
						break;
				}
				cIdx++;
			}
		};

		/**
		 * @type {{}}
		 */
		ActionScript.prototype.methods = {
			gotoandstop: "gotoAndStop",
			gotoandplay: "gotoAndPlay",
			play: "play",
			stop: "stop",
			duplicatemovieclip: "duplicateMovieClip",
			getproperty: "getProperty",
			removemovieclip: "removeMovieClip",
			setproperty: "setProperty",
			startdrag: "startDrag",
			stopdrag: "stopDrag",
			targetpath: "targetPath",
			updateafterevent: "updateAfterEvent",
			nextframe: "nextFrame",
			nextscene: "nextScene",
			prevframe: "prevFrame",
			prevscene: "prevScene",
			stopallsounds: "stopAllSounds",
			setmask: "setMask",
			geturl: "getURL",
			loadmovie: "loadMovie",
			loadmovienum: "loadMovieNum",
			loadvariables: "loadVariables",
			loadvariablesnum: "loadVariablesNum",
			unloadmovie: "unloadMovie",
			unloadmovienum: "unloadMovieNum",
			swapdepths: "swapDepths",
			getinstanceatdepth: "getInstanceAtDepth",
			attachmovie: "attachMovie",
			attachaudio: "attachAudio",
			//attachsound: "attachSound",
			//loadbitmap: "loadBitmap",
			attachbitmap: "attachBitmap",
			getnexthighestdepth: "getNextHighestDepth",
			getbytesloaded: "getBytesLoaded",
			getbytestotal: "getBytesTotal",
			assetpropflags: "ASSetPropFlags",
			linestyle: "lineStyle",
			linegradientstyle: "lineGradientStyle",
			beginfill: "beginFill",
			begingradientfill: "beginGradientFill",
			beginbitmapfill: "beginBitmapFill",
			clear: "clear",
			moveto: "moveTo",
			lineto: "lineTo",
			curveto: "curveTo",
			endfill: "endFill",
			hittest: "hitTest",
			getdepth: "getDepth",
			createemptymovieclip: "createEmptyMovieClip",
			createtextfield: "createTextField",
			getbounds: "getBounds",
			getrect: "getRect",
			getswfversion: "getSWFVersion",
			gettextsnapshot: "getTextSnapshot",
			globaltolocal: "globalToLocal",
			localtoglobal: "localToGlobal"
		};

		/**
		 * @param method
		 * @returns {*}
		 */
		ActionScript.prototype.checkMethod = function(method)
		{
			if (!method || typeof method !== "string") {
				return method;
			}
			let lowerMethod = method.toLowerCase();
			return this.methods[lowerMethod] || null;
		};

		/**
		 * @param mc
		 * @param frame
		 */
		ActionScript.prototype.ActionGotoFrame = function(mc, frame)
		{
			if (mc instanceof MovieClip) {
				mc.stop();
				mc.setNextFrame(frame);
			}
		};

		/**
		 * @param mc
		 */
		ActionScript.prototype.ActionNextFrame = function(mc)
		{
			if (mc instanceof MovieClip) {
				mc.nextFrame();
			}
		};

		/**
		 * @param mc
		 */
		ActionScript.prototype.ActionPreviousFrame = function(mc)
		{
			if (mc instanceof MovieClip) {
				mc.prevFrame();
			}
		};

		/**
		 * @param mc
		 */
		ActionScript.prototype.ActionPlay = function(mc)
		{
			if (mc instanceof MovieClip) {
				mc.play();
			}
		};

		/**
		 * @param mc
		 */
		ActionScript.prototype.ActionStop = function(mc)
		{
			if (mc instanceof MovieClip) {
				mc.stop();
			}
		};

		/**
		 * @param mc
		 */
		ActionScript.prototype.ActionStopSounds = function(mc)
		{
			if (mc instanceof MovieClip) {
				mc.stopAllSounds();
			}
		};

		/**
		 * @param movieClip
		 * @param mc
		 * @param target
		 * @returns {*}
		 */
		ActionScript.prototype.ActionSetTarget = function(movieClip, mc, target)
		{
			if (target !== "") {
				let targetMc = movieClip;
				if (!targetMc) {
					targetMc = mc;
				}
				return targetMc.getDisplayObject(target);
			} else {
				if (mc.active) {
					return mc;
				} else {
					return undefined;
				}
			}
		};

		/**
		 * @param mc
		 * @param label
		 */
		ActionScript.prototype.ActionGoToLabel = function(mc, label)
		{
			if (mc instanceof MovieClip) {
				let frame = mc.getLabel(label);
				mc.stop();
				if (typeof frame === "number" && frame) {
					mc.setNextFrame(frame);
				}
			}
		};

		/**
		 * @param mc
		 * @param url
		 * @param target
		 */
		ActionScript.prototype.ActionGetURL = function(mc, url, target)
		{
			if (mc instanceof MovieClip) {
				mc.getURL(url, target);
			}
		};

		/**
		 * @param stack
		 * @param operation
		 */
		ActionScript.prototype.ActionOperation = function(stack, operation)
		{
			let _this = this;
			let a = _this.operationValue(stack);
			let b = _this.operationValue(stack);
			let value;
			switch (operation) {
				case 0:
					value = b + a;
					break;
				case 1:
					value = b - a;
					break;
				case 2:
					value = b * a;
					break;
				case 3:
					value = b / a;
					break;
			}
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionEquals = function(stack)
		{
			let _this = this;
			let a = _this.calc(stack.pop());
			let b = _this.calc(stack.pop());
			if (_this.version > 4) {
				stack[stack.length] = (a === b);
			} else {
				stack[stack.length] = (a === b) ? 1 : 0;
			}
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionLess = function(stack)
		{
			let _this = this;
			let a = _this.calc(stack.pop());
			let b = _this.calc(stack.pop());
			if (_this.version > 4) {
				stack[stack.length] = (b < a);
			} else {
				stack[stack.length] = (b < a) ? 1 : 0;
			}
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionAnd = function(stack)
		{
			let _this = this;
			let a = stack.pop();
			let b = stack.pop();
			if (_this.version > 4) {
				a = _this.logicValue(a);
				b = _this.logicValue(b);
				stack[stack.length] = (a !== 0 && b !== 0);
			} else {
				a = _this.calc(a);
				b = _this.calc(b);
				stack[stack.length] = (a !== 0 && b !== 0) ? 1 : 0;
			}
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionOr = function(stack)
		{
			let _this = this;
			let a = stack.pop();
			let b = stack.pop();
			if (_this.version > 4) {
				a = _this.logicValue(a);
				b = _this.logicValue(b);
				stack[stack.length] = (a !== 0 || b !== 0);
			} else {
				a = _this.calc(a);
				b = _this.calc(b);
				stack[stack.length] = (a !== 0 || b !== 0) ? 1 : 0;
			}
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionNot = function(stack)
		{
			let _this = this;
			let a = stack.pop();
			if (_this.version > 4) {
				a = _this.logicValue(a);
				stack[stack.length] = (a === 0);
			} else {
				a = _this.calc(a);
				stack[stack.length] = (a === 0) ? 1 : 0;
			}
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionStringEquals = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();

			if (a instanceof MovieClip) {
				a = a.getTarget();
			} else {
				a += "";
			}

			if (b instanceof MovieClip) {
				b = b.getTarget();
			} else {
				b += "";
			}

			if (this.version > 4) {
				stack[stack.length] = (b === a);
			} else {
				stack[stack.length] = (b === a) ? 1 : 0;
			}
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionStringLength = function(stack)
		{
			let value = stack.pop();
			value = this.valueToString(value);
			let length = 0;
			let sLen = value.length;
			for (let i = 0; i < sLen; i++, length++) {
				let code = value.charCodeAt(i);
				if (code < 255) {
					continue;
				}
				length++;
			}
			stack[stack.length] = length;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionStringAdd = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			if (a === null || a === undefined) {
				a = "";
			}
			if (b === null || b === undefined) {
				b = "";
			}
			stack[stack.length] = b + "" + a;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionStringExtract = function(stack)
		{
			let count = stack.pop();
			let index = stack.pop();
			let string = stack.pop();
			string = this.valueToString(string);
			index--;
			if (index < 0) {
				index = 0;
			}
			stack[stack.length] = (count < 0) ? string.substr(index) : string.substr(index, count);
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionStringLess = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			if (this.version > 4) {
				stack[stack.length] = (b < a);
			} else {
				stack[stack.length] = (b < a) ? 1 : 0;
			}
		};

		/**
		 * @param stack
		 * @param mc
		 * @param values
		 */
		ActionScript.prototype.ActionPush = function(stack, mc, values)
		{
			let _this = this;
			let length = values.length;
			let params = _this.params;
			for (let i = 0; i < length; i++) {
				let value = values[i];
				if (value instanceof Object) {
					let key = value.key;
					value = undefined;
					if (key in params) {
						let name = params[key];
						if (typeof name === "string") {
							value = _this.getVariable(name);
							if (value === undefined && !(name in _this.variables)) {
								value = name;
							}
						} else {
							value = name;
						}
					}
				}
				stack[stack.length] = value;
			}
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionAsciiToChar = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = _fromCharCode(value);
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionCharToAscii = function(stack)
		{
			let value = stack.pop();
			value = this.valueToString(value);
			stack[stack.length] = value.charCodeAt(0);
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionToInteger = function(stack)
		{
			let value = stack.pop();
			stack[stack.length] = value | 0;
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionCall = function(stack, mc)
		{
			let value = stack.pop();
			if (mc) {
				value = this.valueToString(value);
				let splitData = value.split(":");
				let frame;
				let label = splitData[0];
				let targetMc = mc;
				if (splitData.length > 1) {
					targetMc = mc.getDisplayObject(splitData[0]);
					label = splitData[1];
				}
				if (targetMc instanceof MovieClip) {
					frame = (typeof label === "number") ? label : targetMc.getLabel(label);
					targetMc.executeActions(frame);
				}
			}
		};

		/**
		 * @param stack
		 * @param offset
		 * @param index
		 * @returns {*}
		 */
		ActionScript.prototype.ActionIf = function(stack, offset, index)
		{
			let condition = stack.pop();
			switch (typeof condition) {
				case "boolean":
					break;
				case "string":
					if (!_isNaN(condition)) {
						condition = +condition;
					}
					break;
			}
			if (condition) {
				return offset;
			}
			return index;
		};

		/**
		 * @param stack
		 * @param mc
		 * @returns {undefined}
		 */
		ActionScript.prototype.ActionGetVariable = function(stack, mc)
		{
			let _this = this;
			let name = stack.pop();
			let value;
			if (name instanceof MovieClip) {
				value = name;
			} else {
				value = _this.getNativeClass(name);
				if (value === undefined) {
					value = _this.getVariable(name);
					if (value === undefined && mc) {
						value = mc.getProperty(name);
					}
				}
			}
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionSetVariable = function(stack, mc)
		{
			let value = stack.pop();
			let name = stack.pop();
			if (!this.setVariable(name, value)) {
				mc.setProperty(name, value);
			}
		};

		/**
		 * @param stack
		 * @param aScript
		 * @param mc
		 */
		ActionScript.prototype.ActionGetURL2 = function(stack, aScript, mc)
		{
			let target = stack.pop();
			let value = stack.pop();
			let LoadVariablesFlag = aScript.LoadVariablesFlag; // 0=none, 1=LoadVariables
			let LoadTargetFlag = aScript.LoadTargetFlag; // 0=web, 1=Sprite
			let SendVarsMethod = aScript.SendVarsMethod; // 0=NONE, 1=GET, 2=POST
			let method = "GET";
			if (SendVarsMethod === 2) {
				method = "POST";
			}

			let url;
			if (mc instanceof MovieClip) {
				if (value) {
					value = this.valueToString(value);
					let urls = value.split("?");
					let uLen = urls.length;
					let query = "";
					if (uLen === 1) {
						query = "?";
					}

					if (uLen > 2) {
						url = urls[0] + "?";
						url = url + urls[1];
						for (let u = 2; u < uLen; u++) {
							let params = urls[u];
							url = url + "&" + params;
						}
					} else {
						url = value;
					}

					// local variables
					if (SendVarsMethod) {
						let variables = mc.variables;
						let queryString = "";
						for (let key in variables) {
							if (!variables.hasOwnProperty(key)) {
								continue;
							}
							let val = variables[key];
							if (val === null) {
								val = "";
							}
							if (typeof val !== "string") {
								let typeText = typeof val;
								typeText = typeText.replace(/^[a-z]/g, function(str)
								{
									return str.toUpperCase();
								});
								val = "%5Btype+" + typeText + "%5D";
							}
							queryString += "&" + key + "=" + val;
						}

						if (query !== "" && queryString !== "") {
							queryString = query + queryString.slice(1);
						}
						url += queryString;
					}

					if (LoadVariablesFlag) {
						mc.loadVariables(url, target, method);
					} else if (LoadTargetFlag) {
						if (target instanceof MovieClip) {
							target.loadMovie(url, null, SendVarsMethod);
						} else {
							mc.loadMovie(url, target, SendVarsMethod);
						}
					} else {
						mc.getURL(url, target, method);
					}
				} else {
					mc.unloadMovie(target);
				}
			}
		};

		/**
		 * @param stack
		 * @param mc
		 * @returns {*}
		 */
		ActionScript.prototype.ActionGetProperty = function(stack, mc)
		{
			let index = stack.pop();
			let target = stack.pop();
			if (!_isNaN(index)) {
				index = _floor(index);
			}

			let _this = this;
			let value = _this.getVariable(index);
			if (value === undefined && mc) {
				let targetMc = mc;
				if (target) {
					if (typeof target !== "string") {
						target += "";
					}
					targetMc = mc.getDisplayObject(target);
				}
				if (targetMc instanceof MovieClip) {
					value = targetMc.getProperty(index);
				}
			}
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 * @param aScript
		 * @param mc
		 */
		ActionScript.prototype.ActionGoToFrame2 = function(stack, aScript, mc)
		{
			let SceneBiasFlag = aScript.SceneBiasFlag;
			let PlayFlag = aScript.PlayFlag; // 0=stop, 1=play
			if (SceneBiasFlag === 1) {
				let SceneBias = aScript.SceneBias;
				console.log("SceneBias", SceneBias);
			}

			let frame = stack.pop();
			if (frame && mc) {
				if (_isNaN(frame)) {
					let splitData = frame.split(":");
					if (splitData.length > 1) {
						let targetMc = mc.getDisplayObject(splitData[0]);
						if (targetMc) {
							if (_isNaN(splitData[1]))
								frame = targetMc.getLabel(splitData[1]);
							else frame = splitData[1];
						}
					} else {
						if (_isNaN(splitData[1]))
							frame = mc.getLabel(splitData[0]);
						else frame = splitData[1];
					}
				}

				if (typeof frame === "string") {
					frame |= 0;
				}

				if (typeof frame === "number" && frame > 0) {
					mc.setNextFrame(frame);
					if (PlayFlag) {
						mc.play();
					} else {
						mc.stop();
					}
				}
			}
		};

		/**
		 * @param stack
		 * @param movieClip
		 * @param mc
		 * @returns {*}
		 */
		ActionScript.prototype.ActionSetTarget2 = function(stack, movieClip, mc)
		{
			let target = stack.pop();
			if (!movieClip) {
				movieClip = mc;
			}
			return movieClip.getDisplayObject(target);
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionSetProperty = function(stack, mc)
		{
			let value = stack.pop();
			let index = stack.pop();
			let target = stack.pop();
			if (!_isNaN(index)) {
				index = _floor(index);
			}

			if (mc) {
				let targetMc = mc;
				if (target !== undefined) {
					targetMc = mc.getDisplayObject(target);
				}
				if (targetMc instanceof MovieClip) {
					targetMc.setProperty(index, value);
				}
			}
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionStartDrag = function(stack, mc)
		{
			let target = stack.pop();
			let lock = stack.pop();
			let constrain = stack.pop();
			let y2 = null;
			let x2 = null;
			let y1 = null;
			let x1 = null;
			if (constrain) {
				y2 = stack.pop();
				x2 = stack.pop();
				y1 = stack.pop();
				x1 = stack.pop();
			}

			let targetMc = mc;
			if (target instanceof MovieClip) {
				targetMc = target;
			}

			if (typeof target === "string" && target) {
				targetMc = mc.getDisplayObject(target);
			}

			if (targetMc instanceof MovieClip) {
				targetMc.startDrag(lock, x1, y1, x2, y2);
			}
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionCloneSprite = function(stack, mc)
		{
			let depth = +stack.pop();
			let target = stack.pop();
			let source = stack.pop();
			if (mc) {
				mc.duplicateMovieClip(target, source, depth);
			}
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionRemoveSprite = function(stack, mc)
		{
			let target = stack.pop();
			if (mc) {
				mc.removeMovieClip(target);
			}
		};

		/**
		 * @param mc
		 */
		ActionScript.prototype.ActionEndDrag = function(mc)
		{
			if (mc) {
				mc.stopDrag();
			}
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionGetTime = function(stack)
		{
			let now = new Date();
			stack[stack.length] = now.getTime() - StartDate.getTime();
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionRandomNumber = function(stack)
		{
			let maximum = stack.pop();
			stack[stack.length] = _floor(_random() * maximum);
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionTrace = function(stack)
		{
			let value = stack.pop();
			if (value instanceof DisplayObject && value.removeFlag) {
				value = "";
			}
			if (value && typeof value === "object") {
				if ("callee" in value) {
					value = Array.prototype.slice.call(value);
				}
				value = value.toString();
			}
			console.log("[trace] " + value);
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionFsCommand2 = function(stack, mc)
		{
			stack.pop(); // count
			let method = stack.pop();
			let now = new Date();
			switch (method.toLowerCase()) {
				case "getdateyear":
					stack[stack.length] = now.getFullYear();
					break;
				case "getdatemonth":
					stack[stack.length] = now.getMonth() + 1;
					break;
				case "getdateday":
					stack[stack.length] = now.getDate();
					break;
				case "getdateweekday":
					stack[stack.length] = now.getDay();
					break;
				case "gettimehours":
					stack[stack.length] = now.getHours();
					break;
				case "gettimeminutes":
					stack[stack.length] = now.getMinutes();
					break;
				case "gettimeseconds":
					stack[stack.length] = now.getSeconds();
					break;
				case "startvibrate":
					stack.pop();
					stack.pop();
					stack.pop();
					stack[stack.length] = -1;
					break;
				case "gettimezoneoffset":
					mc.setVariable(stack.pop(), now.toUTCString());
					mc.setVariable(stack.pop(), 0);
					break;
				case "getlocalelongdate":
					mc.setVariable(stack.pop(), now.toLocaleDateString());
					mc.setVariable(stack.pop(), 0);
					break;
				case "getlocaleshortdate":
					mc.setVariable(stack.pop(), now.toDateString());
					mc.setVariable(stack.pop(), 0);
					break;
				case "getlocaletime":
					mc.setVariable(stack.pop(), now.toLocaleTimeString());
					mc.setVariable(stack.pop(), 0);
					break;
				case "getnetworkname":
				case "getdevice":
				case "getdeviceid":
					mc.setVariable(stack.pop(), "");
					mc.setVariable(stack.pop(), -1);
					break;
				case "getlanguage":
					let language = _navigator.userLanguage ||
						_navigator.language ||
						_navigator.browserLanguage ||
						"ja-JP";
					mc.setVariable(stack.pop(), language);
					mc.setVariable(stack.pop(), 0);
					break;
				case "setsoftkeys":
					stack.pop();
					stack.pop();
					stack[stack.length] = -1;
					break;
				case "fullscreen":
					stack.pop(); // bool
					stack[stack.length] = -1;
					break;
				case "setquality":
				case "getfreestagememory":
				case "gettotalstagememory":
					stack.pop();
					stack[stack.length] = -1;
					break;
				default:
					stack[stack.length] = -1;
					break;
			}
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionCallMethod = function(stack, mc)
		{
			let _this = this;
			let method = stack.pop();
			let object = stack.pop();
			let count = +stack.pop();
			let params = [];
			if (count > 0) {
				while (count) {
					count--;
					let param = stack.pop();
					if (param && typeof param === "object" && "callee" in param) {
						param = Array.prototype.slice.call(param);
					}
					params[params.length] = param;
				}
			}

			if (typeof object === "string" && object[method] === undefined) {
				let target = _this.stringToObject(object, mc);
				if (target) {
					object = target;
				}

				if (object === "super") {
					let caller = _this.variables["this"];
					let SuperClass = _this.getSuperClass();
					if (!method && SuperClass) {
						let sc = new SuperClass();
						switch (SuperClass) {
							case MovieClip:
								let loadStage = mc.getStage();
								sc.setStage(loadStage);
								sc.setParent(mc);
								sc._extend = true;
								break;
						}

						let proto = Object.getPrototypeOf(caller);
						proto.constructor = SuperClass;
						Object.setPrototypeOf(proto, sc);
						Object.setPrototypeOf(caller, proto);
					} else {
						object = caller;
					}
				}
			}

			let value;
			if (object && method) {
				let func;
				if (typeof object === "object") {
					let variables = object.variables;
					if (variables) {
						func = variables[method];
						if (!func && variables.registerClass) {
							func = variables.registerClass[method];
						}
					}
				}

				if (!func) {
					let originMethod = _this.checkMethod(method);
					if (originMethod) {
						func = object[originMethod];
					}
				}

				if (!func) {
					func = object[method];
				}

				if (!func && object instanceof MovieClip) {
					func = object.getVariable(method);
				}

				if (!func && object instanceof Global) {
					func = window[method];
					if (func) {
						params = _this.ActionNativeFunction(params, mc);
						object = window;
					}
				}

				if (method === "call" || method === "apply") {
					func = object;
					object = params.shift();
					if (method === "apply") {
						let args = params.shift();
						params = [];
						if (args) {
							params = Array.prototype.slice.call(args);
						}
					}
				}

				if (func && typeof func === "function") {
					switch (true) {
						case object instanceof MovieClipLoader:
							if (method === "loadClip" && typeof params[1] === "string") {
								let targetStr = params[1];
								params[1] = mc.getDisplayObject(targetStr);
							}
							break;
					}
					value = func.apply(object, params);
				}

				if (!func && object instanceof Object && typeof method === "string") {
					switch (method.toLowerCase()) {
						case "registerclass":
							value = false;
							let _root = mc.getDisplayObject("_root");
							let stage = _root.getStage();
							let characterId = stage.exportAssets[params[0]];
							if (characterId) {
								stage.registerClass[characterId] = params[1];
								value = true;
							}
							break;
						case "addproperty":
							_this.addProperty(object, params);
							break;
					}
				}
			} else {
				if (!method && typeof object === "function") {
					value = object.apply(_this.variables["this"], params);
				}
			}

			stack[stack.length] = value;
		};

		/**
		 * @param target
		 * @param params
		 * @returns {boolean}
		 */
		ActionScript.prototype.addProperty = function(target, params)
		{
			let property = params[0];
			if (typeof property !== "string" || property === "") {
				return false;
			}

			let getter = params[1];
			if (!getter) {
				getter = function() {};
			}
			let setter = params[2];
			if (!setter) {
				setter = function() {};
			}

			if (typeof getter !== "function" || typeof setter !== "function") {
				return false;
			}

			Object.defineProperty(target, property,
			{
				get: getter,
				set: setter
			});

			return true;
		};

		/**
		 * @param args
		 * @param mc
		 * @returns {Array}
		 */
		ActionScript.prototype.ActionNativeFunction = function(args, mc)
		{
			let targetMc = mc;
			let params = args;
			if (args[0] instanceof MovieClip) {
				// setInterval, setTimeout
				targetMc = args.shift();
				if (args.length > 0) {
					let obj = args.shift();
					let as;
					if (typeof obj === "string") {
						as = this.getVariable(obj);
						if (typeof as !== "function") {
							as = targetMc.getVariable(obj);
						}
					}
					if (typeof as === "function") {
						let time = args.shift();
						let action = (function(script, mc, args)
						{
							return function()
							{
								script.apply(mc, args);
							};
						})(as, targetMc, args);
						params = [];
						params[params.length] = action;
						params[params.length] = time;
					} else {
						console.log("DEBUG: ", params);
						args.unshift(obj);
						params = args;
					}
				}
			}
			return params;
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionCallFunction = function(stack, mc)
		{
			let _this = this;
			let name = stack.pop();
			let count = +stack.pop();
			let params = [];
			if (count > 0) {
				while (count) {
					count--;
					let param = stack.pop();
					if (param && typeof param === "object" && "callee" in param) {
						param = Array.prototype.slice.call(param);
					}
					params[params.length] = param;
				}
			}

			if (mc) {
				let caller = mc;
				let func;
				let method = _this.checkMethod(name);
				if (method) {
					func = mc[method];
				} else {
					func = mc.variables[name];
					if (!func) {
						let registerClass = mc.variables.registerClass;
						if (registerClass && typeof registerClass === "object") {
							func = registerClass[name];
						}

						if (!func) {
							if (window[name]) {
								caller = window;
								params = _this.ActionNativeFunction(params, mc);
								func = window[name];
							} else {
								func = mc.getVariable(name);
							}
						}
					}
				}
				stack[stack.length] = (func) ? func.apply(caller, params) : undefined;
			}
		};

		/**
		 * @param stack
		 * @param aScript
		 * @param mc
		 */
		ActionScript.prototype.ActionDefineFunction = function(stack, aScript, mc)
		{
			let action = mc.createActionScript2(aScript.ActionScript, this);
			let name = aScript.FunctionName;
			if (name !== "") {
				mc.setVariable(name, action);
			} else {
				stack[stack.length] = action;
			}
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionDefineLocal = function(stack, mc)
		{
			let _this = this;
			let value = stack.pop();
			let name = stack.pop();
			if (_this.parent) {
				_this.variables[name] = value;
			} else {
				mc.setVariable(name, value);
			}
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionDefineLocal2 = function(stack, mc)
		{
			let _this = this;
			let name = stack.pop();
			if (_this.parent) {
				_this.variables[name] = undefined;
			} else {
				mc.setVariable(name, undefined);
			}
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionDelete = function(stack, mc)
		{
			let name = stack.pop();
			let object = stack.pop();

			if (typeof object === "string") {
				let target = this.stringToObject(object, mc);
				if (target) {
					object = target;
				}
			}

			if (object instanceof MovieClip) {
				object.setVariable(name, undefined);
			}
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionDelete2 = function(stack, mc)
		{
			let name = stack.pop();
			if (mc) {
				mc.setVariable(name, undefined);
			}
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionEnumerate = function(stack, mc)
		{
			let object = stack.pop();
			stack[stack.length] = null;

			if (typeof object === "string") {
				object = this.stringToObject(object, mc);
			}

			if (object instanceof Object) {
				let name;
				switch (true) {
					case object instanceof DisplayObject:
						let container = object.getTags();
						let stage = object.getStage();
						for (name in container) {
							if (!container.hasOwnProperty(name)) {
								continue;
							}
							let id = container[name];
							let instance = stage.getInstance(id);
							let prop = "instance" + id;
							if (instance.getName()) {
								prop = instance.getName();
							}
							stack[stack.length] = prop;
						}
						let variables = object.variables;
						for (name in variables) {
							if (!variables.hasOwnProperty(name)) {
								continue;
							}
							stack[stack.length] = name;
						}
						break;
					default:
						for (name in object) {
							if (!object.hasOwnProperty(name)) {
								continue;
							}
							stack[stack.length] = name;
						}
						break;
				}
			}
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionEquals2 = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			let A = a;
			let B = b;
			if (a instanceof MovieClip) {
				A = a.getTarget();
			}
			if (b instanceof MovieClip) {
				B = b.getTarget();
			}
			stack[stack.length] = (B == A);
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionGetMember = function(stack, mc)
		{
			let _this = this;
			let property;
			let name = stack.pop();
			let object = stack.pop();
			if (typeof object === "string") {
				let target = _this.stringToObject(object, mc);
				if (target) {
					object = target;
				}
			}

			if (object) {
				switch (true) {
					default:
						property = object[name];
						break;
					case object instanceof DisplayObject:
					case object instanceof Global:
						if (!object._extend) {
							property = object.getProperty(name, false);
							if (property === undefined &&
								typeof name === "string" &&
								name.substr(0, 8) === "instance"
							) {
								let stage = object.getStage();
								let id = name.split("instance")[1];
								property = stage.getInstance(id);
							}

							if (property === undefined && _this.checkMethod(name)) {
								property = object[name];
							}

						} else {
							property = object[name];
						}
						break;
					case object instanceof Element && name === "childNodes":
						let childNodes = object[name];
						let length = childNodes.length;
						property = [];
						if (length) {
							for (let i = 0; i < length; i++) {
								let node = childNodes[i];
								if (node.nodeType !== 1) {
									continue;
								}
								property[property.length] = node;
							}
						}
						break;
					case object instanceof window.NamedNodeMap:
						let item = object.getNamedItem(name);
						property = item.value;
						break;
				}
			}
			stack[stack.length] = property;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionInitArray = function(stack)
		{
			let number = stack.pop();
			let array = [];
			if (number > 0) {
				while (number--) {
					array[array.length] = stack.pop();
				}
			}
			stack[stack.length] = array;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionInitObject = function(stack)
		{
			let number = stack.pop();
			let object = {};
			if (number > 0) {
				while (number--) {
					let value = stack.pop();
					let property = stack.pop();
					object[property] = value;
				}
			}
			stack[stack.length] = object;
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionNewMethod = function(stack, mc)
		{
			let method = stack.pop();
			let object = stack.pop();
			let number = stack.pop();
			let params = [];
			if (number > 0) {
				while (number--) {
					let param = stack.pop();
					if (param && typeof param === "object" && "callee" in param) {
						param = Array.prototype.slice.call(param);
					}
					params[params.length] = param;
				}
			}

			let constructor;
			if (method === "") {
				constructor = object.apply(object, params);
			}
			if (!constructor && method in object) {
				constructor = this.CreateNewActionScript(object[method], mc, params);
			}
			if (!constructor && method in window) {
				if (method === "CSSStyleDeclaration") {
					constructor = undefined;
				} else {
					constructor = this.CreateNewActionScript(window[method], mc, params);
				}
			}
			stack[stack.length] = constructor;
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionNewObject = function(stack, mc)
		{
			let object = stack.pop();
			let numArgs = +stack.pop();
			let params = [];
			if (numArgs > 0) {
				while (numArgs) {
					numArgs--;
					let param = stack.pop();
					if (param && typeof param === "object" && "callee" in param) {
						param = Array.prototype.slice.call(param);
					}
					params[params.length] = param;
				}
			}

			let obj = {};
			if (object in window) {
				params.unshift(window[object]);
				obj = new(Function.prototype.bind.apply(window[object], params))();
			} else {
				switch (object) {
					case "Object":
						obj = {};
						break;
					case "MovieClip":
						obj = new MovieClip();
						let stage = mc.getStage();
						obj.setStage(stage);
						obj.setParent(mc);
						break;
					case "Sound":
						obj = new Sound(mc);
						obj.movieClip = mc;
						break;
					case "XML":
						obj = new Xml();
						break;
					case "LoadVars":
						obj = new LoadVars();
						break;
					case "Color":
						obj = new Color(params[0]);
						break;
					case "TextFormat":
						obj = new TextFormat();
						break;
					case "MovieClipLoader":
						obj = new MovieClipLoader();
						break;
					default:
						if (mc) {
							let _this = this;
							let func = _this.getVariable(object) || mc.getVariable(object);
							obj = _this.CreateNewActionScript(func, mc, params);
						}
						break;
				}
			}
			stack[stack.length] = obj;
		};

		/**
		 * @param name
		 * @returns {*}
		 */
		ActionScript.prototype.getNativeClass = function(name)
		{
			let value;
			switch (name) {
				case "MovieClip":
					value = MovieClip;
					break;
				case "Sprite":
					value = Sprite;
					break;
				case "SimpleButton":
					value = SimpleButton;
					break;
				case "TextField":
					value = TextField;
					break;
				case "Shape":
					value = Shape;
					break;
				case "Sound":
					value = Sound;
					break;
				case "XML":
					value = Xml;
					break;
				case "LoadVars":
					value = LoadVars;
					break;
				case "Color":
					value = Color;
					break;
				case "TextFormat":
					value = TextFormat;
					break;
				case "MovieClipLoader":
					value = MovieClipLoader;
					break;
			}
			return value;
		};

		/**
		 * @param Constr
		 * @param mc
		 * @param params
		 * @returns {*}
		 */
		ActionScript.prototype.CreateNewActionScript = function(Constr, mc, params)
		{
			if (Constr) {
				params.unshift(Constr);
				return new(Function.prototype.bind.apply(Constr, params))();
			}
			return undefined;
		};

		/**
		 * @param stack
		 * @param mc
		 */
		ActionScript.prototype.ActionSetMember = function(stack, mc)
		{
			let value = stack.pop();
			let name = stack.pop();
			let object = stack.pop();

			if (object) {
				if (typeof object === "string") {
					let target = this.stringToObject(object, mc);
					if (target) {
						object = target;
					}
				}

				if (typeof object === "object" || typeof object === "function") {
					switch (true) {
						default:
						case object === MovieClip.prototype:
						case object === TextField.prototype:
						case object === SimpleButton.prototype:
						case object === Sprite.prototype:
						case object === Shape.prototype:
							object[name] = value;
							break;
						case object instanceof DisplayObject:
						case object instanceof Global:
							if (!object._extend) {
								object.setProperty(name, value, false);
							} else {
								object[name] = value;
							}
							break;
					}
				}
			}
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionTargetPath = function(stack)
		{
			let object = stack.pop();
			let path = null;
			if (object instanceof MovieClip) {
				path = object.getName();
				if (path !== null) {
					while (true) {
						let parent = object.getParent();
						if (parent === null) {
							path = "/" + path;
							break;
						}

						let name = parent.getName();
						if (name === null) {
							path = null;
							break;
						}

						path = name + "/" + path;
					}
				}
			}
			stack[stack.length] = path;
		};

		/**
		 * @param stack
		 * @param size
		 * @param mc
		 * @returns {*}
		 */
		ActionScript.prototype.ActionWith = function(stack, size, mc)
		{
			let object = mc;
			if (size) {
				object = stack.pop();
			}
			return object;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionToNumber = function(stack)
		{
			let object = +stack.pop();
			stack[stack.length] = object;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionToString = function(stack)
		{
			let object = stack.pop();
			stack[stack.length] = this.valueToString(object);
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionTypeOf = function(stack)
		{
			let object = stack.pop();
			let str = "";
			switch (true) {
				case object instanceof MovieClip:
					str = "movieclip";
					break;
				default:
					str = typeof object;
					break;
			}
			stack[stack.length] = str;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionAdd2 = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			stack[stack.length] = b + a;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionLess2 = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			stack[stack.length] = (b < a);
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionModulo = function(stack)
		{
			let y = stack.pop();
			let x = stack.pop();
			stack[stack.length] = x % y;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionBitAnd = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			stack[stack.length] = b & a;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionBitLShift = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			stack[stack.length] = b << a;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionBitOr = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			stack[stack.length] = b | a;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionBitRShift = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			stack[stack.length] = b >> a;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionBitURShift = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			stack[stack.length] = b >> a;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionBitXor = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			stack[stack.length] = a ^ b;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionDecrement = function(stack)
		{
			let value = +stack.pop();
			value--;
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionIncrement = function(stack)
		{
			let value = +stack.pop();
			if (_isNaN(value)) value = 0;
			value++;
			stack[stack.length] = value;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionPushDuplicate = function(stack)
		{
			let length = stack.length;
			stack[length] = stack[length - 1];
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionStackSwap = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			stack[stack.length] = a;
			stack[stack.length] = b;
		};

		/**
		 * @param stack
		 * @param number
		 */
		ActionScript.prototype.ActionStoreRegister = function(stack, number)
		{
			this.params[number] = stack[stack.length - 1];
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionInstanceOf = function(stack)
		{
			let constr = stack.pop();
			let object = stack.pop();
			stack[stack.length] = (object instanceof constr);
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionStrictEquals = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			stack[stack.length] = (b === a);
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionGreater = function(stack)
		{
			let a = stack.pop();
			let b = stack.pop();
			stack[stack.length] = (b > a);
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionExtends = function(stack)
		{
			let SuperClass = stack.pop();
			let SubClass = stack.pop();
			if (SuperClass && SubClass) {
				this.superClass = SuperClass;
			}
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionCastOp = function(stack)
		{
			let object = stack.pop();
			let func = stack.pop();
			stack[stack.length] = (typeof func === "function" &&
				object instanceof func.prototype.constructor) ? object : null;
		};

		/**
		 * @param stack
		 */
		ActionScript.prototype.ActionImplementsOp = function(stack)
		{
			let func = stack.pop();
			let count = stack.pop();
			let params = [];
			if (count > 0) {
				while (count--) {
					params[params.length] = stack.pop();
				}
			}
			stack[stack.length] = null;
		};

		/**
		 * @param script
		 * @param mc
		 */
		ActionScript.prototype.ActionTry = function(script, mc)
		{

			try {
				script.try.apply(mc);
			} catch (e) {
				if (script.CatchBlockFlag) {
					script.catch.apply(mc, [e]);
				}
			} finally {
				if (script.FinallyBlockFlag) {
					script.finally.apply(mc);
				}
			}
		};

		/**
		 * ActionThrow
		 */
		ActionScript.prototype.ActionThrow = function(stack)
		{
			let value = stack.pop();
			throw value.message;
		};


		/**
		 *
		 * @constructor
		 */
		let BitmapFilter = function() {};

		/**
		 * @param color
		 * @param data
		 * @returns {{R: number, G: number, B: number, A: number}}
		 */
		BitmapFilter.prototype.generateColorTransform = function(color, data)
		{
			return {
				R: _max(0, _min((color.R * data[0]) + data[4], 255)) | 0,
				G: _max(0, _min((color.G * data[1]) + data[5], 255)) | 0,
				B: _max(0, _min((color.B * data[2]) + data[6], 255)) | 0,
				A: _max(0, _min((color.A * 255 * data[3]) + data[7], 255)) / 255
			};
		};

		/**
		 * @param int
		 * @param alpha
		 * @returns {{R: number, G: number, B: number, A: number}}
		 */
		BitmapFilter.prototype.intToRGBA = function(int, alpha)
		{
			alpha = alpha || 100;
			return {
				R: (int & 0xff0000) >> 16,
				G: (int & 0x00ff00) >> 8,
				B: (int & 0x0000ff),
				A: (alpha / 100)
			};
		};

		/**
		 * @param inner
		 * @param knockout
		 * @param hideObject
		 * @returns {*}
		 */
		BitmapFilter.prototype.filterOperation = function(inner, knockout, hideObject)
		{
			let operation = "source-over";
			if (knockout === true) {
				if (inner) {
					operation = "source-in";
				} else {
					operation = "source-out";
				}
			} else {
				if (hideObject === true) {
					if (inner) {
						operation = "source-in";
					} else {
						operation = "copy";
					}
				} else {
					if (inner) {
						operation = "source-atop";
					} else {
						operation = "destination-over";
					}
				}
			}
			return operation;
		};

		/**
		 * @param ctx
		 * @param color
		 * @param inner
		 * @param strength
		 * @returns {*}
		 */
		BitmapFilter.prototype.coatOfColor = function(ctx, color, inner, strength)
		{
			let canvas = ctx.canvas;
			let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			let i = 0;
			let pxData = imgData.data;
			let R = color.R;
			let G = color.G;
			let B = color.B;
			let length = pxData.length;
			for (; i < length; i += 4) {
				let aKey = i + 3;
				let alpha = pxData[aKey];
				if (!inner) {
					if (alpha !== 0) {
						pxData[i] = R | 0;
						pxData[i + 1] = G | 0;
						pxData[i + 2] = B | 0;
						pxData[aKey] = alpha | 0;
					}
				} else {
					if (alpha !== 255) {
						pxData[i] = R | 0;
						pxData[i + 1] = G | 0;
						pxData[i + 2] = B | 0;
						pxData[aKey] = 255 - (alpha | 0);
					}
				}
			}

			ctx.putImageData(imgData, 0, 0);
			if (strength > 0) {
				for (i = 1; i < strength; i++) {
					ctx.drawImage(ctx.canvas, 0, 0);
				}
			}
			return ctx;
		};

		/**
		 * clone
		 */
		BitmapFilter.prototype.clone = function()
		{
			let _this = this;
			let args = [];
			for (let prop in _this) {
				if (!_this.hasOwnProperty(prop)) {
					continue;
				}
				args[args.length] = _this[prop];
			}

			let type = _this.filterId;
			let filter = _this;
			switch (type) {
				case 0: // DropShadowFilter
					filter = new(Function.prototype.bind.apply(DropShadowFilter, args))();
					break;
				case 1: // BlurFilter
					filter = new(Function.prototype.bind.apply(BlurFilter, args))();
					break;
				case 2: // GlowFilter
					filter = new(Function.prototype.bind.apply(GlowFilter, args))();
					break;
				case 3: // BevelFilter
					filter = new(Function.prototype.bind.apply(BevelFilter, args))();
					break;
				case 4: // GradientGlowFilter
					filter = new(Function.prototype.bind.apply(GradientGlowFilter, args))();
					break;
				case 5: // ConvolutionFilter
					filter = new(Function.prototype.bind.apply(ConvolutionFilter, args))();
					break;
				case 6: // ColorMatrixFilter
					filter = new(Function.prototype.bind.apply(ColorMatrixFilter, args))();
					break;
				case 7: // GradientBevelFilter
					filter = new(Function.prototype.bind.apply(GradientBevelFilter, args))();
					break;
			}
			return filter;
		};

		/**
		 * @param rgb
		 * @returns {Number}
		 */
		BitmapFilter.prototype.toColorInt = function(rgb)
		{
			if (typeof rgb === "string") {
				let canvas = cacheStore.getCanvas();
				canvas.width = 1;
				canvas.height = 1;
				let ctx = canvas.getContext("2d");
				ctx.fillStyle = rgb;
				rgb = "0x" + ctx.fillStyle.substr(1);
				cacheStore.destroy(ctx);
			}
			return rgb;
		};

		/**
		 * @constructor
		 */
		let BlurFilter = function()
		{
			let _this = this;
			BitmapFilter.call(_this);

			_this.filterId = 1;
			_this.blurX = 4;
			_this.blurY = 4;
			_this.quality = 1;

			let arg = arguments;
			let blurX = arg[0] | 0;
			if (!_isNaN(blurX) && 0 <= blurX && 255 >= blurX) {
				_this.blurX = blurX;
			}

			let blurY = arg[1] | 0;
			if (!_isNaN(blurY) && 0 <= blurY && 255 >= blurY) {
				_this.blurY = blurY;
			}

			let quality = arg[2] | 0;
			if (!_isNaN(quality) && 1 <= quality && 15 >= quality) {
				_this.quality = quality;
			}
		};

		/**
		 * extends
		 * @type {BitmapFilter}
		 */
		BlurFilter.prototype = Object.create(BitmapFilter.prototype);
		BlurFilter.prototype.constructor = BlurFilter;

		/**
		 * @param cache
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @returns {*}
		 */
		BlurFilter.prototype.render = function(cache, matrix, colorTransform, stage)
		{
			let cacheCanvas = cache.canvas;
			let canvas = cacheStore.getCanvas();
			canvas.width = cacheCanvas.width;
			canvas.height = cacheCanvas.height;
			let ctx = canvas.getContext("2d");
			ctx.drawImage(cacheCanvas, 0, 0);
			ctx._offsetX = cache._offsetX;
			ctx._offsetY = cache._offsetY;
			return this.executeFilter(ctx, stage);
		};

		/**
		 * @param ctx
		 * @param stage
		 * @returns {*}
		 */
		BlurFilter.prototype.executeFilter = function(ctx, stage)
		{
			let _this = this;

			let _blurX = _this.blurX;
			let _blurY = _this.blurY;
			if (_blurX === 0 && _blurY === 0) {
				return ctx;
			}

			if (_blurX === 0) {
				_blurX = 4;
			}

			if (_blurY === 0) {
				_blurY = 4;
			}

			let _quality = _this.quality;
			let scale = stage.getScale();

			let STEP = [0.5, 1.05, 1.35, 1.55, 1.75, 1.9, 2, 2.1, 2.2, 2.3, 2.5, 3, 3, 3.5, 3.5];
			let stepNo = STEP[_quality - 1];
			let blurX = _ceil(_blurX * stepNo * scale * devicePixelRatio);
			let blurY = _ceil(_blurY * stepNo * scale * devicePixelRatio);

			let canvas = ctx.canvas;
			let width = _ceil(canvas.width + (blurX * 2) + 1);
			let height = _ceil(canvas.height + (blurY * 2) + 1);

			let blurCanvas = cacheStore.getCanvas();
			blurCanvas.width = width;
			blurCanvas.height = height;
			let blurCtx = blurCanvas.getContext("2d");
			let offsetX = blurX;
			let offsetY = blurY;

			blurCtx._offsetX = blurX + ctx._offsetX;
			blurCtx._offsetY = blurY + ctx._offsetY;
			blurCtx.drawImage(canvas, offsetX, offsetY);

			let imgData = blurCtx.getImageData(0, 0, width, height);
			let px = imgData.data;

			let radiusX = (offsetX) >> 1;
			let radiusY = (offsetY) >> 1;

			let MUL = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1];

			let SHG = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9];

			let mtx = MUL[radiusX];
			let stx = SHG[radiusX];
			let mty = MUL[radiusY];
			let sty = SHG[radiusY];

			let x = 0;
			let y = 0;
			let p = 0;
			let yp = 0;
			let yi = 0;
			let yw = 0;
			let r = 0;
			let g = 0;
			let b = 0;
			let a = 0;
			let pr = 0;
			let pg = 0;
			let pb = 0;
			let pa = 0;

			let divx = radiusX + radiusX + 1;
			let divy = radiusY + radiusY + 1;
			let w = imgData.width;
			let h = imgData.height;

			let w1 = w - 1;
			let h1 = h - 1;
			let rxp1 = radiusX + 1;
			let ryp1 = radiusY + 1;

			let ssx = {r: 0, b: 0, g: 0, a: 0};
			let sx = ssx;
			for (let i = 1; i < divx; i++) {
				sx = sx.n = {r: 0, b: 0, g: 0, a: 0};
			}
			sx.n = ssx;

			let ssy = {r: 0, b: 0, g: 0, a: 0};
			let sy = ssy;
			for (let i = 1; i < divy; i++) {
				sy = sy.n = {r: 0, b: 0, g: 0, a: 0};
			}
			sy.n = ssy;

			let si = null;
			while (_quality-- > 0) {

				yw = yi = 0;
				let ms = mtx | 0;
				let ss = stx | 0;
				for (y = h; --y > -1;) {
					pr = px[yi];
					pg = px[yi + 1];
					pb = px[yi + 2];
					pa = px[yi + 3];
					r = rxp1 * pr;
					g = rxp1 * pg;
					b = rxp1 * pb;
					a = rxp1 * pa;

					sx = ssx;

					for (let i = rxp1; --i > -1;) {
						sx.r = pr;
						sx.g = pg;
						sx.b = pb;
						sx.a = pa;
						sx = sx.n;
					}

					for (let i = 1; i < rxp1; i++) {
						p = (yi + ((w1 < i ? w1 : i) << 2)) | 0;
						r += (sx.r = px[p]);
						g += (sx.g = px[p + 1]);
						b += (sx.b = px[p + 2]);
						a += (sx.a = px[p + 3]);
						sx = sx.n;
					}

					si = ssx;
					for (x = 0; x < w; x++) {
						px[yi++] = (r * ms) >>> ss;
						px[yi++] = (g * ms) >>> ss;
						px[yi++] = (b * ms) >>> ss;
						px[yi++] = (a * ms) >>> ss;

						p = ((yw + ((p = x + radiusX + 1) < w1 ? p : w1)) << 2);

						r -= si.r - (si.r = px[p]);
						g -= si.g - (si.g = px[p + 1]);
						b -= si.b - (si.b = px[p + 2]);
						a -= si.a - (si.a = px[p + 3]);

						si = si.n;

					}
					yw += w;
				}

				ms = mty;
				ss = sty;
				for (x = 0; x < w; x++) {
					yi = (x << 2) | 0;

					r = (ryp1 * (pr = px[yi])) | 0;
					g = (ryp1 * (pg = px[(yi + 1) | 0])) | 0;
					b = (ryp1 * (pb = px[(yi + 2) | 0])) | 0;
					a = (ryp1 * (pa = px[(yi + 3) | 0])) | 0;

					sy = ssy;
					for (let i = 0; i < ryp1; i++) {
						sy.r = pr;
						sy.g = pg;
						sy.b = pb;
						sy.a = pa;
						sy = sy.n;
					}

					yp = w;

					for (let i = 1; i <= radiusY; i++) {
						yi = (yp + x) << 2;

						r += (sy.r = px[yi]);
						g += (sy.g = px[yi + 1]);
						b += (sy.b = px[yi + 2]);
						a += (sy.a = px[yi + 3]);

						sy = sy.n;
						if (i < h1) {
							yp += w;
						}
					}

					yi = x;
					si = ssy;
					if (_quality > 0) {
						for (y = 0; y < h; y++) {
							p = yi << 2;
							px[p + 3] = pa = (a * ms) >>> ss;
							if (pa > 0) {
								px[p] = ((r * ms) >>> ss);
								px[p + 1] = ((g * ms) >>> ss);
								px[p + 2] = ((b * ms) >>> ss);
							} else {
								px[p] = px[p + 1] = px[p + 2] = 0;
							}

							p = (x + (((p = y + ryp1) < h1 ? p : h1) * w)) << 2;

							r -= si.r - (si.r = px[p]);
							g -= si.g - (si.g = px[p + 1]);
							b -= si.b - (si.b = px[p + 2]);
							a -= si.a - (si.a = px[p + 3]);

							si = si.n;

							yi += w;
						}
					} else {
						for (y = 0; y < h; y++) {
							p = yi << 2;
							px[p + 3] = pa = (a * ms) >>> ss;
							if (pa > 0) {
								pa = 255 / pa;
								px[p] = ((r * ms) >>> ss) * pa;
								px[p + 1] = ((g * ms) >>> ss) * pa;
								px[p + 2] = ((b * ms) >>> ss) * pa;
							} else {
								px[p] = px[p + 1] = px[p + 2] = 0;
							}

							p = (x + (((p = y + ryp1) < h1 ? p : h1) * w)) << 2;

							r -= si.r - (si.r = px[p]);
							g -= si.g - (si.g = px[p + 1]);
							b -= si.b - (si.b = px[p + 2]);
							a -= si.a - (si.a = px[p + 3]);

							si = si.n;

							yi += w;
						}
					}
				}
			}

			blurCtx.putImageData(imgData, 0, 0);
			cacheStore.destroy(ctx);

			return blurCtx;
		};

		/**
		 * @constructor
		 */
		let DropShadowFilter = function()
		{
			let _this = this;
			BitmapFilter.call(_this);

			_this.filterId = 0;
			_this.distance = 4;
			_this.angle = 45;
			_this.color = 0;
			_this.alpha = 1;
			_this.blurX = 4;
			_this.blurY = 4;
			_this.strength = 1;
			_this.quality = 1;
			_this.inner = false;
			_this.knockout = false;
			_this.hideObject = false;

			let arg = arguments;
			let distance = arg[0] | 0;
			if (!_isNaN(distance)) {
				_this.distance = distance;
			}

			let angle = +arg[1];
			if (!_isNaN(angle) && 0 <= angle && 360 >= angle) {
				_this.angle = angle;
			}

			let color = _this.toColorInt(arg[2]);
			if (!_isNaN(color)) {
				_this.color = color;
			}

			let alpha = +arg[3];
			if (!_isNaN(alpha) && 0 <= alpha && 1 >= alpha) {
				_this.alpha = alpha;
			}

			let blurX = arg[4] | 0;
			if (!_isNaN(blurX) && 0 <= blurX && 255 >= blurX) {
				_this.blurX = blurX;
			}

			let blurY = arg[5] | 0;
			if (!_isNaN(blurY) && 0 <= blurY && 255 >= blurY) {
				_this.blurY = blurY;
			}

			let strength = +arg[6];
			if (!_isNaN(strength) && 0 <= strength && 255 >= strength) {
				_this.strength = strength;
			}

			let quality = arg[7] | 0;
			if (!_isNaN(quality) && 1 <= quality && 15 >= quality) {
				_this.quality = quality;
			}

			let inner = arg[8];
			if (typeof inner === "boolean") {
				_this.inner = inner;
			}

			let knockout = arg[9];
			if (typeof knockout === "boolean") {
				_this.knockout = knockout;
			}

			let hideObject = arg[10];
			if (typeof hideObject === "boolean") {
				_this.hideObject = hideObject;
			}
		};

		/**
		 * extends
		 * @type {BitmapFilter}
		 */
		DropShadowFilter.prototype = Object.create(BitmapFilter.prototype);
		DropShadowFilter.prototype.constructor = DropShadowFilter;

		/**
		 * @param cache
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 */
		DropShadowFilter.prototype.render = function(cache, matrix, colorTransform, stage)
		{
			let _this = this;
			let strength = _this.strength;
			if (strength === 0) {
				return cache;
			}

			let quality = _this.quality;
			let inner = _this.inner;
			let r = _this.angle * _PI / 180;
			let blurX = _this.blurX;
			let blurY = _this.blurY;

			// blur
			let blurFilter = new BlurFilter(blurX, blurY, quality);
			let ctx = blurFilter.render(cache, matrix, colorTransform, stage);

			// dropShadow
			let intColor = _this.toColorInt(_this.color);
			let filterColor = _this.intToRGBA(intColor);
			let color = _this.generateColorTransform(filterColor, colorTransform);
			ctx = _this.coatOfColor(ctx, color, inner, strength);

			// synthesis
			let cacheOffsetX = cache._offsetX;
			let cacheOffsetY = cache._offsetY;
			let _offsetX = ctx._offsetX;
			let _offsetY = ctx._offsetY;

			let canvas = ctx.canvas;
			let synCanvas = cacheStore.getCanvas();
			let width = canvas.width + cacheOffsetX;
			let height = canvas.height + cacheOffsetY;
			let ox = 0;
			let oy = 0;
			let dx = 0;
			let dy = 0;

			let distance = _this.distance;
			let scale = stage.getScale();
			let x = _ceil(_cos(r) * distance * scale);
			let y = _ceil(_sin(r) * distance * scale);

			if (x !== 0) {
				width += _abs(x);
				if (x < 0) {
					ox -= x;
				} else {
					dx = x;
				}
			}

			if (y !== 0) {
				height += _abs(y);
				if (y < 0) {
					oy -= y;
				} else {
					dy = y;
				}
			}

			synCanvas.width = width;
			synCanvas.height = height;
			let synCtx = synCanvas.getContext("2d");
			synCtx.drawImage(cache.canvas, _offsetX + ox, _offsetY + oy);
			synCtx.globalAlpha = _this.alpha;
			if (strength < 1) {
				synCtx.globalAlpha *= strength;
			}

			let knockout = _this.knockout;
			let hideObject = _this.hideObject;
			synCtx.globalCompositeOperation = _this.filterOperation(inner, knockout, hideObject);
			synCtx.drawImage(canvas, cacheOffsetX + dx, cacheOffsetY + dy);

			synCtx._offsetX = cacheOffsetX + _offsetX;
			synCtx._offsetY = cacheOffsetY + _offsetY;

			cacheStore.destroy(ctx);

			return synCtx;
		};

		/**
		 * @constructor
		 */
		let GlowFilter = function()
		{
			let _this = this;
			BitmapFilter.call(_this);

			_this.filterId = 2;
			_this.color = 0xFF0000;
			_this.alpha = 1;
			_this.blurX = 6;
			_this.blurY = 6;
			_this.strength = 2;
			_this.quality = 1;
			_this.inner = false;
			_this.knockout = false;

			let arg = arguments;
			let color = _this.toColorInt(arg[0]);
			if (!_isNaN(color)) {
				_this.color = color;
			}

			let alpha = +arg[1];
			if (!_isNaN(alpha) && 0 <= alpha && 1 >= alpha) {
				_this.alpha = alpha;
			}

			let blurX = arg[2] | 0;
			if (!_isNaN(blurX) && 0 <= blurX && 255 >= blurX) {
				_this.blurX = blurX;
			}

			let blurY = arg[3] | 0;
			if (!_isNaN(blurY) && 0 <= blurY && 255 >= blurY) {
				_this.blurY = blurY;
			}

			let strength = +arg[4];
			if (!_isNaN(strength) && 0 <= strength && 255 >= strength) {
				_this.strength = strength;
			}

			let quality = arg[5] | 0;
			if (!_isNaN(quality) && 1 <= quality && 15 >= quality) {
				_this.quality = quality;
			}

			let inner = arg[6];
			if (typeof inner === "boolean") {
				_this.inner = inner;
			}

			let knockout = arg[7];
			if (typeof knockout === "boolean") {
				_this.knockout = knockout;
			}
		};

		/**
		 * extends
		 * @type {BitmapFilter}
		 */
		GlowFilter.prototype = Object.create(BitmapFilter.prototype);
		GlowFilter.prototype.constructor = GlowFilter;

		/**
		 * @param cache
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @returns {*}
		 */
		GlowFilter.prototype.render = function(cache, matrix, colorTransform, stage)
		{
			let _this = this;
			let strength = _this.strength;
			if (strength === 0) {
				return cache;
			}

			let inner = _this.inner;
			let blurX = _this.blurX;
			let blurY = _this.blurY;

			let blurFilter = new BlurFilter(blurX, blurY, _this.quality);
			let ctx = blurFilter.render(cache, matrix, colorTransform, stage);

			let width = ctx.canvas.width + cache._offsetX;
			let height = ctx.canvas.height + cache._offsetY;

			let intColor = _this.toColorInt(_this.color);
			let filterColor = _this.intToRGBA(intColor);
			let color = _this.generateColorTransform(filterColor, colorTransform);
			ctx = _this.coatOfColor(ctx, color, inner, strength);

			let synCanvas = cacheStore.getCanvas();
			synCanvas.width = width;
			synCanvas.height = height;
			let synCtx = synCanvas.getContext("2d");

			synCtx.drawImage(cache.canvas, ctx._offsetX, ctx._offsetY);
			synCtx.globalAlpha = _this.alpha;
			if (strength < 1) {
				synCtx.globalAlpha *= strength;
			}

			let operation = "source-over";
			if (_this.knockout) {
				if (inner) {
					operation = "source-in";
				} else {
					operation = "source-out";
				}
			} else {
				if (inner) {
					operation = "source-atop";
				} else {
					operation = "destination-over";
				}
			}

			synCtx.globalCompositeOperation = operation;
			synCtx.drawImage(ctx.canvas, cache._offsetX, cache._offsetY);
			synCtx._offsetX = cache._offsetX + ctx._offsetX;
			synCtx._offsetY = cache._offsetY + ctx._offsetY;

			cacheStore.destroy(ctx);

			return synCtx;
		};

		/**
		 * @constructor
		 */
		let BevelFilter = function()
		{
			let _this = this;
			BitmapFilter.call(_this);

			_this.filterId = 3;
			_this.distance = 4;
			_this.angle = 45;
			_this.highlightColor = 0xffffff;
			_this.highlightAlpha = 1;
			_this.shadowColor = 0x000000;
			_this.shadowAlpha = 1;
			_this.blurX = 4;
			_this.blurY = 4;
			_this.strength = 1;
			_this.quality = 1;
			_this.type = "inner";
			_this.knockout = false;

			let arg = arguments;

			let distance = arg[0] | 0;
			if (!_isNaN(distance)) {
				_this.distance = distance;
			}

			let angle = +arg[1];
			if (!_isNaN(angle) && 0 <= angle && 360 >= angle) {
				_this.angle = angle;
			}

			let highlightColor = _this.toColorInt(arg[2]);
			if (!_isNaN(highlightColor)) {
				_this.highlightColor = highlightColor;
			}

			let highlightAlpha = +arg[3];
			if (!_isNaN(highlightAlpha) && 0 <= highlightAlpha && 1 >= highlightAlpha) {
				_this.highlightAlpha = highlightAlpha;
			}

			let shadowColor = _this.toColorInt(arg[4]);
			if (!_isNaN(shadowColor)) {
				_this.shadowColor = shadowColor;
			}

			let shadowAlpha = +arg[5];
			if (!_isNaN(shadowAlpha) && 0 <= shadowAlpha && 1 >= shadowAlpha) {
				_this.shadowAlpha = shadowAlpha;
			}

			let blurX = arg[6] | 0;
			if (!_isNaN(blurX) && 0 <= blurX && 255 >= blurX) {
				_this.blurX = blurX;
			}

			let blurY = arg[7] | 0;
			if (!_isNaN(blurY) && 0 <= blurY && 255 >= blurY) {
				_this.blurY = blurY;
			}

			let strength = +arg[8];
			if (!_isNaN(strength) && 0 <= strength && 255 >= strength) {
				_this.strength = strength;
			}

			let quality = arg[9] | 0;
			if (!_isNaN(quality) && 1 <= quality && 15 >= quality) {
				_this.quality = quality;
			}

			let type = arg[10];
			if (typeof type === "string") {
				_this.type = type;
			}

			let knockout = arg[11];
			if (typeof knockout === "boolean") {
				_this.knockout = knockout;
			}
		};

		/**
		 * extends
		 * @type {BitmapFilter}
		 */
		BevelFilter.prototype = Object.create(BitmapFilter.prototype);
		BevelFilter.prototype.constructor = BevelFilter;

		/**
		 * @param cache
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @returns {*}
		 */
		BevelFilter.prototype.render = function(cache, matrix, colorTransform, stage)
		{
			let _this = this;
			let distance = _this.distance;
			let angle = _this.angle;
			let shadowColor = _this.shadowColor;
			let shadowAlpha = _this.shadowAlpha;
			let highlightColor = _this.highlightColor;
			let highlightAlpha = _this.highlightAlpha;
			let blurX = _this.blurX;
			let blurY = _this.blurY;
			let strength = _this.strength;
			let quality = _this.quality;
			let knockout = _this.knockout;
			let r = angle * _PI / 180;
			let filterColor, color;
			let type = _this.type;

			// blur
			let blurFilter = new BlurFilter(blurX, blurY, quality);
			let ctx = blurFilter.render(cache, matrix, colorTransform, stage);
			let canvas = ctx.canvas;
			let _offsetX = ctx._offsetX;
			let _offsetY = ctx._offsetY;

			// shadow
			let shadowCanvas = cacheStore.getCanvas();
			shadowCanvas.width = canvas.width;
			shadowCanvas.height = canvas.height;
			let shadowCtx = shadowCanvas.getContext("2d");
			shadowCtx.drawImage(canvas, 0, 0);
			let intShadowColor = _this.toColorInt(shadowColor);
			filterColor = _this.intToRGBA(intShadowColor);
			color = _this.generateColorTransform(filterColor, colorTransform);
			shadowCtx = _this.coatOfColor(shadowCtx, color, false, strength);

			// shadow
			let highlightCanvas = cacheStore.getCanvas();
			highlightCanvas.width = canvas.width;
			highlightCanvas.height = canvas.height;
			let highlightCtx = highlightCanvas.getContext("2d");
			highlightCtx.drawImage(canvas, 0, 0);
			let intHighlightColor = _this.toColorInt(highlightColor);
			filterColor = _this.intToRGBA(intHighlightColor);
			color = _this.generateColorTransform(filterColor, colorTransform);
			highlightCtx = _this.coatOfColor(highlightCtx, color, false, strength);

			let isInner = (type === "inner" || type === "full");
			let isOuter = (type === "outer" || type === "full");

			let cacheOffsetX = cache._offsetX;
			let cacheOffsetY = cache._offsetY;
			let synCanvas = cacheStore.getCanvas();
			let width = canvas.width + cacheOffsetX;
			let height = canvas.height + cacheOffsetY;
			let ox = 0;
			let oy = 0;

			let scale = stage.getScale();
			let x = _ceil(_cos(r) * distance * scale);
			let y = _ceil(_sin(r) * distance * scale);

			if (x !== 0) {
				width += _abs(x);
				if (x < 0) {
					ox -= x;
				}
			}

			if (y !== 0) {
				height += _abs(y);
				if (y < 0) {
					oy -= y;
				}
			}

			synCanvas.width = width;
			synCanvas.height = height;
			let synCtx = synCanvas.getContext("2d");
			if (!knockout) {
				synCtx.drawImage(cache.canvas, _offsetX + ox, _offsetY + oy);
			}
			if (strength < 1) {
				synCtx.globalAlpha *= strength;
			}
			synCtx._offsetX = cacheOffsetX + _offsetX;
			synCtx._offsetY = cacheOffsetY + _offsetY;

			let xorCanvas = cacheStore.getCanvas();
			xorCanvas.width = width + _offsetX;
			xorCanvas.height = height + _offsetY;
			let xorCtx = xorCanvas.getContext("2d");

			xorCtx.globalCompositeOperation = "xor";
			xorCtx.globalAlpha = highlightAlpha;
			xorCtx.drawImage(highlightCtx.canvas, -x + ox, -y + oy);
			xorCtx.globalAlpha = shadowAlpha;
			xorCtx.drawImage(shadowCtx.canvas, x, y);

			let operation;
			if (isInner && isOuter) {
				operation = "source-over";
			} else if (isInner) {
				synCtx.drawImage(cache.canvas, _offsetX + ox, _offsetY + oy);
				operation = _this.filterOperation(true, knockout);
			} else if (isOuter) {
				operation = "destination-over";
			}

			synCtx.globalCompositeOperation = operation;
			synCtx.drawImage(xorCtx.canvas, 0, 0);
			if (!isInner && isOuter && knockout) {
				synCtx.globalCompositeOperation = "destination-out";
				synCtx.drawImage(cache.canvas, _offsetX + ox, _offsetY + oy);
			}

			cacheStore.destroy(ctx);
			cacheStore.destroy(highlightCtx);
			cacheStore.destroy(shadowCtx);
			cacheStore.destroy(xorCtx);

			return synCtx;
		};

		/**
		 * @constructor
		 */
		let GradientGlowFilter = function()
		{
			let _this = this;
			BitmapFilter.call(_this);

			_this.filterId = 4;
			_this.distance = 4;
			_this.angle = 45;
			_this.colors = null;
			_this.alphas = null;
			_this.ratios = null;
			_this.blurX = 4;
			_this.blurY = 4;
			_this.strength = 1;
			_this.quality = 1;
			_this.type = "inner";
			_this.knockout = false;

			let arg = arguments;

			let distance = arg[0] | 0;
			if (!_isNaN(distance)) {
				_this.distance = distance;
			}

			let angle = +arg[1];
			if (!_isNaN(angle) && 0 <= angle && 360 >= angle) {
				_this.angle = angle;
			}

			_this.colors = arg[2];
			_this.alphas = arg[3];
			_this.ratios = arg[4];

			let blurX = arg[5] | 0;
			if (!_isNaN(blurX) && 0 <= blurX && 255 >= blurX) {
				_this.blurX = blurX;
			}

			let blurY = arg[6] | 0;
			if (!_isNaN(blurY) && 0 <= blurY && 255 >= blurY) {
				_this.blurY = blurY;
			}

			let strength = +arg[7];
			if (!_isNaN(strength) && 0 <= strength && 255 >= strength) {
				_this.strength = strength;
			}

			let quality = arg[8] | 0;
			if (!_isNaN(quality) && 1 <= quality && 15 >= quality) {
				_this.quality = quality;
			}

			let type = arg[9];
			if (typeof type === "string") {
				_this.type = type;
			}

			let knockout = arg[10];
			if (typeof knockout === "boolean") {
				_this.knockout = knockout;
			}
		};

		/**
		 * extends
		 * @type {BitmapFilter}
		 */
		GradientGlowFilter.prototype = Object.create(BitmapFilter.prototype);
		GradientGlowFilter.prototype.constructor = GradientGlowFilter;

		/**
		 * @param cache
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @returns {*}
		 */
		GradientGlowFilter.prototype.render = function(cache, matrix, colorTransform, stage)
		{
			let _this = this;
			let strength = _this.strength;
			if (strength === 0) {
				return cache;
			}

			let type = _this.type;
			let blurX = _this.blurX;
			let blurY = _this.blurY;
			let isInner = (type === "inner" || type === "full");
			let isOuter = (type === "outer" || type === "full");
			let knockout = _this.knockout;
			let angle = _this.angle;
			let r = angle * _PI / 180;

			let blurFilter = new BlurFilter(blurX, blurY, _this.quality);
			let ctx = blurFilter.render(cache, matrix, colorTransform, stage);

			// synthesis
			let cacheOffsetX = cache._offsetX;
			let cacheOffsetY = cache._offsetY;
			let _offsetX = ctx._offsetX;
			let _offsetY = ctx._offsetY;

			let canvas = ctx.canvas;
			let synCanvas = cacheStore.getCanvas();
			let width = canvas.width + cacheOffsetX;
			let height = canvas.height + cacheOffsetY;
			let ox = 0;
			let oy = 0;
			let dx = 0;
			let dy = 0;

			let distance = _this.distance;
			let scale = stage.getScale();
			let x = _ceil(_cos(r) * distance * scale);
			let y = _ceil(_sin(r) * distance * scale);

			if (x !== 0) {
				width += _abs(x);
				if (x < 0) {
					ox -= x;
				} else {
					dx = x;
				}
			}

			if (y !== 0) {
				height += _abs(y);
				if (y < 0) {
					oy -= y;
				} else {
					dy = y;
				}
			}

			synCanvas.width = width;
			synCanvas.height = height;
			let synCtx = synCanvas.getContext("2d");
			if (!knockout) {
				synCtx.drawImage(cache.canvas, _offsetX + ox, _offsetY + oy);
			}

			if (strength < 1) {
				synCtx.globalAlpha *= strength;
			}

			let operation;
			if (isInner && isOuter) {
				operation = "source-over";
			} else {
				if (knockout) {
					synCtx.drawImage(cache.canvas, _offsetX + ox, _offsetY + oy);
				}
				operation = _this.filterOperation(isInner, knockout);
			}

			synCtx.globalCompositeOperation = operation;
			synCtx.drawImage(canvas, cacheOffsetX + dx, cacheOffsetY + dy);

			synCtx._offsetX = cacheOffsetX + _offsetX;
			synCtx._offsetY = cacheOffsetY + _offsetY;

			cacheStore.destroy(ctx);

			return synCtx;
		};

		/**
		 * @constructor
		 */
		let ConvolutionFilter = function()
		{
			let _this = this;
			BitmapFilter.call(_this);

			_this.filterId = 5;
		};

		/**
		 * extends
		 * @type {BitmapFilter}
		 */
		ConvolutionFilter.prototype = Object.create(BitmapFilter.prototype);
		ConvolutionFilter.prototype.constructor = ConvolutionFilter;

		/**
		 * @param cache
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @returns {*}
		 */
		ConvolutionFilter.prototype.render = function(cache, matrix, colorTransform, stage)
		{
			return cache;
		};

		/**
		 * @constructor
		 */
		let ColorMatrixFilter = function()
		{
			let _this = this;
			BitmapFilter.call(_this);

			let arg = arguments;

			let matrix = arg[0] | 0;
			let matrix2 = new Array(4);
			for (let i = 0; i < 4; i++) {
				matrix2[i] =  new Array(5);
				for (let j = 0; j < 5; j++) {
					matrix2[i][j] = matrix[i * 5 + j];
				}
			}
			_this.matrix = matrix2;
			_this.filterId = 6;
		};

		/**
		 * extends
		 * @type {BitmapFilter}
		 */
		ColorMatrixFilter.prototype = Object.create(BitmapFilter.prototype);
		ColorMatrixFilter.prototype.constructor = ColorMatrixFilter;

		ColorMatrixFilter.prototype.cut = function(color)
		{
			// get integer from float
			let c;
			if (color < 0) c = Math.ceil(color);
			else c = Math.floor(color);
			if (c<0) c= 0;
			if (c>255) c= 255;
			return c;
		};

		/**
		 * @param cache
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @returns {*}
		 */
		ColorMatrixFilter.prototype.render = function(cache, matrix, colorTransform, stage)
		{
			let _this = this;
			let _cut = _this.cut;
			//let cacheCanvas = cache.canvas;
			//let canvas = cacheStore.getCanvas();
			let cmCanvas = cacheStore.getCanvas();
			let width = cmCanvas.width;
			let height = cmCanvas.height;
			//cmCanvas.width = width;
			//cmCanvas.height = height;
			let cmCtx = cmCanvas.getContext("2d");
			let imgData = cmCtx.getImageData(0, 0, width, height);
			let pxData = imgData.data;
			let length = width * height;
			let idx = 0;
			let m = _this.matrix;
			if (length > 0) {
				while (length--) {
					let r = pxData[idx++];
					let g = pxData[idx++];
					let b = pxData[idx++];
					let a = pxData[idx++];
					pxData[idx - 4] = _cut(m[0]*r+m[1]*g+m[2]*b+m[3]*a);
					pxData[idx - 3] = _cut(m[4]*r+m[5]*g+m[6]*b+m[7]*a);
					pxData[idx - 2] = _cut(m[8]*r+m[9]*g+m[10]*b+m[11]*a);
					pxData[idx - 1] = _cut(m[12]*r+m[13]*g+m[14]*b+m[15]*a);
				}
			}
			cmCtx.putImageData(imgData, 0, 0);

			return cmCtx;
		};

		/**
		 * @constructor
		 */
		let GradientBevelFilter = function()
		{
			let _this = this;
			BitmapFilter.call(_this);

			_this.filterId = 7;


		};

		/**
		 * extends
		 * @type {BitmapFilter}
		 */
		GradientBevelFilter.prototype = Object.create(BitmapFilter.prototype);
		GradientBevelFilter.prototype.constructor = GradientBevelFilter;


		/**
		 * @param cache
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @returns {*}
		 */
		GradientBevelFilter.prototype.render = function(cache, matrix, colorTransform, stage)
		{
			return cache;
		};

		/**
		 * @constructor
		 */
		let Graphics = function()
		{
			this.clear();
		};

		/**
		 * @type {number}
		 */
		Graphics.prototype.MOVE_TO = 0;

		/**
		 * @type {number}
		 */
		Graphics.prototype.CURVE_TO = 1;

		/**
		 * @type {number}
		 */
		Graphics.prototype.LINE_TO = 2;

		/**
		 * @type {number}
		 */
		Graphics.prototype.CUBIC = 3;

		/**
		 * @type {number}
		 */
		Graphics.prototype.ARC = 4;

		/**
		 * @type {number}
		 */
		Graphics.prototype.FILL_STYLE = 5;

		/**
		 * @type {number}
		 */
		Graphics.prototype.STROKE_STYLE = 6;

		/**
		 * @type {number}
		 */
		Graphics.prototype.FILL = 7;

		/**
		 * @type {number}
		 */
		Graphics.prototype.STROKE = 8;

		/**
		 * @type {number}
		 */
		Graphics.prototype.LINE_WIDTH = 9;

		/**
		 * @type {number}
		 */
		Graphics.prototype.LINE_CAP = 10;

		/**
		 * @type {number}
		 */
		Graphics.prototype.LINE_JOIN = 11;

		/**
		 * @type {number}
		 */
		Graphics.prototype.MITER_LIMIT = 12;

		/**
		 * @type {number}
		 */
		Graphics.prototype.BEGIN_PATH = 13;

		/**
		 * @param a
		 * @param b
		 * @returns []
		 */
		Graphics.prototype.multiplicationMatrix = function(a, b)
		{
			return [
				a[0] * b[0] + a[2] * b[1],
				a[1] * b[0] + a[3] * b[1],
				a[0] * b[2] + a[2] * b[3],
				a[1] * b[2] + a[3] * b[3],
				a[0] * b[4] + a[2] * b[5] + a[4],
				a[1] * b[4] + a[3] * b[5] + a[5]
			];
		};

		/**
		 * @param color
		 * @param data
		 * @returns {{R: number, G: number, B: number, A: number}}
		 */
		Graphics.prototype.generateColorTransform = function(color, data)
		{
			return {
				R: _max(0, _min((color.R * data[0]) + data[4], 255)) | 0,
				G: _max(0, _min((color.G * data[1]) + data[5], 255)) | 0,
				B: _max(0, _min((color.B * data[2]) + data[6], 255)) | 0,
				A: _max(0, _min((color.A * 255 * data[3]) + data[7], 255)) / 255
			};
		};

		/**
		 * @param int
		 * @param alpha
		 * @returns {{R: number, G: number, B: number, A: number}}
		 */
		Graphics.prototype.intToRGBA = function(int, alpha)
		{
			alpha = alpha || 100;
			return {
				R: (int & 0xff0000) >> 16,
				G: (int & 0x00ff00) >> 8,
				B: (int & 0x0000ff),
				A: (alpha / 100)
			};
		};

		/**
		 * @returns {Graphics}
		 */
		Graphics.prototype.clear = function()
		{
			let _this = this;
			let no = _Number.MAX_VALUE;
			_this.bounds = {xMin: no, xMax: -no, yMin: no, yMax: -no};
			_this.maxWidth = 0;
			_this.cmd = null;
			_this.isDraw = false;
			_this.isFillDraw = false;
			_this.isLineDraw = false;
			_this.cacheKey = "";
			_this.recodes = [];
			_this.lineRecodes = [];
			return _this;
		};

		/**
		 * @returns {string}
		 */
		Graphics.prototype.getCacheKey = function()
		{
			return this.cacheKey;
		};

		/**
		 * @returns {string}
		 */
		Graphics.prototype.addCacheKey = function()
		{
			let args = arguments;
			let cacheKey = "";
			let length = args.length;
			if (length) {
				for (let i = 0; i < length; i++) {
					let value = args[i];
					cacheKey += "_" + value;
				}
			}
			this.cacheKey += cacheKey;
		};

		/**
		 * @returns {*}
		 */
		Graphics.prototype.getBounds = function()
		{
			return this.bounds;
		};

		/**
		 * @param x
		 * @param y
		 */
		Graphics.prototype.setBounds = function(x, y)
		{
			let bounds = this.bounds;
			bounds.xMin = _min(bounds.xMin, x);
			bounds.xMax = _max(bounds.xMax, x);
			bounds.yMin = _min(bounds.yMin, y);
			bounds.yMax = _max(bounds.yMax, y);
		};

		/**
		 * @param str
		 * @returns {string}
		 */
		Graphics.prototype.colorStringToInt = function(str)
		{
			let canvas = cacheStore.getCanvas();
			let ctx = canvas.getContext("2d");
			ctx.fillStyle = str;
			let color = "0x" + ctx.fillStyle.substr(1);
			cacheStore.destroy(ctx);
			return color;
		};

		/**
		 * @param rgb
		 * @param alpha
		 * @returns {Graphics}
		 */
		Graphics.prototype.beginFill = function(rgb, alpha)
		{
			let _this = this;
			if (typeof rgb === "string") {
				rgb = _this.colorStringToInt(rgb);
			}

			rgb |= 0;
			alpha = +alpha;
			if (_isNaN(alpha)) {
				alpha = 100;
			} else {
				alpha *= 100;
			}

			let color = _this.intToRGBA(rgb, alpha);
			let recodes = _this.recodes;
			if (!_this.isFillDraw) {
				recodes[recodes.length] = [_this.BEGIN_PATH];
			}
			recodes[recodes.length] = [_this.FILL_STYLE, color.R, color.G, color.B, color.A];

			_this.addCacheKey(rgb, alpha);
			_this.isFillDraw = true;
			_this.isDraw = true;
			return _this;
		};

		/**
		 * @param width
		 * @param rgb
		 * @param alpha
		 * @param pixelHinting
		 * @param noScale
		 * @param capsStyle
		 * @param jointStyle
		 * @param miterLimit
		 * @returns {Graphics}
		 */
		Graphics.prototype.lineStyle = function(width, rgb, alpha, pixelHinting, noScale, capsStyle, jointStyle, miterLimit)
		{
			let _this = this;
			let lineRecodes = _this.lineRecodes;

			width = +width;
			if (!_isNaN(width)) {
				if (rgb === undefined) {
					rgb = 0;
				}

				if (typeof rgb === "string") {
					rgb = _this.colorStringToInt(rgb);
				}

				if (!capsStyle) {
					capsStyle = "round";
				}
				if (!jointStyle) {
					jointStyle = "round";
				}

				rgb |= 0;
				alpha = +alpha;
				if (_isNaN(alpha)) {
					alpha = 100;
				} else {
					alpha *= 100;
				}

				let color = _this.intToRGBA(rgb, alpha);
				if (width < 0.5) {
					width += 0.2;
				}

				width *= 20;
				_this.maxWidth = _max(_this.maxWidth, width);

				if (_this.isLineDraw) {
					lineRecodes[lineRecodes.length] = [_this.STROKE];
				}
				lineRecodes[lineRecodes.length] = [_this.BEGIN_PATH];
				lineRecodes[lineRecodes.length] = [_this.STROKE_STYLE, color.R, color.G, color.B, color.A];
				lineRecodes[lineRecodes.length] = [_this.LINE_WIDTH, width];
				lineRecodes[lineRecodes.length] = [_this.LINE_CAP, capsStyle];
				lineRecodes[lineRecodes.length] = [_this.LINE_JOIN, jointStyle];
				_this.addCacheKey(rgb, alpha);
				_this.isLineDraw = true;
				_this.isDraw = true;
			} else if (_this.isLineDraw) {
				_this.isLineDraw = false;
				lineRecodes[lineRecodes.length] = [_this.STROKE];
				let length = lineRecodes.length;
				let recodes = _this.recodes;
				for (let i = 0; i < length; i++) {
					recodes[recodes.length] = lineRecodes[i];
				}
				_this.lineRecodes = [];
			}
			return _this;
		};

		/**
		 * @param x
		 * @param y
		 * @returns {Graphics}
		 */
		Graphics.prototype.moveTo = function(x, y)
		{
			let _this = this;
			let recodes = _this.recodes;
			x *= 20;
			y *= 20;

			if (_this.isFillDraw) {
				recodes[recodes.length] = [_this.MOVE_TO, x, y];
			}

			if (_this.isLineDraw) {
				let lineRecodes = _this.lineRecodes;
				lineRecodes[lineRecodes.length] = [_this.MOVE_TO, x, y];
			}

			if (_this.isFillDraw || _this.isLineDraw) {
				_this.setBounds(x, y);
				_this.addCacheKey(x, y);
			}
			return _this;
		};

		/**
		 * @param x
		 * @param y
		 * @returns {Graphics}
		 */
		Graphics.prototype.lineTo = function(x, y)
		{
			let _this = this;
			let recodes = _this.recodes;
			x *= 20;
			y *= 20;

			if (_this.isFillDraw) {
				recodes[recodes.length] = [_this.LINE_TO, x, y];
			}

			if (_this.isLineDraw) {
				let lineRecodes = _this.lineRecodes;
				lineRecodes[lineRecodes.length] = [_this.LINE_TO, x, y];
			}

			if (_this.isFillDraw || _this.isLineDraw) {
				_this.setBounds(x, y);
				_this.addCacheKey(x, y);
			}
			return _this;
		};

		/**
		 * @param cx
		 * @param cy
		 * @param dx
		 * @param dy
		 * @returns {Graphics}
		 */
		Graphics.prototype.curveTo = function(cx, cy, dx, dy)
		{
			let _this = this;
			let recodes = _this.recodes;
			cx *= 20;
			cy *= 20;
			dx *= 20;
			dy *= 20;

			if (_this.isFillDraw) {
				recodes[recodes.length] = [_this.CURVE_TO, cx, cy, dx, dy];
			}

			if (_this.isLineDraw) {
				let lineRecodes = _this.lineRecodes;
				lineRecodes[lineRecodes.length] = [_this.CURVE_TO, cx, cy, dx, dy];
			}

			if (_this.isFillDraw || _this.isLineDraw) {
				_this.setBounds(cx, cy);
				_this.setBounds(dx, dy);
				_this.addCacheKey(cx, cy, dx, dy);
			}
			return _this;
		};

		/**
		 * @param cp1x
		 * @param cp1y
		 * @param cp2x
		 * @param cp2y
		 * @param x
		 * @param y
		 * @returns {Graphics}
		 */
		Graphics.prototype.cubicCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y)
		{
			let _this = this;
			let recodes = _this.recodes;
			cp1x *= 20;
			cp1y *= 20;
			cp2x *= 20;
			cp2y *= 20;
			x *= 20;
			y *= 20;

			if (_this.isFillDraw) {
				recodes[recodes.length] = [_this.CUBIC, cp1x, cp1y, cp2x, cp2y, x, y];
			}

			if (_this.isLineDraw) {
				let lineRecodes = _this.lineRecodes;
				lineRecodes[lineRecodes.length] = [_this.CUBIC, cp1x, cp1y, cp2x, cp2y, x, y];
			}

			if (_this.isFillDraw || _this.isLineDraw) {
				_this.setBounds(x, y);
				_this.setBounds(cp1x, cp1y);
				_this.setBounds(cp2x, cp2y);
				_this.addCacheKey(cp1x, cp1y, cp2x, cp2y, x, y);
			}
			return _this;
		};

		/**
		 * @param x
		 * @param y
		 * @param radius
		 * @returns {Graphics}
		 */
		Graphics.prototype.drawCircle = function(x, y, radius)
		{
			let _this = this;
			let recodes = _this.recodes;
			x *= 20;
			y *= 20;
			radius *= 20;

			if (_this.isFillDraw) {
				recodes[recodes.length] = [_this.ARC, x, y, radius];
			}

			if (_this.isLineDraw) {
				let lineRecodes = _this.lineRecodes;
				lineRecodes[lineRecodes.length] = [_this.ARC, x, y, radius];
			}

			if (_this.isFillDraw || _this.isLineDraw) {
				_this.setBounds(x - radius, y - radius);
				_this.setBounds(x + radius, y + radius);
				_this.addCacheKey(x, y, radius);
			}
			return _this;
		};

		/**
		 * @param x
		 * @param y
		 * @param width
		 * @param height
		 * @returns {Graphics}
		 */
		Graphics.prototype.drawEllipse = function(x, y, width, height)
		{
			let _this = this;
			let hw = width / 2;
			let hh = height / 2;
			let x0 = x + hw;
			let x1 = x + width;
			let y0 = y + hh;
			let y1 = y + height;
			let cw = 4 / 3 * (_SQRT2 - 1) * hw;
			let ch = 4 / 3 * (_SQRT2 - 1) * hh;
			_this.moveTo(x0, y);
			_this.cubicCurveTo(x0 + cw, y, x1, y0 - ch, x1, y0);
			_this.cubicCurveTo(x1, y0 + ch, x0 + cw, y1, x0, y1);
			_this.cubicCurveTo(x0 - cw, y1, x, y0 + ch, x, y0);
			_this.cubicCurveTo(x, y0 - ch, x0 - cw, y, x0, y);
			return _this;
		};

		/**
		 * @param x
		 * @param y
		 * @param width
		 * @param height
		 * @returns {Graphics}
		 */
		Graphics.prototype.drawRect = function(x, y, width, height)
		{
			let _this = this;
			_this.moveTo(x, y);
			_this.lineTo(x + width, y);
			_this.lineTo(x + width, y + height);
			_this.lineTo(x, y + height);
			_this.lineTo(x, y);
			return _this;
		};

		/**
		 * @param x
		 * @param y
		 * @param width
		 * @param height
		 * @param ellipseWidth
		 * @param ellipseHeight
		 * @returns {Graphics}
		 */
		Graphics.prototype.drawRoundRect = function(x, y, width, height, ellipseWidth, ellipseHeight)
		{
			let _this = this;
			let hew = ellipseWidth / 2;
			let heh = ellipseHeight / 2;
			let cw = 4 / 3 * (_SQRT2 - 1) * hew;
			let ch = 4 / 3 * (_SQRT2 - 1) * heh;

			let dx0 = x + hew;
			let dx1 = x + width;
			let dx2 = dx1 - hew;

			let dy0 = y + heh;
			let dy1 = y + height;
			let dy2 = dy1 - heh;

			_this.moveTo(dx0, y);
			_this.lineTo(dx2, y);
			_this.cubicCurveTo(dx2 + cw, y, dx1, dy0 - ch, dx1, dy0);
			_this.lineTo(dx1, dy2);
			_this.cubicCurveTo(dx1, dy2 + ch, dx2 + cw, dy1, dx2, dy1);
			_this.lineTo(dx0, dy1);
			_this.cubicCurveTo(dx0 - cw, dy1, x, dy2 + ch, x, dy2);
			_this.lineTo(x, dy0);
			_this.cubicCurveTo(x, dy0 - ch, dx0 - cw, y, dx0, y);

			return _this;
		};

		/**
		 * @param vertices
		 * @param indices
		 * @param uvtData
		 * @param culling
		 * @returns {Graphics}
		 */
		Graphics.prototype.drawTriangles = function(vertices, indices, uvtData, culling)
		{
			let _this = this;
			let length = vertices.length;
			if (length && length % 3 === 0) {
				let i = 0;
				let count = 0;
				if (indices) {
					length = indices.length;
					if (length && length % 3 === 0) {
						for (i = 0; i < length; i++) {
							let idx = indices[i];
							if (count === 0) {
								_this.moveTo(vertices[idx], vertices[idx + 1]);
							} else {
								_this.lineTo(vertices[idx], vertices[idx + 1]);
							}
							count++;
							if (count % 3 === 0) {
								count = 0;
							}
						}
					}
				} else {
					for (i = 0; i < length; i++) {
						if (count === 0) {
							_this.moveTo(vertices[i++], vertices[i]);
						} else {
							_this.lineTo(vertices[i++], vertices[i]);
						}
						count++;
						if (count % 3 === 0) {
							count = 0;
						}
					}
				}
			}
			return _this;
		};

		/**
		 * @returns {Graphics}
		 */
		Graphics.prototype.endFill = function()
		{
			let _this = this;
			if (_this.isFillDraw) {
				let recodes = _this.recodes;
				recodes[recodes.length] = [_this.FILL];
			}
			_this.isFillDraw = false;
			return _this;
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @returns {*}
		 */
		Graphics.prototype.render = function(ctx, matrix, colorTransform, stage)
		{
			let _this = this;
			let cacheKey = "";
			let alpha = colorTransform[3] + (colorTransform[7] / 255);
			if (!alpha) {
				return cacheKey;
			}

			let rMatrix = _this.multiplicationMatrix(stage.getMatrix(), matrix);
			let xScale = _sqrt(rMatrix[0] * rMatrix[0] + rMatrix[1] * rMatrix[1]);
			let yScale = _sqrt(rMatrix[2] * rMatrix[2] + rMatrix[3] * rMatrix[3]);
			xScale = _pow(_SQRT2, _ceil(_log(xScale) / _LN2_2 - _LOG1P));
			yScale = _pow(_SQRT2, _ceil(_log(yScale) / _LN2_2 - _LOG1P));

			let maxWidth = _this.maxWidth;
			let halfWidth = maxWidth / 2;
			let bounds = _this.getBounds();
			let xMax = bounds.xMax;
			let xMin = bounds.xMin;
			let yMax = bounds.yMax;
			let yMin = bounds.yMin;

			let W = _abs(_ceil((xMax - xMin + maxWidth) * xScale));
			let H = _abs(_ceil((yMax - yMin + maxWidth) * yScale));
			if (W <= 0 || H <= 0) {
				return cacheKey;
			}

			let cache;
			let canvas;
			let isClipDepth = stage.clipMc || _this.isClipDepth;
			if (!isClipDepth) {
				cacheKey = cacheStore.generateKey("Graphics", 0, [xScale, yScale], colorTransform);
				cacheKey += _this.getCacheKey();
				cache = cacheStore.getCache(cacheKey);
				if (!cache && stage.getWidth() > W && stage.getHeight() > H && cacheStore.size > (W * H)) {
					canvas = cacheStore.getCanvas();
					canvas.width = W;
					canvas.height = H;
					cache = canvas.getContext("2d");
					let cMatrix = [xScale, 0, 0, yScale, (-xMin + halfWidth) * xScale, (-yMin + halfWidth) * yScale];
					cache.setTransform(cMatrix[0], cMatrix[1], cMatrix[2], cMatrix[3], cMatrix[4], cMatrix[5]);
					cache = _this.executeRender(cache, _min(xScale, yScale), colorTransform, false);
					cacheStore.setCache(cacheKey, cache);
				}
			}

			if (cache) {
				canvas = cache.canvas;
				let sMatrix = [1 / xScale, 0, 0, 1 / yScale, xMin - halfWidth, yMin - halfWidth];
				let m2 = _this.multiplicationMatrix(rMatrix, sMatrix);
				ctx.setTransform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5]);
				if (isAndroid4x && !isChrome) {
					ctx.fillStyle = stage.context.createPattern(cache.canvas, "no-repeat");
					ctx.fillRect(0, 0, W, H);
				} else {
					ctx.drawImage(canvas, 0, 0, W, H);
				}
			} else {
				ctx.setTransform(rMatrix[0], rMatrix[1], rMatrix[2], rMatrix[3], rMatrix[4], rMatrix[5]);
				_this.executeRender(ctx, _min(rMatrix[0], rMatrix[3]), colorTransform, isClipDepth);
			}

			return cacheKey + "_" + rMatrix[4] + "_" + rMatrix[5];
		};

		/**
		 * @param ctx
		 * @param minScale
		 * @param colorTransform
		 * @param isClip
		 */
		Graphics.prototype.executeRender = function(ctx, minScale, colorTransform, isClip)
		{
			let _this = this;
			let recodes = _this.recodes;
			let length = recodes.length;
			let lineRecodes = _this.lineRecodes;

			if (length || lineRecodes) {
				let cmd = _this.cmd;
				if (!cmd) {
					let lLen = lineRecodes.length;
					if (lLen) {
						for (let i = 0; i < lLen; i++) {
							recodes[recodes.length] = lineRecodes[i];
						}
						_this.lineRecodes = [];
					}
					cmd = vtc.buildCommand(recodes);
					_this.cmd = cmd;
				}

				ctx.beginPath();
				cmd(ctx, colorTransform, isClip);
				if (isClip) {
					ctx.clip();
				} else {
					if (_this.isFillDraw) {
						ctx.fill();
					}
					if (_this.isLineDraw) {
						ctx.stroke();
					}
				}
			}

			let resetCss = "rgba(0,0,0,1)";
			ctx.strokeStyle = resetCss;
			ctx.fillStyle = resetCss;
			ctx.globalAlpha = 1;

			return ctx;
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param stage
		 * @param x
		 * @param y
		 * @returns {boolean}
		 */
		Graphics.prototype.renderHitTest = function(ctx, matrix, stage, x, y)
		{
			let _this = this;

			let cmd = _this.cmd;
			if (!cmd) {
				let recodes = _this.recodes;
				cmd = vtc.buildCommand(recodes);
				_this.cmd = cmd;
			}

			let rMatrix = _this.multiplicationMatrix(stage.getMatrix(), matrix);
			ctx.setTransform(rMatrix[0], rMatrix[1], rMatrix[2], rMatrix[3], rMatrix[4], rMatrix[5]);

			ctx.beginPath();
			cmd(ctx, [1, 1, 1, 1, 0, 0, 0, 0], true);

			let hit = ctx.isPointInPath(x, y);
			if (hit) {
				return hit;
			}

			if ("isPointInStroke" in ctx) {
				hit = ctx.isPointInStroke(x, y);
				if (hit) {
					return hit;
				}
			}

			return hit;
		};

		/**
		 * @constructor
		 */
		let SoundTransform = function()
		{
			let _this = this;
			_this._leftToLeft = 0;
			_this._leftToRight = 1;
			_this._pan = 0;
			_this._rightToLeft = 0;
			_this._rightToRight = 1;
			_this._volume = 1;
		};

		/**
		 * properties
		 */
		Object.defineProperties(SoundTransform.prototype,
		{
			leftToLeft: {
				get: function() {
					return this.getLeftToLeft();
				},
				set: function(leftToLeft) {
					this.setLeftToLeft(leftToLeft);
				}
			},
			leftToRight: {
				get: function() {
					return this.getLeftToRight();
				},
				set: function(leftToRight) {
					this.setLeftToRight(leftToRight);
				}
			},
			pan: {
				get: function() {
					return this.getPan();
				},
				set: function(pan) {
					this.setPan(pan);
				}
			},
			rightToLeft: {
				get: function() {
					return this.getRightToLeft();
				},
				set: function(rightToLeft) {
					this.setRightToLeft(rightToLeft);
				}
			},
			rightToRight: {
				get: function() {
					return this.getRightToRight();
				},
				set: function(rightToRight) {
					this.setRightToRight(rightToRight);
				}
			},
			volume: {
				get: function() {
					return this.getVolume();
				},
				set: function(volume) {
					this.setVolume(volume);
				}
			}
		});

		/**
		 * @returns {number}
		 */
		SoundTransform.prototype.getLeftToLeft = function()
		{
			return this._leftToLeft;
		};

		/**
		 * @param leftToLeft
		 */
		SoundTransform.prototype.setLeftToLeft = function(leftToLeft)
		{
			this._leftToLeft = leftToLeft | 0;
		};

		/**
		 * @returns {number}
		 */
		SoundTransform.prototype.getLeftToRight = function()
		{
			return this._leftToRight;
		};

		/**
		 * @param leftToRight
		 */
		SoundTransform.prototype.setLeftToRight = function(leftToRight)
		{
			this._leftToRight = leftToRight | 0;
		};

		/**
		 * @returns {number}
		 */
		SoundTransform.prototype.getPan = function()
		{
			return this._pan;
		};

		/**
		 * @param pan
		 */
		SoundTransform.prototype.setPan = function(pan)
		{
			this._pan = pan | 0;
		};

		/**
		 * @returns {number}
		 */
		SoundTransform.prototype.getRightToLeft = function()
		{
			return this._rightToLeft;
		};

		/**
		 * @param rightToLeft
		 */
		SoundTransform.prototype.setRightToLeft = function(rightToLeft)
		{
			this._rightToLeft = rightToLeft | 0;
		};

		/**
		 * @returns {number}
		 */
		SoundTransform.prototype.getRightToRight = function()
		{
			return this._rightToRight;
		};

		/**
		 * @param rightToRight
		 */
		SoundTransform.prototype.setRightToRight = function(rightToRight)
		{
			this._rightToRight = rightToRight | 0;
		};

		/**
		 * @returns {number}
		 */
		SoundTransform.prototype.getVolume = function()
		{
			return this._volume;
		};

		/**
		 * @param volume
		 */
		SoundTransform.prototype.setVolume = function(volume)
		{
			this._volume = volume | 0;
		};

		/**
		 * @param vol
		 * @param panning
		 */
		SoundTransform.prototype.SoundTransform = function(vol, panning)
		{
			let _this = this;
			_this.volume = vol | 0;
			_this.pan = panning | 0;
		};

		/**
		 * @constructor
		 */
		let Swf2jsEvent = function()
		{
			let _this = this;
			_this.target = {};
			_this.bubbles = true;
			_this.cancelable = true;
			_this.currentTarget = {};
			_this.eventPhase = 0;
		};

		/**
		 * @type {string}
		 */
		Swf2jsEvent.prototype.ACTIVATE = "activate";
		Swf2jsEvent.prototype.CLICK = "press";
		Swf2jsEvent.prototype.CONTEXT_MENU = "contextMenu";
		Swf2jsEvent.prototype.DOUBLE_CLICK = "doubleClick";
		Swf2jsEvent.prototype.MIDDLE_CLICK = "middleClick";
		Swf2jsEvent.prototype.MIDDLE_MOUSE_DOWN = "middleMouseDown";
		Swf2jsEvent.prototype.MIDDLE_MOUSE_UP = "middleMouseUp";
		Swf2jsEvent.prototype.MOUSE_DOWN = "mouseDown";
		Swf2jsEvent.prototype.MOUSE_MOVE = "mouseMove";
		Swf2jsEvent.prototype.MOUSE_OUT = "rollOut"; // mouseOut
		Swf2jsEvent.prototype.MOUSE_OVER = "rollOver"; // mouseOver
		Swf2jsEvent.prototype.MOUSE_UP = "mouseUp";
		Swf2jsEvent.prototype.MOUSE_WHEEL = "mouseWheel";
		Swf2jsEvent.prototype.RIGHT_CLICK = "rightClick";
		Swf2jsEvent.prototype.RIGHT_MOUSE_DOWN = "rightMouseDown";
		Swf2jsEvent.prototype.RIGHT_MOUSE_UP = "rightMouseUp";
		Swf2jsEvent.prototype.ROLL_OUT = "rollOut";
		Swf2jsEvent.prototype.ROLL_OVER = "rollOver";

		/**
		 * @param type
		 * @param target
		 * @constructor
		 */
		let ClipEvent = function(type)
		{
			let _this = this;
			_this.type = type;
			_this.target = null;
			Swf2jsEvent.call(this);
		};

		/**
		 * extends
		 * @type {EventDispatcher}
		 */
		ClipEvent.prototype = Object.create(Swf2jsEvent.prototype);
		ClipEvent.prototype.constructor = ClipEvent;

		let clipEvent = new ClipEvent();

		/**
		 * @constructor
		 */
		let EventDispatcher = function()
		{
			let _this = this;
			_this.events = {};
			_this.isLoad = false;
			_this.active = false;
		};

		/**
		 * properties
		 */
		Object.defineProperties(EventDispatcher.prototype,
		{
			onEnterFrame: {
				get: function() {
					return this.getOnEvent("onEnterFrame");
				},
				set: function(onEnterFrame) {
					this.setOnEvent("onEnterFrame", onEnterFrame);
				}
			},
			onPress: {
				get: function() {
					return this.getOnEvent("onPress");
				},
				set: function(onPress) {
					this.setOnEvent("onPress", onPress);
				}
			},
			onRelease: {
				get: function() {
					return this.getOnEvent("onRelease");
				},
				set: function(onRelease) {
					this.setOnEvent("onRelease", onRelease);
				}
			},
			onReleaseOutside: {
				get: function() {
					return this.getOnEvent("onReleaseOutside");
				},
				set: function(onReleaseOutside) {
					this.setOnEvent("onReleaseOutside", onReleaseOutside);
				}
			},
			onRollOver: {
				get: function() {
					return this.getOnEvent("onRollOver");
				},
				set: function(onRollOver) {
					this.setOnEvent("onRollOver", onRollOver);
				}
			},
			onRollOut: {
				get: function() {
					return this.getOnEvent("onRollOut");
				},
				set: function(onRollOut) {
					this.setOnEvent("onRollOut", onRollOut);
				}
			},
			onData: {
				get: function() {
					return this.getOnEvent("onData");
				},
				set: function(onData) {
					this.setOnEvent("onData", onData);
				}
			},
			onMouseDown: {
				get: function() {
					return this.getOnEvent("onMouseDown");
				},
				set: function(onMouseDown) {
					this.setOnEvent("onMouseDown", onMouseDown);
				}
			},
			onMouseUp: {
				get: function() {
					return this.getOnEvent("onMouseUp");
				},
				set: function(onMouseUp) {
					this.setOnEvent("onMouseUp", onMouseUp);
				}
			},
			onMouseMove: {
				get: function() {
					return this.getOnEvent("onMouseMove");
				},
				set: function(onMouseMove) {
					this.setOnEvent("onMouseMove", onMouseMove);
				}
			},
			onDragOut: {
				get: function() {
					return this.getOnEvent("onDragOut");
				},
				set: function(onDragOut) {
					this.setOnEvent("onDragOut", onDragOut);
				}
			},
			onDragOver: {
				get: function() {
					return this.getOnEvent("onDragOver");
				},
				set: function(onDragOver) {
					this.setOnEvent("onDragOver", onDragOver);
				}
			},
			onKeyDown: {
				get: function() {
					return this.getOnEvent("onKeyDown");
				},
				set: function(onKeyDown) {
					this.setOnEvent("onKeyDown", onKeyDown);
				}
			},
			onKeyUp: {
				get: function() {
					return this.getOnEvent("onKeyUp");
				},
				set: function(onKeyUp) {
					this.setOnEvent("onKeyUp", onKeyUp);
				}
			},
			onLoad: {
				get: function() {
					return this.getOnEvent("onLoad");
				},
				set: function(onLoad) {
					this.setOnEvent("onLoad", onLoad);
				}
			},
			onUnLoad: {
				get: function() {
					return this.getOnEvent("onUnLoad");
				},
				set: function(onUnLoad) {
					this.setOnEvent("onUnLoad", onUnLoad);
				}
			}
		});

		/**
		 * @param type
		 * @returns {*}
		 */
		EventDispatcher.prototype.getOnEvent = function(type)
		{
			return this.variables[type];
		};

		/**
		 * @param type
		 * @param as
		 */
		EventDispatcher.prototype.setOnEvent = function(type, as)
		{
			this.variables[type] = as;
		};

		/**
		 * @param type
		 * @param listener
		 * @param useCapture
		 * @param priority
		 * @param useWeakReference
		 */
		EventDispatcher.prototype.addEventListener = function(type, listener, useCapture, priority, useWeakReference)
		{
			let events = this.events;
			if (!(type in events)) {
				events[type] = [];
			}
			let event = events[type];
			event[event.length] = listener;
		};

		/**
		 * @param event
		 * @param stage
		 */
		EventDispatcher.prototype.dispatchEvent = function(event, stage)
		{
			let _this = this;
			let type = event.type;
			if (_this.hasEventListener(type)) {
				let events = _this.events[type];
				let cEvent = new ClipEvent();
				cEvent.type = type;
				cEvent.target = this;
				let args = [cEvent];
				_this.setActionQueue(events, stage, args);
			}
		};

		/**
		 * @param type
		 * @returns {boolean}
		 */
		EventDispatcher.prototype.hasEventListener = function(type)
		{
			return (type in this.events);
		};

		/**
		 * @param type
		 * @param listener
		 * @param useCapture
		 */
		EventDispatcher.prototype.removeEventListener = function(type, listener, useCapture)
		{
			let _this = this;
			if (_this.hasEventListener(type)) {
				let events = _this.events;
				let listeners = events[type];
				let length = listeners.length;
				for (let i = 0; i < length; i++) {
					if (listeners[i] !== listener) {
						continue;
					}
					listeners.slice(i, 0);
					break;
				}
			}
		};

		/**
		 * @param type
		 */
		EventDispatcher.prototype.willTrigger = function(type)
		{
			return this.hasEventListener(type);
		};

		/**
		 * @param as
		 * @param stage
		 * @param args
		 */
		EventDispatcher.prototype.setActionQueue = function(as, stage, args)
		{
			let actions = stage.actions;
			actions[actions.length] = {as: as, mc: this, args: args};
		};

		/**
		 * @constructor
		 */
		let AccessibilityProperties = function() {};

		/**
		 * @constructor
		 */
		let DisplayObject = function()
		{
			let _this = this;
			EventDispatcher.call(_this);
			_this.initialize();
		};

		/**
		 * extends
		 * @type {EventDispatcher}
		 */
		DisplayObject.prototype = Object.create(EventDispatcher.prototype);
		DisplayObject.prototype.constructor = DisplayObject;

		/**
		 * properties
		 */
		Object.defineProperties(DisplayObject.prototype,
		{
			accessibilityProperties: {
				value: new AccessibilityProperties()
			},
			alpha: {
				get: function() {
					return this.getAlpha() / 100;
				},
				set: function(alpha) {
					this.setAlpha(alpha * 100);
				}
			},
			_alpha: {
				get: function() {
					return this.getAlpha();
				},
				set: function(alpha) {
					this.setAlpha(alpha);
				}
			},
			name: {
				get: function() {
					return this.getName();
				},
				set: function(name) {
					this.setName(name);
				}
			},
			_name: {
				get: function() {
					return this.getName();
				},
				set: function(name) {
					this.setName(name);
				}
			},
			blendMode: {
				get: function() {
					return this.getBlendMode();
				},
				set: function(blendMode) {
					this.setBlendMode(blendMode);
				}
			},
			filters: {
				get: function() {
					return this.getFilters();
				},
				set: function(filters) {
					this.setFilters(filters);
				}
			},
			_visible: {
				get: function() {
					return this.getVisible();
				},
				set: function(visible) {
					this.setVisible(visible);
				}
			},
			visible: {
				get: function() {
					return this.getVisible();
				},
				set: function(visible) {
					this.setVisible(visible);
				}
			},
			_rotation: {
				get: function() {
					return this.getRotation();
				},
				set: function(rotation) {
					this.setRotation(rotation);
				}
			},
			rotation: {
				get: function() {
					return this.getRotation();
				},
				set: function(rotation) {
					this.setRotation(rotation);
				}
			},
			_height: {
				get: function() {
					return this.getHeight();
				},
				set: function(height) {
					this.setHeight(height);
				}
			},
			height: {
				get: function() {
					return this.getHeight();
				},
				set: function(height) {
					this.setHeight(height);
				}
			},
			_width: {
				get: function() {
					return this.getWidth();
				},
				set: function(width) {
					this.setWidth(width);
				}
			},
			width: {
				get: function() {
					return this.getWidth();
				},
				set: function(width) {
					this.setWidth(width);
				}
			},
			_x: {
				get: function() {
					return this.getX();
				},
				set: function(x) {
					this.setX(x);
				}
			},
			x: {
				get: function() {
					return this.getX();
				},
				set: function(x) {
					this.setX(x);
				}
			},
			_y: {
				get: function() {
					return this.getY();
				},
				set: function(y) {
					this.setY(y);
				}
			},
			y: {
				get: function() {
					return this.getY();
				},
				set: function(y) {
					this.setY(y);
				}
			},
			_xscale: {
				get: function() {
					return this.getXScale();
				},
				set: function(xscale) {
					this.setXScale(xscale);
				}
			},
			scaleX: {
				get: function() {
					return this.getXScale();
				},
				set: function(xscale) {
					this.setXScale(xscale);
				}
			},
			_yscale: {
				get: function() {
					return this.getYScale();
				},
				set: function(yscale) {
					this.setYScale(yscale);
				}
			},
			scaleY: {
				get: function() {
					return this.getYScale();
				},
				set: function(yscale) {
					this.setYScale(yscale);
				}
			},
			_xmouse: {
				get: function() {
					return this.getXMouse();
				},
				set: function() {
				}
			},
			mouseX: {
				get: function() {
					return this.getXMouse();
				},
				set: function() {
				}
			},
			_ymouse: {
				get: function() {
					return this.getYMouse();
				},
				set: function() {
				}
			},
			mouseY: {
				get: function() {
					return this.getYMouse();
				},
				set: function() {
				}
			},
			mask: {
				get: function() {
					return this.getMask();
				},
				set: function(obj) {
					this.setMask(obj);
				}
			},
			enabled: {
				get: function() {
					return this.getEnabled();
				},
				set: function(enabled) {
					this.setEnabled(enabled);
				}
			},
			_parent: {
				get: function() {
					return this.getParent();
				},
				set: function(parent) {
					this.setParent(parent);
				}
			},
			parent: {
				get: function() {
					return this.getParent();
				},
				set: function(parent) {
					this.setParent(parent);
				}
			}
		});

		/**
		 * initialize
		 */
		DisplayObject.prototype.initialize = function()
		{
			let _this = this;

			// common
			_this.instanceId = instanceId++;
			_this.characterId = 0;
			_this.tagType = 0;
			_this.ratio = 0;
			_this.isMask = false;
			_this.clipDepth = 0;
			_this.isClipDepth = false;
			_this.stageId = null;
			_this.loadStageId = null;
			_this.variables = {};
			_this.buttonStatus = "up";
			_this.removeFlag = false;
			_this.parentId = null;

			// properties
			_this.__visible = true;
			_this.__name = null;
			_this._url = null;
			_this._highquality = 1;
			_this._focusrect = 1;
			_this._soundbuftime = null;
			_this._totalframes = 1;
			_this._level = 0;
			_this._depth = null;
			_this._framesloaded = 0;
			_this._target = "";
			_this._lockroot = undefined;
			_this._enabled = true;
			_this._blendMode = null;
			_this._filters = null;
			_this._filterCacheKey = null;
			_this._parentPlace = null;
			_this._mask = null;
			_this._matrix = null;
			_this._colorTransform = null;
			_this._extend = false;
			_this._viewRotation = null;
			_this._viewXScale = null;
			_this._viewYScale = null;

			// avm2
			_this.avm2 = null;
		};

	// filters
		DisplayObject.prototype.flash = {
			filters: {
				DropShadowFilter: DropShadowFilter,
				BlurFilter: BlurFilter,
				GlowFilter: GlowFilter,
				BevelFilter: BevelFilter,
				GradientGlowFilter: GradientGlowFilter,
				ConvolutionFilter: ConvolutionFilter,
				ColorMatrixFilter: ColorMatrixFilter,
				GradientBevelFilter: GradientBevelFilter,
				BitmapFilter: BitmapFilter
			}
		};

		DisplayObject.prototype.display = {
		};

		/**
		 * @returns {string}
		 */
		DisplayObject.prototype.toString = function()
		{
			let target = this.getTarget();
			let str = "_level0";
			let array = target.split("/");
			str += array.join(".");
			return str;
		};

		DisplayObject.prototype.invert = function (matrix)
		{
			const newMatrix = [];
			let a, b, c, d ,tx, ty, det;

			a  = matrix[0];
			b  = matrix[1];
			c  = matrix[2];
			d  = matrix[3];
			tx = matrix[4] / 20;
			ty = matrix[5] / 20;

			switch (true) {

				case (b === 0 && c === 0):

					newMatrix[0]  = 1 / a;
					newMatrix[1]  = 0;
					newMatrix[2]  = 0;
					newMatrix[3]  = 1 / d;
					newMatrix[4] = -newMatrix[0] * tx;
					newMatrix[5] = -newMatrix[3] * ty;

					break;

				default:

					det = a * d - b * c;

					switch (true) {

						case det === 0:
							this.identity();
							break;

						default:

							const rdet = 1 / det;

							newMatrix[0]  = d  * rdet;
							newMatrix[1]  = -b * rdet;
							newMatrix[2]  = -c * rdet;
							newMatrix[3]  = a  * rdet;
							newMatrix[4] = -(newMatrix[0] * tx + newMatrix[2] * ty);
							newMatrix[5] = -(newMatrix[1] * tx + newMatrix[3] * ty);
							break;

					}

					break;

			}

			return newMatrix;
		};

		DisplayObject.prototype.globalToLocal = function (point)
		{
			let matrix = this.getMatrix();

			let parent = this._parent;
			while (parent) {

				matrix = this.multiplicationMatrix(
					parent.getMatrix(),
					matrix
				);

				parent = parent._parent;
			}

			matrix = this.invert(matrix);

			const x = point.x * matrix[0] + point.y * matrix[2] + matrix[4];
			const y = point.x * matrix[1] + point.y * matrix[3] + matrix[5];

			point.x = x;
			point.y = y;
		};

		DisplayObject.prototype.localToGlobal = function (point)
		{
			let matrix = this.getMatrix();

			let parent = this._parent;
			while (parent) {

				matrix = this.multiplicationMatrix(
					parent.getMatrix(),
					matrix
				);

				parent = parent._parent;
			}

			matrix[4] /= 20;
			matrix[5] /= 20;

			const x = point.x * matrix[0] + point.y * matrix[2] + matrix[4];
			const y = point.x * matrix[1] + point.y * matrix[3] + matrix[5];

			point.x = x;
			point.y = y;
		};

		/**
		 * @param a
		 * @param b
		 * @returns []
		 */
		DisplayObject.prototype.multiplicationMatrix = function(a, b)
		{
			return [
				a[0] * b[0] + a[2] * b[1],
				a[1] * b[0] + a[3] * b[1],
				a[0] * b[2] + a[2] * b[3],
				a[1] * b[2] + a[3] * b[3],
				a[0] * b[4] + a[2] * b[5] + a[4],
				a[1] * b[4] + a[3] * b[5] + a[5]
			];
		};

		/**
		 * @param a
		 * @param b
		 * @returns []
		 */
		DisplayObject.prototype.multiplicationColor = function(a, b)
		{
			return [
				a[0] * b[0], a[1] * b[1],
				a[2] * b[2], a[3] * b[3],
				a[0] * b[4] + a[4], a[1] * b[5] + a[5],
				a[2] * b[6] + a[6], a[3] * b[7] + a[7]
			];
		};

		/**
		 * @param bounds
		 * @param matrix
		 * @param object
		 * @returns {{xMin: Number, xMax: number, yMin: Number, yMax: number}}
		 */
		DisplayObject.prototype.boundsMatrix = function(bounds, matrix, object)
		{
			let no = _Number.MAX_VALUE;
			let xMax = -no;
			let yMax = -no;
			let xMin = no;
			let yMin = no;

			if (object) {
				xMin = object.xMin;
				xMax = object.xMax;
				yMin = object.yMin;
				yMax = object.yMax;
			}

			let x0 = bounds.xMax * matrix[0] + bounds.yMax * matrix[2] + matrix[4];
			let x1 = bounds.xMax * matrix[0] + bounds.yMin * matrix[2] + matrix[4];
			let x2 = bounds.xMin * matrix[0] + bounds.yMax * matrix[2] + matrix[4];
			let x3 = bounds.xMin * matrix[0] + bounds.yMin * matrix[2] + matrix[4];
			let y0 = bounds.xMax * matrix[1] + bounds.yMax * matrix[3] + matrix[5];
			let y1 = bounds.xMax * matrix[1] + bounds.yMin * matrix[3] + matrix[5];
			let y2 = bounds.xMin * matrix[1] + bounds.yMax * matrix[3] + matrix[5];
			let y3 = bounds.xMin * matrix[1] + bounds.yMin * matrix[3] + matrix[5];

			xMax = _max(_max(_max(_max(xMax, x0), x1), x2), x3);
			xMin = _min(_min(_min(_min(xMin, x0), x1), x2), x3);
			yMax = _max(_max(_max(_max(yMax, y0), y1), y2), y3);
			yMin = _min(_min(_min(_min(yMin, y0), y1), y2), y3);

			return {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};
		};

		/**
		 * @param color
		 * @param data
		 * @returns {{R: number, G: number, B: number, A: number}}
		 */
		DisplayObject.prototype.generateColorTransform = function(color, data)
		{
			return {
				R: _max(0, _min((color.R * data[0]) + data[4], 255)) | 0,
				G: _max(0, _min((color.G * data[1]) + data[5], 255)) | 0,
				B: _max(0, _min((color.B * data[2]) + data[6], 255)) | 0,
				A: _max(0, _min((color.A * 255 * data[3]) + data[7], 255)) / 255
			};
		};

		/**
		 * @param src
		 * @returns {Array}
		 */
		DisplayObject.prototype.cloneArray = function(src)
		{
			let arr = [];
			let length = src.length;
			for (let i = 0; i < length; i++) {
				arr[i] = src[i];
			}
			return arr;
		};

		/**
		 * @param blendMode
		 * @returns {String}
		 */
		DisplayObject.prototype.getBlendName = function(blendMode)
		{
			let mode = null;
			switch (blendMode) {
				case 1:
				case "normal":
					mode = "normal";
					break;
				case 2:
				case "layer":
					mode = "layer";
					break;
				case 3:
				case "multiply":
					mode = "multiply";
					break;
				case 4:
				case "screen":
					mode = "screen";
					break;
				case 5:
				case "lighten":
					mode = "lighten";
					break;
				case 6:
				case "darken":
					mode = "darken";
					break;
				case 7:
				case "difference":
					mode = "difference";
					break;
				case 8:
				case "add":
					mode = "add";
					break;
				case 9:
				case "subtract":
					mode = "subtract";
					break;
				case 10:
				case "invert":
					mode = "invert";
					break;
				case 11:
				case "alpha":
					mode = "alpha";
					break;
				case 12:
				case "erase":
					mode = "erase";
					break;
				case 13:
				case "overlay":
					mode = "overlay";
					break;
				case 14:
				case "hardlight":
					mode = "hardlight";
					break;
			}
			return mode;
		};

		/**
		 * @param stage
		 */
		DisplayObject.prototype.setStage = function(stage)
		{
			let _this = this;
			_this.stageId = stage.getId();
			if (_this instanceof SimpleButton) {
				let upState = _this.getSprite("up");
				upState.setStage(stage);
				let downState = _this.getSprite("down");
				downState.setStage(stage);
				let hitState = _this.getSprite("hit");
				hitState.setStage(stage);
				let overState = _this.getSprite("over");
				overState.setStage(stage);
			}
			stage.setInstance(_this);
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getStage = function()
		{
			let _this = this;
			let stage = _this.getLoadStage();
			if (!stage) {
				stage = _this.getParentStage();
			}
			return stage;
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getParentStage = function()
		{
			let stageId = this.stageId;
			if (stageId !== null) {
				if (stageId in stages) {
					return stages[stageId];
				} else {
					return loadStages[stageId];
				}
			}
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getLoadStage = function()
		{
			let loadStageId = this.loadStageId;
			if (loadStageId !== null) {
				if (loadStageId in stages) {
					return stages[loadStageId];
				} else {
					return loadStages[loadStageId];
				}
			}
		};

		/**
		 * @param stage
		 */
		DisplayObject.prototype.setLoadStage = function(stage)
		{
			let _this = this;
			_this.loadStageId = null;
			if (stage !== null) {
				stage.setInstance(_this);
				_this.loadStageId = stage.getId();
			}
		};

		/**
		 * @returns {number}
		 */
		DisplayObject.prototype.getCharacterId = function()
		{
			return this.characterId;
		};

		/**
		 * @param characterId
		 */
		DisplayObject.prototype.setCharacterId = function(characterId)
		{
			this.characterId = characterId;
		};

		/**
		 * @returns {number}
		 */
		DisplayObject.prototype.getTagType = function()
		{
			return this.tagType;
		};

		/**
		 * @param tagType
		 */
		DisplayObject.prototype.setTagType = function(tagType)
		{
			this.tagType = tagType;
		};

		/**
		 * @returns {number}
		 */
		DisplayObject.prototype.getRatio = function()
		{
			return this.ratio;
		};

		/**
		 * @param ratio
		 */
		DisplayObject.prototype.setRatio = function(ratio)
		{
			this.ratio = ratio;
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getParent = function()
		{
			let _this = this;
			let stage = _this.getLoadStage();
			let parent;
			let pId = _this.parentId;
			if (stage) {
				parent = stage.getInstance(pId);
			}
			if (!parent) {
				stage = _this.getParentStage();
				parent = stage.getInstance(pId);
			}
			return parent;
		};

		/**
		 * @param parent
		 */
		DisplayObject.prototype.setParent = function(parent)
		{
			let _this = this;
			if (parent instanceof DisplayObjectContainer) {
				parent.setInstance(_this);
			}
			_this.parentId = parent.instanceId;
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getParentSprite = function()
		{
			let _this = this;
			let stage = _this.getStage();
			return stage.getInstance(_this._sprite);
		};

		/**
		 * @param sprite
		 */
		DisplayObject.prototype.setParentSprite = function(sprite)
		{
			this._sprite = sprite.instanceId;
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getButtonStatus = function()
		{
			return this.buttonStatus;
		};

		/**
		 * @param status
		 */
		DisplayObject.prototype.setButtonStatus = function(status)
		{
			this.buttonStatus = status;
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getMask = function()
		{
			return this._mask;
		};

		/**
		 * @param obj
		 */
		DisplayObject.prototype.setMask = function(obj)
		{
			let _this = this;
			let maskMc = _this._mask;
			if (maskMc) {
				maskMc.isMask = false;
			}
			obj.isMask = true;
			_this._mask = obj;
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getEnabled = function()
		{
			return this._enabled;
		};

		/**
		 * @param enabled
		 */
		DisplayObject.prototype.setEnabled = function(enabled)
		{
			this._enabled = enabled;
		};

		/**
		 * @returns {boolean}
		 */
		DisplayObject.prototype.getButtonMode = function()
		{
			return this._buttonMode;
		};

		/**
		 * @param buttonMode
		 */
		DisplayObject.prototype.setButtonMode = function(buttonMode)
		{
			this._buttonMode = buttonMode;
		};

		/**
		 * @returns {string}
		 */
		DisplayObject.prototype.getTarget = function()
		{
			return this._target;
		};

		/**
		 * @param target
		 */
		DisplayObject.prototype.setTarget = function(target)
		{
			this._target = target;
		};

		/**
		 * @param path
		 * @returns {{scope: DisplayObject, target: *}}
		 */
		DisplayObject.prototype.splitPath = function(path)
		{
			let _this = this;
			let scope = _this;
			let target = path;
			let split;
			let targetPath = "";
			if (typeof path === "string") {
				if (path.indexOf("::") !== -1) {
					scope = _this;
					target = path;
				} else if (path.indexOf(":") !== -1) {
					split = path.split(":");
					targetPath = split[0];
					target = split[1];
				} else if (path.indexOf(".") !== -1) {
					split = path.split(".");
					target = split.pop();
					targetPath += split.join(".");
				}

				if (targetPath !== "") {
					let mc = _this.getDisplayObject(targetPath);
					if (mc) {
						scope = mc;
					}
				}
			}

			return {
				"scope": scope,
				"target": target
			};
		};

		/**
		 * @param name
		 * @param parse
		 * @returns {undefined}
		 */
		DisplayObject.prototype.getProperty = function(name, parse)
		{
			let _this = this;
			let target = name;
			if (parse !== false) {
				let obj = _this.splitPath(name);
				_this = obj.scope;
				target = obj.target;
			}

			if (_this.removeFlag) {
				return undefined;
			}

			let value;
			let prop = (typeof target === "string") ? target.toLowerCase() : target;
			switch (prop) {
				case 0:
				case "_x":
					value = _this.getX();
					break;
				case 1:
				case "_y":
					value = _this.getY();
					break;
				case 2:
				case "_xscale":
					value = _this.getXScale();
					break;
				case 3:
				case "_yscale":
					value = _this.getYScale();
					break;
				case 4:
				case "_currentframe":
					if (_this instanceof MovieClip) {
						value = _this.getCurrentFrame();
					}
					break;
				case 5:
				case "_totalframes":
					if (_this instanceof MovieClip) {
						value = _this.getTotalFrames();
					}
					break;
				case 6:
				case "_alpha":
					value = _this.getAlpha();
					break;
				case 7:
				case "_visible":
					value = _this.getVisible();
					break;
				case 8:
				case "_width":
					value = _this.getWidth();
					break;
				case 9:
				case "_height":
					value = _this.getHeight();
					break;
				case 10:
				case "_rotation":
					value = _this.getRotation();
					break;
				case 11:
				case "_target":
					value = _this.getTarget();
					break;
				case 12:
				case "_framesloaded":
					value = _this._framesloaded;
					break;
				case 13:
				case "_name":
					value = _this.getName();
					break;
				case 14:
				case "_droptarget":
					if (_this instanceof MovieClip) {
						value = _this.getDropTarget();
					}
					break;
				case 15:
				case "_url":
					value = _this._url;
					break;
				case 16:
				case "_highquality":
					value = _this._highquality;
					break;
				case 17:
				case "_focusrect":
					value = _this._focusrect;
					break;
				case 18:
				case "_soundbuftime":
					value = _this._soundbuftime;
					break;
				case 19:
				case "_quality":
					value = _this._quality;
					break;
				case 20:
				case "_xmouse":
					value = _this.getXMouse();
					break;
				case 21:
				case "_ymouse":
					value = _this.getYMouse();
					break;
				case "text":
				case "htmltext":
					if (_this instanceof TextField) {
						let variable = _this.getVariable("variable");
						if (variable) {
							let mc = _this.getParent();
							value = mc.getProperty(variable);
						} else {
							value = _this.getVariable("text");
						}
					} else {
						value = _this.getVariable(target);
					}
					break;
				case "$version":
					value = "swf2js 8,0,0";
					break;
				case "enabled":
					value = _this.getEnabled();
					break;
				case "blendmode":
					value = _this.getBlendMode();
					break;
				case "sharedobject":
					value = new SharedObject();
					break;
				case "key":
					value = keyClass;
					break;
				case "mouse":
					let _root = _this.getDisplayObject("_root");
					let rootStage = _root.getStage();
					value = rootStage.mouse;
					break;
				default:
					value = _this.getVariable(target, parse);
					if (value === undefined && target !== name) {
						value = _this.getGlobalVariable(name);
					}
					break;
			}

			return value;
		};

		/**
		 * @param name
		 * @param value
		 * @param parse
		 */
		DisplayObject.prototype.setProperty = function(name, value, parse)
		{
			let _this = this;
			let target = name;
			if (parse !== false) {
				let obj = _this.splitPath(name);
				_this = obj.scope;
				target = obj.target;
			}

			let prop = (typeof target === "string") ? target.toLowerCase() : target;
			switch (prop) {
				case 0:
				case "_x":
					_this.setX(value);
					break;
				case 1:
				case "_y":
					_this.setY(value);
					break;
				case 2:
				case "_xscale":
					_this.setXScale(value);
					break;
				case 3:
				case "_yscale":
					_this.setYScale(value);
					break;
				case 4:
				case "_currentframe":
				case 5:
				case "_totalframes":
				case 15:
				case "_url":
				case 20:
				case "_xmouse":
				case 21:
				case "_ymouse":
				case 11:
				case "_target":
				case 12:
				case "_framesloaded":
				case 14:
				case "_droptarget":
					// readonly
					break;
				case 6:
				case "_alpha":
					_this.setAlpha(value);
					break;
				case 7:
				case "_visible":
					_this.setVisible(value);
					break;
				case 8:
				case "_width":
					_this.setWidth(value);
					break;
				case 9:
				case "_height":
					_this.setHeight(value);
					break;
				case 10:
				case "_rotation":
					_this.setRotation(value);
					break;
				case 13:
				case "_name":
					_this.setName(value);
					break;
				case 16:
				case "_highquality":
					_this._highquality = value;
					break;
				case 17:
				case "_focusrect":
					_this._focusrect = value;
					break;
				case 18:
				case "_soundbuftime":
					_this._soundbuftime = value;
					break;
				case 19:
				case "_quality":
					_this._quality = value;
					break;
				case "text":
				case "htmltext":
					if (_this instanceof TextField) {
						let variable = _this.getVariable("variable");
						if (variable) {
							let mc = _this.getParent();
							mc.setProperty(variable, value);
						} else {
							_this.setVariable("text", value);
						}
						let input = _this.input;
						if (input) {
							input.value = value;
						}
					} else {
						_this.setVariable(target, value);
					}
					break;
				case "blendmode":
					_this.setBlendMode(value);
					break;
				case "enabled":
					_this.setEnabled(value);
					break;
				case "filters":
					_this.setFilters(value);
					break;
				default:
					_this.setVariable(target, value);
					break;
			}
		};

		/**
		 * @returns {number}
		 */
		DisplayObject.prototype.getDepth = function()
		{
			let _this = this;
			let _depth = _this._depth;
			let depth = (_depth !== null) ? _depth : _this.getLevel();
			return depth - 16384;
		};

		/**
		 * @param depth
		 * @param swapDepth
		 * @param swapMc
		 */
		DisplayObject.prototype.setDepth = function(depth, swapDepth, swapMc)
		{
			let _this = this;
			let parent = _this.getParent();
			let _depth = _this._depth;
			let level = (_depth !== null) ? _depth : _this.getLevel();
			let totalFrame = parent.getTotalFrames() + 1;

			if (!swapMc) {
				_this._depth = depth;
			} else {
				_this._depth = swapDepth;
				swapMc._depth = depth;
			}

			let container = parent.container;
			let instanceId = _this.instanceId;
			for (let frame = 1; frame < totalFrame; frame++) {
				if (!(frame in container)) {
					container[frame] = [];
				}

				let tags = container[frame];
				if (swapMc) {
					if (level in tags && tags[level] === instanceId) {
						tags[depth] = swapMc.instanceId;
					}

					if (swapDepth in tags && tags[swapDepth] === swapMc.instanceId) {
						tags[swapDepth] = instanceId;
					}
				} else {
					if (!(level in tags) || level in tags && tags[level] === instanceId) {
						delete tags[level];
						tags[depth] = instanceId;
					}
				}

				container[frame] = tags;
			}
			_this.setController(false, false, false, false);
			if (swapMc) {
				swapMc.setController(false, false, false, false);
			}
		};

		/**
		 * @returns {number}
		 */
		DisplayObject.prototype.getX = function()
		{
			let matrix = this.getMatrix();
			return (matrix) ? matrix[4] / 20 : undefined;
		};

		/**
		 * @param x
		 */
		DisplayObject.prototype.setX = function(x)
		{
			x = +x;
			if (!_isNaN(x)) {
				let _this = this;
				let _matrix = _this.getMatrix();
				let matrix = _this.cloneArray(_matrix);
				matrix[4] = x * 20;
				_this.setMatrix(matrix);
			}
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getY = function()
		{
			let matrix = this.getMatrix();
			return (matrix) ? matrix[5] / 20 : undefined;
		};

		/**
		 * @param y
		 */
		DisplayObject.prototype.setY = function(y)
		{
			y = +y;
			if (!_isNaN(y)) {
				let _this = this;
				let _matrix = _this.getMatrix();
				let matrix = _this.cloneArray(_matrix);
				matrix[5] = y * 20;
				_this.setMatrix(matrix);
			}
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getXScale = function()
		{
		if (this._viewXScale !== null) {
			return this._viewXScale;
		}

			let matrix = this.getMatrix();
			let xScale = _sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]) * 100;
			if (0 > matrix[0]) {
				xScale *= -1;
			}
			return xScale;
		};

		/**
		 * @param xscale
		 */
		DisplayObject.prototype.setXScale = function(xscale)
		{
			xscale = +xscale;
			if (!_isNaN(xscale) && this._viewXScale !== xscale) {
				let _this = this;
				let _matrix = _this.getMatrix();
				let matrix = _this.cloneArray(_matrix);
				let radianX = _atan2(matrix[1], matrix[0]);
				if (radianX === -_PI) {
					radianX = 0;
				}
				this._viewXScale = xscale;
				xscale /= 100;
				matrix[0] = xscale * _cos(radianX);
				matrix[1] = xscale * _sin(radianX);
				_this.setMatrix(matrix);
			}
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getYScale = function()
		{
			if (this._viewYScale !== null) {
				return this._viewYScale;
			}

			let matrix = this.getMatrix();
			let yScale = _sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3]) * 100;
			if (0 > matrix[3]) {
				yScale *= -1;
			}
			return yScale;
		};

		/**
		 * @param yscale
		 */
		DisplayObject.prototype.setYScale = function(yscale)
		{
			yscale = +yscale;
			if (!_isNaN(yscale) && this._viewYScale !== yscale) {
				let _this = this;
				let _matrix = _this.getMatrix();
				let matrix = _this.cloneArray(_matrix);
				let radianY = _atan2(-matrix[2], matrix[3]);
				if (radianY === -_PI) {
					radianY = 0;
				}
				this._viewYScale = yscale;
				yscale /= 100;
				matrix[2] = -yscale * _sin(radianY);
				matrix[3] = yscale * _cos(radianY);
				_this.setMatrix(matrix);
			}
		};

		/**
		 * @returns {number}
		 */
		DisplayObject.prototype.getAlpha = function()
		{
			let colorTransform = this.getColorTransform();
			let alpha = colorTransform[3] + (colorTransform[7] / 255);
			return alpha * 100;
		};

		/**
		 * @param alpha
		 */
		DisplayObject.prototype.setAlpha = function(alpha)
		{
			alpha = +alpha;
			if (!_isNaN(alpha)) {
				let _this = this;
				let _colorTransform = _this.getColorTransform();
				let colorTransform = _this.cloneArray(_colorTransform);
				colorTransform[3] = alpha / 100;
				colorTransform[7] = 0;
				_this.setColorTransform(colorTransform);
			}
		};

		/**
		 * @returns {number}
		 */
		DisplayObject.prototype.getVisible = function()
		{
			let _this = this;
			let stage = _this.getStage();
			let version = stage.getVersion();
			if (version > 4) {
				return _this.__visible;
			}
			return (_this.__visible) ? 1 : 0;
		};

		/**
		 * @param visible
		 */
		DisplayObject.prototype.setVisible = function(visible)
		{
			let _this = this;
			if (typeof visible === "boolean") {
				_this.__visible = visible;
			} else {
				visible = +visible;
				if (!_isNaN(visible)) {
					_this.__visible = (visible) ? true : false;
				}
			}
		};

		/**
		 * @returns {number}
		 */
		DisplayObject.prototype.getLevel = function()
		{
			return this._level;
		};

		/**
		 * @param level
		 */
		DisplayObject.prototype.setLevel = function(level)
		{
			this._level = level;
		};

		/**
		 * @returns {null}
		 */
		DisplayObject.prototype.getName = function()
		{
			return this.__name;
		};

		/**
		 * @param name
		 */
		DisplayObject.prototype.setName = function(name)
		{
			this.__name = name;
		};

		/**
		 * @returns {number}
		 */
		DisplayObject.prototype.getRotation = function()
		{
			if (this._viewRotation !== null) {
				return this._viewRotation * 180 / _PI;
			}

			let matrix = this.getMatrix();
			let rotation = _atan2(matrix[1], matrix[0]) * 180 / _PI;
			switch (rotation) {
				case -90.00000000000001:
					rotation = -90;
					break;
				case 90.00000000000001:
					rotation = 90;
					break;
			}
			return rotation;
		};

		/**
		 * @param rotation
		 */
		DisplayObject.prototype.setRotation = function(rotation)
		{
			rotation = +rotation;
			if (!_isNaN(rotation)) {
				let _this = this;
				let _matrix = _this.getMatrix();
				let matrix = _this.cloneArray(_matrix);
				let radianX = _atan2(matrix[1], matrix[0]);
				let radianY = _atan2(-matrix[2], matrix[3]);
				let ScaleX = _sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]);
				let ScaleY = _sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3]);
				rotation *= _PI / 180;
				radianY += rotation - radianX;
				radianX = rotation;
				matrix[0] = ScaleX * _cos(radianX);
				matrix[1] = ScaleX * _sin(radianX);
				matrix[2] = -ScaleY * _sin(radianY);
				matrix[3] = ScaleY * _cos(radianY);
				_this.setMatrix(matrix);
				this._viewRotation = rotation;
			}
		};

		/**
		 * @returns {number}
		 */
		DisplayObject.prototype.getWidth = function()
		{
			let _this = this;
			let matrix = _this.getMatrix();
			let bounds = _this.getBounds(matrix);
			return _abs(bounds.xMax - bounds.xMin);
		};

		/**
		 * @param width
		 */
		DisplayObject.prototype.setWidth = function(width)
		{
			width = +width;
			if (!_isNaN(width)) {
				let _this = this;
				let _matrix = _this.getOriginMatrix();
				let bounds = _this.getBounds(_matrix);
				let _width = _abs(bounds.xMax - bounds.xMin);
				let xScale = width * _matrix[0] / _width;
				if (_isNaN(xScale)) {
					xScale = 0;
				}
				_matrix = _this.getMatrix();
				let matrix = _this.cloneArray(_matrix);
				matrix[0] = xScale;
				_this.setMatrix(matrix);
			}
		};

		/**
		 * @returns {number}
		 */
		DisplayObject.prototype.getHeight = function()
		{
			let _this = this;
			let matrix = _this.getMatrix();
			let bounds = _this.getBounds(matrix);
			return _abs(bounds.yMax - bounds.yMin);
		};

		/**
		 * @param height
		 */
		DisplayObject.prototype.setHeight = function(height)
		{
			height = +height;
			if (!_isNaN(height)) {
				let _this = this;
				let _matrix = _this.getOriginMatrix();
				let bounds = _this.getBounds(_matrix);
				let _height = _abs(bounds.yMax - bounds.yMin);
				let yScale = height * _matrix[3] / _height;
				if (_isNaN(yScale)) {
					yScale = 0;
				}
				_matrix = _this.getMatrix();
				let matrix = _this.cloneArray(_matrix);
				matrix[3] = yScale;
				_this.setMatrix(matrix);
			}
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getXMouse = function()
		{
			if (!_event) {
				return null;
			}
			let _this = this;
			let _root = _this.getDisplayObject("_root");
			let stage = _root.getStage();
			let div = _document.getElementById(stage.getName());
			let bounds = div.getBoundingClientRect();
			let x = window.pageXOffset + bounds.left;
			let touchX = 0;
			if (_isTouchEvent) {
				let changedTouche = _event.changedTouches[0];
				touchX = changedTouche.pageX;
			} else {
				touchX = _event.pageX;
			}

			let mc = _this;
			let matrix = _this.getMatrix();
			while (true) {
				let parent = mc.getParent();
				if (!parent) {
					break;
				}
				matrix = _this.multiplicationMatrix(parent.getMatrix(), matrix);
				mc = parent;
			}

			let scale = stage.getScale();
			touchX -= x;
			touchX /= scale;
			touchX -= matrix[4] / 20;
			return touchX;
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getYMouse = function()
		{
			if (!_event) {
				return null;
			}
			let _this = this;
			let _root = _this.getDisplayObject("_root");
			let stage = _root.getStage();
			let div = _document.getElementById(stage.getName());
			let bounds = div.getBoundingClientRect();
			let y = window.pageYOffset + bounds.top;
			let touchY = 0;
			if (_isTouchEvent) {
				let changedTouche = _event.changedTouches[0];
				touchY = changedTouche.pageY;
			} else {
				touchY = _event.pageY;
			}

			let mc = _this;
			let matrix = _this.getMatrix();
			while (true) {
				let parent = mc.getParent();
				if (!parent) {
					break;
				}
				matrix = _this.multiplicationMatrix(parent.getMatrix(), matrix);
				mc = parent;
			}

			let scale = stage.getScale();
			touchY -= y;
			touchY /= scale;
			touchY -= matrix[5] / 20;
			return touchY;
		};

		/**
		 * @param name
		 * @param parse
		 * @returns {*}
		 */
		DisplayObject.prototype.getVariable = function(name, parse)
		{
			let _this = this;
			if (name === undefined) {
				return name;
			}

			let variables = _this.variables;
			if (!variables) {
				return undefined;
			}

			if (name in variables) {
				return variables[name];
			}

			let stage = _this.getStage();
			let version = stage.getVersion();
			if (version < 7) {
				for (let key in variables) {
					if (!variables.hasOwnProperty(key)) {
						continue;
					}
					if (key.toLowerCase() === name.toLowerCase()) {
						return variables[key];
					}
				}
			}

			let value;
			if (version > 4) {
				let registerClass = variables.registerClass;
				if (registerClass &&
					typeof registerClass === "object" &&
					name in registerClass
				) {
					return registerClass[name];
				}

				if (_this instanceof MovieClip) {
					value = _this.getDisplayObject(name, parse);
					if (value) {
						return value;
					}
				}

				// avm2
				let cId = _this.getCharacterId();
				let symbol = stage.symbols[cId];
				if (symbol) {
					let symbols = symbol.split(".");
					let classMethod = symbols.pop();
					let sLen = symbols.length;
					let classObj = stage.avm2;
					for (let sIdx = 0; sIdx < sLen; sIdx++) {
						classObj = classObj[symbols[sIdx]];
					}

					let AVM2 = classObj[classMethod];
					value = AVM2[name];
					if (value) {
						return value;
					}
				}

				let _global = stage.getGlobal();
				value = _global.getVariable(name);
				if (value) {
					return value;
				}
				if (_this instanceof MovieClip && name === "flash") {
					return _this.flash;
				}
				if (name in window) {
					return window[name];
				}
			}
			return undefined;
		};

		/**
		 * @param name
		 * @param value
		 */
		DisplayObject.prototype.setVariable = function(name, value)
		{
			let _this = this;
			let variables = _this.variables;
			let stage = _this.getStage();
			if (typeof name !== "string") {
				name += "";
			}

			if (stage.getVersion() < 7) {
				for (let key in variables) {
					if (!variables.hasOwnProperty(key)) {
						continue;
					}
					if (key.toLowerCase() !== name.toLowerCase()) {
						continue;
					}
					_this.variables[key] = value;
					return 0;
				}
			}
			_this.variables[name] = value;
		};

		/**
		 * @param path
		 * @returns {*}
		 */
		DisplayObject.prototype.getGlobalVariable = function(path)
		{
			let _this = this;
			let stage = _this.getStage();
			let version = stage.getVersion();
			if (version < 5) {
				return undefined;
			}

			let splitData = null;
			if (path.indexOf(".") !== -1) {
				splitData = path.split(".");
			}

			let value;
			if (splitData) {
				let _global = stage.getGlobal();
				let variables = _global.variables;
				let length = splitData.length;
				for (let i = 0; i < length; i++) {
					let name = splitData[i];
					if (version < 7) {
						for (let key in variables) {
							if (!variables.hasOwnProperty(key)) {
								continue;
							}
							if (key.toLowerCase() === name.toLowerCase()) {
								value = variables[key];
								break;
							}
						}
					} else {
						value = variables[name];
					}

					if (!value) {
						break;
					}
					variables = value;
				}
			}

			return value;
		};

		/**
		 * @param path
		 * @param parse
		 * @returns {*}
		 */
		DisplayObject.prototype.getDisplayObject = function(path, parse)
		{
			let _this = this;
			let mc = _this;
			let _root = mc;
			let tags, tag, stage, parent;

			if (!_this._lockroot) {
				while (true) {
					parent = _root.getParent();
					if (!parent) {
						break;
					}
					_root = parent;
				}
			} else {
				stage = _this.getStage();
				_root = stage.getParent();
			}

			if (typeof path !== "string") {
				path += "";
			}
			if (path === "_root") {
				return _root;
			}
			if (path === "this") {
				return this;
			}
			stage = _root.getStage();
			if (path === "_global") {
				return stage.getGlobal();
			}

			parent = mc.getParent();
			if (path === "_parent") {
				return (parent !== null) ? parent : undefined;
			}

			let len = 1;
			let splitData = [path];
			if (parse !== false) {
				if (path.indexOf("/") !== -1) {
					splitData = path.split("/");
					len = splitData.length;
					if (splitData[0] === "") {
						mc = _root;
					}
				} else if (path.indexOf(".") !== -1) {
					splitData = path.split(".");
					len = splitData.length;
					if (splitData[0] === "_root") {
						mc = _root;
					}
				} else if (path.substr(0, 6) === "_level") {
					let level = path.substr(6);
					level = +level;
					if (level === 0) {
						return _root;
					}
					if (!parent) {
						parent = stage.getParent();
					}
					tags = parent.getTags();
					if (level in tags) {
						let tId = tags[level];
						tag = stage.getInstance(tId);
						if (tag instanceof MovieClip) {
							return tag;
						}
					}
					return undefined;
				}
			}

			let version = stage.getVersion();
			for (let i = 0; i < len; i++) {
				let name = splitData[i];
				if (name === "") {
					continue;
				}
				if (name === "_root") {
					mc = _root;
					continue;
				}
				if (name === "this") {
					mc = _this;
					continue;
				}
				if (name === "_parent") {
					parent = mc.getParent();
					if (!parent) {
						return undefined;
					}
					mc = parent;
					continue;
				}
				if (name === "..") {
					mc = mc.getParent();

					if (!mc) {
						return undefined;
					}
					continue;
				}

				tags = mc.getTags();
				if (tags === undefined) {
					return undefined;
				}

				let tagLength = tags.length;
				let setTarget = false;
				if (tagLength > 0) {
					for (let idx in tags) {
						if (!tags.hasOwnProperty(idx)) {
							continue;
						}

						let instanceId = tags[idx];
						let loadStage = mc.getStage();
						tag = loadStage.getInstance(instanceId);
						if (!tag || tag.removeFlag) {
							continue;
						}

						let tagName = tag.getName();
						if (!tagName) {
							continue;
						}

						if (version < 7) {
							if (tagName.toLowerCase() === name.toLowerCase()) {
								mc = tag;
								setTarget = true;
								break;
							}
						} else {
							if (tagName === name) {
								mc = tag;
								setTarget = true;
								break;
							}
						}
					}
				}

				if (!setTarget) {
					return undefined;
				}
			}
			return mc;
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @param visible
		 */
		DisplayObject.prototype.preRender = function(ctx, matrix, colorTransform, stage, visible)
		{
			let _this = this;
			_this.isLoad = true;

			let cacheKey = "";
			let preCtx = ctx;
			let preMatrix = matrix;

			let isFilter = false;
			let isBlend = false;
			let cache, rMatrix, xScale, yScale, xMin, yMin, xMax, yMax;

			// mask
			let maskObj = _this.getMask();
			if (maskObj) {
				_this.renderMask(ctx, stage);
			}

			// filter
			if (visible && !stage.clipMc) {
				let filters = _this.getFilters();
				if (filters !== null && filters.length) {
					isFilter = true;
				}

				// blend
				let blendMode = _this.getBlendMode();
				if (blendMode !== null && blendMode !== "normal") {
					isBlend = true;
				}
			}

			// filter or blend
			if (isFilter || isBlend) {
				rMatrix = _this.multiplicationMatrix(stage.getMatrix(), matrix);

				let bounds;
				let twips = 1;
				if (_this instanceof Shape || _this instanceof StaticText) {
					bounds = _this.getBounds();
					xScale = _sqrt(rMatrix[0] * rMatrix[0] + rMatrix[1] * rMatrix[1]);
					yScale = _sqrt(rMatrix[2] * rMatrix[2] + rMatrix[3] * rMatrix[3]);
				} else {
					twips = 20;
					bounds = _this.getBounds(matrix);
					xScale = stage.getScale() * _devicePixelRatio;
					yScale = stage.getScale() * _devicePixelRatio;
				}

				xMin = bounds.xMin;
				yMin = bounds.yMin;
				xMax = bounds.xMax;
				yMax = bounds.yMax;

				let width = _abs(_ceil((xMax - xMin) * xScale));
				let height = _abs(_ceil((yMax - yMin) * yScale));

				let canvas = cacheStore.getCanvas();
				canvas.width = width;
				canvas.height = height;
				cache = canvas.getContext("2d");
				cache._offsetX = 0;
				cache._offsetY = 0;

				let m2 = [1, 0, 0, 1, -xMin * twips, -yMin * twips];
				let m3 = [matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]];
				if (_this instanceof Shape) {
					m3[4] = 0;
					m3[5] = 0;
				}
				preCtx = cache;
				preMatrix = _this.multiplicationMatrix(m2, m3);
			}

			// graphics
			if (visible) {
				cacheKey += _this.renderGraphics(preCtx, preMatrix, colorTransform, stage);
			}

			return {
				preCtx: preCtx,
				preMatrix: preMatrix,
				isFilter: isFilter,
				isBlend: isBlend,
				rMatrix: rMatrix,
				cacheKey: cacheKey,
				xMin: xMin * xScale,
				yMin: yMin * yScale
			};
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @param obj
		 */
		DisplayObject.prototype.postRender = function(ctx, matrix, colorTransform, stage, obj)
		{
			let _this = this;
			let cache = obj.preCtx;
			let isFilter = obj.isFilter;
			let cacheKey = obj.cacheKey;
			if (isFilter && cacheKey !== "") {
				cache = _this.renderFilter(cache, matrix, colorTransform, stage, cacheKey);
			}

			let xMin = obj.xMin;
			let yMin = obj.yMin;
			if (_this instanceof Shape) {
				xMin += obj.rMatrix[4];
				yMin += obj.rMatrix[5];
			}
			if (cache) {
				xMin -= cache._offsetX;
				yMin -= cache._offsetY;
			}

			_this.renderBlend(ctx, cache, xMin, yMin, isFilter);
		};


		/**
		 * @param ctx
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @returns {string}
		 */
		DisplayObject.prototype.renderGraphics = function(ctx, matrix, colorTransform, stage)
		{
			let graphics = this.graphics;
			let cacheKey = "";
			if (graphics && graphics.isDraw) {
				cacheKey = graphics.render(ctx, matrix, colorTransform, stage);
			}
			return cacheKey;
		};

		/**
		 * @param ctx
		 * @param stage
		 */
		DisplayObject.prototype.renderMask = function(ctx, stage)
		{
			let _this = this;
			let maskObj = _this.getMask();
			if (maskObj) {
				ctx.save();
				ctx.beginPath();
				stage.clipMc = true;

				let mc = maskObj;
				let matrix = [1, 0, 0, 1, 0, 0];
				let _multiplicationMatrix = _this.multiplicationMatrix;
				while (true) {
					let parent = mc.getParent();
					if (!parent.getParent()) {
						break;
					}
					matrix = _multiplicationMatrix(parent.getMatrix(), matrix);
					mc = parent;
				}
				maskObj.render(ctx, matrix, [1, 1, 1, 1, 0, 0, 0, 0], stage, true);
				ctx.clip();
				stage.clipMc = false;
			}
		};

		/**
		 * @param filters
		 * @returns {string}
		 */
		DisplayObject.prototype.getFilterKey = function(filters)
		{
			let keys = [];
			let length = filters.length;
			for (let i = 0; i < length; i++) {
				let filter = filters[i];
				for (let prop in filter) {
					if (!filter.hasOwnProperty(prop)) {
						continue;
					}
					keys[keys.length] = filter[prop];
				}
			}
			return keys.join("_");
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @param cacheKey
		 * @returns {*}
		 */
		DisplayObject.prototype.renderFilter = function(ctx, matrix, colorTransform, stage, cacheKey)
		{
			let _this = this;
			let filters = _this.getFilters();
			if (stage.clipMc || !filters || !filters.length) {
				return ctx;
			}

			cacheKey += "_" + _this.getFilterKey(filters);
			let cacheStoreKey = "Filter_" + _this.instanceId;

			let cache;
			if (_this._filterCacheKey === cacheKey) {
				cache = cacheStore.getCache(cacheStoreKey);
			}

			if (!cache) {
				let fLength = filters.length;
				for (let i = 0; i < fLength; i++) {
					let filter = filters[i];
					cache = filter.render(ctx, matrix, colorTransform, stage);
				}
				_this._filterCacheKey = cacheKey;
				cacheStore.setCache(cacheStoreKey, cache);
			}

			cacheStore.destroy(ctx);

			return cache;
		};

		/**
		 * @param ctx
		 * @param cache
		 * @param xMin
		 * @param yMin
		 * @param isFilter
		 */
		DisplayObject.prototype.renderBlend = function(ctx, cache, xMin, yMin, isFilter)
		{
			let _this = this;
			let mode = _this.getBlendMode();
			let operation = "source-over";
			let canvas = cache.canvas;
			let width = canvas.width;
			let height = canvas.height;
			if (!width || !height) {
				return ;
			}

			cache.setTransform(1, 0, 0, 1, 0, 0);

			switch (mode) {
				case "multiply":
					operation = "multiply";
					break;
				case "screen":
					operation = "screen";
					break;
				case "lighten":
					operation = "lighten";
					break;
				case "darken":
					operation = "darken";
					break;
				case "difference":
					operation = "difference";
					break;
				case "add":
					operation = "lighter";
					break;
				case "subtract":
					cache.globalCompositeOperation = "difference";
					cache.fillStyle = "rgb(255,255,255)";
					cache.fillRect(0, 0, width, height);
					cache.globalCompositeOperation = "darken";
					cache.fillStyle = "rgb(255,255,255)";
					cache.fillRect(0, 0, width, height);
					operation = "color-burn";
					break;
				case "invert":
					cache.globalCompositeOperation = "difference";
					cache.fillStyle = "rgb(255,255,255)";
					cache.fillRect(0, 0, width, height);
					cache.globalCompositeOperation = "lighter";
					cache.fillStyle = "rgb(255,255,255)";
					cache.fillRect(0, 0, width, height);
					operation = "difference";
					break;
				case "alpha":
					operation = "source-over";
					break;
				case "erase":
					operation = "destination-out";
					break;
				case "overlay":
					operation = "overlay";
					break;
				case "hardlight":
					operation = "hard-light";
					break;
			}

			ctx.globalAlpha = 1;
			ctx.globalCompositeOperation = operation;
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.drawImage(canvas, xMin, yMin, canvas.width, canvas.height);
			ctx.globalCompositeOperation = "source-over";
			if (!isFilter) {
				cacheStore.destroy(cache);
			}
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getOriginMatrix = function()
		{
			let _this = this;
			let controller = _this.getController();
			return controller.getMatrix();
		};

		/**
		 * @returns []
		 */
		DisplayObject.prototype.getMatrix = function()
		{
			return this._matrix || this.getOriginMatrix();
		};

		/**
		 * @param matrix
		 */
		DisplayObject.prototype.setMatrix = function(matrix)
		{
			let _this = this;
			_this._matrix = matrix;
			_this.setController(true, false, false, false);
		};

		/**
		 * @returns {*}
		 */
		DisplayObject.prototype.getOriginColorTransform = function()
		{
			let _this = this;
			let controller = _this.getController();
			return controller.getColorTransform();
		};

		/**
		 * @returns []
		 */
		DisplayObject.prototype.getColorTransform = function()
		{
			return this._colorTransform || this.getOriginColorTransform();
		};

		/**
		 * @param colorTransform
		 */
		DisplayObject.prototype.setColorTransform = function(colorTransform)
		{
			let _this = this;
			_this._colorTransform = colorTransform;
			_this.setController(false, true, false, false);
		};

		/**
		 * @returns {string}
		 */
		DisplayObject.prototype.getOriginBlendMode = function()
		{
			let _this = this;
			let controller = _this.getController();
			return controller.getBlendMode();
		};

		/**
		 * @returns {string}
		 */
		DisplayObject.prototype.getBlendMode = function()
		{
			return this._blendMode || this.getOriginBlendMode();
		};

		/**
		 * @param blendMode
		 */
		DisplayObject.prototype.setBlendMode = function(blendMode)
		{
			let _this = this;
			let mode = _this.getBlendName(blendMode);
			if (mode !== null) {
				_this._blendMode = mode;
				_this.setController(false, false, false, true);
			}
		};

		/**
		 * @returns {Array}
		 */
		DisplayObject.prototype.getOriginFilters = function()
		{
			let _this = this;
			let controller = _this.getController();
			return controller.getFilters();
		};

		/**
		 * @returns {Array}
		 */
		DisplayObject.prototype.getFilters = function()
		{
			return this._filters || this.getOriginFilters();
		};

		/**
		 * @param filters
		 */
		DisplayObject.prototype.setFilters = function(filters)
		{
			let _this = this;
			_this._filterCacheKey = null;
			_this._filters = filters;
			_this.setController(false, false, true, false);
		};

		/**
		 * @param isMatrix
		 * @param isColorTransform
		 * @param isFilters
		 * @param isBlend
		 */
		DisplayObject.prototype.setController = function(isMatrix, isColorTransform, isFilters, isBlend)
		{
			let _this = this;

			if (!isMatrix) {
				let _matrix = _this._matrix;
				if (_matrix === null) {
					_matrix = _this.getMatrix();
					_this._matrix = _this.cloneArray(_matrix);
				}
			}

			if (!isColorTransform) {
				let _colorTransform = _this._colorTransform;
				if (_colorTransform === null) {
					_colorTransform = _this.getColorTransform();
					_this._colorTransform = _this.cloneArray(_colorTransform);
				}
			}

			if (!isFilters) {
				let _filters = _this._filters;
				if (_filters === null) {
					_filters = _this.getFilters();
					if (_filters === null) {
						_filters = [];
					}
					_this._filters = _filters;
				}
			}

			if (!isBlend) {
				let _blendMode = _this._blendMode;
				if (_blendMode === null) {
					_blendMode = _this.getBlendMode();
					_this._blendMode = _blendMode;
				}
			}
		};

		/**
		 * @returns {PlaceObject}
		 */
		DisplayObject.prototype.getController = function()
		{
			let _this = this;
			let frame = 0;
			let depth = _this.getLevel();
			let stage = _this.getParentStage();
			if (!stage) {
				return new PlaceObject();
			}

			let parent = _this.getParentSprite();
			if (!parent) {
				parent = _this.getParent();
			}
			if (!parent) {
				return new PlaceObject();
			}

			if (parent instanceof MovieClip) {
				frame = parent.getCurrentFrame();
			}
			let placeObject = stage.getPlaceObject(parent.instanceId, depth, frame);
			if (!placeObject) {
				stage = _this.getLoadStage();
				if (stage) {
					placeObject = stage.getPlaceObject(parent.instanceId, depth, frame);
				}
			}

			return placeObject || new PlaceObject();
		};

		/**
		 * reset
		 */
		DisplayObject.prototype.reset = function()
		{
			let _this = this;
			_this.active = false;
			_this.isMask = false;
			_this._matrix = null;
			_this._colorTransform = null;
			_this._filters = null;
			_this._blendMode = null;
			_this._depth = null;
			_this.setVisible(true);
			_this.setEnabled(true);
			_this.setButtonStatus("up");

			if (_this instanceof TextField) {
				let input = _this.input;
				if (_this.inputActive) {
					_this.inputActive = false;
					input.onchange = null;
					let stage = _this.getStage();
					let div = _document.getElementById(stage.getName());
					if (div) {
						let el = _document.getElementById(_this.getTagName());
						if (el) {
							try {
								div.removeChild(el);
							} catch (e) {

							}
						}
					}
				}
				_this.variables.text = _this.initialText;
			}
		};

		/**
		 * trace
		 */
		DisplayObject.prototype.trace = function()
		{
			let params = ["[trace]"];
			let length = arguments.length;
			for (let i = 0; i < length; i++) {
				params[params.length] = arguments[i];
			}
			console.log.apply(window, params);
		};

		/**
		 * @constructor
		 */
		let InteractiveObject = function()
		{
			let _this = this;
			_this._mouseEnabled = true;
			DisplayObject.call(_this);
		};

		/**
		 * extends
		 * @type {DisplayObject}
		 */
		InteractiveObject.prototype = Object.create(DisplayObject.prototype);
		InteractiveObject.prototype.constructor = InteractiveObject;

		/**
		 * properties
		 */
		Object.defineProperties(DisplayObject.prototype,
		{
			mouseEnabled: {
				get: function() {
					return this.getMouseEnabled();
				},
				set: function(mouseEnabled) {
					this.setMouseEnabled(mouseEnabled);
				}
			}
		});

		/**
		 * @returns {boolean}
		 */
		InteractiveObject.prototype.getMouseEnabled = function()
		{
			return this._mouseEnabled;
		};

		/**
		 * @param mouseEnabled
		 */
		InteractiveObject.prototype.setMouseEnabled = function(mouseEnabled)
		{
			this._mouseEnabled = mouseEnabled;
		};

		/**
		 * @constructor
		 */
		let TextSnapshot = function()
		{
			this.charCount = 0;
		};

		/**
		 * @param beginIndex
		 * @param textToFind
		 * @param caseSensitive
		 */
		TextSnapshot.prototype.findText = function(beginIndex, textToFind, caseSensitive)
		{

		};

		/**
		 * @param beginIndex
		 * @param endIndex
		 */
		TextSnapshot.prototype.getSelected = function(beginIndex, endIndex)
		{

		};

		/**
		 * @param includeLineEndings
		 */
		TextSnapshot.prototype.getSelectedText = function(includeLineEndings)
		{

		};

		TextSnapshot.prototype.getText = function(beginIndex, endIndex, includeLineEndings)
		{

		};

		/**
		 * @param beginIndex
		 * @param endIndex
		 */
		TextSnapshot.prototype.getTextRunInfo = function(beginIndex, endIndex)
		{

		};

		/**
		 * @param x
		 * @param y
		 * @param maxDistance
		 */
		TextSnapshot.prototype.hitTestTextNearPos = function(x, y, maxDistance)
		{

		};

		/**
		 * @param hexColor
		 */
		TextSnapshot.prototype.setSelectColor = function(hexColor)
		{

		};

		/**
		 * @param beginIndex
		 * @param endIndex
		 * @param select
		 */
		TextSnapshot.prototype.setSelected = function(beginIndex, endIndex, select)
		{

		};

		/**
		 * @constructor
		 */
		let DisplayObjectContainer = function()
		{
			let _this = this;
			InteractiveObject.call(_this);

			_this._mouseChildren = true;
			_this._tabChildren = true;
			_this._textSnapshot = new TextSnapshot();
			_this._numChildren = 0;
			_this.SoundId = null;
			_this.SoundInfo = null;
			_this.startSounds = [];
			_this.container = [];
			if (_this instanceof MovieClip) {
				let totalFrames = _this.getTotalFrames() + 1;
				let frame = 1;
				while (frame < totalFrames) {
					_this.container[frame++] = [];
				}
			}
			_this.instances = [];
			_this.isSwap = false;
		};

		/**
		 * extends
		 * @type {InteractiveObject}
		 */
		DisplayObjectContainer.prototype = Object.create(InteractiveObject.prototype);
		DisplayObjectContainer.prototype.constructor = DisplayObjectContainer;

		/**
		 * properties
		 */
		Object.defineProperties(DisplayObjectContainer.prototype,
		{
			mouseChildren: {
				get: function() {
					return this.getMouseChildren();
				},
				set: function(mouseChildren) {
					this.setMouseChildren(mouseChildren);
				}
			},
			textSnapshot: {
				get: function() {
					return this.getTextSnapshot();
				},
				set: function() {
				}
			},
			numChildren: {
				get: function() {
					return this.getNumChildren();
				},
				set: function() {
				}
			},
			tabChildren: {
				get: function() {
					return this.getTabChildren();
				},
				set: function(tabChildren) {
					this.setTabChildren(tabChildren);
				}
			}
		});

		/**
		 * @returns {boolean}
		 */
		DisplayObjectContainer.prototype.getMouseChildren = function()
		{
			return this._mouseChildren;
		};

		/**
		 * @param mouseChildren
		 */
		DisplayObjectContainer.prototype.setMouseChildren = function(mouseChildren)
		{
			this._mouseChildren = mouseChildren;
		};

		/**
		 * @returns {TextSnapshot}
		 */
		DisplayObjectContainer.prototype.getTextSnapshot = function()
		{
			return this._textSnapshot;
		};

		/**
		 * @returns {number}
		 */
		DisplayObjectContainer.prototype.getNumChildren = function()
		{
			return this._numChildren;
		};

		/**
		 * @returns {boolean}
		 */
		DisplayObjectContainer.prototype.getTabChildren = function()
		{
			return this._tabChildren;
		};

		/**
		 * @param tabChildren
		 */
		DisplayObjectContainer.prototype.setTabChildren = function(tabChildren)
		{
			this._tabChildren = tabChildren;
		};

		/**
		 * @returns {Array}
		 */
		DisplayObjectContainer.prototype.getContainer = function()
		{
			return this.container;
		};

		/**
		 * @returns {Array}
		 */
		DisplayObjectContainer.prototype.getInstances = function()
		{
			return this.instances;
		};

		/**
		 * @param instance
		 */
		DisplayObjectContainer.prototype.setInstance = function(instance)
		{
			let instances = this.instances;
			let instanceId = instance.instanceId;
			if (!(instanceId in instances)) {
				instances[instanceId] = 1;
			}
		};

		/**
		 * @param instance
		 */
		DisplayObjectContainer.prototype.deleteInstance = function(instance)
		{
			delete this.instances[instance.instanceId];
		};

		/**
		 * @param child
		 * @param depth
		 * @returns {DisplayObject}
		 */
		DisplayObjectContainer.prototype.addChild = function(child, depth)
		{
			if (child instanceof DisplayObject) {
				let _this = this;

				if (depth === undefined) {
					depth = _this._numChildren;
				}

				let stage = _this.getStage();
				child.setParent(_this);
				child.setStage(stage);
				child.setLevel(depth);

				let container = _this.getContainer();
				let frame = 1;
				let placeObject = new PlaceObject();
				let instanceId = _this.instanceId;
				if (_this instanceof MovieClip) {
					let totalFrames = _this.getTotalFrames() + 1;
					for (; frame < totalFrames; frame++) {
						if (!(frame in container)) {
							container[frame] = [];
						}
						stage.setPlaceObject(placeObject, instanceId, depth, frame);
						container[frame][depth] = child.instanceId;
					}
				} else {
					stage.setPlaceObject(placeObject, instanceId, depth, frame);
					container[depth] = child.instanceId;
				}

				_this._numChildren++;
			}
			return child;
		};

		/**
		 * @param child
		 * @param depth
		 * @returns {DisplayObject}
		 */
		DisplayObjectContainer.prototype.addChildAt = function(child, depth)
		{
			return this.addChild(child, depth);
		};

		/**
		 *
		 * @param depth
		 * @returns {DisplayObject}
		 */
		DisplayObjectContainer.prototype.getChildAt = function(depth)
		{
			let _this = this;
			let container = _this.getContainer();
			let children = container;

			if (16384 > depth) {
				depth += 16384;
			}

			if (_this instanceof MovieClip) {
				let frame = _this.getCurrentFrame();
				children = container[frame];
			}
			return children[depth];
		};

		/**
		 * @param name
		 * @return {DisplayObject}
		 */
		DisplayObjectContainer.prototype.getChildByName = function(name)
		{
			let _this = this;
			let container = _this.getContainer();
			let children = container;
			if (_this instanceof MovieClip) {
				let frame = _this.getCurrentFrame();
				children = container[frame];
			}

			let obj;
			for (let depth in children) {
				if (!children.hasOwnProperty(depth)) {
					continue;
				}

				let child = children[depth];
				if (child.getName() !== name) {
					continue;
				}
				obj = child;
				break;
			}
			return obj;
		};

		/**
		 * @param child
		 * @returns {number}
		 */
		DisplayObjectContainer.prototype.getChildIndex = function(child)
		{
			let index;
			if (child instanceof DisplayObject) {
				index = child.getLevel() - 16384;
			}
			return index;
		};

		/**
		 * @param child
		 * @return {DisplayObject}
		 */
		DisplayObjectContainer.prototype.removeChild = function(child)
		{
			let _this = this;
			let container = _this.getContainer();
			let depth, obj;
			if (_this instanceof MovieClip) {
				let totalFrames = _this.getTotalFrames() + 1;
				for (let frame = 1; frame < totalFrames; frame++) {
					if (!(frame in container)) {
						continue;
					}
					let children = container[frame];
					for (depth in children) {
						if (!children.hasOwnProperty(depth)) {
							continue;
						}
						let instanceId = children[depth];
						if (instanceId !== child.instanceId) {
							continue;
						}
						delete container[frame][depth];
						break;
					}
				}
			} else {
				for (depth in container) {
					if (!container.hasOwnProperty(depth)) {
						continue;
					}
					obj = container[depth];
					if (obj.instanceId !== child.instanceId) {
						continue;
					}
					delete container[depth];
					break;
				}
			}

			if (child) {
				_this.deleteInstance(child);
				_this._numChildren--;
			}

			return child;
		};

		/**
		 * @param depth
		 * @returns {*}
		 */
		DisplayObjectContainer.prototype.removeChildAt = function(depth)
		{
			let _this = this;
			let container = _this.getContainer();
			let children = container;

			if (16384 > depth) {
				depth += 16384;
			}

			let child;
			if (_this instanceof MovieClip) {
				let totalFrames = _this.getTotalFrames();
				for (let frame = 1; frame < totalFrames; frame++) {
					if (!(frame in container)) {
						continue;
					}

					children = container[frame];
					if (!(depth in children)) {
						continue;
					}

					child = children[depth];
					delete container[frame][depth];
				}
			} else {
				child = children[depth];
				delete children[depth];
			}

			if (child) {
				_this._numChildren--;
			}

			return child;
		};

		/**
		 * @param depth
		 * @param obj
		 */
		DisplayObjectContainer.prototype.addTag = function(depth, obj)
		{
			let _this = this;
			_this.container[depth] = obj.instanceId;
			_this._numChildren++;
		};

		/**
		 * startSound
		 */
		DisplayObjectContainer.prototype.startSound = function()
		{
			let _this = this;
			let soundId = _this.SoundId;
			if (_this.SoundId) {
				let stage = _this.getStage();
				if (stage.sounds[soundId]) stage.startSound({ SoundID: _this.SoundId, SoundInfo: _this.SoundInfo});
			}
		};

		/**
		 * reset
		 */
		DisplayObjectContainer.prototype.reset = function()
		{
			let _this = this;
			let container = _this.container;
			let length = container.length;
			if (length) {
				let stage = _this.getStage();
				for (let depth in container) {
					if (!container.hasOwnProperty(depth)) {
						continue;
					}

					let instanceId = container[depth];
					let obj = stage.getInstance(instanceId);
					obj.reset();
				}
			}

			_this.isMask = false;
			_this._depth = null;
			_this._matrix = null;
			_this._colorTransform = null;
			_this._filters = null;
			_this._blendMode = null;
			_this.mouseEnabled = true;
		};

		/**
		 * @param matrix
		 * @param stage
		 * @param visible
		 * @param mask
		 */
		DisplayObjectContainer.prototype.setHitRange = function(matrix, stage, visible, mask)
		{
			let _this = this;
			let isVisible = _min(_this.getVisible(), visible);
			if (_this.getEnabled() && isVisible) {
				let buttonHits = stage.buttonHits;
				let variables = _this.variables;
				let events = _this.events;
				if (events.press !== undefined ||
					events.release !== undefined ||
					events.releaseOutside !== undefined ||
					events.rollOver !== undefined ||
					events.rollOut !== undefined ||
					events.dragOver !== undefined ||
					events.dragOut !== undefined ||
					variables.onPress !== undefined ||
					variables.onRelease !== undefined ||
					variables.onRollOver !== undefined ||
					variables.onReleaseOutside !== undefined ||
					variables.onRollOut !== undefined ||
					variables.onDragOver !== undefined ||
					variables.onDragOut !== undefined
				) {
					let rMatrix = _this.multiplicationMatrix(matrix, _this.getMatrix());
					let bounds = _this.getBounds(rMatrix);
					buttonHits[buttonHits.length] = {
						xMax: bounds.xMax,
						xMin: bounds.xMin,
						yMax: bounds.yMax,
						yMin: bounds.yMin,
						parent: _this,
						matrix: _this.cloneArray(matrix)
					};
				}
			}
		};

		/**
		 *
		 * @param name
		 * @param depth
		 * @returns {MovieClip}
		 */
		DisplayObjectContainer.prototype.createMovieClip = function(name, depth)
		{
			let movieClip = new MovieClip();
			movieClip = this.addChild(movieClip, depth);
			if (name) {
				movieClip.setName(name);
			}
			return movieClip;
		};

		/**
		 * @param name
		 * @param depth
		 * @returns {Sprite}
		 */
		DisplayObjectContainer.prototype.createSprite = function(name, depth)
		{
			let sprite = new Sprite();
			sprite = this.addChild(sprite, depth);
			if (name) {
				sprite.setName(name);
			}
			return sprite;
		};

		/**
		 * @param name
		 * @param depth
		 * @returns {SimpleButton}
		 */
		DisplayObjectContainer.prototype.createButton = function(name, depth)
		{
			let button = new SimpleButton();
			button = this.addChild(button, depth);
			if (name) {
				button.setName(name);
			}
			return button;
		};

		/**
		 * @param name
		 * @param width
		 * @param height
		 * @param depth
		 * @returns {TextField}
		 */
		DisplayObjectContainer.prototype.createText = function(name, width, height, depth)
		{
			let textField = new TextField(name, depth, width, height);
			textField = this.addChild(textField, depth);
			textField.setInitParams();
			if (name) {
				textField.setName(name);
			}
			textField.size = 12;
			return textField;
		};

		/**
		 * @returns {Shape}
		 */
		DisplayObjectContainer.prototype.createShape = function(depth)
		{
			let shape = new Shape();
			this.addChild(shape, depth);
			return shape;
		};

		/**
		 * @constructor
		 */
		let Sprite = function()
		{
			let _this = this;
			DisplayObjectContainer.call(_this);

			_this.touchPointID = 0;
			_this._buttonMode = false;
			_this._useHandCursor = false;
			_this._dropTarget = null;
			_this._hitArea = null;
			_this._graphics = new Graphics();
			_this._soundTransform = new SoundTransform();
			_this.soundStopFlag = false;
			_this.stopFlag = false;
		};

		/**
		 * extends
		 * @type {DisplayObjectContainer}
		 */
		Sprite.prototype = Object.create(DisplayObjectContainer.prototype);
		Sprite.prototype.constructor = Sprite;

		/**
		 * properties
		 */
		Object.defineProperties(Sprite.prototype,
		{
			graphics: {
				get: function() {
					return this.getGraphics();
				},
				set: function() {
				}
			},
			hitArea: {
				get: function() {
					return this.getHitArea();
				},
				set: function(sprite) {
					this.setHitArea(sprite);
				}
			},
			buttonMode: {
				get: function() {
					return this.getButtonMode();
				},
				set: function(buttonMode) {
					this.setButtonMode(buttonMode);
				}
			},
			soundTransform: {
				get: function() {
					return this._soundTransform;
				},
				set: function() {
				}
			},
			useHandCursor: {
				get: function() {
					return this.getUseHandCursor();
				},
				set: function(useHandCursor) {
					this.setUseHandCursor(useHandCursor);
				}
			},
			dropTarget: {
				get: function() {
					return this.getDropTarget();
				},
				set: function() {
					this.setDropTarget();
				}
			}
		});

		/**
		 * @returns {Graphics}
		 */
		Sprite.prototype.getGraphics = function()
		{
			return this._graphics;
		};

		/**
		 * @returns {DisplayObject}
		 */
		Sprite.prototype.getHitArea = function()
		{
			return this._hitArea;
		};

		/**
		 * @param displayObject
		 */
		Sprite.prototype.setHitArea = function(displayObject)
		{
			this._hitArea = displayObject;
		};

		/**
		 * @returns {boolean}
		 */
		Sprite.prototype.getUseHandCursor = function()
		{
			return this._useHandCursor;
		};

		/**
		 * @param useHandCursor
		 */
		Sprite.prototype.setUseHandCursor = function(useHandCursor)
		{
			this._useHandCursor = useHandCursor;
		};

		/**
		 * startTouchDrag
		 */
		Sprite.prototype.startTouchDrag = function(touchPointID, lock, bounds)
		{
			this.startDrag(lock);
		};

		/**
		 * @param touchPointID
		 */
		Sprite.prototype.stopTouchDrag = function(touchPointID)
		{
			this.stopDrag();
		};

		/**
		 * startDrag
		 */
		Sprite.prototype.startDrag = function()
		{
			let args = arguments;
			let lock = args[0];
			let left = args[1];
			let top = args[2];
			let right = args[3];
			let bottom = args[4];

			let _this = this;
			let _root = _this.getDisplayObject("_root");
			let stage = _root.getStage();
			let startX = 0;
			let startY = 0;
			if (!lock) {
				startX = _this.getXMouse();
				startY = _this.getYMouse();
			}

			stage.dragMc = _this;
			stage.dragRules = {
				startX: startX,
				startY: startY,
				left: left,
				top: top,
				right: right,
				bottom: bottom
			};

			_this.setDropTarget();
		};

		/**
		 * stopDrag
		 */
		Sprite.prototype.stopDrag = function()
		{
			let _this = this;
			let _root = _this.getDisplayObject("_root");
			let stage = _root.getStage();
			stage.dragMc = null;
			stage.dragRules = null;
			_this.setDropTarget();
		};

		/**
		 * executeDrag
		 */
		Sprite.prototype.executeDrag = function()
		{
			let _this = this;
			let _root = _this.getDisplayObject("_root");
			let stage = _root.getStage();
			let dragRules = stage.dragRules;
			let startX = dragRules.startX;
			let startY = dragRules.startY;
			let left = dragRules.left;
			let top = dragRules.top;
			let right = dragRules.right;
			let bottom = dragRules.bottom;
			let x = _this.getX();
			let y = _this.getY();
			let xmouse = _this.getXMouse();
			let ymouse = _this.getYMouse();

			xmouse -= startX;
			ymouse -= startY;

			let moveX = x + xmouse;
			let moveY = y + ymouse;

			if (left === null || left === undefined) {
				_this.setX(moveX);
				_this.setY(moveY);
			} else {
				left = +left;
				top = +top;
				right = +right;
				bottom = +bottom;

				// x
				if (right < moveX) {
					_this.setX(right);
				} else if (moveX < left) {
					_this.setX(left);
				} else {
					_this.setX(moveX);
				}

				// y
				if (bottom < moveY) {
					_this.setY(bottom);
				} else if (moveY < top) {
					_this.setY(top);
				} else {
					_this.setY(moveY);
				}
			}
		};

		/**
		 *
		 * @returns {null|*}
		 */
		Sprite.prototype.getDropTarget = function()
		{
			return this._droptarget;
		};

		/**
		 * setDropTarget
		 */
		Sprite.prototype.setDropTarget = function()
		{
			let _this = this;
			_this._droptarget = null;
			let _root = _this.getDisplayObject("_root");
			let stage = _root.getStage();
			let parent = _this.getParent();
			if (!parent) {
				parent = stage.getParent();
			}

			let x = _root.getXMouse();
			let y = _root.getYMouse();

			let tags = parent.getTags();
			for (let depth in tags) {
				if (!tags.hasOwnProperty(depth)) {
					continue;
				}

				let id = tags[depth];
				if (id === _this.instanceId) {
					continue;
				}

				let instance = stage.getInstance(id);
				if (!(instance instanceof MovieClip)) {
					continue;
				}

				let hit = instance.hitTest(x, y);
				if (hit) {
					_this._droptarget = instance;
					break;
				}
			}
		};

		/**
		 * @returns {Array}
		 */
		Sprite.prototype.getTags = function()
		{
			return this.getContainer();
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @param visible
		 */
		Sprite.prototype.render = function(ctx, matrix, colorTransform, stage, visible)
		{
			let _this = this;
			if (_this.removeFlag) {
				return "";
			}

			_this.isLoad = true;
			stage.doneTags.unshift(_this);

			// sound
			if (_this instanceof MovieClip && !_this.soundStopFlag) {
				let startSounds = _this.getSounds();
				if (startSounds !== undefined) {
					let sLen = startSounds.length;
					for (let idx = 0; idx < sLen; idx++) {
						if (!(idx in startSounds)) {
							continue;
						}
						let startSound = startSounds[idx];
						_this.startSound(startSound);
					}
				}
			}

			// matrix & colorTransform
			let _multiplicationMatrix = _this.multiplicationMatrix;
			let rMatrix = _multiplicationMatrix(matrix, _this.getMatrix());
			let _multiplicationColor = _this.multiplicationColor;
			let rColorTransform = _multiplicationColor(colorTransform, _this.getColorTransform());
			let isVisible = _min(_this.getVisible(), visible);

			// pre render
			let obj = _this.preRender(ctx, rMatrix, rColorTransform, stage, visible);
			let cacheKey = obj.cacheKey;
			let preCtx = obj.preCtx;
			let preMatrix = obj.preMatrix;

			// render
			let clips = [];
			let container = _this.getTags();
			let length = container.length;
			let maskObj = _this.getMask();

			if (length) {
				let myStage = _this.getStage();
				for (let depth in container) {
					if (!container.hasOwnProperty(depth)) {
						continue;
					}

					let instanceId = container[depth];
					let instance = myStage.getInstance(instanceId);
					if (!instance) {
						continue;
					}

					// mask end
					let cLen = clips.length;
					for (let cIdx = 0; cIdx < cLen; cIdx++) {
						let cDepth = clips[cIdx];
						if (depth > cDepth) {
							clips.splice(cIdx, 1);
							ctx.restore();
							break;
						}
					}

					// mask start
					if (instance.isClipDepth) {
						ctx.save();
						ctx.beginPath();
						clips[clips.length] = instance.clipDepth;
						if (instance instanceof MovieClip) {
							stage.isClipDepth = true;
						}
					}

					if (isVisible) {
						switch (true) {
							case instance instanceof TextField:
							case instance instanceof DisplayObjectContainer:
								instance.setHitRange(rMatrix, stage, visible, cLen);
								break;
							case instance instanceof SimpleButton:
								if (!instance.clipDepth) {
									instance.setHitRange(rMatrix, stage, visible, cLen);
								}
								break;
							default:
								break;
						}
					}

					// mask
					if (instance.isMask) {
						continue;
					}

					if (instance.isClipDepth) {
						if (preMatrix[0] === 0) {
							preMatrix[0] = 0.00000000000001;
						}
						if (preMatrix[3] === 0) {
							preMatrix[3] = 0.00000000000001;
						}
					}

					cacheKey += instance.render(preCtx, preMatrix, rColorTransform, stage, isVisible);
					if (stage.isClipDepth) {
						preCtx.clip();
						stage.isClipDepth = false;
					}
				}
			}

			if (clips.length || maskObj) {
				ctx.restore();
			}

			// post render
			if (obj.isFilter || obj.isBlend) {
				obj.cacheKey = cacheKey;
				_this.postRender(ctx, rMatrix, rColorTransform, stage, obj);
			}

			return cacheKey;
		};

		/**
		 * initFrame
		 */
		Sprite.prototype.initFrame = function() {};

		/**
		 * @param stage
		 * @param clipEvent
		 */
		Sprite.prototype.putFrame = function(stage, clipEvent)
		{
			let _this = this;
			_this.active = true;
			_this.dispatchEvent(clipEvent, stage);
		};

		/**
		 * @param stage
		 */
		Sprite.prototype.addActions = function(stage)
		{
			let _this = this;
			let myStage = _this.getStage();
			let tags = _this.getTags();
			let length = tags.length;
			if (length) {
				for (let depth in tags) {
					if (!tags.hasOwnProperty(depth)) {
						continue;
					}
					let instanceId = tags[depth];
					let instance = myStage.getInstance(instanceId);
					if (!instance) {
						continue;
					}
					instance.addActions(stage);
				}
			}
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param stage
		 * @param x
		 * @param y
		 * @returns {boolean}
		 */
		Sprite.prototype.renderHitTest = function(ctx, matrix, stage, x, y)
		{
			let _this = this;
			let loadStage = _this.getStage();
			let tags = _this.getTags();
			let length = tags.length;
			let hit = false;
			let rMatrix = _this.multiplicationMatrix(matrix, _this.getMatrix());

			if (length) {
				for (let depth in tags) {
					if (!tags.hasOwnProperty(depth)) {
						continue;
					}

					let instanceId = tags[depth];
					let obj = loadStage.getInstance(instanceId);
					hit = obj.renderHitTest(ctx, rMatrix, stage, x, y);
					if (hit) {
						return hit;
					}
				}
			}

			let graphics = _this.graphics;
			if (graphics.isDraw) {
				return graphics.renderHitTest(ctx, rMatrix, stage, x, y);
			}

			return hit;
		};

		/**
		 * @param mc
		 * @returns {{xMin: *, xMax: number, yMin: *, yMax: number}}
		 */
		Sprite.prototype.getRect = function(mc)
		{
			let _this = this;
			if (!mc) {
				mc = _this;
			}
			let bounds = mc.getBounds(mc.getOriginMatrix());
			let graphics = _this.graphics;
			let twips = 20;
			let maxWidth = graphics.maxWidth / twips;
			let halfWidth = maxWidth / 2;
			let xMin = bounds.xMin + halfWidth;
			let xMax = bounds.xMax - halfWidth;
			let yMin = bounds.yMin + halfWidth;
			let yMax = bounds.yMax - halfWidth;
			return {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};
		};

		/**
		 * @param matrix
		 * @returns {{}}
		 */
		Sprite.prototype.getBounds = function(matrix)
		{
			if (matrix instanceof MovieClip) {
				return matrix.getBounds(matrix.getOriginMatrix());
			}

			let _this = this;
			let tags = _this.getTags();
			let xMax = 0;
			let yMax = 0;
			let xMin = 0;
			let yMin = 0;
			let graphics = _this.graphics;
			let isDraw = graphics.isDraw;
			if (isDraw) {
				let maxWidth = graphics.maxWidth;
				let halfWidth = maxWidth / 2;
				let gBounds = _this.boundsMatrix(graphics.bounds, matrix);
				let twips = (matrix) ? 20 : 1;
				xMin = (gBounds.xMin - halfWidth) / twips;
				xMax = (gBounds.xMax + halfWidth) / twips;
				yMin = (gBounds.yMin - halfWidth) / twips;
				yMax = (gBounds.yMax + halfWidth) / twips;
			}

			let length = tags.length;
			let stage = _this.getStage();
			if (length) {
				if (!isDraw) {
					let no = _Number.MAX_VALUE;
					xMax = -no;
					yMax = -no;
					xMin = no;
					yMin = no;
				}

				let _multiplicationMatrix = _this.multiplicationMatrix;
				for (let depth in tags) {
					if (!tags.hasOwnProperty(depth)) {
						continue;
					}
					let instanceId = tags[depth];
					let tag = stage.getInstance(instanceId);
					if (!tag || tag.isClipDepth) {
						continue;
					}

					let matrix2 = (matrix) ? _multiplicationMatrix(matrix, tag.getMatrix()) : tag.getMatrix();
					let bounds = tag.getBounds(matrix2);
					if (!bounds) {
						continue;
					}

					xMin = _min(xMin, bounds.xMin);
					xMax = _max(xMax, bounds.xMax);
					yMin = _min(yMin, bounds.yMin);
					yMax = _max(yMax, bounds.yMax);
				}
			}

			return {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param stage
		 * @param x
		 * @param y
		 * @returns {*}
		 */
		Sprite.prototype.hitCheck = function(ctx, matrix, stage, x, y)
		{
			let _this = this;
			if (!_this.getEnabled() ||
				!_this.getVisible() ||
				!_this.getMouseEnabled()
			) {
				return false;
			}

			let hitObj;
			let hit = false;
			let tags = _this.getTags();
			let length = tags.length;
			let matrix2 = _this.multiplicationMatrix(matrix, _this.getMatrix());
			if (length) {
				let loadStage = _this.getStage();
				tags.reverse();
				for (let depth in tags) {
					if (!tags.hasOwnProperty(depth)) {
						continue;
					}

					let tagId = tags[depth];
					let instance = loadStage.getInstance(tagId);
					if (instance instanceof Shape ||
						instance instanceof StaticText ||
						instance instanceof TextField
					) {
						hit = instance.renderHitTest(ctx, matrix2, stage, x, y);
					} else {
						hit = instance.hitCheck(ctx, matrix2, stage, x, y);
					}

					if (hit) {
						hitObj = hit;
						if (typeof hit !== "object") {
							let events = _this.events;
							if (events.press !== undefined ||
								events.release !== undefined ||
								events.releaseOutside !== undefined ||
								events.rollOver !== undefined ||
								events.rollOut !== undefined ||
								events.dragOver !== undefined ||
								events.dragOut !== undefined
							) {
								stage.isHit = hit;
								hitObj = {parent: _this};
							}
						}

						tags.reverse();
						return hitObj;
					}
				}
				tags.reverse();
			}

			let graphics = _this.graphics;
			if (graphics.isDraw) {
				hit = graphics.renderHitTest(ctx, matrix2, stage, x, y);
				if (hit) {
					hitObj = {parent : _this};
				}
			}

			return hitObj;
		};

		/**
		 * @constructor
		 */
		let Shape = function()
		{
			let _this = this;
			DisplayObject.call(_this);

			_this.data = null;
			_this._graphics = new Graphics();

			let no = _Number.MAX_VALUE;
			_this.setBounds({xMin: no, xMax: -no, yMin: no, yMax: -no});
		};

		/**
		 * extends
		 * @type {DisplayObject}
		 */
		Shape.prototype = Object.create(DisplayObject.prototype);
		Shape.prototype.constructor = Shape;

		/**
		 * properties
		 */
		Object.defineProperties(Shape.prototype,
		{
			graphics: {
				get: function() {
					return this.getGraphics();
				},
				set: function() {
				}
			}
		});

		/**
		 * dummy
		 */
		Shape.prototype.addActions = function() {};
		Shape.prototype.initFrame = function() {};

		/**
		 * @param stage
		 * @param clipEvent
		 */
		Shape.prototype.putFrame = function(stage, clipEvent)
		{
			let _this = this;
			_this.active = true;
			_this.dispatchEvent(clipEvent, stage);
		};

		/**
		 * @returns {Graphics}
		 */
		Shape.prototype.getGraphics = function()
		{
			return this._graphics;
		};

		/**
		 * @returns []
		 */
		Shape.prototype.getData = function()
		{
			return this.data;
		};

		/**
		 * @param data
		 */
		Shape.prototype.setData = function(data)
		{
			this.data = data;
		};

		/**
		 * @returns {{}}
		 */
		Shape.prototype.getBounds = function(matrix)
		{
			let _this = this;
			let bounds, gBounds;
			let graphics = _this.graphics;
			let isDraw = graphics.isDraw;

			if (matrix) {
				bounds = _this.boundsMatrix(_this.bounds, matrix);
				if (isDraw) {
					gBounds = _this.boundsMatrix(graphics.getBounds(), matrix);
					bounds.xMin = _min(gBounds.xMin, bounds.xMin);
					bounds.xMax = _max(gBounds.xMax, bounds.xMax);
					bounds.yMin = _min(gBounds.yMin, bounds.yMin);
					bounds.yMax = _max(gBounds.yMax, bounds.yMax);
				}

				for (let name in bounds) {
					if (!bounds.hasOwnProperty(name)) {
						continue;
					}
					bounds[name] /= 20;
				}
				return bounds;
			} else {
				bounds = _this.bounds;
				if (isDraw) {
					gBounds = graphics.getBounds();
					bounds.xMin = _min(gBounds.xMin, bounds.xMin);
					bounds.xMax = _max(gBounds.xMax, bounds.xMax);
					bounds.yMin = _min(gBounds.yMin, bounds.yMin);
					bounds.yMax = _max(gBounds.yMax, bounds.yMax);
				}
				return this.bounds;
			}
		};

		/**
		 * @param bounds
		 */
		Shape.prototype.setBounds = function(bounds)
		{
			this.bounds = bounds;
		};

		/**
		 * @returns {boolean}
		 */
		Shape.prototype.isMorphing = function()
		{
			let tagType = this.getTagType();
			return (tagType === 46 || tagType === 84);
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @param visible
		 * @returns {*}
		 */
		Shape.prototype.render = function(ctx, matrix, colorTransform, stage, visible)
		{
			let _this = this;
			stage.doneTags.unshift(_this);

			// colorTransform
			let _multiplicationColor = _this.multiplicationColor;
			let rColorTransform = _multiplicationColor(colorTransform, _this.getColorTransform());
			let isVisible = _min(_this.getVisible(), visible);
			let alpha = rColorTransform[3] + (rColorTransform[7] / 255);
			let stageClip = stage.clipMc || stage.isClipDepth;
			if (!stageClip && (!alpha || !isVisible)) {
				return "";
			}

			// matrix
			let _multiplicationMatrix = _this.multiplicationMatrix;
			let m2 = _multiplicationMatrix(matrix, _this.getMatrix());

			// pre render
			let obj = _this.preRender(ctx, m2, rColorTransform, stage, isVisible);
			let cacheKey = obj.cacheKey;
			let cache = null;

			// render
			let m3 = _multiplicationMatrix(stage.getMatrix(), obj.preMatrix);
			let isClipDepth = _this.isClipDepth || stageClip;
			if (isClipDepth) {
				if (m3[0] === 0) {
					m3[0] = 0.00000000000001;
				}
				if (m3[3] === 0) {
					m3[3] = 0.00000000000001;
				}
				ctx.setTransform(m3[0], m3[1], m3[2], m3[3], m3[4], m3[5]);
				_this.executeRender(ctx, _min(m3[0], m3[3]), rColorTransform, isClipDepth, stage);
			} else {
				let xScale = _sqrt(m3[0] * m3[0] + m3[1] * m3[1]);
				let yScale = _sqrt(m3[2] * m3[2] + m3[3] * m3[3]);
				xScale = _pow(_SQRT2, _ceil(_log(xScale) / _LN2_2 - _LOG1P));
				yScale = _pow(_SQRT2, _ceil(_log(yScale) / _LN2_2 - _LOG1P));

				let bounds = _this.getBounds();
				let xMax = bounds.xMax;
				let xMin = bounds.xMin;
				let yMax = bounds.yMax;
				let yMin = bounds.yMin;

				let W = _abs(_ceil((xMax - xMin) * xScale));
				let H = _abs(_ceil((yMax - yMin) * yScale));
				if (W <= 0 || H <= 0) {
					return cacheKey;
				}

				let canvas;
				let loadStage = _this.getStage();
				let cacheId = _this.getCharacterId() + "_" + loadStage.getId();
				if (_this.isMorphing()) {
					cacheId += "_" + _this.getRatio();
				}

				cacheKey = cacheStore.generateKey("Shape", cacheId, [xScale, yScale], rColorTransform);
				cache = cacheStore.getCache(cacheKey);
				if (!cache &&
					stage.getWidth() > W &&
					stage.getHeight() > H &&
					cacheStore.size > (W * H)
				) {
					canvas = cacheStore.getCanvas();
					canvas.width = W;
					canvas.height = H;
					cache = canvas.getContext("2d");
					let cMatrix = [xScale, 0, 0, yScale, -xMin * xScale, -yMin * yScale];
					cache.setTransform(cMatrix[0], cMatrix[1], cMatrix[2], cMatrix[3], cMatrix[4], cMatrix[5]);
					cache = _this.executeRender(
						cache, _min(xScale, yScale), rColorTransform, isClipDepth, stage
					);
					cacheStore.setCache(cacheKey, cache);
				}

				let preCtx = obj.preCtx;
				if (cache) {
					canvas = cache.canvas;
					let sMatrix = [1 / xScale, 0, 0, 1 / yScale, xMin, yMin];
					let m4 = _multiplicationMatrix(m3, sMatrix);
					preCtx.setTransform(m4[0], m4[1], m4[2], m4[3], m4[4], m4[5]);
					if (isAndroid4x && !isChrome) {
						preCtx.fillStyle = stage.context.createPattern(cache.canvas, "no-repeat");
						preCtx.fillRect(0, 0, W, H);
					} else {
						preCtx.drawImage(canvas, 0, 0, W, H);
					}
				} else {
					preCtx.setTransform(m3[0], m3[1], m3[2], m3[3], m3[4], m3[5]);
					_this.executeRender(preCtx, _min(m3[0], m3[3]), rColorTransform, isClipDepth, stage);
				}
			}

			// post render
			cacheKey += "_" + m3[4] + "_" + m3[5];
			if (obj.isFilter || obj.isBlend) {
				obj.cacheKey = cacheKey;
				_this.postRender(ctx, matrix, rColorTransform, stage, obj);
			}

			return cacheKey;
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param stage
		 * @param x
		 * @param y
		 * @returns {boolean}
		 */
		Shape.prototype.renderHitTest = function(ctx, matrix, stage, x, y)
		{
			let _this = this;
			let _multiplicationMatrix = _this.multiplicationMatrix;
			let m2 = _multiplicationMatrix(matrix, _this.getMatrix());

			let graphics = _this.graphics;
			if (graphics.isDraw) {
				return graphics.renderHitTest(ctx, m2, stage, x, y);
			}

			if (!_this.getData()) {
				return false;
			}

			let m3 = _multiplicationMatrix(stage.getMatrix(), m2);
			ctx.setTransform(m3[0], m3[1], m3[2], m3[3], m3[4], m3[5]);

			let minScale = _min(m3[0], m3[3]);
			let shapes = _this.getData();
			let length = shapes.length;
			let hit = false;
			for (let idx = 0; idx < length; idx++) {
				let data = shapes[idx];
				let obj = data.obj;
				let isStroke = (obj.Width !== undefined);

				ctx.beginPath();
				let cmd = data.cmd;
				cmd(ctx);

				if (isStroke) {
					ctx.lineWidth = _max(obj.Width, 1 / minScale);
					ctx.lineCap = "round";
					ctx.lineJoin = "round";
				}

				hit = ctx.isPointInPath(x, y);
				if (hit) {
					return hit;
				}

				if ("isPointInStroke" in ctx) {
					hit = ctx.isPointInStroke(x, y);
					if (hit) {
						return hit;
					}
				}
			}

			return hit;
		};

		/**
		 * @param ctx
		 * @param minScale
		 * @param colorTransform
		 * @param isClipDepth
		 * @param stage
		 * @returns {*}
		 */
		Shape.prototype.executeRender = function(ctx, minScale, colorTransform, isClipDepth, stage)
		{
			let _this = this;
			let shapes = _this.getData();
			if (!shapes) {
				return ctx;
			}

			let stageClip = stage.clipMc || stage.isClipDepth;
			let length = shapes.length;
			let color;
			let css;
			let canvas;
			for (let idx = 0; idx < length; idx++) {
				let data = shapes[idx];
				if (!data.obj) continue;
				let obj = data.obj;
				let styleObj = (!obj.HasFillFlag) ? obj : obj.FillType;
				let cmd = data.cmd;
				let isStroke = (obj.Width !== undefined);

				if (isClipDepth) {
					if (isStroke) {
						continue;
					}
					cmd(ctx);
					continue;
				}

				ctx.beginPath();
				cmd(ctx);

				let styleType = styleObj.fillStyleType;
				switch (styleType) {
					case 0x00:
						color = styleObj.Color;
						color = _this.generateColorTransform(color, colorTransform);
						css = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
						if (isStroke) {
							ctx.strokeStyle = css;
							ctx.lineWidth = _max(obj.Width, 1 / minScale);
							ctx.lineCap = obj.StartCapStyle == 1?"butt":(obj.StartCapStyle ==2?"square":"round");
							ctx.lineJoin = obj.JoinStyle == 1?"bevel":(obj.JoinStyle == 2?"miter":"round");
							if (obj.JoinStyle == 2 && obj.MiterLimitFactor != 0.0) ctx.miterLimit = obj.MiterLimitFactor*obj.Width;
							ctx.stroke();
						} else {
							ctx.fillStyle = css;
							ctx.fill();
						}

						break;

						// gradient
					case 0x10:
					case 0x12:
					case 0x13:
						let m = styleObj.gradientMatrix;
						let type = styleObj.fillStyleType;
						if (type !== 16) {
							ctx.save();
							ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
							let focalPoint = styleObj.gradient.FocalPoint?styleObj.gradient.FocalPoint:0;
							if (styleObj.gradient.SpreadMode == 1) focalPoint = focalPoint*2;
							else if (styleObj.gradient.SpreadMode == 2) focalPoint = focalPoint*5.6;
							let r = 16384;
							if (styleObj.gradient.SpreadMode && !isStroke) r = 65536;
							css = ctx.createRadialGradient(focalPoint*r, 0, 0, 0, 0, r);
						} else {
							let xy = _this.linearGradientXY(m);
							let xyn;

							if (styleObj.gradient.SpreadMode && isStroke) {
								xyn = new Array(4);
								//xyn[0] = (xy[0]+xy[2])/2-(xy[2]-xy[0]); // xy[0]/2-xy[2]/2
								//xyn[2] = (xy[0]+xy[2])/2+(xy[2]-xy[0]); // xy[0]/2+xy[2]/2
								xyn[0] = xy[0]-(xy[2]-xy[0])*2.8;
								xyn[1] = xy[1]-(xy[3]-xy[1])*2.8;
								xyn[2] = xy[2]; //xy[2]+(xy[2]-xy[0])*1.4;
								xyn[3] = xy[3]; //xy[3]+(xy[3]-xy[1])*1.4;
								xy = xyn;
							} else if (styleObj.gradient.SpreadMode) {
								xyn = new Array(4);
								xyn[0] = xy[0];
								xyn[1] = xy[1];
								xyn[2] = xy[2]+(xy[2]-xy[0])*2.8;
								xyn[3] = xy[3]+(xy[3]-xy[1])*2.8;
								xy = xyn;
							}

							css = ctx.createLinearGradient(xy[0], xy[1], xy[2], xy[3]);
						}

						let records = styleObj.gradient.GradientRecords;
						let rLength = records.length;
						for (let rIdx = 0; rIdx < rLength; rIdx++) {
							let record = records[rIdx];
							color = record.Color;
							color = _this.generateColorTransform(color, colorTransform);
							let rgba = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
							css.addColorStop(record.Ratio, rgba);
						}

						if (isStroke) {
							ctx.lineWidth = _max(obj.Width, 1 / minScale);
							ctx.lineCap = obj.StartCapStyle == 1?"butt":(obj.StartCapStyle ==2?"square":"round");
							ctx.lineJoin = obj.JoinStyle == 1?"bevel":(obj.JoinStyle == 2?"miter":"round");
							if (obj.JoinStyle == 2 && obj.MiterLimitFactor != 0.0) ctx.miterLimit = obj.MiterLimitFactor*obj.Width;
							ctx.strokeStyle = css;
							ctx.stroke();
						} else {
							ctx.fillStyle = css;
							ctx.fill();
						}

						if (type !== 16) {
							ctx.restore();
						}

						break;

						// bitmap
					case 0x40: // repeating bitmap
					case 0x41: // clipped bitmap fill
					case 0x42: // non-smoothed repeating bitmap
					case 0x43: // non-smoothed clipped bitmap
						let width;
						let height;
						let loadStage = _this.getStage();
						let bitmapId = styleObj.bitmapId;
						let bMatrix = styleObj.bitmapMatrix;
						let repeat = (styleType === 0x40 || styleType === 0x42) ? "repeat" : "no-repeat";
						let bitmapCacheKey = cacheStore.generateKey(
							"Bitmap",
							bitmapId + "_" + loadStage.getId() + "_" + repeat,
							undefined,
							colorTransform
						);

						let image = cacheStore.getCache(bitmapCacheKey);
						if (image === undefined) {
							image = loadStage.getCharacter(bitmapId);
							if (!image) {
								break;
							}

							if (colorTransform[0] !== 1 ||
								colorTransform[1] !== 1 ||
								colorTransform[2] !== 1 ||
								colorTransform[4] ||
								colorTransform[5] ||
								colorTransform[6]
							) {
								let imgCanvas = image.canvas;
								width = imgCanvas.width;
								height = imgCanvas.height;
								if (width > 0 && height > 0) {
									canvas = cacheStore.getCanvas();
									canvas.width = width;
									canvas.height = height;
									let imageContext = canvas.getContext("2d");
									imageContext.drawImage(image.canvas, 0, 0, width, height);
									image = _this.generateImageTransform.call(_this, imageContext, colorTransform);
									cacheStore.setCache(bitmapCacheKey, image);
								}
							} else {
								ctx.globalAlpha = _max(0, _min((255 * colorTransform[3]) + colorTransform[7], 255)) / 255;
							}
						}

						if (image) {
							ctx.save();
							canvas = image.canvas;
							width = canvas.width;
							height = canvas.height;
							if (width > 0 && height > 0) {
								if (styleType === 0x41 || styleType === 0x43) {
									ctx.clip();
									ctx.transform(bMatrix[0], bMatrix[1], bMatrix[2], bMatrix[3], bMatrix[4], bMatrix[5]);
									ctx.drawImage(canvas, 0, 0, width, height);
								} else {
									if (isStroke) {
										ctx.lineWidth = _max(obj.Width, 1 / minScale);
										ctx.lineCap = obj.StartCapStyle == 1?"butt":(obj.StartCapStyle ==2?"square":"round");
										ctx.lineJoin = obj.JoinStyle == 1?"bevel":(obj.JoinStyle == 2?"miter":"round");
										ctx.strokeStyle = stage.context.createPattern(canvas, repeat);
										// ctx.transform(bMatrix[0], bMatrix[1], bMatrix[2], bMatrix[3], bMatrix[4], bMatrix[5]);
										ctx.stroke();
									} else {
										ctx.fillStyle = stage.context.createPattern(canvas, repeat);
										ctx.transform(bMatrix[0], bMatrix[1], bMatrix[2], bMatrix[3], bMatrix[4], bMatrix[5]);
										ctx.fill();
									}
								}
							}
							ctx.restore();
						}
						break;
				}
			}

			if (isClipDepth && !stageClip) {
				ctx.clip();

				if (isAndroid && isChrome) {
					if (!canvas) {
						canvas = ctx.canvas;
					}

					let cWidth = canvas.width;
					let cHeight = canvas.height;

					let tmpCanvas = tmpContext.canvas;
					canvas = ctx.canvas;
					tmpCanvas.width = cWidth;
					tmpCanvas.height = cHeight;
					tmpContext.drawImage(canvas, 0, 0);

					ctx.save();
					ctx.setTransform(1, 0, 0, 1, 0, 0);
					ctx.beginPath();
					ctx.clearRect(0, 0, cWidth + 1, cHeight + 1);
					ctx.drawImage(tmpCanvas, 0, 0);
					ctx.restore();

					tmpContext.setTransform(1, 0, 0, 1, 0, 0);
					tmpContext.clearRect(0, 0, cWidth + 1, cHeight + 1);
				}
			}

			let resetCss = "rgba(0,0,0,1)";
			ctx.strokeStyle = resetCss;
			ctx.fillStyle = resetCss;
			ctx.globalAlpha = 1;

			return ctx;
		};

		/**
		 * @param ctx
		 * @param color
		 * @returns {*}
		 */
		Shape.prototype.generateImageTransform = function(ctx, color)
		{
			let canvas = ctx.canvas;
			let width = canvas.width;
			let height = canvas.height;
			let imgData = ctx.getImageData(0, 0, width, height);
			let pxData = imgData.data;
			let idx = 0;
			let RedMultiTerm = color[0];
			let GreenMultiTerm = color[1];
			let BlueMultiTerm = color[2];
			let AlphaMultiTerm = color[3];
			let RedAddTerm = color[4];
			let GreenAddTerm = color[5];
			let BlueAddTerm = color[6];
			let AlphaAddTerm = color[7];
			let length = width * height;
			if (length > 0) {
				while (length--) {
					let R = pxData[idx++];
					let G = pxData[idx++];
					let B = pxData[idx++];
					let A = pxData[idx++];
					pxData[idx - 4] = _max(0, _min((R * RedMultiTerm) + RedAddTerm, 255)) | 0;
					pxData[idx - 3] = _max(0, _min((G * GreenMultiTerm) + GreenAddTerm, 255)) | 0;
					pxData[idx - 2] = _max(0, _min((B * BlueMultiTerm) + BlueAddTerm, 255)) | 0;
					pxData[idx - 1] = _max(0, _min((A * AlphaMultiTerm) + AlphaAddTerm, 255));
				}
			}
			ctx.putImageData(imgData, 0, 0);
			return ctx;
		};

		/**
		 * @param m
		 * @returns {*[]}
		 */
		Shape.prototype.linearGradientXY = function(m)
		{
			let x0 = -16384 * m[0] - 16384 * m[2] + m[4];
			let x1 = 16384 * m[0] - 16384 * m[2] + m[4];
			let x2 = -16384 * m[0] + 16384 * m[2] + m[4];
			let y0 = -16384 * m[1] - 16384 * m[3] + m[5];
			let y1 = 16384 * m[1] - 16384 * m[3] + m[5];
			let y2 = -16384 * m[1] + 16384 * m[3] + m[5];
			let vx2 = x2 - x0;
			let vy2 = y2 - y0;
			let r1 = _sqrt(vx2 * vx2 + vy2 * vy2);
			vx2 /= r1;
			vy2 /= r1;
			let r2 = (x1 - x0) * vx2 + (y1 - y0) * vy2;
			return [x0 + r2 * vx2, y0 + r2 * vy2, x1, y1];
		};

		/**
		 * @constructor
		 */
		let TextRecord = function()
		{
			let _this = this;
			_this.color = null;
			_this.matrix = null;
		};

		/**
		 * @returns {*}
		 */
		TextRecord.prototype.getColor = function()
		{
			return this.color;
		};

		/**
		 * @param color
		 */
		TextRecord.prototype.setColor = function(color)
		{
			this.color = color;
		};

		/**
		 * @returns {*}
		 */
		TextRecord.prototype.getMatrix = function()
		{
			return this.matrix;
		};

		/**
		 * @param matrix
		 */
		TextRecord.prototype.setMatrix = function(matrix)
		{
			this.matrix = matrix;
		};

		/**
		 * @returns {Array}
		 */
		TextRecord.prototype.getData = function()
		{
			return this.data;
		};

		/**
		 * @param data
		 */
		TextRecord.prototype.setData = function(data)
		{
			this.data = data;
		};

		/**
		 * @constructor
		 */
		let StaticText = function()
		{
			let _this = this;
			DisplayObject.call(_this);

			_this.data = null;
			_this.records = [];
		};

		/**
		 * extends
		 * @type {DisplayObject}
		 */
		StaticText.prototype = Object.create(DisplayObject.prototype);
		StaticText.prototype.constructor = StaticText;

		/**
		 * dummy
		 */
		StaticText.prototype.initFrame = function() {};
		StaticText.prototype.addActions = function() {};

		/**
		 * @returns {{}}
		 */
		StaticText.prototype.getBounds = function(matrix)
		{
			let _this = this;
			if (matrix) {
				let bounds = _this.boundsMatrix(_this.bounds, matrix);
				for (let name in bounds) {
					if (!bounds.hasOwnProperty(name)) {
						continue;
					}
					bounds[name] /= 20;
				}
				return bounds;
			} else {
				return _this.bounds;
			}
		};

		/**
		 * @param bounds
		 */
		StaticText.prototype.setBounds = function(bounds)
		{
			this.bounds = bounds;
		};

		/**
		 * @returns {Array|*}
		 */
		StaticText.prototype.getRecords = function()
		{
			return this.records;
		};

		/**
		 * @param record
		 */
		StaticText.prototype.addRecord = function(record)
		{
			let records = this.getRecords();
			records[records.length] = record;
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @param visible
		 * @return {*}
		 */
		StaticText.prototype.render = function(ctx, matrix, colorTransform, stage, visible)
		{
			let _this = this;

			// colorTransform
			let _multiplicationColor = _this.multiplicationColor;
			let rColorTransform = _multiplicationColor(colorTransform, _this.getColorTransform());
			let isVisible = _min(_this.getVisible(), visible);
			let alpha = rColorTransform[3] + (rColorTransform[7] / 255);
			let stageClip = stage.clipMc || stage.isClipDepth;
			if (!stageClip && (!alpha || !isVisible)) {
				return 0;
			}

			// matrix
			let _multiplicationMatrix = _this.multiplicationMatrix;
			let m2 = _multiplicationMatrix(matrix, _this.getMatrix());

			// pre render
			let obj = _this.preRender(ctx, m2, rColorTransform, stage, visible);
			let m3 = _multiplicationMatrix(stage.getMatrix(), obj.preMatrix);
			let xScale = _sqrt(m3[0] * m3[0] + m3[1] * m3[1]);
			let yScale = _sqrt(m3[2] * m3[2] + m3[3] * m3[3]);
			xScale = _pow(_SQRT2, _ceil(_log(xScale) / _LN2_2 - _LOG1P));
			yScale = _pow(_SQRT2, _ceil(_log(yScale) / _LN2_2 - _LOG1P));

			// render
			let bounds = _this.getBounds();
			let xMax = bounds.xMax;
			let xMin = bounds.xMin;
			let yMax = bounds.yMax;
			let yMin = bounds.yMin;
			let W = _abs(_ceil((xMax - xMin) * xScale));
			let H = _abs(_ceil((yMax - yMin) * yScale));
			let isClipDepth = _this.isClipDepth || stageClip;
			if (W > 0 && H > 0) {
				let cacheId = _this.getCharacterId() + "_" + _this.getStage().getId();
				let cacheKey = cacheStore.generateKey("Text", cacheId, [xScale, yScale], rColorTransform);
				let cache = cacheStore.getCache(cacheKey);
				let canvas;
				if (!cache && !isClipDepth) {
					if (stage.getWidth() > W && stage.getHeight() > H && cacheStore.size > W * H) {
						canvas = cacheStore.getCanvas();
						canvas.width = W;
						canvas.height = H;
						cache = canvas.getContext("2d");
						let cMatrix = [xScale, 0, 0, yScale, -xMin * xScale, -yMin * yScale];
						cache.setTransform(cMatrix[0], cMatrix[1], cMatrix[2], cMatrix[3], cMatrix[4], cMatrix[5]);
						cache = _this.executeRender(cache, cMatrix, rColorTransform, false, false);
						cacheStore.setCache(cacheKey, cache);
					}
				}
				if (cache) {
					canvas = cache.canvas;
					let m4 = _multiplicationMatrix(m3, [1 / xScale, 0, 0, 1 / yScale, xMin, yMin]);
					ctx.setTransform(m4[0], m4[1], m4[2], m4[3], m4[4], m4[5]);
					if (isAndroid4x && !isChrome) {
						ctx.fillStyle = stage.context.createPattern(cache.canvas, "no-repeat");
						ctx.fillRect(0, 0, W, H);
					} else {
						ctx.drawImage(canvas, 0, 0, W, H);
					}
				} else {
					ctx.setTransform(m3[0], m3[1], m3[2], m3[3], m3[4], m3[5]);
					_this.executeRender(ctx, m3, rColorTransform, isClipDepth, stageClip);
				}

				cacheKey += "_" + m3[4] + "_" + m3[5];
				if (obj.isFilter || obj.isBlend) {
					obj.cacheKey = cacheKey;
					_this.postRender(ctx, matrix, rColorTransform, stage, obj);
				}

				return cacheKey;
			}

			return null;
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param colorTransform
		 * @param isClipDepth
		 * @param stageClip
		 * @returns {*}
		 */
		StaticText.prototype.executeRender = function(ctx, matrix, colorTransform, isClipDepth, stageClip)
		{
			let _this = this;
			let records = _this.getRecords();
			let length = records.length;
			if (!length) {
				return ctx;
			}

			let _multiplicationMatrix = _this.multiplicationMatrix;
			let _generateColorTransform = _this.generateColorTransform;
			for (let i = 0; i < length; i++) {
				let record = records[i];
				let shapes = record.getData();
				let shapeLength = shapes.length;
				if (!shapeLength) {
					continue;
				}

				let m2 = _multiplicationMatrix(matrix, record.getMatrix());
				ctx.setTransform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5]);
				let color = record.getColor();
				color = _generateColorTransform(color, colorTransform);
				ctx.fillStyle = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
				for (let idx = 0; idx < shapeLength; idx++) {
					let styleObj = shapes[idx];
					let cmd = styleObj.cmd;
					if (!isClipDepth) {
						ctx.beginPath();
						cmd(ctx);
						ctx.fill();
					} else {
						cmd(ctx);
					}
				}
			}

			if (isClipDepth && !stageClip) {
				ctx.clip();
			}

			ctx.globalAlpha = 1;
			return ctx;
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param stage
		 * @param x
		 * @param y
		 * @returns {boolean}
		 */
		StaticText.prototype.renderHitTest = function(ctx, matrix, stage, x, y)
		{
			let _this = this;
			let records = _this.getRecords();
			let length = records.length;
			if (!length) {
				return false;
			}

			let hit = false;
			let _multiplicationMatrix = _this.multiplicationMatrix;
			let m2 = _multiplicationMatrix(matrix, _this.getMatrix());
			let m3 = _multiplicationMatrix(stage.getMatrix(), m2);
			for (let i = 0; i < length; i++) {
				let record = records[i];
				let shapes = record.getData();
				let shapeLength = shapes.length;
				if (!shapeLength) {
					continue;
				}

				let m4 = _multiplicationMatrix(m3, record.getMatrix());
				ctx.setTransform(m4[0], m4[1], m4[2], m4[3], m4[4], m4[5]);
				for (let idx = 0; idx < shapeLength; idx++) {
					let styleObj = shapes[idx];
					let cmd = styleObj.cmd;
					ctx.beginPath();
					cmd(ctx);

					hit = ctx.isPointInPath(x, y);
					if (hit) {
						return hit;
					}
				}
			}

			return hit;
		};

		/**
		 * @constructor
		 */
		let TextFormat = function()
		{
			let _this = this;
			_this.align = "left";
			_this.font = "'HiraKakuProN-W3', 'sans-serif'";
			_this.size = 8;
			_this.color = {R: 0, G: 0, B: 0, A: 1};
			_this.bold = 0;
			_this.italic = 0;
			_this.underline = 0;
			_this.bullet = 0;
			_this.kerning = 0;
			_this.blockIndent = 0;
			_this.indent = 0;
			_this.leading = 80;
			_this.leftMargin = 0;
			_this.rightMargin = 0;
			_this.letterSpacing = 0;
			_this.tabStops = [];
			_this.url = null;
			_this.target = null;
		};

		/**
		 * @param name
		 * @param depth
		 * @param width
		 * @param height
		 * @constructor
		 */
		let TextField = function(name, depth, width, height)
		{
			let _this = this;
			InteractiveObject.call(_this);

			if (name) {
				_this.setName(name);
			}

			if (depth) {
				_this.setLevel(depth);
			}

			if (!width) {
				width = 0;
			}
			width *= 20;

			if (!height) {
				height = 0;
			}
			height *= 20;

			_this.fontId = 0;
			_this.bounds = {xMin: 0, xMax: width, yMin: 0, yMax: height};
			_this.input = null;
			_this.inputActive = false;
			_this.span = null;
		};

		/**
		 * extends
		 * @type {InteractiveObject}
		 */
		TextField.prototype = Object.create(InteractiveObject.prototype);
		TextField.prototype.constructor = TextField;

		/**
		 * properties
		 */
		Object.defineProperties(TextField.prototype,
		{
			text: {
				get: function() {
					return this.variables.text;
				},
				set: function(text) {
					this.variables.text = text;
				}
			},
			htmlText: {
				get: function() {
					return this.variables.text;
				},
				set: function(text) {
					this.variables.text = text;
				}
			},
			size: {
				get: function() {
					return this.variables.size;
				},
				set: function(size) {
					this.variables.size = size;
				}
			},
			font: {
				get: function() {
					return this.variables.font;
				},
				set: function(font) {
					this.variables.font = font;
				}
			},
			type: {
				get: function() {
					return this.variables.type;
				},
				set: function(type) {
					this.variables.type = type;
					if (type === "input") {
						this.setInputElement();
					}
				}
			},
			multiline: {
				get: function() {
					return this.variables.multiline;
				},
				set: function(multiline) {
					this.variables.multiline = multiline;
					if (multiline) {
						this.wordWrap = multiline;
					}
					if (this.type === "input") {
						this.setInputElement();
					}
				}
			},
			wordWrap: {
				get: function() {
					return this.variables.wordWrap;
				},
				set: function(wordWrap) {
					this.variables.wordWrap = wordWrap;
					if (this.type === "input") {
						this.setInputElement();
					}
				}
			},
			border: {
				get: function() {
					return this.variables.border;
				},
				set: function(border) {
					this.variables.border = border;
				}
			},
			borderColor: {
				get: function() {
					return this.variables.borderColor;
				},
				set: function(color) {
					if (typeof color === "string") {
						color = this.colorStringToInt(color);
					}
					color = this.intToRGBA(color);
					this.variables.borderColor = color;
				}
			},
			background: {
				get: function() {
					return this.variables.background;
				},
				set: function(background) {
					this.variables.background = background;
				}
			},
			backgroundColor: {
				get: function() {
					return this.variables.backgroundColor;
				},
				set: function(color) {
					if (typeof color === "string") {
						color = this.colorStringToInt(color);
					}
					color = this.intToRGBA(color);
					this.variables.backgroundColor = color;
				}
			},
			textColor: {
				get: function() {
					return this.variables.textColor;
				},
				set: function(color) {
					if (typeof color === "string") {
						color = this.colorStringToInt(color);
					}
					color = this.intToRGBA(color);
					this.variables.textColor = color;
				}
			},
			align: {
				get: function() {
					return this.variables.align;
				},
				set: function(align) {
					this.variables.align = align;
				}
			},
			autoSize: {
				get: function() {
					return this.variables.autoSize;
				},
				set: function(autoSize) {
					this.variables.autoSize = autoSize;
				}
			},
			onChanged: {
				get: function() {
					return this.variables.onChanged;
				},
				set: function(onChanged) {
					this.variables.onChanged = onChanged;
				}
			}
		});

		/**
		 * @param int
		 * @param alpha
		 * @returns {{R: number, G: number, B: number, A: number}}
		 */
		TextField.prototype.intToRGBA = function(int, alpha)
		{
			alpha = alpha || 100;
			return {
				R: (int & 0xff0000) >> 16,
				G: (int & 0x00ff00) >> 8,
				B: (int & 0x0000ff),
				A: (alpha / 100)
			};
		};

		/**
		 * @param str
		 * @returns {string}
		 */
		TextField.prototype.colorStringToInt = function(str)
		{
			let canvas = cacheStore.getCanvas();
			let ctx = canvas.getContext("2d");
			ctx.fillStyle = str;
			let color = "0x" + ctx.fillStyle.substr(1);
			cacheStore.destroy(ctx);
			return color;
		};

		/**
		 * setInitParams
		 */
		TextField.prototype.setInitParams = function()
		{
			let _this = this;
			let obj = {};
			obj.antiAliasType = null;
			obj.autoSize = "none";
			obj.background = 0;
			obj.backgroundColor = {R: 255, G: 255, B: 255, A: 1};
			obj.border = 0;
			obj.borderColor = {R: 0, G: 0, B: 0, A: 1};
			obj.condenseWhite = 0;
			obj.html = 0;
			obj.password = 0;
			obj.embedFonts = 0;
			obj.gridFitType = "none";
			obj.maxChars = null;
			obj.mouseWheelEnabled = 0;
			obj.multiline = 0;
			obj.selectable = 0;
			obj.sharpness = 0;
			obj.textColor = 0;
			obj.thickness = 0;
			obj.type = "dynamic";
			obj.wordWrap = 0;
			obj.text = "";
			for (let key in obj) {
				if (!obj.hasOwnProperty(key)) {
					continue;
				}
				_this.setProperty(key, obj[key]);
			}
			_this.setTextFormat(new TextFormat());
		};

		/**
		 * @returns {string}
		 */
		TextField.prototype.getTagName = function()
		{
			return "__swf2js_input_element_" + this.instanceId;
		};

		/**
		 * @param format
		 */
		TextField.prototype.setTextFormat = function(format)
		{
			let _this = this;
			for (let name in format) {
				if (!format.hasOwnProperty(name)) {
					continue;
				}
				_this.setProperty(name, format[name]);
			}
		};

		/**
		 * @returns {*}
		 */
		TextField.prototype.getBounds = function(matrix)
		{
			let _this = this;
			if (matrix) {
				let bounds = _this.boundsMatrix(_this.bounds, matrix);
				for (let name in bounds) {
					if (!bounds.hasOwnProperty(name)) {
						continue;
					}
					bounds[name] /= 20;
				}
				return bounds;
			} else {
				return _this.bounds;
			}
		};

		/**
		 * @param bounds
		 */
		TextField.prototype.setBounds = function(bounds)
		{
			this.bounds = bounds;
		};

		/**
		 * InputElement
		 */
		TextField.prototype.setInputElement = function()
		{
			let _this = this;
			let variables = _this.variables;
			let _root = _this.getDisplayObject("_root");
			let stage = _root.getParentStage();
			let element = _document.createElement("textarea");
			let multiline = variables.multiline;
			let align = variables.align;
			let text = _this.initialText;
			if (!text) {
				text = variables.text;
			}

			element.onkeypress = null;
			if (!multiline) {
				element.onkeypress = function(e)
				{
					if (e.keyCode === 13) {
						return false;
					}
				};
			}

			element.style.position = "absolute";
			element.style.webkitBorderRadius = "0px";
			element.style.padding = "1px";
			element.style.margin = "0px";
			element.style.webkitAppearance = "none";
			element.style.resize = "none";
			element.style.border = "none";
			element.style.overflow = "hidden";
			element.style.backgroundColor = "transparent";
			element.style.zIndex = 0x7fffffff;
			element.style.textAlign = align;

			element.value = text;
			if (typeof text !== "string") {
				let str = "";
				let length = text.length;
				for (let i = 0; i < length; i++) {
					let txt = text[i];
					str += txt.innerText;
					if ((i + 1) !== length) {
						str += "\n";
					}
				}
				element.value = str;
			}

			element.id = _this.getTagName();
			let onBlur = function(stage, textField, el)
			{
				return function() {
					textField.setProperty("text", el.value);
					textField.inputActive = false;
					let div = _document.getElementById(stage.getName());
					if (div) {
						let element = _document.getElementById(textField.getTagName());
						if (element) {
							try {
								div.removeChild(element);
							} catch (e) {}
						}
					}
				};
			};

			element.onblur = onBlur(stage, _this, element);
			_this.input = element;
		};

		/**
		 * @param matrix
		 * @param stage
		 * @param visible
		 * @param mask
		 */
		TextField.prototype.setHitRange = function(matrix, stage, visible, mask)
		{
			let _this = this;
			let type = _this.variables.type;
			let isVisible = _min(_this.getVisible(), visible);
			if (type === "input" && isVisible) {
				let buttonHits = stage.buttonHits;
				let m2 = _this.multiplicationMatrix(matrix, _this.getMatrix());
				let bounds = _this.getBounds(m2);
				buttonHits[buttonHits.length] = {
					xMax: bounds.xMax,
					xMin: bounds.xMin,
					yMax: bounds.yMax,
					yMin: bounds.yMin,
					parent: _this
				};
			}
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @param visible
		 */
		TextField.prototype.render = function(ctx, matrix, colorTransform, stage, visible)
		{
			let _this = this;
			stage.doneTags.unshift(_this);

			// colorTransform
			let _multiplicationColor = _this.multiplicationColor;
			let rColorTransform = _multiplicationColor(colorTransform, _this.getColorTransform());
			let isVisible = _min(_this.getVisible(), visible);
			let stageClip = stage.clipMc || stage.isClipDepth;
			let alpha = rColorTransform[3] + (rColorTransform[7] / 255);
			if (!stageClip && (!alpha || !isVisible)) {
				return 0;
			}

			// matrix
			let _multiplicationMatrix = _this.multiplicationMatrix;
			let m2 = _multiplicationMatrix(matrix, _this.getMatrix());

			// pre render
			let obj = _this.preRender(ctx, m2, rColorTransform, stage, visible);
			let preCtx = obj.preCtx;
			let preMatrix = obj.preMatrix;
			let m3 = _multiplicationMatrix(stage.getMatrix(), preMatrix);
			preCtx.setTransform(m3[0], m3[1], m3[2], m3[3], m3[4], m3[5]);

			let textCacheKey = ["TextField"];
			let variables = _this.variables;
			let text = variables.text;
			let variable = variables.variable;
			if (variable) {
				let parent = _this.getParent();
				text = parent.getProperty(variable);
				if (text === undefined) {
					text = variables.text;
				}
			}

			if (typeof text === "number") {
				text += "";
			}

			let html = variables.html;
			if (html && typeof text === "string") {
				if (text.indexOf("<sbr />") !== -1) {
					text = text.replace(new RegExp("<sbr />", "gi"), "\n");
				}
				if (text.indexOf("<b>") !== -1) {
					text = text.replace(new RegExp("<b>", "gi"), "");
					text = text.replace(new RegExp("</b>", "gi"), "");
				}

				let span = _document.createElement("span");
				span.innerHTML = text;

				let tags = span.getElementsByTagName("p");
				let domLength = tags.length;
				if (domLength) {
					let tagData = [];
					for (let d = 0; d < domLength; d++) {
						tagData[d] = tags[d];
					}
					text = tagData;
				} else {
					text = span.innerText;
				}
			}
			preCtx.textBaseline = "top";
			if (text === undefined) {
				text = "";
			}

			let bounds = _this.getBounds();
			let xMax = bounds.xMax;
			let xMin = bounds.xMin;
			let yMax = bounds.yMax;
			let yMin = bounds.yMin;
			let W = _abs(_ceil(xMax - xMin));
			let H = _abs(_ceil(yMax - yMin));

			// auto size
			let scale = stage.getScale();
			let autoSize = variables.autoSize;
			let wordWrap = variables.wordWrap;
			let splitData = (typeof text === "string") ? text.split("\n") : text;
			let length = splitData.length;
			let i, txtObj, measureText;
			let txtTotalWidth = 0;
			let txtTotalHeight = 0;
			let isAutoSize = false;
			let autoMode = (typeof autoSize === "string") ? autoSize.toLowerCase() : autoSize;
			switch (autoMode) {
				default:
				case "none":
				case false:
				case 0:
					txtTotalWidth = W;
					txtTotalHeight = H;
					break;
				case true:
				case 1:
				case "left":
				case "center":
				case "right":
					isAutoSize = true;
					break;
			}

			let fontData = _this.getStage().getCharacter(_this.fontId);
			if (isAutoSize) {
				if (variables.embedFonts) {
					let CodeTable = fontData.CodeTable;
					let FontAdvanceTable = fontData.FontAdvanceTable;
					let fontScale = _this.fontScale;
					txtTotalWidth = 0;
					txtTotalHeight = (fontData.FontAscent * fontScale) + variables.leading;
					for (i = 0; i < length; i++) {
						txtObj = splitData[i];
						if (typeof txtObj !== "string") {
							let firstChild = txtObj.firstChild;
							txtTotalWidth = _this.getDomWidth(firstChild, CodeTable, FontAdvanceTable);
						} else {
							let txtLength = txtObj.length;
							for (let idx = 0; idx < txtLength; idx++) {
								let index = CodeTable.indexOf(txtObj[idx].charCodeAt(0));
								if (index === -1) {
									continue;
								}
								txtTotalWidth += (FontAdvanceTable[index] * fontScale);
							}
						}
					}
				} else {
					let addH = (variables.size * 20) + variables.leading;
					txtTotalHeight = (bounds.yMin + 80);
					if (wordWrap) {
						txtTotalWidth = W;
						for (i = 0; i < length; i++) {
							txtObj = splitData[i];
							if (typeof txtObj === "string") {
								measureText = preCtx.measureText(txtObj);
								let checkW = _ceil(measureText.width * 20);
								if (checkW > W) {
									txtTotalHeight += _ceil(_ceil(checkW / W) * addH);
								}
							}
						}
					} else {
						for (i = 0; i < length; i++) {
							txtObj = splitData[i];
							if (typeof txtObj === "string") {
								measureText = preCtx.measureText(txtObj);
								txtTotalWidth = _max(txtTotalWidth, _ceil(measureText.width * 20));
								txtTotalHeight += addH;
							}
						}
					}
					txtTotalWidth += 80;
				}
			}

			let offsetX = 40;
			switch (autoMode) {
				case "center":
					offsetX = _ceil((_max(txtTotalWidth, W) - _min(txtTotalWidth, W)) / 2);
					break;
				case "right":
					offsetX = _ceil(_max(txtTotalWidth, W) - _min(txtTotalWidth, W));
					break;
			}

			W = txtTotalWidth;
			H = txtTotalHeight;

			if (W > 0 && H > 0) {
				let isClipDepth = _this.isClipDepth || stageClip;
				let color;
				let rx = xMin;
				let ry = yMin;
				let m = _this._matrix;
				if (m) {
					rx = -xMin;
					ry = -yMin;
					let m4 = _multiplicationMatrix(preMatrix, [1, 0, 0, 1, xMin, yMin]);
					m3 = _multiplicationMatrix(stage.getMatrix(), m4);
					preCtx.setTransform(m3[0], m3[1], m3[2], m3[3], m3[4], m3[5]);
				}

				// border
				let border = variables.border;
				if (border && !isClipDepth) {
					preCtx.beginPath();
					preCtx.rect(rx - offsetX, ry, W, H);
					color = _this.generateColorTransform(variables.borderColor, rColorTransform);
					textCacheKey[textCacheKey.length] = color;
					preCtx.strokeStyle = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
					preCtx.lineWidth = _min(20, 1 / _min(m3[0], m3[3]));
					preCtx.globalAlpha = 1;
					preCtx.fillStyle = "rgba(0,0,0,0)";
					if (variables.background) {
						color = _this.generateColorTransform(variables.backgroundColor, rColorTransform);
						textCacheKey[textCacheKey.length] = color;
						preCtx.fillStyle = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
					}
					preCtx.fill();
					preCtx.stroke();
				}

				let textColor = variables.textColor;
				let objRGBA = textColor;
				if (typeof textColor === "number") {
					objRGBA = _this.intToRGBA(textColor, 100);
				}

				color = _this.generateColorTransform(objRGBA, rColorTransform);
				let fillStyle = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
				textCacheKey[textCacheKey.length] = fillStyle;
				preCtx.fillStyle = fillStyle;

				// font type
				let fontType = "";
				if (variables.italic) {
					fontType += "italic ";
				}
				if (variables.bold) {
					fontType += "bold ";
				}

				let fontStyle = fontType + variables.size + "px " + variables.font;
				textCacheKey[textCacheKey.length] = fontStyle;
				preCtx.font = fontStyle;

				if (_this.input !== null) {
					let input = _this.input;
					let fontSize = _ceil(variables.size * scale * _min(preMatrix[0], preMatrix[3]));
					input.style.font = fontType + fontSize + "px " + variables.font;
					input.style.color = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
					let as = variables.onChanged;
					if (as && !input.onchange) {
						let onChanged = function(stage, origin, clip, el)
						{
							return function()
							{
								if (clip.active) {
									clip.setProperty("text", el.value);
									origin.apply(clip, arguments);
									stage.executeAction();
								}
							};
						};
						input.onchange = onChanged(stage, as, _this, input);
					}
				}

				if (text && !isClipDepth) {
					preCtx.save();
					preCtx.beginPath();
					preCtx.rect(rx - offsetX, ry, W, (H - 40));
					preCtx.clip();

					if (_this.inputActive === false) {
						if (variables.embedFonts) {
							_this.renderOutLine(preCtx, fontData, splitData, m3, rx - offsetX, W, fillStyle);
						} else {
							_this.renderText(preCtx, splitData, m3, fontType, fillStyle);
						}
					}

					preCtx.restore();
					preCtx.globalAlpha = 1;
				}

				textCacheKey[textCacheKey.length] = text;
				let cacheKey = cacheStore.generateKey(
					textCacheKey.join("_"), _this.getCharacterId(), m3, rColorTransform);
				obj.cacheKey = cacheKey;
				if (obj.isFilter || obj.isBlend) {
					_this.postRender(ctx, matrix, rColorTransform, stage, obj);
				}
				return cacheKey;
			}

			return null;
		};

		/**
		 * @param ctx
		 * @param fontData
		 * @param splitData
		 * @param matrix
		 * @param offset
		 * @param width
		 * @param fillStyle
		 */
		TextField.prototype.renderOutLine = function(ctx, fontData, splitData, matrix, offset, width, fillStyle)
		{
			let _this = this;
			let variables = _this.variables;
			let fontScale = _this.fontScale;
			let leading = (fontData.FontAscent + fontData.FontDescent) * fontScale;
			let rightMargin = variables.rightMargin * fontScale;
			let leftMargin = variables.leftMargin * fontScale;
			let indent = variables.indent * fontScale;
			let align = variables.align;
			let txt = "";
			let CodeTable = fontData.CodeTable;
			let GlyphShapeTable = fontData.GlyphShapeTable;
			let FontAdvanceTable = fontData.FontAdvanceTable;
			let YOffset = (fontData.FontAscent * fontScale);
			let cacheYOffset = YOffset;
			let wordWrap = variables.wordWrap;
			let multiline = variables.multiline;
			let bounds = _this.getBounds();
			let areaWidth = (_ceil((bounds.xMax) - (bounds.xMin)) - leftMargin - rightMargin);
			let idx;
			let index;
			let length = splitData.length;
			let _multiplicationMatrix = _this.multiplicationMatrix;
			for (let i = 0; i < length; i++) {
				let XOffset = offset;
				let textWidth = 0;
				let txtLength = 0;
				let obj = splitData[i];
				let firstChild;
				if (typeof obj !== "string") {
					firstChild = obj.firstChild;
					if (!firstChild) {
						continue;
					}
					textWidth = _this.getDomWidth(firstChild, CodeTable, FontAdvanceTable);
					txt = obj.innerText;
					align = variables.align;
					if (obj.align) {
						align = obj.align;
					}
				} else {
					txt = obj;
					txtLength = txt.length;
					for (idx = 0; idx < txtLength; idx++) {
						index = CodeTable.indexOf(txt[idx].charCodeAt(0));
						if (index === -1) {
							continue;
						}
						textWidth += (FontAdvanceTable[index] * fontScale);
					}
				}

				if (align === "right") {
					XOffset += width - rightMargin - textWidth - 40;
				} else if (align === "center") {
					XOffset += indent + leftMargin + 40 + ((width - indent - leftMargin - rightMargin - textWidth) / 2);
				} else {
					XOffset += indent + leftMargin + 40;
				}

				let cacheXOffset = XOffset;
				let wordWidth = 0;
				if (typeof obj !== "string") {
					let gridData = {
						XOffset: XOffset,
						YOffset: YOffset,
						cacheXOffset: cacheXOffset,
						cacheYOffset: cacheYOffset,
						wordWidth: wordWidth,
						addXOffset: 0,
						size: firstChild.size,
						areaWidth: areaWidth,
						matrix: matrix
					};

					_this.renderDomOutLine(
						ctx, firstChild, gridData, fillStyle,
						CodeTable, FontAdvanceTable, GlyphShapeTable
					);
				} else {
					for (idx = 0; idx < txtLength; idx++) {
						index = CodeTable.indexOf(txt[idx].charCodeAt(0));
						if (index === -1) {
							continue;
						}

						let addXOffset = FontAdvanceTable[index] * fontScale;
						if (wordWrap && multiline) {
							if (wordWidth + addXOffset > areaWidth) {
								XOffset = cacheXOffset;
								YOffset += cacheYOffset;
								wordWidth = 0;
							}
						}

						let m2 = _multiplicationMatrix(matrix, [fontScale, 0, 0, fontScale, XOffset, YOffset]);
						ctx.setTransform(m2[0], m2[1], m2[2], m2[3], m2[4], m2[5]);
						_this.renderGlyph(GlyphShapeTable[index], ctx);
						XOffset += addXOffset;
						wordWidth += addXOffset;
					}
				}

				YOffset += leading;
			}
		};

		/**
		 * @param ctx
		 * @param child
		 * @param gridData
		 * @param fillStyle
		 * @param CodeTable
		 * @param FontAdvanceTable
		 * @param GlyphShapeTable
		 */
		TextField.prototype.renderDomOutLine = function(
			ctx, child, gridData, fillStyle,
			CodeTable, FontAdvanceTable, GlyphShapeTable
		) {
			let _this = this;
			let variables = _this.variables;
			let wordWrap = variables.wordWrap;
			let multiline = variables.multiline;
			let _multiplicationMatrix = _this.multiplicationMatrix;
			let stage = _this.getStage();
			let fonts = stage.fonts;
			let face = child.face;
			let fontData = fonts[face];
			let codeTable = CodeTable;
			let faTable = FontAdvanceTable;
			let shapeTable = GlyphShapeTable;
			let color = fillStyle;
			if (fontData) {
				codeTable = fontData.CodeTable;
				faTable = fontData.FontAdvanceTable;
				shapeTable = fontData.GlyphShapeTable;
			}

			if (child.color) {
				color = child.color;
			}

			if (child.size) {
				gridData.size = child.size;
			}

			let childNodes = child.childNodes;
			let length = childNodes.length;
			for (let i = 0; i < length; i++) {
				let node = childNodes[i];
				if (node instanceof HTMLFontElement) {
					_this.renderDomOutLine(
						ctx, node, gridData, color,
						codeTable, faTable, shapeTable
					);
				} else {
					let size = gridData.size;
					let fontScale = size / 1024;
					let sTable;
					let values = node.nodeValue;
					if (!values) {
						continue;
					}
					let vLength = values.length;
					for (let idx = 0; idx < vLength; idx++) {
						let txt = values[idx];
						let index = codeTable.indexOf(txt.charCodeAt(0));
						if (index === -1) {
							index = CodeTable.indexOf(txt.charCodeAt(0));
							if (index === -1) {
								continue;
							}
							color = fillStyle;
							gridData.addXOffset = FontAdvanceTable[index] * fontScale;
							sTable = GlyphShapeTable;
						} else {
							gridData.addXOffset = faTable[index] * fontScale;
							sTable = shapeTable;
						}

						if (wordWrap && multiline) {
							if (gridData.wordWidth + gridData.addXOffset > gridData.areaWidth) {
								gridData.XOffset = gridData.cacheXOffset;
								gridData.YOffset += gridData.cacheYOffset;
								gridData.wordWidth = 0;
							}
						}

						let m2 = [fontScale, 0, 0, fontScale, gridData.XOffset, gridData.YOffset];
						let m3 = _multiplicationMatrix(gridData.matrix, m2);
						ctx.setTransform(m3[0], m3[1], m3[2], m3[3], m3[4], m3[5]);
						ctx.fillStyle = color;
						_this.renderGlyph(sTable[index], ctx);
						gridData.XOffset += gridData.addXOffset;
						gridData.wordWidth += gridData.addXOffset;
					}
				}
			}
		};

		/**
		 * @param child
		 * @param CodeTable
		 * @param FontAdvanceTable
		 * @returns {number}
		 */
		TextField.prototype.getDomWidth = function(child, CodeTable, FontAdvanceTable)
		{
			let _this = this;
			let fontScale = _this.fontScale;
			let stage = _this.getStage();
			let fonts = stage.fonts;
			let width = 0;
			let face = child.face;
			let fontData = fonts[face];
			let codeTable = CodeTable;
			let faTable = FontAdvanceTable;
			if (fontData) {
				codeTable = fontData.CodeTable;
				faTable = fontData.FontAdvanceTable;
			}

			let childNodes = child.childNodes;
			let length = childNodes.length;
			for (let i = 0; i < length; i++) {
				let node = childNodes[i];
				if (node instanceof HTMLFontElement) {
					width += _this.getDomWidth(node, codeTable, faTable);
				} else {
					let values = node.nodeValue;
					if (!values) {
						continue;
					}
					let vLength = values.length;
					for (let idx = 0; idx < vLength; idx++) {
						let txt = values[idx];
						let index = codeTable.indexOf(txt.charCodeAt(0));
						if (index === -1) {
							index = CodeTable.indexOf(txt.charCodeAt(0));
							if (index === -1) {
								continue;
							}
							width += (FontAdvanceTable[index] * fontScale);
						} else {
							width += (faTable[index] * fontScale);
						}
					}
				}
			}
			return width;
		};

		/**
		 * @param records
		 * @param ctx
		 */
		TextField.prototype.renderGlyph = function(records, ctx)
		{
			if (!records.data) {
				records.data = vtc.convert(records);
			}

			let shapes = records.data;
			let shapeLength = shapes.length;
			for (let idx = 0; idx < shapeLength; idx++) {
				let styleObj = shapes[idx];
				let cmd = styleObj.cmd;
				ctx.beginPath();
				cmd(ctx);
				ctx.fill();
			}
		};

		/**
		 * @param ctx
		 * @param splitData
		 * @param matrix
		 * @param fontType
		 * @param fillStyle
		 */
		TextField.prototype.renderText = function(ctx, splitData, matrix, fontType, fillStyle, _x)
		{
			let _this = this;
			let variables = _this.variables;
			let wordWrap = variables.wordWrap;
			let multiline = variables.multiline;
			let leading = variables.leading / 20;
			let rightMargin = variables.rightMargin / 20;
			let leftMargin = variables.leftMargin / 20;
			let indent = variables.indent / 20;
			let align = variables.align;
			let bounds = _this.getBounds();
			let xMax = bounds.xMax / 20;
			let xMin = bounds.xMin / 20;
			let width = _ceil(xMax - xMin);

			let m2 = [matrix[0] * 20, matrix[1] * 20, matrix[2] * 20, matrix[3] * 20, matrix[4], matrix[5]];
			let xScale = _sqrt(m2[0] * m2[0] + m2[1] * m2[1]);
			let yScale = _sqrt(m2[2] * m2[2] + m2[3] * m2[3]);
			let scale = _max(xScale, yScale);
			ctx.setTransform(scale, m2[1], m2[2], scale, m2[4], m2[5]);

			let dx = xMin;
			let dy = (bounds.yMin / 20) + 2;
			if (align === "right") {
				ctx.textAlign = "end";
				dx += width - rightMargin - 2;
			} else if (align === "center") {
				ctx.textAlign = "center";
				dx += leftMargin + indent + ((width - leftMargin - indent - rightMargin) / 2);
			} else {
				dx += 2 + leftMargin + indent;
			}

			bounds = _this.getBounds(m2);
			let areaWidth = (bounds.xMax - bounds.xMin) - ((leftMargin - rightMargin) * xScale);
			areaWidth /= scale;

			let size = variables.size;
			let length = splitData.length;
			for (let i = 0; i < length; i++) {
				let txt = "";
				let obj = splitData[i];
				if (typeof obj !== "string") {
					txt = obj.innerText;
				} else {
					txt = obj;
				}

				if (txt === "") {
					dy += leading + size;
					continue;
				}

				let measureText = ctx.measureText(txt);
				let txtTotalWidth = measureText.width;
				if (typeof obj === "string") {
					if (wordWrap || multiline) {
						if (txtTotalWidth > areaWidth) {
							let txtLength = txt.length;
							let joinTxt = "";
							let joinWidth = 2 * scale;
							for (let t = 0; t < txtLength; t++) {
								let txtOne = txt[t];
								let textOne = ctx.measureText(txtOne);
								joinWidth += textOne.width;
								joinTxt += txtOne;
								let nextOne = txt[t + 1];
								if (nextOne) {
									textOne = ctx.measureText(nextOne);
									joinWidth += textOne.width;
								}
								if (joinWidth > areaWidth || (t + 1) === txtLength) {
									ctx.fillText(joinTxt, dx, dy, _ceil(joinWidth));
									joinWidth = 2 * scale;
									joinTxt = "";
									dy += leading + size;
								} else if (nextOne) {
									joinWidth -= textOne.width;
								}
							}
						} else {
							ctx.fillText(txt, dx, dy, txtTotalWidth);
							dy += leading + size;
						}
					} else {
						ctx.fillText(txt, dx, dy, txtTotalWidth);
						dy += leading + size;
					}
				} else {
					let firstChild = obj.firstChild;
					let gridData = {
						startDx: dx,
						dx: dx,
						cloneDy: dy,
						dy: dy,
						color: fillStyle,
						fontType: fontType,
						fillStyle: fillStyle,
						size: size,
						scale: scale,
						originSize: size,
						txtTotalWidth: txtTotalWidth,
						areaWidth: areaWidth,
						joinWidth: 0,
						joinTxt: "",
						offset: 0,
						offsetArray: []
					};

					if (gridData.offsetArray.length === 0) {
						_this.offsetDomText(ctx, firstChild, gridData);
					}

					// reset
					gridData.dx = dx;
					gridData.dy = dy;
					gridData.cloneDy = dy;
					gridData.size = size;
					gridData.joinWidth = 0;
					gridData.joinTxt = "";
					gridData.offset = 0;
					if (gridData.offsetArray.length > 0) {
						let offsetY = gridData.offsetArray[0];
						if (offsetY) {
							gridData.dy += offsetY;
							gridData.cloneDy = gridData.dy;
						}
					}

					_this.renderDomText(ctx, firstChild, gridData);

					dy = gridData.dy;
				}
			}
		};

		/**
		 * @param ctx
		 * @param child
		 * @param gridData
		 */
		TextField.prototype.offsetDomText = function(ctx, child, gridData)
		{
			let _this = this;
			let variables = _this.variables;
			let wordWrap = variables.wordWrap;
			let multiline = variables.multiline;
			let leading = variables.leading / 20;
			if (child.face) {
				gridData.face = child.face;
			}

			if (child.size) {
				let size = child.size | 0;
				let changeSize = gridData.originSize - size;
				if (changeSize) {
					gridData.dy += changeSize;
					if (changeSize > 0) {
						gridData.dy -= 4;
					} else {
						let offsetArray = gridData.offsetArray;
						let offset = gridData.offset;
						let offsetSize = offsetArray[offset];
						if (offsetSize) {
							offsetArray[offset] = _max(offsetSize, ~changeSize);
						} else {
							offsetArray[offset] = ~changeSize;
						}
						gridData.dy += 6;
					}
				}
				gridData.size = size;
			}

			let childNodes = child.childNodes;
			let length = childNodes.length;
			for (let i = 0; i < length; i++) {
				let node = childNodes[i];
				if (node instanceof HTMLFontElement) {
					_this.offsetDomText(ctx, node, gridData);
				} else {
					let txt = node.nodeValue;
					if (wordWrap && multiline) {
						if (gridData.txtTotalWidth > gridData.areaWidth) {
							let txtLength = txt.length;
							for (let t = 0; t < txtLength; t++) {
								let textOne = ctx.measureText(txt[t]);
								gridData.joinWidth += textOne.width;
								gridData.joinTxt += txt[t];
								let isOver = (gridData.joinWidth > gridData.areaWidth);
								if (isOver || (t + 1) === txtLength) {
									if ((gridData.dx + textOne.width) > gridData.areaWidth) {
										gridData.dx = gridData.startDx;
										gridData.dy += leading + gridData.size;
										gridData.cloneDy = gridData.dy;
										gridData.joinWidth = 2 * gridData.scale;
										isOver = false;
										gridData.offset++;
									}

									gridData.joinTxt = "";
									if (isOver) {
										gridData.dx = gridData.startDx;
										gridData.joinWidth = 22 * gridData.scale;
										gridData.dy += leading + gridData.size;
										gridData.cloneDy = gridData.dy;
										gridData.offset++;
									}
								}
							}
						} else {
							gridData.dy += leading + gridData.size;
							gridData.cloneDy = gridData.dy;
							gridData.offset++;
						}
					} else {
						gridData.dy += leading + gridData.size;
						gridData.cloneDy = gridData.dy;
						gridData.offset++;
					}

					let mText = ctx.measureText(txt);
					gridData.dx += mText.width;
					gridData.size = gridData.originSize;
					gridData.dy = gridData.cloneDy;
				}
			}
		};

		/**
		 * @param ctx
		 * @param child
		 * @param gridData
		 */
		TextField.prototype.renderDomText = function(ctx, child, gridData)
		{
			let _this = this;
			let variables = _this.variables;
			let wordWrap = variables.wordWrap;
			let multiline = variables.multiline;
			let leading = variables.leading / 20;

			if (child.face) {
				gridData.face = child.face;
			}

			if (child.color) {
				gridData.color = child.color;
			}

			if (child.size) {
				let size = child.size | 0;
				let changeSize = gridData.originSize - size;
				if (changeSize) {
					gridData.dy += changeSize;
					if (changeSize > 0) {
						gridData.dy -= 4;
					} else {
						gridData.dy += 8;
					}
				}
				gridData.size = size;
			}

			let offsetY;
			let childNodes = child.childNodes;
			let length = childNodes.length;
			for (let i = 0; i < length; i++) {
				let node = childNodes[i];
				if (node instanceof HTMLFontElement) {
					_this.renderDomText(ctx, node, gridData);
				} else {
					ctx.fillStyle = gridData.color;
					ctx.font = gridData.fontType + gridData.size + "px " + gridData.face;

					let text = node.nodeValue;
					let splits = text.split("\n");
					let sLen = splits.length;
					for (let idx = 0; idx < sLen; idx++) {
						gridData.dx = gridData.startDx;
						let txt = splits[idx];

						if (wordWrap && multiline) {
							if (gridData.txtTotalWidth > gridData.areaWidth) {
								let txtLength = txt.length;
								for (let t = 0; t < txtLength; t++) {
									let textOne = ctx.measureText(txt[t]);
									gridData.joinWidth += textOne.width;
									gridData.joinTxt += txt[t];
									let isOver = (gridData.joinWidth > gridData.areaWidth);
									if (isOver || (t + 1) === txtLength) {
										if ((gridData.dx + textOne.width) > gridData.areaWidth) {
											isOver = 0;
											gridData.joinWidth = gridData.size;
											gridData.dx = gridData.startDx;
											gridData.offset++;
											gridData.dy += leading + gridData.size;
											if (gridData.offsetArray.length > 0) {
												offsetY = gridData.offsetArray[gridData.offset];
												if (offsetY) {
													gridData.dy += offsetY;
												}
											}
											gridData.cloneDy = gridData.dy;
										}

										ctx.fillText(gridData.joinTxt, gridData.dx, gridData.dy, _ceil(gridData.joinWidth));
										gridData.joinTxt = "";
										if (isOver) {
											gridData.dx = gridData.startDx;
											gridData.joinWidth = gridData.size;
											gridData.offset++;
											gridData.dy += leading + gridData.size;
											if (gridData.offsetArray.length > 0) {
												offsetY = gridData.offsetArray[gridData.offset];
												if (offsetY) {
													gridData.dy += offsetY;
												}
											}
											gridData.cloneDy = gridData.dy;
										}
									}
								}
							} else {
								ctx.fillText(txt, gridData.dx, gridData.dy, _ceil(gridData.txtTotalWidth));
								gridData.offset++;
								gridData.dy += leading + gridData.size;
								if (gridData.offsetArray.length > 0) {
									offsetY = gridData.offsetArray[gridData.offset];
									if (offsetY) {
										gridData.dy += offsetY;
									}
								}
								gridData.cloneDy = gridData.dy;
							}
						} else {
							ctx.fillText(txt, gridData.dx, gridData.dy, _ceil(gridData.txtTotalWidth));
							gridData.offset++;
							gridData.dy += leading + gridData.size;
							if (gridData.offsetArray.length > 0) {
								offsetY = gridData.offsetArray[gridData.offset];
								if (offsetY) {
									gridData.dy += offsetY;
								}
							}
							gridData.cloneDy = gridData.dy;
						}

						let mText = ctx.measureText(txt);
						gridData.dx += mText.width;
						gridData.color = gridData.fillStyle;
						gridData.size = gridData.originSize;
						gridData.dy = gridData.cloneDy;
					}
				}
			}
		};

		/**
		 * @param stage
		 * @param clipEvent
		 */
		TextField.prototype.putFrame = function(stage, clipEvent)
		{
			let _this = this;
			_this.active = true;
			if (_this.inputActive === false) {
				_this.dispatchEvent(clipEvent, stage);
			}
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param stage
		 * @param x
		 * @param y
		 * @returns {boolean}
		 */
		TextField.prototype.renderHitTest = function(ctx, matrix, stage, x, y)
		{
			let _this = this;
			let bounds = _this.getBounds();
			let xMax = bounds.xMax;
			let xMin = bounds.xMin;
			let yMax = bounds.yMax;
			let yMin = bounds.yMin;
			let width = _ceil(xMax - xMin);
			let height = _ceil(yMax - yMin);

			let _multiplicationMatrix = _this.multiplicationMatrix;
			let m2 = _multiplicationMatrix(matrix, _this.getMatrix());
			let m3 = _multiplicationMatrix(stage.getMatrix(), m2);
			ctx.setTransform(m3[0], m3[1], m3[2], m3[3], m3[4], m3[5]);

			let m = _this._matrix;
			if (m) {
				xMin = -xMin;
				yMin = -yMin;
				let m4 = _multiplicationMatrix(m2, [1, 0, 0, 1, xMin, yMin]);
				let m5 = _multiplicationMatrix(stage.getMatrix(), m4);
				ctx.setTransform(m5[0], m5[1], m5[2], m5[3], m5[4], m5[5]);
			}

			ctx.beginPath();
			ctx.rect(xMin, yMin, width, height);
			return ctx.isPointInPath(x, y);
		};

		// dummy
		TextField.prototype.initFrame = function() {};
		TextField.prototype.addActions = function() {};
		TextField.prototype.getTags = function() { return undefined; };

		/**
		 * @constructor
		 */
		let SimpleButton = function()
		{
			let _this = this;
			InteractiveObject.call(_this);

			_this.actions = [];
			_this._downState = new Sprite();
			_this._hitState = new Sprite();
			_this._overState = new Sprite();
			_this._upState = new Sprite();
		};

		/**
		 * extends
		 * @type {InteractiveObject}
		 */
		SimpleButton.prototype = Object.create(InteractiveObject.prototype);
		SimpleButton.prototype.constructor = SimpleButton;

		/**
		 * properties
		 */
		Object.defineProperties(SimpleButton.prototype,
		{
			downState: {
				get: function() {
					return this.getSprite("down");
				},
				set: function(sprite) {
					this.setSprite("down", sprite);
				}
			},
			hitState: {
				get: function() {
					return this.getSprite("hit");
				},
				set: function(sprite) {
					this.setSprite("hit", sprite);
				}
			},
			overState: {
				get: function() {
					return this.getSprite("over");
				},
				set: function(sprite) {
					this.setSprite("over", sprite);
				}
			},
			upState: {
				get: function() {
					return this.getSprite("up");
				},
				set: function(sprite) {
					this.setSprite("up", sprite);
				}
			}
		});

		/**
		 *
		 * @returns {Array|ActionScript|*|actions}
		 */
		SimpleButton.prototype.getActions = function()
		{
			return this.actions;
		};

		/**
		 * @param actions
		 */
		SimpleButton.prototype.setActions = function(actions)
		{
			this.actions = actions;
		};

		/**
		 * @param status
		 */
		SimpleButton.prototype.setButtonStatus = function(status)
		{
			let _this = this;
			if (_this.getButtonStatus() !== status) {
				_this.buttonReset(status);
			}
			_this.buttonStatus = status;
		};

		/**
		 * @param status
		 * @returns {*}
		 */
		SimpleButton.prototype.getSprite = function(status)
		{
			let _this = this;
			if (!status) {
				status = _this.buttonStatus;
			}
			status += "State";
			return _this["_" + status];
		};

		/**
		 * @param status
		 * @param sprite
		 */
		SimpleButton.prototype.setSprite = function(status, sprite)
		{
			let _this = this;
			let stage = _this.getStage();

			// DefineButtonSound
			// 0 OverUpToIdle     : Roll Out     up
			// 1 IdleToOverUp     : Roll Over    over
			// 2 OverUpToOverDown : Press        down
			// 3 OverDownToOverUp : Release      hit

			let level = 0;
			switch (status) {
				case "down":
					level = 1;
					break;
				case "hit":
					level = 2;
					break;
				case "over":
					level = 3;
					break;
				case "up":
					level = 4;
					break;
			}

			stage.setPlaceObject(new PlaceObject(), _this.instanceId, level, 0);
			sprite.setParent(_this);
			sprite.setLevel(level);
			sprite.setStage(stage);
			let container = sprite.getContainer();
			for (let depth in container) {
				if (!container.hasOwnProperty(depth)) {
					continue;
				}

				let instanceId = container[depth];
				let obj = stage.getInstance(instanceId);
				obj.setParentSprite(sprite);
			}

			status += "State";
			_this["_" + status] = sprite;
		};

		/**
		 * @param matrix
		 * @param status
		 * @returns {{xMin: number, xMax: number, yMin: number, yMax: number}}
		 */
		SimpleButton.prototype.getBounds = function(matrix, status)
		{
			let _this = this;
			let xMax = 0;
			let yMax = 0;
			let xMin = 0;
			let yMin = 0;

			let sprite = _this.getSprite(status);
			let tags = sprite.getContainer();
			let length = tags.length;
			if (length) {
				let stage = _this.getStage();
				let no = _Number.MAX_VALUE;
				xMax = -no;
				yMax = -no;
				xMin = no;
				yMin = no;

				let _multiplicationMatrix = _this.multiplicationMatrix;
				for (let depth in tags) {
					if (!tags.hasOwnProperty(depth)) {
						continue;
					}

					let instanceId = tags[depth];
					let tag = stage.getInstance(instanceId);
					if (!tag || tag.isClipDepth) {
						continue;
					}

					let matrix2 = (matrix) ? _multiplicationMatrix(matrix, tag.getMatrix()) : tag.getMatrix();
					let bounds = tag.getBounds(matrix2, status);
					if (!bounds) {
						continue;
					}
					xMin = _min(xMin, bounds.xMin);
					xMax = _max(xMax, bounds.xMax);
					yMin = _min(yMin, bounds.yMin);
					yMax = _max(yMax, bounds.yMax);
				}
			}
			return {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};
		};

		/**
		 * @param status
		 */
		SimpleButton.prototype.buttonReset = function(status)
		{
			let _this = this;
			let sprite = _this.getSprite();
			let container = sprite.getContainer();
			let nextSprite = _this.getSprite(status);
			let nextContainer = nextSprite.getContainer();
			let stage = _this.getStage();
			for (let depth in container) {
				if (!container.hasOwnProperty(depth)) {
					continue;
				}
				let instanceId = container[depth];
				if (depth in nextContainer && instanceId === nextContainer[depth]) {
					continue;
				}
				let instance = stage.getInstance(instanceId);
				if (!instance) {
					continue;
				}
				instance.reset();
			}
		};

		/**
		 * @param matrix
		 * @param stage
		 * @param visible
		 * @param mask
		 */
		SimpleButton.prototype.setHitRange = function(matrix, stage, visible, mask)
		{
			let _this = this;
			let isVisible = _min(_this.getVisible(), visible);
			if (_this.getEnabled() && isVisible) {
				let buttonHits = stage.buttonHits;

				// enter
				if (_isTouchEvent) {
					let actions = _this.getActions();
					let aLen = actions.length;
					if (aLen) {
						for (let idx = 0; idx < aLen; idx++) {
							let cond = actions[idx];
							if (cond.CondKeyPress === 13) {
								buttonHits[buttonHits.length] = {
									button: _this,
									xMin: 0,
									xMax: stage.getWidth(),
									yMin: 0,
									yMax: stage.getHeight(),
									CondKeyPress: cond.CondKeyPress,
									parent: _this.getParent()
								};
							}
						}
					}
				}

				let status = "hit";
				let hitTest = _this.getSprite(status);
				let hitTags = hitTest.getContainer();
				if (!hitTags.length) {
					status = "up";
					hitTest = _this.getSprite(status);
					hitTags = hitTest.getContainer();
				}

				if (hitTags.length) {
					let m2 = _this.multiplicationMatrix(matrix, _this.getMatrix());
					let bounds = _this.getBounds(m2, status);
					if (bounds) {
						buttonHits[buttonHits.length] = {
							button: _this,
							xMin: bounds.xMin,
							xMax: bounds.xMax,
							yMin: bounds.yMin,
							yMax: bounds.yMax,
							CondKeyPress: 0,
							parent: _this.getParent(),
							matrix: _this.cloneArray(matrix)
						};
					}
				}
			}
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param colorTransform
		 * @param stage
		 * @param visible
		 */
		SimpleButton.prototype.render = function(ctx, matrix, colorTransform, stage, visible)
		{
			let _this = this;

			// colorTransform
			let _multiplicationColor = _this.multiplicationColor;
			let rColorTransform = _multiplicationColor(colorTransform, _this.getColorTransform());

			// matrix
			let _multiplicationMatrix = _this.multiplicationMatrix;
			let m2 = _multiplicationMatrix(matrix, _this.getMatrix());

			// pre render
			let isVisible = _min(_this.getVisible(), visible);
			let obj = _this.preRender(ctx, m2, rColorTransform, stage, isVisible);

			// render
			let sprite = _this.getSprite();
			let rMatrix = _multiplicationMatrix(obj.preMatrix, sprite.getMatrix());
			let rColorTransform2 = _multiplicationColor(rColorTransform, sprite.getColorTransform());
			isVisible = _min(sprite.getVisible(), visible);
			let cacheKey = obj.cacheKey;
			cacheKey += sprite.render(obj.preCtx, rMatrix, rColorTransform2, stage, isVisible);

			// post render
			if (obj.isFilter || obj.isBlend) {
				obj.cacheKey = cacheKey;
				_this.postRender(ctx, matrix, colorTransform, stage, obj);
			}
			return cacheKey;
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param stage
		 * @param x
		 * @param y
		 * @returns {boolean}
		 */
		SimpleButton.prototype.renderHitTest = function(ctx, matrix, stage, x, y)
		{
			let _this = this;

			let sprite = _this.getSprite("hit");
			let tags = sprite.getContainer();
			let length = tags.length;
			if (!length) {
				return false;
			}

			let _multiplicationMatrix = _this.multiplicationMatrix;
			let m2 = _multiplicationMatrix(matrix, _this.getMatrix());
			let m3 = _multiplicationMatrix(m2, sprite.getMatrix());

			if (length) {
				let loadStage = _this.getStage();
				for (let depth in tags) {
					if (!tags.hasOwnProperty(depth)) {
						continue;
					}

					let instanceId = tags[depth];
					let tag = loadStage.getInstance(instanceId);
					if (!tag) {
						continue;
					}

					let hit = tag.renderHitTest(ctx, m3, stage, x, y);
					if (hit) {
						return hit;
					}
				}
			}

			return false;
		};

		/**
		 * @param ctx
		 * @param matrix
		 * @param stage
		 * @param x
		 * @param y
		 * @returns {*}
		 */
		SimpleButton.prototype.hitCheck = function(ctx, matrix, stage, x, y)
		{
			let _this = this;

			let sprite = _this.getSprite("hit");
			let tags = sprite.getContainer();
			let length = tags.length;
			if (!length) {
				return false;
			}

			let _multiplicationMatrix = _this.multiplicationMatrix;
			let m2 = _multiplicationMatrix(matrix, _this.getMatrix());
			let m3 = _multiplicationMatrix(m2, sprite.getMatrix());

			let hitObj = false;
			let hit = false;
			if (length) {
				let loadStage = _this.getStage();
				tags.reverse();
				for (let depth in tags) {
					if (!tags.hasOwnProperty(depth)) {
						continue;
					}

					let tagId = tags[depth];
					let instance = loadStage.getInstance(tagId);
					if (instance instanceof Shape ||
						instance instanceof StaticText ||
						instance instanceof TextField
					) {
						hit = instance.renderHitTest(ctx, m3, stage, x, y);
					} else {
						hit = instance.hitCheck(ctx, m3, stage, x, y);
					}

					if (hit) {
						hitObj = hit;
						if (typeof hit !== "object") {
							let events = _this.events;
							if (events.press !== undefined ||
								events.release !== undefined ||
								events.releaseOutside !== undefined ||
								events.rollOver !== undefined ||
								events.rollOut !== undefined ||
								events.dragOver !== undefined ||
								events.dragOut !== undefined
							) {
								stage.isHit = hit;
								hitObj = {
									parent: _this.getParent(),
									button: _this
								};
							}
						}

						tags.reverse();
						return hitObj;
					}
				}
				tags.reverse();
			}

			return false;
		};

		/**
		 * @see MovieClip.addActions
		 */
		SimpleButton.prototype.addActions = function(stage)
		{
			let _this = this;
			let sprite = _this.getSprite();
			let tags = sprite.getContainer();
			let length = tags.length;
			if (length) {
				let myStage = _this.getStage();
				for (let depth in tags) {
					if (!tags.hasOwnProperty(depth)) {
						continue;
					}
					let instanceId = tags[depth];
					let tag = myStage.getInstance(instanceId);
					if (!tag) {
						continue;
					}
					tag.addActions(stage);
				}
			}
		};

		/**
		 * Dummy
		 * @returns {undefined}
		 */
		SimpleButton.prototype.getTags = function() { return undefined; };
		SimpleButton.prototype.initFrame = function() {};

		/**
		 * @constructor
		 */
		let MovieClip = function()
		{
			let _this = this;
			Sprite.call(_this);

			_this._currentframe = 1;
			_this._previousframe = 0;
			_this.removeTags = [];
			_this.actions = [];
			_this.labels = [];

			// flag
			_this.stopFlag = false;
			_this.isAction = true;

			// clip
			_this.isClipDepth = false;
			_this.clipDepth = 0;

			// sound
			_this.startSounds = [];
			_this.soundStopFlag = false;
		};

		/**
		 * extends
		 * @type {Sprite}
		 */
		MovieClip.prototype = Object.create(Sprite.prototype);
		MovieClip.prototype.constructor = MovieClip;

		/**
		 * @param name
		 * @param stage
		 */
		MovieClip.prototype.dispatchOnEvent = function(name, stage)
		{
			let _this = this;
			let as = _this.variables[name];
			if (as) {
				_this.setActionQueue(as, stage);
			} else {
				as = _this.getProperty(name);
				if (as) {
					_this.setActionQueue(as, stage);
				}
			}
		};

		/**
		 * @param name
		 * @param depth
		 * @returns {MovieClip}
		 */
		MovieClip.prototype.createEmptyMovieClip = function(name, depth)
		{
			let _this = this;
			let stage = _this.getStage();

			if (name === undefined) {
				return undefined;
			}

			let mc = _this.getDisplayObject(name);
			if (!mc) {
				mc = new MovieClip();
			}

			depth += 16384;

			mc.setName(name);
			mc.setLevel(depth);
			mc.setParent(_this);
			mc.setStage(stage);

			let container = _this.getContainer();
			let totalFrames = _this.getTotalFrames() + 1;
			let placeObject = new PlaceObject();
			let instanceId = _this.instanceId;
			for (let frame = 1; frame < totalFrames; frame++) {
				if (!(frame in container)) {
					container[frame] = [];
				}
				container[frame][depth] = mc.instanceId;
				stage.setPlaceObject(placeObject, instanceId, depth, frame);
			}
			return mc;
		};

		/**
		 * @param name
		 * @param depth
		 * @param x
		 * @param y
		 * @param width
		 * @param height
		 * @returns {TextField}
		 */
		MovieClip.prototype.createTextField = function(name, depth, x, y, width, height)
		{
			if (16384 > depth) {
				depth += 16384;
			}
			let _this = this;
			let textField = new TextField(name, depth, width, height);
			textField.setX(x);
			textField.setY(y);
			textField.setParent(_this);
			textField.setStage(_this.getStage());
			textField.setInitParams();
			let container = _this.getContainer();
			for (let frame in container) {
				if (!container.hasOwnProperty(frame)) {
					continue;
				}
				container[frame][depth] = textField.instanceId;
			}
			return textField;
		};

		/**
		 * @param r
		 * @param g
		 * @param b
		 */
		MovieClip.prototype.setBackgroundColor = function(r, g, b)
		{
			let _this = this;
			let stage = _this.getStage();
			stage.setBackgroundColor(r, g, b);
		};

		/**
		 * play
		 */
		MovieClip.prototype.play = function()
		{
			let _this = this;
			this.stopFlag = false;
			_this.startStopSoundStreams(_this.stopFlag, _this._currentframe, _this.characterId);
		};

		/**
		 * stop
		 */
		MovieClip.prototype.stop = function()
		{
			let _this = this;
			this.stopFlag = true;
			_this.startStopSoundStreams(_this.stopFlag, _this._currentframe, _this.characterId);
		};

		/**
		 * @param frame
		 */
		MovieClip.prototype.gotoAndPlay = function(frame)
		{
			let _this = this;
			let stage = _this.getStage();
			if (!_isNaN(frame)) {
				frame = +frame;
			} else if (typeof frame === "string") {
				frame = _this.getLabel(frame);
			}

			if (typeof frame === "number" && frame > 0) {
				// reset all sounds
				// stage.stopAllSounds();
				_this.setPreviousFrame(_this.getCurrentFrame());
				_this.setNextFrame(frame);
				_this.play();
			}
		};

		/**
		 * @param frame
		 */
		MovieClip.prototype.gotoAndStop = function(frame)
		{
			let _this = this;
			let stage = _this.getStage();
			if (typeof frame === "string") {
				frame = _this.getLabel(frame);
			}
			frame |= 0;
			if (typeof frame === "number" && frame > _this.getTotalFrames()) {
				frame = _this.getTotalFrames();
				_this.isAction = false;
			}
			if (frame > 0) {
				// stage.stopAllSounds();
				_this.setPreviousFrame(_this.getCurrentFrame());
				_this.setNextFrame(frame);
				_this.stop();
			}
		};

		/**
		 * stopAllSounds
		 */
		MovieClip.prototype.stopAllSounds = function ()
		{
			let stage = this.getStage();
			stage.stopAllSounds();
		};


		/**
		 * @param url
		 * @param target
		 * @param SendVarsMethod
		 * @returns {number}
		 */
		MovieClip.prototype.loadMovie = function(url, target, SendVarsMethod)
		{
			let _this = this;
			let stage = _this.getStage();
			let targetMc = null;

			if (!target) {
				target = _this.getName();
				targetMc = _this;
			}

			if (!targetMc) {
				if (typeof target === "string") {
					let _level = target.substr(0, 6);
					if (_level === "_level") {
						target = +target.substr(6);
					}
				}
				if (typeof target === "number") {
					let parent = stage.getParent();
					if (!parent) {
						parent = stage.getParent();
					}
					let tags = parent.getTags();
					targetMc = tags[target];
				} else {
					targetMc = _this.getDisplayObject(target);
				}
			}

			if (targetMc) {
				_this.unloadMovie(targetMc);

				let xmlHttpRequest = new XMLHttpRequest();
				let targetUrl = url;
				let body = null;
				if (SendVarsMethod === 2) {
					let urls = url.split("?");
					if (urls[1] !== undefined) {
						body = urls[1];
					}
					targetUrl = urls[0];
					xmlHttpRequest.open("POST", targetUrl, true);
					xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				} else {
					xmlHttpRequest.open("GET", targetUrl, true);
				}

				if (isXHR2) {
					xmlHttpRequest.responseType = "arraybuffer";
				} else {
					xmlHttpRequest.overrideMimeType("text/plain; charset=x-user-defined");
				}

				xmlHttpRequest.onreadystatechange = function()
				{
					let readyState = xmlHttpRequest.readyState;
					let status = xmlHttpRequest.status;
					if (readyState === 4) {
						switch (status) {
							case 200:
							case 304:
								let _root = _this.getDisplayObject("_root");
								let rootStage = _root.getStage();
								let data = isXHR2 ? xmlHttpRequest.response : xmlHttpRequest.responseText;
								let loadStage = new Stage();
								loadStages[loadStage.getId()] = loadStage;
								targetMc._url = url;
								targetMc.reset();
								loadStage.setParent(targetMc);
								targetMc.setLoadStage(loadStage);
								loadStage.parse(data, targetUrl);
								loadStage.stop();

								if (target === 0 || (typeof target !== "number" && !targetMc.getParent())) {
									stage.stop();
									loadStage.setId(stage.getId());
									loadStage.setName(stage.getName());
									loadStage.backgroundColor = stage.backgroundColor;
									loadStage.initCanvas();
									loadStage.loadStatus = 2;
									loadStage.loadEvent();
									delete loadStages[loadStage.getId()];
									stages[stage.getId()] = loadStage;
									stage = null;
								}

								let onData = targetMc.variables.onData;
								if (typeof onData === "function") {
									loadStage.executeEventAction(onData, targetMc);
								}

								clipEvent.type = "data";
								targetMc.dispatchEvent(clipEvent, rootStage);

								targetMc.addActions(rootStage);
								break;
						}
					}
				};
				xmlHttpRequest.send(body);
			}
		};

		/**
		 * @param target
		 * @returns {number}
		 */
		MovieClip.prototype.unloadMovie = function(target)
		{
			let _this = this;
			let targetMc = null;
			if (target instanceof MovieClip) {
				targetMc = target;
			} else {
				targetMc = _this.getDisplayObject(target);
				if (!targetMc) {
					return 0;
				}
			}

			// delete
			targetMc.reset();
			targetMc.setLoadStage(null);
			targetMc.setStage(_this.getStage());
			targetMc.container = [];
			targetMc.actions = [];
			targetMc.instances = [];
			targetMc.labels = [];
			targetMc.startSounds = [];
			targetMc.removeTags = [];
			targetMc._totalframes = 1;
			targetMc._url = null;
			targetMc._lockroot = undefined;

			let loadStage = targetMc.getStage();
			delete loadStages[loadStage.getId()];
		};

		/**
		 * @param url
		 * @param target
		 * @param method
		 * @returns {*}
		 */
		MovieClip.prototype.getURL = function(url, target, method)
		{
			let _this = this;
			if (typeof url === "string") {
				let cmd = url.substr(0, 9);
				if (cmd === "FSCommand") {
					let values = url.split(":");
					cmd = values.pop();
					let str = arguments[1];
					if (str === undefined) {
						str = "";
					}

					let stage = _this.getStage();
					let FSCommand = stage.abc.flash.system.fscommand;
					return FSCommand.apply(stage, [cmd, str]);
				}
			}

			if (target && typeof target === "string") {
				switch (target.toLowerCase()) {
					case "_self":
					case "_blank":
					case "_parent":
					case "_top":
						break;
					case "post":
						target = "_self";
						method = "GET";
						break;
					case "get":
						target = "_self";
						method = "GET";
						break;
					default:
						if (!method) {
							method = "GET";
						}
						_this.loadMovie(url, target, method);
						return 0;
				}
			}

			// form
			if (method === "POST") {
				let form = _document.createElement("form");
				form.action = url;
				form.method = method;
				if (target) {
					form.target = target;
				}

				let urls = url.split("?");
				if (urls.length > 1) {
					let pears = urls[1].split("&");
					let pLen = pears.length;
					let _encodeURI = encodeURI;
					for (let pIdx = 0; pIdx < pLen; pIdx++) {
						let pear = pears[pIdx].split("=");
						let input = _document.createElement("input");
						input.type = "hidden";
						input.name = pear[0];
						input.value = _encodeURI(pear[1] || "");
						form.appendChild(input);
					}
				}
				_document.body.appendChild(form);
				form.submit();
			} else {
				let a = _document.createElement("a");
				a.href = url;
				a.target = target;
				a.click();
			}
		};

		/**
		 * @param url
		 * @param target
		 * @param method
		 */
		MovieClip.prototype.loadVariables = function(url, target, method)
		{
			let _this = this;
			let targetMc = _this;
			if (target) {
				targetMc = _this.getDisplayObject(target);
			}

			if (targetMc) {
				let xmlHttpRequest = new XMLHttpRequest();
				let body = null;
				if (method === "POST") {
					let urls = url.split("?");
					if (urls[1] !== undefined) {
						body = urls[1];
					}
					xmlHttpRequest.open(method, urls[0], true);
					xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				} else {
					xmlHttpRequest.open("GET", url, true);
				}

				xmlHttpRequest.onreadystatechange = function()
				{
					let readyState = xmlHttpRequest.readyState;
					if (readyState === 4) {
						let status = xmlHttpRequest.status;
						switch (status) {
							case 200:
							case 304:
								let responseText = decodeURIComponent(xmlHttpRequest.responseText);
								let pairs = responseText.split("&");
								let length = pairs.length;
								for (let idx = 0; idx < length; idx++) {
									let pair = pairs[idx];
									let values = pair.split("=");
									targetMc.setVariable(values[0], values[1]);
								}

								let _root = _this.getDisplayObject();
								let rootStage = _root.getStage();
								let stage = _this.getStage();
								let onData = targetMc.variables.onData;
								if (typeof onData === "function") {
									stage.executeEventAction(onData, targetMc);
								}

								clipEvent.type = "data";
								targetMc.dispatchEvent(clipEvent, rootStage);

								break;
						}
					}
				};
				xmlHttpRequest.send(body);
			}
		};

		/**
		 * @returns {boolean}
		 */
		MovieClip.prototype.hitTest = function()
		{
			let _this = this;
			let targetMc = arguments[0];
			let x = 0;
			let y = 0;
			let bool = false;
			if (!(targetMc instanceof MovieClip)) {
				x = arguments[0];
				y = arguments[1];
				bool = arguments[2];
				if (!x || !y) {
					return false;
				}
			}

			let bounds = _this.getHitBounds();
			let xMax = bounds.xMax;
			let xMin = bounds.xMin;
			let yMax = bounds.yMax;
			let yMin = bounds.yMin;

			if (targetMc instanceof MovieClip) {
				let targetBounds = targetMc.getHitBounds();
				let txMax = targetBounds.xMax;
				let txMin = targetBounds.xMin;
				let tyMax = targetBounds.yMax;
				let tyMin = targetBounds.yMin;
				return (txMax > xMin && tyMax > yMin && xMax > txMin && yMax > tyMin);
			} else {
				if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
					if (bool) {
						let matrix = [1, 0, 0, 1, 0, 0];
						let mc = _this;
						let _multiplicationMatrix = _this.multiplicationMatrix;
						while (true) {
							let parent = mc.getParent();
							if (!parent.getParent()) {
								break;
							}
							matrix = _multiplicationMatrix(parent.getMatrix(), matrix);
							mc = parent;
						}
						let _root = _this.getDisplayObject("_root");
						let stage = _root.getStage();
						let ctx = stage.hitContext;
						let scale = stage.getScale();
						x *= scale;
						y *= scale;
						y *= _devicePixelRatio;
						x *= _devicePixelRatio;

						return _this.renderHitTest(ctx, matrix, stage, x, y);
					} else {
						return true;
					}
				}
				return false;
			}
		};

		/**
		 * @returns {{xMin: *, xMax: *, yMin: *, yMax: *}}
		 * @returns {*}
		 */
		MovieClip.prototype.getHitBounds = function()
		{
			let _this = this;
			let mc = _this;
			let matrix = _this.getMatrix();
			let _multiplicationMatrix = _this.multiplicationMatrix;
			while (true) {
				let parent = mc.getParent();
				if (!parent.getParent()) {
					break;
				}
				matrix = _multiplicationMatrix(parent.getMatrix(), matrix);
				mc = parent;
			}
			return _this.getBounds(matrix);
		};

		/**
		 * @param depth
		 * @returns {*}
		 */
		MovieClip.prototype.getInstanceAtDepth = function(depth)
		{
			let _this = this;
			let parent = _this.getParent();
			if (!parent) {
				parent = _this.getDisplayObject("_root");
			}
			let tags = parent.getTags();
			depth += 16384;
			return tags[depth];
		};

		/**
		 * swapDepths
		 */
		MovieClip.prototype.swapDepths = function()
		{
			let _this = this;
			let mc = arguments[0];
			let depth = 0;
			let parent = _this.getParent();
			if (parent) {
				let tags = parent.getTags();
				if (mc instanceof MovieClip) {
					if (parent === mc.getParent()) {
						depth = _this.getDepth() + 16384;
						let swapDepth = mc.getDepth() + 16384;
						_this.setDepth(depth, swapDepth, mc);
					}
				} else {
					depth = arguments[0];
					if (_isNaN(depth)) {
						depth = parent.getNextHighestDepth();
					}
					if (16384 > depth) {
						depth += 16384;
					}
					if (depth in tags) {
						let id = tags[depth];
						if (id !== _this.instanceId) {
							let stage = _this.getStage();
							let instance = stage.getInstance(id);
							_this.swapDepths(instance);
						}
					} else {
						_this.setDepth(depth, null, null);
					}
				}
			}
		};

		/**
		 * @param id
		 * @param name
		 * @param depth
		 * @param object
		 * @returns {*}
		 */
		MovieClip.prototype.attachMovie = function(id, name, depth, object)
		{
			let movieClip = null;
			let _this = this;
			if (_isNaN(depth)) {
				depth = _this.getNextHighestDepth();
			}
			if (depth < 16384) {
				depth += 16384;
			}

			let mc = _this.getDisplayObject(name);
			if (mc) {
				mc.removeMovieClip();
			}

			let stage = _this.getStage();
			let exportAssets = stage.exportAssets;
			if (id in exportAssets) {
				let characterId = exportAssets[id];
				let tag = stage.getCharacter(characterId);
				if (tag) {
					movieClip = new MovieClip();
					movieClip.setStage(stage);
					movieClip.setParent(_this);
					movieClip.setCharacterId(characterId);
					movieClip.setLevel(depth);
					movieClip.setName(name);
					movieClip.setTarget(_this.getTarget() + "/" + name);

					// init action
					let initAction = stage.initActions[characterId];
					if (typeof initAction === "function") {
						movieClip.active = true;
						initAction.apply(movieClip);
						movieClip.reset();
					}

					// registerClass
					let RegClass = stage.registerClass[characterId];
					if (RegClass) {
						movieClip.variables.registerClass = new RegClass();
					}

					let swfTag = new SwfTag(stage, null);
					swfTag.build(tag, movieClip);

					let placeObject = new PlaceObject();
					let instanceId = _this.instanceId;
					let totalFrame = _this.getTotalFrames() + 1;
					let container = _this.getContainer();
					for (let frame = 1; frame < totalFrame; frame++) {
						if (!(frame in container)) {
							container[frame] = [];
						}
						container[frame][depth] = movieClip.instanceId;
						stage.setPlaceObject(placeObject, instanceId, depth, frame);
					}

					if (object) {
						for (let prop in object) {
							if (!object.hasOwnProperty(prop)) {
								continue;
							}
							movieClip.setProperty(prop, object[prop]);
						}
					}

					let _root = _this.getDisplayObject("_root");
					let rootStage = _root.getStage();
					movieClip.addActions(rootStage);
				}
			}
			return movieClip;
		};

		MovieClip.prototype.attachBitmap = function()
		{
			let _this = this;
			let _root = _this.getDisplayObject("_root");
			let stage = _root.getStage();
			let target = arguments[0];
			let name = arguments[1];
			let depth = arguments[2];
		};

		/**
		 * @returns {number}
		 */
		MovieClip.prototype.getNextHighestDepth = function()
		{
			let depth = 0;
			let _this = this;
			let container = _this.getContainer();
			for (let idx in container) {
				if (!container.hasOwnProperty(idx)) {
					continue;
				}
				let children = container[idx];
				depth = _max(depth, children.length);
			}
			if (16384 > depth) {
				depth = 0;
			}
			return depth;
		};

		/**
		 * @returns {*}
		 */
		MovieClip.prototype.getBytesLoaded = function()
		{
			let _this = this;
			let stage = _this.getStage();
			let bitio = stage.bitio;
			return (!bitio) ? stage.fileSize : bitio.byte_offset;
		};

		/**
		 * @returns {number|*|fileLength}
		 */
		MovieClip.prototype.getBytesTotal = function()
		{
			let _this = this;
			let stage = _this.getStage();
			return stage.fileSize;
		};

		/**
		 * updateAfterEvent
		 */
		MovieClip.prototype.updateAfterEvent = function()
		{
			let _this = this;
			let _root = _this.getDisplayObject("_root");
			let stage = _root.getStage();
			stage.touchRender();
		};

		/**
		 * @returns {*}
		 */
		MovieClip.prototype.duplicateMovieClip = function()
		{
			let _this = this;
			let _root = _this.getDisplayObject("_root");
			let stage = _root.getStage();
			let target = arguments[0];
			let name = arguments[1];
			let depth = arguments[2];

			let targetMc = _this.getDisplayObject(name);
			let parent;
			let object;
			if (!targetMc && stage.getVersion() > 4) {
				target = arguments[0];
				depth = arguments[1];
				if (_isNaN(depth)) {
					parent = _this.getParent();
					if (!parent) {
						parent = stage.getParent();
					}
					depth = parent.getNextHighestDepth();
				}
				object = arguments[2];
				targetMc = _this;
			}

			if (16384 > depth) {
				depth += 16384;
			}

			let cloneMc;
			if (targetMc !== undefined && targetMc.getCharacterId() !== 0) {
				stage = targetMc.getStage();
				parent = targetMc.getParent();
				if (!parent) {
					parent = stage.getParent();
				}

				let char = stage.getCharacter(targetMc.characterId);
				let swftag = new SwfTag(stage);
				if (char instanceof Array) {
					cloneMc = new MovieClip();
					cloneMc.setStage(stage);
					cloneMc.setParent(parent);
					cloneMc.setLevel(depth);
					cloneMc.setTotalFrames(targetMc.getTotalFrames());
					cloneMc.setCharacterId(targetMc.characterId);
					swftag.build(char, cloneMc);
				} else {
					let tag = {
						CharacterId: targetMc.characterId,
						Ratio: 0,
						Depth: depth
					};
					cloneMc = swftag.buildObject(tag, parent);
				}

				cloneMc.setName(target);
				if (targetMc._matrix) {
					cloneMc._blendMode = targetMc._blendMode;
					cloneMc._filters = targetMc._filters;
					cloneMc._matrix = _this.cloneArray(targetMc._matrix);
					cloneMc._colorTransform = _this.cloneArray(targetMc._colorTransform);
				}

				let totalFrame = parent.getTotalFrames() + 1;
				let container = parent.getContainer();
				let instanceId = parent.instanceId;
				let placeObjects = stage.placeObjects[instanceId];
				let level = targetMc.getLevel();
				for (let frame = 1; frame < totalFrame; frame++) {
					if (!(frame in container)) {
						container[frame] = [];
					}
					container[frame][depth] = cloneMc.instanceId;

					if (frame in placeObjects) {
						let placeObject = placeObjects[frame][level];
						if (placeObject) {
							if (!(frame in placeObjects)) {
								placeObjects[frame] = [];
							}
							placeObjects[frame][depth] = placeObject.clone();
						}
					}
				}

				if (object) {
					for (let prop in object) {
						if (!object.hasOwnProperty(prop)) {
							continue;
						}
						cloneMc.setProperty(prop, object[prop]);
					}
				}

				cloneMc.addActions(stage);
			}

			return cloneMc;
		};

		/**
		 * @param name
		 */
		MovieClip.prototype.removeMovieClip = function(name)
		{
			let _this = this;
			let targetMc = _this;
			if (typeof name === "string") {
				let target = _this.getDisplayObject(name);
				if (target) {
					targetMc = target;
				}
			}

			let depth = targetMc.getDepth() + 16384;
			let level = targetMc.getLevel();
			if (targetMc instanceof MovieClip && depth >= 16384) {
				targetMc.reset();
				targetMc.removeFlag = true;
				let parent = targetMc.getParent();
				let container = parent.getContainer();
				let instanceId = targetMc.instanceId;
				let tagId;
				for (let frame = parent.getTotalFrames() + 1; --frame;) {
					if (!(frame in container)) {
						continue;
					}

					let tags = container[frame];
					if (depth in tags) {
						tagId = tags[depth];
						if (tagId === instanceId) {
							delete container[frame][depth];
						}
					}

					if (depth !== level && 16384 > level) {
						if (!(level in tags)) {
							tags[level] = instanceId;
						}
					}
				}
			}
		};

		/**
		 * initFrame
		 */
		MovieClip.prototype.initFrame = function()
		{
			let _this = this;
			_this.active = true;

			let stage = _this.getStage();
			let tags = _this.getTags();
			let length = tags.length;
			if (length) {
				tags.reverse();
				for (let depth in tags) {
					if (!tags.hasOwnProperty(depth)) {
						continue;
					}

					let instanceId = tags[depth];
					let instance = stage.getInstance(instanceId);
					if (!instance) {
						continue;
					}
					instance.initFrame();
				}
				tags.reverse();
			}

			let initAction = stage.initActions[_this.getCharacterId()];
			if (typeof initAction === "function") {
				initAction.apply(_this);
			}
		};

		/**
		 * @param stopFlag
		 * @param frame
		 * @param soundStreamId
		 */
		MovieClip.prototype.startStopSoundStreams = function(stopFlag, frame, soundStreamId) {
			let stage = this.getStage();
			let previousframe = this._previousframe;
			if (soundStreamId == 0) {
				previousframe = stage.getParent()._previousframe;
			}
			for (let i=0; i<stage.soundStreams.length; i++) {
				if (stage.soundStreams[i].SoundStreamId != soundStreamId) continue;

				let s = stage.soundStreams[i];
				for (let f=0; f<s.FrameRanges.length; f++) {
					let frameRange = s.FrameRanges[f];
					if (stopFlag || frame == previousframe) {
						if (frameRange.Audio.isPlaying) {
							let ct = frameRange.Audio.seek();
							let wt = frameRange.startAudio+(frame-frameRange.startFrame+1) * this.getStage().getFrameRate()/1000-ct;
							if (wt > 0) {
								setTimeout(function() {
									if (frameRange.Audio.isPlaying) {
										frameRange.Audio.pause();
									}
									if (soundStreamId == 0) {
										stage.soundStreamIsPlaying = false;
										stage.soundStreamPlaying = -1;
										stage.soundStreamFrameRange = -1;
									}
								}, wt * 1000);
							} else {
								frameRange.Audio.pause();
								if (soundStreamId == 0) {
									stage.soundStreamIsPlaying = false;
									stage.soundStreamPlaying = -1;
									stage.soundStreamFrameRange = -1;
								}
							}
						}
					} else if ((frameRange.startFrame <= frame) && (frame <= frameRange.endFrame)) {
						if (!frameRange.Audio.isPlaying) {
							let audioStart = frameRange.startAudio + (frame - frameRange.startFrame) * this.getStage().getFrameRate()/1000;
							frameRange.Audio.seek(audioStart);
							frameRange.Audio.play();
							stage.lastAudioCurrentTime = 0;
							if (soundStreamId == 0) {
								stage.soundStreamIsPlaying = true;
								stage.soundStreamPlaying = i;
								stage.soundStreamFrameRange = f;
							}
						} else if (frame == previousframe) {
							if (frameRange.Audio.isPlaying) {
								frameRange.Audio.pause();
								if (soundStreamId == 0) {
									stage.soundStreamIsPlaying = false;
									stage.soundStreamPlaying = -1;
									stage.soundStreamFrameRange = -1;
								}
							}
						} else if (frame != previousframe + 1) {
							if (frameRange.Audio.isPlaying) {
								let tn = frameRange.startAudio + (frame - frameRange.startFrame) * this.getStage().getFrameRate()/1000;
								frameRange.Audio.seek(tn);
							}
						}
					} else {
						if (frameRange.Audio.isPlaying) {
							frameRange.Audio.pause();
							if (soundStreamId == 0) {
								stage.soundStreamIsPlaying = false;
								stage.soundStreamPlaying = -1;
								stage.soundStreamFrameRange = -1;
							}
						}
					}
				}
			}
		};

		/**
		 * @param stage
		 * @param clipEvent
		 */
		MovieClip.prototype.putFrame = function(stage, clipEvent)
		{
			let _this = this;
			let myStage = _this.getStage();
			let prevTags;
			let stopFlag = _this.stopFlag;
			if (!stopFlag && _this.active) {
				let frame = _this.getCurrentFrame();
				let totalFrames = _this.getTotalFrames();
				if (totalFrames > 1) {
					if (_this.isLoad) {
						prevTags = _this.getTags();
						frame++;
					}
					if (frame > totalFrames) {
						frame = totalFrames;
						frame = 1;
						_this.resetCheck();
					}
					if (frame != _this.getPreviousFrame()) _this.soundStopFlag = false;
					_this.setCurrentFrame(frame);
					_this.startStopSoundStreams(_this.stopFlag, frame, _this.characterId);
					_this.setPreviousFrame(_this.getCurrentFrame());
					_this.remove(stage);
					_this.isAction = true;
					_this.soundStopFlag = false;
				}
			}

			if (_this.removeFlag) {
				return 0;
			}

			_this.active = true;
			if (prevTags !== undefined) {
				if (_this.isSwap) {
					_this.resetSwap();
				}

				let tags = _this.getTags();
				let length = tags.length;
				if (length && tags.toString() !== prevTags.toString()) {
					for (let depth in tags) {
						if (!tags.hasOwnProperty(depth)) {
							continue;
						}

						let instanceId = tags[depth];
						if (depth in prevTags && instanceId === prevTags[depth]) {
							continue;
						}

						let instance = myStage.getInstance(instanceId);
						if (instance && instance instanceof MovieClip) {
							stage.newTags.unshift(instance);
						}
					}
				}
			}

			if (_this.isLoad) {
				clipEvent.type = "enterFrame";
				_this.dispatchEvent(clipEvent, stage);
				_this.dispatchOnEvent("onEnterFrame", stage);
				_this.addTouchEvent(stage);
				if (_this.isAction) {
					_this.isAction = false;
					let as = _this.getActions(_this.getCurrentFrame());
					if (as) {
						// _this.setActionQueue(as, stage);
						_this.setActionQueue(as, stage, _this);
					}
				}

			} else {
				// init action
				let initAction = myStage.initActions[_this.getCharacterId()];
				if (typeof initAction === "function") {
					initAction.apply(_this);
				}
			}
		};

		/**
		 * nextFrame
		 */
		MovieClip.prototype.nextFrame = function()
		{
			let _this = this;
			let stage = _this.getStage();
			let frame = _this.getCurrentFrame();
			_this.setPreviousFrame(frame);
			frame++;
			if (frame != _this.getPreviousFrame()) {
				// stage.stopAllSounds();
				_this.soundStopFlag = false;
			}
			_this.setNextFrame(frame);
			_this.stop();
		};

		/**
		 * prevFrame
		 */
		MovieClip.prototype.prevFrame = function()
		{
			let _this = this;
			let stage = _this.getStage();
			let frame = _this.getCurrentFrame();
			_this.setPreviousFrame(frame);
			frame--;
			frame = frame>0? frame:1;
			if (frame != _this.getPreviousFrame()) {
				// stage.stopAllSounds();
				_this.soundStopFlag = false;
			}
			_this.setNextFrame(frame);
			_this.stop();
		};

		/**
		 * @returns {number}
		 */
		MovieClip.prototype.getCurrentFrame = function()
		{
			return this._currentframe;
		};

		/**
		 * @returns {number}
		 */
		MovieClip.prototype.getPreviousFrame = function()
		{
			return this._previousframe;
		};

		/**
		 * @param frame
		 */
		MovieClip.prototype.setCurrentFrame = function(frame)
		{
			this._currentframe = frame;
		};

		/**
		 * @param frame
		 */
		MovieClip.prototype.setPreviousFrame = function(frame)
		{
			this._previousframe = frame;
		};

		/**
		 * @param frame
		 */
		MovieClip.prototype.setNextFrame = function(frame)
		{
			let _this = this;
			if (frame > 0 && _this.getCurrentFrame() !== frame) {
				_this.isAction = true;

				if (frame > _this.getTotalFrames()) {
					frame = _this.getTotalFrames();
					_this.isAction = false;
				}

				let maxFrame = _max(frame, _this.getCurrentFrame()) + 1;
				let minFrame = _min(frame, _this.getCurrentFrame());

				let stage = _this.getStage();
				let tags = _this.getTags();
				let checked = [];
				let nextTags = _this.getTags(frame);
				let tag, tagId, depth, nextTag, nextTagId;
				let length = _max(tags.length, nextTags.length);
				if (length) {
					for (depth = 0; depth < length; depth++) {
						if (!(depth in tags) && !(depth in nextTags)) {
							continue;
						}

						tagId = tags[depth];
						nextTagId = nextTags[depth];
						if (!tagId && !nextTagId) {
							continue;
						}

						tag = stage.getInstance(tagId);
						nextTag = stage.getInstance(nextTagId);
						if (tagId && nextTagId) {
							if (tagId === nextTagId) {
								checked[tagId] = true;
								continue;
							}

							tag.reset();
							nextTag.reset();
							checked[tagId] = true;
							checked[nextTagId] = true;
						} else if (tag) {
							tag.reset();
							checked[tagId] = true;
						} else if (nextTag) {
							nextTag.reset();
							checked[nextTagId] = true;
						}
					}
				}

				if (checked.length) {
					for (let chkFrame = minFrame; chkFrame < maxFrame; chkFrame++) {
						let container = _this.getTags(chkFrame);
						if (!container.length) {
							continue;
						}

						for (depth in container) {
							if (!container.hasOwnProperty(depth)) {
								continue;
							}
							tagId = container[depth];
							if (tagId in checked) {
								continue;
							}

							checked[tagId] = true;
							tag = stage.getInstance(tagId);
							tag.reset();
						}
					}
				}

				_this.setCurrentFrame(frame);
				_this.soundStopFlag = false;

				let _root = _this.getDisplayObject("_root");
				let rootStage = _root.getStage();
				_this.addActions(rootStage);
			}
		};

		/**
		 * @returns {number}
		 */
		MovieClip.prototype.getTotalFrames = function()
		{
			return this._totalframes;
		};

		/**
		 * @param frame
		 */
		MovieClip.prototype.setTotalFrames = function(frame)
		{
			this._totalframes = frame;
			this._framesloaded = frame;
		};

		/**
		 * addLabel
		 * @param frame
		 * @param name
		 */
		MovieClip.prototype.addLabel = function(frame, name)
		{
			if (typeof name !== "string") {
				name += "";
			}
			this.labels[name.toLowerCase()] = frame | 0;
		};

		/**
		 * @param name
		 * @returns {*}
		 */
		MovieClip.prototype.getLabel = function(name)
		{
			if (typeof name !== "string") {
				name += "";
			}
			return this.labels[name.toLowerCase()];
		};

		/**
		 * @param frame
		 * @param obj
		 */
		MovieClip.prototype.addSound = function(frame, obj)
		{
			let _this = this;
			if (!(frame in _this.startSounds)) {
				_this.startSounds[frame] = [];
			}
			_this.startSounds[frame].push(obj);
		};

		/**
		 * @returns {*}
		 */
		MovieClip.prototype.getSounds = function()
		{
			let _this = this;
			return _this.startSounds[_this.getCurrentFrame()];
		};

		/**
		 * @param sound \{ SoundId, Sound, tagType\}
		 */
		MovieClip.prototype.startSound = function(soundStart)
		{
			let _this = this;
			let stage = _this.getStage();
			stage.startSound(soundStart);
			_this.soundStopFlag = true;
		};

		/**
		 * @param frame
		 * @returns {*}
		 */
		MovieClip.prototype.getTags = function(frame)
		{
			let _this = this;
			let key = frame || _this.getCurrentFrame();
			return _this.container[key] || [];
		};

		/**
		 * @param frame
		 * @param tags
		 */
		MovieClip.prototype.setRemoveTag = function(frame, tags)
		{
			let rTags = this.removeTags;
			rTags[frame] = [];
			let length = tags.length;
			for (let i = 0; i < length; i++) {
				let tag = tags[i];
				rTags[frame][tag.Depth] = 1;
			}
		};

		/**
		 * @param frame
		 * @returns {*}
		 */
		MovieClip.prototype.getRemoveTags = function(frame)
		{
			return this.removeTags[frame];
		};

		/**
		 * @param stage
		 */
		MovieClip.prototype.remove = function(stage)
		{
			let _this = this;
			let removeTags = _this.getRemoveTags(_this.getCurrentFrame());
			if (removeTags) {
				let myStage = _this.getStage();
				let frame = _this.getCurrentFrame() - 1;
				let tags = _this.getTags(frame);
				for (let idx in tags) {
					if (!tags.hasOwnProperty(idx)) {
						continue;
					}

					let instanceId = tags[idx];
					let tag = myStage.getInstance(instanceId);
					if (!tag) {
						continue;
					}

					if (tag instanceof MovieClip) {
						let depth = tag.getDepth() + 16384;
						if (!(depth in removeTags)) {
							continue;
						}
						console.log('remove '+JSON.stringify(tag));

						clipEvent.type = "unload";
						_this.dispatchEvent(clipEvent, stage);
						tag.reset();
					} else {
						if (!(idx in removeTags)) {
							continue;
						}
						tag.reset();
					}
				}
			}
		};

		/**
		 * resetCheck
		 */
		MovieClip.prototype.resetCheck = function()
		{
			let _this = this;
			let instances = _this.getInstances();
			let stage = _this.getStage();
			for (let id in instances) {
				if (!instances.hasOwnProperty(id)) {
					continue;
				}

				let instance = stage.getInstance(id);
				if (!instance || (!instance.getRatio() && !instance.removeFlag)) {
					continue;
				}
				instance.reset();
			}
		};

		/**
		 * resetSwap
		 */
		MovieClip.prototype.resetSwap = function()
		{
			let _this = this;
			let stage = _this.getStage();
			let currentTags = _this.getTags();
			let totalFrames = _this.getTotalFrames() + 1;
			for (let frame = 1; frame < totalFrames; frame++) {
				let tags = _this.getTags(frame);
				let length = tags.length;
				if (length) {
					let resetTags = [];
					for (let depth in tags) {
						if (!tags.hasOwnProperty(depth)) {
							continue;
						}

						depth |= 0;
						let tagId = tags[depth];
						let instance = stage.getInstance(tagId);
						if (!instance) {
							delete tags[depth];
							continue;
						}

						if (instance.active) {
							continue;
						}

						if (instance.getLevel() !== depth) {
							if (!(instance.getLevel() in currentTags)) {
								instance._depth = null;
								resetTags[instance.getLevel()] = tagId;
							}
							delete tags[depth];
						}
					}

					length = resetTags.length;
					if (length) {
						for (let level in resetTags) {
							if (!resetTags.hasOwnProperty(level)) {
								continue;
							}
							tags[level] = resetTags[level];
						}
					}
				}
			}
			_this.isSwap = false;
		};

		/**
		 * reset
		 */
		MovieClip.prototype.reset = function()
		{
			let _this = this;
			let stage = _this.getStage();
			let instances = _this.getInstances();
			for (let id in instances) {
				if (!instances.hasOwnProperty(id)) {
					continue;
				}
				let instance = stage.getInstance(id);
				if (instance instanceof MovieClip && instance.getDepth() >= 0) {
					instance.removeMovieClip();
					if (instance.getDepth() < 0) {
						instance.removeFlag = false;
					}
				} else {
					instance.reset();
				}
			}

			let parent = _this.getParent();
			if (parent && _this.getLevel() !== _this.getDepth() + 16384) {
				parent.isSwap = true;
			}

			_this.play();
			_this.setCurrentFrame(1);
			_this.setPreviousFrame(0);
			_this.clear();
			_this.initParams();
			_this.variables = {};
		};

		/**
		 * init
		 */
		MovieClip.prototype.initParams = function()
		{
			let _this = this;
			_this.active = false;
			_this.removeFlag = false;
			_this.isLoad = false;
			_this.isMask = false;
			_this.isAction = true;
			_this.soundStopFlag = false;
			_this._droptarget = null;
			_this._depth = null;
			_this._mask = null;
			_this._matrix = null;
			_this._colorTransform = null;
			_this._filters = null;
			_this._blendMode = null;
			_this.buttonStatus = "up";
			_this.mouseEnabled = true;
			_this.setVisible(true);
			_this.setEnabled(true);
		};

		/**
		 * @param stage
		 */
		MovieClip.prototype.addTouchEvent = function(stage)
		{
			let _this = this;
			let events = _this.events;
			let moveEventHits = stage.moveEventHits;
			let downEventHits = stage.downEventHits;
			let upEventHits = stage.upEventHits;
			let keyDownEventHits = stage.keyDownEventHits;
			for (let name in events) {
				if (!events.hasOwnProperty(name)) {
					continue;
				}
				let as = events[name];
				switch (name) {
					case "mouseDown":
						downEventHits[downEventHits.length] = { as: as, mc: _this};
						break;
					case "mouseMove":
						moveEventHits[moveEventHits.length] = { as: as, mc: _this};
						break;
					case "mouseUp":
						upEventHits[upEventHits.length] = { as: as, mc: _this};
						break;
					case "keyDown":
						if (_isTouchEvent) {
							downEventHits[downEventHits.length] = {
								as: as,
								mc: _this
							};
						} else {
							keyDownEventHits[keyDownEventHits.length] = {
								as: as,
								mc: _this
							};
						}
						break;
					case "keyUp":
						upEventHits[upEventHits.length] = { as: as, mc: _this};
						break;
				}
			}

			let variables = _this.variables;
			let onMouseDown = variables.onMouseDown;
			if (onMouseDown) {
				downEventHits[downEventHits.length] = {mc: _this};
			}
			let onMouseMove = variables.onMouseMove;
			if (onMouseMove) {
				moveEventHits[moveEventHits.length] = {mc: _this};
			}
			let onMouseUp = variables.onMouseUp;
			if (onMouseUp) {
				upEventHits[upEventHits.length] = {mc: _this};
			}
		};

		/**
		 * @param script
		 * @returns {*}
		 */
		MovieClip.prototype.createActionScript = function(script)
		{
			return (function(clip, origin)
			{
				let as = new ActionScript([], origin.constantPool, origin.register, origin.initAction);
				as.cache = origin.cache;
				as.scope = clip;
				return function() {
					as.reset();
					as.variables["this"] = this;
					return as.execute(clip);
				};
			})(this, script);
		};

		/**
		 * @param script
		 * @param parent
		 */
		MovieClip.prototype.createActionScript2 = function(script, parent)
		{
			return (function(clip, origin, chain)
			{
				return function()
				{
					let as = new ActionScript([], origin.constantPool, origin.register, origin.initAction);
					as.parentId = origin.id; // todo
					as.cache = origin.cache;
					as.scope = clip;
					as.parent = (chain) ? chain : null;
					if (as.register.length) {
						as.initVariable(arguments);
					}
					as.variables["this"] = this;
					return as.execute(clip);
				};
			})(this, script, parent);
		};

		/**
		 * addFrameScript
		 */
		MovieClip.prototype.addFrameScript = function()
		{
			let _this = this;
			let args = arguments;
			let length = args.length;
			for (let i = 0; i < length; i++) {
				let frame = args[i++];
				let script = args[i];
				if (typeof frame === "string") {
					frame = _this.getLabel(frame);
				} else {
					frame += 1;
				}

				frame = frame | 0;
				if (frame > 0 && _this.getTotalFrames() >= frame) {
					let actions = _this.actions;
					if (!(frame in actions)) {
						actions[frame] = [];
					}

					if (script === null) {
						actions[frame] = [];
					} else {
						let aLen = actions[frame].length;
						actions[frame][aLen] = script;
					}
				}
			}
		};

		/**
		 * @param stage
		 */
		MovieClip.prototype.addActions = function(stage)
		{
			let _this = this;
			_this.active = true;
			let myStage = _this.getStage();

			if (_this.isAction) {
				_this.isAction = false;
				if (!_this.isLoad) {
					// as3
					_this.buildAVM2();

					// registerClass
					let RegClass = myStage.registerClass[_this.getCharacterId()];
					if (typeof RegClass === "function") {
						_this.variables.registerClass = new RegClass();
					}

					// clipEvent
					clipEvent.type = "initialize";
					_this.dispatchEvent(clipEvent, stage);
					clipEvent.type = "construct";
					_this.dispatchEvent(clipEvent, stage);
					clipEvent.type = "load";
					_this.dispatchEvent(clipEvent, stage);

					let onLoad = _this.variables.onLoad;
					if (typeof onLoad === "function") {
						_this.setActionQueue(onLoad, stage);
					}
					_this.addTouchEvent(stage);
				}

				let action = _this.getActions(_this.getCurrentFrame());
				if (action) {
					_this.setActionQueue(action, stage);
				}
			}

			let tags = _this.getTags();
			let length = tags.length;
			if (length) {
				for (let depth in tags) {
					if (!tags.hasOwnProperty(depth)) {
						continue;
					}
					let instanceId = tags[depth];
					let instance = myStage.getInstance(instanceId);
					if (!instance) {
						continue;
					}
					instance.addActions(stage);
				}
			}
		};

		/**
		 * @param frame
		 * @returns {*}
		 */
		MovieClip.prototype.getActions = function(frame)
		{
			return this.actions[frame];
		};

		/**
		 * @param frame
		 * @param actionScript
		 */
		MovieClip.prototype.setActions = function(frame, actionScript)
		{
			let _this = this;
			let actions = _this.actions;
			if (!(frame in actions)) {
				actions[frame] = [];
			}
			let length = actions[frame].length;
			actions[frame][length] = _this.createActionScript(actionScript);
		};

		/**
		 * @param frame
		 * @param action
		 */
		MovieClip.prototype.overWriteAction = function(frame, action)
		{
			let _this = this;
			if (typeof frame === "string") {
				frame = _this.getLabel(frame);
			}
			frame = frame | 0;
			if (frame > 0 && _this.getTotalFrames() >= frame) {
				_this.actions[frame] = [action];
			}
		};

		/**
		 * @param frame
		 * @param action
		 */
		MovieClip.prototype.addAction = function(frame, action)
		{
			let _this = this;
			if (typeof frame === "string") {
				frame = _this.getLabel(frame);
			}
			frame = frame | 0;
			if (frame > 0 && _this.getTotalFrames() >= frame) {
				let actions = _this.actions;
				if (!(frame in actions)) {
					actions[frame] = [];
				}
				let length = actions[frame].length;
				actions[frame][length] = action;
			}
		};

		/**
		 * @param frame
		 */
		MovieClip.prototype.executeActions = function(frame)
		{
			let _this = this;
			let actions = _this.getActions(frame);
			if (actions !== undefined) {
				let length = actions.length;
				for (let i = 0; i < length; i++) {
					actions[i].apply(_this);
				}
			}
		};

		/**
		 * ASSetPropFlags
		 */
		MovieClip.prototype.ASSetPropFlags = function()
		{
			// object, properties, n, allowFalse
		};

		/**
		 * @param rgb
		 * @param alpha
		 */
		MovieClip.prototype.beginFill = function(rgb, alpha)
		{
			let graphics = this.getGraphics();
			graphics.beginFill(rgb, alpha);
		};

		/**
		 * @param width
		 * @param rgb
		 * @param alpha
		 * @param pixelHinting
		 * @param noScale
		 * @param capsStyle
		 * @param jointStyle
		 * @param miterLimit
		 */
		MovieClip.prototype.lineStyle = function(width, rgb, alpha, pixelHinting, noScale, capsStyle, jointStyle, miterLimit)
		{
			let graphics = this.getGraphics();
			graphics.lineStyle(width, rgb, alpha, pixelHinting, noScale, capsStyle, jointStyle, miterLimit);
		};

		/**
		 * @param dx
		 * @param dy
		 */
		MovieClip.prototype.moveTo = function(dx, dy)
		{
			let graphics = this.getGraphics();
			graphics.moveTo(dx, dy);
		};

		/**
		 * @param dx
		 * @param dy
		 */
		MovieClip.prototype.lineTo = function(dx, dy)
		{
			let graphics = this.getGraphics();
			graphics.lineTo(dx, dy);
		};

		/**
		 * @param cx
		 * @param cy
		 * @param dx
		 * @param dy
		 */
		MovieClip.prototype.curveTo = function(cx, cy, dx, dy)
		{
			let graphics = this.getGraphics();
			graphics.curveTo(cx, cy, dx, dy);
		};

		/**
		 * clear
		 */
		MovieClip.prototype.clear = function()
		{
			let graphics = this.getGraphics();
			graphics.clear();
		};

		/**
		 * endFill
		 */
		MovieClip.prototype.endFill = function()
		{
			let graphics = this.getGraphics();
			graphics.endFill();
		};

		/**
		 * buildAVM2
		 */
		MovieClip.prototype.buildAVM2 = function()
		{
			let _this = this;
			let stage = _this.getStage();
			let symbol = stage.symbols[_this.getCharacterId()];
			if (symbol) {
				let symbols = symbol.split(".");
				let classMethod = symbols.pop();
				let length = symbols.length;
				let classObj = stage.avm2;
				let abcObj = stage.abc;
				for (let i = 0; i < length; i++) {
					classObj = classObj[symbols[i]];
					abcObj = abcObj[symbols[i]];
				}

				// build abc
				let DoABC = abcObj[classMethod];
				let ABCObj = new DoABC(_this);
				classObj[classMethod] = ABCObj;
				_this.avm2 = ABCObj;
				// AVM2 init
				let AVM2 = ABCObj[classMethod];
				if (typeof AVM2 === "function") {
					_this.actions = [];
					AVM2.apply(_this);
				}
			}
		};

		/**
		 * @constructor
		 */
		let MovieClipLoader = function()
		{
			let _this = this;
			_this.events =
		{
				onLoadStart: undefined,
				onLoadProgress: undefined,
				onLoadComplete: undefined,
				onLoadInit: undefined,
				onLoadError: undefined
			};
		};

		/**
		 * @param url
		 * @param target
		 * @returns {boolean}
		 */
		MovieClipLoader.prototype.loadClip = function(url, target)
		{
			if (!url || !target) {
				return false;
			}

			let _this = this;
			let events = _this.events;

			let xmlHttpRequest = new XMLHttpRequest();
			xmlHttpRequest.open("GET", url, true);

			if (isXHR2) {
				xmlHttpRequest.responseType = "arraybuffer";
			} else {
				xmlHttpRequest.overrideMimeType("text/plain; charset=x-user-defined");
			}

			let onLoadProgress = events.onLoadProgress;
			if (!onLoadProgress) {
				onLoadProgress = _this.onLoadProgress;
			}
			if (typeof onLoadProgress === "function") {
				xmlHttpRequest.onprogress = function(e) {
					onLoadProgress.apply(_this, [target, e.loaded, e.total]);
				};
			}

			let onLoadComplete = events.onLoadComplete;
			if (!onLoadComplete) {
				onLoadComplete = _this.onLoadComplete;
			}
			if (typeof onLoadComplete === "function") {
				xmlHttpRequest.onloadend = function(e) {
					let eventStatus = e.currentTarget.status;
					if (eventStatus === 200) {
						onLoadComplete.apply(_this, [target, eventStatus]);
					}
				};
			}

			xmlHttpRequest.onreadystatechange = function()
			{
				let readyState = xmlHttpRequest.readyState;
				if (readyState === 4) {
					let status = xmlHttpRequest.status;

					let onLoadStart = events.onLoadStart;
					if (!onLoadStart) {
						onLoadStart = _this.onLoadStart;
					}
					if (typeof onLoadStart === "function") {
						xmlHttpRequest.onloadstart = function()
						{
							onLoadStart.apply(_this, [target]);
						};
					}

					switch (status) {
						case 200:
						case 304:
							let _root = target.getDisplayObject("_root");
							let rootStage = _root.getStage();
							let data = isXHR2 ? xmlHttpRequest.response : xmlHttpRequest.responseText;

							let loadStage = new Stage();
							loadStages[loadStage.getId()] = loadStage;
							target._url = url;
							target.reset();
							target.setLoadStage(loadStage);

							loadStage.setParent(target);
							loadStage.parse(data, url);
							loadStage.stop();

							// onLoadInit
							let onLoadInit = events.onLoadInit;
							if (!onLoadInit) {
								onLoadInit = _this.onLoadInit;
							}
							if (typeof onLoadInit === "function") {
								let queue = (function(as, loader, mc) {
									return function() {
										return as.apply(loader, [mc]);
									};
								})(onLoadInit, _this, target);
								target.events.load = [queue];
							}

							target.addActions(rootStage);

							break;
						default:
							let onLoadError = events.onLoadError;
							if (!onLoadError) {
								onLoadError = _this.onLoadError;
							}
							if (typeof onLoadError === "function") {
								onLoadError.apply(_this, [target, "error", status]);
							}
							break;
					}
				}
			};
			xmlHttpRequest.send(null);

			return true;
		};

		/**
		 * @param listener
		 * @returns {boolean}
		 */
		MovieClipLoader.prototype.addListener = function(listener)
		{
			let _this = this;
			if (listener && typeof listener === "object") {
				let events = ["onLoadStart", "onLoadProgress", "onLoadComplete", "onLoadInit", "onLoadError"];
				let variables = listener.variables;
				for (let i = 0; i < 5; i++) {
					let event = events[i];
					if (typeof listener[event] === "function") {
						_this.events[event] = listener[event];
					} else if (variables && typeof variables[event] === "function") {
						_this.events[event] = variables[event];
					}
				}
			}
			return true;
		};

		/**
		 * @param listener
		 * @returns {boolean}
		 */
		MovieClipLoader.prototype.removeListener = function(listener)
		{
			let _this = this;
			if (listener && typeof listener === "object") {
				let events = ["onLoadStart", "onLoadProgress", "onLoadComplete", "onLoadInit", "onLoadError"];
				for (let i = 0; i < 5; i++) {
					let event = events[i];
					let variables = listener.variables;
					if (typeof listener[event] === "function" ||
						(variables && typeof variables[event] === "function")
					) {
						_this.events[event] = undefined;
					}
				}
			}
			return true;
		};

		/**
		 * @param target
		 * @returns {{bytesLoaded: number, bytesTotal: number}}
		 */
		MovieClipLoader.prototype.getProgress = function(target)
		{
			return {
				bytesLoaded: 0,
				bytesTotal: 0
			};
		};

		/**
		 * @constructor
		 */
		let LoadVars = function()
		{
			let _this = this;
			_this.xmlHttpRequest = new XMLHttpRequest();
			_this.variables = {};
			_this.target = _this;
			_this.events = {
				onData: undefined,
				onLoad: undefined
			};
		};

		/**
		 * properties
		 */
		Object.defineProperties(LoadVars.prototype,
		{
			onData: {
				get: function() {
					return this.getProperty("onData");
				},
				set: function(onData) {
					this.setProperty("onData", onData);
				}
			},
			onLoad: {
				get: function() {
					return this.getProperty("onLoad");
				},
				set: function(onLoad) {
					this.setProperty("onLoad", onLoad);
				}
			}
		});

		/**
		 * @param name
		 * @returns {*}
		 */
		LoadVars.prototype.getProperty = function(name)
		{
			return this.variables[name];
		};

		/**
		 * @param name
		 * @param value
		 */
		LoadVars.prototype.setProperty = function(name, value)
		{
			this.variables[String(name)] = value;
		};

		/**
		 * @param url
		 * @returns {boolean}
		 */
		LoadVars.prototype.load = function(url)
		{
			let _this = this;
			let xmlHttpRequest = _this.xmlHttpRequest;
			xmlHttpRequest.open("GET", url, true);
			xmlHttpRequest.onreadystatechange = function()
			{
				let readyState = xmlHttpRequest.readyState;
				if (readyState === 4) {
					let src = decodeURIComponent(xmlHttpRequest.responseText);
					_this.decode(src);
					let onData = _this.onData;
					if (typeof onData === "function") {
						onData.apply(src, [src]);
					}

					let onLoad;
					let status = xmlHttpRequest.status;
					switch (status) {
						case 200:
						case 304:
							onLoad = _this.onLoad;
							if (typeof onLoad === "function") {
								onLoad.apply(src, [true]);
							}
							return true;
						default:
							onLoad = _this.onLoad;
							if (typeof onLoad === "function") {
								onLoad.apply(src, [false]);
							}
							return false;
					}
				}
			};
			xmlHttpRequest.send(null);
		};

		/**
		 * @param url
		 * @param target
		 * @param method
		 * @returns {boolean}
		 */
		LoadVars.prototype.send = function(url, target, method)
		{
			let _this = this;
			let xmlHttpRequest = _this.xmlHttpRequest;
			let sendMethod = method ? method.toUpperCase() : "GET";
			xmlHttpRequest.open(sendMethod, url, true);
			if (sendMethod === "POST") {
				xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
			if (target instanceof LoadVars) {
				_this.target = target;
			}
			xmlHttpRequest.send(_this.toString());
			return true;
		};

		/**
		 * @param url
		 * @param target
		 * @param method
		 * @returns {boolean}
		 */
		LoadVars.prototype.sendAndLoad = function(url, target, method)
		{
			let _this = this;
			_this.send(url, target, method);
			return _this.load(url);
		};

		/**
		 * @param header
		 * @param headerValue
		 */
		LoadVars.prototype.addRequestHeader = function(header, headerValue)
		{
			let xmlHttpRequest = this.xmlHttpRequest;
			if (header instanceof Array) {
				let length = header.length;
				for (let i = 0; i < length;) {
					xmlHttpRequest.setRequestHeader(header[i++], headerValue[i++]);
				}
			} else {
				xmlHttpRequest.setRequestHeader(header, headerValue);
			}
		};

		/**
		 * @param queryString
		 */
		LoadVars.prototype.decode = function(queryString)
		{
			let variables = this.variables;
			let array = queryString.split("&");
			let length = array.length;
			for (let i = 0; i < length; i++) {
				let values = array[i];
				let splitData = values.split("=");
				if (splitData.length < 1) {
					continue;
				}
				variables[String(splitData[0])] = splitData[1];
			}
		};

		/**
		 * @returns {number}
		 */
		LoadVars.prototype.getBytesLoaded = function()
		{
			return 1;
		};

		/**
		 * @returns {number}
		 */
		LoadVars.prototype.getBytesTotal = function()
		{
			return 1;
		};

		/**
		 * @returns {string}
		 */
		LoadVars.prototype.toString = function()
		{
			let variables = this.variables;
			let array = [];
			for (let prop in variables) {
				if (!variables.hasOwnProperty(prop)) {
					continue;
				}
				array[array.length] = prop + "=" + variables[prop];
			}
			return array.join("&");
		};

		/**
		 * @constructor
		 */
		let Xml = function()
		{
			let _this = this;
			_this.ignoreWhite = false;
			_this.loaded = false;
			_this.status = 0;
			_this.variables = {};
		};

		/**
		 * properties
		 */
		Object.defineProperties(Xml.prototype,
		{
			onData: {
				get: function() {
					return this.getProperty("onData");
				},
				set: function(onData) {
					this.setProperty("onData", onData);
				}
			},
			onLoad: {
				get: function() {
					return this.getProperty("onLoad");
				},
				set: function(onLoad) {
					this.setProperty("onLoad", onLoad);
				}
			}
		});

		/**
		 * @param name
		 * @returns {*}
		 */
		Xml.prototype.getProperty = function(name)
		{
			return this.variables[name];
		};

		/**
		 * @param name
		 * @param value
		 */
		Xml.prototype.setProperty = function(name, value)
		{
			this.variables[String(name)] = value;
		};


		/**
		 * @param url
		 */
		Xml.prototype.load = function(url)
		{
			let _this = this;
			url = "" + url;
			let xmlHttpRequest = new XMLHttpRequest();
			xmlHttpRequest.open("GET", url, true);
			xmlHttpRequest.onreadystatechange = function() {
				let readyState = xmlHttpRequest.readyState;
				if (readyState === 4) {
					let src = xmlHttpRequest.responseXML;
					let onData = _this.onData;
					if (typeof onData === "function") {
						onData.apply(src, [src]);
					}

					let onLoad;
					let status = xmlHttpRequest.status;
					switch (status) {
						case 200:
						case 304:
							onLoad = _this.onLoad;
							if (typeof onLoad === "function") {
								onLoad.apply(src, [true]);
							}
							return true;
						default:
							onLoad = _this.onLoad;
							if (typeof onLoad === "function") {
								onLoad.apply(src, [false]);
							}
							return false;
					}
				}
			};
			xmlHttpRequest.send(null);
		};

		/**
		 * @param url
		 * @param target
		 * @param method
		 */
		Xml.prototype.send = function(url, target, method)
		{
			let sendMethod = method ? method.toUpperCase() : "GET";
			if (target) {
				console.log(target);
			}
			let xmlHttpRequest = new XMLHttpRequest();
			xmlHttpRequest.open(sendMethod, url, true);
			xmlHttpRequest.send(null);
			return true;
		};

		/**
		 * @param url
		 * @param resultXML
		 */
		Xml.prototype.sendAndLoad = function(url, resultXML)
		{
			let _this = this;
			_this.send(url);
			return _this.load(resultXML);
		};


		/**
		 * @constructor
		 */
		let Sound = function(target)
		{
			let _this = this;
			_this.target = target;
			_this.variables = { };
			_this.sounds = [];
			_this.volume = 100;
			_this.pan = 0;
			_this.transform = {ll: 100, lr: 100, rl: 100, rr: 100 };
			_this.isStreaming = false;
			_this.movieClip = null;
			_this.onSoundComplete = null;
			_this.onLoad = null;
			_this.canPlayThrough = false;
		};

		/**
		 * properties
		 */
		Object.defineProperties(Sound.prototype,
		{
			onLoad: {
				get: function() {
					return this.getProperty("onLoad");
				},
				set: function(onLoad) {
					this.checkOnLoad(onLoad);
				}
			},
			position: {
				get: function() { return this.getPosition(); },
				set: function (value) { this.setPosition(value);}
			}
		});

		/**
		 * @param name
		 * @returns {*}
		 */
		Sound.prototype.getProperty = function(name)
		{
			return this.variables[name];

		};

		/**
		 * @param name
		 * @param value
		 */
		Sound.prototype.setProperty = function(name, value)
		{
			this.variables[String(name)] = value;
		};

		/**
		 * @param currentTime
		 * @param loopCount
		 */
		Sound.prototype.start = function(currentTime, loopCount)
		{
			let _this = this;
			let stage = _this.target.getStage();
			let sounds = _this.sounds;

			if (loopCount == 0) loopCount = 1;

			let end = function (audio, sound)
			{
				return function ()
				{
					let volume = sound.volume;
					audio.loopCount--;
					if (audio.loopCount > 0) {
						audio.volume = volume / 100;
						audio.currentTime = 0;
						audio.play();
					}
					let onSoundComplete = sound.onSoundComplete;
					if (onSoundComplete) {
						sound.actions(onSoundComplete);
					}
				};
			};

			let audio;
			for (let id in sounds) {
				if (!sounds.hasOwnProperty(id)) {
					continue;
				}
				audio = sounds[id];

				if (!stage.autoPlayAudioUnlocked) {
					if (!(audio in stage.otherSoundsNotStarted)) {
						stage.otherSoundsNotStarted.push({"Sound": _this, "audio": audio, "currentTime": currentTime, "loopCount": loopCount});
						return;
					}
				}
				audio.load();
				if (currentTime) {
					audio.currentTime = currentTime;
				}
				if (typeof loopCount === "number" && loopCount > 0) {
					audio.loopCount = loopCount;
				}
				audio.addEventListener("ended", end(audio, _this));
				audio.play();
				stage.otherSoundsStarted.push({"Sound": _this, "audio": audio, "currentTime": currentTime, "loopCount": loopCount});
			}
		};

		Sound.prototype.actions = function(aScript)
		{
			let mc = this.target;
			if (aScript) {
				let as = aScript.ActionScript;
				as.execute(mc);
			}
		};

		/**
		 * stop
		 */
		Sound.prototype.stop = function(id)
		{
			let _this = this;
			let stage = _this.target.getStage();

			let sounds = this.sounds;
			let audio;
			if (id) {
				audio = sounds[id];
				if (audio) {
					audio.pause();
					stage.otherSoundsStarted = stage.otherSoundsStarted.filter(function(el) { return el.Sound != _this && el.audio != audio; });
					stage.otherSoundsStopped.push({"Sound": _this, "audio": audio});
				}
			} else {
				for (let key in sounds) {
					if (!sounds.hasOwnProperty(key)) {
						continue;
					}
					audio = sounds[key];
					audio.pause();
					stage.otherSoundsStarted = stage.otherSoundsStarted.filter(function(el) { return el.Sound != _this && el.audio != audio; });
					stage.otherSoundsStopped.push({"Sound": _this, "audio": audio});
				}
			}
		};

		/**
		 * position
		 */
		Sound.prototype.getPosition = function(id)
		{
			let sounds = this.sounds;
			let audio;
			if (id) {
				audio = sounds[id];
				if (audio) {
					return audio.currentTime*1000;
				} else return 0;
			} else {
				for (let key in sounds) {
					if (!sounds.hasOwnProperty(key)) {
						continue;
					}
					audio = sounds[key];
					if (audio) {
						return audio.currentTime*1000;
					}
				}
				return 0;
			}
		};

		/**
		 * position
		 */
		Sound.prototype.setPosition = function(value)
		{
			let sounds = this.sounds;
			let audio;
			for (let key in sounds) {
				if (!sounds.hasOwnProperty(key)) {
					continue;
				}
				audio = sounds[key];
				if (audio) {
					audio.currentTime = value;
				}
			}
		};

		/**
		 * @param url
		 * @param bool
		 */
		Sound.prototype.checkOnLoad = function(onLoad)
		{
			let sounds = this.sounds;
			let found = false;
			for (let key in sounds) {
				if (!sounds.hasOwnProperty(key)) {
					continue;
				}
				let sound = sounds[key];
				if (sound.canPlayThrough) {
					if (onLoad) {
						found = true;
						this.actions(onLoad) ;
					}
					found = true;
				}
			}
			if (!found) {
				this.actions(onLoad) ;
			}
		};

		/**
		 * @param url
		 * @param bool
		 */
		Sound.prototype.loadSound = function(url, isStreaming)
		{
			let _this = this;
			let stage = _this.target.getStage();
			_this.isStreaming = isStreaming;

			let sounds = _this.sounds;
			let audio = _document.createElement("audio");
			audio.src = url;
			sounds[0] = audio;

			let checkLoad = (function (audio, sound)
			{
				return function() {
					audio.preload = "auto";
					audio.autoplay = false;
					audio.loop = false;
					sound.canPlayThrough = true;
				};
			})(audio, _this);
			audio.addEventListener("canplaythrough", checkLoad);

			let onError = (function (audio, sound)
			{
				return function() {
				console.log('Error code: '+this.error.code+' '+this.error.message);
					let onLoad = sound.onLoad;
					if (typeof onLoad === "function") {
						onLoad.apply(sound, [false]);
					}
				};
			})(audio, _this);
			audio.addEventListener("error", onError);
			stage.otherSoundCount++;

			if (isStreaming) {
				_this.start(0);
			} else audio.load();
		};

		/**
		 * @param id
		 */
		Sound.prototype.attachSound = function(id)
		{
			let _this = this;
			let sounds = [];
			let movieClip = _this.movieClip;
			let stage = movieClip.getStage();
			let exportAssets = stage.exportAssets;
			if (id in exportAssets) {
				let characterId = exportAssets[id];
				let tag = stage.sounds[characterId];
				if (tag) {
					let audio = _document.createElement("audio");
					audio.onload = function ()
					{
						this.preload = "auto";
						this.autoplay = false;
						this.loop = false;
					};
					let swfTag = new SwfTag();
					audio.src = "data:audio/" + tag.Audio.mimeType + ";base64," +swfTag.base64encode(tag.Audio.data);
					sounds[id] = audio;
					stage.otherSoundCount++;
				}
			}

			_this.sounds = sounds;
		};

		/**
		 *
		 * @returns {number}
		 */
		Sound.prototype.getVolume = function()
		{
			return this.volume;
		};

		/**
		 *
		 * @param volume
		 */
		Sound.prototype.setVolume = function(volume)
		{
			let _this = this;
			let sounds = _this.sounds;
			_this.volume = volume;
			for (let id in sounds) {
				if (!sounds.hasOwnProperty(id)) {
					continue;
				}
				let audio = sounds[id];
				audio.volume = _max(0, _min(1, volume / 100));
			}
		};

		/**
		 * @returns {number|*}
		 */
		Sound.prototype.getPan = function()
		{
			return this.pan;
		};

		/**
		 * @param pan
		 */
		Sound.prototype.setPan = function(pan)
		{
			let _this = this;
			let sounds = _this.sounds;
			_this.pan = pan;
			for (let id in sounds) {
				if (!sounds.hasOwnProperty(id)) {
					continue;
				}
				let audio = sounds[id];
				audio.pan = pan;
			}
		};

		/**
		 * @param object
		 */
		Sound.prototype.setTransform = function(object)
		{
			let transform = this.transform;
			for (let name in object) {
				if (!object.hasOwnProperty(name)) {
					continue;
				}
				switch (name) {
					case "ll":
					case "lr":
					case "rl":
					case "rr":
						transform[name] = object[name];
						break;
				}
			}
		};

		/**
		 * @returns {{ll: number, lr: number, rl: number, rr: number}|*}
		 */
		Sound.prototype.getTransform = function()
		{
			return this.transform;
		};

		/**
		 * @returns {number}
		 */
		Sound.prototype.getBytesLoaded = function()
		{
			return 1;
		};

		/**
		 * @returns {number}
		 */
		Sound.prototype.getBytesTotal = function()
		{
			return 1;
		};

		/**
		 * @constructor
		 */
		let SharedObject = function()
		{
			let _this = this;
			_this.data = null;
			_this.name = null;
		};

		/**
		 * @param name
		 * @returns {SharedObject}
		 */
		SharedObject.prototype.getLocal = function(name)
		{
			let _this = this;
			_this.name = name;
			let data = window.localStorage.getItem(name);
			if (!data) {
				data = {};
			} else {
				data = JSON.parse(data);
			}
			_this.data = data;
			return _this;
		};

		/**
		 * flush
		 */
		SharedObject.prototype.flush = function()
		{
			let _this = this;
			window.localStorage.setItem(_this.name, JSON.stringify(_this.data));
			return true;
		};

		/**
		 * @param mc
		 * @constructor
		 */
		let Color = function(mc)
		{
			let _this = this;
			_this.movieClip = mc;
			_this.variables = {};
		};

		/**
		 *
		 * @param name
		 * @returns {*}
		 */
		Color.prototype.getProperty = function(name)
		{
			return this.variables[name];
		};

		/**
		 * @param name
		 * @param value
		 */
		Color.prototype.setProperty = function(name, value)
		{
			this.variables[String(name)] = value;
		};

		/**
		 * @param int
		 * @param alpha
		 * @returns {{R: number, G: number, B: number, A: number}}
		 */
		Color.prototype.intToRGBA = function(int, alpha)
		{
			alpha = alpha || 100;
			return {
				R: (int & 0xff0000) >> 16,
				G: (int & 0x00ff00) >> 8,
				B: (int & 0x0000ff),
				A: (alpha / 100)
			};
		};

		/**
		 * @param offset
		 */
		Color.prototype.setRGB = function(offset)
		{
			let _this = this;
			let mc = _this.movieClip;
			if (mc instanceof MovieClip) {
				offset |= 0;
				let obj = _this.intToRGBA(offset);
				let colorTransform = mc.getOriginColorTransform();
				if (colorTransform) {
					let transform = [obj.R, obj.G, obj.B, obj.A * 255, 0, 0, 0, 0];
					let multiColor = mc.cloneArray(transform);
					let color = mc.multiplicationColor(colorTransform, multiColor);
					mc.setColorTransform(color);
				}
			}
		};

		/**
		 * @returns {*[]|*}
		 */
		Color.prototype.getTransform = function()
		{
			let _this = this;
			let mc = _this.movieClip;
			if (mc instanceof MovieClip) {
				return mc.getColorTransform();
			}
			return undefined;
		};

		/**
		 * @param obj
		 */
		Color.prototype.setTransform = function(obj)
		{
			let _this = this;
			let mc = _this.movieClip;
			if (mc instanceof MovieClip) {
				let colorTransform = mc.getOriginColorTransform();
				let transform = [
					obj.rb, obj.gb, obj.bb, obj.ab,
					obj.ra, obj.ga, obj.ba, obj.aa
				];
				let multiColor = mc.cloneArray(transform);
				let color = mc.multiplicationColor(colorTransform, multiColor);
				mc.setColorTransform(color);
			}
		};

		/**
		 * @constructor
		 */
		let Mouse = function()
		{
			this.events = {};
		};

		/**
		 * @returns {undefined}
		 */
		Mouse.prototype.show = function()
		{
			return undefined;
		};

		/**
		 * @returns {undefined}
		 */
		Mouse.prototype.hide = function()
		{
			return undefined;
		};

		/**
		 * @param listener
		 */
		Mouse.prototype.addListener = function(listener)
		{
			let _this = this;
			if (listener && typeof listener === "object") {
				let events = ["onMouseDown", "onMouseMove", "onMouseUp"];
				let variables = listener.variables;
				for (let i = 0; i < 5; i++) {
					let event = events[i];
					if (typeof listener[event] === "function") {
						_this.events[event] = listener[event];
					} else if (variables && typeof variables[event] === "function") {
						_this.events[event] = variables[event];
					}
				}
			}
			return true;
		};

		/**
		 * @param listener
		 */
		Mouse.prototype.removeListener = function(listener)
		{
			let _this = this;
			if (listener && typeof listener === "object") {
				let events = ["onMouseDown", "onMouseMove", "onMouseUp"];
				for (let i = 0; i < 5; i++) {
					let event = events[i];
					let variables = listener.variables;
					if (typeof listener[event] === "function" ||
						(variables && typeof variables[event] === "function")
					) {
						_this.events[event] = undefined;
					}
				}
			}
			return true;
		};

		/**
		 * @constructor
		 */
		let Key = function()
		{
			let _this = this;
			_this.variables = {};
			_this.codes = [];
			_this._listeners = [];
		};

		/**
		 * properties
		 */
		Object.defineProperties(Key.prototype,
		{
			onKeyDown: {
				get: function() {
					return this.getProperty("onKeyDown");
				},
				set: function(onKeyDown) {
					this.setProperty("onKeyDown", onKeyDown);
				}
			},
			onKeyUp: {
				get: function() {
					return this.getProperty("onKeyUp");
				},
				set: function(onKeyUp) {
					this.setProperty("onKeyUp", onKeyUp);
				}
			}
		});

		/**
		 * @type {number}
		 */
		Key.prototype.BACKSPACE = 8;
		Key.prototype.CAPSLOCK = 20;
		Key.prototype.CONTROL = 17;
		Key.prototype.DELETEKEY = 46;
		Key.prototype.DOWN = 40;
		Key.prototype.END = 35;
		Key.prototype.ENTER = 13;
		Key.prototype.ESCAPE = 27;
		Key.prototype.HOME = 36;
		Key.prototype.INSERT = 45;
		Key.prototype.LEFT = 37;
		Key.prototype.PGDN = 34;
		Key.prototype.PGDN = 34;
		Key.prototype.PGUP = 33;
		Key.prototype.RIGHT = 39;
		Key.prototype.SHIFT = 16;
		Key.prototype.SPACE = 32;
		Key.prototype.TAB = 9;
		Key.prototype.UP = 38;
		Key.prototype.codes = [];

		/**
		 * @param name
		 * @returns {*}
		 */
		Key.prototype.getProperty = function(name)
		{
			return this.variables[name];
		};

		/**
		 * @param name
		 * @param value
		 */
		Key.prototype.setProperty = function(name, value)
		{
			this.variables[String(name)] = value;
		};

		/**
		 *
		 * @param listener
		 * @returns {boolean}
		 */
		Key.prototype.addListener = function(listener)
		{
			let _this = this;
			let onKeyDown = listener.onKeyDown;
			if (onKeyDown) {
				_this.onKeyDown = onKeyDown;
			}
			let onKeyUp = listener.onKeyUp;
			if (onKeyUp) {
				_this.onKeyUp = onKeyUp;
			}
			return true;
		};

		/**
		 * @param code
		 * @returns {boolean}
		 */
		Key.prototype.isDown = function(code)
		{
			let _this = this;
			let codes = keyClass.codes;
			for (let idx = 0; idx < codes.length; ++idx) {
				if (_this.codes[idx] !== code) {
					continue;
				}
				if (_keyEvent) {
					_keyEvent.preventDefault();
				}
				return true;
			}
		};

		/**
		 * @returns {*}
		 */
		Key.prototype.getCode = function()
		{
			let keyCode = (_keyEvent) ? _keyEvent.keyCode : null;
			if (96 <= keyCode && keyCode <= 105) {
				let n = keyCode - 96;
				switch (n) {
					case 0:
						keyCode = 48;
						break;
					case 1:
						keyCode = 49;
						break;
					case 2:
						keyCode = 50;
						break;
					case 3:
						keyCode = 51;
						break;
					case 4:
						keyCode = 52;
						break;
					case 5:
						keyCode = 53;
						break;
					case 6:
						keyCode = 54;
						break;
					case 7:
						keyCode = 55;
						break;
					case 8:
						keyCode = 56;
						break;
					case 9:
						keyCode = 57;
						break;
				}
			}
			return keyCode;
		};
		let keyClass = new Key();

		/**
		 * @param event
		 */
		function keyUpAction(event)
		{
			_keyEvent = event;
			let onKeyUp = keyClass.onKeyUp;
			if (typeof onKeyUp === "function") {
				onKeyUp.apply(keyClass, [event]);
			}

			let keyCode = keyClass.getCode();
			let index = keyClass.codes.indexOf(keyCode);
			if (index > -1) {
				keyClass.codes.splice(index, 1);
			}
		}

		/**
		 * @param event
		 */
		function keyDownAction(event)
		{
			_keyEvent = event;
			let keyCode = keyClass.getCode();
			if (keyClass.codes.indexOf(keyCode) === -1) {
				keyClass.codes.push(keyCode);
			}

			let keyHit = false;
			let i;
			let length;
			let obj;
			let onKeyDown = keyClass.onKeyDown;
			if (typeof onKeyDown === "function") {
				keyHit = true;
				onKeyDown.apply(keyClass, [event]);
			}

			let idx;
			length = stages.length;
			for (let pIdx = 0; pIdx < length; pIdx++) {
				if (!(pIdx in stages)) {
					continue;
				}

				let stage = stages[pIdx];
				let keyDownEventHits = stage.keyDownEventHits;
				let kLen = keyDownEventHits.length;
				if (kLen) {
					keyHit = true;
					for (idx = 0; idx < kLen; idx++) {
						obj = keyDownEventHits[idx];
						stage.executeEventAction(obj.as, obj.mc);
					}
				}

				let buttonHits = stage.buttonHits;
				let len = buttonHits.length;
				let isEnd = false;
				for (i = len; i--;) {
					if (!(i in buttonHits)) {
						continue;
					}

					let hitObj = buttonHits[i];
					if (!hitObj) {
						continue;
					}

					let button = hitObj.button;
					if (!button) {
						continue;
					}

					let actions = button.getActions();
					if (!actions) {
						continue;
					}

					let aLen = actions.length;
					for (idx = 0; idx < aLen; idx++) {
						if (!(idx in actions)) {
							continue;
						}

						let cond = actions[idx];
						let CondKeyPress = cond.CondKeyPress;
						switch (CondKeyPress) {
							case 1: // left arrow
								CondKeyPress = 37;
								break;
							case 2: // right arrow
								CondKeyPress = 39;
								break;
							case 3: // home
								CondKeyPress = 36;
								break;
							case 4: // end
								CondKeyPress = 35;
								break;
							case 5: // insert
								CondKeyPress = 45;
								break;
							case 6: // delete
								CondKeyPress = 46;
								break;
							case 14: // up arrow
								CondKeyPress = 38;
								break;
							case 15: // down arrow
								CondKeyPress = 40;
								break;
							case 16: // page up
								CondKeyPress = 33;
								break;
							case 17: // page down
								CondKeyPress = 34;
								break;
							case 18: // tab
								CondKeyPress = 9;
								break;
							case 19: // escape
								CondKeyPress = 27;
								break;
						}

						if (CondKeyPress !== keyCode) {
							continue;
						}

						stage.buttonAction(hitObj.parent, cond.ActionScript);
						stage.touchRender();
						isEnd = true;
						keyHit = true;
						break;
					}

					if (isEnd) {
						keyHit = true;
						break;
					}
				}
			}

			if (keyHit || typeof onKeyDown === "function") {
				event.preventDefault();
				return false;
			}
		}

		/**
		 * @constructor
		 */
		let Global = function()
		{
			this.variables = {};
		};

		/**
		 *
		 * @param name
		 * @returns {*}
		 */
		Global.prototype.getVariable = function(name)
		{
			return this.variables[name];
		};

		/**
		 * @param name
		 * @param value
		 * @returns {*}
		 */
		Global.prototype.setVariable = function(name, value)
		{
			this.variables[name] = value;
		};

		/**
		 * @param name
		 * @returns {*}
		 */
		Global.prototype.getProperty = function(name)
		{
			return this.variables[name];
		};

		/**
		 * @param name
		 * @param value
		 */
		Global.prototype.setProperty = function(name, value)
		{
			this.variables[name] = value;
		};

		/**
		 * @constructor
		 * @param stage
		 */
		let packages = function(stage)
		{
			this.stage = stage;

		};

		/**
		 * @type {*}
		 */
		packages.prototype =
		{
			"flash": {
				"display": {
					"MovieClip": MovieClip,
					"Sprite": Sprite,
					"DisplayObjectContainer": DisplayObjectContainer,
					"InteractiveObject": InteractiveObject,
					"DisplayObject": DisplayObject,
					"BitmapData": BitmapData,
					"Graphics": Graphics
				},
				"events": {
					"EventDispatcher": EventDispatcher,
					"MouseEvent": clipEvent
				},
				"text": {
					"StaticText": StaticText
				},
				"media": {
					"Sound": Sound
				},
				"system": {
					"fscommand": function ()
					{
						let command = arguments[0];
						let args = arguments[1];
						if (args === undefined) {
							args = "";
						}

						switch (command) {
							case "quit":
							case "fullscreen":
							case "allowscale":
							case "showmenu":
							case "exec":
							case "trapallkeys":
								break;
							default:
								if (command) {
									let _this = this;
									let method = (_this.tagId) ? _this.tagId : _this.getName();
									let body = method + "_DoFSCommand(command, args);";
									let fscommand = new Func("command", "args", body);
									fscommand(command, args);
								}
								break;
						}

						return true;
					}
				}
			}
		};

		/**
		 * @constructor
		 */
		let Stage = function()
		{
			let _this = this;
			_this.frame = 0;
			_this.id = stageId++;
			_this.bounds = null;
			_this.url = "";
			_this.name = "swf2js_" + _this.id;
			_this.intervalId = 0;

			_this.frameRate = 0;
			_this.fileSize = 0;
			_this.stopFlag = true;
			_this.stepFlag = false;

			// options
			_this.optionWidth = 0;
			_this.optionHeight = 0;
			_this.callback = null;
			_this.tagId = null;
			_this.FlashVars = {};
			_this.quality = "medium"; // low = 0.25, medium = 0.8, high = 1.0
			_this.audioType = "default";
			_this.bgcolor = null;

			// event
			_this.mouse = new Mouse();

			// params
			_this.context = null;
			_this.canvas = null;
			_this.preContext = null;
			_this.hitContext = null;
			_this.matrix = [1, 0, 0, 1, 0, 0];
			_this._matrix = [1, 0, 0, 1, 0, 0];
			_this._colorTransform = [1, 1, 1, 1, 0, 0, 0, 0];
			_this.characters = [];
			_this.initActions = [];
			_this.exportAssets = [];
			_this.packages = [];
			_this.registerClass = [];
			_this.buttonHits = [];
			_this.downEventHits = [];
			_this.moveEventHits = [];
			_this.upEventHits = [];
			_this.keyDownEventHits = [];
			_this.keyUpEventHits = [];

			_this.sounds = [];
			_this.soundsStopped = [];
			_this.soundsStarted = [];
			_this.soundsNotStarted = [];
			_this.otherSoundsNotStarted = [];
			_this.soundUseType = "webaudio";
			_this.firstSound = true;
			_this.soundCount = 0;
			_this.otherSoundsStopped = [];
			_this.otherSoundsStarted = [];
			_this.otherSoundCount = 0;
			_this.soundStreams = [];
			_this.soundStreamCount = 0;
			_this.soundStream = false;
			_this.soundStreamPlaying = -1;
			_this.soundStreamFrameRange = -1;
			_this.soundStreamIsPlaying = false;
			_this.autoPlayAudioUnlocked = false;
			_this.lastAudioCurrentTime = -1;
			_this.videoStreams = [];
			_this.videoCount = 0;
			_this.autoPlayAllowed = false;
			_this.autoPlayAudioAllowed = false;
			_this.autoPlayVideoAllowed = false;
			_this.autoStart = true;
			_this.imageCount = 0;
			_this.actions = [];
			_this.instances = [];
			_this.placeObjects = [];
			_this.fonts = [];
			_this.isAction = true;
			_this._global = new Global();
			_this.touchObj = null;
			_this.touchStatus = "up";
			_this.overObj = null;
			_this.touchEndAction = null;
			_this.requestAnimationFrameId = null;
			_this.nextTime = 0;
			_this.waitTime = 0;
			_this.scale = 1;
			_this.baseWidth = 0;
			_this.baseHeight = 0;
			_this.width = 0;
			_this.height = 0;
			_this.isHit = false;
			_this.gotTouchEvent = false;
			_this.isLoad = false;
			_this.jpegTables = null;
			_this.backgroundColor = "transparent";
			_this.signature = "";
			_this.version = 8;
			_this.loadStatus = 0;
			_this.isClipDepth = false;
			_this.clipDepth = 0;
			_this.clipMc = false;
			_this.dragMc = null;
			_this.dragRules = null;
			_this.scaleMode = "showAll";
			_this.align = "";
			_this.avm2 = new packages(_this);
			_this.abc = new packages(_this);
			_this.symbols = [];
			_this.abcFlag = false;
			_this.progressSteps = [];
			_this.progressStep = -1;

			_this.debug = 0;
			_this.debug_lines=[];
			// render
			_this.doneTags = [];
			_this.newTags = [];

			// init
			let mc = new MovieClip();
			mc.setStage(_this);
			_this.setParent(mc);
			// used during parsing
			_this.tags_total = 0;
			_this.tags_offset = -1;

			_this.soundStreamLevels = [{"CharacterId":0, "SoundStreamFirstBlock":true}];
			_this.currentSoundStream = -1;
			_this.currentFrameRange = -1;

			_this.imgUnloadCount = 0;
			_this.sndUnloadCount = 0;
			_this.sndStreamUnloadCount = 0;
			_this.videoUnloadCount = 0;
			_this.lastAudioCurrentTime = -1;
			_this.SWF_HAS_AS3 = 0;
		};
		Stage.prototype.addProgressStep = function(step) {
			this.progressSteps.push([step, getTimeStamp()]);
			this.progressStep++;
			console.log("Start "+this.progressSteps[this.progressStep][0]+" ["+this.progressSteps[this.progressStep][1]+"]");
		};

		Stage.prototype.progressStepEnd = function(show) {
			this.progressSteps[this.progressStep][2] = getTimeStamp();
			if (show) this.showProgressStep(this.progressStep);
		};

		Stage.prototype.showProgressStep = function(p) {
			if (!p) p = this.progressStep;
			console.log(this.progressSteps[p][0] + " in " +
				Math.ceil(this.progressSteps[p][2] - this.progressSteps[p][1]) / 1000 +
				" secs [" + Math.ceil(this.progressSteps[p][1]) + "," + Math.ceil(this.progressSteps[p][2]) + "]");
		};

		Stage.prototype.showProgressSteps = function() {
			for (let p = 0; p < this.progressSteps.length; p++)
				console.log(this.progressSteps[p][0] + " in " +
					Math.ceil(this.progressSteps[p][2] - this.progressSteps[p][1]) / 1000 +
					" secs [" + Math.ceil(this.progressSteps[p][1]) + "," + Math.ceil(this.progressSteps[p][2]) + "]");
		};

		Stage.prototype.showProgressTotalTime = function() {
			console.log("Total in " + Math.ceil(this.progressSteps[this.progressStep][2] - this.progressSteps[0][1]) / 1000 +
				" secs [" + Math.ceil(this.progressSteps[0][1]) + "," + Math.ceil(this.progressSteps[this.progressStep][2]) + "]");
		};

		/**
		 * @returns {number|*}
		 */
		Stage.prototype.getId = function()
		{
			return this.id;
		};

		/**
		 * @param id
		 */
		Stage.prototype.setId = function(id)
		{
			this.id = id;
		};

		/**
		 * @returns {*}
		 */
		Stage.prototype.getParent = function()
		{
			return this.parent;
		};

		/**
		 * @param parent
		 */
		Stage.prototype.setParent = function(parent)
		{
			this.parent = parent;
		};

		/**
		 * @returns {number|*}
		 */
		Stage.prototype.getVersion = function()
		{
			return this.version;
		};

		/**
		 * @param version
		 */
		Stage.prototype.setVersion = function(version)
		{
			this.version = version;
		};
		/**
		 * @returns [FCZ]WS
		 */
		Stage.prototype.getSignature = function()
		{
			return this.signature;
		};

		/**
		 * @param signature
		 */
		Stage.prototype.setSignature = function(signature)
		{
			this.signature = signature;
		};

		/**
		 * @returns {number|*}
		 */
		Stage.prototype.getFrameCount = function()
		{
			return this.frameCount;
		};

		/**
		 * @param version
		 */
		Stage.prototype.setFrameCount = function(frameCount)
		{
			this.frameCount = frameCount;
		};

		/**
		 *
		 * @returns {string}
		 */
		Stage.prototype.getBackgroundColor = function()
		{
			return this.backgroundColor;
		};

		/**
		 * @param r
		 * @param g
		 * @param b
		 */
		Stage.prototype.setBackgroundColor = function(r, g, b)
		{
			this.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
		};

		/**
		 * @returns {Array}
		 */
		Stage.prototype.getGlobal = function()
		{
			return this._global;
		};
		Stage.prototype.prepareStartStopAnimation = function()
		{
			let _this = this;
			let control;
			if (!_this.autoPlayAllowed || !_this.autoStart || _this.otherSoundCount> 0) {
				control = document.createElement("input");
				control.type = "button";
				control.id = "control";
				control.alt = "Play";
				control.value = "Play";
				let svg='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSItMTI4IC0xMjggMjU2IDI1NiI+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMi45NTU0MDM0LDAsMCwyLjk2ODA1MzUsLTEuMjM3MTg1OSwwLjY5NDU5OTMpIiBzdHlsZT0ic3Ryb2tlLXdpZHRoOjAuMDMzNzY0MTQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmUiPjxwYXRoIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojNjU2NTY1O2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojNjU2NTY1O3N0cm9rZS13aWR0aDowLjAzMzc2NDE0O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjAiIHZlY3Rvci1lZmZlY3Q9Im5vbi1zY2FsaW5nLXN0cm9rZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUwLC01MCkiIGQ9Ik0gNTAsOTIuODc1IEMgMjYuMzU4LDkyLjg3NSA3LjEyNSw3My42NDIgNy4xMjUsNTAgNy4xMjUsMjYuMzU4IDI2LjM1OCw3LjEyNSA1MCw3LjEyNSA3My42NDIsNy4xMjUgOTIuODc1LDI2LjM1OCA5Mi44NzUsNTAgOTIuODc1LDczLjY0MiA3My42NDIsOTIuODc1IDUwLDkyLjg3NSBaIE0gNTAsOS4xMjUgQyAyNy40NjEsOS4xMjUgOS4xMjUsMjcuNDYxIDkuMTI1LDUwIDkuMTI1LDcyLjUzOCAyNy40NjEsOTAuODc1IDUwLDkwLjg3NSA3Mi41MzgsOTAuODc1IDkwLjg3NSw3Mi41MzggOTAuODc1LDUwIDkwLjg3NSwyNy40NjEgNzIuNTM4LDkuMTI1IDUwLDkuMTI1IFoiIC8+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDMuNDg5OTk5NiwwLDAsMy40ODk5OTk1LC0wLjc0OTk5NjU1LDAuNzUwMDAwMDUpIiBpZD0iODdlNjc4ZjEtOWQzYi00NjRiLTlmZmUtNDYzYTNkMjcwMGFlIiBzdHlsZT0iZmlsbDojOTY5Njk2O2ZpbGwtb3BhY2l0eToxIj48Y2lyY2xlIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojOTY5Njk2O2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIgdmVjdG9yLWVmZmVjdD0ibm9uLXNjYWxpbmctc3Ryb2tlIiBjeD0iMCIgY3k9IjAiIHI9IjM1IiAvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLDEuODI4MzIxLC0xLjgyMDUyODUsMCwyNC4yMjc0OTEsLTIuMDEyNTY0MykiIGlkPSJmNWI3NTcyMy03ZDdhLTQzOWYtOTlhNC1lNTQ2MmU5YjZjOWIiPjxwb2x5Z29uIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojNjU2NTY1O2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjAiIHZlY3Rvci1lZmZlY3Q9Im5vbi1zY2FsaW5nLXN0cm9rZSIgcG9pbnRzPSIzNy40MywzMi40MSAtMzcuNDMsMzIuNDEgMCwtMzIuNDEiLz48L2c+PC9zdmc+';
				let d = document.getElementById(_this.name);
				let s = window.getComputedStyle(d);
				let w = Math.floor(parseFloat(s.height)/3);
				let top = Math.floor((parseFloat(s.height)-w)/2), left = Math.floor((parseFloat(s.width)-w)/2);
				control.style="position: absolute; top: "+top+"px; left: "+left+"px; background-image: url("+svg+"); background-size: "+w+"px; background-repeat: no-repeat; background-position: left;"+
					"padding-left: "+w+"px; height: "+w+"px; border: none; background-color: transparent; color:transparent; z-index: 255;";
				d.appendChild(control);
				control.onclick = function() {
					control.parentNode.removeChild(control);
					_this.play();
				};
				let elemEventHandler = function(event) {
					let control = document.getElementById('control');
					if (control) {
						control.parentNode.removeChild(control);
						_this.play();
						event.target.removeEventListener("click", elemEventHandler, false);
					}
				};
				d.addEventListener("click", elemEventHandler , false);
			}
		};

		/**
		 * @param audio
		 * @param soundInfo
		 */
		Stage.prototype.startSound = function (soundStart)
		{
			let _this = this;
			let sound = _this.sounds[soundStart.SoundId];
			let audio = sound.Audio;

			if (!this.autoPlayAudioUnlocked) {
				if (soundStart.soundInfo && !soundStart.SoundInfo.SyncStop) {
					this.soundsStopped.push(soundStart);
				} else {
					this.soundsNotStarted.push(soundStart);
				}
			} else {
				this.soundsStarted.push(soundStart);
				if (soundStart.SoundInfo) audio.setSoundInfo(soundStart.SoundInfo);
				else audio.play();
			}
		};

		/**
		 * stopAllSounds
		 */
		Stage.prototype.stopAllSounds = function()
		{
			let _this = this;
			_this.stopSounds(true); //nowait
		};

		/**
		 * @param SoundStreams
		 */
		Stage.prototype.prepareSoundStreams = function()
		{
			if (this.soundStreams.length == 0) return;

			let i, f , b;
			// clean up empty soundstreams
			for (i=0; i<this.soundStreams.length; i++) {
				for ( f=0; f<this.soundStreams[i].FrameRanges.length; f++) {
					if (!this.soundStreams[i].FrameRanges[f].Data.length) this.soundStreams[i].FrameRanges[f] = null;
				}
				this.soundStreams[i].FrameRanges = this.soundStreams[i].FrameRanges.filter(Boolean);
				if (!this.soundStreams[i].FrameRanges.length) this.soundStreams[i] = null;
			}
			this.soundStreams = this.soundStreams.filter(Boolean);

			// build up SoundStream and convert if necessary
			for (i=0; i<this.soundStreams.length; i++) {
				let s = this.soundStreams[i];
				for (f=0; f<s.FrameRanges.length; f++) {
					let frameRange = s.FrameRanges[f];

					let totalLength = 0;
					for (b=0; b<frameRange.Data.length; b++) {
						totalLength += frameRange.Data[b].length;
					}
					let result = new Uint8Array(totalLength);
					let offset = 0;
					for (b = 0; b < frameRange.Data.length; b++) {
						result.set(frameRange.Data[b], offset);
						offset += frameRange.Data[b].length;
					}

					//result = Array.from(this.data);
					let mimeType = "";
					switch (s.SoundStreamCompression) {
						case 0: // Uncompressed native-endian
						case 3: // Uncompressed little-endian
							mimeType = "wave";
							break;
						case 1: // ADPCM
							mimeType = "wave";
							break;
						case 2: // MP3
							mimeType = "mpeg";
							break;
						case 4: // NellyMoser 16  kHz
						case 5: // NellyMoser 8  kHz
						case 6: // NellyMoser 22.050 kHz
							mimeType = "nellymoser";
							break;
						case 11: // Speex
							mimeType = "speex";
							break;
						case 15:
							mimeType = "x-aiff";
							break;
					}
					let data;
					frameRange.endAudio = (frameRange.endFrame+1-frameRange.startFrame)*this.getFrameRate()/1000;
					// SoundStreamHead StreamSoundSize The sample size of the streaming sound data. Always 1 (16 bit).

					if (s.SoundStreamCompression == 0 || s.SoundStreamCompression == 3) {
						let pcmOutput = new PcmOutput(s.SoundStreamType, s.SoundStreamSize, s.SoundStreamRate, result);
						data = pcmOutput.createWave();
					} else if (s.SoundStreamCompression == 1) {
						let adpcmOutput = new AdpcmOutput();
						data = adpcmOutput.convertADPCMtoWave(true, s.SoundStreamType, s.SoundStreamSize, s.SoundStreamRate, frameRange.Data);
					} else if (s.SoundStreamCompression == 4 || s.SoundStreamCompression == 5 || s.SoundStreamCompression == 6) {
						let nellyMoserDecoder = new NellyMoserDecoder(s.SoundStreamType, s.SoundStreamSize, s.SoundStreamRate, frameRange.Data);
						data = nellyMoserDecoder.toWave();
						mimeType = "wave";
					} else if (s.SoundStreamCompression == 2) {
						data = result;
					} else {
						console.log('Soundstream compression '+s.SoundStreamCompression+' ('+soundFormats[s.SoundStreamCompression]+') not supported');
					}

					let audio = new AudioInstance({
						"mimeType": mimeType,
						"data": data,
						"id": s.SoundStreamId
					});
					frameRange.Audio = audio;
					frameRange.Duration = frameRange.endAudio;
					this.sndStreamUnloadCount++;
				}
			}
		};

		/**
		 * unlockSounds
		 */
		Stage.prototype.unlockSounds = function()
		{
			let i, a, oldVolume;
			if (!this.autoPlayAllowed) {
				if (this.firstSound) {
					if (this.soundStreams.length > 0) {
						for (i=0; i<this.soundStreams.length; i++) {
							if (!this.soundStreams[i]) continue;
							for (let f=0 ; f<this.soundStreams[i].FrameRanges.length; f++) {
								let frameRange = this.soundStreams[i].FrameRanges[f];
								a = frameRange.Audio;
								oldVolume = a.volume();
								a.volume(0);
								a.play();
								a.pause();
								a.seek(0);
								a.volume(oldVolume);
							}
						}
					}
					for (i=0; i<this.sounds.length; i++) {
						if (this.sounds[i]) {
							a = this.sounds[i].Audio;
							oldVolume = a.volume();
							a.volume(0);
							a.play();
							a.pause();
							a.seek(0);
							a.volume(oldVolume);
						}
					}
				}
			}
			this.firstSound = false;
			this.autoPlayAudioUnlocked = true;
		};

		/**
		 * restartSounds
		 */
		Stage.prototype.restartSounds = function()
		{
			this.autoPlayAudioUnlocked = true;
			this.autoPlayAllowed = true;

			for (let i=0; i<this.soundsNotStarted.length; i++) {
				this.startSound(this.soundsNotStarted[i]);
				this.soundsStarted.push({
					"SoundId": this.soundsNotStarted[i].SoundId,
					"SoundInfo": this.soundsNotStarted[i].SoundInfo
				});
			}
			this.soundsNotStarted = [];

			for (let i=0; i<this.soundsStopped.length; i++) {
				this.startSound(this.soundsStopped[i]);
				this.soundsStarted.push({
					"SoundId": this.soundsStopped[i].SoundId,
					"SoundInfo": this.soundsStopped[i].SoundInfo
				});
			}
			this.soundsStopped = [];

			for (let i=0; i<this.otherSoundsNotStarted.length; i++) {
				if (this.otherSoundsNotStarted[i]) {
					this.otherSoundsNotStarted[i].Sound.start(
						this.otherSoundsNotStarted[i].currentTime,
						this.otherSoundsNotStarted[i].loopCount
					);
					this.otherSoundsStarted.push(this.otherSoundsNotStarted[i]);
				}
			}
			this.otherSoundsNotStarted = [];

			for (let i=0; i<this.otherSoundsStopped.length; i++) {
				if (this.otherSoundsStopped[i]) {
					this.otherSoundsStopped[i].audio.play();
					this.otherSoundsStarted.push(this.otherSoundsStopped[i]);
				}
			}
			this.otherSoundsStopped = [];
		};

		/**
		 * stopSounds
		 */
		Stage.prototype.stopSounds = function(nowait, markAsStopped)
		{
			let _this = this;
			let i;
			if (nowait) {
				for (i=0; i<this.soundsStarted.length; i++) {
					let sound = this.sounds[this.soundsStarted[i].SoundId];
					if (sound.Audio.isPlaying) {
						sound.Audio.pause();
						if (markAsStopped) this.soundsStopped.push({
							"SoundId": this.soundsStarted[i].SoundId,
							"SoundInfo": this.soundsStarted[i].SoundInfo
						});
					}
				}
				this.soundsStarted = [];

				for (i=0; i<this.soundStreams.length; i++) {
					for (let f=0; f<this.soundStreams[i].FrameRanges.length; f++) {
						let frameRange = this.soundStreams[i].FrameRanges[f];
						if (this.soundStreams[i].FrameRanges[f].Audio.isPlaying) {
							frameRange.Audio.pause();
						}
					}
				}

				for (i=0; i<this.otherSoundsStarted.length; i++) {
					if (this.otherSoundsStarted[i]) this.otherSoundsStarted[i].Sound.stop();
					if (markAsStopped) this.otherSoundsStopped.push(this.otherSoundsStarted[i]);
				}
				this.otherSoundsStarted = [];
			} else {
				let wt = this.nextTime - getTimeStamp();
				setTimeout(function() {
					_this.stopSounds(true, markAsStopped);
				}, wt);
			}
		};

		/**
		 * sync animation with (main) soundstream
		 */
		Stage.prototype.syncWithSoundStream = function()
		{
			if (this.soundStreamIsPlaying) {
				let fr = this.soundStreams[this.soundStreamPlaying].FrameRanges[this.soundStreamFrameRange];
				let f = this.getParent()._currentframe;
				let cat = fr.Audio.seek();
				if ((fr.startFrame <= f) && (f <= fr.endFrame) && (cat > this.lastAudioCurrentTime)) {
					this.nextTime = getTimeStamp() + (fr.startAudio + (f - fr.startFrame + 1) * this.getFrameRate() / 1000 - this.soundStreams[this.soundStreamPlaying].soundStreamOutputLatency - cat) * 1000;
					this.lastAudioCurrentTime = cat;
				}
			}
		};

		/**
		 * animation
		 */
		Stage.prototype.animate = function() {
			let _this = this;

			if (this.soundStreamIsPlaying) this.syncWithSoundStream(_this);

			this.waitTime = this.nextTime - getTimeStamp();
			if (this.waitTime <= 0) {
				this.nextTime = this.nextTime + _this.getFrameRate();
				if (this.isLoad && !this.stopFlag) {
					this.nextFrame();
				}
			}

			if (this.isLoad && !this.stopFlag && !this.stepFlag) {
				this.requestAnimationFrameId = requestAnimationFrame(function(timeStamp) {
					_this.animate();
				});
			}
		};

		/**
		 * play
		 */
		Stage.prototype.play = function()
		{
			let _this = this;
			this.stopFlag = false;

			let control = document.getElementById("control");
			if (control) {
				control.parentNode.removeChild(control);
				control = null;
			}

			if (!_this.autoPlayUnlocked) _this.unlockSounds();
			_this.restartSounds();

			_this.nextTime = getTimeStamp() + _this.getFrameRate();
			_this.animate(_this);

		};
		/**
		 * advance one frame
		 */
		Stage.prototype.step = function()
		{
			let _this = this;
			let control = document.getElementById("control");
			if (control) {
				control.parentNode.removeChild(control);
				control = null;
			}
			if (!_this.autoPlayUnlocked) _this.unlockSounds();
			_this.stopFlag = false;
			_this.restartSounds();
			_this.nextFrame();
			_this.stopFlag = true;
			_this.stopSounds(false, true);
		};

		/**
		 * toggle between play and stop
		 */
		Stage.prototype.togglePlay = function()
		{
			let control = document.getElementById("control");
			if (control) {
				control.parentNode.removeChild(control);
				control = null;
			}
			if (this.stopFlag) {
				this.play();
			} else {
				this.stop();
			}
		};

		/**
		 * stop
		 */
		Stage.prototype.stop = function()
		{
			let _this = this;

			_this.stopFlag = true;
			cancelAnimationFrame(_this.requestAnimationFrameId);
			_this.stopSounds(false, true);
		};

		/**
		 * @returns {*}
		 */
		Stage.prototype.getName = function()
		{
			return this.name;
		};

		/**
		 * @param name
		 */
		Stage.prototype.setName = function(name)
		{
			this.name = name;
		};

		/**
		 * @param options
		 */
		Stage.prototype.setOptions = function(options)
		{
			if (options !== undefined) {
				let _this = this;
				_this.options = options;
				_this.optionWidth = options.width || _this.optionWidth;
				_this.optionHeight = options.height || _this.optionHeight;
				_this.callback = options.callback || _this.callback;
				_this.tagId = options.tagId || _this.tagId;
				_this.FlashVars = options.FlashVars || _this.FlashVars;
				_this.quality = options.quality || _this.quality;
				_this.audioType = options.audioType || _this.audioType;
				_this.bgcolor = options.bgcolor || _this.bgcolor;
				_this.noScaling = options.noScaling || _this.noScaling;
				_this.debug = options.debug || _this.debug;
				if (options.autoStart != undefined) _this.autoStart = options.autoStart;
				if (_this.audioType!="default") {
					switch(_this.audioType) {
						case "webaudio" :
							_this.soundUseType=_this.audioType;
							break;
						case "webmedia" :
							_this.soundUseType=_this.audioType;
							break;
						case "html5" :
							_this.soundUseType=_this.audioType;
							break;
						case "audio" :
							_this.soundUseType=_this.audioType;
							break;
						default:
							console.warn("Audiotype '"+_this.audioType+"' not supported, fallback to default soundtype: "+_this.soundUseType);
							break;
					}
				}
				// quality
				switch (_this.quality) {
					case "low":
						_devicePixelRatio = devicePixelRatio * 0.5;
						break;
					case "high":
						_devicePixelRatio = devicePixelRatio;
						break;
				}
			}
		};

		/**
		 * @returns {number}
		 */
		Stage.prototype.getBaseWidth = function()
		{
			return this.baseWidth;
		};

		/**
		 * @param baseWidth
		 */
		Stage.prototype.setBaseWidth = function(baseWidth)
		{
			this.baseWidth = baseWidth;
		};

		/**
		 *
		 * @returns {number}
		 */
		Stage.prototype.getBaseHeight = function()
		{
			return this.baseHeight;
		};

		/**
		 * @param baseHeight
		 */
		Stage.prototype.setBaseHeight = function(baseHeight)
		{
			this.baseHeight = baseHeight;
		};

		/**
		 *
		 * @returns {number}
		 */
		Stage.prototype.getWidth = function()
		{
			return this.width;
		};

		/**
		 * @param width
		 */
		Stage.prototype.setWidth = function(width)
		{
			if (width < 0) {
				width *= -1;
			}
			this.width = width;
		};

		/**
		 * @returns {number}
		 */
		Stage.prototype.getHeight = function()
		{
			return this.height;
		};

		/**
		 * @param height
		 */
		Stage.prototype.setHeight = function(height)
		{
			if (height < 0) {
				height *= -1;
			}
			this.height = height;
		};

		/**
		 * @returns {number}
		 */
		Stage.prototype.getScale = function()
		{
			return this.scale;
		};

		/**
		 * @param scale
		 */
		Stage.prototype.setScale = function(scale)
		{
			this.scale = scale;
		};

		/**
		 * @returns {*}
		 */
		Stage.prototype.getMatrix = function()
		{
			return this.matrix;
		};

		/**
		 * @param matrix
		 */
		Stage.prototype.setMatrix = function(matrix)
		{
			this.matrix = matrix;
		};

		/**
		 * @param id
		 * @returns {*}
		 */
		Stage.prototype.getCharacter = function(id)
		{
			return this.characters[id];
		};

		/**
		 * @param id
		 * @param obj
		 */
		Stage.prototype.setCharacter = function(id, obj)
		{
			this.characters[id] = obj;
		};

		/**
		 * @param id
		 * @returns {*}
		 */
		Stage.prototype.getInstance = function(id)
		{
			return this.instances[id];
		};

		/**
		 * @param instance
		 */
		Stage.prototype.setInstance = function(instance)
		{
			this.instances[instance.instanceId] = instance;
		};

		/**
		 * @param instanceId
		 * @param depth
		 * @param frame
		 * @returns {*}
		 */
		Stage.prototype.getPlaceObject = function(instanceId, depth, frame)
		{
			let placeObjects = this.placeObjects;
			if (!(instanceId in placeObjects)) {
				return null;
			}
			let placeObject = placeObjects[instanceId];
			if (!(frame in placeObject)) {
				return null;
			}
			let tags = placeObject[frame];
			if (!(depth in tags)) {
				return null;
			}
			return tags[depth];
		};

		/**
		 * @param placeObject
		 * @param instanceId
		 * @param depth
		 * @param frame
		 */
		Stage.prototype.setPlaceObject = function(placeObject, instanceId, depth, frame)
		{
			let _this = this;
			let placeObjects = _this.placeObjects;
			if (!(instanceId in placeObjects)) {
				placeObjects[instanceId] = [];
			}
			if (!(frame in placeObjects[instanceId])) {
				placeObjects[instanceId][frame] = [];
			}
			placeObjects[instanceId][frame][depth] = placeObject;
		};

		/**
		 * @param instanceId
		 * @param depth
		 * @param frame
		 */
		Stage.prototype.copyPlaceObject = function(instanceId, depth, frame)
		{
			let _this = this;
			let placeObject = _this.getPlaceObject(instanceId, depth, frame - 1);
			_this.setPlaceObject(placeObject, instanceId, depth, frame);
		};

		/**
		 * @param instanceId
		 */
		Stage.prototype.removePlaceObject = function(instanceId)
		{
			delete this.placeObjects[instanceId];
			// delete this.instances[instanceId];
		};

		/**
		 * @returns {number}
		 */
		Stage.prototype.getFrameRate = function()
		{
			return this.frameRate;
		};

		/**
		 * @param fps
		 */
		Stage.prototype.setFrameRate = function(fps)
		{
			this.frameRate = (1000 / fps) | 0;
		};
		/**
		 * loadStatus CountUp
		 */
		Stage.prototype.checkLoadSounds = function() {
			let _this = this;
			if (this.sndUnloadCount > 0) {
				for (let i=0; i<this.sounds.length; i++ ) {
					let sound = this.sounds[i];
					if (!sound) continue;
					if (!sound.Loaded) {
						if (sound.Audio.loadState == "loaded") {
							sound.Loaded = true;
							this.sndUnloadCount--;
						}
					}
				}
			}
			if (this.sndUnloadCount > 0) {
				this.sndUnLoadRaf = requestAnimationFrame(function(timeStamp) {
					_this.checkLoadSounds();
				});
			}
		};

		/**
		 * loadStatus CountUp
		 */
		Stage.prototype.checkLoadSoundStreams = function() {
			let _this = this;
			if (this.sndStreamUnloadCount > 0) {
				for (let i=0; i<this.soundStreams.length; i++) {
					for (let f=0; f<this.soundStreams[i].FrameRanges.length; f++) {
						if (this.soundStreams[i].FrameRanges[f].Audio.loadState == "loaded") {
							this.soundStreams[i].FrameRanges[f].Loaded = true;
							this.sndStreamUnloadCount--;
						}
					}
				}
			}
			if (this.sndStreamUnloadCount > 0) {
				this.sndStreamUnLoadRaf = requestAnimationFrame(function(timeStamp) {
					_this.checkLoadSoundStreams();
				});
			}
		};

		/**
		 * Show debug
		 */
		Stage.prototype.showDebug = function()
		{
			let parent = _document.getElementsByTagName("body")[0];
			let div_debug = _document.createElement("div");
			let s = "";
			if (this.debug) {
				for (let i=0; i<this.debug_lines.length; i++) {
					s+=this.debug_lines[i]+"\n";
				}
			} else s="No debug info, reload with option debug: true";
			div_debug.innerHTML ='<pre style="opacity:1">'+s+'</pre>';
			let button = _document.createElement("button");
			button.innerHTML = 'Close';
			button.setAttribute('onclick', 'let s=document.getElementById("showDebug"); s.parentElement.removeChild(s);');
			div_debug.style = 'position: absolute; top: 20px; left: 20px; z-index: 256; background-color: #FFFFFF;';
			div_debug.id = 'showDebug';
			div_debug.prepend(button);
			parent.appendChild(div_debug);
		};

		/**
		 * Show info
		 */
		Stage.prototype.showInfo = function()
		{
			let div = _document.getElementById(this.getName());
			let parent = _document.getElementsByTagName('body')[0];
			let div_info = _document.createElement("div");
			div_info.innerHTML = '<table style="background: #FFFFFF;">\n' +
				'<tr><td>SWF-file</td><td>'+ this.url + '</td</tr>\n' +
				'<tr><td>Signature</td><td>'+ this.signature + '</td</tr>\n' +
				'<tr><td>Version</td><td>'+ this.version + '</td</tr>\n' +
				'<tr><td>Length</td><td>'+ this.fileSize + '</td</tr>\n' +
				'<tr><td>Framesize twips(x,y)</td><td>[' + this.bounds.xMin + '-' + this.bounds.xMax + ',' + this.bounds.yMin + '-' + this.bounds.yMax + ']</td</tr>\n' +
				'<tr><td>Framesize </td><td>[' + Math.ceil((this.bounds.xMax - this.bounds.xMin)/20) + '-' + Math.ceil((this.bounds.yMax - this.bounds.yMin)/20) + ']</td</tr>\n' +
				'<tr><td>div</td><td>['+  div.clientWidth + '-' + div.clientHeight  + ']</td</tr>\n' +
				'<tr><td>canvas</td><td>['+  this.canvas.width + '-' + this.canvas.height  + ']</td</tr>\n' +
				'<tr><td>Scale</td><td>'+ this.scale + '</td</tr>\n' +
				'<tr><td>Quality</td><td>'+ this.quality + '</td</tr>\n' +
				'<tr><td>Frames</td><td>'+ this.frameCount + '</td</tr>\n' +
				'<tr><td>FrameRate</td><td>'+ this.getFrameRate() + '</td</tr>\n' +
				'<tr><td>FramesPerSecond</td><td>'+ (1000 / this.getFrameRate()) + '</td</tr>\n' +
				'<tr><td>Duration</td><td>'+ (this.frameCount * this.getFrameRate() / 1000) + '</td</tr>\n' +
				'<tr><td>Images</td><td>'+ this.imageCount + '</td</tr>\n' +
				'<tr><td>Autoplay audio</td><td>'+ autoPlayAudioAllowed + '</td</tr>\n' +
				'<tr><td>SoundType</td><td>'+ this.soundUseType + '</td</tr>\n' +
				'<tr><td>Sounds</td><td>'+ this.soundCount + '</td</tr>\n' +
				'<tr><td>Soundstreams</td><td>'+ this.soundStreamCount + '</td</tr>\n' +
				'<tr><td>Autoplay video</td><td>'+ autoPlayVideoAllowed + '</td</tr>\n' +
				'<tr><td>Videos</td><td>'+ this.videoCount + '</td</tr>\n' +
				'<tr><td>AutoPlay</td><td>'+ this.autoPlayAllowed + '</td</tr>\n' +
				'<tr><td>Tag id</td><td>'+ this.tagId + '</td</tr>\n' +
				'<tr><td>Quality</td><td>'+ this.quality + '</td</tr>\n' +
				'<tr><td>Background color</td><td>'+ this.bgcolor + '</td</tr>\n' +
				'<tr><td>Flashvars</td><td>'+ JSON.stringify(this.FlashVars) + '</td</tr>\n' +
				'<tr><td>AutoStart</td><td>'+ this.autoStart + '</td</tr>\n' +
				'<tr><td>Load time</td><td>'+ (Math.ceil(this.progressSteps[this.progressStep][2] - this.progressSteps[0][1]) / 1000) + ' sec</td</tr>\n' +
				'<tr><td>Options</td><td style="white-space: pre-line;">'+JSON.stringify(this.options,null,'  ')+ '</td</tr>\n';
				if (this.ProductInfo) {
					div_info.innerHTML +=
					'<tr><td>ProductId</td><td>'+ this.ProductInfo.ProductId + '</td</tr>\n' +
					'<tr><td>Edition</td><td>'+ this.ProductInfo.Edition + '</td</tr>\n' +
					'<tr><td>MajorVersion</td><td>'+ this.ProductInfo.MajorVersion + '</td</tr>\n' +
					'<tr><td>MinorVersion</td><td>'+ this.ProductInfo.MinorVersion + '</td</tr>\n' +
					'<tr><td>BuildLow</td><td>'+ this.ProductInfo.BuildLow + '</td</tr>\n' +
					'<tr><td>BuildHigh</td><td>'+ this.ProductInfo.BuildHigh + '</td</tr>\n' +
					'<tr><td>CompilationDate</td><td>'+ this.ProductInfo.CompilationDate + '</td</tr>\n';
				}
				div_info.innerHTML += '</table>';
			div_info.style = 'position: absolute; top: 20px; left: 20px; z-index: 256;';
			div_info.id = 'showInfo_'+this.id;
			let button = _document.createElement("button");
			button.innerHTML = 'Close';
			button.setAttribute('onclick', 'let s=document.getElementById("showInfo_"+'+this.id+'); s.parentElement.removeChild(s);');
			div_info.prepend(button);
			parent.appendChild(div_info);
		};

		/**
		 * loadStatus CountUp
		 */
		Stage.prototype.loadEvent = function(ref)
		{
			let _this = this;
			switch (_this.loadStatus) {
				case 2:
					this.resize();
					this.addProgressStep("Prepare soundstreams");
					this.prepareSoundStreams();
					this.progressStepEnd(true);
					if (((this.soundCount == 0 && this.soundStreamCount == 0) || autoPlayAudioAllowed) && (this.videoCount == 0 || autoPlayVideoAllowed)) {
						this.autoPlayAllowed = true;
						this.autoPlayUnlocked = true;
						this.autoPlayAudioAllowed = autoPlayAudioAllowed;
						this.autoPlayVideoAllowed = autoPlayVideoAllowed;
					}
					//this.addProgressStep("Prepare images and audio");
					this.waitfor = "";
					if (this.soundCount) this.waitfor+=this.soundCount+" sounds";
					if (this.soundStreamCount) {
						if (this.waitfor=="") this.waitfor+=this.soundCount+" soundstreams";
						else this.waitfor+=", "+this.soundStreamCount+" soundtreams";
					}
					if (this.imageCount) {
						if (this.waitfor=="") this.waitfor+=this.imageCount+" images";
						else this.waitfor+=", "+this.imageCount+" images";
					}
					if (this.videoCount) {
						if (this.waitfor=="") this.waitfor+=this.videoCount+" videos";
						else this.waitfor+=", "+this.videoCount+" videos";
					}
					if (this.waitfor!="") this.addProgressStep("Waiting for load of "+this.waitfor);
					if (this.sndUnloadCount > 0) this.checkLoadSounds();
					if (this.sndStreamUnloadCount > 0) this.checkLoadSoundStreams();
					this.loadStatus++;
					break;
				case 3:
					if (!this.isLoad || !this.stopFlag || this.imgUnloadCount > 0 || this.sndUnloadCount > 0 || this.sndStreamUnloadCount > 0) {
						break;
					}
					if (this.waitfor!="") this.progressStepEnd(true);
					this.loadStatus++;
					this.addProgressStep("Load stage");
					this.loaded();
					this.progressStepEnd(true);
					this.addProgressStep("Prepare StartStopAnimation");
					this.prepareStartStopAnimation();
					this.progressStepEnd(true);
					this.showProgressTotalTime();
					let div = _document.getElementById(this.getName());
					console.log("SWF-file '" + this.url + "\n" +
						"Signature " + this.signature + "\n" +
						 "Version " + this.version + "\n" +
						"fileLength " + this.fileSize + "\n" +
						"frameSize twips(x,y) [" + this.bounds.xMin + "-" + this.bounds.xMax + "," +
						this.bounds.yMin + "-" + this.bounds.yMax + "] " + "\n" +
						"framesPerSecond " + (1000 / this.getFrameRate()) + " frameTime " + this.getFrameRate() + "\n" +
						"frameCount " + this.frameCount + "\n" +
						"duration " + this.frameCount * this.getFrameRate() / 1000 + "\n" +
						"SWF [" + (this.bounds.xMax-this.bounds.xMin)/20 + "-" + (this.bounds.yMax-this.bounds.yMin)/20 + "]" + "\n" +
						"div [" + div.clientWidth + "-" + div.clientHeight + "]" + "\n" +
						"canvas [" + this.canvas.width + "-" + this.canvas.height + "]" + "\n" +
						"scale " + this.scale + "\n" +
						"quality " + this.quality + " " + quality + "\n" +
						"devicePixelRatio " + devicePixelRatio + "\n" +
						"images " + this.imageCount + "\n" +
						"autoplay video " + autoPlayVideoAllowed + "\n" +
						"videos " + this.videoCount + "\n" +
						"autoplay audio " + autoPlayAudioAllowed + "\n" +
						"soundtype " + this.soundUseType + "\n" +
						"sounds " + this.soundCount + "\n" +
						"soundstreams " + this.soundStreamCount
					);
					if (this.options) console.log('Options: '+JSON.stringify(this.options,null,'  '));
					else console.log('Options: none');
					if (this.autoPlayAllowed && this.autoStart) {
						if (this.otherSoundCount > 0) this.autoPlayUnlocked = false;
						else this.play();
					}
					break;
			}
			if (this.loadStatus !== 4) {
				setTimeout(function() {
					_this.loadEvent();
				}, 0);
			}
		};

		/**
		 * @param data
		 * @param url
		 */
		Stage.prototype.parse = function(data, url)
		{
			let _this = this;
			_this.isLoad = false;
			let bitio = new BitIO();
			let swftag = new SwfTag(_this, bitio);

			if (isXHR2) {
				bitio.setData(new Uint8Array(data));
			} else {
				bitio.init(data);
			}

			if (_this.setSwfHeader(bitio, swftag)) {
				let mc = _this.getParent();
				mc._url = location.href;

				// parse
				let tags = swftag.parse(mc);

				// mc reset
				mc.container = [];
				let frame = 1;
				let totalFrames = mc.getTotalFrames() + 1;
				while (frame < totalFrames) {
					mc.container[frame++] = [];
				}
				mc.instances = [];

				// build
				swftag.build(tags, mc);

				let query = url.split("?")[1];
				if (query) {
					let values = query.split("&");
					let length = values.length;
					while (length--) {
						let value = values[length];
						let pair = value.split("=");
						if (pair.length > 1) {
							mc.setVariable(pair[0], pair[1]);
						}
					}
				}

				// FlashVars
				let vars = _this.FlashVars;
				for (let key in vars) {
					if (!vars.hasOwnProperty(key)) {
						continue;
					}
					mc.setVariable(key, vars[key]);
				}
			}

			_this.isLoad = true;
		};

		/**
		 * @param bitio
		 * @param swftag
		 * @returns {boolean}
		 */
		Stage.prototype.setSwfHeader = function(bitio, swftag)
		{
			let _this = this;

			let data = bitio.data;
			if (data[0] === 0xff && data[1] === 0xd8) {
				_this.parseJPEG(data, swftag);
				return false;
			}

			// signature
			let signature = bitio.getHeaderSignature();
			_this.setSignature(signature);
			if (_this.debug) _this.debug_lines.push('[HEADER]        File signature: '+signature);

			// version
			let version = bitio.getVersion();
			_this.setVersion(version);
			if (_this.debug) _this.debug_lines.push('[HEADER]        File version: '+version);

			// file size
			let fileLength = bitio.getUI32();
			_this.fileSize = fileLength;
			if (_this.debug) _this.debug_lines.push('[HEADER]        File size: '+fileLength);

			switch (signature) {
				case "FWS": // No ZIP
					break;
				case "CWS": // ZLIB
					bitio.deCompress(fileLength, "ZLIB");
					break;
				case "ZWS": // TODO
					window.alert("LZMA compression not supported");
					return false;
				case "ZWS": // TODO
					window.alert("LZMA compression Flash not supported");
					return false;
				case "GFX": // TODO
					window.alert("Uncompressed ScaleForm GFx not supported");
					return false;
				case "CFX": // TODO
					window.alert("Compressed ScaleForm GFx not supported");
					return false;
				case "ABC": // TODO
					window.alert("Non-standard LZMA compression Flash not supported");
					return false;
				case "fWS": // TODO
					window.alert("Harman encrypted uncompressed Flash not supported");
					return false;
				case "cWS": // TODO
					window.alert("HHarman encrypted ZLib compressed Flash not supported");
					return false;
				case "zWS": // TODO
					window.alert("Harman encrypted LZMA compressed Flash not supported");
					return false;
				default:
					window.alert("Signature "+signature+" not supported");
					return false;
			}
			// frameSize RECT
			let bounds = swftag.rect();
			_this.bounds = bounds;
			let frameRate = bitio.getUI16() / 0x100;
			if (_this.debug) _this.debug_lines.push('[HEADER]        Frame rate: '+frameRate);
			let frameCount = bitio.getUI16(); // frameCount
			if (_this.debug) _this.debug_lines.push('[HEADER]        Frame count: '+frameCount);
			this.setFrameCount(frameCount);

			_this.setBaseWidth(_ceil((bounds.xMax - bounds.xMin) / 20));
			_this.setBaseHeight(_ceil((bounds.yMax - bounds.yMin) / 20));
			if (_this.debug) _this.debug_lines.push('[HEADER]        Movie width: '+_this.getBaseWidth());
			if (_this.debug) _this.debug_lines.push('[HEADER]        Movie height: '+_this.getBaseHeight());
			_this.setFrameRate(frameRate);

			_this.loadStatus++;

			return true;
		};

		/**
		 * @param data
		 * @param swftag
		 */
		Stage.prototype.parseJPEG = function(data, swftag)
		{
			let _this = this;
			let image = _document.createElement("img");
			image.addEventListener("load", function() {
				let width = this.width;
				let height = this.height;

				let canvas = cacheStore.getCanvas();
				canvas.width = width;
				canvas.height = height;
				let imageContext = canvas.getContext("2d");
				imageContext.drawImage(this, 0, 0, width, height);
				_this.setCharacter(1, imageContext);

				let shapeWidth = width * 20;
				let shapeHeight = height * 20;

				_this.setBaseWidth(width);
				_this.setBaseHeight(height);

				let shape = {
					ShapeRecords: [{
							FillStyle1: 1,
							StateFillStyle0: 0,
							StateFillStyle1: 1,
							StateLineStyle: 0,
							StateMoveTo: 0,
							StateNewStyles: 0,
							isChange: true
						},
						{
							AnchorX: shapeWidth,
							AnchorY: 0,
							ControlX: 0,
							ControlY: 0,
							isChange: false,
							isCurved: false
						},
						{
							AnchorX: shapeWidth,
							AnchorY: shapeHeight,
							ControlX: 0,
							ControlY: 0,
							isChange: false,
							isCurved: false
						},
						{
							AnchorX: 0,
							AnchorY: shapeHeight,
							ControlX: 0,
							ControlY: 0,
							isChange: false,
							isCurved: false
						},
						{
							AnchorX: 0,
							AnchorY: 0,
							ControlX: 0,
							ControlY: 0,
							isChange: false,
							isCurved: false
						},
						0
					],
					fillStyles: {
						fillStyleCount: 1,
						fillStyles: [{
							bitmapId: 1,
							bitmapMatrix: [20, 0, 0, 20, 0, 0],
							fillStyleType: 65
						}]
					},
					lineStyles: {
						lineStyleCount: 0,
						lineStyles: []
					}
				};

				let bounds = {
					xMin: 0,
					xMax: shapeWidth,
					yMin: 0,
					yMax: shapeHeight
				};
				let data = vtc.convert(shape);

				_this.setCharacter(2, {
					tagType: 22,
					data: data,
					bounds: bounds
				});

				let parent = _this.getParent();
				let obj = new Shape();
				obj.setParent(parent);
				obj.setStage(_this);
				obj.setData(data);
				obj.setTagType(22);
				obj.setCharacterId(2);
				obj.setBounds(bounds);
				obj.setLevel(1);

				parent.container[1] = [];
				parent.container[1][1] = obj.instanceId;

				let placeObject = new PlaceObject();
				_this.setPlaceObject(placeObject, obj.instanceId, 1, 1);

				_this.init();
			});


			let length = data.length;
			let src = "";
			for (let i = 0; i < length; i++) {
				src += _fromCharCode(data[i]);
			}

			let jpegData = swftag.parseJpegData(data);
			image.src = "data:image/jpeg;base64," + swftag.base64encode(jpegData);

		};

		/**
		 * resize
		 */
		Stage.prototype.resize = function()
		{
			let _this = this;
			let div = _document.getElementById(_this.getName());
			if (!div) {
				return 0;
			}

			let oWidth = _this.optionWidth;
			let oHeight = _this.optionHeight;

			let element = _document.documentElement;
			let innerWidth = _max(element.clientWidth, window.innerWidth || 0);
			let innerHeight = _max(element.clientHeight, window.innerHeight || 0);

			let parent = div.parentNode;
			if (parent.tagName !== "BODY") {
				innerWidth = parent.offsetWidth;
				innerHeight = parent.offsetHeight;
			}
			let screenWidth = (oWidth > 0) ? oWidth : innerWidth;
			let screenHeight = (oHeight > 0) ? oHeight : innerHeight;

			let baseWidth = _this.getBaseWidth();
			let baseHeight = _this.getBaseHeight();
			let scale = _min((screenWidth / baseWidth), (screenHeight / baseHeight));
			if (_this.noScaling) scale = 1;
			let width = baseWidth * scale;
			let height = baseHeight * scale;

			if (width !== _this.getWidth() || height !== _this.getHeight()) {
				// div
				let style = div.style;
				style.width = width + "px";
				style.height = height + "px";
				style.top = "0px";
				style.left = ((screenWidth / 2) - (width / 2)) + "px";

				width *= devicePixelRatio;
				height *= devicePixelRatio;

				_this.setScale(scale);
				_this.setWidth(width);
				_this.setHeight(height);

				// main
				let canvas = _this.context.canvas;
				canvas.width = width;
				canvas.height = height;

				// pre
				let preCanvas = _this.preContext.canvas;
				preCanvas.width = width;
				preCanvas.height = height;

				let hitCanvas = _this.hitContext.canvas;
				hitCanvas.width = width;
				hitCanvas.height = height;

				// tmp
				if (isAndroid && isChrome) {
					let tmpCanvas = tmpContext.canvas;
					tmpCanvas.width = width;
					tmpCanvas.height = height;
				}

				let mc = _this.getParent();
				let mScale = scale * _devicePixelRatio / 20;
				_this.setMatrix(mc.cloneArray([mScale, 0, 0, mScale, 0, 0]));
			}
		};
		/**
		 * clear eventhandlers, canvas and div
		 */
		Stage.prototype.clear = function()
		{
			let _this = this;

			_this.stop();

			window.removeEventListener("keydown", keyDownAction);
			window.removeEventListener("keyup", keyUpAction);
			window.removeEventListener("keyup", function (event)
			{
				_keyEvent = event;
				_this.touchEnd(event);
			});
			//document.onkeydown = null;
			//document.onkeyup = null;

			_this.canvas.removeEventListener("mousedown", function(event) {
				_event = event;
				_isTouchEvent = false;
				if (event.button == 0) _this.touchStart(event);
			});

			_this.canvas.removeEventListener("mousemove", function(event) {
				_event = event;
				_isTouchEvent = false;
				_this.touchMove(event);
			});

			_this.canvas.removeEventListener("mouseup", function(event) {
				_event = event;
				_isTouchEvent = false;
				if (event.button == 0) _this.touchEnd(event);
			});

			_this.canvas.removeEventListener("touchstart", function(event) {
				_event = event;
				_isTouchEvent = true;
				_this.touchStart(event);
			});

			_this.canvas.removeEventListener("touchmove", function(event) {
				_event = event;
				_isTouchEvent = true;
				_this.touchMove(event);
			});

			_this.canvas.removeEventListener("touchend", function(event) {
				_event = event;
				_isTouchEvent = true;
				_this.touchEnd(event);
			});

			_this.canvas.removeEventListener("touchcancel", function(event) {
				_event = event;
				_isTouchEvent = true;
				//_this.touchEnd(event);
			});

			let div = _this.canvas.parentNode;
			div.removeChild(_this.canvas);
			div.parentNode.removeChild(div);
			_this = null;

		};

		/**
		 * loaded
		 */
		Stage.prototype.loaded = function()
		{
			// reset
			let _this = this;
			_this.buttonHits = [];
			_this.downEventHits = [];
			_this.moveEventHits = [];
			_this.upEventHits = [];
			_this.keyDownEventHits = [];
			_this.keyUpEventHits = [];
			_this.actions = [];

			// DOM
			_this.deleteNode();
			let div = _document.getElementById(_this.getName());
			if (div) {
				let mc = _this.getParent();
				mc.initFrame();
				mc.addActions(_this);
				_this.executeAction();

				// callback
				let callback = _this.callback;
				if (typeof callback === "function") {
					callback.call(window, mc);
				}

				_this.render();
				_this.renderMain();

				let ctx = _this.context;
				let canvas = ctx.canvas;

				canvas.addEventListener("mousedown", function(event) {
					_event = event;
					_isTouchEvent = false;
					if (event.button == 0) _this.touchStart(event);
				});

				canvas.addEventListener("mousemove", function(event) {
					_event = event;
					_isTouchEvent = false;
					_this.touchMove(event);
				});

				canvas.addEventListener("mouseup", function(event) {
					_event = event;
					_isTouchEvent = false;
					if (event.button == 0) _this.touchEnd(event);
				});

				canvas.addEventListener("touchstart", function(event) {
					_event = event;
					_isTouchEvent = true;
					_this.touchStart(event);
				});

				canvas.addEventListener("touchmove", function(event) {
					_event = event;
					_isTouchEvent = true;
					_this.touchMove(event);
				});

				canvas.addEventListener("touchend", function(event) {
					_event = event;
					_isTouchEvent = true;
					_this.touchEnd(event);
				});

				canvas.addEventListener("touchcancel", function(event) {
					_event = event;
					_isTouchEvent = true;
					//_this.touchEnd(event);
				});

				div.appendChild(canvas);
			}
		};

		/**
		 * deleteNode
		 */
		Stage.prototype.deleteNode = function(tagId)
		{
			let div = _document.getElementById(tagId ? tagId : this.getName());
			if (div) {
				let childNodes = div.childNodes;
				let length = childNodes.length;
				if (length) {
					while (length--) {
						div.removeChild(childNodes[length]);
					}
				}
			}
		};

		/**
		 * nextFrame
		 */
		Stage.prototype.nextFrame = function()
		{
			let _this = this;

			_this.downEventHits = [];
			_this.moveEventHits = [];
			_this.upEventHits = [];
			_this.keyDownEventHits = [];
			_this.keyUpEventHits = [];

			// mouse event
			let parent = _this.getParent();
			let mouse = _this.mouse;
			let mouseEvents = mouse.events;
			let onMouseDown = mouseEvents.onMouseDown;
			if (onMouseDown) {
				_this.downEventHits[_this.downEventHits.length] = {as: onMouseDown, mc: parent};
			}
			let onMouseMove = mouseEvents.onMouseMove;
			if (onMouseMove) {
				_this.moveEventHits[_this.moveEventHits.length] = {as: onMouseMove, mc: parent};
			}
			let onMouseUp = mouseEvents.onMouseUp;
			if (onMouseUp) {
				_this.upEventHits[_this.upEventHits.length] = {as: onMouseUp, mc: parent};
			}

			_this.putFrame();

			_this.addActions();
			_this.executeAction();
			_this.render();
			_this.renderMain();
			_this.getParent()._previousframe = _this.getParent()._currentframe;
		};

		/**
		 * putFrame
		 */
		Stage.prototype.putFrame = function()
		{
			let _this = this;
			_this.newTags = [];
			let doneTags = _this.doneTags;
			let length = doneTags.length;
			if (length) {
				clipEvent.type = "enterFrame";
				let i = 0;
				while (i < length) {
					let tag = doneTags[i];
					tag.putFrame(_this, clipEvent);
					i++;
				}
			}
		};

		/**
		 * addActions
		 */
		Stage.prototype.addActions = function()
		{
			let _this = this;
			let newTags = _this.newTags;
			let length = newTags.length;
			if (length) {
				let i = 0;
				while (i < length) {
					let tag = newTags[i];
					tag.addActions(_this);
					i++;
				}
			}
		};

		/**
		 * render
		 */
		Stage.prototype.render = function()
		{
			let _this = this;
			_this.buttonHits = [];
			_this.doneTags = [];

			let ctx = _this.preContext;
			ctx.globalCompositeOperation = "source-over";
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			let backgroundColor = _this.getBackgroundColor();
			if (!backgroundColor || backgroundColor === "transparent") {
				// pre clear
				let canvas = ctx.canvas;
				ctx.clearRect(0, 0, canvas.width + 1, canvas.height + 1);
				// main clear
				let mainCtx = _this.context;
				mainCtx.clearRect(0, 0, canvas.width + 1, canvas.height + 1);
			} else {
				ctx.fillStyle = backgroundColor;
				ctx.fillRect(0, 0, _this.getWidth() + 1, _this.getHeight() + 1);
			}

			let mc = _this.getParent();
			mc.render(ctx, _this._matrix, _this._colorTransform, _this, true);
		};

		/**
		 * executeAction
		 */
		Stage.prototype.executeAction = function()
		{
			let _this = this;
			if (_this.isAction && _this.actions.length) {
				_this.isAction = false;
				let i = 0;
				while (i < _this.actions.length) {
					let obj = _this.actions[i];
					i++;
					let mc = obj.mc;
					let args = obj.args || [];
					if (!mc.active) {
						continue;
					}

					let actions = obj.as;
					if (typeof actions === "function") {
						actions.apply(mc, args);
					} else {
						let length = actions.length;
						if (!length) {
							continue;
						}
						let idx = 0;
						while (idx < length) {
							if (!(idx in actions)) {
								continue;
							}
							let action = actions[idx];
							if (typeof action === "function") {
								action.apply(mc, args);
							}
							idx++;
						}
					}
				}
			}
			_this.actions = [];
			_this.isAction = true;
		};

		/**
		 * @param mc
		 * @param as
		 */
		Stage.prototype.buttonAction = function(mc, as)
		{
			let _this = this;
			_this.downEventHits = [];
			_this.moveEventHits = [];
			_this.upEventHits = [];
			_this.keyDownEventHits = [];
			_this.keyUpEventHits = [];
			as.execute(mc);
			_this.executeAction();
		};

		/*
		 * main canvas
		 */
		Stage.prototype.renderMain = function()
		{
			let _this = this;
			let preContext = _this.preContext;
			let preCanvas = preContext.canvas;
			let width = preCanvas.width;
			let height = preCanvas.height;
			if (width > 0 && height > 0) {
				let ctx = _this.context;
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.drawImage(preCanvas, 0, 0, width, height);
			}
		};

		/**
		 * reset
		 */
		Stage.prototype.reset = function()
		{
			let _this = this;
			_this.instanceId = 0;
			let mc = new MovieClip();
			mc.reset();
			mc.setStage(_this);
			_this.parent = mc;
			_this.characters = [];
			_this.instances = [];
			_this.buttonHits = [];
			_this.downEventHits = [];
			_this.moveEventHits = [];
			_this.upEventHits = [];
			_this.keyDownEventHits = [];
			_this.keyUpEventHits = [];
			_this.sounds = [];
			_this.actions = [];

			_this.soundStreamIsPlaying = false;
			_this.soundStreamPlaying = -1;
			_this.lastAudioCurrentTime = -1;

			for (let i=0; i<_this.sounds.lenght; i++) {
				if (_this.sounds[i]) _this.sounds[i].Paused = null;
			}
		};

		/**
		 * init
		 */
		Stage.prototype.init = function()
		{
			let _this = this;
			let tagId = _this.tagId;
			let div;

			if (_this.getId() in stages) {
				if (tagId) {
					if (_document.readyState === "loading") {
						let reTry = function ()
						{
							window.removeEventListener("DOMContentLoaded", reTry);
							_this.init();
						};
						window.addEventListener("DOMContentLoaded", reTry);
						return 0;
					}

					let container = _document.getElementById(tagId);
					if (!container) {
						window.alert("Not Found Tag ID:" + tagId);
						return 0;
					}

					div = _document.getElementById(_this.getName());
					if (div) {
						_this.deleteNode();
					} else {
						div = _document.createElement("div");
						div.id = _this.getName();
						container.appendChild(div);
					}
				} else {
					_document.body.insertAdjacentHTML("beforeend", "<div id='" + _this.getName() + "'></div>");
				}
			}

			div = _document.getElementById(_this.getName());
			if (div) {
				_this.initStyle(div);
				_this.loading();
			}

			if (!_this.canvas) {
				_this.initCanvas();
			}
			_this.loadStatus++;
			_this.loadEvent();
		};

		/**
		 * @param div
		 */
		Stage.prototype.initStyle = function(div)
		{
			let style;
			let _this = this;

			style = div.style;
			style.position = "relative";
			style.top = "0";
			style.left = "0";
			style.backgroundColor = "transparent";
			style.overflow = "hidden";
			style["-webkit-backface-visibility"] = "hidden";

			let parent = div.parentNode;
			let oWidth = _this.optionWidth;
			let oHeight = _this.optionHeight;
			let width;
			let height;
			if (parent.tagName === "BODY") {
				width = (oWidth > 0) ? oWidth : window.innerWidth;
				height = (oHeight > 0) ? oHeight : window.innerHeight;
			} else {
				width = (oWidth > 0) ? oWidth : parent.offsetWidth;
				height = (oHeight > 0) ? oHeight : parent.offsetHeight;
			}

			style.width = width + "px";
			style.height = height + "px";
			style['-webkit-user-select'] = "none";
		};

		/**
		 * init canvas
		 */
		Stage.prototype.initCanvas = function()
		{
			let _this = this;
			let style;
			let canvas = _document.createElement("canvas");
			canvas.width = 1;
			canvas.height = 1;

			style = canvas.style;
			style.zIndex = 0;
			style.position = "absolute";
			style.top = 0;
			style.left = 0;
			style["transform-origin"] = "0px 0px";
			style.transform = "scale(" + 1 / _devicePixelRatio + ")";

			if (isAndroid) {
				canvas.addEventListener("touchcancel", function ()
				{
					_this.touchEnd(_event);
				});
			}

			window.addEventListener("keydown", keyDownAction);
			window.addEventListener("keyup", keyUpAction);
			window.addEventListener("keyup", function (event)
			{
				_keyEvent = event;
				_this.touchEnd(event);
			});

			_this.context = canvas.getContext("2d");
			_this.canvas = canvas;

			let preCanvas = _document.createElement("canvas");
			preCanvas.width = 1;
			preCanvas.height = 1;
			_this.preContext = preCanvas.getContext("2d");

			let hitCanvas = _document.createElement("canvas");
			hitCanvas.width = 1;
			hitCanvas.height = 1;
			_this.hitContext = hitCanvas.getContext("2d");
		};

		/**
		 * loading
		 */
		Stage.prototype.loading = function()
		{
			let _this = this;
			let div = _document.getElementById(_this.getName());
			let loadingId = _this.getName() + "_loading";
			let css = "<style>";
			css += "#" + loadingId + " {\n";
			// css += "z-index: 999;\n";
			css += "position: absolute;\n";
			css += "top: 50%;\n";
			css += "left: 50%;\n";
			css += "margin: -24px 0 0 -24px;\n";
			css += "width: 50px;\n";
			css += "height: 50px;\n";
			css += "border-radius: 50px;\n";
			css += "border: 8px solid #dcdcdc;\n";
			css += "border-right-color: transparent;\n";
			css += "box-sizing: border-box;\n";
			css += "-webkit-animation: " + loadingId + " 0.8s infinite linear;\n";
			css += "animation: " + loadingId + " 0.8s infinite linear;\n";
			css += "} \n";
			css += "@-webkit-keyframes " + loadingId + " {\n";
			css += "0% {-webkit-transform: rotate(0deg);}\n";
			css += "100% {-webkit-transform: rotate(360deg);}\n";
			css += "} \n";
			css += "@keyframes " + loadingId + " {\n";
			css += "0% {transform: rotate(0deg);}\n";
			css += "100% {transform: rotate(360deg);}\n";
			css += "} \n";
			css += "</style>";
			div.innerHTML = css;
			let loadingDiv = _document.createElement("div");
			loadingDiv.id = loadingId;
			div.appendChild(loadingDiv);
		};

		/**
		 * @param url
		 * @param options
		 */
		Stage.prototype.reload = function(url, options)
		{
			let _this = this;

			_this.soundStreamIsPlaying = false;
			_this.soundStreamPlaying = -1;

			_this.stop();

			if (_this.loadStatus === 4) {
				_this.deleteNode();
			}

			_this.loadStatus = 0;
			_this.isLoad = false;
			_this.reset();

			let swf2js = window.swf2js;
			return swf2js.load(url, {
				optionWidth: options.optionWidth || _this.optionWidth,
				optionHeight: options.optionHeight || _this.optionHeight,
				callback: options.callback || _this.callback,
				tagId: options.tagId || _this.tagId,
				FlashVars: options.FlashVars || _this.FlashVars,
				quality: options.quality || _this.quality,
				bgcolor: options.bgcolor || _this.bgcolor,
				stage: _this
			});
		};

		/**
		 * @param url
		 * @param frame
		 * @param width
		 * @param height
		 * @returns {*}
		 */
		Stage.prototype.output = function(url, frame, width, height)
		{
			let _this = this;
			if (!_this.isLoad || _this.stopFlag) {
				setTimeout(function() {
					_this.output(url, frame, width, height);
				}, 500);
				return 0;
			}

			_this.stop();
			frame = frame || 1;
			width = width || _this.getWidth();
			height = height || _this.getHeight();

			// resize
			let mc = _this.getParent();
			mc.reset();
			mc.gotoAndStop(frame);
			if (width !== _this.getWidth() || height !== _this.getHeight()) {
				_this.optionWidth = width;
				_this.optionHeight = height;
				_this.resize();
			}

			// action
			mc.addActions();

			// backgroundColor
			let canvas = _this.preContext.canvas;
			let style = canvas.style;
			style.backgroundColor = _this.backgroundColor;

			// render
			_this.render();

			// output
			let xmlHttpRequest = new XMLHttpRequest();
			xmlHttpRequest.open("POST", url, true);
			xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xmlHttpRequest.onreadystatechange = function() {
				let readyState = xmlHttpRequest.readyState;
				if (readyState === 4) {
					let status = xmlHttpRequest.status;
					switch (status) {
						case 200:
						case 304:
							console.log("OUTPUT SUCCESS");
							break;
						default:
							window.alert('Stage.prototype.output url ' + url + ' status ' + status + ' xmlHttpRequest.statusText ' + xmlHttpRequest.statusText);
							break;
					}
				}
			};
			let base64 = canvas.toDataURL();
			xmlHttpRequest.send("data=" + encodeURIComponent(base64));
		};

		/**
		 * @param event
		 */
		Stage.prototype.hitCheck = function(event)
		{
			let _this = this;
			_this.isHit = false;
			let buttonHits = _this.buttonHits;
			let length = buttonHits.length;
			if (!length) {
				return 0;
			}

			let div = _document.getElementById(_this.getName());
			if (!div) {
				return;
			}
			let bounds = div.getBoundingClientRect();
			let x = window.pageXOffset + bounds.left;
			let y = window.pageYOffset + bounds.top;
			let touchX = 0;
			let touchY = 0;

			if (_isTouchEvent) {
				let changedTouche = event.changedTouches[0];
				touchX = changedTouche.pageX;
				touchY = changedTouche.pageY;
			} else {
				touchX = event.pageX;
				touchY = event.pageY;
			}

			touchX -= x;
			touchY -= y;
			let scale = _this.getScale();

			touchX /= scale;
			touchY /= scale;

			let ctx = _this.hitContext;
			let hitCanvas = ctx.canvas;
			let hitWidth = hitCanvas.width;
			let hitHeight = hitCanvas.height;
			let chkX = touchX * scale * _devicePixelRatio;
			let chkY = touchY * scale * _devicePixelRatio;

			if (_this.abcFlag) {
				let parent = _this.getParent();
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.clearRect(0, 0, hitWidth, hitHeight);
				let ret = parent.hitCheck(ctx, [1, 0, 0, 1, 0, 0], _this, chkX, chkY);
				return (typeof ret === "object") ? ret : false;
			}

			for (let i = length; i--;) {
				if (!(i in buttonHits)) {
					continue;
				}

				let hitObj = buttonHits[i];
				if (hitObj === undefined) {
					continue;
				}

				let hit = false;
				if (touchX >= hitObj.xMin && touchX <= hitObj.xMax &&
					touchY >= hitObj.yMin && touchY <= hitObj.yMax
				) {
					let matrix = hitObj.matrix;
					if (matrix) {
						let mc = hitObj.parent;
						let button = hitObj.button;

						ctx.setTransform(1, 0, 0, 1, 0, 0);
						ctx.clearRect(0, 0, hitWidth, hitHeight);
						if (button) {
							hit = button.renderHitTest(ctx, matrix, _this, chkX, chkY);
						} else {
							hit = mc.renderHitTest(ctx, matrix, _this, chkX, chkY);
						}
					} else {
						hit = true;
					}
				}

				if (hit) {
					event.preventDefault();
					_this.isHit = true;
					return hitObj;
				}
			}

			return 0;
		};

		/**
		 * @param actions
		 * @param caller
		 * @param event
		 */
		Stage.prototype.executeEventAction = function(actions, caller, event)
		{
			let args = event || [];
			if (actions) {
				if (typeof actions === "function") {
					actions.apply(caller, args);
				} else {
					let length = actions.length;
					if (length) {
						let i = 0;
						while (i < length) {
							let action = actions[i];
							if (typeof action === "function") {
								action.apply(caller, args);
							}
							i++;
						}
					}
				}
				this.executeAction();
			}
		};

		/**
		 * @param event
		 */
		Stage.prototype.touchStart = function(event)
		{
			let _this = this;
			if (_this.touchStatus === "up") {
				_this.touchStatus = "down";
				_this.isHit = false;
				_this.gotTouchEvent = true;
				_this.touchEndAction = null;
				let downEventHits = _this.downEventHits;
				let length = downEventHits.length;
				let mc, as;
				if (length) {
					event.preventDefault();
					for (let i = 0; i < length; i++) {
						let obj = downEventHits[i];
						mc = obj.mc;
						as = obj.as;
						if (!as) {
							as = mc.variables.onMouseDown;
						}
						_this.executeEventAction(as, obj.mc);
					}
					_this.downEventHits = [];
				}

				let hitObj = _this.hitCheck(event);
				if (_this.isHit) {
					mc = hitObj.parent;
					if (mc.active) {
						mc.setButtonStatus("down");
						if (mc instanceof TextField) {
							_this.appendTextArea(mc, hitObj);
						} else {
							_this.executePress(mc, hitObj);
						}
					}
					if (_this.touchObj === null) {
						_this.touchObj = hitObj;
					}
				}
			}
		};

		/**
		 * @param mc
		 * @param hitObj
		 */
		Stage.prototype.executePress = function(mc, hitObj)
		{
			let _this = this;
			let isRender = false;
			let events;
			let press;
			let onPress;
			let rollOver;
			let onRollOver;
			let cEvent = new ClipEvent();

			events = mc.events;
			if (_isTouchEvent) {
				rollOver = events.rollOver;
				if (rollOver) {
					cEvent.type = "rollOver";
					cEvent.target = mc;
					_this.executeEventAction(rollOver, mc, [cEvent]);
					isRender = true;
				}

				onRollOver = mc.variables.onRollOver;
				if (typeof onRollOver === "function") {
					_this.executeEventAction(onRollOver, mc);
					isRender = true;
				}
			}

			events = mc.events;
			press = events.press;
			if (press) {
				cEvent.type = "press";
				cEvent.target = mc;
				_this.executeEventAction(press, mc, [cEvent]);
				isRender = true;
			}
			onPress = mc.variables.onPress;
			if (typeof onPress === "function") {
				_this.executeEventAction(onPress, mc);
				isRender = true;
			}

			let button = hitObj.button;
			if (button) {
				events = button.events;

				if (_isTouchEvent) {
					rollOver = events.rollOver;
					if (rollOver) {
						cEvent.type = "rollOver";
						cEvent.target = button;
						_this.executeEventAction(rollOver, button, [cEvent]);
					}

					onRollOver = button.variables.onRollOver;
					if (typeof onRollOver === "function") {
						_this.executeEventAction(onRollOver, button);
					}
				}

				button.setButtonStatus("down");
				if (_isTouchEvent) {
					_this.executeButtonAction(button, mc, "CondIdleToOverUp");
				}

				let actions = button.getActions();
				let length = actions.length;
				if (length) {
					let touchObj = _this.touchObj;
					for (let idx = 0; idx < length; idx++) {
						if (!(idx in actions)) {
							continue;
						}

						let cond = actions[idx];
						if (cond.CondOverDownToOverUp && touchObj === null) {
							_this.touchEndAction = cond.ActionScript;
							continue;
						}

						// enter
						let keyPress = cond.CondKeyPress;
						if (hitObj.CondKeyPress === 13 && hitObj.CondKeyPress !== keyPress) {
							continue;
						}

						if (_isTouchEvent) {
							if (keyPress === 13 ||
								(keyPress >= 48 && keyPress <= 57) ||
								cond.CondOverUpToOverDown
							) {
								_this.buttonAction(mc, cond.ActionScript);
							}
						} else {
							if (cond.CondOverUpToOverDown) {
								_this.buttonAction(mc, cond.ActionScript);
							}
						}
					}
				}

				press = events.press;
				if (press) {
					cEvent.type = "press";
					cEvent.target = button;
					_this.executeEventAction(press, button, [cEvent]);
				}

				onPress = button.variables.onPress;
				if (typeof onPress === "function") {
					_this.executeEventAction(onPress, button);
				}

				button.addActions(_this);
				_this.executeAction();

				if (button._downState) {
					let sprite = button.getSprite("down");
					sprite.startSound(); // button OverUpToOverDown, Press, down
				}

				isRender = true;
			}

			if (isRender) {
				_this.touchRender();
			}

		};

		/**
		 * @param textField
		 * @param hitObj
		 */
		Stage.prototype.appendTextArea = function(textField, hitObj)
		{
			let _this = this;
			textField.inputActive = true;
			let element = _document.getElementById(textField.getTagName());
			if (!element) {
				element = textField.input;
				let variable = textField.getProperty("variable");
				let text;
				if (variable) {
					let mc = textField.getParent();
					text = mc.getProperty(variable);
					if (text === undefined) {
						text = textField.getVariable("text");
					}
				}
				if (text !== undefined) {
					element.value = text;
				}

				let maxLength = textField.getVariable("maxChars");
				if (maxLength) {
					element.maxLength = maxLength;
				}
				let border = textField.getVariable("border");
				if (border) {
					element.style.border = "1px solid black";
					let color = textField.getVariable("backgroundColor");
					element.style.backgroundColor = "rgba(" + color.R + "," + color.G + "," + color.B + "," + color.A + ")";
				}

				let scale = _this.getScale();
				let left = hitObj.xMin;
				let top = hitObj.yMin;
				let width = hitObj.xMax - left;
				let height = hitObj.yMax - top;
				element.style.left = _ceil((left + 4) * scale) + "px";
				element.style.top = _ceil((top) * scale) + "px";
				element.style.width = _ceil((width + 6) * scale) + "px";
				element.style.height = _ceil((height + 6) * scale) + "px";
				element.style.outline = "none";
				element.style["::selection"] = "invert(100%)";

				element.style.cursor = "text";
				let div = _document.getElementById(_this.getName());
				if (div) {
					div.appendChild(element);
					element.focus();
					let focus = function(el) {
						return function() {
							el.focus();
						};
					};
					setTimeout(focus(element), 10);
				}
			}
		};

		/**
		 * @param event
		 */
		Stage.prototype.touchMove = function(event)
		{
			let _this = this;
			let overObj = _this.overObj;
			let moveEventHits = _this.moveEventHits;
			let length = moveEventHits.length;
			let mc, as, button, events;
			let dragOver, onDragOver, dragOut, onDragOut, rollOver, onRollOver, rollOut, onRollOut;
			let cEvent = new ClipEvent();
			let sprite;

			if (length) {
				event.preventDefault();
				for (let i = 0; i < length; i++) {
					let obj = moveEventHits[i];
					mc = obj.mc;
					as = obj.as;
					if (!as) {
						as = mc.variables.onMouseMove;
					}
					_this.executeEventAction(as, mc);
				}
				_this.moveEventHits = [];
			}

			if (!_isTouchEvent || (_isTouchEvent && _this.gotTouchEvent)) {
				let hitObj = null;
				let touchObj = _this.touchObj;
				if (touchObj || _this.touchStatus === "up") {
					hitObj = _this.hitCheck(event);
				}

				let isRender = false;
				if (!_isTouchEvent) {
					let canvas = _this.canvas;
					if (_this.isHit || touchObj) {
						if (hitObj) {
							if (hitObj.parent.tagType == 37) {
								if (hitObj.parent.inputActive) canvas.style.cursor = "text";
							} else canvas.style.cursor = "pointer";
						} else {
							canvas.style.cursor = "auto";
						}
					} else {
						canvas.style.cursor = "auto";
					}
				}

				if (touchObj) {
					button = touchObj.button;
					mc = touchObj.parent;
					if (mc.active) {
						_this.overObj = hitObj;
						if (hitObj &&
							hitObj.parent.instanceId === mc.instanceId &&
							hitObj.button === button
						) {
							if (mc.getButtonStatus() === "up") {
								mc.setButtonStatus("down");
								events = mc.events;
								dragOver = events.dragOver;
								if (dragOver) {
									cEvent.type = "dragOver";
									cEvent.target = mc;
									isRender = true;
									_this.executeEventAction(dragOver, mc, [cEvent]);
								}
								onDragOver = mc.variables.onDragOver;
								if (typeof onDragOver === "function") {
									isRender = true;
									_this.executeEventAction(onDragOver, mc);
								}
							}

							if (button && button.getButtonStatus() === "up") {
								button.setButtonStatus("down");

								events = button.events;
								dragOver = events.dragOver;
								if (dragOver) {
									cEvent.type = "dragOver";
									cEvent.target = button;
									isRender = true;
									_this.executeEventAction(dragOver, button, [cEvent]);
								}
								onDragOver = button.variables.onDragOver;
								if (typeof onDragOver === "function") {
									isRender = true;
									_this.executeEventAction(onDragOver, button);
								}
								button.addActions(_this);
								_this.executeAction();

								_this.executeButtonAction(button, mc, "CondIdleToOverDown");
								_this.executeButtonAction(button, mc, "CondOutDownToOverDown");
							}
						} else {
							if (mc.getButtonStatus() === "down") {
								events = mc.events;
								dragOut = events.dragOut;
								if (dragOut) {
									cEvent.type = "dragOut";
									cEvent.target = mc;
									isRender = true;
									_this.executeEventAction(dragOut, mc, [cEvent]);
								}
								onDragOut = mc.variables.onDragOut;
								if (typeof onDragOut === "function") {
									isRender = true;
									_this.executeEventAction(onDragOut, mc);
								}
							}
							mc.setButtonStatus("up");

							if (button) {
								if (button.getButtonStatus() === "down") {
									button.setButtonStatus("up");

									events = button.events;
									dragOut = events.dragOut;
									if (dragOut) {
										cEvent.type = "dragOut";
										cEvent.target = button;
										isRender = true;
										_this.executeEventAction(dragOut, button, [cEvent]);
									}
									onDragOut = button.variables.onDragOut;
									if (typeof onDragOut === "function") {
										isRender = true;
										_this.executeEventAction(onDragOut, button);
									}
									button.addActions(_this);
									_this.executeAction();

									_this.executeButtonAction(button, mc, "CondOverDownToOutDown");
									_this.executeButtonAction(button, mc, "CondOverDownToIdle");
								}
							}
						}
					}
				} else if (hitObj) {

					if (overObj) {
						button = overObj.button;
						if (button && button !== hitObj.button) {
							mc = overObj.parent;
							if (mc.active) {
								button.setButtonStatus("up");
								// Roll Out
								_this.executeButtonAction(button, mc, "CondOverUpToIdle");

								if (button._upState) {
									sprite = button.getSprite("up");
									sprite.startSound(); // button OverUpToIdle, Roll Out, up
								}
							}
						}
					}

					button = hitObj.button;
					mc = hitObj.parent;
					if (!_isTouchEvent && mc.active) {
						if (!overObj || overObj.parent !== mc) {
							isRender = true;
							events = mc.events;
							rollOver = events.rollOver;
							if (rollOver) {
								cEvent.type = "rollOver";
								cEvent.target = mc;
								isRender = true;
								_this.executeEventAction(rollOver, mc, [cEvent]);
							}

							onRollOver = mc.variables.onRollOver;
							if (typeof onRollOver === "function") {
								isRender = true;
								_this.executeEventAction(onRollOver, mc);
							}
						}
					}

					if (button) {
						button.setButtonStatus("over");
						if (!_isTouchEvent) {
							if (!overObj || overObj.button !== button) {
								isRender = true;
								_this.executeButtonAction(button, mc, "CondIdleToOverUp");

								events = button.events;
								rollOver = events.rollOver;
								if (rollOver) {
									cEvent.type = "rollOver";
									cEvent.target = button;
									isRender = true;
									_this.executeEventAction(rollOver, button, [cEvent]);
								}
								onRollOver = button.variables.onRollOver;
								if (typeof onRollOver === "function") {
									_this.executeEventAction(onRollOver, button);
								}

								if (button._overState) {
									sprite = button.getSprite("over");
									sprite.startSound(); // button IdleToOverUp, Roll Over, over
								}
							}
						}
						button.addActions(_this);
						_this.executeAction();
					}

					_this.overObj = hitObj;
				} else if (_this.touchStatus === "up") {
					_this.overObj = null;
				}

				// RollOut
				if (!touchObj && overObj) {
					button = overObj.button;
					mc = overObj.parent;
					if (mc.active) {
						if (!hitObj || hitObj.parent !== mc) {
							mc.setButtonStatus("up");

							events = mc.events;
							rollOut = events.rollOut;
							if (rollOut) {
								cEvent.type = "rollOut";
								cEvent.target = mc;
								isRender = true;
								_this.executeEventAction(rollOut, mc, [cEvent]);
							}

							onRollOut = mc.variables.onRollOut;
							if (typeof onRollOut === "function") {
								isRender = true;
								_this.executeEventAction(onRollOut, mc);
							}
						}

						if (button && (!hitObj || hitObj.button !== button)) {
							button.setButtonStatus("up");
							_this.executeButtonAction(button, mc, "CondOverUpToIdle");

							events = button.events;
							rollOut = events.rollOut;
							if (rollOut) {
								cEvent.type = "rollOut";
								cEvent.target = button;
								isRender = true;
								_this.executeEventAction(rollOut, button, [cEvent]);
							}

							onRollOut = button.variables.onRollOut;
							if (typeof onRollOut === "function") {
								isRender = true;
								_this.executeEventAction(onRollOut, button);
							}
							button.addActions(_this);
							_this.executeAction();
						}
					}
				}

				if (isRender) {
					_this.touchRender();
				}
			}

			let dragMc = _this.dragMc;
			if (dragMc) {
				event.preventDefault();
				dragMc.executeDrag();
				_this.isHit = true;
			}
		};

		/**
		 * @param event
		 */
		Stage.prototype.touchEnd = function(event)
		{
			let _this = this;
			let cEvent = new ClipEvent();
			let button, mc, as, events, release, onRelease, releaseOutside, onReleaseOutside;
			let touchObj = _this.touchObj;

			if (touchObj) {
				button = touchObj.button;
				if (button) {
					button.setButtonStatus("up");
				}
			}

			let upEventHits = _this.upEventHits;
			let length = upEventHits.length;
			if (length) {
				event.preventDefault();
				for (let i = 0; i < length; i++) {
					let obj = upEventHits[i];
					mc = obj.mc;
					as = obj.as;
					if (!as) {
						as = mc.variables.onMouseUp;
					}
					_this.executeEventAction(as, obj.mc);
				}
				_this.upEventHits = [];
			}

			let hitObj = _this.hitCheck(event);
			let dragMc = _this.dragMc;
			if (dragMc) {
				hitObj = touchObj;
				_this.isHit = true;
			}

			let isRender = false;
			if (touchObj) {
				mc = touchObj.parent;
				mc.setButtonStatus("up");
				button = touchObj.button;

				if (_this.isHit) {
					let touchEndAction = _this.touchEndAction;
					if (mc.active) {
						if (mc === hitObj.parent) {
							if (touchEndAction !== null) {
								_this.buttonAction(mc, touchEndAction);
								isRender = true;
							}

							events = mc.events;
							release = events.release;
							if (release) {
								cEvent.type = "release";
								cEvent.target = mc;
								_this.executeEventAction(release, mc, [cEvent]);
								isRender = true;
							}
							onRelease = mc.variables.onRelease;
							if (typeof onRelease === "function") {
								_this.executeEventAction(onRelease, mc);
								isRender = true;
							}
						}

						if (button) {
							if (button === hitObj.button) {
								events = button.events;
								release = events.release;
								if (release) {
									cEvent.type = "release";
									cEvent.target = button;
									_this.executeEventAction(release, button, [cEvent]);
								}

								onRelease = button.variables.onRelease;
								if (typeof onRelease === "function") {
									_this.executeEventAction(onRelease, button);
								}
							}

							let status = "up";
							if (!_isTouchEvent) {
								if (hitObj && hitObj.button === button) {
									status = "over";
								}
							}

							button.setButtonStatus(status);

							button.addActions(_this);
							_this.executeAction();

							if (button._hitState) {
								let sprite = button.getSprite("hit");
								sprite.startSound(); // button OverDownToOverUp, Release, hit
							}

							isRender = true;
						}
					}
				}

				if (mc.active && (!hitObj || mc !== hitObj.parent)) {
					events = mc.events;
					releaseOutside = events.releaseOutside;
					if (releaseOutside) {
						cEvent.type = "releaseOutside";
						cEvent.target = mc;
						_this.executeEventAction(releaseOutside, mc, [cEvent]);
						isRender = true;
					}
					onReleaseOutside = mc.variables.onReleaseOutside;
					if (typeof onReleaseOutside === "function") {
						_this.executeEventAction(onReleaseOutside, mc);
						isRender = true;
					}
				}

				if (button && (!hitObj || button !== hitObj.button)) {
					isRender = true;

					events = button.events;
					releaseOutside = events.releaseOutside;
					if (releaseOutside) {
						cEvent.type = "releaseOutside";
						cEvent.target = button;
						_this.executeEventAction(releaseOutside, button, [cEvent]);
						isRender = true;
					}

					onReleaseOutside = button.variables.onReleaseOutside;
					if (typeof onReleaseOutside === "function") {
						_this.executeEventAction(onReleaseOutside, button);
					}
					button.setButtonStatus("up");
					button.addActions(_this);
					_this.executeAction();
				}
			}

			_this.isHit = false;
			_this.gotTouchEvent = false;
			_this.touchObj = null;
			_this.touchStatus = "up";

			if (!_isTouchEvent) {
				_this.hitCheck(event);
				let canvas = _this.canvas;
				if (_this.isHit) {
					canvas.style.cursor = "pointer";
				} else {
					canvas.style.cursor = "auto";
				}
			}

			if (hitObj) {
				let rollOver, onRollOver;
				mc = hitObj.parent;
				if (!touchObj || mc !== touchObj.parent) {
					events = mc.events;
					rollOver = events.rollOver;
					if (rollOver) {
						isRender = true;
						cEvent.type = "rollOver";
						cEvent.target = mc;
						_this.executeEventAction(rollOver, mc, [cEvent]);
					}

					onRollOver = mc.variables.onRollOver;
					if (typeof onRollOver === "function") {
						isRender = true;
						_this.executeEventAction(onRollOver, mc);
					}
				}

				button = hitObj.button;
				if (button) {
					if (!touchObj || button !== touchObj.button) {
						events = button.events;
						rollOver = events.rollOver;
						if (rollOver) {
							isRender = true;
							cEvent.type = "rollOver";
							cEvent.target = button;
							_this.executeEventAction(rollOver, button, [cEvent]);
						}

						onRollOver = button.variables.onRollOver;
						if (typeof onRollOver === "function") {
							isRender = true;
							_this.executeEventAction(onRollOver, button);
						}
					}
				}
			}

			if (isRender) {
				event.preventDefault();
				_this.touchRender();
			}

			_keyEvent = null;
		};

		/**
		 * @param button
		 * @param mc
		 * @param status
		 */
		Stage.prototype.executeButtonAction = function(button, mc, status)
		{
			let _this = this;
			let actions = button.getActions();
			let length = actions.length;
			if (length) {
				for (let idx = 0; idx < length; idx++) {
					if (!(idx in actions)) {
						continue;
					}

					let cond = actions[idx];
					if (!cond[status]) {
						continue;
					}

					_this.buttonAction(mc, cond.ActionScript);
				}
			}
		};

		/**
		 * touchRender
		 */
		Stage.prototype.touchRender = function()
		{
			let _this = this;
			_this.render();
			_this.renderMain();
		};

		/**
		 * @constructor
		 */
		let Swf2js = function() {};

		/**
		 * @type {DropShadowFilter}
		 */
		Swf2js.prototype.DropShadowFilter = DropShadowFilter;

		/**
		 * @type {BlurFilter}
		 */
		Swf2js.prototype.BlurFilter = BlurFilter;

		/**
		 * @type {GlowFilter}
		 */
		Swf2js.prototype.GlowFilter = GlowFilter;

		/**
		 * @type {BevelFilter}
		 */
		Swf2js.prototype.BevelFilter = BevelFilter;

		/**
		 * @type {GradientGlowFilter}
		 */
		Swf2js.prototype.GradientGlowFilter = GradientGlowFilter;

		/**
		 * @type {ConvolutionFilter}
		 */
		Swf2js.prototype.ConvolutionFilter = ConvolutionFilter;

		/**
		 * @type {ColorMatrixFilter}
		 */
		Swf2js.prototype.ColorMatrixFilter = ColorMatrixFilter;

		/**
		 * @type {GradientBevelFilter}
		 */
		Swf2js.prototype.GradientBevelFilter = GradientBevelFilter;

		/**
		 * @type {BitmapFilter}
		 */
		Swf2js.prototype.BitmapFilter = BitmapFilter;

		/**
		 * @type {LoadVars}
		 */
		Swf2js.prototype.LoadVars = LoadVars;

		/**
		 * @param url
		 * @param options
		 */
		Swf2js.prototype.load = function(url, options)
		{
			let _this = this;

			if (url) {
				let stage = (options && options.stage instanceof Stage) ? options.stage : new Stage();
				stage._swfTag = _this;
				stage.setOptions(options);
				stages[stage.getId()] = stage;
				stage.addProgressStep("Init");
				stage.init();
				stage.url = url;
				stage.progressStepEnd(true);
				stage.addProgressStep("Load");
				_this.getFileSize(url, function(size) {
					_this.fileSize = size;
				});

				let xmlHttpRequest = new XMLHttpRequest();
				xmlHttpRequest.open("GET", url, true);
				if (isXHR2) {
					xmlHttpRequest.responseType = "arraybuffer";
				} else {
					xmlHttpRequest.overrideMimeType("text/plain; charset=x-user-defined");
				}

				xmlHttpRequest.onreadystatechange = function() {
					let readyState = xmlHttpRequest.readyState;
					if (readyState === 4) {
						let status = xmlHttpRequest.status;
						switch (status) {
							case 200:
							case 304:
								let data = (isXHR2) ? xmlHttpRequest.response : xmlHttpRequest.responseText;
								stage.progressStepEnd(true);

								stage.addProgressStep("Parse");
								stage.parse(data, url);
								stage.progressStepEnd(true);

								stage.addProgressStep("CacheStore");
								cacheStore.reset();
								stage.progressStepEnd(true);
								break;
							default:
								window.alert('Swf2js.prototype.load url ' + url + ' status ' + status + ' xmlHttpRequest.statusText ' + xmlHttpRequest.statusText);
								break;
						}
					}
				};
				xmlHttpRequest.send(null);
				return stage;
			} else {
				window.alert("Please set swf url");
				return null;
			}
		};

		/**
		 * Get file size
		 */
		Swf2js.prototype.getFileSize = function(url, callback)
		{
			let xhr = new XMLHttpRequest();
			xhr.open("HEAD", url, true);
			xhr.onreadystatechange = function() {
				if (this.readyState == this.DONE) {
					callback(parseInt(xhr.getResponseHeader("Content-Length")));
				}
			};
			xhr.send();
		};

		/**
		 * @param url
		 * @param options
		 * @returns {*}
		 */
		Swf2js.prototype.reload = function(url, options)
		{
			if (!stageId) {
				return this.load(url, options);
			}
			let stage = stages[0];
			for (let i in stages) {
				if (!stages.hasOwnProperty(i)) {
					continue;
				}
				let target = stages[i];
				target.stop();
				if (i) {
					target.deleteNode(target.tagId);
					target = void 0;
				}
			}

			stageId = 1;
			stages = [];
			loadStages = [];
			stages[0] = stage;
			stage.reload(url, options);
		};

		/**
		 * @param width
		 * @param height
		 * @param fps
		 * @param options
		 * @returns {MovieClip}
		 */
		Swf2js.prototype.createRootMovieClip = function(width, height, fps, options)
		{
			let stage = new Stage();
			width = width || 240;
			height = height || 240;
			fps = fps || 60;

			stage.setBaseWidth(width);
			stage.setBaseHeight(height);
			stage.setFrameRate(fps);
			stage.setOptions(options);
			stages[stage.getId()] = stage;
			stage.init();
			stage.isLoad = true;

			if (_document.readyState === "loading") {
				let reLoad = function() {
					window.removeEventListener("DOMContentLoaded", reLoad, false);
					stage.resize();
					stage.loaded();
				};
				window.addEventListener("DOMContentLoaded", reLoad, false);
			}
			return stage.getParent();
		};

		window.swf2js = new Swf2js();
	})(window);
}
