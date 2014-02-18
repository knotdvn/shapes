 /* `Line`: x1, y1, x2, y2, stroke, strokeWidth
   * `Circle`: cx, cy, center, width, stroke, strokeWidth, fill
   * `Rectangle`: cx, cy, center, width, height, stroke, strokeWidth, fill
   * `Square`: cx, cy, center, width, height, stroke, strokeWidth, fill
   * `Text`: x, y, text */
   var svgns = "http://www.w3.org/2000/svg";
   function Line(){

   		this.svgType = "line";

   		this.x1Val = "";
   		this.y1Val = "";

   		this.x2Val = "";
   		this.y2Val = "";

   		this.strokeVal = "";
   		this.strokeWidthVal = "";
   }//end object line

	Line.prototype = {

		x1: function(x){
			//if no param get val else set val
			if(x == null){
				return this.x1Val;
			}else{
				this.x1Val = x;
			}//end if set or get 
			return this; //end function x1
		},

		x2: function(x){
			//if no param get val else set val
			if(x == null){
				return this.x2Val;
			}else{
				this.x2Val = x;
			}//end if set or get 
			return this; //end function x2
		},

		y1: function(y){
			//if no param get val else set val
			if(y == null){
				return this.y1Val;
			}else{
				this.y1Val = y;
			}//end if set or get 
			return this; //end function y1
		},

		y2: function(y){
			//if no param get val else set val
			if(y == null){
				return this.y2Val;
			}else{
				this.y2Val = y;
			}//end if set or get 
			return this; //end function y1
		},

		stroke: function(s){
			//if no param get val else set val
			if(s == null){
				return this.strokeVal;
			}else{
				this.strokeVal = s;
			}//end if set or get 
			return this; //end function stroke
		},

		strokeWidth: function(sW){
			//if no param get val else set val
			if(sW == null){
				return this.strokeWidthVal;
			}else{
				this.strokeWidthVal = sW;
			}//end if set or get 
			return this; //end function strokeWidth
		},

		draw: function(parent){
			//line draw
			var e = document.createElementNS(svgns, this.svgType );
			e.setAttributeNS(null, "stroke", this.strokeVal);
			e.setAttributeNS(null, "stroke-width", this.strokeWidthVal);
			e.setAttributeNS(null, "x1", this.x1Val);
			e.setAttributeNS(null, "y1", this.y1Val);
			e.setAttributeNS(null, "x2", this.x2Val);
			e.setAttributeNS(null, "y2", this.y2Val);
			parent.appendChild(e);
			return this;
		} //end Line method list

   }//end Line protype
   Line.prototype.constructor = Line;


   function Text(){

   		this.svgType = "text";

   		this.xVal = "";
   		this.yVal = "";


   		this.textVal = "";
   		
   }//end object Text

	Text.prototype = {

		x: function(x1){
			//if no param get val else set val
			if(x1 == null){
				return this.xVal;
			}else{
				this.xVal = x1;
			}//end if set or get 
			return this; //end function x
		},

		

		y: function(y1){
			//if no param get val else set val
			if(y1 == null){
				return this.yVal;
			}else{
				this.yVal = y1;
			}//end if set or get 
			return this; //end function y
		},


		text: function(txt){
			//if no param get val else set val
			if(txt == null){
				return this.textVal;
			}else{
				this.textVal = txt;
			}//end if set or get 
			return this; //end function text
		},

		draw: function(parent){
			//text draw
			var txt = document.createTextNode(this.textVal);
			var e = document.createElementNS(svgns, this.svgType );
			e.setAttributeNS(null, "x", this.xVal);
			e.setAttributeNS(null, "y", this.yVal);
			e.appendChild(txt);
			parent.appendChild(e);
			return this;
		} //end Line method list

   }//end Line protype
   Text.prototype.constructor = Text;






function testLine(){
	var dev = new Line();
	dev.stroke("red").strokeWidth(2).x1(1).y1(9).x2(5).y2(6);
	console.log(dev);
	console.log( "x1:" + dev.x1() );
	console.log( "x2:" + dev.x2() );
	console.log( "y1:" + dev.y1() );
	console.log( "y2:" + dev.y2() );
	console.log( "stroke:" + dev.stroke() );
	console.log( "strokeWidth:" + dev.strokeWidth() );

}//end function test Line

//testLine();




