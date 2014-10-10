//Tutorial gevolgd en naar mijn eigen stijl toegewerkt: https://www.youtube.com/watch?v=2S1AbEWX85o
 	function generateColor(d){
	if (d.incident == 1) { 
		return "rgb(255,94,0)"
	} else {
    	if (d.steps/200 > 100 && d.steps/200 < 150) { 
    		return "rgb("+0+","+Math.ceil((d.steps/200)*2+100)+","+Math.ceil((d.steps/200)*2)+100+")" 
    	} else { 
    		if (d.steps/200 > 50 && d.steps/200 < 100) { 
    			return "rgb("+0+","+Math.ceil((d.steps/200)*2+100)+","+Math.ceil((d.steps/200)*2+100)+")"
   			} else { 
   				if (d.steps/200 > 0 && d.steps/200 < 50) { 
   					return "rgb("+0+","+Math.ceil((d.steps/200)*2+100)+","+Math.ceil((d.steps/200)*2+100)+")" 
   				} else {
   					return false;
   				}
   			}
   		}
   	}

}


var width = 1075;
var height = 131;	
var bordercolor='red';	
var border=5;

//Bron: https://www.youtube.com/watch?v=SYuFy1j8SGs
//Bron: http://bl.ocks.org/d3noob/d8be922a10cb0b148cd5
//Bron: http://ryanfait.com/sticky-footer/
//Bron: http://www.d3noob.org/2012/12/setting-scales-domains-and-ranges-in.html
//Bron: Stuk over mouseover hulp van Vincent van den Boogaard gehad
//Bron: http://stackoverflow.com/questions/15573594/creating-a-border-around-your-d3-graph

// Parse the date / time
var parseDate = d3.time.format("%d-%m-%Y").parse;
var d_huidige_datum = d3.time.format("%d-%m-%Y").parse;		//Hulp van Vincent van den Boogaard

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis()
	.ticks(5)
	.scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%b"));

var yAxis = d3.svg.axis()
	.ticks(5)
	.scale(y)
    .orient("left")
 	// Get the data

d3.csv("stappenteller.csv", function(error, data) {
    data.forEach(function(d) {
    	d.huidige_datum = d.date
		d.date = parseDate(d.date)
		d.steps = +d.steps
    });

// Scale the range of the data
x.domain(d3.extent(data, function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.steps; })]);

 	var canvas = d3.select("section").append("svg")
 					.attr("width", width)
 					.attr("height", height)
 					.attr("class", canvas)
 					.append("g")
 					.attr("transform", "translate(0, 0)")
	
    // Add the X Axis
    canvas.append("g")
    	.attr("transform", "translate(0," + 200+ ")")
        .call(xAxis)
      	.attr("class", "x axis")
      	.style("fill", "#CCC");

    // Add the Y Axis
    canvas.append("g")
        .call(yAxis)
    	.attr("transform", "translate(0," + 69 + ")")          
        .attr("class", "y axis")
        .style("fill", "#CCC");

 	var bars = canvas.selectAll("rect")
 		.data(data)
 		.enter()
 			.append("rect")
 			.attr("height", function(d) { return d.steps /200; })
 			.attr("width", 4)
 			.attr("fill",  	function generateColor(d){
				if (d.incident == 1) { 
					return "rgb(255,94,0)"
				} else {
			    	if (d.steps/200 > 100 && d.steps/200 < 150) { 
			    		return "rgb("+0+","+Math.ceil((d.steps/200)*2+100)+","+Math.ceil((d.steps/200)*2)+100+")" 
			    	} else { 
			    		if (d.steps/200 > 50 && d.steps/200 < 100) { 
			    			return "rgb("+0+","+Math.ceil((d.steps/200)*2+100)+","+Math.ceil((d.steps/200)*2+100)+")"
			   			} else { 
			   				if (d.steps/200 > 0 && d.steps/200 < 50) { 
			   					return "rgb("+0+","+Math.ceil((d.steps/200)*2+100)+","+Math.ceil((d.steps/200)*2+100)+")" 
			   				} else {
			   					return false;
			   				}
			   			}
			   		}
			   	}

			})
 			.attr("x", function(d,i) { return i*5; })
 			.attr("y", function(d,i) { return 200-d.steps/200; })
 			.on("mouseenter", function(d,i){ 
				d3.select(this)
				.attr("fill", "white");
				$('.datum span').text(d.huidige_datum);
				$('.stappen span').text(d.steps);
					console.log(d.incident)
				if (d.incident == "1"){
					d3.select(this)
					.attr("fill", "red");
					$('.event').css("display","block").text(d.comment);

				}
			})
			.on('mouseleave', function(d, i){
				d3.select(this)
				.attr("fill", "white")
				.attr("fill", generateColor(d));
			});	
});
    
     	// Wat is hier fout	
 	// Bron: http://stackoverflow.com/questions/10805184/d3-show-data-on-mouseover-of-circle

/*
 	var format = d3.time.format("%Y-%m-%d");
					format.parse("d.date"); // Geeft een datum
					format(new Date("%d,%m,%Y")); // String gemaakt van datum

	var heightScale = d3.scale.linear()
						.domain([0, d3.max(data, function(d) { return d.steps; })])
						.range([0,width]);
	var widthScale = d3.scale.linear()
						.domain([0, d3.max(data, function(d) { return d.steps; })])
						.range([0,width]);

 	/*function color(d,i)	{
		    .attr("fill", function(d) {
		    	if (d.incident == 1) { return "black" }
		    	else {
		        	if (d.steps/200 > 100 && d.steps/200 < 150) { return "#E53C4E" }
		        	else { 
		        		if (d.steps/200 > 50 && d.steps/200 < 100) { return "#1EA137" }
		       			else { 
		       				if (d.steps/200 > 0 && d.steps/200 < 50) { return "#009BCC" }
		       				else {

		       	}}}}
		    	;})
		};*/
 	// Wat is hier fout	
 	// Bron: http://stackoverflow.com/questions/10805184/d3-show-data-on-mouseover-of-circle
	
	/*	 	.on("mouseover", function() {
		 	canvas.selectAll("rect")
				.data(data)
				.enter()
					.append("rect")
		   			.append("title")
		   			.attr("x", function(d) { return i*5; })
		   			.attr("y", function(d) { return 200-d.steps/200; })
		            .text(function(d) { return d.steps; }); })
});

/*
if (i=) {

	.attr("fill", "blue")
}

geefKleur(d,i){

	if(d.date)

	function geefKleur(d,i){
		if (d==1) {
			"#FFF"
		}
	}

	var color = d3.scale.linear()
			.range(["red", "blue"])

			.attr("fill", function(d) { return color(d) })
}*/
