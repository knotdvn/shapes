var svg = document.getElementById('container');

//this is the charts frame of reference generated from data stats
//compute the max and min and count numItems of the co2 data
//this function is worth 1N
// and in larger data sets should be precomputed by the server
function compFrame(arr){
	var maxVal=0;
	var minVal=1000;
	var numItemsVal=0;
	$(arr).each(function(){
		numItemsVal++;
		//change all the level data to floats
		this.level = parseFloat(this.level);
		if(this.level > maxVal){
			maxVal = this.level;
		}
		if(this.level < minVal){
			minVal = this.level;
		}
	});
	return {
			max: maxVal,
			min: minVal,
			numItems:numItemsVal
		 };
	

	
}//end compute max min


$(document).ready( function(){

 	var frame = compFrame(co2);
 	

	
	// to chart the level some napkin math gives us
	//  Chart max y = 600 (padding)
	// 580 - (-min + data ) 

	//lets also scale the y to take up more space
	//  (580 - 10) / max - min = scale constant
	var scaleY = (570) / ( frame.max - frame.min);


	//the date is regular so
	// width = 800
	//each item is (780 / numItems) apart
	var space =  Math.floor( (780 / frame.numItems) );
	
	//now lets construct our chart
	var lastDot = false;
	$(co2).each(function(index){
		
		var y = 580 -( scaleY * (this.level - frame.min) + 10);
		var x = space * ( index + 1 ); 

		
		if(lastDot !=false){
			var nowDot =  new Circle()
			.width(space/2)
			.center(x,y)
			.fill("red")
			.draw(svg);
			
			var line = new Line()
			.x1(lastDot.cx())
			.y1(lastDot.cy())
			.x2(nowDot.cx())
			.y2(nowDot.cy())
			.strokeWidth(1)
			.stroke('green')
			.draw(svg);


			lastDot = nowDot;
		}else{
			//first

			lastDot = new Circle()
			.width(space/2)
			.center(x,y)
			.fill("blue")
			.draw(svg);

		}//end if else or first


		//for every 4 years lets draw the year
		if( index % 22 == 0){
			var txt = this.date.substring(0,4);
			var t = new Text()
			.y(600)
			.x(x)
			.text(txt)
			.draw(svg);
		}


	});//end each

	//draw min and max
	var minText = new Text()
	.y(580)
	.x(0)
	.text(frame.min)
	.draw(svg);

	var maxText = new Text()
	.y(10)
	.x(0)
	.text(frame.max)
	.draw(svg);

	//always label your charts

	var label = new Text()
	.x(200)
	.y(100)
	.text("Upwards Trend in CO2 Levels")
	.draw(svg);



});//end doc ready