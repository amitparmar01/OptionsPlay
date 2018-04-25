// -------------------------------------------------------------------------------------------
// Copyright 2012 by ChartIQ LLC
// -------------------------------------------------------------------------------------------
// Be sure your webserver is set to deliver UTF-8 charset
// For apache add "AddDefaultCharset UTF-8" to httpd.conf
// otherwise use \u unicode escapes for non-ascii characters

(function(){

	function _stx_js(_exports, _stxThirdParty) {
	
		var iScroll=_stxThirdParty.iScroll;
		var timezoneJS=_stxThirdParty.timezoneJS;	
		
		var debugDoc=null;
		
		/**
		 * Base namespace for STX library
		 * @name STX
		 * @namespace
		 */
		function STX(){
		}
		
		_exports.STX=STX;
		
		if(!window.console){	// Simple polyfill for IE9 which doesn't support console
			window.console=function(){};
		}
		
		STX.ipad = navigator.userAgent.indexOf("iPad") != -1;
		STX.iphone = navigator.userAgent.indexOf("iPhone") != -1;
		STX.isSurface = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
		STX.touchDevice = typeof(document.ontouchstart)!="undefined" || STX.isSurface;
		STX.is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
		STX.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
		STX.isIE = navigator.userAgent.toLowerCase().indexOf("msie") > -1;
		STX.isIE9 = (navigator.userAgent.indexOf("Trident/5") > -1) || (navigator.userAgent.indexOf("MSIE 9.0")>-1);
		STX.isIE8 = false;
		STX.isIOS7 = navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i);
		STX.isSurfaceApp = window.MSApp;
		STX.noKeyboard = STX.ipad || STX.iphone || STX.isAndroid || STX.isSurfaceApp;
		
		/**
		 * Use openDebugger when you don't have access to a console window such as on a touch device. This will pop
		 * up a new window for output. @see STX.debug
		 * @memberOf  STX
		 */
		STX.openDebugger=function(){
			var w=window.open("", "Debug", "width=500, height=400, scrollbars=1");
			debugDoc=w.document;
		};
		
		/**
		 * Sends debug output to debugger window when a console is not available. @see STX.openDebugger
		 * @param  {string} str Data to print to debug window
		 * @memberOf  STX
		 */
		STX.debug=function(str){
			if(debugDoc==null){
				return;
			}
			debugDoc.writeln(str);
		};
		
		/**
		 * Prints all the properties of an object to the debug window. Similar to console.log(obj)
		 * @param  {object} theObject The object to inspect
		 * @memberOf  STX
		 */
		STX.inspectProperties=function(theObject){
		   var theProperties = "";
		   for (var i in theObject){
			if(i!="outerText" && i!="innerText" && i!="outerHTML" && i!="innerHTML"){
				if(typeof(theObject[i])=="function"){
					theProperties +=  i + "" + "()" + "<br>";
					console.log(i+"()");
				}else{
					try{
						console.log(i+"="+theObject[i]);
						theProperties +=  i + " = " + theObject[i] + "<br>";
					}catch(e){
					}
				}
			}
		   }
		   theProperties+="<P>";
		   STX.debug(theProperties);
		};
		
		/**
		 * Converts an rgb or rgba color to a hex color
		 * @param  {string} color The rgb or rgba color, such as in CSS format
		 * @return {string}       The hex color
		 * @example
		 * var hexColor=STX.colorToHex("rgba (255,255,255,0.3)");
		 * @memberOf  STX
		 */
		STX.colorToHex=function(color) {
		    if (color.substr(0, 1) === '#') {
		        return color;
		    }
		    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
		    if(!digits) digits=/(.*?)rgba\((\d+), (\d+), (\d+),.*\)/.exec(color);
		    if(!digits) return "#000000";
		
		    var red = parseFloat(digits[2]);
		    var green = parseFloat(digits[3]);
		    var blue = parseFloat(digits[4]);
		
		    var rgb = blue | (green << 8) | (red << 16);
		    var s=digits[1] + '#' + rgb.toString(16);
		    return s.toUpperCase();
		};
		
		/**
		 * Returns true if the color is transparent. In particular it checks rgba status. Note that the charting engine
		 * often interprets transparent colors to mean that a color should be automatically determined based on the brightness
		 * of the background.
		 * @param  {string}  color The color (from CSS)
		 * @return {Boolean}       True if transparent
		 * @memberOf  STX
		 */
		STX.isTransparent=function(color){
			if(!color) return false;
			if(color=="transparent") return true;
			var digits=/(.*?)rgba\((\d+), (\d+), (\d+), (.*)\)/.exec(color);
			if(digits==null) return false;
			if(parseFloat(digits[5])==0) return true;
			return false;
		};
		
		/**
		 * Converts a color from hex or rgb format to Hue, Saturation, Value. This does not accept literal color names such as "black"
		 * @param  {string} color The color (from CSS)
		 * @return {array}       [Hue, Saturation, Value]
		 * @memberOf  STX
		 */
		STX.hsv=function(color) {
			var hex=STX.colorToHex(color);
			if(hex.substr(0,1)==="#") hex=hex.slice(1);
			for(var i=hex.length;i<6;i++){
				hex+="0";
			}
			var r=parseInt(hex.slice(0,2),16);
			var g=parseInt(hex.slice(2,4),16);
			var b=parseInt(hex.slice(4,6),16);
			 var computedH = 0;
			 var computedS = 0;
			 var computedV = 0;
		
			 //remove spaces from input RGB values, convert to int
			 r = parseInt( (''+r).replace(/\s/g,''),10 );
			 g = parseInt( (''+g).replace(/\s/g,''),10 );
			 b = parseInt( (''+b).replace(/\s/g,''),10 );
		
			 if ( r==null || g==null || b==null ||
			     isNaN(r) || isNaN(g)|| isNaN(b) ) {
			   return null;
			 }
			 if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
			   return null;
			 }
			 r=r/255; g=g/255; b=b/255;
			 var minRGB = Math.min(r,Math.min(g,b));
			 var maxRGB = Math.max(r,Math.max(g,b));
		
			 // Black-gray-white
			 if (minRGB==maxRGB) {
			  computedV = minRGB;
			  return [0,0,computedV];
			 }
		
			 // Colors other than black-gray-white:
			 var d = (r==minRGB) ? g-b : ((b==minRGB) ? r-g : b-r);
			 var h = (r==minRGB) ? 3 : ((b==minRGB) ? 1 : 5);
			 computedH = 60*(h - d/(maxRGB - minRGB));
			 computedS = (maxRGB - minRGB)/maxRGB;
			 computedV = maxRGB;
			 return [computedH,computedS,computedV];
		};
		
		/**
		 * Chooses either a white or black foreground color depending on the "value" of the background color. Note that this simply
		 * checks if the value is above .85 which works well but not ideally for red colors which the human eye interprets differently.
		 * More complex algorithms are available but chartists rarely use red as a background color.
		 * @param  {string} backgroundColor The background color (CSS format)
		 * @return {string}                 Either #000000 (black) or #FFFFFF (white) depending on will look best on the given background color
		 * @memberOf  STX
		 */
		STX.chooseForegroundColor=function(backgroundColor){
				var hsv=STX.hsv(backgroundColor);
				var v=hsv[2];
				if(v>.85) return "#000000";
				else return "#FFFFFF";
		};
		
		
		/**
		 * Shorthand for getElementById(). Equivalent to prototype style $() which is faster but less powerful than jquery style $()
		 * @param  {string} id     An ID tag for a valid DOM object
		 * @param  {object} [source] - An optional valid DOM node to search within. If not provided then the entire document will be searched.
		 * @return {object}        The DOM node associated with the id or null if it is not found
		 * @name  $$
		 */
		function $$(id, source){
			if(!source) return document.getElementById(id);
			if(source.id==id) return source;	// Found it!
			if(!source.hasChildNodes) return null;
			for(var i=0;i<source.childNodes.length; i++){
				var element=$$(id, source.childNodes[i]);
				if(element!=null) return element;
			}
			return null;
		}
		_exports.$$=$$;
		
		/**
		 * Functional equivalent of querySelector(). Functionally equivalent to jquery $().
		 * This uses querySelectorAll in order to maintain compatibility with IE 9.
		 * Note that if multiple objects match the selector then only the first will be returned.
		 * @param  {string} selector - CSS style selector
		 * @param  {object} [source]   Optional node to select within. If not provided then entire document will be searched.
		 * @return {object}          The first object to match the selector
		 * @name  $$$
		 */
		function $$$(selector, source){
			if(!source) source=document;
			return source.querySelectorAll(selector)[0];	// We use querySelectorAll for backward compatibility with IE
		}
		_exports.$$$=$$$;
		
		/**
		 * Get the source element for a DOM event depending on browser type
		 * @param  {object} [e] Event if available from browser
		 * @return {object}   The DOM node that registered the event
		 * @memberOf  STX
		 */
		STX.getEventDOM=function(e){
			if(!e){
				return window.event.srcElement;
			}else{
				return e.target;
			}
		};
		
		/**
		 * Returns the host portion of a url
		 * @param  {string} url The url, such as document.location.href
		 * @return {string}     The host portion, including port, if the url is a valid URI
		 * @memberOf  STX
		 */
		STX.getHostName=function(url) {
			try{
				return url.match(/:\/\/(.[^/]+)/)[1];
			}catch(e){
				return "";
			}
		};
		
		/**
		 * Capitalizes the first letter of a string
		 * @return {string} Capitalized version of the string
		 */
		String.prototype.capitalize = function() {
		    return this.charAt(0).toUpperCase() + this.slice(1);
		};
		
		/**
		 * Clones an object. This function creates a deep (recursive) clone of an object. The object can be a primitive or an object or an array.
		 * Note that cloning objects that reference DOM nodes can result in stack overflows. Use with caution.
		 * @param  {object} from The source object
		 * @param  {object} [to]   Optional existing object of same type. Can improve performance when objects are reusable.
		 * @return {object}      A deep clone of the "from" object
		 * @memberOf  STX
		 */
		STX.clone=function(from, to)
		{
		    if (from == null || typeof from != "object") return from;
		    // if (from.constructor != Object && from.constructor != Array) return from;
		    if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
		        from.constructor == String || from.constructor == Number || from.constructor == Boolean)
		        return new from.constructor(from);
		
		    to = to || new from.constructor();
		
		    for (var n in from)
		    {
		        to[n] = typeof to[n] == "undefined" ? STX.clone(from[n], null) : to[n];
		    }
		
		    return to;
		};
		
		/**
		 * Non recursive clone. This will only clone the top layer and is safe to use when objects contain DOM nodes.
		 * @param  {object} from - Object to be cloned
		 * @return {object}      A shallow clone of the "from" object
		 * @memberOf  STX
		 */
		STX.shallowClone=function(from){
			if(from.constructor==Array){
				var to=new Array(from.length);
				for(var i=0;i<from.length;i++){
					to[i]=from[i];
				}
				return to;
			}else{
				var to={};
				for(var field in from){
					to[field]=from[field];
				}
				return to;
			}
		};
		
		/**
		 * Returns a short, pseudo unique ID based on the current time. Radix 36 is used resulting in a compact string consisting only of letters and numerals.
		 * While not guaranteed to be unique, this function has a high probability of uniqueness when it is triggered by human activity even in a large user base.
		 * @return {string} A unique string consisting of letters and numerals
		 * @memberOf  STX
		 */
		STX.uniqueID=function(){
			var epoch=new Date();
			var id=epoch.getTime().toString(36);
			id+=Math.floor(Math.random()*Math.pow(36,2)).toString(36);
			return id.toUpperCase();
		};
		
		/**
		 * Removes all DOM elements in a given node. This is extremely useful when dynamically generating content.
		 * @param  {object} node - The node to clear
		 * @memberOf  STX
		 */
		STX.clearNode=function(node){
			if ( node.hasChildNodes() ){
				while ( node.childNodes.length >= 1 ){
		    		node.removeChild( node.firstChild );
				}
			}
		};
		
		STX.monthLetters=["J","F","M","A","M","J","J","A","S","O","N","D"];
		STX.monthAbv=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
		
		/**
		 * Convenience function for creating a displayable month name using STX.monthLetters and STX.monthAbv.
		 * Please note that those arrays may not be utilized if the library is used in conjuction with Internationalization.
		 * This method is used primarily to create the x-axis of a chart
		 * @param  {number} i              The numerical month (0-11)
		 * @param  {boolean} displayLetters - True if just the first letter should be displayed (such as a tight display)
		 * @param  {object} [stx]            The chart object, only necessary if Internationalization is in use
		 * @return {string}                String representation of the month
		 * @memberOf  STX
		 */
		STX.monthAsDisplay=function(i, displayLetters,stx){
			if(displayLetters){
				if(stx && stx.monthLetters) return stx.monthLetters[i];
				return STX.monthLetters[i];
			}else{
				if(stx && stx.monthAbv) return stx.monthAbv[i];
				return STX.monthAbv[i];
			}
		};
		
		/**
		 * Displays a time in readable form. If Internationalization is in use then the time will be in 24 hour Intl numeric format
		 * @param  {date} dt  JavaScript Date object
		 * @param  {object} [stx] Optional chart object if Internationalization is in use
		 * @return {string}     Human friendly time, usually hh:mm
		 * @memberOf  STX
		 */
		STX.timeAsDisplay=function(dt, stx){
			if(stx && stx.internationalizer){
				return stx.internationalizer.hourMinute.format(dt);
			}else{
				var min=dt.getMinutes();
				if(min<10) min="0" + min;
				return dt.getHours() + ":" + min;
			}
		};
		
		// Extract the name of the month from the locale. We do this by creating a
		// localized date for the first
		// date of each month. Then we extract the alphabetic characters. MonthLetters
		// then becomes the first
		// letter of the month. Note that in the current Intl.js locale, chinese and
		// japanese months are implemented
		// as 1月 through 12月 which causes this algorithm to fail. Hopefully real months
		// will be available when Intl
		// becomes a browser standard, otherwise this method or the locale will need to
		// be modified for those or other special cases
		// 
		/**
		 * Extract the name of the month from the locale. We do this by creating a
		 * localized date for the first date of each month. Then we extract the alphabetic characters.
		 * MonthLetters then becomes the first letter of the month. Note that in the current Intl.js locale, chinese and
		 * japanese months are implemented as 1月 through 12月 which causes this algorithm to fail. Hopefully real months
		 * will be available when Intl becomes a browser standard, otherwise this method or the locale will need to
		 * be modified for those or other special cases. The arrays are stored in stx.monthAbv and stx.monthLetters which
		 * will then override the global arrays STX.monthAbv and STX.monthLetters.
		 * @param  {object} stx       Chart object
		 * @param  {object} formatter An Intl compatible date formatter
		 * @param  {string} locale    A valid Intl locale, such as en-IN
		 * @memberOf  STX
		 */
		STX.createMonthArrays=function(stx, formatter, locale){
			stx.monthAbv=[];
			stx.monthLetters=[];
			var dt=new Date();
			var shortenMonth=true;
			if(STX.I18N.longMonths && STX.I18N.longMonths[locale]) shortenMonth=false;
			for(var i=0;i<12;i++){
				dt.setDate(1);
				dt.setMonth(i);
				var str=formatter.format(dt);
				if(shortenMonth){
					var month="";
					for(var j=0;j<str.length;j++){
						var c=str.charAt(j);
						var cc=c.charCodeAt(0);
						if(cc<65) continue;
						month+=c;
					}
					stx.monthAbv[i]=month;
					stx.monthLetters[i]=month[0];
				}else{
					stx.monthAbv[i]=str;
					stx.monthLetters[i]=str;
				}
			}
		};
		
		/**
		 * Condenses an integer into abbreviated form by adding "k","m" or "b". This method is used in the y-axis for example with volume studies.
		 * @param  {number} txt - A numerical value
		 * @return {string}     Condensed version of the number
		 * @example
		 * // This will return 12m
		 * condentInt(12000000);
		 * @memberOf  STX
		 */
		STX.condenseInt=function(txt){
			if(!txt || typeof txt=="undefined") return "";
			if(txt>0){
				if(txt>1000000000) txt=Math.round(txt/100000000)/10 + "b";
				else if(txt>1000000) txt=Math.round(txt/100000)/10 + "m";
				else if(txt>1000) txt=Math.round(txt/100)/10 + "k";
				else txt=txt.toFixed(0);
			}else{
				if(txt<-1000000000) txt=Math.round(txt/100000000)/10 + "b";
				else if(txt<-1000000) txt=Math.round(txt/100000)/10 + "m";
				else if(txt<-1000) txt=Math.round(txt/100)/10 + "k";
				else txt=txt.toFixed(0);
			}
			return txt;
		};
		
		/**
		 * Determines whether a line intersects a box. This is used within the charting engine to determine whether the cursor
		 * has intersected a drawing.
		 * @param  {number} bx1   
		 * @param  {number} by1   
		 * @param  {number} bx2   
		 * @param  {number} by2   
		 * @param  {number} x0    
		 * @param  {number} y0    
		 * @param  {number} x1    
		 * @param  {number} y1    
		 * @param  {string} vtype - Either "segment", "ray" or "line"
		 * @return {boolean}       Returns true if the line intersects the box
		 * @memberOf  STX
		 */
		STX.boxIntersects=function(bx1, by1, bx2, by2, x0, y0, x1, y1, vtype){
			if     (STX.linesIntersect(bx1, bx2, by1, by1, x0, x1, y0, y1, vtype)) return true;
			else if(STX.linesIntersect(bx1, bx2, by2, by2, x0, x1, y0, y1, vtype)) return true;
			else if(STX.linesIntersect(bx1, bx1, by1, by2, x0, x1, y0, y1, vtype)) return true;
			else if(STX.linesIntersect(bx2, bx2, by1, by2, x0, x1, y0, y1, vtype)) return true;
			return false;
		};
		
		/**
		 * Determines whether two lines intersect
		 * @param  {number} x1   
		 * @param  {number} x2   
		 * @param  {number} y1   
		 * @param  {number} y2   
		 * @param  {number} x3   
		 * @param  {number} x4   
		 * @param  {number} y3   
		 * @param  {number} y4   
		 * @param  {string} type - Either "segment", "ray" or "line"
		 * @return {boolean}      Returns true if the two lines intersect
		 * @memberOf  STX
		 */
		STX.linesIntersect=function(x1, x2, y1, y2, x3, x4, y3, y4, type){
			var denom  = (y4-y3) * (x2-x1) - (x4-x3) * (y2-y1);
			var numera = (x4-x3) * (y1-y3) - (y4-y3) * (x1-x3);
			var numerb = (x2-x1) * (y1-y3) - (y2-y1) * (x1-x3);
			//var EPS = .000001;
		
			if(denom==0){
				if(numera==0 && numerb==0) return true; // coincident
				return false; // parallel
			}
		
			var mua = numera / denom;
			var mub = numerb / denom;
			if(type=="segment" || type=="zig zag"){
				if (mua>=0 && mua<=1 && mub>=0 && mub<=1) return true;
			}else if(type=="line" || type=="horizontal" || type=="vertical"){
				if (mua>=0 && mua<=1) return true;
			}else if(type=="ray"){
				if (mua>=0 && mua<=1 && mub>=0) return true;
			}
			return false;
		
		};
		
		/**
		 * Determines the Y value at which point X intersects a line (vector)
		 * @param  {object} vector - Object of type {x0,x1,y0,y1}
		 * @param  {number} x      - X value
		 * @return {number}        - Y intersection point
		 * @memberOf  STX
		 */
		STX.yIntersection=function(vector, x){
			var x1=vector.x0, x2=vector.x1, x3=x, x4=x;
			var y1=vector.y0, y2=vector.y1, y3=0, y4=10000;
			var denom  = (y4-y3) * (x2-x1) - (x4-x3) * (y2-y1);
			var numera = (x4-x3) * (y1-y3) - (y4-y3) * (x1-x3);
			//var numerb = (x2-x1) * (y1-y3) - (y2-y1) * (x1-x3);
			//var EPS = .000001;
		
			if(denom==0) return null;
		
			var mua=numera/denom;
			var y=y1 + (mua * (y2-y1));
			return y;
		};
		
		/**
		 * Determines the X value at which point Y intersects a line (vector)
		 * @param  {object} vector - Object of type {x0,x1,y0,y1}
		 * @param  {number} y      - Y value
		 * @return {number}        - X intersection point
		 * @memberOf  STX
		 */
		STX.xIntersection=function(vector, y){
			var x1=vector.x0, x2=vector.x1, x3=0, x4=10000;
			var y1=vector.y0, y2=vector.y1, y3=y, y4=y;
			var denom  = (y4-y3) * (x2-x1) - (x4-x3) * (y2-y1);
			var numera = (x4-x3) * (y1-y3) - (y4-y3) * (x1-x3);
			//var numerb = (x2-x1) * (y1-y3) - (y2-y1) * (x1-x3);
			//var EPS = .000001;
		
			if(denom==0) return null;
			var mua=numera/denom;
			var x=x1 + (mua * (x2-x1));
			return x;
		};
		
		/**
		 * Strips the letters "px" from a string. This is useful for converting styles into absolutes.
		 * @param  {string} text - String value with "px"
		 * @return {number}      The numeric value
		 * @example
		 * var leftPosition=STX.stripPX(node2.style.left)
		 * @memberOf  STX
		 */
		STX.stripPX=function(text){
			return parseInt(text.substr(0, text.indexOf("p")));
		};
		
		/**
		 * Returns the height of the page. It is aware of iframes and so will never return a value that is greater
		 * than the value of the parent
		 * @return {number} Height of page in pixels
		 * @memberOf  STX
		 */
		STX.pageHeight=function() {
			var h=window.innerHeight;
			if(top!=self){
				try{
					if(h>parent.innerHeight) h=parent.innerHeight;
				}catch(e){}
			}
			return h;
		};
		
		/**
		 * Returns the width of the page. It is aware of iframes and so will never return a value that is greater
		 * than the value of the parent
		 * @return {number} Width of page in pixels
		 * @memberOf  STX
		 */
		STX.pageWidth=function() {
			var w=window.innerWidth;
			if(top!=self){
				try{
					if(w>parent.innerWidth) w=parent.innerWidth;
				}catch(e){}
			}
			return w;
		};
		
		/**
		 * Deletes (removes) nulls or undefined fields (names) from an object. This is useful when marshalling (saving) an object where you don't wish
		 * null or undefined values to show up in the marshalled object (such as when converting to JSON)
		 * @param  {object} obj         The object to scrub
		 * @param  {boolean} [removeNulls] Whether or not to remove null values
		 * @memberOf  STX
		 */
		STX.scrub=function(obj, removeNulls){
			for(var i in obj){
				if(typeof(obj[i])=="undefined")
					delete obj[i];
				if(removeNulls && obj[i]==null)
					delete obj[i];
			}
		};
		
		/**
		 * Converts a string form date into a JavaScript Date object with time. Supports various standard date formats
		 * @param  {string} dt String form of a date (such as yyyymmddhhmm, yyyy-mm-dd hh:mm, etc)
		 * @return {date}    A JavaScript Date object
		 * @memberOf  STX
		 */
		STX.strToDateTime=function(dt){
			var myDateArray=[];
			if(dt.length==12){	// yyyymmddhhmm
				var y=parseFloat(dt.substring(0,4));
				var m=parseFloat(dt.substring(4,6)) - 1;
				var d=parseFloat(dt.substring(6,8));
				var h=parseFloat(dt.substring(8,10));
				var mn=parseFloat(dt.substring(10,12));
				var newdt=new Date(y, m, d, h, mn, 0, 0);
				return newdt;
			}else{
				var lr=[dt];
				if(dt.indexOf("T")!=-1) lr=dt.split("T");
				else if(dt.indexOf(" ")!=-1) lr=dt.split(" ");

				if(lr[0].indexOf('/')!=-1) myDateArray=lr[0].split("/");
				else if(lr[0].indexOf('-')!=-1) myDateArray=lr[0].split("-");
				else return STX.strToDate(dt); //give up, maybe it's just a date
		
				if(myDateArray[0] && myDateArray[0].length==4){	// YYYY-MM-DD
					year=parseFloat(myDateArray[0],10);
					myDateArray[0]=myDateArray[1];
					myDateArray[1]=myDateArray[2];
				}
		
				if(lr.length>1){
					lr=lr[1].split(':');
					return new Date(year,myDateArray[0]-1,myDateArray[1], lr[0], lr[1], 0, 0);
				}else{
					return new Date(year,myDateArray[0]-1,myDateArray[1], 0, 0, 0, 0);
				}
			}
		};
		
		/**
		 * Converts a string form date into a JavaScript object. Only use if you know that the string will not include a time, otherwise use @see STX.strToDateTime
		 * @param  {string} dt - Date in string format such as MM/DD/YY or YYYYMMDD
		 * @return {Date}    [description]
		 * @memberOf  STX
		 */
		STX.strToDate=function(dt){
			var myDateArray;
			if(dt.indexOf('/')!=-1) myDateArray=dt.split("/");
			else if(dt.indexOf('-')!=-1) myDateArray=dt.split("-");
			else if(dt.length>=8){
				return new Date(parseFloat(dt.substring(0,4)), parseFloat(dt.substring(4,6))-1, parseFloat(dt.substring(6,8)));
			}else{
				return new Date();
			}
			if(myDateArray[2].indexOf(' ')!=-1){
				myDateArray[2]=myDateArray[2].substring(0, myDateArray[2].indexOf(' '));
			}
			var year=parseFloat(myDateArray[2],10);
			if(year<20) year+=2000;
			if(myDateArray[0].length==4){	// YYYY-MM-DD
				year=parseFloat(myDateArray[0],10);
				myDateArray[0]=myDateArray[1];
				myDateArray[1]=myDateArray[2];
			}
			return new Date(year,myDateArray[0]-1,myDateArray[1]);
		};
		
		/**
		 * Converts a string form date to mm/dd/yyyy format
		 * @param  {string} d Date in string format such as YYYY-MM-DD
		 * @return {string}   Date in mm/dd/yyyy format
		 * @memberOf  STX
		 */
		STX.mmddyyyy=function(d){
			var dt=STX.strToDate(d);
			var m=dt.getMonth()+1;
			if(m<10) m="0" + m;
			var d=dt.getDate();
			if(d<10) d="0" + d;
			return m + "/" + d + "/" + dt.getFullYear();
		};
		
		/**
		 * Converts a JavaScript Date to yyyy-mm-dd format
		 * @param  {date} dt JavaScript Date object
		 * @return {string}    Date in yyyy-mm-dd format
		 * @memberOf  STX
		 */
		STX.yyyymmdd=function(dt){
			var m=dt.getMonth()+1;
			if(m<10) m="0" + m;
			var d=dt.getDate();
			if(d<10) d="0" + d;
			return dt.getFullYear() + "-" + m + "-" + d;
		};
		
		/**
		 * Converts a date into yyyymmddhhmm format
		 * @param  {date} dt A JavaScript Date object
		 * @return {string}    Date in yyyymmddhhmm format
		 * @memberOf  STX
		 */
		STX.yyyymmddhhmm=function(dt){
			var m=dt.getMonth()+1;
			if(m<10) m="0" + m;
			var d=dt.getDate();
			if(d<10) d="0" + d;
			var h=dt.getHours();
			if(h<10) h="0" + h;
			var mn=dt.getMinutes();
			if(mn<10) mn="0" + mn;
			return '' + dt.getFullYear() + m + d + h + mn;
		};
		
		/**
		 * Converts a date into yyyy/mm/dd hh:mm format
		 * @param  {date} dt A JavaScript Date object
		 * @return {string}    Date in yyyy/mm/dd hh:mm format
		 * @memberOf  STX
		 */
		STX.friendlyDate=function(dt){
			var m=dt.getMonth()+1;
			if(m<10) m="0" + m;
			var d=dt.getDate();
			if(d<10) d="0" + d;
			var h=dt.getHours();
			if(h<10) h="0" + h;
			var mn=dt.getMinutes();
			if(mn<10) mn="0" + mn;
			return '' + dt.getFullYear() + "/" + m + "/" + d + " " + h + ":" + mn;
		};
		
		/**
		 * Converts a date into YYYY-MM-DDTHH:MM:SSZ format (UTC)
		 * @param  {date} dt A JavaScript Date object
		 * @return {string}    Date in YYYY-MM-DDTHH:MM:SSZ format
		 * @memberOf  STX
		 */
		STX.standardUTCDate=function(dt){
			var m=dt.getUTCMonth()+1;
			if(m<10) m="0" + m;
			var d=dt.getUTCDate();
			if(d<10) d="0" + d;
			var h=dt.getUTCHours();
			if(h<10) h="0" + h;
			var mn=dt.getUTCMinutes();
			if(mn<10) mn="0" + mn;
			var s=dt.getUTCSeconds();
			if(s<10) s="0" + s;
			return '' + dt.getUTCFullYear() + "-" + m + "-" + d + "T" + h + ":" + mn + ":" + s + "Z";
		};
		
		/**
		 * Converts a string form date into mm-dd hh:mm format
		 * @param  {string} strdt Date in string format (such as yyyymmddhhmm, yyyy-mm-dd hh:mm, etc)
		 * @return {string}       Date in mm-dd hh:mm format
		 * @memberOf  STX
		 */
		STX.mmddhhmm=function(strdt){
			var dt=STX.strToDateTime(strdt);
			var m=dt.getMonth()+1;
			if(m<10) m="0" + m;
			var d=dt.getDate();
			if(d<10) d="0" + d;
			var h=dt.getHours();
			if(h<10) h="0" + h;
			var mn=dt.getMinutes();
			if(mn<10) mn="0" + mn;
			if(h=="00" && mn=="00") return m + "-" + d + "-" + dt.getFullYear();
			return m + "-" + d + " " + h + ":" + mn;
		};
		
		/**
		 * Gets the current time in Eastern Time Zone. This can be used as a convenience for determining open and closing times of US markets.
		 * Note that this is hard coded for time zone and does not use the timezone library. If Daylight Savings Time is changed the this will
		 * need to be rewritten
		 * @return {date} JavaScript Date representing the time in Eastern Time Zone
		 * @memberOf  STX
		 */
		STX.getETDateTime=function(){
			var d=new Date();
			var localTime = d.getTime();
			var localOffset = d.getTimezoneOffset() * 60000;
			var utc = localTime + localOffset;
			var offset = -4;
			if((d.getMonth()<2 || (d.getMonth()==2 && d.getDate()<11)) || (d.getMonth()>10 || (d.getMonth()==10 && d.getDate()>=4)))
					offset = -5;
			var est = utc + (3600000*offset);
			var nd = new Date(est);
			return nd;
		};
		
		/**
		 * Converts a JavaScript date from Eastern Time Zone to the browser's local time zone. Daylight Savings Time is hard coded. @see STX.getETDateTime
		 * @param  {date} est JavaScript Date object representing a date/time in eastern time zone
		 * @return {date}     JavaScript Date object converted to browser's local time zone
		 * @memberOf  STX
		 */
		STX.fromET=function(est){
			var d=new Date();
			//var localTime = d.getTime();
			//var localOffset = d.getTimezoneOffset() * 60000;
			//var utc = localTime + localOffset;
			var offset = 4;
			if((d.getMonth()<2 || (d.getMonth()==2 && d.getDate()<11)) || (d.getMonth()>10 || (d.getMonth()==10 && d.getDate()>=4)))
					offset = 5;
			var localTime = est.getTime() + (3600000*offset);
			var nd = new Date(localTime);
			return nd;
		};
		
		/**
		 * Prints out a number in US Dollar monetary representation
		 * @param  {number} val      The amount
		 * @param  {number} [decimals=2] Optional number of decimal places.
		 * @return {string}          US Dollar monetary representation
		 * // Returns $100.00
		 * STX.money(100, 2);
		 * @memberOf  STX
		 */
		STX.money=function(val, decimals){
			if(!decimals && decimals!=0) decimals=2;
			return "$" + STX.commas((Math.round(val*10000)/10000).toFixed(decimals));
		};
		
		/**
		 * Returns a string representation of a number with commas in thousands, millions or billions places. Note that this function does
		 * not handle values with more than 3 decimal places!!!
		 * @param  {number} val The value
		 * @return {string}     The result with commas
		 * @example
		 * // Returns 1,000,000
		 * STX.commas(1000000);
		 * @memberOf  STX
		 */
		STX.commas=function(val){
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		};
		
		/**
		 * Gets an Ajax server dependent on browser method. If IE9 and a cross domain request then XDomainRequest() will be used
		 * rather than XMLHttpRequest.
		 * @param  {string} url The url to connect with
		 * @return {object}     An ajax server
		 * @memberOf  STX
		 */
		STX.getAjaxServer=function(url){
			var server=false;
			var crossDomain=true;
			if(STX.isIE9 && url){
				if(STX.getHostName(url)=="") crossDomain=false;
				if(STX.getHostName(url)==STX.getHostName(window.location.href)) crossDomain=false;
			}
			if(STX.isIE9 && crossDomain){
				server = new XDomainRequest();
				return server;
			}
			try{
				//All modern browsers (IE7+, Firefox, Chrome, Safari, and Opera) have a built-in XMLHttpRequest object.
				server = new XMLHttpRequest();
			}catch(e){
		/*		try{
					server = new ActiveXObject('Msxml2.XMLHTTP');
				}catch(e){
					try{
						server = new ActiveXObject('Microsoft.XMLHTTP');
					}catch(e){*/
						alert("ajax not supported in browser");
		//			}
		//		}
			}
			return server;
		};
		
		/**
		 * A parsed query string object
		 * @param  {string} [query] Query string. If not provided then the browser location's query string will be used
		 * @return {object}       An object containing the parsed values of the query string
		 * @memberOf  STX
		 */
		STX.qs=function(query) {
			var qsParm = new Array();
			if(!query) query = window.location.search.substring(1);
			var parms = query.split('&');
			for (var i=0; i<parms.length; i++) {
				var pos = parms[i].indexOf('=');
				if (pos > 0) {
					var key = parms[i].substring(0,pos);
					var val = parms[i].substring(pos+1);
					qsParm[key] = val;
				}else{
					var key = parms[i];
					qsParm[key] = null;
				}
			}
			return qsParm;
		};
		
		/**
		 * Converts an onClick event to an ontouchend event. If the device is known to be a touch device then this can be used
		 * to change onclick events that are set as attributes (in HTML). ontouchend events are more responsive than onclick events
		 * and can improve the user experience. When coding for cross-device implementations it is recommended to use @see STX.safeClickTouch
		 * programatically rather than using hardcoded attributes
		 * @param  {string} id The id of a node containing an onClick attribute
		 * @memberOf  STX
		 */
		STX.convertClickToTouchEnd=function(id){
			var node=$$(id);
			var s=node.getAttribute("onClick");
			if(s && s!=""){
				node.removeAttribute("onClick");
				node.setAttribute("onTouchEnd", s);
			}
		}
		
		/**
		 * Gets the absolute screen position of a nested DOM element. This is useful if you need to position additional elements or canvas
		 * elements relative to a nested DOM element.
		 * @param  {object} el A valid DOM element
		 * @return {object}    {x,y} absolute screen position of the nested element
		 * @memberOf  STX
		 */
		STX.getPos=function(el) {
		    for (var lx=0, ly=0;
		         el != null;
		         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
		    return {x: lx,y: ly};
		};
		
		/**
		 * Returns true if a point, in absolute screen position, is within an element
		 * @param  {object} node A valid DOM element to check whether the point overlaps
		 * @param  {number} x    Absolute screen X position of point
		 * @param  {number} y    Absolute screen Y position of pointer
		 * @return {boolean}      True if the point lies inside of the DOM element
		 * @memberOf  STX
		 */
		STX.withinElement=function(node, x, y){
			var xy=STX.getPos(node);
			if(x<xy.x) return false;
			if(y<xy.y) return false;
			if(x>xy.x+node.clientWidth) return false;
			if(y>xy.y+node.clientHeight) return false;
			return true;
		};
		
		/**
		 * Used in conjuction, safeMouseOut and safeMouseOver ensure just a single event when the mouse moves
		 * in or out of an element. This is important because simple mouseout events will fire when the mouse
		 * crosses boundaries *within* an element. Note that this function will do nothing on a touch device where
		 * mouseout is not a valid operation.
		 * @param  {object} node A valid DOM element
		 * @param  {function} fc   Function to call when the mouse has moved out
		 * @memberOf  STX
		 */
		STX.safeMouseOut=function(node, fc){
			function closure(node, fc){
				return function(e){
					if(STX.withinElement(node, e.pageX, e.pageY)){
						return;
					}
					node.stxMouseOver=false;
					fc(e);
				};
			};
			node.addEventListener("mouseout", closure(node, fc));
		};
		
		/**
		 * This method is guaranteed to only be called once when a user mouses over an object. @see STX#safeMouseOut
		 * @param  {object} node A valid DOM element
		 * @param  {function} fc   Function to call when mouse moves over the object
		 * @memberOf  STX
		 */
		STX.safeMouseOver=function(node, fc){
			function closure(node, fc){
				return function(e){
					if(STX.withinElement(node, e.pageX, e.pageY)){
						if(node.stxMouseOver) return;
						node.stxMouseOver=true;
						fc(e);
					}
				};
			};
			node.addEventListener("mouseover", closure(node, fc));
		};
		
		/**
		 * Fixes screen scroll. This can occur when the keyboard opens on an ipad or iphone.
		 * @memberOf  STX
		 */
		STX.fixScreen=function(){
			window.scrollTo(0,0);
		};
		
		/**
		 * Sets the position of the cursor within a textarea box. This is used for instance to position the cursor at the
		 * end of the text that is in a textarea.
		 * @param {object} ctrl A valid textarea DOM element
		 * @param {number} pos  The position in the text area to position
		 * @memberOf  STX
		 */
		STX.setCaretPosition=function(ctrl, pos){
			ctrl.style.zIndex=5000;
			if(ctrl.setSelectionRange){
				STX.focus(ctrl);
				try{
					ctrl.setSelectionRange(pos,pos);
				}catch(e){}
			}else if (ctrl.createTextRange) {
				var range = ctrl.createTextRange();
				range.collapse(true);
				range.moveEnd('character', pos);
				range.moveStart('character', pos);
				range.select();
			}
		};
		
		/**
		 * Appends a class name to a node if it isn't already there. This is frequently used to control dynamic behavior via CSS.
		 * @example
		 * // Apply an "active" css look to an object
		 * STX.appendClassName(myNode, "active");
		 * @param  {object} node      A valid DOM element
		 * @param  {string} className Name of class to add to the DOM element
		 * @memberOf  STX
		 */
		STX.appendClassName=function(node, className){
			if(node.className==className) return; // already a class
			var s=node.className.split(" ");
			for(var i in s){
				if(s[i]==className) return;	// already a class
			}
			if(node.className=="") node.className=className;
			else node.className+=" " + className;
		};
		
		/**
		 * Removes a class name from a node if it is set
		 * @param  {object} node      A valid DOM element
		 * @param  {string} className The class name to remove
		 * @memberOf  STX
		 */
		STX.unappendClassName=function(node, className){
			if(node.className.indexOf(className)==-1) return;
			if(node.className==className){
				node.className="";
			}else{
				var s=node.className.split(" ");
				var newClassName="";
				for(var i in s){
					if(s[i]==className) continue;
					if(newClassName!="") newClassName+=" ";
					newClassName+=s[i];
				}
				node.className=newClassName;
			}
		};
		
		/**
		 * Convenience method for swapping two class names within a node. Such as for changing state.
		 * @param  {object} node         A valid DOM element
		 * @param  {string} newClassName The class name to swap in
		 * @param  {string} oldClassName The class name to swap out
		 * @memberOf  STX
		 */
		STX.swapClassName=function(node, newClassName, oldClassName){
			STX.unappendClassName(node, oldClassName);
			STX.appendClassName(node, newClassName);
		};
		
		/**
		 * Returns true if a class name is currently assigned to the DOM node
		 * @param  {object}  node      A valid DOM element
		 * @param  {string}  className The class name to search for
		 * @return {Boolean}           True if the class name is currently assigned to the DOM node
		 * @memberOf  STX
		 */
		STX.hasClassName=function(node, className){
			if((" "+node.className+" ").indexOf(" "+className+" ")>-1) return true;
			else return false;
		};
		// Don't use, just for crosshairs
		var blocks=[];
		
		/**
		 * @deprecated
		 */
		STX.createDIVBlock=function(left, width, top, height){
			var block=document.createElement("div");
			block.style.position="fixed";
			block.style.left=left + "px";
			block.style.width=width + "px";
			block.style.top=top + "px";
			block.style.height=height + "px";
			document.body.appendChild(block);
			blocks[blocks.length]=block;
			return block;
		}
		
		/**
		 * Draws a rounded rectangle on the canvas.
		 * @param  {object} ctx    A valid HTML Canvas Context
		 * @param  {number} x      Left position of drawing on canvas
		 * @param  {number} y      Top position of drawing on canvas
		 * @param  {number} width  Width of rectangle
		 * @param  {number} height Height of rectangle
		 * @param  {number} radius Radius of rounding
		 * @param  {Boolean} [fill]   Whether to fill the background
		 * @param  {Boolean} [stroke] Whether to fill the outline
		 * @memberOf  STX
		 */
		STX.roundRect=function(ctx, x, y, width, height, radius, fill, stroke) {
			  if (typeof stroke == "undefined" ) {
			    stroke = true;
			  }
			  if (typeof radius === "undefined") {
			    radius = 5;
			  }
			  ctx.beginPath();
			  ctx.moveTo(x + radius, y);
			  ctx.lineTo(x + width - radius, y);
			  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
			  ctx.lineTo(x + width, y + height - radius);
			  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			  ctx.lineTo(x + radius, y + height);
			  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
			  ctx.lineTo(x, y + radius);
			  ctx.quadraticCurveTo(x, y, x + radius, y);
			  ctx.closePath();
			  if (stroke) {
			    ctx.stroke();
			  }
			  if (fill) {
			    ctx.fill();
			  }
		};
		
		/**
		 * Draws a rectange on the canvas with just the right side curved corners
		 * see {@link STX.roundRect}
		 * @memberOf  STX
		 */
		STX.semiRoundRect=function(ctx, x, y, width, height, radius, fill, stroke) {
			  if (typeof stroke == "undefined" ) {
			    stroke = true;
			  }
			  if (typeof radius === "undefined") {
			    radius = 5;
			  }
			  ctx.beginPath();
			  ctx.moveTo(x, y);
			  ctx.lineTo(x + width - radius, y);
			  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
			  ctx.lineTo(x + width, y + height - radius);
			  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			  ctx.lineTo(x, y + height);
			  ctx.lineTo(x, y);
			  ctx.closePath();
			  if (stroke) {
			    ctx.stroke();
			  }
			  if (fill) {
			    ctx.fill();
			  }
		};
		
		/**
		 * Turns a portion of raw text into multi-line text that fits in a given width. This is used for autoformatting of annotations
		 * @param  {object} ctx    A valid HTML Canvas Context
		 * @param  {string} phrase The text
		 * @param  {number} l      The width in pixels to fit the text within on the canvas
		 * @return {array}        An array of individual lines that should fit within the specified width
		 * @memberOf  STX
		 */
		STX.getLines=function(ctx,phrase,l) {
			var wa=phrase.split(" "), phraseArray=[], lastPhrase="", measure=0;
			var fw=false;
			for (var i=0;i<wa.length;i++) {
				var w=wa[i];
				measure=ctx.measureText(lastPhrase+w).width;
				if (measure<l) {
					if(fw) lastPhrase+=" ";
					fw=true;
					lastPhrase+=w;
				}else {
					phraseArray.push(lastPhrase);
					lastPhrase=w;
				}
				if (i===wa.length-1) {
					phraseArray.push(lastPhrase);
					break;
				}
			}
			return phraseArray;
		}
		
		/**
		 * Clears the canvas. Uses the fastest known method except on the legacy Android browser which had many problems!
		 * @param  {object} canvas A valid HTML canvas object
		 * @param  {object} [stx]    A chart object, only necessary for old Android browsers on problematic devices
		 * @memberOf  STX
		 */
		STX.clearCanvas=function(canvas, stx){
			canvas.context.clearRect(0, 0, canvas.width, canvas.height);
			if(STX.isAndroid && !STX.is_chrome){	// Android browser last remaining
													// one to need this clearing method
				if(STXChart.useOldAndroidClear && stx){
					canvas.context.fillStyle=stx.containerColor;
					canvas.context.fillRect(0, 0, canvas.width, canvas.height);
					canvas.context.clearRect(0, 0, canvas.width, canvas.height);
				}
				var w=canvas.width;
		    	canvas.width=1;
		    	canvas.width=w;
			}
		};
		
		/**
		 * User friendly alerts. The charting engine always uses this instead of alert() for warning or error messages. This
		 * method can be overriden as required by your user interface.
		 * @param  {string} text Alert message
		 * @example
		 * // Override with a friendlier alert mechanism!
		 * STX.alert=function(text){
		 * 	doSomethingElse(text);
		 * }
		 * @memberOf  STX
		 */
		STX.alert=function(text){
			alert(text);
		};
		
		/**
		 * @deprecated
		 */
		STX.horizontalIntersect=function(vector, x, y){
			if(x<Math.max(vector.x0, vector.x1) && x>Math.min(vector.x0, vector.x1)) return true;
			return false;
		};
		
		/**
		 * @deprecated
		 */
		STX.twoPointIntersect=function(vector, x, y, radius){
			return STX.boxIntersects(x-radius, y-radius, x+radius, y+radius, vector.x0, vector.y0, vector.x1, vector.y1, "segment");
		};
		
		/**
		 * @deprecated
		 */
		STX.boxedIntersect=function(vector, x, y){
			if(x>Math.max(vector.x0, vector.x1) || x<Math.min(vector.x0, vector.x1)) return false;
			if(y>Math.max(vector.y0, vector.y1) || y<Math.min(vector.y0, vector.y1)) return false;
			return true;
		};
		
		/**
		 * Returns true if a point, in relative screen position, is withing an element @see STX.withinElement
		 * @param  {object}  div A valid DOM element
		 * @param  {number}  x   X point relative to DOM element nesting
		 * @param  {number}  y   Y point relative to DOM element nesting
		 * @return {Boolean}     True if the point is in the element
		 * @memberOf  STX
		 */
		STX.isInElement=function(div, x, y){
			if(x<div.offsetLeft) return false;
			if(x>div.offsetLeft+div.clientWidth) return false;
			if(y<div.offsetTop) return false;
			if(y>div.offsetTop+div.clientHeight) return false;
			return true;
		};
		
		/**
		 * Set once after user is alerted that private browsing is enabled
		 * @memberOf  STX
		 */
		STX.privateBrowsingAlert=false;
		
		/**
		 * Convenience function for storing a name value pair in local storage. This will detect if private browsing is enabled
		 * because localStorage is inoperable under private browsing
		 * @param  {string} name  Name to store
		 * @param  {string} value Value to store
		 * @memberOf  STX
		 */
		STX.localStorageSetItem=function(name, value){
			try{
				localStorage.setItem(name, value);
			}catch(e){
				if(!STX.privateBrowsingAlert){
					STX.alert("Your browser is in Private Browsing mode. Chart annotations will not be saved.");
					STX.privateBrowsingAlert=true;
				}
			}
		};
		
		// The most complicated function ever written
		//
		// colorClick = the div that the user clicks on to pull up the color picker. The color picker will set the
		//              background of this to the selected color
		//
		// cpHolder = A global object that is used to contain the color picker and handle closures of the containing dialog.
		//
		// cb = Callback function for when the color is picked fc(color)
		
		/**
		 * Attaches a color picker to a DOM object.
		 * @param  {object}   colorClick The DOM element that the user clicks on to pull up the color picker. The color picker will set the background color of this node to the selected color.
		 * @param  {object}   cpHolder   A global object that is necessary to contain the color picker and handle closures. Usually the parent of colorClick.
		 * @param  {Function} cb         A callback function to call when the color is picked of format fc(color) where color is the selected color
		 * @memberOf  STX
		 */
		STX.attachColorPicker = function(colorClick, cpHolder, cb){
			var closure=function(colorClick, cpHolder, cb){
				return function(color){
					if(cpHolder.colorPickerDiv) cpHolder.colorPickerDiv.style.display="none";
					colorClick.style.backgroundColor="#"+color;
					if(cb) cb(color);
				};
			};
			colorClick.onclick=(function(fc, cpHolder){ return function(){
				if(cpHolder.colorPickerDiv==null){
					cpHolder.colorPickerDiv=document.createElement("DIV");
					cpHolder.colorPickerDiv.className="ciqColorPicker";
					document.body.appendChild(cpHolder.colorPickerDiv);
				}
				STX.createColorPicker(cpHolder.colorPickerDiv, fc);
				cpHolder.colorPickerDiv.style.display="block";
				var xy=STX.getPos(this);
				var x=xy.x+this.clientWidth;
				if((x+cpHolder.colorPickerDiv.offsetWidth)>STX.pageWidth())
					x-=(x+cpHolder.colorPickerDiv.offsetWidth)-STX.pageWidth()+20;
				cpHolder.colorPickerDiv.style.left=x+"px";
		
				var y=(xy.y);
				if(y+cpHolder.colorPickerDiv.clientHeight>STX.pageHeight())
					y-=(y+cpHolder.colorPickerDiv.clientHeight)-STX.pageHeight();
				cpHolder.colorPickerDiv.style.top=y+"px";
			};})(closure(colorClick, cpHolder, cb), cpHolder);
		};
		
		/**
		 * Creates the color picker node. Uses predefined colors that have been tested across multiple devices. These color
		 * values may be changed if desired.
		 * @private
		 * @memberOf  STX
		 */
		STX.createColorPicker = function (div, fc) {
			var colors=["ffffff","ffd0cf","ffd9bb","fff56c","eaeba3","d3e8ae","adf3ec","ccdcfa","d9c3eb",
						"efefef","eb8b87","ffb679","ffe252","e2e485","c5e093","9de3df","b1c9f8","c5a6e1",
						"cccccc","e36460","ff9250","ffcd2b","dcdf67","b3d987","66cac4","97b8f7","b387d7",
						"9b9b9b","dd3e39","ff6a23","faaf3a","c9d641","8bc176","33b9b0","7da6f5","9f6ace",
						"656565","b82c0b","be501b","e99b54","97a030","699158","00a99d","5f7cb8","784f9a",
						"343434","892008","803512","ab611f","646c20","46603a","007e76","3e527a","503567",
						"000000","5c1506","401a08","714114","333610","222f1d","00544f","1f2a3c","281a33"
		];
			STX.clearNode(div);
			var ul=document.createElement("ul");
			div.appendChild(ul);
			for(var i=0;i<colors.length;i++){
				var c=colors[i];
				var li=document.createElement("li");
				var a=document.createElement("a");
				li.appendChild(a);
				//a.href="#";
				a.title=c;
				a.style.background="#"+c;
				a.innerHTML=c;
				ul.appendChild(li);
				a.onclick=(function(c){ return function(){ fc(c);};})(c);
			}
		};
		
		/**
		 * Returns true if an object has no members
		 * @param  {object}  o A JavaScript object
		 * @return {Boolean}   True if there are no members in the object
		 * @memberOf  STX
		 */
		STX.isEmpty = function( o ) {
		    for ( var p in o ) {
		        if ( o.hasOwnProperty( p ) ) { return false; }
		    }
		    return true;
		};
		
		/**
		 * Convenience function returns the first property in an object. Note that while this works in all known browsers
		 * the EMCA spec does not guarantee that the order of members in an object remain static. This method should therefore
		 * be avoiding. When ordering is important use an Array!
		 * @param  {object} o A JavaSCript object
		 * @return {object}   The first element in the object or null if it is empty
		 * @memberOf  STX
		 */
		STX.first = function( o ) {
		    for ( var p in o ) {
		        return p;
		    }
		    return null;
		};
		
		/**
		 * Convenience function for returning the last property in an object. Note that while this works in all known browsers
		 * the EMCA spec does not guarantee that the order of members in an object remain static. This method should therefore
		 * be avoiding. When ordering is important use an Array!
		 * @param  {object} o A JavaScript object
		 * @return {object}   The final member of the object or null if the object is empty
		 * @memberOf  STX
		*/
		STX.last = function( o ) {
			var l=null;
		    for ( var p in o ) {
		        l=p;
		    }
		    return l;
		};
		
		/**
		 * Returns the number of members in an object
		 * @param  {object} o A valid JavaScript object
		 * @return {number}   The number of members in the object
		 * @memberOf  STX
		 */
		STX.objLength = function( o ) {
			var i=0;
		    for ( var p in o ) {
		        i++;
		    }
		    return i;
		};
		
		/**
		 * The Plotter is a device for managing complex drawing operations on the canvas. The HTML 5 canvas performs better when drawing
		 * operations of the same color are batched (reducing the number of calls to the GPU). The plotter allows a developer to store those
		 * operations in a normal control flow, and then have the Plotter deliver the primitives to the canvas. The plotter can also be used
		 * as a caching mechanism for performing the same operations repeatedly. The y-axis of the chart uses this mechanism to boost performance.
		 * @constructor
		 * @name  STX.Plotter
		 */
		STX.Plotter=function(){
			this.seriesArray=[];
			this.seriesMap={};
		};
		
		STX.Plotter.prototype={
			/**
			 * Define a series to plot. A series is a specific color and referenced by name
			 * @param {string} name         Name of series
			 * @param {boolean} strokeOrFill If true then a stroke operation, otherwise a fill operation
			 * @param {string} color        A valid canvas color
			 * @param {number} [opacity=1]      A valid opacity from 0-1
			 * @memberOf  STX.Plotter
			 */
				Series: function(name, strokeOrFill, color, opacity){
					this.name=name;
					this.strokeOrFill=strokeOrFill;
					this.color=color;
					this.opacity=opacity;
					this.moves=[];
					this.text=[];
					if(!opacity) this.opacity=1;
				},
				/**
				 * Create a series. This supports either a text color or STXChart.Style object
				 * @see  STX.Plotter.Series
				 * @memberOf  STX.Plotter
				 */
				newSeries: function(name, strokeOrFill, colorOrStyle, opacity){
					var series;
					if(colorOrStyle.constructor == String) series=new this.Series(name, strokeOrFill, colorOrStyle, opacity);
					else series=new this.Series(name, strokeOrFill, colorOrStyle["color"], colorOrStyle["opacity"]);
					this.seriesArray.push(series);
					this.seriesMap[name]=series;
				},
				/**
				 * @memberOf  STX.Plotter
				 */
				moveTo: function(name, x, y){
					var series=this.seriesMap[name];
					series.moves.push({"action":"moveTo","x":x,"y":y});
				},
				/**
				 * @memberOf  STX.Plotter
				 */
				lineTo: function(name, x, y){
					var series=this.seriesMap[name];
					series.moves.push({"action":"lineTo","x":x,"y":y});
				},
				/**
				 * @memberOf  STX.Plotter
				 */
				quadraticCurveTo: function(name, x0, y0, x1, y1){
					var series=this.seriesMap[name];
					series.moves.push({"action":"quadraticCurveTo","x0":x0, "y0":y0, "x1":x1, "y1":y1});
				},
				/**
				 * Add text to be rendered with the drawing. Primarily used when the Plotter is used for caching since there is no
				 * performance benefit from batching text operations to the GPU.
				 * @param {string} name Name of series
				 * @param {string} text The raw text to render
				 * @param {number} x    X position on canvas for text
				 * @param {number} y    Y position on canvas for text
				 * @memberOf  STX.Plotter
				 */
				addText: function(name, text, x, y){
					var series=this.seriesMap[name];
					series.text.push({"text":text,"x":x,"y":y});
				},
				/**
				 * Renders the text objects. This is done after drawing primitives for each series.
				 * @private
				 * @memberOf  STX.Plotter
				 */
				drawText: function(context, series){
					for(var i=0;i<series.text.length;i++){
						var textObj=series.text[i];
						context.fillText(textObj.text, textObj.x, textObj.y);
					}
				},
				/**
				 * Render the plotter. All of the stored operations are sent to the canvas. This operation stores and restores
				 * global canvas parameters such as fillStyle, strokeStyle and globalAlpha.
				 * @param  {object} context A valid HTML canvas context
				 * @param  {string} [name]    Optionally render only a specific series. If null or not provided then all series will be rendered.
				 * @memberOf  STX.Plotter
				 */
				draw: function(context, name){
					var prevFillStyle=context.fillStyle;
					var prevStrokeStyle=context.strokeStyle;
					var prevGlobalAlpha=context.globalAlpha;
					for(var i=0;i<this.seriesArray.length;i++){
						var series=this.seriesArray[i];
						if(name && series.name!=name) continue;
						context.beginPath();
						context.lineWidth=1;
						context.globalAlpha=series.opacity;
						context.fillStyle=series.color;
						context.strokeStyle=series.color;
						for(var j=0;j<series.moves.length;j++){
							var move=series.moves[j];
							if(move.action=="quadraticCurveTo"){
								(context[move.action])(move.x0, move.y0, move.x1, move.y1);
							}else{
								(context[move.action])(move.x, move.y);
							}
						}
						if(series.strokeOrFill=="fill"){
							context.fill();
						}else{
							context.stroke();
						}
						context.closePath();
						this.drawText(context, series);
					}
					context.fillStyle=prevFillStyle;
					context.strokeStyle=prevStrokeStyle;
					context.globalAlpha=prevGlobalAlpha;
				}
		};
		
		/**
		 * Microsoft RT disallows innerHTML that contains DOM elements. Use this method to override when necessary.
		 * @param  {object} node A valid DOM element to change innerHTML
		 * @param  {string} html The html text to change
		 * @example
		 * STX.innerHTML(node, "My innerHTML contains <span>a span</span> and MS RT doesn't like that");
		 * @memberOf  STX
		 */
		STX.innerHTML=function(node, html){
			if(window.MSApp){
				MSApp.execUnsafeLocalFunction(function (){
					node.innerHTML=html;
				});
			}else{
				node.innerHTML=html;
			}
		};
		
		/**
		 * Dynamically load UI elements from an external HTML file. This is accomplished by rendering raw HTML in an iframe
		 * and then cloning all of the newly created DOM elements into our main document. The iframe is then removed.
		 *
		 * The title of the iframe is checked. External content should *not* have a title. By convention, 404 or 500 errors
		 * have a title and so we use this to determine whether the iframe contains valid content or not.
		 * 
		 * @param  {string}   url The external url to fetch new UI content
		 * @param  {Function} cb  A callback function to call when the new UI is available
		 * @memberOf  STX
		 */
		STX.loadUI=function(url, cb){
			var i=document.createElement("iframe");
			i.src=url+"?" + STX.uniqueID();
			i.hidden=true;
			i.onload=(function(i){
				return function(){
					try{
						var iframeDocument = i.contentDocument || i.contentWindow.document;
					}catch(error){
						console.log(error);
						cb(error);
					}
					if(iframeDocument && iframeDocument.title==""){
						var html=iframeDocument.body.innerHTML;
						document.body.removeChild(i);
						var div=document.createElement("div");
						STX.innerHTML(div, html);
						for(var j=0;j<div.children.length;j++){
							var ch=div.children[j].cloneNode(true);
							document.body.appendChild(ch);
						}
						cb();
					}
				};
			})(i);
			document.body.appendChild(i);
		};
		
		/**
		 * Dashed line polyfill for the canvas. Note that dashed lines are expensive operations when not supported natively! @see CanvasRenderingContext2D.stxLine
		 */
		CanvasRenderingContext2D.prototype.dashedLineTo = function (fromX, fromY, toX, toY, pattern) {
			  // Our growth rate for our line can be one of the following:
			  // (+,+), (+,-), (-,+), (-,-)
			  // Because of this, our algorithm needs to understand if the x-coord and
			  // y-coord should be getting smaller or larger and properly cap the
				// values
			  // based on (x,y).
			  var lt = function (a, b) { return a <= b; };
			  var gt = function (a, b) { return a >= b; };
			  var capmin = function (a, b) { return Math.min(a, b); };
			  var capmax = function (a, b) { return Math.max(a, b); };
		
			  var checkX = { thereYet: gt, cap: capmin };
			  var checkY = { thereYet: gt, cap: capmin };
		
			  if (fromY - toY > 0) {
			    checkY.thereYet = lt;
			    checkY.cap = capmax;
			  }
			  if (fromX - toX > 0) {
			    checkX.thereYet = lt;
			    checkX.cap = capmax;
			  }
		
			  this.moveTo(fromX, fromY);
			  var offsetX = fromX;
			  var offsetY = fromY;
			  var idx = 0, dash = true;
			  while (!(checkX.thereYet(offsetX, toX) && checkY.thereYet(offsetY, toY))) {
			    var ang = Math.atan2(toY - fromY, toX - fromX);
			    var len = pattern[idx];
		
			    offsetX = checkX.cap(toX, offsetX + (Math.cos(ang) * len));
			    offsetY = checkY.cap(toY, offsetY + (Math.sin(ang) * len));
		
			    if (dash) this.lineTo(offsetX, offsetY);
			    else this.moveTo(offsetX, offsetY);
		
			    idx = (idx + 1) % pattern.length;
			    dash = !dash;
			  }
			};
		
		/**
		 * Convenience function for rendering lines of various types on the canvas. Pattern should be an array that contains
		 * the number of pixels on and then the number of pixels off. For instance [1,1] would create a dotted pattern by turning
		 * one pixel on and then one pixel off repeatedly.
		 */
		CanvasRenderingContext2D.prototype.stxLine = function (fromX, fromY, toX, toY, color, opacity, lineWidth, pattern) {
			this.beginPath();
			this.lineWidth=lineWidth;
			this.strokeStyle=color;
			this.globalAlpha=opacity;
			if(pattern){
				this.dashedLineTo(fromX, fromY, toX, toY, pattern);
			}else{
				this.moveTo(fromX, fromY);
				this.lineTo(toX, toY);
			}
			this.stroke();
			this.closePath();
		};
		
		/**
		 * Add native circle drawing to the canvas
		 * @param  {number} x      X position of center of circle
		 * @param  {number} y      Y position of center of circle
		 * @param  {number} radius Radius of circle
		 * @param  {boolean} filled If true then circle will be filled
		 */
		CanvasRenderingContext2D.prototype.stxCircle = function(x, y,radius, filled){
			this.beginPath();
			this.arc(x, y, radius, 0, 2* Math.PI, false);
			if(filled) this.fill();
			this.stroke();
			this.closePath();
		};
		
		/**
		 * Creates a box on the canvas with containing text (a label)
		 * @param  {number} x     Left position of label
		 * @param  {number} y     Top position of label
		 * @param  {string} text  Text to print in the label
		 * @param  {object} stx   Chart object
		 * @param  {string} style Class name from which style should be applied
		 * @memberOf  STX
		 */
		STX.textLabel = function (x, y, text, stx, style) {
			stx.canvasFont(style);
			//var m=stx.chart.context.measureText(text);
			var fontHeight=stx.getCanvasFontSize(style);
			var s=stx.canvasStyle(style);
			var context=stx.chart.context;
			var arr=text.split("\n");
			var maxWidth=0;
			for(var i in arr){
				var m=stx.chart.context.measureText(arr[i]);
				if(m.width>maxWidth) maxWidth=m.width;
			}
			var height=arr.length*fontHeight;
			context.textBaseline="alphabetic";
			context.strokeStyle=s["border-left-color"];
			context.fillStyle=s["background-color"];
			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(x+maxWidth+10, y);
			context.lineTo(x+maxWidth+10, y+height+2);
			context.lineTo(x, y+height+2);
			context.lineTo(x, y);
			context.stroke();
			context.fill();
			context.closePath();
			context.strokeStyle=s["color"];
			context.fillStyle=s["color"];
			context.textBaseline="top";
			var y1=0;
			for(var i in arr){
				context.fillText(arr[i], x+5, y+y1+1);
				y1+=fontHeight;
			}
		};
		
		/**
		 * Microsoft surface bug requires a timeout in oreder for the cursor to show up in a focused
		 * text box. iPad also, sometimes, when embedded in an iframe, so set useTimeout if in an iframe!
		 * @param  {object} node       A DOM element to focus
		 * @param  {boolean} useTimeout Whether to apply a timeout or not
		 * @memberOf  STX
		 */
		STX.focus = function (node, useTimeout){
			if(STX.isSurface || useTimeout){
				setTimeout(function(){node.focus();}, 0);
			}else{
				node.focus();
			}
		};
		
		/**
		 * Find all nodes that match the given text. This is a recursive function so be careful not to start too high in the DOM tree.
		 * @param  {object} startNode A valid DOM element from which to start looking
		 * @param  {string} text      The text to search for
		 * @return {array}           An array of nodes that match the text
		 * @memberOf  STX
		 */
		STX.findNodesByText = function(startNode, text){
			if(startNode.innerHTML==text) return [startNode];
			var nodes=[];
			for(var i=0;i<startNode.childNodes.length;i++){
				var pushNodes=STX.findNodesByText(startNode.childNodes[i], text);
				if(pushNodes!=null){
					nodes=nodes.concat(pushNodes);
				}
			}
			if(nodes.length) return nodes;
			return null;
		};
		
		/**
		 * Hide nodes that match a certain text string.
		 * @param  {object} startNode A valid DOM element from which to start looking
		 * @param  {string} text      The text to match against
		 * {@link  STX.findNodesByText}
		 * @memberOf  STX
		 */
		STX.hideByText = function(startNode, text){
			var nodes=STX.findNodesByText(startNode, text);
			for(var i=0;i<nodes.length;i++){
				nodes[i].style.display="none";
			}
		};
		
		/**
		 * Get the X intersection point between two lines
		 * @memberOf  STX
		 */
		STX.intersectLineLineX = function(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2) {
		
		    var ua_t = (bx2 - bx1) * (ay1 - by1) - (by2 - by1) * (ax1 - bx1);
		    var u_b  = (by2 - by1) * (ax2 - ax1) - (bx2 - bx1) * (ay2 - ay1);
		
		    var ua = ua_t / u_b;
		
		    return ax1 + ua * (ax2 - ax1);
		};
		
		/**
		 * Get the Y intersection point between two lines
		 * @memberOf  STX
		 */
		STX.intersectLineLineY = function(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2) {
		
		    var ua_t = (bx2 - bx1) * (ay1 - by1) - (by2 - by1) * (ax1 - bx1);
		    var u_b  = (by2 - by1) * (ax2 - ax1) - (bx2 - bx1) * (ay2 - ay1);
		
		    var ua = ua_t / u_b;
		
		    return ay1 + ua * (ay2 - ay1);
		};
		
		/**
		 * Sets the transparent parts of the canvas to the specified background color. Used to ensure a background when turning charts into images
		 * because normally the background is the background of the DIV container and not the canvas itself.
		 * @param  {object} context An HTML canvas context
		 * @param  {string} color   The color to set the background. Any valid HTML canvas color.
		 * @param  {number} width   Width to apply color (Could be less than size of canvas)
		 * @param  {number} height  Height to apply color (Could be less than size of canvas if applying branding for instance)
		 * @memberOf  STX
		 */
		STX.fillTransparentCanvas = function(context, color, width, height){
			var compositeOperation = context.globalCompositeOperation;
			context.globalCompositeOperation = "destination-over";
			context.fillStyle = color;
			context.fillRect(0,0,width,height);
			context.globalCompositeOperation = compositeOperation;
		};
		
		/**
		 * Creates a string with a periodicity that is easy to read given a chart
		 * @param  {object} stx A chart object
		 * @return {string}     A periodicity value that can be displayed to an end user
		 * @memberOf  STX
		 */
		STX.readablePeriodicity=function(stx){
			var displayPeriodicity=stx.layout.periodicity;
			var displayInterval=stx.layout.interval;
			if(!stx.isDailyInterval(displayInterval)){
				if(stx.layout.interval!="minute"){
					displayPeriodicity=stx.layout.interval*stx.layout.periodicity;
				}
				displayInterval="min";
			}
			if(displayPeriodicity%60==0){
				displayPeriodicity/=60;
				displayInterval="hour";
			}
			return displayPeriodicity + " " + displayInterval.capitalize();
		};
		
		/**
		 * @callback requestCallback
		 * @param {number} status HTTP status
		 * @param {string} response HTTP response
		 */
		/**
		 * Convenience function for making an ajax post. If payload is non-null then the method will be set to POST, otherwise GET. Cross origin
		 * ajax is support on IE9.
		 * @param  {string}   url         The url to send the ajax query to
		 * @param  {string}   payload     An optional payload to send
		 * @param  {requestCallback} cb          Callback function when complete
		 * @param  {string}   contentType Optionally override the content type
		 * @param  {boolean}   noEpoch     By default the epoch is appended as a query string to bust caching. Set this to false to not append the epoch.
		 * @memberOf  STX
		 */
		STX.postAjax=function(url, payload, cb, contentType, noEpoch){
			var server=STX.getAjaxServer(url);
			if(!server) return false;
			var epoch=new Date();
			if(!noEpoch){
				if(url.indexOf('?')==-1) url+="?" + epoch.getTime();
				else url+="&" + epoch.getTime();
			}
			if(!STX.isIE9){
				server.open(payload?"POST":"GET", url, true);
				if(!contentType) contentType='application/x-www-form-urlencoded';
				if(payload) server.setRequestHeader('Content-Type', contentType);
			}else{
				url=url.replace("https","http");
				server.open(payload?"POST":"GET", url, true);
				server.onload=function(){
					cb(200, server.responseText);
				};
				server.onerror=function(){
					cb(0, null);
				};
				server.onprogress=function(){};
			}
			server.onreadystatechange=function(){
				if(server.readyState==4){
					if(server.status==404){
						cb(server.status, null);
					}else if(server.status!=200){
						cb(server.status, server.responseText);
					}else{
						// Optional code for processing headers. Doesn't work for IE9
						/*var headerString=server.getAllResponseHeaders();
						var headerArray=headerString.split("\n");
						var headers={};
						for(var i=0;i<headerArray.length;i++){
							var split=headerArray[i].split(":");
							if(split[1] && split[1].charAt(0)==' ') split[1]=split[1].substring(1);
							if(split[0]!="")
							headers[split[0]]=split[1];
						}*/
						cb(200, server.responseText);
					}
				}
			};
			try{
				server.send(payload);
			}catch(e){
				cb(0, e);
			}
			return true;
		};
		
		/**
		 * Returns the log base 10 of a value
		 * @param  {number} y The value
		 * @return {number}   log10 value
		 * @memberOf  STX
		 */
		STX.log10=function(y){
			return Math.log(y)/Math.LN10;
		};
		
		// getComputedStyle polyfill for older browsers such as IE8
		if (!window.getComputedStyle) {
			window.getComputedStyle = function(el, pseudo) {
				var style = {};
				for(var prop in el.currentStyle){
					style[prop]=el.currentStyle[prop];
				}
				style.getPropertyValue = function(prop) {
					var re = /(\-([a-z]){1})/g;
					if (prop == 'float') prop = 'styleFloat';
					if (re.test(prop)) {
						prop = prop.replace(re, function () {
							return arguments[2].toUpperCase();
						});
					}
					return this[prop] ? this[prop] : null;
				};
				return style;
			};
		}
		
		// Array.indexOf polyfill
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function(obj, start) {
			    for (var i = (start || 0), j = this.length; i < j; i++) {
			        if (this[i] === obj) { return i; }
			    }
			    return -1;
			};
		}
		
		/**
		 * Convenience function for dynamically creating a new node and appending it into the DOM.
		 * @param  {object} div       The targeted parent node
		 * @param  {string} tagName   The type of node to be created
		 * @param  {string} [className] Optional class name to set the new node
		 * @return {object}           The new node
		 * @memberOf  STX
		 */
		STX.newChild=function(div, tagName, className){
			var div2=document.createElement(tagName);
			if(className) div2.className=className;
			div.appendChild(div2);
			return div2;
		};
		
		STX.androidDoubleTouch=null;
		
		/**
		 * Sets click or touch events depending on the device
		 * @deprecated  Use STX.safeClickTouch instead
		 */
		STX.clickTouch=function(div, fc){
			// Annoyingly, Android default browser sometimes registers onClick events twice, so we ignore any that occur
			// within a half second
			function closure(div, fc){
				return function(e){
					if(STX.androidDoubleTouch==null){
						STX.androidDoubleTouch=new Date().getTime();
					}else{
						if(new Date().getTime()-STX.androidDoubleTouch<500) return;
						STX.androidDoubleTouch=new Date().getTime();
					}
					(fc)(e);
				};
			}
			if(STX.ipad || STX.iphone){
				div.ontouchend=fc;
			}else{
				if(STX.isAndroid){
					div.onclick=closure(div, fc);
				}else{
					div.onclick=fc;
				}
			}
		};
		
		/*
		 * Use this instead of onclick or ontouch events. This function will automatically use the quickest available
		 * but also protect against being called twice. The click event resets based on the number of milliseconds.
		 * By default any previous safeClickTouch listeners will be cleared (to allow re-use of the element).
		 * @param {object} div The DOM element to attach an event
		 * @param {Function} fc The function to call when the object is pressed
		 * @param {object} params Parameters to drive behavior.
		 * @param {number} [params.resetMS=750] Number of milliseconds to wait for a reset. Should be at least 500.
		 * @param {object} [params.safety] An optional object, generated from a STX.safeDrag association to prevent the click from being triggered when a drag operation is released
		 * @param {boolean} [params.allowMultiple=false] If set then multiple click events can be associated with the node
		 * @memberOf  STX
		 */
		STX.safeClickTouch=function(div, fc, params){
			if(!params) params={};
			if(!params.resetMS) params.resetMS=750;
			var possibleEvents=(("onclick" in window)?1:0) + (("ontouchend" in window)?1:0) + (("onpointerup" in window)?1:0);
			if(possibleEvents<=1) params.resetMS=0;	// Since only one type of event is active then we can behave normally
		
			if(!params.allowMultiple) STX.clearSafeClickTouches(div);
			params.registeredClick=false;
			function closure(which, params){
				return function(e){
					if(params.registeredClick) return;
					if(params.safety && params.safety.recentlyDragged) return;
					params.registeredClick=true;
					setTimeout(function(){
						params.registeredClick=false;
					}, params.resetMS);
					(fc)(e);
				};
			}
			var fc1=closure("click", params);
			var fc2=closure("touchend", params);
			var fc3=closure("pointerup", params);
			if("onclick" in window) div.addEventListener("click", fc1);
			if("ontouchend" in window) div.addEventListener("touchend", fc2);
			if("onpointerup" in window) div.addEventListener("pointerup", fc3);
			if(!div.safeClickTouchEvents) div.safeClickTouchEvents=[];
			div.safeClickTouchEvents.push({"click":fc1,"touchend":fc2,"pointerup":fc3});
		};
		
		/**
		 * Clears all safeClickTouch events from a DOM element.
		 * @param  {object} div The DOM element to clear events
		 * @memberOf  STX
		 */
		STX.clearSafeClickTouches=function(div){
			if(!div.safeClickTouchEvents) return;
			for(var i=0;i<div.safeClickTouchEvents.length;i++){
				var fc=div.safeClickTouchEvents[i];
				if("onclick" in window) div.removeEventListener("click", fc.click);
				if("ontouchend" in window) div.removeEventListener("touchend", fc.touchend);
				if("onpointerup" in window) div.removeEventListener("pointerup", fc.pointerup);
			}
			div.safeClickTouchEvents=null;
		};
		
		/**
		 * Safe function to handle dragging of objects on the screen. This method is cross-device aware and can handle mouse or touch drags.
		 * This method does not actually move the objects but provides callbacks that explain when drag operations
		 * begin and cease, and what movements are made during the drag. Callbacks should be used to move the actual objects
		 * (if it is desired to move objects during a drag operation). For convenience, displacementX and displacementY are added to callback events
		 * to indicate the distance from the original starting point of the drag.
		 * A "safety" object is returned which can optionally be passed into STX.safeClickTouch to prevent errant click events
		 * from being triggered when a user lets go of a drag
		 * @param  {object} div    The draggable DOM element
		 * @param  {function} [fcDown] Callback function when a drag operation begins. Receives an event object.
		 * @param  {function} [fcMove] Callback function when a drag move occurs. Receives an event object.
		 * @param  {function} [fcUp]   Callback function when the drag operation ends. Receives an event object.
		 * @return {object}        Safety object which can be passed to STX.safeClickTouch
		 * @memberOf  STX
		 */
		STX.safeDrag=function(div, fcDown, fcMove, fcUp){
			var resetMS=100;	// To avoid multiple down events only one can occur per 100ms
			var registeredClick=false;
			var startX=0, startY=0;
			var safety={
				recentlyDragged: false
			};
			function closure(moveEvent){
				var fmap={
					"mousedown": {"move":"mousemove", "up": "mouseup"},
					"pointerdown": {"move":"pointermove", "up": "pointerup"},
					"touchstart": {"move":"touchmove", "up": "touchend"}
				};
				function pageX(e){
					if(e.touches){
						if(e.touches.length>=1){
							return e.touches[0].pageX;
						}else if(e.changedTouches && e.changedTouches.length>=1){
							return e.changedTouches[0].pageX;
						}
					}
					return e.pageX;
				};
				function pageY(e){
					if(e.touches){
						if(e.touches.length>=1){
							return e.touches[0].pageY;
						}else if(e.changedTouches && e.changedTouches.length>=1){
							return e.changedTouches[0].pageY;
						}
					}
					return e.pageY;
				};
				return function(e){
					if(registeredClick) return;
					registeredClick=true;
					STXChart.ignoreTouch=true;
					var moveFC=function(e){
						if(e && e.preventDefault) e.preventDefault();
						safety.recentlyDragged=true;
						e.displacementX=pageX(e)-startX;
						e.displacementY=pageY(e)-startY;
						(fcMove)(e); // Call the move event
					};
					if(fcMove) document.body.addEventListener(fmap[moveEvent].move, moveFC);
					document.body.addEventListener(fmap[moveEvent].up, function(e){	// Create an up listener on the body
						STXChart.ignoreTouch=false;
						if(fcMove) document.body.removeEventListener(fmap[moveEvent].move, moveFC);	// Remove the move listener since our move is now complete
						document.body.removeEventListener(fmap[moveEvent].up, arguments.callee);	// Remove the up listener since our move is now complete
						e.displacementX=pageX(e)-startX;
						e.displacementY=pageY(e)-startY;
						if(fcUp) (fcUp)(e); // Call the up event
						setTimeout(function(safety){ return function(){safety.recentlyDragged=false;};}(safety), 50);	// Prevent errant clicks from touch letting go
					});
					setTimeout(function(){
						registeredClick=false;
					}, resetMS);
					startX=pageX(e); startY=pageY(e);
					if(fcDown) (fcDown)(e);
				};
			}
			div.addEventListener("mousedown", closure("mousedown"));
			div.addEventListener("pointerdown", closure("pointerdown"));
			div.addEventListener("touchstart", closure("touchstart"));
			return safety;
		};
		
		/**
		 * Loads JavaScript dynamically. This method keeps a static memory of scripts that have been loaded
		 * to prevent them from being loaded twice. The callback function however is always called, even if
		 * the script has already been loaded.
		 * @param  {string}   scriptName The url of the script to load
		 * @param  {Function} cb         Callback function to call when the script is loaded
		 * @memberOf  STX
		 */
		STX.loadScript=function(scriptName, cb){
			if(!STX.loadedScripts) STX.loadedScripts={};
			if(STX.loadedScripts[scriptName]){
				if(cb) cb();
				return;
			}
			var script=document.createElement("SCRIPT");
			script.async = true;
			script.onload=function(){
				STX.loadedScripts[scriptName]=true;
				if(cb) cb();
			};
			var uniqueName=scriptName;
			// Use the epoch to create a unique query string, which will force the browser to reload
			if(uniqueName.indexOf("?")==-1){
				//uniqueName=uniqueName+"?" + Date.now();
			}else{
				uniqueName=uniqueName+"&" + Date.now();
			}
			script.src = uniqueName;
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(script, s.nextSibling);
		};
		/**
		 * Loads a feature function widget. Feature function widgets consist of a css file, a JS file and an HTML file. This can
		 * be used to dynamically load content and functionality.
		 * @param  {string}   widget Name of widget. The js, css and html files should be this name.
		 * @param  {Function} cb     Function to call when the widget is fully loaded
		 * @memberOf  STX
		 */
		STX.loadWidget=function(widget, cb){
			var lnk=document.createElement("link");
			lnk.rel="stylesheet";
			lnk.type="text/css";
			lnk.media="screen";
			lnk.href=widget + ".css";
			var links=document.getElementsByTagName("link");
			var lastLink=links[links.length-1];
			lastLink.parentNode.insertBefore(lnk, lastLink.nextSibling);
			STX.loadUI(widget + ".html", function(err){
				if(err) cb(err);
				else STX.loadScript(widget+".js", cb);
			});
		
		};
		
		/*
		 * This method will return an tuple [min,max] that contains the minimum
		 * and maximum values in the series where values are series[field]
		 * @param {Array} series The series
		 * @param {string} field The name of the field to look at
		 * @return {Array} Tuple containing min and max values in the series
		 * @memberOf  STX
		 */
		STX.minMax=function(series, field){
		    var min=2000000000;
		    var max=-2000000000;
		    for(var i=0;i<series.length;i++){
		    	var entry=series[i];
		    	if(!entry) continue;
		        var val=entry[field];
		        if(!val && val!=0) continue;
		        if(isNaN(val)) continue;
		        min=Math.min(min, val);
		        max=Math.max(max, val);
		    }
		    return [min,max];
		};
		
		/*
		 * This method will iterate through the object and replace all of the fields
		 * using the mapping object. This would generally be used to compress an object
		 * for serialization. so that for instance "lineWidth" becomes "lw". This method
		 * is called recursively.
		 * @param {object} obj Object to compress
		 * @param {object} mapping Object containing name value pairs. Each name will be replaced with its corresponding value in the object.
		 * @return {object} The newly compressed object
		 * @memberOf  STX
		 */
		STX.replaceFields=function(obj, mapping){
			var newObj={};
			for(var field in obj){
				var value=obj[field];
				var replaced=mapping[field];
				if(!replaced) replaced=field;
				if(value!=null && typeof value=="object"){
					if(value.constructor==Array){
						var arr=newObj[replaced]=new Array(value.length);
						for(var i=0;i<arr.length;i++){
							var val=value[i];
							if(typeof val=="object"){
								arr[i]=STX.replaceFields(val, mapping);
							}else{
								arr[i]=val;
							}
						}
					}else{
						newObj[replaced]=STX.replaceFields(value, mapping);
					}
				}else{
					newObj[replaced]=value;
				}
			}
			return newObj;
		};
		
		/**
		 * This method reverses the fields and values in an object
		 * @memberOf  STX
		 */
		STX.reverseObject=function(obj){
			var newObj={};
			for(var field in obj){
				newObj[obj[field]]=field;
			}
			return newObj;
		};
		
		/**
		 * Captures enter key events. Also clears the input box on escape key.
		 * @param {object} node The DOM element to attach the event to. Should be a text input box.
		 * @param {Function} cb Callback function when enter key is pressed.
		 * @memberOf  STX
		 */
		
		STX.inputKeyEvents=function(node, cb){
		    node.addEventListener("keyup", function(e){
			    var key = (window.event) ? event.keyCode : e.keyCode;
			    switch(key){
				    case 13:
					    cb();
					    break;
		            case 27:
		                node.value="";
		                break;
				    default:
					    break;
			    }
		    }, false);
		};
		
		/**
		 * Namespace for Internationalization API
		 * @namespace
		 * @name STX.I18N
		 */
		STX.I18N=function(){}
		
		// Hack code to make a multi line string easy cut & paste from a spreadsheet
		STX.I18N.hereDoc=function(f){
			return f.toString().replace(/^[^\/]+\/\*!?/,'').replace(/\*\/[^\/]+$/,'');
		};
		
		// Paste translation spreadsheet in between the comment tags. Make sure no leading tabs, trailing commas or spaces!
		STX.I18N.csv=STX.I18N.hereDoc(function(){/*!en,ar,fr,de,hu,it,pu,ru,es,zh,ja
		Chart,الرسم البياني,Graphique,Darstellung,Diagram,Grafico,Gráfico,График,Gráfica,图表,チャート
		Chart Style,أسلوب الرسم البياني,Style de graphique,Darstellungsstil,Diagram stílusa,Stile grafico,Estilo do gráfico,Тип графика,Estilo de gráfica,图表类型,チャート形式
		Candle,الشموع,Bougie,Kerze,Gyertya,Candela,Vela japonesa,Свеча,Vela,蜡烛,ローソク足
		Bar,الأعمدة,Barre,Balken,Sáv,Barra,Barras,Бар,Barra,直线,棒
		Bars,الأعمدة,Barre,Balken,Sáv,Barra,Barras,Бар,Barra,直线,棒
		Colored Bar,الأعمدة الملونة,Barre en couleur,Farbiger Balken,Színes sáv,Barra colorata,Barras coloridas,Цветной бар,Barra de color,彩线,カラー棒
		Line,الخطوط,Ligne,Linie,Vonal,Linea,Linha,Линия,Línea,曲线,線
		Hollow Candles,الشموع المفرغة,Bougies creuses,Hohlkerzen,Üres gyertyák,Candele Vuote,Vela vazia,Пустые свечи,Velas huecas,空心蜡烛,陽線ローソク足
		Chart Scale,مقياس الرسم البياني,Échelle du graphique,Darstellungsskala,Diagram beosztás,Scala Grafico,Escala do gráfico,Шкала графика,Escala de la gráfica,图表尺度,チャート目盛
		Log Scale,المقياس اللوغارتمي,Logarithmique,Log-Skala,Logaritmikus beosztás,Scala Log,Logarítmica,Лог. шкала,Logaritmo,对数尺度,対数目盛
		Clear Drawings,مسح الرسومات,Éliminer les graphiques,Deutliche Zeichnungen,Ábrák törlése,Cancella Disegni,Limpar desenhos,Удалить изображения,Eliminar los dibujos,清空图示,描画をクリア
		Studies,دراسات,Études,Studien,Elemzések,Studi,Estudos,Моделирование,Estudios,研究,スタディ
		Timezone,المنطقة الزمنية,Plage horaire,Zeitzone,Időzóna,Fuso orario,Fuso horário,Часовой пояс,Zona horaria,时区,タイムゾーン
		Change Timezone,تغيير المنطقة الزمنية,Modifier la plage horaire,Zeitzone ändern,Időzóna módosítása,Cambia fuso orario,Alterar fuso horário,Изменить часовой пояс,Cambiar zona horaria,更改时区,タイムゾーンの変更
		Default Themes,الأنساق الافتراضية,Modèles de graphiques par défaut,Standardlayouts,Alapértelmezett témák,Temi di default,Temas padrão,Исходные темы,Temas predeterminados,默认主题,既定のテーマ
		White,أبيض,Blanc,Weiß,Fehér,Bianco,Branco,Белая,Blanco,白色,白
		Black,أسود,Noir,Schwarz,Fekete,Nero,Preto,Черная,Negro,黑色,黒
		Custom Themes,أنساق مخصصة,Modèles personnalisés,Individuelle Layouts,Egyedi témák,Personalizza temi,Temas personalizados,Пользовательские темы,Temas personalizados,自定义主题,カスタムテーマ
		New Custom Theme,نسق جديد مخصص,Nouveau modèle personnalisé,Neue individuelle Layouts,Új egyedi téma,Nuovo Tema Personalizzato,Novo tema personalizado,Создать пользовательскую тему,Nuevo tema personalizado,新自定义主题,新規カスタムテーマ
		Select Tool,حدد أداة,Sélectionner,Werkzeug,Eszköz,Seleziona,Selecionar,Выбор,Seleccionar,选择工具,ツールの選択
		None,لا شيء,Aucune,Keines,Egyik sem,Nessuno,Nenhuma,Без,Ninguna,无,なし
		Crosshairs,علامات \"+\",Croix,Fadenkreuze,Célkeresztek,Mirini,Mira,Перекрестья,Cruz visor,十字线,十字
		Annotation,تعليق توضيحي,Annotation,Anmerkung,Magyarázat,Annotazione,Anotação,Примечание,Anotación,注释,注釈
		Horizontal,أفقي,Horizontal,Horizontal,Vízszintes,Orizzontale,Horizontal,Горизонт.,Horizontal,水平,水平
		Segment,قطاع,Segment,Segment,Szegmens,Segmento,Segmento,Сегмент,Segmento,细分,区切り
		Fill,التعبئة,Remplir,Füllen,Kitöltés,Riempimento,Preenchimento,Заливка,Relleno,填充,塗りつぶし
		Line,خط,Ligne,Linie,Vonal,Linea,Linha,Линия,Línea,线条,線
		save,حفظ,Sauvegarder,speichern,mentés,salva,guardado,сохранение,guardar,存档,保存
		cancel,إلغاء,Annuler,abbrechen,mégse,annulla,cancelamento,отмена,cancelar,取消,キャンセル
		Close,إغلاق,Fermer,Schließen,Bezárás,Chiudi,Fecho,Закрыть,Cerrar,关闭,閉じる
		Create,إنشاء,Créer,Erstellen,Létrehozás,Crea,Criação,Создать,Crear,创建,新規作成
		Show Zones,عرض المناطق,Afficher des zones,Zonen anzeigen,Zónák megjelenítése,Mostra Zone,Mostrar zonas,Показать зоны,Mostrar zonas,显示区域,ゾーンの表示
		OverBought,مُبَالَغ في الشراء,Suracheté,Überkauft,Túlvásárolt,Ipercomprato,Sobrecompra,OverBought (перекупленность),Exceso compra,超买,買い持ち
		OverSold,مُبَالَغ في البيع,Survendu,Überverkauft,Túlértékesített,Ipervenduto,Sobrevenda,OverSold (перепроданность),Exceso venta,超卖,売り持ち
		Choose Timezone,اختر منطقة زمنية,Choisir la plage horaire,Zeitzone wählen,Időzóna kiválasztása,Scegli Fuso orario,Escolher o fuso horário,Выбор врем. пояса,Elegir zona horaria,选择时区,タイムゾーンの選択
		Create a New Custom Theme,إنشاء نسق جديد,Créer un nouveau modèle personnalisé,Neues individuelles Layout erstellen,Új egyedi téma létrehozása,Crea Nuovo Tema Personalizzato,Criar novo tema personalizado,Создать новую пользовательскую тему,Crear un nuevo tema personalizado,创建新的自定义主题,カスタムテーマの新規作成
		Candles,شموع,Bougies,Kerzen,Gyertyák,Candele,Velas,Свечи,Velas,蜡烛,ローソク足
		Border,الحدود,Ligne frontière,Rand,Szegély,Margine,Limite,Контур,Borde,边框,境界
		Background,الخلفية,Contexte,Hintergrund,Háttér,Sfondo,Fundo,Фон,Fondo,背景,背景
		Grid Lines,خطوط الشبكة,Lignes de quadrillage,Gitterlinien,Rácsvonalak,Griglia,Linhas grelha,Линии сетки,Líneas de cuadrícula,网格线,グリッド線
		Date Dividers,فواصل التاريخ,Caractères de séparation,Datentrenner,Dátumelválasztók,Divisori Data,Divisores de data,Раздел. полей дат,Divisores de fecha,日期分隔符,日付区切り
		Axis Text,بيان المحاور,Titres des axes,Achsentext,Tengely szövege,Testo Asse,Texto eixo,Название оси,Texto del eje,轴标题,軸ラベル
		New Theme Name,اسم النسق الجديد,Nom du nouveau modèle,Neuer Layoutname,Új téma neve,Nome Nuovo Tema,Novo nome do tema,Название темы,Nombre del nuevo tema,新主题名称,新規テーマ名
		Save Theme,حفظ النسق,Sauvegarder,Speichern,Téma mentése,Salva Tema,Guardar,Сохранить,Guardar,保存主题,テーマの保存
		CURRENCIES,العملات,DEVISES,DEVISEN,DEVIZÁK,VALUTE,MOEDAS,ВАЛЮТЫ,DIVISAS,货币,通貨
		right-click to delete,انقر بزر الماوس الأيمن لحذف,Faites un clic droit pour supprimer,Rechts klicken um zu löschen,kattintson jobb gombbal az egér hogy törölni,destro del mouse per cancellare,Botão direito do mouse para apagar,Щелкните правой кнопкой мыши чтобы удалить,botón derecho para borrar,右键单击鼠标删除,削除するには、右クリック
		*/});
		
		/**
		 * @memberOf  STX.I18N
		 * @type {String}
		 */
		STX.I18N.language="en";
		/**
		 * @memberOf  STX.I18N
		 * @type {Object}
		 */
		STX.I18N.longMonths={"zh":true,"ja":true};	// Prints entire month from locale for languages that don't support shortening
		/**
		 * @memberOf  STX.I18N
		 * @type {Object}
		 */
		STX.I18N.wordLists={
				"en":{"1D":"",
					"1 D":"",
					"3 D":"",
					"1 W":"",
					"2 Wk":"",
					"1 Mo":"",
					"5 Min":"",
					"10 Min":"",
					"15 Min":"",
					"30 Min":"",
					"1 hour":"",
					"Chart":"",
					"Chart Style":"",
					"Candle":"",
					"Bar":"",
					"Colored Bar":"",
					"Line":"",
					"Hollow Candles":"",
					"Chart Scale":"",
					"Log Scale":"",
					"Studies":"",
					"Accumulative Swing Index":"",
					"Aroon":"",
					"Aroon Oscillator":"",
					"Average True Range":"",
					"Bollinger Bands":"",
					"Center Of Gravity":"",
					"Chaikin Money Flow":"",
					"Chaikin Volatility":"",
					"Chande Forecast Oscillator":"",
					"Chande Momentum Oscillator":"",
					"Commodity Channel Index":"",
					"Coppock Curve":"",
					"Detrended Price Oscillator":"",
					"Directional Movement System":"",
					"Ease of Movement":"",
					"Ehler Fisher Transform":"",
					"Elder Force Index":"",
					"Elder Ray":"",
					"Fractal Chaos Bands":"",
					"Fractal Chaos Oscillator":"",
					"Gopalakrishnan Range Index":"",
					"High Low Bands":"",
					"High Minus Low":"",
					"Highest High Value":"",
					"Historical Volatility":"",
					"Intraday Momentum Index":"",
					"Keltner Channel":"",
					"Klinger Volume Oscillator":"",
					"Linear Reg Forecast":"",
					"Linear Reg Intercept":"",
					"Linear Reg R2":"",
					"Linear Reg Slope":"",
					"Lowest Low Value":"",
					"MACD":"",
					"Mass Index":"",
					"Median Price":"",
					"Momentum Oscillator":"",
					"Money Flow Index":"",
					"Moving Average":"",
					"Moving Average Envelope":"",
					"Negative Volume Index":"",
					"On Balance Volume":"",
					"Parabolic SAR":"",
					"Performance Index":"",
					"Positive Volume Index":"",
					"Pretty Good Oscillator":"",
					"Price Oscillator":"",
					"Price Rate of Change":"",
					"Price Volume Trend":"",
					"Prime Number Bands":"",
					"Prime Number Oscillator":"",
					"QStick":"",
					"Random Walk Index":"",
					"RAVI":"",
					"RSI":"",
					"Schaff Trend Cycle":"",
					"Standard Deviation":"",
					"Stochastics":"",
					"Stochastic Momentum Index":"",
					"Stochastic Oscillator":"",
					"Swing Index":"",
					"Time Series Forecast":"",
					"Trade Volume Index":"",
					"TRIX":"",
					"True Range":"",
					"Twiggs Money Flow":"",
					"Typical Price":"",
					"Ultimate Oscillator":"",
					"Vertical Horizontal Filter":"",
					"Volume":"",
					"Vol Underlay":"",
					"Volume Oscillator":"",
					"Volume Rate of Change":"",
					"Weighted Close":"",
					"Williams %R":"",
					"Williams Accumulation Distribution":"",
					"Timezone":"",
					"Change Timezone":"",
					"Default Themes":"",
					"Light":"",
					"Dark":"",
					"Custom Themes":"",
					"New Custom Theme":"",
					"Select Tool":"",
					"None":"",
					"Crosshairs":"",
					"Annotation":"",
					"Fibonacci":"",
					"Horizontal":"",
					"Horizontal Line":"",
					"Ray":"",
					"Segment":"",
					"Rectangle":"",
					"Ellipse":"",
					"Bell Curve":"",
					"Freeform":"Doodle",
					"Vertical":"",
					"Vertical Line":"",
					"Continuous":"",
					"Continuous Line":"",
					"Ellipse Center":"",
					"Ellipse Left":"",
					"Measure:":"",
					"Projection:":"",
					"Fill:":"",
					"Line:":"",
					"O: ":"",
					"H: ":"",
					"V: ":"",
					"C: ":"",
					"L: ":"",
					"save":"",
					"cancel":"",
					"Create":"",
					"Show Zones":"",
					"OverBought":"",
					"OverSold":"",
					"Choose Timezone":"",
					"Close":"",
					"Shared Chart URL":"",
					"Share This Chart!":"",
					"Create a New Custom Theme":"",
					"Candles":"",
					" Border":"",
					"Line/Bar/Wick":"",
					"Background":"",
					"Grid Lines":"",
					"Date Dividers":"",
					"Axis Text":"",
					"New Theme Name:":"",
					"Save Theme":"",
					"right-click to delete":"",
					"rsi":"",
					"Period":"",
					"ma":"",
					"Field":"",
					"Type":"",
					"MA":"",
					"macd":"",
					"Fast MA Period":"",
					"Slow MA Period":"",
					"Signal Period":"",
					"Signal":"",
					"stochastics":"",
					"Smooth":"",
					"Fast":"",
					"Slow":"",
					"Aroon Up":"",
					"Aroon Down":"",
					"Lin R2":"",
					"RSquared":"",
					"Lin Fcst":"",
					"Forecast":"",
					"Lin Incpt":"",
					"Intercept":"",
					"Time Fcst":"",
					"VIDYA":"",
					"R2 Scale":"",
					"STD Dev":"",
					"Standard Deviations":"",
					"Moving Average Type":"",
					"Trade Vol":"",
					"Min Tick Value":"",
					"Swing":"",
					"Limit Move Value":"",
					"Acc Swing":"",
					"Price Vol":"",
					"Pos Vol":"",
					"Neg Vol":"",
					"On Bal Vol":"",
					"Perf Idx":"",
					"Stch Mtm":"",
					"%K Periods":"",
					"%K Smoothing Periods":"",
					"%K Double Smoothing Periods":"",
					"%D Periods":"",
					"%D Moving Average Type":"",
					"%K":"",
					"%D":"",
					"Hist Vol":"",
					"Bar History":"",
					"Ultimate":"",
					"Cycle 1":"",
					"Cycle 2":"",
					"Cycle 3":"",
					"W Acc Dist":"",
					"Vol Osc":"",
					"Short Term Periods":"",
					"Long Term Periods":"",
					"Points Or Percent":"",
					"Chaikin Vol":"",
					"Rate Of Change":"",
					"Price Osc":"",
					"Long Cycle":"",
					"Short Cycle":"",
					"EOM":"",
					"CCI":"",
					"Detrended":"",
					"Aroon Osc":"",
					"Elder Force":"",
					"Ehler Fisher":"",
					"EF":"",
					"EF Trigger":"",
					"Schaff":"",
					"Coppock":"",
					"Chande Fcst":"",
					"Intraday Mtm":"",
					"Random Walk":"",
					"Random Walk High":"",
					"Random Walk Low":"",
					"Directional":"",
					"ADX":"",
					"DI+":"",
					"DI-":"",
					"High Low":"",
					"High Low Bands Top":"",
					"High Low Bands Median":"",
					"High Low Bands Bottom":"",
					"MA Env":"",
					"Shift Percentage":"",
					"Envelope Top":"",
					"Envelope Median":"",
					"Envelope Bottom":"",
					"Fractal High":"",
					"Fractal Low":"",
					"Prime Bands Top":"",
					"Prime Bands Bottom":"",
					"Bollinger Band Top":"",
					"Bollinger Band Median":"",
					"Bollinger Band Bottom":"",
					"Keltner":"",
					"Shift":"",
					"Keltner Top":"",
					"Keltner Median":"",
					"Keltner Bottom":"",
					"PSAR":"",
					"Minimum AF":"",
					"Maximum AF":"",
					"Klinger":"",
					"Signal Periods":"",
					"KlingerSignal":"",
					"Elder Bull Power":"",
					"Elder Bear Power":"",
					"LR Slope":"",
					"Slope":""}
		};
		
		
		/** Returns a word list containing unique words. Each word references an array of DOM
		 *  nodes that contain that word. This can then be used for translation.
		 *  @memberOf  STX.I18N
		 */
		STX.I18N.findAllTextNodes=function(){
		    var walker = document.createTreeWalker(
		        document.body,
		        NodeFilter.SHOW_TEXT,
		        null,
		        false
		    );
		
		    var node;
			var ws=new RegExp("^\\s*$");
			var wordList={};
		
		    while(node = walker.nextNode()) {
		        if(!ws.test(node.nodeValue)){
		        	if(node.parentNode.tagName=="SCRIPT") continue;
		        	if(wordList[node.nodeValue]==null) wordList[node.nodeValue]=[];
					wordList[node.nodeValue].push(node);
				}
		    }
		    // Get all the words from the study library that are used to populate the study dialogs.
		    // These will have an empty array since they aren't associated with any nodes
		    if(STX.Studies.studyLibrary){
		    	for(var study in STX.Studies.studyLibrary){
		        	if(wordList[study]==null) wordList[study]=[];
		        	var s=STX.Studies.studyLibrary[study];
		        	if(s.inputs){
		        		for(var input in s.inputs){
		                	if(wordList[input]==null) wordList[input]=[];
		        		}
		        	}
		        	if(s.outputs){
		        		for(var output in s.outputs){
		                	if(wordList[output]==null) wordList[output]=[];
		        		}
		        	}
		    	}
		    }
			return wordList;
		};
		
		/**
		 * STX.I18N.missingWordList will scan the UI by walking all the text elements. It will determine which
		 * text elements have not been translated for the given language and return those as a JSON object.
		 * @param {string} [language] The language to search for missing words. Defaults to whatever language STX.I18N.language has set.
		 * @memberOf  STX.I18N
		 */
		STX.I18N.missingWordList=function(language){
			if(!language) language=STX.I18N.language;
			var wordsInUI=STX.I18N.findAllTextNodes();
			var missingWords={};
			var languageWordList=STX.I18N.wordLists[language];
			if(!languageWordList) languageWordList={};
			for(var word in wordsInUI){
				if(typeof languageWordList[word]=="undefined"){
					missingWords[word]="";
				}
			}
			return missingWords;
		};
		
		/**
		 * A convenient function for creating a human readable JSON object suitable for delivery to a translator.
		 * @memberOf  STX.I18N
		 */
		STX.I18N.printableMissingWordList=function(language){
			var missingWords=JSON.stringify(STX.I18N.missingWordList(language));
			missingWords=missingWords.replace("\",\"","\",\n\"", "\g");
			return missingWords;
		};
		
		/**
		 * Passes through the UI (DOM elements) and translates all of the text for the given language.
		 * @param {string} [language] Optional language. Defaults to STX.I18N.language.
		 * @memberOf  STX.I18N
		 */
		STX.I18N.translateUI=function(language){
			if(!language) language=STX.I18N.language;
			var wordsInUI=STX.I18N.findAllTextNodes();
			var languageWordList=STX.I18N.wordLists[language];
			if(!languageWordList) return;
			for(var word in wordsInUI){
				var translation=languageWordList[word];
				if(!translation) continue;
				var nodes=wordsInUI[word];
				for(var i=0;i<nodes.length;i++){
					nodes[i].data=translation;
				}
			}
		};
		
		/**
		 * Translates an individual word for a given language. Set stxx.translationCallback to this function
		 * in order to automatically translate all textual elements on the chart itself.
		 * @param {string} word The word to translate
		 * @param {string} [language] Optional language. Defaults to STX.I18N.language.
		 * @memberOf  STX.I18N
		 */
		STX.I18N.translate=function(word, language){
			if(!language) language=STX.I18N.language;
			var languageWordList=STX.I18N.wordLists[language];
			if(!languageWordList) return word;
			var translation=languageWordList[word];
			if(!translation) return word;
			return translation;
		};
		
		/**
		 * Converts a CSV array of translations into the required JSON format. You can output this to the console and paste back in if desired.
		 * Assumes that the header row of the CSV is the language codes and that the first column is the key language (English). Assumes non-quoted words.
		 * @memberOf  STX.I18N
		 */
		STX.I18N.convertCSV=function(csv){
			if(!csv) csv=STX.I18N.csv;
			var lines=csv.split("\n");
			var headerRow=lines[0];
			var languages=headerRow.split(",");
			for(var j=0;j<languages.length;j++){
				var lang=languages[j];
				if(!STX.I18N.wordLists[lang]){
					STX.I18N.wordLists[lang]={};
				}
			}
			for(var i=1;i<lines.length;i++){
				var words=lines[i].split(",");
				var key=words[0];
				for(var j=1;j<words.length;j++){
					STX.I18N.wordLists[languages[j]][key]=words[j];
				}
			}
		};
		
		/**
		 * This method dynamically loads the locale using JSONP. Once the locale is loaded then the chart widget itself
		 * is updated for that locale. Use this function when a user can select a locale dynamically so as to avoid
		 * having to include specific locale entries as <script> tags. The optional callback will be called when the locale
		 * has been set. The Intl library includes JSONP for each locale. A zip of these locales can be requested and should
		 * be placed in the locale-data directory of your server.
		 * @param {object} stx A chart object
		 * @param {string} locale A valid locale, for instance en-IN
		 * @param {Function} cb Callback when locale has been loaded. This function will be passed an error message if it cannot be loaded.
		 * @memberOf  STX.I18N
		 */
		STX.I18N.setLocale=function(stx, locale, cb){
			if(window.OldIntl){	// Intl built into browser
		    	stx.setLocale(locale);
		    	if(cb) cb(null);
				return;
			}
			var localeFileURL="locale-data/jsonp/" + locale + ".js";
			var script=document.createElement("SCRIPT");
			script.async = true;
			script.src = localeFileURL;
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(script, s.nextSibling);
		    script.onload=function(){
		    	stx.setLocale(locale);
		    	if(cb) cb(null);
		    };
		    script.onerror=function(){
		    	if(cb) cb("cannot load script");
		    };
		};
		
		/**
		 * MARKET OBJECT IS NOT YET FUNCTIONAL. PLEASE USE LEGACYMARKET UNTIL NEXT RELEASE.
		 * A Market object defines the trading sessions for a market. This includes opening and closing times as well
		 * as holidays and partial closings.
		 *
		 * This object largely supercedes STX.LegacyMarket which was a static class which addressed the same concerns but could not
		 * manage multiple markets
		 * @param {object} sessionDefinition Session definition file
		 * @constructor
		 * @name  STX.Market
		 *
		 * @example
		 * sessionDefinition={
		 * 	sessions:{
		 * 		"*":[{open:"09:30",close:"16:00"}],								// Default (*) to open at 9:30 and close at 16:00
		 * 		"0":[],															// Empty array means market is closed that day (Sunday in this case)
		 * 		"2":[{}],														// Array with empty session means session is open 24 hours
		 * 		"3":[{open:"09:30",close:"12:00"},{open:"13:00",close:"16:00"}]	// Example of two trading sessions in one day
		 * 		},
		 * 	closings:[
		 * 			{date:"01/02/2012"},											// Market closed this day
		 * 			{date:"01/02/2013", sessions[{close:"13:00"}]},					// Market closed early this day, at 13:00
		 * 			{date:"01/02/2013", sessions[{close:"11:46"},{open:"12:08"}]}	// Market was closed temporarily and then re-opened
		 * 		],
		 * 	timezone: "America/New_York"										// The timezone for the market (these definitions should be in that time)
		 * }
		 */
		STX.Market=function(sessionDefinition){
			this.sessions=[[],[],[],[],[],[],[]];	// we explicitly create sessions for each day of the week, process "*" just once now, not every time in the future
			this.closings={};
			this.timezone="Etc/UTC";
			if(sessionDefinition){
				this.processSessionDefinition(sessionDefinition);
			}
		};
		
		/**
		 * Converts a time in format 16:00 to number of minutes past midnight
		 * @param  {String} s String format military (24hr) time
		 * @return {int}   Number of minutes past midnight
		 * @static
		 * @memberOf STX.Market
		 */
		STX.Market.convertTime=function(s){
			var a=s.split(":");
			return parseInt(a[0])*60+parseInt(a[1]);
		};
		
		/**
		 * Processes a human readable market session description into internal format necessary for speedy date and time processing.
		 * this.sessionDefinition.sessions contains an array of processed sessions, one for each day of the week. The sessions are processed
		 * to the number of minutes past midnight for that day of the week. Midnight is in the specified timezone.
		 *
		 * this.sessionDefinition.closings contains a map of market closings. The map is based on the number of days since the epoch.
		 * The map references an array of closing session definitions *in the specified timezone*. If the array
		 * is empty then the market was closed that day. If the array contains sessions then those override the default session for that
		 * day of the week.
		 * @todo, convert from map to hash array if necessary for performance. Currently the map is a string formatted date which is pretty inefficient.
		 * 
		 * @param  {object} sessionDefinition Market session definition object
		 * @memberOf STX.Market
		 */
		STX.Market.prototype.processSessionDefinition=function(sessionDefinition){
			this.sessions=[[],[],[],[],[],[],[]];	// we explicitly create sessions for each day of the week, process "*" just once now, not every time in the future
			this.closings={};
			this.timezone=sessionDefinition.timezone;
			if(!this.timezone) this.timezone="Etc/UTC";
		
			// Translate military time sessions into beginning and end of day session. Takes into account missing open and close, such as for 24 hour sessions.
			function processSession(sessions, day, unprocessed){
				var processed=sessions[day]=[];
				for(var j=0;j<unprocessed.length;j++){
					var session=unprocessed[j];
					var processedSession={open:0,close:1440};	// default
					if(session.open) processedSession.open=STX.Market.convertTime(session.open);
					if(session.close) processedSession.close=STX.Market.convertTime(session.close);
					processed.push(processedSession);
				}
			};
		
			// First initialize our sessions with the defaults
			var unprocessed=sessionDefinition.sessions["*"];
			if(unprocessed){
				for(var i=0;i<7;i++){
					processSession(this.sessions, i, unprocessed);
				}
			}
			// Then override with specific definitions for any specific day of week
			for(var day in sessionDefinition.sessions){
				if(day=="*") continue;
				var unprocessed=sessionDefinition.sessions[day];
				processSession(this.sessions, parseInt(day), unprocessed);
			}
		
			// Process the closings. We reference them by UTC midnight so that comparisons in date
			// loops can be quick. Holidays are by nature sparse and so we only need to go in and do
			// Timezone conversions when there's an actual match
			for(var i=0;i<sessionDefinition.closings.length;i++){
				var closing=sessionDefinition.closings[i];
				var dt=STX.strToDate(closing.date);
				var processed=[];
				var defaultSession=this.sessions[dt.getDay()][0];
				if(closing.sessions){
					var sessions=STX.clone(closing.sessions);
					for(var j=0;j<sessions.length;j++){
						var session=sessions[j];
						if(session.open) session.open=STX.Market.convertTime(session.open);
						else session.open=defaultSession.open;
						if(session.close) session.close=STX.Market.convertTime(session.close);
						else session.close=defaultSession.close;
						processed.push(session);
					}
				}
				var hash=""+dt.getFullYear()+dt.getMonth()+dt.getDate();
				this.closings[hash]=processed;
			}
		};
		
		/**
		 * Returns a holiday entry or null if none exists for the date passed in. The date is assumed to be in the timezone for the session definition!
		 * @param  {Date} dt The date to check. This date is assumed to be in the timezone of the session definition (already converted).
		 * @return {array}    A holiday session entry. Null if not a holiday. Empty array if a holiday but no sessions.
		 * @private
		 * @memberOf STX.Market
		 */
		STX.Market.prototype.getHoliday=function(dt){
			var hash=""+dt.getFullYear()+dt.getMonth()+dt.getDate();
			var entry=this.closings[hash];
			if(!entry) return null;
			return entry;
		};
		
		/**
		 * Returns true if the market is open for the date passed in. The date is assumed to be in local time of the browser.
		 * @param  {Date}  [dt] The date to check. If not passed in then the current time will be checked
		 * @return {Boolean}    True if the market is open.
		 * @memberOf STX.Market
		 */
		STX.Market.prototype.isMarketOpen=function(dt){
			if(!dt) dt=new Date();
			var newdt=new timezoneJS.Date(dt.getTime(), this.timezone);
			var day=newdt.getDay();
			var sessions=this.sessions[day];
			if(sessions.length==0) return false;	// Market closed today
		
			var replaceSessions=this.getHoliday(newdt);
			if(replaceSessions) sessions=replaceSessions;
			if(sessions.length==0) return false;	// Holiday today
		
			var minutesAfterMidnight=dt.getHours()*60+dt.getMinutes();
			for(var i=0;i<sessions.length;i++){
				var session=sessions[i];
				if(!session.open && !session.close) return true;	// trades 24 hours today
				if(minutesAfterMidnight>=session.open && minutesAfterMidnight<session.close) return true;
			}
			return false;	// Minutes did not fall in any open session
		};
		
		/**
		 * Returns true if it is after market closing. The date is assumed to be in local time of the browser.
		 * @param  {Date}  [dt] The date/time to check. Defaults to now.
		 * @return {Boolean}    True if the time is after market close.
		 * @memberOf STX.Market
		 */
		STX.Market.prototype.isAfterMarketClose=function(dt){
			if(!dt) dt=new Date();
			dt=new timezoneJS.Date(dt.getTime(), this.timezone);
			var day=dt.getDay();
			var sessions=this.sessions[day];
			if(sessions.length==0) return false;	// Market closed today
		
			var replaceSessions=this.getHoliday(newdt);
			if(replaceSessions) sessions=replaceSessions;
			if(sessions.length==0) return false;	// Holiday today
		
			var minutesAfterMidnight=dt.getHours()*60+dt.getMinutes();
			var session=sessions[sessions.length-1];	// get last session
			if(!session.open && !session.close) return false;	// trades 24 hours today
			if(minutesAfterMidnight>=session.close) return true;
			return false;
		};
		
		/**
		 * Returns true if it is after market closing, taking into account the delay (for use with delayed quotes)
		 * @param  {Date}  [dt]      The Date/time, defaults to now
		 * @param  {number}  [minutes] Number of minutes delay, defaults to 20.
		 * @return {Boolean}         Returns true if the market is closed plus the delay time.
		 * @memberOf STX.Market
		 */
		STX.Market.prototype.isAfterDelayedClose=function(dt, minutes){
			if(!dt) dt=new Date();
			if(!minutes) minutes=20;
			var newDate=new Date(dt.getTime());
			newDate.setMinutes(newDate.getMinutes()-minutes);
			return this.isAfterMarketClose(newDate);
		};
		
		/**
		 * An iterator can be used to traverse forward or backward in time. It takes into consideration
		 * market holidays and sessions.
		 * If a market session ends before completion of an iteration, then the iteration is truncated. A new iteration will begin on opening of the next market session.
		 * @param {STX.Market} market The market to iterate
		 * @param {Date} dt The date/time from which to begin the iteration.
		 * @param {string} interval "minute","day","week" or "month"
		 * @param {number} [period] The number of intervals to increment or decrement. Defaults to 1.
		 * @param {object} [params] Parameters
		 * @param {boolean} [params.utc] If true then date objects are assumed to be set in universal time. If not set then date objects are assumed to be in the market timezone.
		 * Generally speaking, don't set utc if you get a date from masterData, dataSet or dataSegment. Do set utc if your using a date that comes from outside of the charting engine itself.
		 * @param {boolean} [params.calendarAxis] If true then sessions and holidays will be ignored
		 * @constructor
		 * @memberOf STX.Market
		 */
		STX.Market.Iterator=function(market, dt, interval, period, params){
			if(!params) params={};
			this.params=params;
			this.market=market;
			this.interval=interval;
			this.period=period;
			this.sessionPointer=null;	// This remembers which trading session we were last in. When set to null we don't know where we are. increment or decrement will need to find the next session
			if(!this.period) this.period=1;
			this.dt=dt;
			if(dt.constructor==Date){
				if(params.utc){ // Date object is set in universal time, just convert the timezone
					this.dt=new timezoneJS.Date(dt.getTime(), market.timezone);
				}else{			// Date object is in relative time for the market
					this.dt=new timezoneJS.Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds(), market.timezone);
				}
			}
		};
		
		/**
		 * Step forward
		 * @return {timezoneJS.Date} Start date/time of next tick
		 * @memberOf STX.Market
		 */
		STX.Market.Iterator.prototype.increment=function(){
			if(this.interval=="minute"){
				var t1=this.dt.getTime();
				if(this.params.calendarAxis){
					this.dt=new timezoneJS.Date(t1+this.period*60*1000, this.market.timezone);
					return this.dt;
				}
				t1+=this.period*60*1000;
				var future=new timezoneJS.Date(t1, this.market.timezone);
				var newSession=false;	// This gets set to true if we go past the end of a session boundary
				for(var i=0;i<1000;i++){	// Use for loop to prevent infinite loop in case of bugs...
					var day=future.getDay();
					var sessions=this.market.sessions[day];
					if(sessions.length==0){	// market closed today
						newSession=true;
						future.setDate(future.getDate()+1);
						this.sessionPointer=0;
						continue;
					}
		
					var replaceSessions=this.market.getHoliday(future);
					if(replaceSessions) sessions=replaceSessions;
					if(sessions.length==0){ // Holiday today
						newSession=true;
						future.setDate(future.getDate()+1);
						this.sessionPointer=0;
						continue;
					}
					if(this.sessionPointer==null) future=this.initializeSessionPointer(sessions, "increment");
					// If we get this far then the new tick will either be on a valid session or the beginning of a session
					var minutesAfterMidnight=future.getHours()*60+future.getMinutes();
					var foundIt=false;
					for(;this.sessionPointer<sessions.length;this.sessionPointer++){
						var session=sessions[this.sessionPointer];
						if(newSession){
							future.setHours(Math.floor(session.open/60));
							future.setMinutes(session.open-future.getHours()*60);
							foundIt=true;
							break;
						}
						if(!session.open && !session.close){	// trades 24 hours today
							foundIt=true;
							break;
						}
						if(minutesAfterMidnight>=session.open && minutesAfterMidnight<session.close){ // lands in middle of session
							foundIt=true;
							break;
						}
						newSession=true;	// not landing in current session, therefore we will start at the next session, or the first session of following day
					}
					if(foundIt) break;
					future.setDate(future.getDate()+1); // if not found then go to next day
					this.sessionPointer=0;
				}
				this.dt=future;
				return this.dt;
			}else if(this.interval=="day"){
				for(var i=0;i<this.period;i++){
					this.dt.setDate(this.dt.getDate()+1);
					if(!this.params.calendarAxis) this.advanceToMarketDay();
				}
			}else if(this.interval=="week"){
				for(var i=0;i<this.period;i++){
					var day=this.dt.getDay();
					var inc=(7-day);	// Set to the following Sunday
					this.dt.setDate(this.dt.getDate()+inc);
					if(!this.params.calendarAxis) this.advanceToMarketDay();
				}
			}else if(this.interval=="month"){
				for(var i=0;i<this.period;i++){
					this.dt.setDate(1);
					this.dt.setMonth(this.dt.getMonth()+1);
					if(!this.params.calendarAxis) this.advanceToMarketDay();
				}
			}
			this.sessionPointer=0;		// Always reset the session pointer when advancing daily
		
			return this.dt;
		};
		
		/**
		 * Advances the iterator to the next market day
		 * @memberOf STX.Market
		 */
		STX.Market.Iterator.prototype.advanceToMarketDay=function(){
			for(var i=0;i<20;i++){	// prevent infinite loop by only looping 20 times, just in case
				var day=this.dt.getDay();
				var sessions=this.market.sessions[day];
				if(sessions.length==0){	// market closed today
					this.dt.setDate(this.dt.getDate()+1);
					continue;
				}
		
				var replaceSessions=this.market.getHoliday(this.dt);
				if(replaceSessions) sessions=replaceSessions;
				if(sessions.length==0){ // Holiday today
					this.dt.setDate(this.dt.getDate()+1);
					continue;
				}
				return;
			}	
		};
		
		/**
		 * Retreats the iterator to the prior market day
		 * @memberOf STX.Market
		 */
		STX.Market.Iterator.prototype.retreatToMarketDay=function(){
			for(var i=0;i<20;i++){
				var day=this.dt.getDay();
				var sessions=this.market.sessions[day];
				if(sessions.length==0){	// market closed today
					this.dt.setDate(this.dt.getDate()-1);
					continue;
				}
		
				var replaceSessions=this.market.getHoliday(this.dt);
				if(replaceSessions) sessions=replaceSessions;
				if(sessions.length==0){ // Holiday today
					this.dt.setDate(this.dt.getDate()-1);
					continue;
				}
				return;
			}	
		};
		
		/**
		 * This method finds the initial session for the specified date time. It takes into consideration the iteration direction.
		 * Note that the datetime might land inside a session or outside of a session. If it lands before a session then the datetime
		 * is automatically fast-forwarded to the opening of the next session. If it lands past the last session of the day then it
		 * sets the session to the last one for the day, and the increment function will automatically step us forward.
		 * @param  {array} sessions  Sessions array
		 * @param  {string} direction Either "increment" or "decrement"
		 * @return {timezoneJS.Date} The new date position
		 * @private
		 * @memberOf STX.Market
		 */
		STX.Market.Iterator.prototype.initializeSessionPointer=function(sessions, direction){
			var minutesAfterMidnight=this.dt.getHours()*60+this.dt.getMinutes();
			if(direction=="increment"){
				for(var i=0;i<sessions.length;i++){
					var session=sessions[i];
					if(minutesAfterMidnight<session.close){ // If before a session closes then we want that session
						this.sessionPointer=i;
						if(minutesAfterMidnight<session.open){	// If before that session has opened then fast-forward to beginning of sesson
							this.dt.setHours(Math.floor(session.open/60));
							this.dt.setMinutes(session.open-this.dt.getHours()*60);
						}else{									// If landing inside of a session
							var minutes=minutesAfterMidnight+(this.period-(minutesAfterMidnight-session.open)%this.period);	// ensure we land on a candle boundary
							this.dt.setHours(Math.floor(minutes/60));
							this.dt.setMinutes(minutes-this.dt.getHours()*60);
						}
						return this.dt;
					}
				}
				this.sessionPointer=sessions.length-1;	// Must be later than all the trading sessions, increment() will get to next day
			}else{
				for(var i=sessions.length-1;i>-1;i--){
					var session=sessions[i];
					if(minutesAfterMidnight>=session.open){ // If greater than a session open then we want that session
						this.sessionPointer=i;
						if(minutesAfterMidnight<session.close){	// Our initial date falls inside of a session
							var minutes=minutesAfterMidnight-(minutesAfterMidnight-session.open)%this.period;	// Ensure we land on a candle boundary
							this.dt.setHours(Math.floor(minutes/60));
							this.dt.setMinutes(minutes-this.dt.getHours()*60);
							return this.dt; // We're in the session so good to go
						}
						var sessionLength=session.close-session.open; // Otherwise fast-reverse to the last tick of the session
						var minutes=session.open;
						if(sessionLength>this.period){
							minutes=session.close-(sessionLength%this.period); // Tricky because we're going backward, calculate the remainder so that we back up to the session.open
							if(session.close==minutes) minutes=session.close-this.period;
						}
		
						this.dt.setHours(Math.floor(minutes/60));
						this.dt.setMinutes(minutes-this.dt.getHours()*60);
						return this.dt;
					}
				}
				this.sessionPointer=0;	// Must be earlier in day than first session, decrement() will fast-reverse to prevous day
			}
			return this.dt;
		};
		/**
		 * Step backward
		 * @return {timezoneJS.Date} Start date/time of previous tick
		 * @memberOf STX.Market
		 */
		STX.Market.Iterator.prototype.decrement=function(){
			if(this.interval=="minute"){
				var t1=this.dt.getTime();
				if(this.params.calendarAxis){
					this.dt=new timezoneJS.Date(t1-this.period*60*1000, this.market.timezone);
					return this.dt;
				}
				t1-=this.period*60*1000;
				var past=new timezoneJS.Date(t1, this.market.timezone);
				var newSession=false;	// This gets set to true if we go past the end of a session beginning
				for(var i=0;i<20;i++){	// Use loop to prevent infinite loop in case of bugs...
					var day=past.getDay();
					var sessions=this.market.sessions[day];
					if(sessions.length==0){	// market closed today
						newSession=true;
						past.setDate(past.getDate()-1);
						this.sessionPointer=sessions.length-1;
						continue;
					}
		
					var replaceSessions=this.market.getHoliday(past);
					if(replaceSessions) sessions=replaceSessions;
					if(sessions.length==0){ // Holiday today
						newSession=true;
						past.setDate(past.getDate()-1);
						this.sessionPointer=sessions.length-1;
						continue;
					}
					if(this.sessionPointer==null) past=this.initializeSessionPointer(sessions, "decrement");
					// If we get this far then the new tick will either be on a valid session or the beginning of a session
					var minutesAfterMidnight=past.getHours()*60+past.getMinutes();
					var foundIt=false;
					for(;this.sessionPointer>-1;this.sessionPointer--){
						var session=sessions[this.sessionPointer];
						if(newSession){
							var sessionLength=session.close-session.open;
							var minutes=session.open;
							if(sessionLength>this.period){
								minutes=session.close-(sessionLength%this.period); // Tricky because we're going backward, calculate the remainder so that we back up to the session.open
								if(session.close==minutes) minutes=session.close-this.period;
							}
		
							past.setHours(Math.floor(minutes/60));
							past.setMinutes(minutes-past.getHours()*60);
							foundIt=true;
							break;
						}
						if(!session.open && !session.close){	// trades 24 hours today
							foundIt=true;
							break;
						}
						if(minutesAfterMidnight>=session.open && minutesAfterMidnight<session.close){ // lands in middle of session
							foundIt=true;
							break;
						}
						newSession=true;	// not landing in current session, therefore we will start at the next session, or the first session of following day
					}
					if(foundIt) break;
					past.setDate(past.getDate()-1); // if not found then go to previous day
					this.sessionPointer=sessions.length-1;
				}
				this.dt=past;
				return this.dt;
			}else if(this.interval=="day"){
				for(var i=0;i<this.period;i++){
					this.dt.setDate(this.dt.getDate()-1);
					if(!this.params.calendarAxis) this.retreatToMarketDay();
				}
			}else if(this.interval=="week"){
				for(var i=0;i<this.period;i++){
					var day=this.dt.getDay();
					var inc=(7+day);	// Set to the previous Sunday
					this.dt.setDate(this.dt.getDate()-inc);
					if(!this.params.calendarAxis) this.advanceToMarketDay();
				}
			}else if(this.interval=="month"){
				for(var i=0;i<this.period;i++){
					this.dt.setDate(1);
					this.dt.setMonth(this.dt.getMonth()-1);
					if(!this.params.calendarAxis) this.advanceToMarketDay();
				}
			}
			this.sessionPointer=0;		// Always reset the session pointer when advancing daily
		
			return this.dt;
		};
		
		/**
		 * Converts a Date object from one time zone to another using the timezoneJS.Date library
		 * @param  {Date} dt                    Original JavaScript Date object, from the original time zone
		 * @param  {string} originalTimeZone    The original time zone
		 * @param  {string} targetTimeZone      The target time zone
		 * @return {timezoneJS.Date}            The date in the target timezone. This behaves the same as a native Date.
		 * @memberOf STX
		 */
		STX.convertTimeZone=function(dt, originalTimeZone, targetTimeZone){
			// Convert from original timezone to local time
			var newDT=new timezoneJS.Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds(), originalTimeZone);
			
			// Convert from local time to new timezone
			newDT.setTimezone(targetTimeZone);
			return newDT;
		};
		
		/**
		 * This method converts a time from another timezone to local time on the browser
		 * @param  {Date} dt               The original time
		 * @param  {string} originalTimeZone A valid timezone
		 * @return {Date}                  The date converted to local time
		 * @memberOf STX
		 */
		STX.convertToLocalTime=function(dt, originalTimeZone){
			var seconds=dt.getSeconds();
			var milliseconds=dt.getMilliseconds();
			var newDT=new timezoneJS.Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), originalTimeZone);
			return new Date(newDT.getTime() + seconds*1000 + milliseconds);
		};
		
		/**
		 * Example closings array. Each object in the array must contain a date string. The date will be converted
		 * based on the timezone specified with the market session definition. For partial days, include the day's session(s) with open and close times.
		 * If either open or close are missing, then the default opening or closing time will be assumed for that session.
		 * @type {Array}
		 */
		STX.Market.NYSE_CLOSINGS=[
			{date:"01/02/2012"},
			{date:"01/16/2012"},
			{date:"02/20/2012"},
			{date:"04/06/2012"},
			{date:"05/28/2012"},
			{date:"07/04/2012"},
			{date:"09/03/2012"},
			{date:"10/29/2012"},
			{date:"10/30/2012"},
			{date:"11/22/2012"},
			{date:"12/25/2012"},
			{date:"01/01/2013"},
			{date:"01/21/2013"},
			{date:"02/18/2013"},
			{date:"03/29/2013"},
			{date:"05/27/2013"},
			{date:"07/04/2013"},
			{date:"09/02/2013"},
			{date:"11/28/2013"},
			{date:"12/25/2013"},
			{date:"01/01/2014"},
			{date:"01/20/2014"},
			{date:"02/17/2014"},
			{date:"04/18/2014"},
			{date:"05/26/2014"},
			{date:"07/04/2014"},
			{date:"09/01/2014"},
			{date:"11/27/2014"},
			{date:"12/25/2014"},
			{date:"07/03/2012",sessions:[{close:"13:00"}]},
			{date:"11/23/2012",sessions:[{close:"13:00"}]},
			{date:"12/24/2012",sessions:[{close:"13:00"}]},
			{date:"07/03/2013",sessions:[{close:"13:00"}]},
			{date:"11/29/2013",sessions:[{close:"13:00"}]},
			{date:"12/24/2013",sessions:[{close:"13:00"}]},
			{date:"07/03/2014",sessions:[{close:"13:00"}]},
			{date:"11/28/2014",sessions:[{close:"13:00"}]},
			{date:"12/24/2014",sessions:[{close:"13:00"}]}
		];
		
		/**
		 * Example market session definition object for the NYSE which is closed on Saturday and Sunday.
		 * Opening and closing hours of 9:30 and 16:00 minutes exist the rest of the time
		 * and the timezone is set to America/New_York.
		 * @type {Object}
		 */
		STX.Market.NYSE={
			sessions:{
				"0":[],
				"6":[],
				"*":[{open:"09:30", close:"16:00"}]
			},
			closings:STX.Market.NYSE_CLOSINGS,
			timezone:"America/New_York"	
		};
		
		/**
		 * Example market session definition object for GLOBEX futures which trade 24 hours beginning
		 * Sunday afternoon and ending Friday evening. GLOBEX follows the same market closings as the NYSE
		 * so we re-use that array.
		 * @type {Object}
		 */
		STX.Market.GLOBEX={
			sessions:{
				"0":[{open:"15:00"}],
				"5":[{close:"18:00"}],
				"6":[],
				"*":[{}]
			},
			closings:STX.Market.NYSE_CLOSINGS,
			timezone:"America/New_York"
		};
		
		/**
		 * Example market session definition object for SHANGHAI exchange which has two trading sessions per day.
		 * @type {Object}
		 */
		STX.Market.SHANGHAI={
			sessions:{
				"0":[],
				"6":[],
				"*":[{open:"09:30",close:"11:30"},{open:"13:00",close:"15:00"}]
			},
			closings:[
				{date:"01/01/14"},
				{date:"01/31/14"},
				{date:"02/03/14"},
				{date:"02/04/14"},
				{date:"02/05/14"},
				{date:"02/06/14"},
				{date:"04/07/14"},
				{date:"05/01/14"},
				{date:"05/02/14"},
				{date:"06/02/14"},
				{date:"09/08/14"},
				{date:"10/01/14"},
				{date:"10/02/14"},
				{date:"10/03/14"},
				{date:"10/06/14"},
			],
			timezone:"Asia/Hong_Kong"
		};
		
		
		/**
		 * Namespace for market calendar operations. Currently the built in market functions support only a single exchange for determining
		 * opening and closing times (aside from 24 hour securities which are handled separately). Future versions will support exchange
		 * specific hours as well as exchanges with multiple trading sessions (i.e. Shanghai, Nikei)
		 * @namespace
		 * @name  STX.LegacyMarket
		 */
		STX.LegacyMarket=function(){}
		
		/**
		 * Returns true if the symbol is a forex or futures symbol. This is dependent on the market data feed and should be overridden accordingly.
		 * The charting engine uses this to determine the trading hours for securities. X-axis will behave very differently for these securities
		 * which trade 24x6
		 * @param  {string}  symbol The symbol
		 * @return {Boolean}        True if it's a forex or futures symbol
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.isForexFuturesSymbol=function(symbol){
			if(!symbol) return false;
			if(symbol.length>=6) return true;
			return false;
		};
		
		/**
		 * Returns true if the market is open that day. This is exchange dependent and should be overriden accordingly. The default implementation
		 * for this method is to check to see whether the market is open for US securities if it is an equity, or to use globex rules for forex
		 * or futures securities
		 * @param  {string}  symbol The symbol
		 * @param  {date}  nd     JavaScript date object
		 * @return {Boolean}        True if the market is open today
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.isMarketDay=function(symbol, nd){
			if(!nd) nd=STX.getETDateTime();
			if(STX.LegacyMarket.isForexFuturesSymbol(symbol)){
				if(nd.getDay()==6) return false;
				//TODO, if type of security is future then check isHoliday()
			}else{
				if(nd.getDay()==0) return false;
				if(nd.getDay()==6) return false;
				if(STX.LegacyMarket.isHoliday(nd, symbol)) return false;
			}
			return true;
		};
		
		/**
		 * Returns true if the market is currently open. This is exchange dependent and should be overridden accordingly. The default
		 * implementation is to check opening and closing hours for US equities exchanges (this method is not used for 24h securities).
		 * @param  {string}  symbol The security symbol
		 * @param  {object}  stx    A chart object
		 * @return {Boolean}        True if the market is currently open
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.isMarketOpen=function(symbol, stx){
			if(!STX.LegacyMarket.isMarketDay(symbol)) return false;
			var nd=STX.getETDateTime();
			if(!stx){
				if((nd.getHours()>9 || (nd.getHours()==9 && nd.getMinutes()>29)) && (nd.getHours()<16 || (nd.getHours()==16 && nd.getMinutes()<5))) return true;
			}else{
				if((nd.getHours()>stx.chart.beginHour || (nd.getHours()==stx.chart.beginHour && nd.getMinutes()>stx.chart.beginMinute))
				&& (nd.getHours()<stx.chart.endHour || (nd.getHours()==stx.chart.endHour && nd.getMinutes()<stx.chart.endMinute+5))) return true;
			}
			return false;
		};
		
		/**
		 * Returns true if it is after market closing
		 * @param  {string}  symbol The security symbol
		 * @return {Boolean}        True if after market closing
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.isAfterMarket=function(symbol){
			if(!STX.LegacyMarket.isMarketDay(symbol)) return false;
			var nd=STX.getETDateTime();
			if((nd.getHours()>16 || (nd.getHours()==16 && nd.getMinutes()>0))) return true;
			return false;
		};
		
		/**
		 * Returns true if it is after market closing adjusted for 20 minute delayed quotes.
		 * @param  {string}  symbol The security symbol
		 * @return {Boolean}        True if 20 minutes past market close
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.isAfterDelayed=function(symbol){
			if(!STX.LegacyMarket.isMarketDay(symbol)) return false;
			var nd=STX.getETDateTime();
			if((nd.getHours()>16 || (nd.getHours()==16 && nd.getMinutes()>20))) return true;
			return false;
		};
		
		/**
		 * Returns true if forex is trading (according to globex rules). These values are hardcoded for Friday close at 6:00pm ET and open for Sunday at 3:00pm ET.
		 * @param  {date}  nd JavaScript date
		 * @return {Boolean}    True if globex is open
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.isForexOpen=function(nd){
			if(!nd) nd=STX.getETDateTime();
			if(nd.getDay()==6) return false;
			if(nd.getDay()==5 && nd.getHours()>=18) return false;
			if(nd.getDay()==0 && nd.getHours()<15) return false;
			return true;
		};
		
		/**
		 * Contains array of epochs
		 * @type {Array}
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.holidayArray=[];
		/**
		 * Contains array of epochs
		 * @type {Array}
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.halfDayArray=[];
		
		// Contains epochs hashed to midnight for quick mathematical comparison
		STX.LegacyMarket.holidayHash={};
		STX.LegacyMarket.halfDayHash={};
		
		/**
		 * Initializes the arrays of holidays and half days. For maximum performance the dates are reduced to a has that represents the epoch
		 * adjusted for local time. This allows a fast array search rather than expensive Date comparison. The holiday arrays should be updated
		 * regularly to account for upcoming holidays and recent holidays.
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.initializeHolidays=function(){
			// This sets the hashOffset for comparison of dates. This assumes eastern time
			// Change your offset if you are calculating holidays for a different timezone
			var d=new Date();
			//var localTime = d.getTime();
			//var localOffset = d.getTimezoneOffset() * 60000;
			//var utc = localTime + localOffset;
			var offset = -4;
			if((d.getMonth()<2 || (d.getMonth()==2 && d.getDate()<11)) || (d.getMonth()>10 || (d.getMonth()==10 && d.getDate()>=4)))
					offset = -5;
			STX.LegacyMarket.hashOffset=3600000*offset;
		
			// Be sure to put these in order!
			STX.LegacyMarket.holidayArray.push(new Date("01/02/2012").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("01/16/2012").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("02/20/2012").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("04/06/2012").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("05/28/2012").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("07/04/2012").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("09/03/2012").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("10/29/2012").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("10/30/2012").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("11/22/2012").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("12/25/2012").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("01/01/2013").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("01/21/2013").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("02/18/2013").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("03/29/2013").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("05/27/2013").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("07/04/2013").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("09/02/2013").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("11/28/2013").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("12/25/2013").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("01/01/2014").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("01/20/2014").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("02/17/2014").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("04/18/2014").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("05/26/2014").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("07/04/2014").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("09/01/2014").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("11/27/2014").getTime());
			STX.LegacyMarket.holidayArray.push(new Date("12/25/2014").getTime());
		
			STX.LegacyMarket.halfDayArray.push(new Date("07/03/2012").getTime());
			STX.LegacyMarket.halfDayArray.push(new Date("11/23/2012").getTime());
			STX.LegacyMarket.halfDayArray.push(new Date("12/24/2012").getTime());
			STX.LegacyMarket.halfDayArray.push(new Date("07/03/2013").getTime());
			STX.LegacyMarket.halfDayArray.push(new Date("11/29/2013").getTime());
			STX.LegacyMarket.halfDayArray.push(new Date("12/24/2013").getTime());
			STX.LegacyMarket.halfDayArray.push(new Date("07/03/2014").getTime());
			STX.LegacyMarket.halfDayArray.push(new Date("11/28/2014").getTime());
			STX.LegacyMarket.halfDayArray.push(new Date("12/24/2014").getTime());
		
			// The hash is based on the epoch. Note that the epoch is milliseconds since Jan 1, 1970 but in UTC time.
			// We mod by the number of milliseconds in a day in order to get midnight that day in UTC time
			// This means that when searching in the hash we need to adjust our time to UTC before modding.
			for(var i=0; i<STX.LegacyMarket.holidayArray.length;i++){
				var g=STX.LegacyMarket.holidayArray[i];
				var midnight=g-g%(24*60*60*1000);
				STX.LegacyMarket.holidayHash[midnight]=true;
			}
			for(var i=0; i<STX.LegacyMarket.halfDayArray.length;i++){
				var g=STX.LegacyMarket.halfDayArray[i];
				var midnight=g-g%(24*60*60*1000);
				STX.LegacyMarket.halfDayHash[midnight]=true;
			}
		
		};
		
		STX.LegacyMarket.initializeHolidays();
		
		/**
		 * Returns true if the date is a holiday
		 * @param  {date}  dt     A JavaScript date
		 * @param  {string}  symbol The symbol. Not currently used but in the future will support exchange specific holidays.
		 * @return {Boolean}        True if today is a holiday.
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.isHoliday=function(dt, symbol){
			// This comparison assumes dt is being passed in Eastern Time
			var ms=dt.getTime() + STX.LegacyMarket.hashOffset;
			ms=ms-ms%(24*60*60*1000);
			if(STX.LegacyMarket.holidayHash[ms]){
				//var dt2=new Date(ms);
				return true;
			}
			return false;
		};
		
		/**
		 * Returns true if today is a half day (early closing)
		 * @param  {date}  dt     A JavaScript date
		 * @param  {string}  symbol The security symbol. Not currently used but in the future will support exchange specific early closings.
		 * @return {Boolean}        True if today is a half day
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.isHalfDay=function(dt, symbol){
			// This comparison assumes dt is being passed in Eastern Time
			var ms=dt.getTime() + STX.LegacyMarket.hashOffset;
			ms=ms-ms%(24*60*60*1000);
			if(STX.LegacyMarket.halfDayHash[ms]) return true;
			return false;
		};
		
		/**
		 * Increments the date (day of month) by the given amount.
		 * @param  {date} dt  JavaScript date object
		 * @param  {number} amt Number of days to increment
		 * @return {date}     The revised Date object
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.incDate=function(dt, amt){
			if(!amt) amt=1;
			dt.setDate(dt.getDate() + amt);
			return dt;
		};
		
		/**
		 * Decrements the date (day of month) by the given amount.
		 * @param  {date} dt  JavaScript date object
		 * @param  {number} amt Number of days to increment
		 * @return {date}     The revised Date object
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.decDate=function(dt, amt){
			if(!amt) amt=1;
			dt.setDate(dt.getDate() - amt);
			return dt;
		};
		
		/**
		 * Returns the next market day taking into account holidays and half days.
		 * Use {@link STXChart#getNextInterval} for a more generic method of skipping intervals
		 * @param  {date} dt  A valid JavaScript date
		 * @param  {number} inc The number of market days in the future
		 * @param  {object} stx A chart object
		 * @return {date}     A Date object that represents the next market (or incremental market) day
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.nextDay=function(dt, inc, stx){
			if(!inc) inc=1;
			var dt2=new Date(dt.getTime());
			for(var i=0;i<inc;i++){
				dt2=STX.LegacyMarket.incDate(dt2);
				if(!stx.calendarAxis){
					if(stx.chart.beginHour==0){	// forex. Note that the time is not accurate if the date lands on a Sunday
						if(dt2.getDay()==6) dt=STX.LegacyMarket.incDate(dt2);
						if(STX.LegacyMarket.isHoliday(dt2, stx.chart.symbol)) dt=STX.LegacyMarket.incDate(dt2);
						if(STX.LegacyMarket.isHoliday(dt2, stx.chart.symbol)) dt=STX.LegacyMarket.incDate(dt2);
						if(dt2.getDay()==6) dt=STX.LegacyMarket.incDate(dt2);
					}else{
						if(dt2.getDay()==0) dt=STX.LegacyMarket.incDate(dt2);
						if(dt2.getDay()==6) dt=STX.LegacyMarket.incDate(dt2,2);
						if(STX.LegacyMarket.isHoliday(dt2, stx.chart.symbol)) dt=STX.LegacyMarket.incDate(dt2);
						if(STX.LegacyMarket.isHoliday(dt2, stx.chart.symbol)) dt=STX.LegacyMarket.incDate(dt2);
						if(dt2.getDay()==0) dt=STX.LegacyMarket.incDate(dt2);
						if(dt2.getDay()==6) dt=STX.LegacyMarket.incDate(dt2,2);
					}
				}
			}
			return dt2;
		};
		
		/**
		 * Returns the previous market day taking into account holidays and half days.
		 * Use {@link STXChart#getNextInterval} for a more generic method of skipping intervals
		 * @param  {date} dt  A JavaScript date
		 * @param  {number} inc The number of days to go back into the past
		 * @param  {object} stx A chart object
		 * @return {date}     A Date object X market days in the past
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.prevDay=function(dt, inc, stx){
			if(!inc) inc=1;
			var dt2=new Date(dt.getTime());
			for(var i=0;i<inc;i++){
				dt2=STX.LegacyMarket.decDate(dt2);
				if(!stx.calendarAxis){
					if(stx.chart.beginHour==0){	//forex. Note that the time is not accurate if the date lands on a Sunday
						if(dt2.getDay()==6) dt2=STX.LegacyMarket.decDate(dt2);
						if(STX.LegacyMarket.isHoliday(dt2, stx.chart.symbol)) dt2=STX.LegacyMarket.decDate(dt2);
						if(dt2.getDay()==6) dt2=STX.LegacyMarket.decDate(dt2);
					}else{
						if(dt2.getDay()==6) dt2=STX.LegacyMarket.decDate(dt2);
						if(dt2.getDay()==0) dt2=STX.LegacyMarket.decDate(dt2);
						if(STX.LegacyMarket.isHoliday(dt2, stx.chart.symbol)) dt2=STX.LegacyMarket.decDate(dt2);
						if(dt2.getDay()==6) dt2=STX.LegacyMarket.decDate(dt2);
						if(dt2.getDay()==0) dt2=STX.LegacyMarket.decDate(dt2,2);
					}
				}
			}
			return dt2;
		};
		
		/**
		 * Returns the next period. Takes into account opening and closing times of the market. Not that this currently only works
		 * for intraday periods. It is not smart enough to handle days, weeks or months. Half days are assumed to close at 13:00.
		 * Use {@link STXChart#getNextInterval} for a more generic method of skipping intervals
		 * @param  {date} dt       Start date time as JavaScript Date object
		 * @param  {number} interval Period interval minutes (ie 30 for 30 minute period)
		 * @param  {number} inc      Number of periods in the future to jump
		 * @param  {object} stx      Chart object
		 * @return {date}          A Date object reflecting the requested future period
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.nextPeriod=function(dt, interval, inc, stx){
			var t1=dt.getTime();
			var multiplier=interval;
			if(interval=="minute") multiplier=1;
			t1+=inc*multiplier*60*1000;
			var future=new Date(t1);
			if(!stx.calendarAxis){
				if(stx.chart.beginHour==0 && stx.chart.beginMinute==0){
					if(STX.LegacyMarket.isForexFuturesSymbol(stx.chart.symbol)){
						if(dt.getDay()==5 && dt.getHours()>=18){
							var fmorning=new Date(dt.getYear(), dt.getMonth(), dt.getDate(), 0, 0, 0, 0).getTime();
							fmorning+=2 * 24 * 60 * 60 * 1000;
							fmorning+=15 * 60 * 60 * 1000;	// Currencies open at Sunday 3:00pm
							dt=new Date(fmorning);
						}
					}
				}else{
					var endHour=stx.chart.endHour;
					if(STX.LegacyMarket.isHalfDay(future)){	// Half day
						endHour=13;
					}
					if(future.getHours()>endHour || (future.getHours()==endHour && future.getMinutes()>=stx.chart.endMinute) || future.getHours()==0){
						dt=STX.LegacyMarket.nextDay(dt, 1, stx);
						dt.setHours(stx.chart.beginHour);
						dt.setMinutes(stx.chart.beginMinute);
						dt.setSeconds(0);
						dt.setMilliseconds(0);
						return dt;
					}
				}
			}
			return future;
		};
		
		/**
		 * @see STX.LegacyMarket.nextPeriod
		 * Use {@link STXChart#getNextInterval} for a more generic method of skipping intervals
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.prevPeriod=function(dt, interval, inc, stx){
			var multiplier=interval;
			if(interval=="minute") multiplier=1;
			var t1=dt.getTime();
			if(!stx.calendarAxis && stx.chart.beginHour==0 && dt.getDay()==0 && dt.getHours()<15){	// Forex. Skip from Sunday to Friday evening
				var fridayEvening=new Date(dt.getTime()-(2*24*60*60*1000));
				fridayEvening.setHours(18);
				fridayEvening.setMinutes(0);
				fridayEvening.setSeconds(0);
				fridayEvening.setMilliseconds(0);
				t1=fridayEvening.getTime();
			}else{
				t1-=inc*multiplier*60*1000;
			}
			var past=new Date(t1);
			if(!stx.calendarAxis){
				if(past.getHours()==stx.chart.beginHour && past.getMinutes()<stx.chart.beginMinute){
					var dt2=STX.LegacyMarket.prevDay(dt, 1, stx);
					var endHour=stx.chart.endHour;
					if(STX.LegacyMarket.isHalfDay(dt2)){
						endHour=13;	// Half day
					}
					dt2.setHours(endHour);
					dt2.setMinutes(stx.chart.endMinute);
					dt2.setSeconds(0);
					dt2.setMilliseconds(0);
					return dt2;
				}
			}
			return past;
		};
		
		/**
		 * Increments a date by number of requested weeks
		 * Use {@link STXChart#getNextInterval} for a more generic method of skipping intervals
		 * @param  {date} dt  JavaScript Date object representing starting date
		 * @param  {number} inc Number of weeks to increment into the future
		 * @param  {object} stx A chart object
		 * @return {date}     The requested future date as a Date object
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.nextWeek=function(dt, inc, stx){
			var pd=new Date(dt.getTime());
			if(!inc) inc=1;
			for(var i=0;i<inc;i++){
				for(var j=0;j<14;j++){
					dt=STX.LegacyMarket.nextDay(dt, 1, stx);
					if(dt.getDay()<=pd.getDay()) break;
				}
				if(j==14) console.log("nextWeek function skipped 14 days. Probably infinite loop. Check dates in dataSet.");
				pd=new Date(dt.getTime());
			}
			return dt;
		};
		
		/**
		 * Use {@link STXChart#getNextInterval} for a more generic method of skipping intervals
		 * {@link STX.LegacyMarket.nextWeek}
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.prevWeek=function(dt, inc, stx){
			var pd=new Date(dt.getTime());
			if(!inc) inc=1;
			for(var i=0;i<inc;i++){
				if(pd.getDay()==0){	// Sunday, so we can just subtract 7 and ignore holidays
					dt=pd;
					dt.setDate(dt.getDate()-7);
				}else{
					while(1){
						dt=STX.LegacyMarket.prevDay(dt, 1, stx);
						if(dt.getDay()<=pd.getDay()) break;
					}
				}
				pd=new Date(dt.getTime());
			}
			return dt;
		};
		
		/**
		 * Increments a date by the number of requested months
		 * Use {@link STXChart#getNextInterval} for a more generic method of skipping intervals
		 * @param  {date} dt  Starting date as JavaScript Date object
		 * @param  {number} inc Number of months into the future
		 * @param  {object} stx A chart object
		 * @return {date}     The requested future date as a Date object
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.nextMonth=function(dt, inc, stx){
			if(!inc) inc=1;
			for(var i=0;i<inc;i++){
				var pd=new Date(dt.getTime());
				while(1){
					dt=STX.LegacyMarket.nextDay(dt, 1, stx);
					if(dt.getMonth()!=pd.getMonth()) break;
				}
			}
			return dt;
		};
		
		/**
		 * Use {@link STXChart#getNextInterval} for a more generic method of skipping intervals
		 * @see STX.LegacyMarket.nextMonth
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.prevMonth=function(dt, inc, stx){
			if(!inc) inc=1;
			for(var i=0;i<inc;i++){
				var pd=new Date(dt.getTime());
				while(1){
					dt=STX.LegacyMarket.prevDay(dt, 1, stx);
					if(dt.getMonth()!=pd.getMonth()) break;
				}
			}
			return dt;
		};
		
		/**
		 * Returns the number of minutes after midnight that represents the market open. Uses stx.chart.beginHour and stx.chart.beginMinute
		 * @param  {date} dt  The requested date. If the date is Sunday then the begin time is 3:00 because this means it is a future or forex!
		 * @param  {object} stx A chart object
		 * @return {number}     Number of minutes past midnight that the market opens
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.beginDay=function(dt, stx){
			if(stx.chart.beginHour!=0){
				return stx.chart.beginHour*60 + stx.chart.beginMinute;
			}
			if(dt.getDay()==0) return 15*60;
			return stx.chart.beginHour*60 + stx.chart.beginMinute;
		};
		
		/**
		 * @see STX.LegacyMarket.beginDay
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.endDay=function(dt, stx){
			if(stx.chart.beginHour!=0){
				//Would be nice to take into account half market days for equities
				return stx.chart.endHour*60 + stx.chart.endMinute;
			}
			if(dt.getDay()==5) return 18*60;
			return stx.chart.endHour*60 + stx.chart.endMinute;
		};
		
		/**
		 * Returns true if the date represents the last day in a quarter
		 * @param  {date}  dt The requested date
		 * @return {Boolean}    True if it's the last day in the quarter
		 * @memberOf STX.LegacyMarket
		 */
		STX.LegacyMarket.isQuarterEnd=function(dt){
			if(dt.getMonth()==2){
				if(dt.getDate()==31) return true;
				if(dt.getDay()==5 && (dt.getDate()==30 || dt.getDate()==29)) return true;
				return false;
			}
			if(dt.getMonth()==5){
				if(dt.getDate()==30) return true;
				if(dt.getDay()==5 && (dt.getDate()==29 || dt.getDate()==28)) return true;
				return false;
			}
			if(dt.getMonth()==8){
				if(dt.getDate()==30) return true;
				if(dt.getDay()==5 && (dt.getDate()==29 || dt.getDate()==28)) return true;
				return false;
			}
			if(dt.getMonth()==11){
				if(dt.getDate()==31) return true;
				if(dt.getDay()==5 && (dt.getDate()==29 || dt.getDate()==30)) return true;
				return false;
			}
			return false;
		};
		
		/**
		 * Namespace for functionality related to studies (aka indicators)
		 * @namespace
		 * @name  STX.Studies
		 */
		STX.Studies=function(){}
		
		/**
		 * Maps the names of studies to the panel that they are drawn on. For instance, a moving average may be drawn on an RSI panel
		 * @type {Object}
		 * @memberOf STX.Studies
		 */
		STX.Studies.studyPanelMap={};
		STX.Studies.colorPickerDiv=null;
		
		/**
		 * A study descriptor contains all of the information necessary to instantiate a study.
		 * @param {string} name       The name of the study. This should be unique to the chart. For instance if there are two RSI panels then they should be of different periods and named accordingly. Usually this is determined automatically by the library.
		 * @param {string} type       The type of study, which can be used as a look up in the StudyLibrary
		 * @param {object} panel      A reference to the panel that contains the study (not the name of the panel)
		 * @param {object} inputs     Names and values of input fields
		 * @param {object} outputs    Names and values (colors) of outputs
		 * @param {object} parameters Additional parameters that are unique to the particular study
		 * @memberOf STX.Studies
		 */
		STX.Studies.StudyDescriptor=function(name, type, panel, inputs, outputs, parameters){
			this.name=name;
			this.type=type;
			this.panel=panel;
			this.inputs=inputs;
			this.outputs=outputs;
			this.libraryEntry=STX.Studies.studyLibrary[type];
			this.outputMap={};	// Maps dataSet label to outputs label "RSI (14)" : "RSI", for the purpose of figuring color
			this.min=null;
			this.max=null;
			this.parameters=parameters;	// Optional parameters, i.e. zones
		};
		
		/**
		 * Automatically generates a unique name for the study instance. If a translation callback has been associated with the chart
		 * object then the name of the study will be translated.
		 * @param  {object} stx       A chart object
		 * @param  {string} studyName Type of study
		 * @param  {object} inputs    The inputs for this study instance
		 * @return {string}           A unique name for the study
		 * @memberOf STX.Studies
		 */
		STX.Studies.generateID=function(stx, studyName, inputs){
			var translatedStudy=studyName;
			if(stx) translatedStudy=stx.translateIf(translatedStudy);
			id=translatedStudy + " (";
			var first=false;
			for(var field in inputs){
				if(!first){
					first=true;
				}else{
					id+=",";
				}
				var val=inputs[field];
				id+=val;
			}
			id+=")";
			return id;
		};
		
		/**
		 * Converts a study dialog into an actual study. Study Dialogs must follow a specific UI format (@see STX.Studies.studyDialog) in order
		 * for this function to operate correctly. Typically it will be called when a user clicks the "submit" button on an HTML study dialog window.
		 * @param  {object} div The DOM element that is the study dialog
		 * @param  {object} stx A chart object
		 * @return {object}     The study descriptor is returned. This can be used in the future for deleting the study programatically.
		 * @memberOf STX.Studies
		 */
		STX.Studies.go=function(div, stx){
			var inputs={}; var outputs={};
			var translatedStudy=div.study;
			if(stx) translatedStudy=stx.translateIf(translatedStudy);
			inputs.id = translatedStudy + " (";
			var inputItems=div.querySelectorAll(".inputTemplate");
			var first=false;
			for(var i=0;i<inputItems.length;i++){
				if(inputItems[i].style.display!="none"){
					var field=inputItems[i].querySelectorAll(".stx-heading")[0].fieldName;
					var inputDOM=inputItems[i].querySelectorAll(".stx-data")[0].childNodes[0];
					var value=inputDOM.value;
					if(inputDOM.getAttribute("type")=="checkbox"){
						inputs[field]=inputDOM.checked;
					}else{
						inputs[field]=value;
					}
					if(!first){
						first=true;
					}else{
						inputs.id+=",";
					}
					if(inputDOM.getAttribute("type")=="checkbox"){
						inputs.id+=inputDOM.checked?"T":"F";
					}else{
						var translatedValue=value;
						if(stx) translatedValue=stx.translateIf(translatedValue);
						inputs.id+=translatedValue;
					}
				}
			}
			inputs.id+=")";
			if(inputItems.length==1){
				inputs.id=div.study;
			}
			var outputItems=div.querySelectorAll(".outputTemplate");
			for(var i=0;i<outputItems.length;i++){
				if(outputItems[i].style.display!="none"){
					var field=outputItems[i].querySelectorAll(".stx-heading")[0].fieldName;
					var color=outputItems[i].querySelectorAll(".stx-color")[0].style.backgroundColor;
					if(!color || color=="") color="auto";
					outputs[field]=color;
				}
			}
			//if(div.stx.panelExists(inputs.id)) return null;
		
			var parameters={};
			STX.Studies.getCustomParameters(div, parameters);
			var sd=STX.Studies.addStudy(div.stx, div.study, inputs, outputs, parameters);
			div.stx.draw();
			return sd;
		};
		
		/**
		 * This method parses out custom parameters from the study dialog. For this to work, the studyLibrary entry
		 * must contain a value "parameters". This object should then include a "template" which is the id of the html
		 * element that is appended to the studyDialog. Then another object "init" should contain all of the id's
		 * within that template which contain data. It is currently used to create "zones" in study panels.
		 * @param {object} div The study dialog window
		 * @param {object} parameters An object containing the parameters to set in the study dialog window. These parameters would typicaly come from the study descriptor (library entry).
		 * @memberOf STX.Studies
		 */
		STX.Studies.getCustomParameters=function(div, parameters){
			var sd=STX.Studies.studyLibrary[div.study];
			if(!sd) return;
			if(!sd.parameters) return;
			if(!sd.parameters.template) return;
			if(!sd.parameters.init) return;
			var template=div.querySelectorAll("#" + sd.parameters.template)[0];
			if(!template) return;
			for(var field in sd.parameters.init){
				var el=template.querySelectorAll("#" + field)[0];
				if(!el) continue;
				if(el.tagName=="INPUT"){
					if(el.type=="checkbox"){
						parameters[field]=el.checked;
					}else{
						parameters[field]=el.value;
					}
				}else{
					parameters[field]=el.style.backgroundColor;
				}
			}
		};
		
		/**
		 * Prepares a study descriptor for use by assigning default calculation or display functions if required and configuring the outputMap
		 * which is used internally to determine the color for each output. This method also places any overlays into the stx.overlays array for
		 * future reference.
		 * @private
		 * @param  {object} stx   A chart object
		 * @param  {object} study The study library entry
		 * @param  {object} sd    The study descriptor for this instance
		 * @memberOf STX.Studies
		 */
		STX.Studies.prepareStudy=function(stx, study, sd){
			if(typeof(study.calculateFN)=="undefined") study.calculateFN=STX.Studies.passToModulus;
			if(typeof(study.seriesFN)=="undefined") study.seriesFN=STX.Studies.displaySeriesAsLine;
			if(sd.chart.dataSet && study.calculateFN) study.calculateFN(stx, sd);
			// Unless overriden by the calculation function we assume the convention that the dataSet entries
			// will begin with the output name such as "RSI rsi (14)"
			if(STX.isEmpty(sd.outputMap)){
				for(var i in sd.outputs){
					sd.outputMap[i + " " + sd.name]=i;
				}
			}
			if(study.overlay){
				stx.overlays[sd.name]=sd;
			}
		
		};
		
		/**
		 * Adds a study to the chart. A layout change event is triggered when this occurs.
		 * @param {object} stx        The chart object
		 * @param {string} type       The type of study (to reference the studyLibrary)
		 * @param {object} inputs     Inputs for the study instance
		 * @param {object} outputs    Outputs for the study instance
		 * @param {object} [parameters] Optional additional custom parameters for this study
		 * @param {string} [panel] Optionaly specify the panel. If not specified then an attempt will be made to locate a panel based on the input id or otherwise created if required.
		 * @return {object} A study descriptor which can be used to remove or modify the study.
		 * @memberOf STX.Studies
		 */
		STX.Studies.addStudy=function(stx, type, inputs, outputs, parameters, panel){
			var study=STX.Studies.studyLibrary[type];
			if(!study) study={};
			if(!parameters) parameters={};
			if(!parameters.chartName) parameters.chartName="chart";
			var sd=null;
			if(study.initializeFN){
				sd=study.initializeFN(stx, type, inputs, outputs, parameters, panel);
			}else{
				sd=STX.Studies.initializeFN(stx, type, inputs, outputs, parameters, panel);
			}
			sd.chart=stx.charts[parameters.chartName];
			if(!sd) return;
			if(!stx.layout.studies) stx.layout.studies={};
			stx.layout.studies[sd.inputs["id"]]=sd;
			stx.changeOccurred("layout");
			STX.Studies.prepareStudy(stx, study, sd);
			sd.study=study;
			sd.type=type;
			return sd;
		};
		
		/**
		 * A convenience function for programatically adding a study.
		 * @param  {object} stx        The chart object
		 * @param  {string} studyName  The name of the study (out of the studyLibrary)
		 * @param  {object} inputs     The input values for this study instance
		 * @param  {object} [outputs]    Optional output colors
		 * @param  {object} [parameters] Optional custom parameters if the study requires/supports them
		 * @return {object}            Returns a study descriptor which can be used to delete or modify the study.
		 * @memberOf STX.Studies
		 */
		STX.Studies.quickAddStudy=function(stx, studyName, inputs, outputs, parameters){
			if(!parameters) parameters={};
			var sl=STX.Studies.studyLibrary[studyName];
			if(!inputs && sl) inputs=sl.inputs;
			if(!inputs) inputs={};
			if(!outputs && sl) outputs=sl.outputs;
			if(!outputs) outputs={"Result":"auto"};
			inputs.id=STX.Studies.generateID(stx, studyName, inputs);
			var sd=STX.Studies.addStudy(stx, studyName, inputs, outputs, parameters);
			stx.draw();
			return sd;
		};
		
		/**
		 * Removes a study from the chart (and panel if applicable)
		 * @param  {object} stx A chart object
		 * @param  {object} sd  A study descriptor returned from {@link STX.Studies.quickAddStudy} or {@link STX.Studies.go}
		 * @memberOf STX.Studies
		 */
		STX.Studies.removeStudy=function(stx, sd){
			if(sd.libraryEntry && sd.libraryEntry.overlay){
				stx.removeOverlay(sd.name);
				stx.draw();
			}else{
				var panel=stx.panels[sd.panel];
				if(panel)
					stx.panelClose(panel);
			}
		};
		
		/**
		 * Renders a study dialog in standard form. The study dialog must be of specific format as provided in sample html files.
		 * @param  {object} stx   Chart object
		 * @param  {string} study Study type (as in studyLibrary)
		 * @param  {object} div   The study dialog DOM element which should already exist in the HTML
		 * @memberOf STX.Studies
		 */
		STX.Studies.studyDialog=function(stx, study, div){
			div.style.display="block";
			div.study=study;
			div.stx=stx;
			var chart=stx.chart;	// Currently the dialog only supports adding studies to the primary chart
		
			var inputs=div.querySelectorAll("#inputs")[0];
			var inputItems=inputs.querySelectorAll(".inputTemplate");
			for(var i=0;i<inputItems.length;i++){
				if(inputItems[i].style.display!="none"){
					inputs.removeChild(inputItems[i]);
				}
			}
			var outputs=div.querySelectorAll("#outputs")[0];
			var outputItems=outputs.querySelectorAll(".outputTemplate");
			for(var i=0;i<outputItems.length;i++){
				if(outputItems[i].style.display!="none"){
					outputs.removeChild(outputItems[i]);
				}
			}
		
			var sd=STX.Studies.studyLibrary[study];
			if(!sd) sd={};
			if(typeof(sd.inputs)=="undefined") sd.inputs={"Period":14};
			for(var i in sd.inputs){
				var newInput=inputItems[0].cloneNode(true);
				inputs.appendChild(newInput);
				newInput.style.display="block";
				newInput.querySelectorAll(".stx-heading")[0].innerHTML=stx.translateIf(i);
				newInput.querySelectorAll(".stx-heading")[0].fieldName=i;
				var formField=null;
				var acceptedData=sd.inputs[i];
				if(acceptedData.constructor==Number){
					formField=document.createElement("input");
					formField.setAttribute("type", "number");
					formField.value=acceptedData;
				}else if(acceptedData.constructor==String){
					if(acceptedData=="ma" || acceptedData=="ema"){
						formField=document.createElement("select");
						var option=document.createElement("OPTION");option.value="simple";option.text=stx.translateIf("Simple");formField.add(option, null);
						var option=document.createElement("OPTION");option.value="exponential";option.text=stx.translateIf("Exponential");formField.add(option, null);
						if(acceptedData=="ema") option.selected=true;
						var option=document.createElement("OPTION");option.value="time series";option.text=stx.translateIf("Time Series");formField.add(option, null);
						var option=document.createElement("OPTION");option.value="triangular";option.text=stx.translateIf("Triangular");formField.add(option, null);
						var option=document.createElement("OPTION");option.value="variable";option.text=stx.translateIf("Variable");formField.add(option, null);
						var option=document.createElement("OPTION");option.value="weighted";option.text=stx.translateIf("Weighted");formField.add(option, null);
						var option=document.createElement("OPTION");option.value="wells wilder";option.text=stx.translateIf("Wells Wilder");formField.add(option, null);
					}else if(acceptedData=="field"){
						formField=document.createElement("select");
						var count=0;
						for(var field in chart.dataSet[chart.dataSet.length-1]){
							if(["Date","DT","projection","split","distribution", "atr", "stch_14", "ratio","transform","cache"].indexOf(field) >= 0) continue;
							if(field=="Volume" && !stx.panels["vchart"]) continue;
							var option=document.createElement("OPTION");
							option.value=field;
							option.text=stx.translateIf(field);
							formField.add(option, null);
							if(field=="Close") formField.selectedIndex=count;
							count++;
						}
					}
				}else if(acceptedData.constructor==Boolean){
					formField=document.createElement("input");
					formField.setAttribute("type","checkbox");
					if(acceptedData==true) formField.checked=true;
				}else if(acceptedData.constructor==Array){
					formField=document.createElement("select");
					for(var i=0;i<acceptedData.length;i++){
						var option=document.createElement("OPTION");option.value=acceptedData[i];option.text=acceptedData[i];formField.add(option, null);
					}
				}
				if(formField) newInput.querySelectorAll(".stx-data")[0].appendChild(formField);
			}
			if(typeof(sd.outputs)=="undefined") sd.outputs={"Result":"auto"};
			for(var i in sd.outputs){
				var newOutput=outputItems[0].cloneNode(true);
				outputs.appendChild(newOutput);
				newOutput.style.display="block";
				newOutput.querySelectorAll(".stx-heading")[0].innerHTML=stx.translateIf(i);
				newOutput.querySelectorAll(".stx-heading")[0].fieldName=i;
				var colorClick=newOutput.querySelectorAll(".stx-color")[0];
				if(sd.outputs[i]!="auto"){
					colorClick.style.backgroundColor=sd.outputs[i];
					STX.unappendClassName(colorClick, "stxColorDarkChart");
				}else{
					if(stx.defaultColor=="#FFFFFF") STX.appendClassName(colorClick, "stxColorDarkChart");
				}
		
				STX.attachColorPicker(colorClick, div);
			}
		
			// Optional parameters for studies. This is driven by a UI template that must be created by the developer, and which
			// is referenced from the study description (studyLibrary entry).
			var parametersEL=div.querySelectorAll("#parameters")[0];
			if(parametersEL){
				STX.clearNode(parametersEL);
				if(sd.parameters && sd.parameters.template && sd.parameters.init){
					var template=document.querySelectorAll("#" + sd.parameters.template)[0];
					if(template){
						template=template.cloneNode(true);
						template.style.display="block";
						parametersEL.appendChild(template);
						for(var field in sd.parameters.init){
							var value=sd.parameters.init[field];
							var el=template.querySelectorAll("#" + field)[0];
							if(!el) continue;
							if(el.tagName=="INPUT"){
								if(el.type=="checkbox"){
									el.checked=value;
								}else{
									el.value=value;
								}
							}else{
								if(value=="auto"){
									value="";
									if(stx.defaultColor=="#FFFFFF") STX.appendClassName(el, "stxColorDarkChart");
								}else{
									STX.unappendClassName(el, "stxColorDarkChart");
								}
								el.style.backgroundColor=value;
								STX.attachColorPicker(el, div);
							}
						}
					}
				}
			}
		};
		
		/**
		 * This method displays all of the studies for a chart. It is called from within the chart draw() loop.
		 * @private
		 * @param  {object} stx The chart
		 * @memberOf STX.Studies
		 */
		STX.Studies.displayStudies=function(stx){
			var s=stx.layout.studies;
			if(!s) return;
			for(var panelName in stx.panels){
				stx.panels[panelName].min=null;
				stx.panels[panelName].axisDrawn=false;	// to prevent y-axis from being drawn multiple times
			}
			for(var n in s){
				var sd=s[n];
				var panel=stx.panels[sd.panel];
				if(panel){
					if(panel.hidden) continue;
					if(sd.permanent){
						if(panel.closeX){
							panel.closeX.style.display="none";
						}else{
							panel.close.style.display="none";
						}
					}
					//panel.axisDrawn=false;	// to prevent y-axis from being drawn multiple times
				}
				var libraryEntry=STX.Studies.studyLibrary[sd.type];
				var quotes=sd.chart.dataSegment;									// Find the appropriate data to drive this study
				if(!libraryEntry || typeof(libraryEntry.seriesFN)=="undefined"){	// null means don't display, undefined means display by default as a series
					STX.Studies.displaySeriesAsLine(stx, sd, quotes);
				}else{
					if(libraryEntry.seriesFN){
						if(panel) libraryEntry.seriesFN(stx, sd, quotes);
					}
				}
			}
		};
		
		/**
		 * Convenience function for determining the min and max for a given data point
		 * @param {object} stx The chart
		 * @param {string} name The field to evaluate
		 * @param {array} quotes The array of quotes to evaluate (typically dataSet, scrubbed or dataSegment)
		 * @memberOf STX.Studies
		 */
		STX.Studies.calculateMinMaxForDataPoint=function(stx, name, quotes){
			var min=2000000000;
			var max=-2000000000;
			for(var i=0;i<quotes.length;i++){
				var m=quotes[i][name];
				if(typeof m=="undefined" || m==null) continue;
				if(isNaN(m)) continue;
				min=Math.min(m,min);
				max=Math.max(m,max);
			}
			return {"min":min,"max":max};
		};
		
		/**
		 * Method to determine the minimum and maximum points in a study panel. The studyLibrary is checked for the type of range. If the range
		 * is dynamic then the output values for the study are checked for minimum and maximum values. If a histogram is being printed then
		 * the values for the histogram (represented by sd.name+"_hist") are also checked. This method does not draw the yAxis but it does compute
		 * the high, low and shadow that the yAxis utilizes when drawn.
		 * @param  {object} stx    The chart object
		 * @param  {object} sd     The study descriptor
		 * @param  {array} quotes The set of quotes to evaluate
		 * @memberOf STX.Studies
		 */
		STX.Studies.determineMinMax=function(stx, sd, quotes){
			var panel=stx.panels[sd.panel];
			if(!panel) return;
			if(panel.min!=null) return;
			if(sd.min==null){
				if(sd.libraryEntry && sd.libraryEntry.range=="0 to 100"){
					panel.min=0; panel.max=100;
				}else if(sd.libraryEntry && sd.libraryEntry.range=="-1 to 1"){
					panel.min=-1; panel.max=1;
				}else if(!sd.libraryEntry || sd.libraryEntry.range!="bypass"){
					panel.min=2000000000;
					panel.max=-2000000000;
					for(var i=0;i<quotes.length;i++){
						var quote=quotes[i];
						if(!quote) continue;
						for(var j in sd.outputMap){
							var m=quote[j];
							if(typeof m=="undefined" || m==null) continue;
							if(isNaN(m)) continue;
							panel.min=Math.min(m,panel.min);
							panel.max=Math.max(m,panel.max);
						}
						var m=quote[sd.name+"_hist"];
						if(typeof m=="undefined" || m==null) continue;
						if(isNaN(m)) continue;
						panel.min=Math.min(m,panel.min);
						panel.max=Math.max(m,panel.max);
					}
				}
			}else{
				panel.min=sd.min; panel.max=sd.max;
			}
			panel.shadow=panel.max-panel.min;
			if(panel.max>0 && panel.min<0) panel.shadow=panel.max + panel.min*-1;
			panel.yAxis.high=panel.max;
			panel.yAxis.low=panel.min;
			panel.yAxis.shadow=panel.yAxis.high-panel.yAxis.low;
		};
		
		/**
		 * Creates the yAxis for a study panel. Utilizes STXChart.createYAxis internally. This method is not re-entrant. panel.axisDrawn will be set
		 * to true in order to prevent the yAxis from being drawn multiple times if there are multiple studies on a panel. The first study on the panel
		 * will therefore determine the minimum and maximum bounds of the panel. If the library entry defines a yaxis function then it will be used
		 * to render the yaxis instead of STXChart.createYAxis. If zones are enabled then STXChart.createYAxis again will not be the renderer.
		 * @param  {object} stx    The chart object
		 * @param  {object} sd     The study descriptor
		 * @param  {array} quotes The set of quotes (representing dataSegment)
		 * @param  {object} panel  A reference to the panel
		 * @memberOf STX.Studies
		 */
		STX.Studies.createYAxis=function(stx, sd, quotes, panel){
			if(!panel.axisDrawn){
				panel.height=panel.bottom-panel.top;
				STX.Studies.determineMinMax(stx, sd, quotes);
				panel.yAxis.displayGridLines=false;	// Don't display grid lines on studies
				if(sd.libraryEntry && sd.libraryEntry.yaxis){
					var parameters={"dontDraw":true};
					stx.createYAxis(panel, parameters);
					stx.drawYAxis(panel, parameters);
					sd.libraryEntry.yaxis(stx, sd);
				}else{
					// If zones are enabled then we don't want to draw the yAxis
					var parameters={
							"noDraw": (sd.parameters && sd.parameters.studyOverZonesEnabled)
					};
					stx.createYAxis(panel, parameters);
					if(panel.name!="vchart") stx.drawYAxis(panel, parameters);
				}
				if(panel.min<0 && panel.max>0){
					STX.Studies.drawHorizontal(stx, sd, quotes, 0);
				}
				panel.axisDrawn=true;
			}
		};
		
		/**
		 * Displays a series as a line in a panel. For most custom studies this function will do the work for you.
		 * @param  {object} stx    The chart object
		 * @param  {object} sd     The study descriptor
		 * @param  {array} quotes The set of quotes (dataSegment)
		 * @memberOf STX.Studies
		 */
		STX.Studies.displaySeriesAsLine=function(stx, sd, quotes){
			if(quotes.length==0) return;
			var panel=stx.panels[sd.panel];
			if(!panel) return;
			if(panel.hidden==true) return;
			if(panel.name!=sd.chart.name){
				STX.Studies.createYAxis(stx, sd, quotes, panel);
			}
		
			for(var i in sd.outputMap){
				STX.Studies.displayIndividualSeriesAsLine(stx, sd, panel, i, quotes);
			}
		};
		
		/**
		 * Displays multiple outputs as series on a panel. This is the default display function for an indicator and will
		 * work for 90% of custom indicators.
		 * @param  {object} stx    The chart object
		 * @param  {object} sd     The study descriptor
		 * @param  {object} panel  A reference to the study panel
		 * @param  {string} name   The name of this study instance
		 * @param  {array} quotes The array of quotes (dataSegment)
		 * @memberOf STX.Studies
		 */
		STX.Studies.displayIndividualSeriesAsLine=function(stx, sd, panel, name, quotes){
			if(!panel.height) panel.height=panel.bottom-panel.top;
			//var chart=panel.chart;
			STX.Studies.studyPanelMap[name]=panel.name;
		    var context=stx.chart.context;
			context.lineWidth=1;
			if(sd.highlight) context.lineWidth=3;
			var color=sd.outputs[sd.outputMap[name]];
			if(color=="auto") color=stx.defaultColor;	// This is calculated and set by the kernel before draw operation.
			context.strokeStyle=color;
		
		    stx.plotLineChart(panel, quotes, name, {skipTransform:true, label:stx.preferences.labels});
		
			if(sd.libraryEntry && sd.libraryEntry.appendDisplaySeriesAsLine) sd.libraryEntry.appendDisplaySeriesAsLine(stx, sd, quotes, name, panel);
		};
		
		/**
		 * Draws a horizontal line on the study.
		 * @param  {object} stx    The chart object
		 * @param  {object} sd     The study descriptor
		 * @param  {array} quotes The array of quots (unused)
		 * @param  {number} price  The price (value) to draw the horizontal line
		 * @memberOf STX.Studies
		 */
		STX.Studies.drawHorizontal=function(stx, sd, quotes, price){
			var panel = stx.panels[sd.name];
			if(!panel) return;
		
			//var yAxis=panel.yAxis;
			var y=stx.pixelFromPrice(0, panel);
			stx.plotLine(stx.chart.left, stx.chart.width, y, y, "#DDDDDD", "line", stx.chart.context, false, {});
		};
		
		/**
		 * A sample of a custom display function. This function creates the yAxis, draws a histogram and then plots the series
		 * @memberOf STX.Studies
		 */
		STX.Studies.displayKlinger=function(stx, sd, quotes) {
			var panel=stx.panels[sd.panel];
			STX.Studies.createYAxis(stx, sd, quotes, panel);
			STX.Studies.createHistogram(stx, sd, quotes);
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);
		};
		
		/**
		 * A sample study calculation function. Note how sd.chart.scrubbed is used instead of dataSet. Also note the naming convention
		 * for the outputs.
		 * @memberOf STX.Studies
		 */
		STX.Studies.calculateKlinger=function(stx, sd){
			STX.Studies.passToModulus(stx, sd);
			var field=sd.name+"_hist", klinger="Klinger " + sd.name, klingerSignal="KlingerSignal " + sd.name;
			for(var i=0;i<sd.chart.scrubbed.length;i++){
				var quote=sd.chart.scrubbed[i];
				quote[field]=quote[klinger]-quote[klingerSignal];
			}
		};
		
		/**
		 * Another sample display function
		 * @memberOf STX.Studies
		 */
		STX.Studies.displayMACD=function(stx, sd, quotes) {
			var panel=stx.panels[sd.panel];
			STX.Studies.createYAxis(stx, sd, quotes, panel);
			STX.Studies.createHistogram(stx, sd, quotes, false);
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);
		};
		
		/**
		 * A sample display function for an overlay. An overlay displays in the chart area. Note the use of "Result PSAR" as the output. When only
		 * one output is available (and unspecified) then "Result " + sd.name is the default convention.
		 *
		 * Also note the use of clipping to ensure that the overlay doesn't print outside of the panel
		 *
		 * Finally note that when color=="auto" you can use stx.defaultColor which will automatically adjust based on the background color. This
		 * is the default for studies that use the color picker for user selection of output colors.
		 * @memberOf STX.Studies
		 */
		STX.Studies.displayPSAR2=function(stx, sd, quotes){
			stx.startClip(sd.panel);
			stx.chart.context.beginPath();
			var field="Result " + sd.name;
			for(var x=0;x<quotes.length;x++){
				var quote=quotes[x];
				if(quote==null) continue;
				var x0=stx.computePosition(x, 0);
				var y0=stx.pixelFromPrice(quote[field], stx.panels[sd.panel]);
				stx.chart.context.moveTo(x0,y0);
				stx.chart.context.lineTo(x0+3, y0);
			}
			stx.chart.context.lineWidth=1;
			if(sd.highlight) stx.chart.context.lineWidth=3;
			var color=sd.outputs["Result"];
			if(color=="auto") color=stx.defaultColor;	// This is calculated and set by the kernel before draw operation.
			stx.chart.context.strokeStyle=color;
			stx.chart.context.stroke();
			stx.chart.context.closePath();
			stx.endClip();
		};
		
		// Centered will center the histogram on the panel, otherwise the histogram is centered on the zero axis. Note the convention
		// to use sd.name+"_hist" for histogram values on a study
		/**
		 * Draws a histogram on the study.
		 * @param  {object} stx      The chart object
		 * @param  {object} sd       The study descriptor
		 * @param  {array} quotes   The quotes (dataSegment)
		 * @param  {boolean} centered If true then the histogram will be physically centered on the yAxis, otherwise it will be centered at the zero value on the yAxis
		 * @memberOf STX.Studies
		 */
		STX.Studies.createHistogram=function(stx, sd, quotes, centered){
			STX.Studies.determineMinMax(stx, sd, quotes);
			var panel = stx.panels[sd.name];
		
			var myWidth=stx.layout.candleWidth-2;
			if(myWidth<2) myWidth=1;
		
			var y=stx.pixelFromPrice(0, panel);
			if(centered){
				y=panel.top + panel.height/2;
			}
		
			var context=stx.chart.context;
			var field=sd.name+"_hist";
			context.beginPath();
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(quote==null) continue;
				var x0=stx.computePosition(i, 1);
				var x1=x0 + myWidth;
				var y1=stx.pixelFromPrice(quote[field], panel);
				context.moveTo(x0, y);
				context.lineTo(x1, y);
				context.lineTo(x1, y1);
				context.lineTo(x0, y1);
				context.lineTo(x0, y);
			}
			stx.canvasColor("stx_histogram");
			context.fill();
			context.closePath();
			context.globalAlpha=1;
		};
		
		/**
		 * Used to reduce certain common fields to abbreviated form for display in study panel labels
		 * @type {Object}
		 * @memberOf STX.Studies
		 */
		STX.Studies.prettify={
				"Close":"C",
				"Open":"O",
				"High":"H",
				"Low":"L",
				",simple":"",
				"simple":"",
				"exponential":"ema",
				"time series":"ts",
				"triangular":"tri",
				"variable":"var",
				"weighted":"wa",
				"wells wilder":"ww"
		};
		
		STX.Studies.prettyRE=/^.*\((.*?)\).*$/;
		
		/**
		 * Convert a study ID into a displayable format
		 * @private
		 * @param  {string} id The ID
		 * @return {string}    A pretty (shortened) ID
		 * @memberOf STX.Studies
		 */
		STX.Studies.prettyDisplay=function(id){
			var match = STX.Studies.prettyRE.exec(id);
			if(!match) return id;
			var guts=match[1];
			if(guts){
				for(var i in STX.Studies.prettify){
					guts=guts.replace(i, STX.Studies.prettify[i]);
				}
				id=id.replace(match[1], guts);
			}
			return id;
		};
		
		/**
		 * The default initialize function for a study. It creates the study descriptor. It creates the panel if one is required.
		 * @param  {object} stx        The chart object
		 * @param  {string} type       The type of study (from studyLibrary)
		 * @param  {object} inputs     The inputs for the study instance
		 * @param  {object} outputs    The outputs for the study instance
		 * @param  {object} [parameters] Optional parameters if required or supported by this study
		 * @param {string} [panel] Optional panel. If not provided then the panel will be determined dynamically.
		 * @return {object}            The newly initialized study descriptor
		 * @memberOf STX.Studies
		 */
		STX.Studies.initializeFN=function(stx, type, inputs, outputs, parameters, panel){
			if(!inputs) inputs={
					id: type
			};
			if(!parameters) parameters={};
			if(!inputs.display) inputs.display=STX.Studies.prettyDisplay(inputs.id);
			var sd=new STX.Studies.StudyDescriptor(inputs.id, type, inputs.id, inputs, outputs, parameters);
			if(inputs["Period"]) sd.days=parseFloat(sd.inputs["Period"]);
			var study=STX.Studies.studyLibrary[type];
			var panelName=panel;
			if(!panelName) panelName=inputs.id;
			if(stx.panelExists(panelName)){
				sd.panel=panelName;
			}else if(!study || !study.overlay){
				stx.createPanel(inputs.display, inputs.id, null, parameters.chartName);
			}else{
				var panel=null;
				if(inputs["Field"]){
					panel=STX.Studies.studyPanelMap[inputs["Field"]];
					if(inputs["Field"]=="Volume") panel="vchart";
				}
				if(!panel) panel=parameters.chartName;	// If a panel isn't specified then this is an overlay on the chart itself
				sd.panel=panel;
			}
			return sd;
		};
		
		/**
		 * A sample of a custom initialize function. It is rare that one would be required. In this case we simply customize the input display
		 * but otherwise call the default.
		 * @memberOf STX.Studies
		 */
		STX.Studies.initializeStochastics=function(stx, type, inputs, outputs){
			inputs.display="Stoch (" + inputs["Period"] + ")";
			return STX.Studies.initializeFN.apply(null, arguments);
		};
		
		/**
		 * Plots over/under zones for indicators that support them, and when the user selects them. This method will draw its own
		 * yAxis which will not have a scale, but merely the over under points.
		 * @private
		 * @memberOf STX.Studies
		 */
		STX.Studies.overZones=function(stx, sd, quotes){
			if(quotes.length==0) return;
			var panel=stx.panels[sd.panel];
			if(!panel) return;
			if(panel.hidden==true) return;
			//var parameters=sd.parameters;
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);
			if(sd.parameters && sd.parameters.studyOverZonesEnabled){
				var overBought=parseFloat(sd.parameters.studyOverBoughtValue), overSold=parseFloat(sd.parameters.studyOverSoldValue);
				var ypx=panel.height/panel.shadow;
				var overBoughtY=panel.bottom-ypx*overBought;
				var overSoldY=panel.bottom-ypx*overSold;
				var parameters={
					lineWidth: 1
				};
				stx.chart.context.globalAlpha=.2;
				stx.plotLine(0,stx.chart.width-5, overBoughtY, overBoughtY, sd.parameters.studyOverBoughtColor, "segment", stx.chart.context, false, parameters);
				stx.chart.context.globalAlpha=.2;
				stx.plotLine(0,stx.chart.width-5, overSoldY, overSoldY, sd.parameters.studyOverSoldColor, "segment", stx.chart.context, false, parameters);
		
				if(!sd.libraryEntry.yaxis){
					// Draw the y-axis with overbought/oversold
					var fontHeight=stx.getCanvasFontSize("stx_yaxis");
					stx.canvasFont("stx_yaxis");
					stx.canvasColor("stx_yaxis");
					stx.chart.context.fillText(overBought, stx.chart.width, overBoughtY + (fontHeight/2));
					stx.chart.context.fillText(overSold, stx.chart.width, overSoldY + (fontHeight/2));
					panel.axisDrawn=true;
				}
			}
		};
		
		STX.Studies.calculateMACD=function(stx, sd) { STX.Studies._calculateMACD(stx, sd); };
		STX.Studies.calculateRSI=function(stx, sd){STX.Studies._calculateRSI(stx,sd);};
		STX.Studies.calculateStochastics=function(stx, sd){STX.Studies._calculateStochastics(stx, sd);};
		STX.Studies.passToModulus=function(stx, sd){STX.Studies._passToModulus(stx, sd);};
		STX.Studies.calculateMovingAverage=function(stx, sd){STX.Studies._calculateMovingAverage(stx, sd);};
		
		/**
		 * The studyLibrary defines all of the available studies. This is used to drive the dialog boxes and creation of the studies. When you
		 * create a custom study you should add it to the studyLibrary. If a study is not in the studyLibrary then it is assumed to be available
		 * in passToModulus() which contains the default modulus library of technical indicators.
		 * @type {Object}
		 * @memberOf STX.Studies
		 */
		STX.Studies.studyLibrary={
				"rsi": {
					"inputs": {"Period":14},
					"calculateFN": STX.Studies.calculateRSI,
					"seriesFN": STX.Studies.overZones,
					"range": "0 to 100",
					"outputs":{"RSI":"auto"},
					"parameters": {
						template:"studyOverZones",
						init:{studyOverZonesEnabled:true, studyOverBoughtValue:80, studyOverBoughtColor:"auto", studyOverSoldValue:20, studyOverSoldColor:"auto"}
					}
				},
				"ma": {
					"overlay": true,
					"range": "bypass",
					"calculateFN": STX.Studies.calculateMovingAverage,
					"inputs": {"Period":50,"Field":"field","Type":"ma"},
					"outputs": {"MA":"#FF0000"}
				},
				"macd": {
					"calculateFN": STX.Studies.calculateMACD,
					"seriesFN": STX.Studies.displayMACD,
					"inputs": {"Fast MA Period":12,"Slow MA Period":26,"Signal Period":9},
					"outputs":{"MACD":"auto", "Signal":"#FF0000"}
				},
				"stochastics": {
					"initializeFN": STX.Studies.initializeStochastics,
					"calculateFN": STX.Studies.calculateStochastics,
					"inputs": {"Period":14,"Smooth":true},
					"outputs":{"Fast":"auto", "Slow":"#FF0000"}
				},
				"Aroon": {
					"range": "0 to 100",
					"outputs":{"Aroon Up":"#00FF00", "Aroon Down":"#FF0000"}
				},
				"Lin R2": {
					"inputs": {"Period":14,"Field":"field"},
					"outputs":{"RSquared":"auto"}
				},
				"Lin Fcst": {
					"overlay": true,
					"inputs": {"Period":14,"Field":"field"},
					"outputs":{"Forecast":"auto"}
				},
				"Lin Incpt": {
					"overlay": true,
					"inputs": {"Period":14,"Field":"field"},
					"outputs":{"Intercept":"auto"}
				},
				"Time Fcst": {
					"overlay": true,
					"inputs": {"Period":14,"Field":"field"}
				},
				"VIDYA": {
					"overlay": true,
					"inputs": {"Period":50,"Field":"field", "R2 Scale":.65}
				},
				"STD Dev": {
					"inputs": {"Period":14,"Field":"field", "Standard Deviations":2, "Moving Average Type":"ma"}
				},
				"Trade Vol": {
					"inputs": {"Field":"field", "Min Tick Value":.5}
				},
				"Swing": {
					"inputs": {"Limit Move Value":.5}
				},
				"Acc Swing": {
					"inputs": {"Limit Move Value":.5}
				},
				"Price Vol": {
					"inputs": {"Field":"field"}
				},
				"Pos Vol": {
					"inputs": {"Field":"field"}
				},
				"Neg Vol": {
					"inputs": {"Field":"field"}
				},
				"On Bal Vol": {
					"inputs": {"Field":"field"}
				},
				"Perf Idx": {
					"inputs": {"Field":"field"}
				},
				"Stch Mtm": {
					"inputs": {"%K Periods":13,"%K Smoothing Periods":25, "%K Double Smoothing Periods":2, "%D Periods":9, "Moving Average Type":"ma", "%D Moving Average Type":"ma"},
					"outputs":{"%K":"auto", "%D":"#FF0000"}
				},
				"Hist Vol": {
					"inputs": {"Field":"field", "Period":14, "Bar History":10, "Standard Deviations":2}
				},
				"Ultimate": {
					"inputs": {"Cycle 1":3, "Cycle 2":8, "Cycle 3":14}
				},
				"W Acc Dist": {
					"inputs": {}
				},
				"Vol Osc": {
					"inputs": {"Short Term Periods":8, "Long Term Periods":14, "Points Or Percent":["Points","Percent"]}
				},
				"Chaikin MF": {
					"inputs":{"Period":20}
				},
				"Chaikin Vol": {
					"inputs": {"Period":14, "Rate Of Change":2, "Moving Average Type":"ma"}
				},
				"Price Osc": {
					"inputs": {"Field":"field", "Long Cycle":8, "Short Cycle":3, "Moving Average Type":"ma"}
				},
				"EOM": {
					"inputs": {"Period":14, "Moving Average Type":"ma"}
				},
				"CCI": {
					"inputs": {"Period":20}
				},
				"Detrended": {
					"inputs": {"Field":"field","Period":14, "Moving Average Type":"ma"}
				},
				"True Range": {
					"inputs": {}
				},
				"Aroon Osc": {
					"outputs":{"Aroon Oscillator":"auto"}
				},
				"Elder Force": {
					"inputs": {}
				},
				"Ehler Fisher": {
					"outputs":{"EF":"auto", "EF Trigger":"#FF0000"}
				},
				"Schaff": {
					"inputs": {"Field":"field","Period":14, "Short Cycle":13, "Long Cycle":25, "Moving Average Type":"ma"}
				},
				"QStick": {
					"inputs": {"Period":14, "Moving Average Type":"ma"}
				},
				"Coppock": {
					"inputs": {"Field":"field"}
				},
				"Chande Fcst": {
					"inputs": {"Field":"field", "Period":14}
				},
				"Intraday Mtm": {
					"inputs": {}
				},
				"RAVI": {
					"inputs": {"Field":"field", "Short Cycle":13, "Long Cycle":25}
				},
				"Random Walk": {
					"outputs": {"Random Walk High":"#FF0000", "Random Walk Low":"#0000FF"}
				},
				"Directional": {
					"outputs": {"ADX":"#00FF00", "DI+":"#FF0000", "DI-":"#0000FF"}
				},
				"ADX": {
					"outputs": {"ADX":"#00FF00", "DI+":"#FF0000", "DI-":"#0000FF"}
				},
				"High Low": {
					"overlay": true,
					"outputs": {"High Low Bands Top":"auto", "High Low Bands Median":"auto", "High Low Bands Bottom":"auto"}
				},
				"MA Env": {
					"overlay": true,
					"inputs": {"Field":"field", "Period":50, "Shift Percentage": 5},
					"outputs": {"Envelope Top":"auto", "Envelope Median":"auto", "Envelope Bottom":"auto"}
				},
				"Fractal Chaos Bands": {
					"overlay": true,
					"outputs": {"Fractal High":"auto", "Fractal Low":"auto"}
				},
				"Prime Number Bands": {
					"overlay": true,
					"outputs": {"Prime Bands Top":"auto", "Prime Bands Bottom":"auto"}
				},
				"Bollinger Bands": {
					"overlay": true,
					"inputs": {"Field":"field", "Period":50, "Standard Deviations": 2, "Moving Average Type":"ma"},
					"outputs": {"Bollinger Band Top":"auto", "Bollinger Band Median":"auto", "Bollinger Band Bottom":"auto"}
				},
				"Keltner": {
					"overlay": true,
					"inputs": {"Period":50, "Shift": 5, "Moving Average Type":"ema"},
					"outputs": {"Keltner Top":"auto", "Keltner Median":"auto", "Keltner Bottom":"auto"}
				},
				"PSAR": {
					"overlay": true,
					"seriesFN": null,
					"calculateFN": STX.Studies.passToModulus,
					"seriesFN": STX.Studies.displayPSAR2,
					"inputs": {"Minimum AF":.02,"Maximum AF":.2}
				},
				"Klinger": {
					"seriesFN": STX.Studies.displayKlinger,
					"calculateFN": STX.Studies.calculateKlinger,
					"inputs": {"Signal Periods":13, "Short Cycle": 34, "Long Cycle": 55, "Moving Average Type":"ma"},
					"outputs": {"Klinger":"auto","KlingerSignal":"#FF0000"}
				},
				"Elder Ray": {
					"inputs": {"Period":13, "Moving Average Type":"ema"},
					"outputs": {"Elder Bull Power":"#00DD00", "Elder Bear Power":"#FF0000"}
				},
				"LR Slope": {
					"inputs": {"Period":14,"Field":"field"},
					"outputs":{"Slope":"auto"}
				}
		};
		
		if(!Function.prototype.stxInheritsFrom){
			/**
			 * Template for JavaScript inheritence.
			 * @param  {object} parentClassOrObject The parent class or object
			 */
			Function.prototype.stxInheritsFrom = function (parentClassOrObject){
				this.prototype=new parentClassOrObject;
				this.prototype.constructor = this;
				this.prototype.parent = parentClassOrObject.prototype;
			};
		}
		
		/**
		 * Base class for Drawing Tools. Use stxInheritsFrom() to build a subclass for custom drawing tools.
		 * The name of the subclass should be STX.Drawing.yourname. Whenever STXChart.vectorType==yourname, then
		 * your drawing tool will be the one that is enabled when the user begins a drawing. Capitalization of yourname
		 * must be an exact match otherwise ther kernel will not be able to find your drawing tool.
		 *
		 * Each of the STX.Drawing prototype functions may be overridden. To create a functioning drawing tool
		 * you must override the functions below that create alerts.
		 *
		 * Drawing clicks are always delivered in *adjusted price*. That is, if a stock has experienced splits then
		 * the drawing will not display correctly on an unadjusted price chart unless this is considered during the rendering
		 * process. Follow the templates to assure correct rendering under both circumstances.
		 * @name  STX.Drawing
		 * @constructor
		 */
		STX.Drawing=function (){
			this.chartsOnly=false;	// Set this to true to restrict drawing to panels containing charts (as opposed to studies)
			this.dragToDraw=false; // Set to true when need to hold mouse down to draw; set to false for click on/off draw
			this.penDown=false;   // Set to true when in the midst of creating the object
		};
		
		/**
		 * Is called to tell a drawing to abort itself. It should clean up any rendered objects such as DOM elements or toggle states. It
		 * does not need to clean up anything that it drew on the canvas.
		 * @param  {boolean} forceClear Indicates that the user explicitly has deleted the drawing (advanced usage)
		 * @memberOf STX.Drawing
		 */
		STX.Drawing.prototype.abort=function(forceClear){};
		
		/**
		 * Should call this.stx.setMeasure() with the measurements of the drawing if supported
		 * @memberOf STX.Drawing
		 */
		STX.Drawing.prototype.measure=function(){};
		
		/**
		 * Initializes the drawing
		 * @param  {object} stx   The chart object
		 * @param  {object} panel The panel reference
		 * @memberOf STX.Drawing
		 */
		STX.Drawing.prototype.construct=function(stx, panel){
			this.stx=stx;
			this.panelName=panel.name;
		};
		
		/**
		 * Called to render the drawing
		 * @memberOf STX.Drawing
		 */
		STX.Drawing.prototype.render=function(context)					{alert("must implement render function!");};
		
		/**
		 * Called when a user clicks while drawing.
		 * @param  {object} context               The canvas context
		 * @param  {number} tick                  The tick in the dataSet
		 * @param  {number} value - The value (price) of the click
		 * @return {boolean}                       Return true if the drawing is complete. Otherwise the kernel will continue accepting clicks.
		 * @memberOf STX.Drawing
		 */
		STX.Drawing.prototype.click=function(context, tick, value)		{alert("must implement click function!");};
		
		/**
		 * Called when the user moves while creating a drawing.
		 * @memberOf STX.Drawing
		 */
		STX.Drawing.prototype.move=function(context, tick, value)		{alert("must implement move function!");};
		
		/**
		 * Called to determine whether the drawing is intersected by either the tick/value (pointer location) or box (small box surrounding the pointer).
		 * For line based drawings, box should be checked. For area drawings (rectangles, circles) the point should be checked
		 * @param  {number} tick               The tick in the dataSet representing the cursor point
		 * @param  {number} value              The value (price) representing the cursor point
		 * @param  {object} box)	x0,y0,x1,y1 representing an area around the cursor
		 * @return {boolean}                    True if the point or box intersect the drawing
		 * @memberOf STX.Drawing
		 */
		STX.Drawing.prototype.intersected=function(tick, value, box)	{alert("must implement intersected function!");};
		
		/**
		 * Reconstruct this drawing type from a serialization object
		 * @memberOf STX.Drawing
		 */
		STX.Drawing.prototype.reconstruct=function(stx, obj)				{alert("must implement reconstruct function!");};
		
		/**
		 * Serialize a drawing into an object.
		 * @memberOf STX.Drawing
		 */
		STX.Drawing.prototype.serialize=function()						{alert("must implement serialize function!");};
		
		/**
		 * Called whenever periodicity changes so that drawings can adjust their rendering.
		 * @memberOf STX.Drawing
		 */
		STX.Drawing.prototype.adjust=function()							{alert("must implement adjust function!");};
		
		/**
		 * Base class for drawings that require two mouse clicks. Override as required.
		 * @constructor
		 * @name  STX.Drawing.BaseTwoPoint
		 */
		STX.Drawing.BaseTwoPoint=function(){
			this.p0=null;
			this.p1=null;
			this.color="";
		};
		
		STX.Drawing.BaseTwoPoint.stxInheritsFrom(STX.Drawing);
		
		/**
		 * Override this function to copy all of the config necessary to render your drawing
		 * @memberOf STX.Drawing.BaseTwoPoint
		 */
		STX.Drawing.BaseTwoPoint.prototype.copyConfig=function(){
			this.color=STXChart.currentColor;
		};
		
		/**
		 * Returns true if highlighting status has changed
		 * @memberOf STX.Drawing.BaseTwoPoint
		 */
		STX.Drawing.BaseTwoPoint.prototype.highlight=function(highlighted){	// return true if the highlighting status changes
			if(this.highlighted!=highlighted){
				this.highlighted=highlighted;
				return true;
			}
			return false;
		};
		
		/**
		 * Intersection is based on a hypothetical box that follows a user's mouse or finger around
		 * An intersection occurs when either the box crosses over the drawing.The type should be "segment", "ray" or "line" depending on whether
		 * the drawing extends infinitely in any or both directions. radius determines the size of the box in pixels and is
		 * determined by the kernel depending on the user interface (mouse, touch, etc)
		 * @memberOf STX.Drawing.BaseTwoPoint
		 */
		
		
		STX.Drawing.BaseTwoPoint.prototype.lineIntersection=function(tick, value, box, type){
			if(this.stx.layout.semiLog){
				return STX.boxIntersects(box.x0, STX.log10(box.y0), box.x1, STX.log10(box.y1), this.p0[0], STX.log10(this.p0[1]), this.p1[0], STX.log10(this.p1[1]), type);
			}else{
				return STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, this.p0[0], this.p0[1], this.p1[0], this.p1[1], type);
			}
		};
		
		/**
		 * Determine whether the tick/value lie within the theoretical box outlined by this drawing's two points
		 * @memberOf STX.Drawing.BaseTwoPoint
		 */
		STX.Drawing.BaseTwoPoint.prototype.boxIntersection=function(tick, value){
			if(tick>Math.max(this.p0[0], this.p1[0]) || tick<Math.min(this.p0[0], this.p1[0])) return false;
			if(value>Math.max(this.p0[1], this.p1[1]) || value<Math.min(this.p0[1], this.p1[1])) return false;
			return true;
		};
		
		/**
		 * Any two-point drawing that results in a drawing that is less than 10 pixels
		 * can safely be assumed to be an accidental click. Such drawings are so small
		 * that they are difficult to highlight and delete, so we won't allow them.
		 *
		 * Note, it is very important to use pixelFromValueAdjusted() rather than pixelFromPrice(). This will
		 * ensure that saved drawings always render correctly when a chart is adjusted or transformed for display
		 * @memberOf STX.Drawing.BaseTwoPoint
		 */
		STX.Drawing.BaseTwoPoint.prototype.accidentalClick=function(tick, value){
			var panel=this.stx.panels[this.panelName];
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var x1=this.stx.pixelFromTick(tick, panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var y1=this.stx.pixelFromValueAdjusted(panel, tick, value);
			var h=Math.abs(x1-x0);
			var v=Math.abs(y1-y0);
			var length=Math.sqrt(h*h+v*v);
			if(length<10) {
				this.penDown=false;
				if(this.dragToDraw) this.stx.undo();
				return true;
			}
		};
		
		/**
		 * Value will be the actual underlying, unadjusted value for the drawing. Any adjustments or transformations
		 * are reversed out by the kernel. Internally, drawings should store their raw data (date and value) so that
		 * they can be rendered on charts with different layouts, axis, etc
		 * @memberOf STX.Drawing.BaseTwoPoint
		 */
		STX.Drawing.BaseTwoPoint.prototype.click=function(context, tick, value){
			this.copyConfig();
			if(!this.penDown){
				this.p0=[tick,value];
				this.penDown=true;
				return false;
			}
			if(this.accidentalClick(tick, value)) return this.dragToDraw;
			var panel=this.stx.panels[this.panelName];
		
			this.p1=[tick,value];
			this.d0=this.stx.dateFromTick(this.p0[0], panel.chart);
			this.d1=this.stx.dateFromTick(this.p1[0], panel.chart);
			this.v0=this.p0[1];
			this.v1=this.p1[1];
		
			this.penDown=false;
			return true;	// kernel will call render after this
		};
		
		/**
		 * Default adjust function for BaseTwoPoint drawings
		 * @memberOf STX.Drawing.BaseTwoPoint
		 */
		STX.Drawing.BaseTwoPoint.prototype.adjust=function(){
			// If the drawing's panel doesn't exist then we'll check to see
			// whether the panel has been added. If not then there's no way to adjust
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.p0=[this.stx.tickFromDate(this.d0, panel.chart), this.v0];
			this.p1=[this.stx.tickFromDate(this.d1, panel.chart), this.v1];
		};
		
		/**
		 * Default move function for BaseTwoPoint drawings
		 * @memberOf STX.Drawing.BaseTwoPoint
		 */
		STX.Drawing.BaseTwoPoint.prototype.move=function(context, tick, value){
			if(!this.penDown) return;
			
			this.copyConfig();
			this.p1=[tick,value];
			this.render(context);
		};
		
		/**
		 * Default measure function for BaseTwoPoint drawings
		 * @memberOf STX.Drawing.BaseTwoPoint
		 */
		STX.Drawing.BaseTwoPoint.prototype.measure=function(){
			this.stx.setMeasure(this.p0[1], this.p1[1], this.p0[0], this.p1[0], true);
		};
		
		/**
		 * segment is a sample implementation of a BaseTwoPoint drawing.
		 * @name STX.Drawing.segment
		 * @constructor
		 */
		STX.Drawing.segment=function(){
			this.name="segment";
			//this.dragToDraw=true;
		};
		
		STX.Drawing.segment.stxInheritsFrom(STX.Drawing.BaseTwoPoint);
		
		STX.Drawing.segment.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);
		
			var color=this.color;
			if(color=="auto" || STX.isTransparent(color)) color=this.stx.defaultColor;
			var width=this.lineWidth;
			if(this.highlighted){
				//var w=this.stx.canvasStyle("stx_highlight_vector").width;
				color=this.stx.getCanvasColor("stx_highlight_vector");
				//if(w) width=STX.stripPX(w);
			}else{
				this.stx.setMeasure(null,null,null,null,false);
			}
		
			var parameters={
					pattern: this.pattern,
					lineWidth: width
			};
			this.stx.plotLine(x0, x1, y0, y1, color, this.name, context, panel, parameters);
		
			if(this.axisLabel){
				if(this.name=="horizontal") {
					this.stx.endClip();
					this.stx.createYAxisLabel(panel, this.p0[1], y0, color);
					this.stx.startClip(panel.name);
				}else if(this.name=="vertical") {
					var myDate=this.d0;
					if(this.stx.internationalizer){
						var str=this.stx.internationalizer.monthDay.format(myDate);
						str+=" " + this.stx.internationalizer.hourMinute.format(myDate);
						myDate=str;
					}else{
						myDate=STX.mmddhhmm(myDate);
					}
					this.stx.endClip();
					this.stx.createXAxisLabel(panel, myDate, x0, color);			
					this.stx.startClip(panel.name);
				}
			}
		
		};
		
		STX.Drawing.segment.prototype.abort=function(){
			this.stx.setMeasure(null,null,null,null,false);
		};
		
		
		STX.Drawing.segment.prototype.intersected=function(tick, value, box){
			return this.lineIntersection(tick, value, box, this.name);
		};
		
		STX.Drawing.segment.prototype.copyConfig=function(){
			this.color=STXChart.currentColor;
			this.lineWidth=STXChart.currentVectorParameters.lineWidth;
			this.pattern=STXChart.currentVectorParameters.pattern;
		};
		
		/**
		 * Reconstruct a segment
		 * @memberOf  STX.Drawing.segment
		 * @param  {STXChart} stx The chart object
		 * @param  {object} obj A drawing descriptor
		 * @param {string} col The line color
		 * @param {string} pnl The panel name
		 * @param {string} ptrn Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} lw Optional line width. Defaults to 1.
		 * @param {number} v0 Value (price) for the first point
		 * @param {number} v1 Value (price) for the second point
		 * @param {number} d0 Date (string form) for the first point
		 * @param {number} d1 Date (string form) for the second point
		 */
		STX.Drawing.segment.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj["col"];
			this.panelName=obj["pnl"];
			this.pattern=obj["ptrn"];
			this.lineWidth=obj["lw"];
			this.d0=obj["d0"];
			this.d1=obj["d1"];
			this.v0=obj["v0"];
			this.v1=obj["v1"];
			this.adjust();
		};
		
		STX.Drawing.segment.prototype.serialize=function(){
			return {
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				ptrn:this.pattern,
				lw:this.lineWidth,
				d0:this.d0,
				d1:this.d1,
				v0:this.v0,
				v1:this.v1
			};
		};
		
		
		
		/**
		 * rectangle is a sample implementation of a BaseTwoPoint drawing
		 * @constructor
		 * @name  STX.Drawing.rectangle
		 */
		STX.Drawing.rectangle=function(){
			this.name="rectangle";
			//this.dragToDraw=true;
		};
		
		STX.Drawing.rectangle.stxInheritsFrom(STX.Drawing.BaseTwoPoint);
		
		STX.Drawing.rectangle.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);
		
			var x=Math.round(Math.min(x0, x1))+.5;
			var y=Math.min(y0, y1);
			var width=Math.max(x0,x1)-x;
			var height=Math.max(y0, y1)-y;
			var edgeColor=this.color;
			if(this.highlighted){
				edgeColor=this.stx.getCanvasColor("stx_highlight_vector");
			}
		
			var fillColor=this.fillColor;
			if(fillColor && !STX.isTransparent(fillColor) && fillColor!="auto"){
				context.beginPath();
				context.rect(x, y, width, height);
				context.fillStyle=fillColor;
				context.globalAlpha=.2;
				context.fill();
				context.closePath();
				context.globalAlpha=1;
			}
		
			var parameters={
					pattern: this.pattern,
					lineWidth: this.lineWidth
			};
			if(this.highlighted && parameters.pattern=="none"){
				parameters.pattern="solid";
				if(parameters.lineWidth==.1) parameters.lineWidth=1;
			}
		
			// We extend the vertical lines by .5 to account for displacement of the horizontal lines
			// HTML5 Canvas exists *between* pixels, not on pixels, so draw on .5 to get crisp lines
			this.stx.plotLine(x0, x1, y0, y0, edgeColor, "segment", context, panel, parameters);
			this.stx.plotLine(x1, x1, y0-.5, y1+.5, edgeColor, "segment", context, panel, parameters);
			this.stx.plotLine(x1, x0, y1, y1, edgeColor, "segment", context, panel, parameters);
			this.stx.plotLine(x0, x0, y1+.5, y0-.5, edgeColor, "segment", context, panel, parameters);
		};
		
		
		STX.Drawing.rectangle.prototype.intersected=function(tick, value){
			return this.boxIntersection(tick, value);
		};
		
		STX.Drawing.rectangle.prototype.copyConfig=function(){
			this.color=STXChart.currentColor;
			this.fillColor=STXChart.currentVectorParameters.fillColor;
			this.lineWidth=STXChart.currentVectorParameters.lineWidth;
			this.pattern=STXChart.currentVectorParameters.pattern;
		};
		
		/**
		 * Reconstruct an rectangle
		 * @param  {STXChart} stx The chart object
		 * @param  {object} obj A drawing descriptor
		 * @param {string} col The border color
		 * @param {string} fc The fill color
		 * @param {string} pnl The panel name
		 * @param {string} ptrn Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} lw Optional line width. Defaults to 1.
		 * @param {number} v0 Value (price) for the first point
		 * @param {number} v1 Value (price) for the second point
		 * @param {number} d0 Date (string form) for the first point
		 * @param {number} d1 Date (string form) for the second point
		 * @memberOf STX.Drawing.rectangle
		 */
		STX.Drawing.rectangle.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj["col"];
			this.fillColor=obj["fc"];
			this.panelName=obj["pnl"];
			this.pattern=obj["ptrn"];
			this.lineWidth=obj["lw"];
			this.d0=obj["d0"];
			this.d1=obj["d1"];
			this.v0=obj["v0"];
			this.v1=obj["v1"];
			this.adjust();
		};
		
		STX.Drawing.rectangle.prototype.serialize=function(){
			return {
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				fc:this.fillColor,
				ptrn:this.pattern,
				lw:this.lineWidth,
				d0:this.d0,
				d1:this.d1,
				v0:this.v0,
				v1:this.v1
			};
		};
		
		
		var STXTouchAction="onclick";
		if(STX.touchDevice && (STX.ipad || STX.iphone)) STXTouchAction="ontouchend";
		
		/**
		 * MenuManager
		 *
		 * This widget manages menus. First, it ensures that charts do not react to users clicking or tapping on menus that overlap
		 * the charting area. Then it also allows users to close menus by tapping outside of the menu area. This is accomplished
		 * through the use of invisible, temporary overlay divs. Menu manager is a singleton. It automatically exists and only one is required per page.
		 * Simply register your charts with the manager in order for it to automatically engage.
		 * @namespace
		 * @name  STX.MenuManager
		 */
		STX.MenuManager=function(){};
		STX.MenuManager.registeredCharts=[];
		STX.MenuManager.openMenu=null;
		STX.MenuManager.useOverlay=true;
		STX.MenuManager.menusDisabled=false;	// Set to true for instance when opening a dialog
		STX.MenuManager.onClass=null;
		STX.MenuManager.offClass=null;
		STX.MenuManager.menus=[];
		STX.MenuManager.closeCurrent=null;	// function callback to close current menu
		
		/**
		 * Registers a chart with the menuManager. This should be called for each chart on the screen.
		 * @param  {object} stx The chart object
		 * @memberOf STX.MenuManager
		 */
		STX.MenuManager.registerChart=function(stx){
			STX.MenuManager.registeredCharts.push(stx);
			if(!STX.MenuManager.bodyOverlay){
				STX.MenuManager.bodyOverlay=STX.newChild(document.body, "DIV", "stxBodyOverlay");
			}
		};
		
		/**
		 * Override whether or not to use overlays. If overlays are not enabled then menus will still co-react
		 * but no overlay will be generated to allow tapping outside of the menus
		 * @memberOf STX.MenuManager
		 */
		STX.MenuManager.useOverlays=function(useOverlay){
			STX.MenuManager.useOverlay=useOverlay;
		};
		
		/**
		 * Cancels a single click event that might otherwise have been picked up by a chart object when the user taps on the overlay to close the menu
		 * @memberOf STX.MenuManager
		 */
		STX.MenuManager.cancelSingleClick=function(){
			if(STXTouchAction=="ontouchend"){
				for(var i=0;i<STX.MenuManager.registeredCharts.length;i++){
					STX.MenuManager.registeredCharts[i].cancelTouchSingleClick=true;
				}
			}
		};
		
		/**
		 * Turns on a menu. Typically managed automatically but can be called programatically.
		 * @param {string} name Name of menu. This should be unique so that clicking one menu will close an already open menu
		 * @param {function} callback This function will be called when the user taps outside of the menu, and passed the name
		 * @param {boolean} cascading Not yet implemented
		 * @memberOf STX.MenuManager
		 */
		STX.MenuManager.menuOn=function(name, callback, cascading){
			function tapMe(callback, name){
				return function(e){
					STX.MenuManager.menuOff();
					//callback(name);
				};
			}
			if(STX.MenuManager.registeredCharts.length==0) return;
			if(STX.MenuManager.openMenu){
				if(name==STX.MenuManager.openMenu) return;	// menu already open and manager active
				STX.MenuManager.closeCurrentMenu();
			}
			STX.MenuManager.openMenu=name;
			if(STX.MenuManager.useOverlay){
				STX.MenuManager.bodyOverlay.style.display="block";
				STX.MenuManager.bodyOverlay[STXTouchAction]=tapMe(name);
				STX.MenuManager.closeCurrent=callback;
			}
			STX.MenuManager.closeCurrentMenu=callback;
			for(var i=0;i<STX.MenuManager.registeredCharts.length;i++){
				STX.MenuManager.registeredCharts[i].openDialog=name;
			}
		};
		
		/**
		 * Hides any menus that are currently showing
		 * @memberOf STX.MenuManager
		 */
		STX.MenuManager.menuOff=function(){
			if(STX.MenuManager.registeredCharts.length==0) return;
			if(document.activeElement && document.activeElement.tagName!="BODY" && document.activeElement.blur) document.activeElement.blur();	// Hide keyboard on touch devices
			if(STX.MenuManager.closeCurrent){
				var fc=STX.MenuManager.closeCurrent;
				STX.MenuManager.closeCurrent=null; // prevent infinite loop
				fc(STX.MenuManager.openMenu);
			}
			STX.MenuManager.closeCurrent=null;
			STX.MenuManager.openMenu=null;
			if(STX.MenuManager.useOverlay){
				STX.MenuManager.bodyOverlay.style.display="none";
				STX.MenuManager.bodyOverlay[STXTouchAction]=null;
			}
			this.cancelSingleClick();
			if(STX.DialogManager.stack.length==0){
				for(var i=0;i<STX.MenuManager.registeredCharts.length;i++){
					STX.MenuManager.registeredCharts[i].openDialog="";
				}
			}
		};
		
		/**
		 * Initializes the menuing system. Menus should be of specified format, using class stxMenu to indicate an object that can be clicked
		 * to create a menu. class menuOutline should be assigned to a sub-element of the menu that is displayed or hidden. stxToggle should
		 * be assigned to any active element of the menu. The code in stxToggle will be run through eval()
		 * @memberOf STX.MenuManager
		 */
		STX.MenuManager.makeMenus=function(){
			function toggle(div, menu){
				return function(e){
					function turnMeOff(div){
						return function(){
							div.style.display="none";
							if(div.colorPickerDiv!=null) div.colorPickerDiv.style.display="none";
						};
					}
					var dom=STX.getEventDOM(e);
					do{
						if(dom.className && dom.className.indexOf("menuOutline")!=-1) return;	// clicked inside the menuDisplay and not the menu button
						if(dom.className && dom.className.indexOf("stxMenu")!=-1) break; // clicked the actual button
						dom=dom.parentNode;
					}while(dom);
					if(div.style.display=="none"){
						var menuName=STX.uniqueID();
						if(STX.MenuManager.menusDisabled && !menu.alwaysOn) return;
						STX.MenuManager.menuOn(menuName, turnMeOff(div));
						div.style.display="block";
					}else{
						STX.MenuManager.menuOff();
						div.style.display="none";
					}
				};
			}
			function activate(menuOutline, clickable, priorClick){
				return function(e){
					STX.MenuManager.menuOff();
					menuOutline.style.display="none";
					//if(priorClick) priorClick();
					var action=clickable.getAttribute("stxToggle");
					eval(action);
				};
			}
			STX.MenuManager.menus=document.querySelectorAll(".stxMenu");
			for(var i=0;i<STX.MenuManager.menus.length;i++){
				var menu=STX.MenuManager.menus[i];
				var menuOutline=menu.querySelectorAll(".menuOutline")[0];
				menu.alwaysOn=(menu.className.indexOf("stxAlwaysOn")!=-1);
				menu[STXTouchAction]=toggle(menuOutline, menu);
		
				var clickables=menuOutline.querySelectorAll("*[stxToggle]");
				for(var j=0;j<clickables.length;j++){
					clickables[j][STXTouchAction]=activate(menuOutline, clickables[j], clickables[j][STXTouchAction]);
				}
			}
		};
		
		/**
		 * Disable the menuing system (for instance when a dialog is open)
		 * @memberOf STX.MenuManager
		 */
		STX.MenuManager.disableMenus=function(){
			STX.MenuManager.menusDisabled=true;
			for(var i=0;i<STX.MenuManager.menus.length;i++){
				var menu=STX.MenuManager.menus[i];
				if(STX.MenuManager.onClass) STX.unappendClassName(menu, STX.MenuManager.onClass);
				if(STX.MenuManager.offClass) STX.appendClassName(menu, STX.MenuManager.offClass);
			}
		};
		
		/**
		 * Enable the menuing system (for instance after disabling it)
		 * @memberOf STX.MenuManager
		 */
		STX.MenuManager.enableMenus=function(){
			STX.MenuManager.menusDisabled=false;
			for(var i=0;i<STX.MenuManager.menus.length;i++){
				var menu=STX.MenuManager.menus[i];
				if(STX.MenuManager.offClass) STX.unappendClassName(menu, STX.MenuManager.offClass);
				if(STX.MenuManager.onClass) STX.appendClassName(menu, STX.MenuManager.onClass);
			}};
		
		/**
		 * Close the menu that an element lives in. For instance, when hitting enter in an input box contained
		 * within a menu simply send the input box itself in and the library will find and close the menu for you.
		 * @memberOf STX.MenuManager
		 */
		STX.MenuManager.closeThisMenu=function(el){
			while(el && typeof(el.className)!="undefined" && el.className.indexOf("menuOutline")==-1){
				el=el.parentNode;
			}
			if(el){
				el.style.display="none";
			}
			STX.MenuManager.menuOff();
		};
		
		/**
		 * Attach a color picker to a div (swatch).
		 * 
		 * @param {object} colorClick - Should be the swatch DOM element
		 *
		 * @param {object} cpHolder - Should be a DOM element that contains the color picker. If the color picker is within a dialog
		 * or menu then cpHolder should be that dialog or menu in order to assure that the color picker is closed
		 * when the menu or dialog is closed
		 *
		 * @param {function} cb - The callback when the color is selected fc(color)
		 *
		 * @param {boolean} noMenuBehavior - When set to true bypasses the menuing system, otherwise the color picker is treated as a menu
		 * element and will close whenever another menu is opened. Always use noMenuBehavior when the color picker
		 * is contained within a parent menu otherwise the color picker could get orphaned on the screen.
		 * @memberOf STX.MenuManager
		 */
		STX.MenuManager.attachColorPicker = function(colorClick, cpHolder, cb, noMenuBehavior){
			var closure=function(colorClick, cpHolder, cb){
				return function(color){
					if(cpHolder.colorPickerDiv) cpHolder.colorPickerDiv.style.display="none";
					colorClick.style.backgroundColor="#"+color;
					if(cb) cb(color);
					if(!noMenuBehavior) STX.MenuManager.menuOff();
				};
			};
			function closeMe(cpHolder){
				return function(){
					if(cpHolder.colorPickerDiv) cpHolder.colorPickerDiv.style.display="none";
				};
			}
		
			colorClick[STXTouchAction]=(function(fc, cpHolder){ return function(){
				if(!noMenuBehavior) STX.MenuManager.menuOn("colorPicker", closeMe(cpHolder));
				if(cpHolder.colorPickerDiv==null){
					cpHolder.colorPickerDiv=document.createElement("DIV");
					cpHolder.colorPickerDiv.className="ciqColorPicker";
					document.body.appendChild(cpHolder.colorPickerDiv);
				}
				STX.createColorPicker(cpHolder.colorPickerDiv, fc);
				cpHolder.colorPickerDiv.style.display="block";
				var xy=STX.getPos(this);
				var x=xy.x+this.clientWidth;
				if((x+cpHolder.colorPickerDiv.offsetWidth)>STX.pageWidth())
					x-=(x+cpHolder.colorPickerDiv.offsetWidth)-STX.pageWidth()+20;
				cpHolder.colorPickerDiv.style.left=x+"px";
		
				var y=(xy.y);
				if(y+cpHolder.colorPickerDiv.clientHeight>STX.pageHeight())
					y-=(y+cpHolder.colorPickerDiv.clientHeight)-STX.pageHeight();
				cpHolder.colorPickerDiv.style.top=y+"px";
			};})(closure(colorClick, cpHolder, cb), cpHolder);
		};
		
		/**
		 * A widget for managing modal dialogs. It maintains an internal stack so that multiple dialogs may be open simultaneously.
		 * Optionally set useOverlay to true in order to create an overlay for dimming the screen
		 * @namespace
		 * @name STX.DialogManager
		 */
		STX.DialogManager=function(){};

		/**
		 * Whether to use overlay for closing dialogs
		 * @type {Boolean}
		 * @memberOf  STX.DialogManager
		 */
		STX.DialogManager.useOverlay=false;
		STX.DialogManager.stack=[];
		
		/**
		 * Makes charts unresponsive during modal
		 * @memberOf  STX.DialogManager
		 */
		STX.DialogManager.modalBegin=function(){
			STX.MenuManager.menusDisabled=true;
			for(var i=0;i<STXChart.registeredContainers.length;i++){
				var stx=STXChart.registeredContainers[i].stx;
				stx.modalBegin();
			}
		};
		
		/**
		 * Releases modal
		 * @memberOf  STX.DialogManager
		 */
		STX.DialogManager.modalEnd=function(){
			STX.MenuManager.menusDisabled=false;
			for(var i=0;i<STXChart.registeredContainers.length;i++){
				var stx=STXChart.registeredContainers[i].stx;
				stx.modalEnd();
			}
		};
		
		/**
		 * Displays the dialog. Optionally displays the overlay if STX.DialogManager.useOverlay is set
		 * @param  {string} id ID of the dialog
		 * @memberOf  STX.DialogManager
		 */
		STX.DialogManager.displayDialog=function(id){
			STX.DialogManager.modalBegin();
			if(STX.DialogManager.useOverlay && !STX.DialogManager.bodyOverlay){
				STX.DialogManager.bodyOverlay=STX.newChild(document.body, "DIV", "stxDialogOverlay");
			}
			if(STX.DialogManager.useOverlay){
				STX.DialogManager.bodyOverlay.style.display="block";
			}
			var node=id;
			if(typeof id=="string") node=$$(id);
			node.style.display="block";
			STX.DialogManager.stack.push(node);
		};
		
		/**
		 * Dismisses any active dialogs
		 * @memberOf  STX.DialogManager
		 */
		STX.DialogManager.dismissDialog=function(){
			document.activeElement.blur();	// Hide keyboard on touch devices
			var node=STX.DialogManager.stack.pop();
			node.style.display="none";
			if(node.colorPickerDiv!=null) node.colorPickerDiv.style.display="none";
		
			if(STX.DialogManager.stack.length==0){
				if(STX.DialogManager.bodyOverlay && STX.DialogManager.bodyOverlay.style.display=="block"){
					STX.DialogManager.bodyOverlay.style.display="none";
				}
				STX.DialogManager.modalEnd();
			}
			STX.fixScreen();
		};
		
		
		/**
		 * A widget for managing chart colors and themes. The dialog functionality assumes that color picker
		 * divs have been set up with a class that matches one of the stx chart configuration classes (such as stx_candle_up)
		 *
		 * The classMapping determines which classes are mapped to each color picker. If null then apply to the container itself
		 * @namespace
		 * @name  STX.ThemeManager
		 */
		STX.ThemeManager=function(){};
		
		/**
		 * List of built in themes. Override this with your built in themes.
		 * @memberOf STX.ThemeManager
		 * @type {Object}
		 */
		STX.ThemeManager.builtInThemes={};
		STX.ThemeManager.themes={
				enabledTheme:null,
				customThemes:{}
		};
		
		/**
		 * Determines which underlying classes are overridden by each of the dialog swatches a user can change.
		 * @type {Object}
		 * @memberOf STX.ThemeManager
		 */
		STX.ThemeManager.classMapping={
			stx_candle_up: {stx_candle_up:true, stx_bar_up:true, stx_hollow_candle_up:true},
			stx_candle_down: {stx_candle_down:true, stx_bar_down:true, stx_hollow_candle_down:true},
			stx_candle_shadow: {stx_candle_shadow:true, stx_line_chart:true, stx_hollow_candle_even:true},
			stx_grid: {stx_grid:true},
			stx_grid_dark: {stx_grid_dark:true},
			stx_xaxis_dark: {stx_xaxis_dark:true, stx_xaxis:true, stx_yaxis:true, stx_yaxis_dark:true},
			stx_mountain: {stx_mountain_chart:true},
			backgroundColor: null
		};
		
		/**
		 * Populate a dialog with the existing colors from a chart.
		 * @param {string} id Name of the theme dialog
		 * @param {object} stx The chart object
		 * @memberOf STX.ThemeManager
		 */
		STX.ThemeManager.populateDialog=function(id, stx){
			function toggleBorders(){
				if($$$("#candleBordersOn",$$(id)).checked){
					stx.styles["stx_candle_up"]["border-left-color"]=$$(id).querySelectorAll(".stx-border-color.stx_candle_up")[0].style.backgroundColor;
					stx.styles["stx_candle_down"]["border-left-color"]=$$(id).querySelectorAll(".stx-border-color.stx_candle_down")[0].style.backgroundColor;
				}else{
					stx.styles["stx_candle_up"]["border-left-color"]="transparent";
					stx.styles["stx_candle_down"]["border-left-color"]="transparent";
				}
				stx.draw();
			}
			function chooseColor(property, className){
				return function(color){
					var mapping=STX.ThemeManager.classMapping[className];
					if(mapping){
						for(var mapped in mapping){
							stx.canvasStyle(mapped);
							stx.styles[mapped][property]="#"+color;
							if(className=="stx_mountain"){	// Hacked in here. Ideally we would expand class mapping to accept specific css fields
								stx.styles[mapped]["color"]="#"+color;
								stx.styles[mapped]["backgroundColor"]="#"+color;
								stx.styles[mapped]["borderTopColor"]="#"+color;
							}
						}
					}else{
						stx.chart.container.style[className]="#" + color;
					}
					stx.draw();
					if(property=="border-left-color" && color && color!="transparent"){
						$$$("#candleBordersOn", $$(id)).checked=true;
					}
				};
			}
			$$$("#candleBordersOn",$$(id)).checked=false;
			$$$("#candleBordersOn",$$(id)).onclick=toggleBorders;
		
			var computed="#FFFFFF";
			if(stx.chart.container){
				computed=getComputedStyle(stx.chart.container);
			}
			for(var className in STX.ThemeManager.classMapping){
				var mapping=STX.ThemeManager.classMapping[className];
				var color=null;
				var borderColor=null;
		
				if(mapping){
					var firstClass=STX.first(mapping);
					var style=stx.canvasStyle(firstClass);
					color=style.color;
					borderColor=style["border-left-color"];
				}else{
					color=computed[className];
					if(STX.isTransparent(color) && className=="backgroundColor") color=stx.containerColor;
				}
		
				var picker=$$(id).querySelectorAll(".stx-color." + className)[0];
				if(picker){
					picker.style.backgroundColor=color;
					if(!picker[STXTouchAction]){
						STX.MenuManager.attachColorPicker(picker, STX.DialogManager, chooseColor("color", className));
					}
				}
		
				var picker=$$(id).querySelectorAll(".stx-border-color." + className)[0];
				if(picker){
					picker.style.backgroundColor=borderColor;
					if(!picker[STXTouchAction]){
						STX.MenuManager.attachColorPicker(picker, STX.DialogManager, chooseColor("border-left-color", className));
					}
					if(borderColor && borderColor!="transparent") $$$("#candleBordersOn", $$(id)).checked=true;
				}
			}
		};
		
		/**
		 * Convert colors from an existing chart into a theme object
		 * @memberOf STX.ThemeManager
		 */
		STX.ThemeManager.createTheme=function(stx){
			var theme={};
			if(STX.ThemeManager.baseTheme) theme["baseTheme"]=STX.ThemeManager.baseTheme;
			for(var className in STX.ThemeManager.classMapping){
				var mapping=STX.ThemeManager.classMapping[className];
				if(mapping){
					var firstClass=STX.first(mapping);
					var style=stx.canvasStyle(firstClass);
					theme[className]={color:style.color};
					if(style.borderTopColor) theme[className]["borderTopColor"]=style.borderTopColor;
					if(style.backgroundColor) theme[className]["backgroundColor"]=style.backgroundColor;
					if(style["border-left-color"] && style["border-left-color"]!="transparent"){
						theme[className]["border-left-color"]=style["border-left-color"];
					}else{
						theme[className]["border-left-color"]="transparent";
					}
				}else{
					if(stx.chart.container)
						theme[className]=stx.chart.container.style[className];
				}
			}
			return theme;
		};
		
		/**
		 * Save a theme by name. Optional callback function when finished of fc(str) where str is a stringified version of the themes
		 * that can be used for saving to a server or to local storage
		 * @memberOf STX.ThemeManager
		 */
		STX.ThemeManager.saveTheme=function(name, stx){
			var theme=STX.ThemeManager.createTheme(stx);
			STX.ThemeManager.themes.customThemes[name]=theme;
			STX.ThemeManager.themes.enabledTheme=name;
			if(STX.ThemeManager.storageCB) STX.ThemeManager.storageCB(JSON.stringify(STX.ThemeManager.themes), stx);
			STX.ThemeManager.themesToMenu(STX.ThemeManager.el, STX.ThemeManager.el2, STX.ThemeManager.stx, STX.ThemeManager.storageCB);
		};
		
		/**
		 * Sets themes from a serialized object
		 * @param {object} obj Serialized themes
		 * @param {object} stx The chart object
		 * @memberOf STX.ThemeManager
		 */
		STX.ThemeManager.setThemes=function(obj, stx){
			if(obj!=null){
				if(obj.customThemes) STX.ThemeManager.themes.customThemes=obj.customThemes;
				STX.ThemeManager.themes.enabledTheme=obj.enabledTheme;
				if(STX.ThemeManager.themes.enabledTheme){
					STX.ThemeManager.enableTheme(stx, STX.ThemeManager.themes.enabledTheme);
				}
			}
		};
		
		/**
		 * Enables a specific theme. Custom themes are objects that contain color choices on top of a base theme (CSS File).
		 * @param  {object} stx   The chart object
		 * @param  {string} theme The theme name
		 * @memberOf STX.ThemeManager
		 */
		STX.ThemeManager.enableTheme=function(stx, theme){
			function addCustomizations(){
				var obj=STX.ThemeManager.themes.customThemes[theme];
				for(var className in obj){
					if(className=="baseTheme") continue;
					var mapping=STX.ThemeManager.classMapping[className];
					if(mapping){
						for(var mapped in mapping){
							stx.canvasStyle(mapped);
							stx.styles[mapped].color=obj[className].color;
							if(obj[className]["border-left-color"]){
								stx.styles[mapped]["border-left-color"]=obj[className]["border-left-color"];
							}
							if(className=="stx_mountain"){ // Hacked in. See other note.
								stx.styles[mapped]["backgroundColor"]=obj[className].backgroundColor;
								stx.styles[mapped]["borderTopColor"]=obj[className].borderTopColor;						
								if(!stx.styles[mapped]["backgroundColor"]) stx.styles[mapped]["backgroundColor"]=obj[className].color;
								if(!stx.styles[mapped]["borderTopColor"]) stx.styles[mapped]["borderTopColor"]=obj[className].color;						
							}
						}
					}else{
						if(stx.chart.container) stx.chart.container.style[className]=obj[className];
					}
				}
				if(stx.chart.container){
					stx.clearPixelCache();	// force new yAxis to be drawn
					stx.draw();
				}
			}
			var obj=STX.ThemeManager.themes.customThemes[theme];
			if(obj){
				var baseTheme=obj["baseTheme"];
				STX.ThemeManager.loadBuiltInTheme(stx, baseTheme, addCustomizations);
				STX.ThemeManager.themes.enabledTheme=theme;
				if(STX.ThemeManager.storageCB) STX.ThemeManager.storageCB(JSON.stringify(STX.ThemeManager.themes), stx);
			}else{
				STX.ThemeManager.loadBuiltInTheme(stx, theme);
			}
		};
		
		/**
		 * Enables a built in theme. Built in themes are CSS files.
		 * @param  {object} stx   The chart object
		 * @param  {string} theme The theme name
		 * @memberOf STX.ThemeManager
		 */
		STX.ThemeManager.enableBuiltInTheme=function(stx, theme){
			STX.ThemeManager.loadBuiltInTheme(stx, theme);
			STX.ThemeManager.themes.enabledTheme=theme;
			if(STX.ThemeManager.storageCB) STX.ThemeManager.storageCB(JSON.stringify(STX.ThemeManager.themes), stx);
		};
		
		/**
		 * Loads a built in theme by dynamically linking the CSS that defines that theme.
		 * @param {object} stx The chart object
		 * @param {string} theme The theme to load. Pass null to remove the current built in theme.
		 * @param {function} cb Callback function when theme is successfully loaded
		 * @memberOf STX.ThemeManager
		 */
		STX.ThemeManager.loadBuiltInTheme=function(stx, theme, cb){
			if(!theme){
				if(cb) cb();
				return;
			}
			STX.unappendClassName($$$("body"), STX.ThemeManager.baseTheme);
			STX.appendClassName($$$("body"), theme);
			stx.styles={};
			if(stx.displayInitialized){
				stx.chart.container.style.backgroundColor="";
				stx.clearPixelCache();	// force new yAxis to be drawn
				stx.draw();
			}
			STX.ThemeManager.baseTheme=theme;
			if(cb) cb();
		};
		
		/**
		 * Construct a menu from available themes
		 * @param {object} el - The menu element where themes will be added
		 * @param {object} stx - a chart
		 * @param {function} cb - A callback method for storing the themes (i.e. to localStorage)
		 * @memberOf STX.ThemeManager
		 */
		STX.ThemeManager.themesToMenu=function(el, el2, stx, cb){
			STX.ThemeManager.el=el;
			STX.ThemeManager.el2=el2;
			STX.ThemeManager.stx=stx;
			STX.ThemeManager.storageCB=cb;
		
			function useBuiltInTheme(theme){
				return function(){
					STX.ThemeManager.enableBuiltInTheme(stx, theme);
				};
			}
			function useTheme(theme){
				return function(){
					STX.ThemeManager.enableTheme(stx, theme);
				};
			}
		
			function deleteTheme(theme){
				return function(){
					STX.ThemeManager.enableBuiltInTheme(stx, STX.ThemeManager.baseTheme);
					delete STX.ThemeManager.themes.customThemes[theme];
					STX.ThemeManager.themesToMenu(el, el2, stx, cb);
					if(cb) cb(JSON.stringify(STX.ThemeManager.themes), stx);
				};
			}
			var els=el.querySelectorAll("li");
			for(var i=0;i<els.length;i++){
				if(els[i].style.display=="block")
					el.removeChild(els[i]);
			}
		
			var template=el.querySelectorAll(".themeSelectorTemplate")[0];
			for(var theme in STX.ThemeManager.themes.customThemes){
				var li=template.cloneNode(true);
				li.style.display="block";
				var stxItem=$$$(".stxItem",li);
				stxItem.innerHTML=theme;
				stxItem[STXTouchAction]=useTheme(theme);
				el.appendChild(li);
				$$$(".stxClose", li)[STXTouchAction]=deleteTheme(theme);
			}
			STX.clearNode(el2);
			for(var theme in STX.ThemeManager.builtInThemes){
				var li=STX.newChild(el2, "li");
				li.innerHTML=STX.I18N.translate(theme);
				li[STXTouchAction]=useBuiltInTheme(theme);
			}
		};
		
		/**
		 * Namespace for managing iscrolls (scrollable elements by touch of mousewheel).
		 * @name  STX.iscroll
		 */
		STX.iscroll=function(){};

		/**
		 * The scrollers in use
		 * @type {Array}
		 * @memberOf STX.iscroll
		 */
		STX.iscroll.scrollers=[];
		
		/**
		 * Create a new iscroll
		 * @param  {object} node   The element to attach the scroller to
		 * @param  {object} params Parameters for the scroller as defined by iscroll library
		 * @return {object}        Returns the scroller
		 * @memberOf STX.iscroll
		 */
		STX.iscroll.newScroller=function(node, params){
			var iscroll = new iScroll(node, params);
			STX.iscroll.scrollers.push(iscroll);
			return iscroll;
		};
		
		/**
		 * Refreshes all iscrolls on the page
		 * @memberOf STX.iscroll
		 */
		STX.iscroll.refresh=function(){
			for(var i=0;i<STX.iscroll.scrollers;i++){
				var iscroll=STX.iscroll.scrollers[i];
				iscroll.refresh();
			}
		};
		
		/**
		
		This is a widget that can be used to display symbol search results
		
		@constructor
		@param {object} config Configuration for widget
		@param {object} config.input - DOM input field to attach the lookup widget
		@param {function} config.textCallback - function to call when a symbol is entered of format func(this, txt, filter)
		@param {function} config.selectCallback - function to call when the user selects a symbol or hits enter func(this, txt, filter)
		@param {array} config.filters - an array of security classes to filter on. Valid values are: ALL, STOCKS, FOREX, INDEXES. Null to not provide a filter.
		@name STX.LookupWidget
		*/
		
		STX.LookupWidget=function(config){
			this.config=config;
			this.div=null;
			this.currentFilter=null;
			this.filterButtons=[];
			this.height=480;
		};
		
		/**
		 * Call this function with the results from your search. results should be an array of the following object:
		 * {
		 * symbol: symbol,
		 * description: full name of security,
		 * exchange: optional exchange
		 * }
		 * @memberOf STX.LookupWidget
		 */
		STX.LookupWidget.prototype.displayResults=function(results){
			function select(that, symbol){
				return function(e){
					that.config.input.value=symbol;
					that.config.selectCallback(that, symbol, that.currentFilter);
					that.close();
					that.config.input.blur();
				};
			}
			if(results.length>0){
				this.display();
			}else{
				return;
			}
			STX.clearNode(this.ul);
			for(var i=0;i<results.length;i++){
				var result=results[i];
				var li=STX.newChild(this.ul, "LI");
				var symbolSpan=STX.newChild(li, "span");
				symbolSpan.innerHTML=result.symbol;
				var descriptionSpan=STX.newChild(li, "span");
				descriptionSpan.innerHTML=result.description;
				var exchangeSpan=STX.newChild(li, "span");
				if(result.exchange) exchangeSpan.innerHTML=STX.I18N.translate(result.exchange);
				STX.ScrollManager.attach(li, select(this, result.symbol));
			}
			if(!this.iscroll){
				this.iscroll = STX.iscroll.newScroller($$$(".stxLookupSymbols").parentNode, {vScrollbar: true, hScroll:false, hideScrollbar: false});
			}else{
				this.iscroll.refresh();
			}
		};
		
		/**
		 * Initializes the lookup widget by attaching keyup and click events to the input
		 * @memberOf STX.LookupWidget
		 */
		STX.LookupWidget.prototype.init=function(){
			function closure(that){
				return function(e){
					var div=STX.getEventDOM(e);
					var key = (window.event) ? event.keyCode : e.keyCode;
					switch(key){
						case 13:
							var symbol=div.value;
							that.close();
							that.config.selectCallback(that, symbol, that.currentFilter);
							div.blur();
							break;
						case 27:
							that.close();
							div.blur();
							break;
						default:
							//TODO, clear symbol icon
							that.config.textCallback(that, div.value, that.currentFilter, false);	// false means user typed in input box
							break;
					}
					e = e||event;
					e.stopPropagation? e.stopPropagation() : e.cancelBubble = true;
				};
			}
			function closure2(that){
				return function(e){
					var div=STX.getEventDOM(e);
					that.config.textCallback(that, div.value, that.currentFilter, true);	// true means user clicked in input box
				};
			}
			this.config.input.onkeyup=closure(this);
			this.config.input.onclick=closure2(this);
		};
		
		/**
		 * Displays the lookup widget results. The lookup widget behaves like a menu. It will close if you click out of it or if you click on another menu.
		 * @memberOf STX.LookupWidget
		 */
		STX.LookupWidget.prototype.display=function(){
			function pressFilter(that, div, filter){
				return function(){
					for(var i=0;i<that.filterButtons.length;i++){
						STX.unappendClassName(that.filterButtons[i],"on");
					}
					STX.appendClassName(div, "on");
					that.currentFilter=filter;
					that.config.textCallback(that, that.config.input.value, that.currentFilter);
				};
			}
			if(this.div==null){
				this.div=STX.newChild(this.config.input.parentNode, "DIV", "menuOutline stxLookupResults");
				var ul=STX.newChild(this.div, "UL", "stxResults");
				if(this.config.filters){
					var li=STX.newChild(ul, "LI", "stxLookupFilter");
					for(var i=0;i<this.config.filters.length;i++){
						var filter=this.config.filters[i];
						var div=STX.newChild(li, "div", "stx-btn");
						div.innerHTML=STX.I18N.translate(filter);
						div[STXTouchAction]=pressFilter(this, div, filter);
						this.filterButtons.push(div);
					}
					STX.newChild(ul, "LI", "divider");
				}
				var li=STX.newChild(ul, "LI");
				this.ul=STX.newChild(li, "UL", "menuSelect stxLookupSymbols");
				li.style.maxHeight=this.height + "px";
			}else{
				this.div.style.display="inline-block";
			}
		
			function closeCallback(that){
				return function(){
					that.close();
				};
			}
			STX.MenuManager.menuOn("lookup", closeCallback(this));
		
		};
		
		/**
		 * Closes the lookup results window
		 * @memberOf STX.LookupWidget
		 */
		STX.LookupWidget.prototype.close=function(){
			if(this.div) this.div.style.display="none";
			STX.MenuManager.menuOff();
		};
		
		
		/*
		 * ScrollManager
		 *
		 * This is a widget for detecting whether a user has scrolled between the time that they press the mouse and let go. Otherwise
		 * the act of scrolling a dialog would cause a selection of items in the dialog. To use, register start as your mousedown or touchstart event. Then
		 * call isClick(e) during your mouseup or touchend event to determine whether the user truly clicked or not.
		 * @name STX.ScrollManager
		 */
		STX.ScrollManager=function(){};
		
		STX.ScrollManager.x=0;
		STX.ScrollManager.y=0;
		STX.ScrollManager.downTime=0;
		/**
		 * Use this method to attach a click event to a node that is within an iscroll. Use this instead of onclick, onmousedown or ontouchstart.
		 * @param {object} node The DOM element that is clickable
		 * @param {function} fc Callback method when node is clicked
		 * @memberOf STX.ScrollManager
		 */
		STX.ScrollManager.attach=function(node, fc){
			if(navigator.pointerEnabled){
				node.addEventListener("pointerdown", STX.ScrollManager.start);
			}else if(navigator.msMaxTouchPoints>1){
				node.addEventListener("MSPointerDown", STX.ScrollManager.start);
			}else{
				node.addEventListener("mousedown", STX.ScrollManager.start);
				node.addEventListener("touchstart", STX.ScrollManager.start);
			}
			node.addEventListener("click", function(fc){
				return function(e){
					if(STX.ScrollManager.isClick(e)){
						fc(e);
					}
				};
			}(fc));
		};
		
		/**
		 * Begins a scroll event
		 * @private
		 * @memberOf STX.ScrollManager
		 */
		STX.ScrollManager.start=function(e){
			STX.ScrollManager.x=e.pageX;
			STX.ScrollManager.y=e.pageY;
			if(e.touches && e.touches.length>=1){
				STX.ScrollManager.x=e.touches[0].pageX;
				STX.ScrollManager.y=e.touches[0].pageY;
			}
			STX.ScrollManager.downTime=new Date().getTime();
		};
		
		/**
		 * True if the click was an actual click. This depends on how long the user held their finger/mouse down (under 2 seconds) and whether
		 * their finger or mouse moved significantly in that time (over 10 pixels). If either of those conditions is true then likely the user
		 * was scrolling, not clicking
		 * @private
		 * @memberOf STX.ScrollManager
		 */
		STX.ScrollManager.isClick=function(e){
			var now=new Date().getTime();
			if(now-STX.ScrollManager.downTime>2000) return false;	// Over two seconds from mouse down to mouse up is not a click
			if(Math.abs(e.pageX-STX.ScrollManager.x)>10) return false;	// Moved mouse or finger too much
			if(Math.abs(e.pageY-STX.ScrollManager.y)>10) return false;
			return true;
		};
		
		/**
		 * Use this method to attach a right click event to a node. Second argument is the callback function.
		 * @param {object} node DOM element that is "right clickable"
		 * @param {function} fc Callback when user right clicks
		 * @memberOf STX.ScrollManager
		 */
		STX.ScrollManager.attachRightClick=function(node, fc){
			function closure(fc){
				return function(e){
					if((e.which && e.which>=2) || (e.button && e.button>=2)){
						fc(e);
					}
				};
			}
			if(navigator.pointerEnabled){
				node.addEventListener("pointerup", closure(fc));
			}else if(navigator.msMaxTouchPointers>1){
				node.addEventListener("MSPointerUp", closure(fc));
			}else{
				node.addEventListener("mouseup", closure(fc));
			}
			node.rightClickable=true;
		};
		
		/**
		 * This method kills the context menu (default browser behavior) if the target is right clickable. It assumes that
		 * STX.ScrollManager.attachRightClick has been called on that node. This is automatic and should not be called directly
		 * @private
		 * @memberOf STX.ScrollManager
		 */
		STX.ScrollManager.onContextMenu=function(e){
			if(e.target.rightClickable){ // If node is right clickable then kill context menu, which will allow the mouseup event to trigger
				e.preventDefault();
				return false;
			}
			// otherwise the standard context menu will appear
		};
		
		document.addEventListener("contextmenu", STX.ScrollManager.onContextMenu, false);	// To support right clicking
		
		/**
		 * Lets users pick a local timezone for display on the xaxis of charts.
		 * Creates a menu structure which can be used to provide a user with timezone selection
		 * First level tier is the region. Each region has an array of cities. If the array is empty
		 * then no cities are available for that region. The timezone should be reconstructed as
		 * region/city. For instance, "America/New_York". Or for regions without cities simply "Iran".
		 * The reconstructed value can then be passed into stxx.setTimeZone();
		 * @namespace
		 * @name  STX.TimeZoneWidget
		 */
		STX.TimeZoneWidget=function(){};
		
		/**
		 * Initializes the TimeZoneWidget. This method is called once, automatically. Do not call directly. It iterates
		 * through the known timezomes as provided by timezone.js and creates a comprehensive timezone menu from those items.
		 * @private
		 * @memberOf STX.TimeZoneWidget
		 */
		STX.TimeZoneWidget.init=function(){
			if(typeof timezoneJS!="undefined"){
				STX.TimeZoneWidget.timezoneMenu={};
		
				for(var i in timezoneJS.timezone.zones){
					//if(typeof timezoneJS.timezone.zones[i]=="string") continue;	// translations
					var s=i.split("/");
					var region=s[0];
					if(!STX.TimeZoneWidget.timezoneMenu[region]) STX.TimeZoneWidget.timezoneMenu[region]=[];
		
					if(s.length>1){
						var city=s[1];
						if(s.length>2) city+="/" + s[2];
						STX.TimeZoneWidget.timezoneMenu[region].push(city);
					}
				}
			}
		};
		
		/**
		 * Selects a time zone and enables it in all registered charts.
		 * @param {string} zone A valid time zone
		 * @memberOf STX.TimeZoneWidget
		 */
		STX.TimeZoneWidget.setTimeZone=function(zone){
			STXChart.defaultDisplayTimeZone=zone;
			for(var i=0;i<STXChart.registeredContainers.length;i++){
				var stx=STXChart.registeredContainers[i].stx;
				stx.setTimeZone(stx.dataZone, zone);
				stx.draw();
			}
		};
		
		/**
		 * Removes the time zone from registered charts, and also from the attached storage mechanism.
		 * @memberOf STX.TimeZoneWidget
		 */
		STX.TimeZoneWidget.removeTimeZone=function(){
			STXChart.defaultDisplayTimeZone=null;
			for(var i=0;i<STXChart.registeredContainers.length;i++){
				var stx=STXChart.registeredContainers[i].stx;
				stx.displayZone=null;
				stx.setTimeZone();
				if(STX.TimeZoneWidget.storageCB){
					STX.TimeZoneWidget.storageCB(null);
				}
				stx.draw();
			}
		};
		
		/**
		 * The comprehensive list of timezones can be overwhelming. This is a reduced list that provides just a single
		 * entry for each valid timezone. Each entry maps back to a valid timezone.js entry.
		 * @type {Object}
		 * @memberOf STX.TimeZoneWidget
		 */
		STX.TimeZoneWidget.timeZoneMap={
				"(GMT-12:00) International Date Line West":"Asia/Anadyr",
				"(GMT-11:00) Midway Island, Samoa":"Pacific/Midway",
				"(GMT-10:00) Hawaii":"Pacific/Honolulu",
				"(GMT-09:00) Alaska":"America/Juneau",
				"(GMT-08:00) Pacific Time (US and Canada); Tijuana":"America/Los_Angeles",
				"(GMT-07:00) Mountain Time (US and Canada)":"America/Denver",
				"(GMT-07:00) Chihuahua, La Paz, Mazatlan":"America/Chihuahua",
				"(GMT-07:00) Arizona":"America/Phoenix",
				"(GMT-06:00) Central Time (US and Canada)":"America/Chicago",
				"(GMT-06:00) Saskatchewan":"Canada/Saskatchewan",
				"(GMT-06:00) Guadalajara, Mexico City, Monterrey":"America/Mexico_City",
				"(GMT-06:00) Central America":"America/Panama",
				"(GMT-05:00) Eastern Time (US and Canada)":"America/New_York",
				"(GMT-05:00) Indiana (East)":"America/Indiana/Knox",
				"(GMT-05:00) Bogota, Lima, Quito":"America/Bogota",
				"(GMT-04:00) Atlantic Time (Canada)":"Canada/Atlantic",
				"(GMT-04:00) Caracas, La Paz":"America/Caracas",
				"(GMT-04:00) Santiago":"America/Santiago",
				"(GMT-03:30) Newfoundland and Labrador":"Canada/Newfoundland",
				"(GMT-03:00) Brasilia":"Brazil/East",
				"(GMT-03:00) Buenos Aires, Georgetown":"America/Argentina/Buenos_Aires",
				"(GMT-03:00) Greenland":"America/Argentina/Buenos_Aires",
				"(GMT-02:00) Mid-Atlantic":"Atlantic/South_Georgia",
				"(GMT-01:00) Azores":"Atlantic/Azores",
				"(GMT-01:00) Cape Verde Islands":"Atlantic/Cape_Verde",
				"(GMT) Greenwich Mean Time: Reykjavik":"Atlantic/Reykjavik",
				"(GMT) Dublin, Edinburgh, Lisbon, London":"Europe/London",
				"(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague":"Europe/Belgrade",
				"(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb":"Europe/Sarajevo",
				"(GMT+01:00) Brussels, Copenhagen, Madrid, Paris":"Europe/Brussels",
				"(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna":"Europe/Amsterdam",
				"(GMT+01:00) West Central Africa":"Africa/Windhoek",
				"(GMT+02:00) Bucharest":"Europe/Bucharest",
				"(GMT+02:00) Cairo":"Africa/Cairo",
				"(GMT+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius":"Europe/Helsinki",
				"(GMT+02:00) Athens, Istanbul, Minsk":"Europe/Athens",
				"(GMT+02:00) Jerusalem":"Asia/Jerusalem",
				"(GMT+02:00) Harare, Pretoria":"Africa/Harare",
				"(GMT+03:00) Moscow, St. Petersburg, Volgograd":"Europe/Moscow",
				"(GMT+03:00) Kuwait, Riyadh":"Asia/Kuwait",
				"(GMT+03:00) Nairobi":"Africa/Nairobi",
				"(GMT+03:00) Baghdad":"Asia/Baghdad",
				"(GMT+03:30) Tehran":"Asia/Tehran",
				"(GMT+04:00) Abu Dhabi, Muscat":"Asia/Muscat",
				"(GMT+04:00) Baku, Tbilisi, Yerevan":"Asia/Baku",
				"(GMT+04:30) Kabul":"Asia/Kabul",
				"(GMT+05:00) Ekaterinburg":"Asia/Yekaterinburg",
				"(GMT+05:00) Islamabad, Karachi, Tashkent":"Asia/Karachi",
				"(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi":"Asia/Kolkata",
				"(GMT+05:45) Kathmandu":"Asia/Katmandu",
				"(GMT+06:00) Astana, Dhaka":"Asia/Dhaka",
				"(GMT+06:00) Sri Jayawardenepura":"Asia/Colombo",
				"(GMT+06:00) Almaty, Novosibirsk":"Asia/Novosibirsk",
				"(GMT+06:30) Yangon Rangoon":"Asia/Rangoon",
				"(GMT+07:00) Bangkok, Hanoi, Jakarta":"Asia/Bangkok",
				"(GMT+07:00) Krasnoyarsk":"Asia/Krasnoyarsk",
				"(GMT+08:00) Beijing, Chongqing, Hong Kong SAR, Urumqi":"Asia/Hong_Kong",
				"(GMT+08:00) Kuala Lumpur, Singapore":"Asia/Kuala_Lumpur",
				"(GMT+08:00) Taipei":"Asia/Taipei",
				"(GMT+08:00) Perth":"Australia/Perth",
				"(GMT+08:00) Irkutsk, Ulaanbaatar":"Asia/Irkutsk",
				"(GMT+09:00) Seoul":"Asia/Seoul",
				"(GMT+09:00) Osaka, Sapporo, Tokyo":"Asia/Tokyo",
				"(GMT+09:00) Yakutsk":"Asia/Yakutsk",
				"(GMT+09:30) Darwin":"Australia/Darwin",
				"(GMT+09:30) Adelaide":"Australia/Adelaide",
				"(GMT+10:00) Canberra, Melbourne, Sydney":"Australia/Canberra",
				"(GMT+10:00) Brisbane":"Australia/Brisbane",
				"(GMT+10:00) Hobart":"Australia/Hobart",
				"(GMT+10:00) Vladivostok":"Asia/Vladivostok",
				"(GMT+10:00) Guam, Port Moresby":"Pacific/Guam",
				"(GMT+11:00) Magadan, Solomon Islands, New Caledonia":"Etc/GMT+11",
				"(GMT+12:00) Fiji Islands, Kamchatka, Marshall Islands":"Pacific/Fiji",
				"(GMT+12:00) Auckland, Wellington":"Pacific/Auckland",
				"(GMT+13:00) Nuku'alofa":"Pacific/Tongatapu"
		};
		
		/**
		 * Populates the timezone dialog. This generates a list from STX.TimeZoneWidget.timeZoneMap. Generally this method
		 * is called when the menu is enabled.
		 * @memberOf STX.TimeZoneWidget
		 */
		STX.TimeZoneWidget.populateDialog=function(id){
			if(!STX.TimeZoneWidget.timezoneMenu) STX.TimeZoneWidget.init();
		
			function setTimezone(zone){
				return function(e){
					STX.DialogManager.dismissDialog();
					var translatedZone=STX.TimeZoneWidget.timeZoneMap[zone];
					STX.TimeZoneWidget.setTimeZone(translatedZone);
					if(STX.TimeZoneWidget.storageCB){
						STX.TimeZoneWidget.storageCB(translatedZone);
					}
				};
			}
			if(typeof timezoneJS=="undefined") return;
			var el=$$(id);
			if(!el) return;
			var ul=el.querySelector("ul");
			var template=ul.querySelector("li#timezoneTemplate").cloneNode(true);
			STX.clearNode(ul);
			ul.appendChild(template);
			var arr=[];
			for(var zone in STX.TimeZoneWidget.timeZoneMap){
				arr.push(zone);
			}
			for(var i=0;i<arr.length;i++){
				var zone=arr[i];
				var display=zone;
				var li=template.cloneNode(true);
				li.style.display="block";
				li.innerHTML=display;
				STX.ScrollManager.attach(li, setTimezone(zone));
				ul.appendChild(li);
			}
			if(!STX.TimeZoneWidget.iscroll){
				STX.TimeZoneWidget.iscroll = new iScroll("timezoneDialogWrapper", {vScrollbar: false, hScroll:false, hideScrollbar: false, vScroll:true});
			}else{
				STX.TimeZoneWidget.iscroll.refresh();
			}
		};
		
		/**
		 * Initialize the time zone manager with a prior saved timezone (initialTimeZone) and a callback
		 * mechanism for saving the timezone. Call this function when you initialize your UI.
		 * @param {string} [initialTimeZone] Default timezone to use
		 * @param {function} [cb] Callback function to store a different timezone that the user might pick through the menu fc(string)
		 * @memberOf STX.TimeZoneWidget
		 */
		STX.TimeZoneWidget.initialize=function(initialTimeZone, cb){
			if(initialTimeZone){
				STX.TimeZoneWidget.setTimeZone(initialTimeZone);
			}
			STX.TimeZoneWidget.storageCB=cb;
		};
		
		
		/**
		 * A widget for saving and getting name value pairs. Uses browser localStorage by default but you can override
		 * the get and store functions, or derive a new class, to save to a different data store.
		 * @namespace
		 * @name  STX.StorageManager
		 */
		STX.StorageManager=function(){};	
		
		/**
		 * Get the value for a given key from storage
		 * @param  {string} key The key
		 * @return {object}     The data
		 * @memberOf STX.StorageManager
		 */
		STX.StorageManager.get=function(key){
			if(!localStorage) return null;
			var datum=localStorage.getItem(key);
			return datum;
		};
		
		/**
		 * Save the key value pair in storage
		 * @param  {string} key   The key
		 * @param  {object} value The value
		 * @memberOf STX.StorageManager
		 */
		STX.StorageManager.store=function(key, value){
			localStorage.setItem(key, value);
		};
		
		/**
		 * Remove the key from storage
		 * @param  {string} key The key
		 * @memberOf STX.StorageManager
		 */
		STX.StorageManager.remove=function(key){
			localStorage.removeItem(key);
		};
		
		/**
		 * Provides a closure that can be passed in to other STX UI components for storage or removal.
		 * @param  {string} key The key for the closure
		 * @return {fc}     A closure of form fc(value, stx)
		 * @example
		 * // This provides the ThemeManager with a mechanism for saving its data, under the key "themes"
		 * STX.ThemeManager.themesToMenu(node, node, stx, STX.StorageManager.callbacker("themes"));
		 * @memberOf STX.StorageManager
		 */
		STX.StorageManager.callbacker=function(key){
			return function(value, stx){
				if(value==null){
					STX.StorageManager.remove(key);
				}else{
					STX.StorageManager.store(key, value);
				}
			};
		};
		
		/**
		 * The drawing toolbar is dynamic, displaying various configuration options depending on the tool that is enabled.
		 * This object manages the drawing toolbar.
		 * @namespace
		 * @name  STX.DrawingToolbar
		 */
		STX.DrawingToolbar=function(){};
		
		/**
		 * Initializes the drawing toolbar. It finds the toolbar through class stx-toolbar. Be sure to copy that HTML verbatim into your project
		 * if you aren't using the demo as a starting point. Call this function when you initialize your UI.
		 * @memberOf STX.DrawingToolbar
		 */
		STX.DrawingToolbar.initialize=function(){
			function setLineColor(){
				return function(color){
					if(color=="000000" || color=="ffffff") STXChart.currentColor="auto";
					else STXChart.currentColor="#" + color;
				};
			}
			function setFillColor(){
				return function(color){
					STXChart.currentVectorParameters.fillColor="#" + color;
				};
			}
			var toolbar=$$$(".stx-toolbar");

			var lineColorPicker=$$$(".stxLineColorPicker", toolbar);
			STXChart.currentColor=lineColorPicker.style.backgroundColor;
			STX.MenuManager.attachColorPicker(lineColorPicker, toolbar, setLineColor());

			var fillColorPicker=$$$(".stxFillColorPicker", toolbar);
			STXChart.currentVectorParameters.fillColor=fillColorPicker.style.backgroundColor;
			STX.MenuManager.attachColorPicker(fillColorPicker, toolbar, setFillColor());

			var display=$$$(".stxAxisLabel", toolbar);
			if(display) {
				STX.unappendClassName(display,!STXChart.currentVectorParameters.axisLabel);
				STX.appendClassName(display,STXChart.currentVectorParameters.axisLabel);
			}
		};
		
		/**
		 * Sets the current drawing line color based on what is picked in the toolbar
		 * @memberOf STX.DrawingToolbar
		 */
		STX.DrawingToolbar.setLineColor=function(stx){
			var toolbar=$$$(".stx-toolbar");
			var lineColorPicker=$$$(".stxLineColorPicker", toolbar);
			if(STXChart.currentColor=="transparent"){
				lineColorPicker.style.backgroundColor=stx.defaultColor;
			}else{
				lineColorPicker.style.backgroundColor=STXChart.currentColor;
			}
		};
		
		/**
		 * This object determines which toolbar configuration widgets are available for any given drawing type.
		 * When adding a new drawing type, set it to false for any given widget to disable the widget for that drawing
		 * @type {Object}
		 * @memberOf STX.DrawingToolbar
		 */
		STX.DrawingToolbar.configurator={
				".stxToolbarFill":{"measure":false, "line":false, "ray":false, "segment":false, "annotation": false, "horizontal":false, "vertical":false, "continuous":false, "fibonacci":false, "freeform":false},
				".stxToolbarLine":{},
				".stxToolbarLinePicker":{"fibonacci": false, "annotation": false},
				".stxToolbarNone":{"measure":false, "line":false, "ray":false, "segment":false, "annotation": false, "horizontal":false, "vertical":false, "continuous":false, "fibonacci":false, "freeform":false},
				".stxToolbarDotted":{},
				".stxToolbarDashed":{},
				".stxToolbarAxisLabel":{"measure":false, "line":false, "ray":false, "segment":false, "annotation": false, "rectangle": false, "ellipse": false, "continuous":false, "fibonacci":false, "freeform":false}
		};
		
		/**
		 * Sets the line type (STXChart.currentVectorParameters) from the toolbar selections.
		 * @param {Number} width   The width of the line
		 * @param {string} pattern The type of line ("solid","dotted","dashed" or "none")
		 * @memberOf STX.DrawingToolbar
		 */
		STX.DrawingToolbar.setLine=function(width, pattern){
			var className="stx-line stxLineDisplay weight" + width;
			STXChart.currentVectorParameters.lineWidth=width+.1;	// Use 1.1 instead of 1 to get good anti-aliasing on Android Chrome
			if(pattern=="solid"){
				STXChart.currentVectorParameters.pattern="solid";
				className+=" style1";
			}else if(pattern=="dotted"){
				STXChart.currentVectorParameters.pattern="dotted";
				className+=" style2";
			}else if(pattern=="dashed"){
				STXChart.currentVectorParameters.pattern="dashed";
				className+=" style3";
			}else if(pattern=="none"){
				STXChart.currentVectorParameters.pattern="none";
			}
			var display=$$$(".stx-toolbar .stxLineDisplay");
			if(display) display.className=className;
		};
		
		/**
		 * Toggles the axis label from the drawing toolbar.
		 * @memberOf STX.DrawingToolbar
		 */
		STX.DrawingToolbar.toggleAxisLabel=function(){
			STXChart.currentVectorParameters.axisLabel=!STXChart.currentVectorParameters.axisLabel;
			var display=$$$(".stx-toolbar .stxAxisLabel");
			if(display) {
				STX.unappendClassName(display,(!STXChart.currentVectorParameters.axisLabel).toString());
				STX.appendClassName(display,STXChart.currentVectorParameters.axisLabel.toString());
			}
		};

		/**
		 * Changes the currently selected drawing type (vectorType). The drawing type should match the name of the Drawing object.
		 * @param {object} stx        The chart object
		 * @param {string} vectorType The drawing type
		 * @memberOf STX.DrawingToolbar
		 */
		STX.DrawingToolbar.setVectorType=function(stx,vectorType){
			if(vectorType==null || vectorType==""){
				stx.changeVectorType("");
				for(var i in STX.DrawingToolbar.configurator){
					var all=document.querySelectorAll(i);
					for(var j=0;j<all.length;j++){
						all[j].style.display="none";
					}
				}
				$$("toolSelection").innerHTML=STX.I18N.translate("Select Tool");
				return;
			}
			for(var i in STX.DrawingToolbar.configurator){
				var all=document.querySelectorAll(i);
				for(var j=0;j<all.length;j++){
					if(STX.DrawingToolbar.configurator[i][vectorType]==false){
						all[j].style.display="none";
					}else{
						all[j].style.display="";
					}
				}
			}
			stx.changeVectorType(vectorType);
			var prettyDisplay=STX.I18N.translate(vectorType.capitalize());
			$$("toolSelection").innerHTML=prettyDisplay;
			STX.DrawingToolbar.setLineColor(stx);
		};
		
		/**
		 * Turns crosshairs on or off based on the toolbar selection. Note that crosshairs can be turned on or off
		 * anytime by simply setting stx.layout.crosshair to true or false.
		 * @param  {object} stx   The chart object
		 * @param  {boolean} state True if the crosshairs should be on, otherwise false
		 * @memberOf STX.DrawingToolbar
		 */
		STX.DrawingToolbar.crosshairs=function(stx, state){
			STX.DrawingToolbar.setVectorType(stx, null);
			stx.layout.crosshair=state;
			if(state){
				$$("toolSelection").innerHTML=STX.I18N.translate("Crosshairs");
			}else{
				$$("toolSelection").innerHTML=STX.I18N.translate("Select Tool");
			}
			stx.draw();
			stx.changeOccurred("layout");
			stx.doDisplayCrosshairs();
		};
		
		STXChart.drawingLine=false; // Toggles to true when a drawing is initiated
		STXChart.resizingPanel=null; // Toggles to true when a panel is being resized
		STXChart.vectorType="";		// The type of drawing currently enabled "segment", "line", "ray", etc. See sample.html menu
		STXChart.crosshairX=0;	// Current X screen coordinate of the crosshair
		STXChart.crosshairY=0;
		STXChart.insideChart=false;	// Toggles to true whenever the mouse cursor is within the chart (canvas)
		STXChart.overXAxis=false;	// Toggles to true if the mouse cursor is over the X Axis.
		STXChart.overYAxis=false;	// Toggles to true if the mouse cursor is over the Y Axis.
		STXChart.currentColor="auto";	// Currently selected color for drawing tools. This may be changed by developing a menu with a color picker.
		STXChart.drawingTools={};
		STXChart.useAnimation=false;	// Set to true to force use of HTML5 canvas animation API
		STXChart.ipadMaxTicks=1500;		// performance limitation as of IOS7
		STXChart.enableCaching=false;
		STXChart.ignoreTouch=false;		// set this true to override the touch commands in the kernel (such as when manipulating DOM elements on screen)
		STXChart.useOldAndroidClear=true;	// Turn this off to boost native android browser performance, but at risk of "double candle" display errors on some devices		
		/**
		 * This static object should always contain the current drawing tool preferences (width, color, pattern). This object can
		 * be extended to support additional drawing tools (for instance note the extensive customization capabilities for fibonacci)
		 * @type {Object}
		 * @memberOf  STXChart
		 */
		STXChart.currentVectorParameters={
				pattern:"solid",
				lineWidth:1,
				fillColor:"#7DA6F5",
				axisLabel:"true",
				fibonacci:{
						trend:{color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
						fibs:[
						      {level:-.618, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
						      {level:-.382, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
						      {level:0, color:"auto", parameters:{pattern:"solid", lineWidth:1}},
						      {level:.382, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
						      {level:.618, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
						      {level:.5, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
						      {level:1, color:"auto", parameters:{pattern:"solid", lineWidth:1}},
						      {level:1.382, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}},
						      {level:2.618, color:"auto", parameters:{pattern:"solid", opacity:.25, lineWidth:1}}
						      ],
						extendLeft: false,
						printLevels: true
					}
		};
		
		STXChart.defaultDisplayTimeZone=null;	// If set, then new STXChart objects will pull their display timezone from this
		
		if(typeof $$=="undefined"){	// Bypass $$ when running under node.js
			$$=function(node){
				return{};
			};
		}
		
		/**
		 * Defines a chart object.
		 * @constructor
		 * @name  STXChart.Chart
		 */
		STXChart.Chart=function(){};
		
		/**
		 * Defines a YAxis object.
		 * @constructor
		 * @name  STXChart.YAxis
		 */
		STXChart.YAxis=function(){};
		
		/**
		 * Defines a Panel object
		 * @param {string} name The name of the panel
		 * @constructor
		 * @name  STXChart.Panel
		 */
		STXChart.Panel=function(name){
			this.yAxis=new STXChart.YAxis();
			this.name=name;
		};
		
		STXChart.YAxis.prototype={
			high: null,				// High value on y axis
			low: null,				// Low value on y axis
			shadow: null,			// high - low
			logHigh: null,			// High log value on y axis
			logLow: null,			// Low log value on y axis
			logShadow: null,		// logHigh - logLow
			multiplier: null,		// Computed automatically. Divide pixel by this to get the price (then add to low). Or multiply price by this to get the pixel (then add to top)
			bottomOffset: 0,		// set this to set the y-axis bottom, this number of pixels above the panel's bottom
			topOffset: 0,			// set this to set the y-axis top, this number of pixels below the panel's top
			initialMarginTop: 0,	// set this to automatically compress and offset the y-axis so that this many pixels of white space is above the display.
			initialMarginBottom: 0,	// set this to automatically compress and offset the y-axis to that this many pixels of white space is below the display
			zoom: 0,				// set this to the number of pixels to zoomed in or out, positive or negative. This is defined as the number of pixels to add or subtract from both top and bottom of panel for calculations.
			scroll: 0,				// set this to the number of pixels to offset the y-axis, positive or negative.
			bottom: null,			// calculated automatically (panel.top+yAxis.topOffset)
			top: null,				// calculated automatically (panel.bottom-yAxis.bottomOffset)
			height: null,			// bottom - top
			decimalPlaces: null,		// 0-4 or leave null and the chart will automatically detect
			idealTickSizePixels: null,	// ideal size between y-axis values in pixels. Leave null to automatically calculate
			displayGridLines: true,		// set to false to not plot grid lines
			priceFormatter: null		// callback function to override default formatting fc(stx, panel, price)
		};
		
		STXChart.Panel.prototype={
				name: null,						// Name of panel
				display: null,					// Display text of panel
				chart: null,					// The chart from which this panel derives it's data
				yAxis: null,
				top: null,						// Y location of top of chart
				bottom: null,					// Y location of bottom of chart
				height: null,					// height of chart in pixels
				percent: null					// percent of overall window this panel takes up
		};
		
		STXChart.Chart.prototype={
				name: null,		// This will be set as the name of the chart
				panel: null,	// The STXChart.Panel associated with the display of the chart itself
				symbol: null,	// Set this to the current symbol
				symbolDisplay: null,	// Set this for an alternate display on the chart label than symbol
			    series: {}, // Series that are drawn on chart, or for comparison. A series may have a different y-axis calculation than the price chart.
				scroll: 0,			// Currently number of ticks scrolled. Zero would theoretically be scrolled completely to the left.
				standStill: 0,		// Used internally
				maxTicks: 0,	// Horizontal number of chart ticks that currently fit in the canvas, based on candlewidth and spacing
				xaxisFactor: 30,	// pixels, determines at which zoom level interior axis points are displayed
				masterData: null,	// The master data for this chart. This data is never modified by the chart engine itself
				dataSet: null,		// Contains the current complete data set, adjusted for periodicity and with calculated studies
				scrubbed: null,		// Contains the data set, scrubbed for null entries (gap dates) (if this.dataSetContainsGaps)
				dataSegment: null,	// Contains the segment of the data set that is displayed on the screen
				xaxis:[],			// Contains data entries for the full xaxis. It is a superset of dataSegment
				volumeMax: 0,			// Contains the maximum volume displayed if (volume study selected)
				decimalPlaces: 2,		// Maximum number of decimal places in data set. Computed automatically.
				roundit: 100,			// Computed automatically to round y-axis display
				beginHour:0,
				beginMinute:0,
				endHour:23,
				endMinute:59,
				minutesInSession:1440,	// Auto calculated
				calendarAxis: false		// If true then axis will be calendar time, ignoring weekends, holidays and closing hours
			};
		
		/**
		 * Basic Chart object. Multiple STXChart (stx) objects can exist on an HTML document.
		 * charts is a member object that can contain multiple charts (in separate panels).
		 * For backward compatibility, there is always one chart called stxx.chart which points to the first chart in the charts object. Users
		 * can feel free to reference this chart directly if they only ever need to support a single chart panel.
		 * "chart" contains some variables that are applicable to all of the charts on the screen (i.e. canvas, canvasWidth, canvasHeight, etc)
		 *
		 * Each chart contains a unique set of data. In theory each chart supports a separate scroll position but this is not implemented.
		 * @constructor
		 * @name  STXChart
		 */
		function STXChart(container){
			this.panels={};	// READ ONLY. An array of currently enabled panels
			this.overlays={};	// READ ONLY. An array of currently enabled overlay studies
		    this.charts={};		// The charts on the screen. Will contain at least one item, "chart"
		
		    this.controls={};	// contains the HTML controls for the chart (zoom, home, etc)
			this.goneVertical=false;	// Used internally for pinching algorithm
			this.pinchingScreen=false;	// "
			this.grabbingScreen=false;	// Toggles to true when the screen is being panned
			this.grabStartX=0;			// Used internally for panning
			this.grabStartY=0;			// "
			this.grabStartScrollX=0;	// "
			this.grabStartScrollY=0;	// "
			this.grabStartCandleWidth=0;	// Used internally for zooming
			this.grabStartZoom=0;			// "
			this.grabOverrideClick=false;	// "
			this.grabMode="";				// Set to either pan or zoom when grabbing screen
			this.vectorsShowing=false;		// Used internally to ensure that vectors aren't drawn more than once
			this.mouseMode=true;			// For Windows8 devices this is set to true or false depending on whether the last touch was a mouse click or touch event. To support all-in-one computers
		
			this.anyHighlighted=false;		// Toggles to true if any drawing or overlay is highlighted for deletion
			this.accessoryTimer=null;		// Used internally to speed drawing performance
			this.lastAccessoryUpdate=new Date().getTime();	// "
			this.displayCrosshairs=true;	// Use doDisplayCrosshairs() or undisplayCrosshairs()
			this.hrPanel=null;				// Current panel that mouse is hovering over
			this.annotationTA=null;			// Contains the textArea for a currently edited annotation
			this.editingAnnotation=false;	// True if an annotation is open for editing
			this.openDialog="";				// Set this to non-blank to disable chart touch and mouse events
		
			this.displayIconsUpDown=true;	// Set these to false to not display these components
			this.displayIconsSolo=true;
			this.displayIconsClose=true;
			this.displayPanelResize=true;
			this.manageTouchAndMouse=true;	// If true then the STXChart object will manage it's own touch and mouse events, by attaching them to the container div
			this.touches=[];
			this.changedTouched=[];
			this.crosshairTick=null;
			this.crosshairValue=null;
			this.yaxisWidth=45;		// How much space for chart to leave for y-axis. If less than yaxisLeft then the chart will slide under the y-axis
			this.yaxisLeft=null;	// How far to the left the y-axis should be. Defaults to the same as yaxisWidth
		
			this.pt={
				x1:-1,
				x2:-1,
				y1:-1,
				y2:-1
			};
			this.moveA=-1;	// Used internally for touch
			this.moveB=-1;	// "
			this.touchStartTime=-1;	// "
			this.cancelSwipe=false; // "
			this.momentumDistance=0; // "
			this.momentumTime=0; // "
			this.gestureStartDistance=-1; // "
			this.grabStartPeriodicity=1; // "
			this.grabEndPeriodicity=-1; // "
			this.scrollEvent=null; // "
			this.cmd=false; // "
			this.ctrl=false; // "
			this.shift=false; // "
			this.userPointerDown=false;  //represents either mouse button or finger on touch device
			this.crosshairXOffset=-40;	// Offset for touch devices so that finger isn't blocking crosshair
			this.crosshairYOffset=-40;
			this.displayInitialized=false; // This gets set to true when the display has been initialized
		
			this.clicks={
				s1MS: -1,
				e1MS: -1,
				s2MS: -1,
				e2MS: -1
			};
		
			this.cancelTouchSingleClick=false; // Set this to true whenever a screen item is touched so as to avoid a chart touch event
			this.layout={	// Contains the current screen layout
				interval: "day",
				periodicity: 1,
				candleWidth: 8,	// In pixels
				volumeUnderlay: false,
				adj: true,	// Whether adjusted or nominal prices are being displayed
				chartType: "candle",
				studies: {},
				panels: {}
			};
			this.preferences={
				magnet: false,
				labels: true,	// display labels on y-axis for all studies
				whitespace: 100	// Initial whitespace on right of the screen in pixels
			};
			this.translationCallback=null;	// fc(english) should return a translated phrase given the English phrase. See separate translation file for list of phrases.
			this.locale=null;			// set this to the locale string to use when localizing charts. locale string should reference a loaded ECMA-402 Intl locale. Leaving null will use the default browser locale. Or call stx.setLocale(locale) to change the locale dynamically.
			this.dataZone=null;			// set by setTimeZone()
			this.displayZone=null;		// set by setTimeZone()
			this.timeZoneOffset=0;		// use setTimeZone() to compute this value
			this.changeCallback=null;	// fc(stxChart, change) where "change" is either "layout" or "vectors". Use this for storing chart configurations or drawings.
			this.masterData=null;		// Contains the historical quotes for the current chart
			this.transformDataSetPre=null;			// Use this to transform the data set previous to a createDataSet() event, such as change in periodicity
			this.transformDataSetPost=null;
			this.dataCallback=null;					// Used by setPeriodicityV2 which will call this if an interval is requested that it does not have
			this.dontRoll=false;					// Set this to true if server data comes as week or monthly and doesn't require rolling computation from daily
			this.drawingObjects=[];					// Drawing objects on the chart
			this.undoStamps=[];
			this.dataSetContainsGaps=true;			// Assume there may be gaps and we want to scrub the data by removing them
			this.resizeDetectMS=1000;				// Set to zero to avoid resize checking loop
			this.chart=new STXChart.Chart();
			this.chart.name="chart";
			this.chart.top=0;									// Screen location of top of canvas
			this.chart.width=null;								// Width of the chart, up to but not including the Y axis
			this.chart.left=0;									// Screen location of left of canvas
			this.chart.right=-1;								// Screen location of right of canvas
			this.chart.canvas=null;								// Contains the HTML5 canvas with the chart and drawings
			this.chart.tempCanvas=null;							// lays on top of the canvas and is used when creating drawings
			this.chart.canvasHeight=null;						// Full height of the canvas
			this.chart.canvasWidth=null;						// Full width of the canvas
			this.chart.container=container;
			this.chart.allowScrollPast=true;					// If true then allow users to scroll back in time so that chart can be right aligned
			this.chart.hideDrawings=false;						// Set to true to hide drawings
			this.candleWidthPercent=.65;					// Adjust to increase or decrease the width of candles
			this.charts["chart"]=this.chart;
			this.styles={};					// Contains CSS styles used internally to render canvas elements
			if(container){
				this.registerHTMLElements();
				// Initialize the very basic dimensions of chart so that it is operational immediately
				this.chart.width=this.chart.container.clientWidth-this.yaxisWidth;
				this.chart.maxTicks=Math.round((this.chart.width/this.layout.candleWidth)-.499);
				this.chart.canvasHeight=container.clientHeight;
			}
		}
		
		_exports.STXChart=STXChart;
		
		/**
		 * @deprecated
		 */
		STXChart.DrawingDescriptor={
				"name": "",
				"render": null, /// function(vector, color, context, highlight (boolean), temporary (boolean), stx)
				"intersected": null,	/// function(vector, x, y) returns whether coordinates intersect the object
				"click": null,	/// function(vector, clickNumber) called when mouse click or tap. Return true to end drawing. False to accept more clicks.
				"abort": null	/// called when user has aborted drawing action (esc key for instance)
		};
		
		/**
		 * Prepends custom developer functionality to an internal chart member. See Injection API tutorial.
		 * @param  {string} o Signature of member
		 * @param  {function} n Callback function, will be called with "apply"
		 * @memberOf  STXChart
		 */
		STXChart.prototype.prepend=function(o,n){
			var prepends=STXChart.prototype["prepend"+o];
			if(!prepends){
				STXChart.prototype["prepend"+o]=[n];
			}else{
				STXChart.prototype["prepend"+o]=[n].concat(prepends);
			}
		};
		
		/**
		 * Appends custom developer functionality to an internal chart member. See Injection API tutorial.
		 * @param  {string} o Signature of member
		 * @param  {function} n Callback function, will be called with "apply"
		 * @memberOf  STXChart
		 */
		STXChart.prototype.append=function(o,n){
			var appends=STXChart.prototype["append"+o];
			if(!appends){
				STXChart.prototype["append"+o]=[n];
			}else{
				appends.push(n);
			}
		};
		/**
		 * Removes custom developer functionality from an internal chart member. Will remove any and all appends or prepends.
		 * @param  {string} o Signature of member
		 * @memberOf  STXChart
		 */
		STXChart.prototype.remove=function(o){
			delete STXChart.prototype["append"+o];
			delete STXChart.prototype["prepend"+o];
		};
		
		STXChart.registeredContainers=[];	// This will contain an array of all of the STX container objects
		// Note that if you are dynamically destroying containers in the DOM you should delete them from this array when you do so
		
		/**
		 * @deprecated Use STX.ScrollManager.attachRightClick
		 */
		STXChart.handleContextMenu=function(e){ // This code prevents the browser context menu from popping up if you right click on a drawing or overlay
			if(!e) e=event;
			for(var i=0;i<STXChart.registeredContainers.length;i++){
				var stx=STXChart.registeredContainers[i].stx;
				if(stx){
					if(stx.anyHighlighted){
						if(e.preventDefault) e.preventDefault();
						return false;
					}
				}
			}
		};
		
		/**
		 * Base class for Quotes infrastructure. Many of the built in UI capabilities such as comparison charts expect
		 * to follow this infrastructure. You should define your own classes that follow this pattern (or derive a class from STX.Quotes)
		 * in order to adapt your quote feed to make the most use of the built in componentry.
		 * @name  STX.QuoteFeed
		 * @constructor
		 */
		STX.QuoteFeed=function(){};
		
		/**
		 * @callback STX.QuoteFeed~dataCallback
		 * @param {boolean} error Null if no error, otherwise an error object or condition
		 * @param {array} quotes An array of Quotes in required JSON format
		 * @param {boolean} [moreAvailable] Set this to true to enable pagination when user scrolls off the left of the chart.
		 */
		
		/**
		 * Override this method with your implementation to fetch data from your server. The charting engine will call this whenever
		 * it needs more data.
		 * @param  {object}   params Describes the data requested by the chart
		 * @param {STXChart} params.stx The chart object requesting data
		 * @param {string} params.symbol The symbol to fetch
		 * @param {number} params.period The period to fetch
		 * @param {string} params.interval The interval to fetch "minute","day","week","month"
		 * @param {Date} [params.startDate] The starting datetime. This will be sent for instance when the chart requires an update, to stream.
		 * @param {Date} [params.endDate] The ending datetime. This will be null unless it is a "loadMore" pargination operation.
		 * @param {number} params.ticks The number of ticks requires to fill the chart screen. This can be used to determine how much data to fetch.
		 * @param  {STX.QuoteFeed~dataCallback} cb     Call this function with the data to update the chart
		 * @abstract
		 * @memberOf  STX.QuoteFeed
		 */
		
		STX.QuoteFeed.prototype.fetch=function(params, cb){
		
		};
		
		/**
		 * Whenever an error occurs the params and dataCallback from fetch will be passed to this method. Use this to alert the user if desired.
		 * Override this with your own alerting mechanisms.
		 * @param  {object} params The params originally passed into fetch()
		 * @param {object} dataCallback The data returned to fetch
		 * @memberOf  STX.QuoteFeed
		 */
		STX.QuoteFeed.prototype.announceError=function(params, dataCallback){
			if(params.startDate){
				// Perhaps some sort of "disconnected" message on screen
			}else if(params.endDate){
				// Perhaps something indicating the end of the chart
			}else{
				STX.alert("Error fetching quote:" + dataCallback.error);	// Probably a not found error?
			}
		};
		
		/**
		 * Fetches multiple quotes asynchronously, possibly from various data sources. This method is used to update a chart with multiple symbols
		 * such as a comparison chart.
		 * @param  {array}   arr Array of stock symbols
		 * @param  {Function} cb  Function to callback when quotes are fetched. Will be passed an array of results. Each result is an object {dataCallback, params}.
		 * @memberOf  STX.QuoteFeed
		 */
		STX.QuoteFeed.prototype.multiFetch=function(arr, cb){
			var tracker={
				counter:0,
				finished: arr.length,
				results: []
			};
		
			function handleResponse(params, tracker, cb){
				return function(dataCallback){
					tracker.results.push({dataCallback:dataCallback, params: params});
					tracker.counter++;
					if(tracker.counter==tracker.finished){
						cb(tracker.results);
					}
				};
			}
			for(var i=0;i<arr.length;i++){
				var params=arr[i];
				this.fetch(params, handleResponse(params, tracker, cb));
			}
		};
		
		/**
		 * Demo version of quotes which uses EOD data
		 * @name  STX.QuoteFeed.Demo
		 * @constructor
		 */
		STX.QuoteFeed.Demo=function(){};
		
		STX.QuoteFeed.Demo.stxInheritsFrom(STX.QuoteFeed);
		
		/*
		 * This is a demo version of fetch. You will need to create one for your own quote feed that behaves similarly.
		 * This only supports end of day quotes.
		 * @memberOf  STX.QuoteFeed.Demo
		 */
		STX.QuoteFeed.Demo.prototype.fetch=function(params, cb){
			function setQuotes(response){
				eval(response);
				return historicalQuote;
			}
			
			if(params.startDate){
				if(params.interval=="minute"){
					this.update(params, cb);
				}else{
					cb({error:"STX.QuoteFeed.Demo does not support updates for daily charts"});			
				}
				return;
			}
			if(params.endDate){
				if(params.interval=="minute"){
					this.loadMore(params, cb);
				}else{
					cb({error:"STX.QuoteFeed.Demo does not support loadMOre for daily charts"});			
				}
				return;
			}
			if(params.interval=="minute"){
				this.generateIntraday(params, cb);
				return;
			}
			var url="http://demoquotes.whitelabelstockcharts.com/" + params.symbol.toUpperCase();
			STX.postAjax(url, null, function(status, response){
				if(status!=200){
					cb({error:status});
					return;
				}
				var quotes=setQuotes(response);
				var newQuotes=[];
				for(var i=0;i<quotes.length;i++){
					newQuotes[i]={};
					newQuotes[i].Date=quotes[i][0]; // Or set newQuotes[i].DT if you have a JS Date
					newQuotes[i].Open=quotes[i][1];
					newQuotes[i].High=quotes[i][2];
					newQuotes[i].Low=quotes[i][3];
					newQuotes[i].Close=quotes[i][4];
					newQuotes[i].Volume=quotes[i][5];
					newQuotes[i].Adj_Close=quotes[i][6];
				}
				cb({quotes:newQuotes});
			});
		};
		
		
		/**
		 * Creates a random update. Note that updates are returned as an array. You should check params.startDate to decide
		 * the starting point for an update.
		 * @memberOf  STX.QuoteFeed.Demo
		 */
		STX.QuoteFeed.Demo.prototype.update=function(params, cb){
			var masterData=params.stx.chart.masterData;
			var current=masterData[masterData.length-1];
			var ms=new Date().getTime();
			ms=ms-ms%(params.period*60*1000); // move to evenly divided bar
		
			var newQuote={};
			var now=new Date(ms);
			newQuote.DT=now; // Or set newQuote.Date if you have a string form date
			var field=params.symbol;
			if(!params.chart.series[field]) field="Close";
			if(!current[field]) current=masterData[masterData.length-2]; // get series which might be lagging behind a bar
			newQuote.Close=Math.round((current[field]-(Math.random()-.5)*.8)*100)/100;
		
			if(ms==masterData[masterData.length-1].DT.getTime()){
				newQuote.Open=current.Open;
				newQuote.High=Math.max(current.High, newQuote.Close);
				newQuote.Low=Math.min(current.Low, newQuote.Close);
				newQuote.Volume=current.Volume+Math.round(Math.random()*10000);
			}else{
				newQuote.Open=newQuote.High=newQuote.Low=newQuote.Close;
				newQuote.Volume=1000;
			}
			cb({quotes:[newQuote]});
		};
		
		STX.QuoteFeed.Demo.prototype.randomQuote=function(seed){
			var Open=seed-(Math.random()-.5)*2;
			var Close=seed-(Math.random()-.5)*2;
			var High=Math.max(seed-(Math.random()-.5)*2, Open, Close);
			var Low=Math.min(seed-(Math.random()-.5)*2, Open, Close);
			var newQuote={
				Open: Math.round(Open*100)/100,
				Close: Math.round(Close*100)/100,
				High: Math.round(High*100)/100,
				Low: Math.round(Low*100)/100,
				Volume: 1000000+Math.round(Math.random()*100000)
			};
			return newQuote;
		};
		
		/**
		 * Creates a random intraday chart (based on 24 hour security for simplicity sake)
		 * @memberOf  STX.QuoteFeed.Demo
		 */
		STX.QuoteFeed.Demo.prototype.generateIntraday=function(params, cb){
			var seed=155.43;
			var quotes=[];
		
			var now=new Date().getTime();
			var ms=now-(params.period*60*1000)*params.ticks;
			ms=ms-ms%(params.period*60*1000); // move to evenly divided bar
			for(var i=0;i<params.ticks;i++){
				var newQuote=this.randomQuote(seed);
				newQuote.Date=STX.yyyymmddhhmm(new Date(ms));
				quotes.push(newQuote);
				ms+=params.period*60*1000;
				seed=newQuote.Close;
			}
			cb({quotes:quotes, moreAvailable:true});
		};
		
		/**
		 * Loads more random data when the user scrolls back.
		 * @memberOf  STX.QuoteFeed.Demo
		 */
		STX.QuoteFeed.Demo.prototype.loadMore=function(params, cb){
			var firstQuote=params.chart.masterData[0];
			var field=params.symbol;
			if(!params.chart.series[field]) field="Close";
			for(var i=0;i<params.chart.masterData.length;i++){
				if(params.chart.masterData[i].DT.getTime()==params.endDate.getTime()){
					firstQuote=params.chart.masterData[i];
					break;
				}
			}
			var seed=firstQuote[field];
			var quotes=[];
		
			//var now=new Date().getTime();
			var ms=params.endDate.getTime()-(params.period*60*1000);
			for(var i=0;i<params.ticks;i++){
				var newQuote=this.randomQuote(seed);
				newQuote.Date=STX.yyyymmddhhmm(new Date(ms));
				quotes.push(newQuote);
				ms-=params.period*60*1000;
				seed=newQuote.Close;
			}
			quotes.reverse();
			cb({quotes:quotes, moreAvailable:true});
		};
		
		if(typeof document!="undefined") document.addEventListener("contextmenu", STXChart.handleContextMenu);
		
		return _exports;
	
	}
	
	{
		var _stx_js_exports={};
		if(typeof exports!=="undefined") _stx_js_exports=exports;
		
		if ( typeof define === "function" && define.amd ) {
			define( ["stxThirdParty"], function(_stxThirdParty) { return _stx_js(_stx_js_exports,_stxThirdParty); } );
		}else{
			var _stxThirdParty={};
			if(typeof(window.STXThirdParty)!="undefined") _stxThirdParty=window.STXThirdParty;
			
			var _=_stx_js(_stx_js_exports,_stxThirdParty);
			window.STX=_.STX;
			window.STXChart=_.STXChart;
			window.$$=_.$$;
			window.$$$=_.$$$;
			if(typeof STX_namespaced=="undefined") {//copy STX functions into window for backwards functionality
				var namespaces=["","DialogManager","DrawingToolbar","I18N","LegacyMarket","LookupWidget","MenuManager",
				                "ScrollManager","StorageManager","Studies","ThemeManager","TimeZoneWidget",""].join(",");
				for(var func in _.STX) {
					if(namespaces.indexOf(","+func+",")==-1) eval("window."+func+"=_.STX."+func);
					else if(func=="LegacyMarket") eval("window.STXMarket=_.STX.LegacyMarket");
					else eval("window.STX"+func+"=_.STX."+func);
				}
			}  
		}
	}

})();

STXChart.version="Version 2014-08";