

//This is the play Fair Data Example




var svg = document.getElementById('container');


//this is the charts frame of reference generated from data stats
//compute the max and min of population and diameter
// and count numItems of the playfair data
//this function is worth 1N
// and in larger data sets should be precomputed by the server
function compFrame(arr){
	var maxPopulationVal=0;
	var minPopulationVal=1000;
	var maxDiameterVal=0;
	var minDiameterVal=1000;
	var numItemsVal=0;
	var totalDiameterVal=0;
	$(arr).each(function(){
		numItemsVal++;
		totalDiameterVal += this.diameter;

		//change all the Diameter data to floats
		this.diameter = parseFloat(this.diameter);
		if(this.diameter > maxDiameterVal){
			maxDiameterVal = this.diameter;
		}
		if(this.diameter < minDiameterVal){
			minDiameterVal = this.diameter;
		}

		//change all the Population data to ints
		this.population = parseInt(this.population);
		if(this.population > maxPopulationVal){
			maxPopulationVal = this.population;
		}
		if(this.population < minPopulationVal){
			minPopulationVal = this.population;
		}





	});
	return {
			maxPopulation: maxPopulationVal,
			minPopulation: minPopulationVal,
			maxDiameter: maxDiameterVal,
			minDiameter: minDiameterVal,
			numItems:numItemsVal,
			totalDiameter: totalDiameterVal
		 };
	

	
}//end compute max min


function playFair(){

	var frame = compFrame(playfair);

	//So the model that "jumps out at me"
	//from the data is a bar graph
	//the width of each bar is the city diameter
	//the height of each bar is the city population 	

	
	// to chart the population some napkin math gives us
	//  Chart max y = 600 (padding)
	// 580 - (-min + data ) 

	//lets also scale the y to take up more space
	//  (580 - 10) / max - min = scale constant
	var scaleY = (570) / ( frame.maxPopulation - frame.minPopulation);
	

	//the diameter is the width of the bar
	// total width = 800 
	//each city gets x space to the right of it
	var space = 5;

	//we need a width scalar to figure out based upon the 
	//remaining total width - space determines how much diameter = bar width
	//so... (totalWidth -(numitems*space)) / total diameter
	var scaleBarWidth = (780 - (frame.numItems * space) ) / frame.totalDiameter;
	
	
	
	//now lets construct our chart
	//x offset is the right bottom corner of the previous bar
	var xOffset = 0;
	//this is for an axis scale color code
	var minBarWidth = frame.minDiameter * scaleBarWidth;
	//color code flag
	var greenFlag = true;
	

	//we cycle through each N again here
	$(playfair).each(function(index){

		var barWidth = this.diameter * scaleBarWidth;
		var barHeight = ( scaleY * (this.population - frame.minPopulation) + 10);


		//now x and y refer to cx and cy so we have to calculate that
		//y will be the chart scaled population / 2 + -580 to inverse y
		var y = 580 - (barHeight/2);
		//x will be the offset + (scaled diameter / 2) + space 
		var x = xOffset +  (barWidth/2) + space;

		
		//draw the bars
			 var barX =  new Rectangle()
			.width(barWidth)
			.height(barHeight)
			.center(x,y)
			.fill("red")
			.draw(svg);


			var diameterLine = new Line()
			.strokeWidth(5)			
			.x1(xOffset + space)
			.y1(595)
			.x2(xOffset + space)
			.y2(595);

			
			//this loop will draw as  many minDiameter bars
			//as will fit underneath the current bar 
			//this is adds a few cycles to each N
			while(barWidth >= minBarWidth){
				if(greenFlag){
					diameterLine.stroke("green");
					greenFlag = false;
				}else{
					diameterLine.stroke("yellow");
					greenFlag = true;
				}//end if else yellow or green
				var newX1 = diameterLine.x2();
				var newX2 = diameterLine.x2() + minBarWidth;
				diameterLine
				.x1(newX1)
				.x2(newX2)
				.draw(svg);

				xOffset +=minBarWidth;

				barWidth -= minBarWidth;
			}//end while

			//any left over diameter will be in black
			if(barWidth > 0){
				newX1 = diameterLine.x2();
				newX2 = diameterLine.x2() + barWidth;
				diameterLine
				.x1(newX1)
				.x2(newX2)
				.stroke("orange")
				.draw(svg);

			}//end if leftover
			


		
		//calc new x Offset
		xOffset += barWidth + space;	
	});//end each

	

	
}//end function playfair




















var hoverBar = null;

$(document).ready( function(){
	//calc and draw
	playFair();

	//lets add a mouse event for displaying city data on bar hover

	$('svg rect').mouseenter(function(){
		//which rect was it?
		 hoverBar = $('svg rect').index(this);
		var city = playfair[hoverBar].city;
		var diameter = playfair[hoverBar].diameter;
		var population = playfair[hoverBar].population;
		

		$('#city_data').html(
			city + " - Pop: " + population + 
			" Diameter: " + diameter);
		
		$(this).attr('style', "fill:blue");

	});//end mouse enter


 	$('svg rect').mouseleave(function(){
 		$('#city_data').html("Cities by Population and Diameter");
 		$(this).attr('style', "fill:red");
 	});//end mouse exit



});//end doc ready


