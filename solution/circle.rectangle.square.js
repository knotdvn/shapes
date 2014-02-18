 /** `Circle`: cx, cy, center, width, stroke, strokeWidth, fill
   * `Rectangle`: cx, cy, center, width, height, stroke, strokeWidth, fill
   * `Square`: cx, cy, center, width, height, stroke, strokeWidth, fill
   **/

   function Circle(){
   		this.svgType = "circle";
   		this.cxVal = "";
   		this.cyVal = "";

   	
   		this.widthVal = "";
		this.fillVal = "";

   		this.strokeVal = "";
   		this.strokeWidthVal = "";
   		
   }//end object Circle

	Circle.prototype = {

		cx: function(cx){
			//if no param get val else set val
			if(cx == null){
				return this.cxVal;
			}else{
				this.cxVal = cx;
			}//end if set or get 
			return this; //end function cx
		},

	
		cy: function(cy){
			//if no param get val else set val
			if(cy == null){
				return this.cyVal;
			}else{
				this.cyVal = cy;
			}//end if set or get 
			return this; //end function cy
		},

		center: function(x, y){
			//if no param get val else set val
			if( x == null || y == null){
				return [this.cxVal, this.cyVal];
			}else{
				this.cxVal = x;
				this.cyVal = y;
			}//end if set or get 
			return this; //end function center
		},

		width: function(w){
					//if no param get val else set val
					if(w == null){
						return this.widthVal;
					}else{
						this.widthVal = w;
					}//end if set or get 
					return this; //end function width
		},

		fill: function(f){
					//if no param get val else set val
					if(f == null){
						return this.fillVal;
					}else{
						this.fillVal = f;
					}//end if set or get 
					return this; //end function fill
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
			//circle draw
			var e = document.createElementNS(svgns, this.svgType );
			e.setAttributeNS(null, "stroke", this.strokeVal);
			e.setAttributeNS(null, "stroke-width", this.strokeWidthVal);
			e.setAttributeNS(null, "cx", this.cxVal);
			e.setAttributeNS(null, "cy", this.cyVal);
   			e.setAttributeNS(null, "r", this.widthVal/2);
   			e.setAttributeNS(null, "fill", this.fillVal);

			parent.appendChild(e);
			return this;
		} //end Circle method list


   }//end Circle protype
	Circle.prototype.constructor = Circle;


	//Square, Rectangle, and Circle all share the same
	//functions and properties
	//so... Inheritance

	//Rectangle Inherits Circle
   function Rectangle(){
   		Circle.call(this);
   		this.svgType = "rect";
   		this.heightVal = "";
   }//end function Rectangle

   Rectangle.prototype = new Circle();
   Rectangle.prototype.constructor = Rectangle;

   //Rects and Squares have Height too
   Rectangle.prototype.height = function(h){
   		//if no param get val else set val
		if(h == null){
			return this.heightVal;
		}else{
			this.heightVal = h;
		}//end if set or get 
		return this; //end function height	
   }//end function height

   Rectangle.prototype.draw = function(parent){

			//Rect draw
			var e = document.createElementNS(svgns, this.svgType );
			e.setAttributeNS(null, "stroke", this.strokeVal);
			e.setAttributeNS(null, "stroke-width", this.strokeWidthVal);
			//compute top left corner for rect
			var x = this.center()[0] - (this.widthVal/2);
			e.setAttributeNS(null, "x", x);
			var y = this.center()[1] - (this.heightVal/2);
			e.setAttributeNS(null, "y", y);
   			e.setAttributeNS(null, "width", this.widthVal);
   			e.setAttributeNS(null, "height", this.heightVal);
   			e.setAttributeNS(null, "fill", this.fillVal);

			parent.appendChild(e);	
			return this;	
   }//end function draw rect






   //Square Inherits Circle
   function Square(){
   		
   		Circle.call(this);
   		this.svgType = "rect";
   }//end function Square

   Square.prototype = new Rectangle();
   Square.prototype.constructor = Square;

   Square.prototype.draw = function(parent){

			//Rect draw
			var e = document.createElementNS(svgns, this.svgType );
			e.setAttributeNS(null, "stroke", this.strokeVal);
			e.setAttributeNS(null, "stroke-width", this.strokeWidthVal);
			//compute top left corner for square
			var x = this.center()[0] - (this.widthVal/2);
			e.setAttributeNS(null, "x", x);
			var y = this.center()[1] - (this.widthVal/2);
			e.setAttributeNS(null, "y", y);
   			e.setAttributeNS(null, "width", this.widthVal);
   			e.setAttributeNS(null, "height", this.widthVal);
   			e.setAttributeNS(null, "fill", this.fillVal);

			parent.appendChild(e);
			return this;
   }//end function draw square
  





function testCircle(){
	var dev = new Circle();
	dev.stroke("red").strokeWidth(2).cx(9).cy(14).fill("#123144");
	console.log(dev);
	console.log( "cx:" + dev.cx() );
	console.log( "cy:" + dev.cy() );
	console.log( "fill:" + dev.fill() );
	console.log( "stroke:" + dev.stroke() );
	console.log( "strokeWidth:" + dev.strokeWidth() );
	dev.center(12,50);
	console.log( "center:" + dev.center() );
	console.log( "cx:" + dev.cx() );
	console.log( "cy:" + dev.cy() );


}//end function test Cricle

//testCircle();



function testRectangle(){
	var dev = new Rectangle();
	dev.stroke("red").strokeWidth(4).cx(13).cy(7).fill("#fff333");
	console.log(dev);
	console.log( "cx:" + dev.cx() );
	console.log( "cy:" + dev.cy() );
	console.log( "fill:" + dev.fill() );
	console.log( "stroke:" + dev.stroke() );
	console.log( "strokeWidth:" + dev.strokeWidth() );
	dev.center(17,32);
	console.log( "center:" + dev.center() );
	console.log( "cx:" + dev.cx() );
	console.log( "cy:" + dev.cy() );


}//end function test Rectangle

//testRectangle();


function testSquare(){
	var dev = new Square();
	dev.stroke("red").strokeWidth(5).cx(17).cy(65).fill("#f47321");
	console.log(dev);
	console.log( "cx:" + dev.cx() );
	console.log( "cy:" + dev.cy() );
	console.log( "fill:" + dev.fill() );
	console.log( "stroke:" + dev.stroke() );
	console.log( "strokeWidth:" + dev.strokeWidth() );
	dev.center(4,22);
	console.log( "center:" + dev.center() );
	console.log( "cx:" + dev.cx() );
	console.log( "cy:" + dev.cy() );


}//end function test Square

//testSquare();









