
var width,
	height,
	Temperature,
	arc,
	svg,
	meter,
	forground,
	text,
	formatPercent,
	lineFunction;
var lineData = [];
var  twoPi = 2 * Math.PI;


function createLineData(){
lineData = [];
	for (var i = 0; i < Temperature*2; i++){

		var angle = i/45+2.14;
		if (angle > (1.07 + twoPi)){
			angle = (1.07 + twoPi);
		}

		var x1 =  180 * Math.cos(angle);
		var y1 =  180 * Math.sin(angle);
		var x2 = 210 * Math.cos(angle);
		var y2 = 210 * Math.sin(angle);

	    lineData.push({'x1' :x1,  'y1': y1,'x2':x2, "y2" :  y2});

	}
}



function createBackgroundLines(){

lineData = [];
	for (var i = 0; i < 116*2; i++){

		var angle = i/45+2.14;
		if (angle > (1.07 + twoPi)){
			angle = (1.07 + twoPi);
		}

		var x1 =  180 * Math.cos(angle);
		var y1 =  180 * Math.sin(angle);
		var x2 = 200 * Math.cos(angle);
		var y2 = 200 * Math.sin(angle);

	    lineData.push({'x1' :x1,  'y1': y1,'x2':x2, "y2" :  y2});

	}

svg.selectAll('.foreground').data(lineData)
				.enter()
				.append('line')
				.attr("class","tick_unused")
				.attr('x1' , function(d){return d.x1;})
				.attr('y1' , function(d){return d.y1;})
				.attr('x2' , function(d){return d.x2;})
				.attr('y2' , function(d){return d.y2;});
				


}





function init(){
	Temperature = 85; 
	width = 960;
    height = 500;

    progress = 0;
var total = 1308573; // must be hard-coded if server doesn't report Content-Length
    formatPercent = d3.format(".0%");

lineFunction = d3.svg.line()


arc = d3.svg.arc()
    .startAngle(0)
    .innerRadius(180)
    .outerRadius(240);

svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

meter = svg.append("g")
    .attr("class", "progress-meter");

meter.append("path")
    .attr("class", "background")
    .attr("d", arc.endAngle(twoPi));

text = meter.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", ".35em");


createBackgroundLines();

createLineData();
drawLine();
svg.append('text')
		.text(Temperature)
		.attr('text-anchor', 'middle')
		.attr("font-family", "sans-serif")
        .attr("font-size", "100px")
        .attr("fill", "white")
        .attr("y", '30')
        .attr("x","4")

drawBubbles();
$(body).on("keypress", function(e){


	
})
}





function drawBubbles(){


	var bubble_data=[ {"cx": 4, "cy": 199, "r":8},
					  {"cx": 15, "cy": 186, "r":6},
					  {"cx": 3, "cy": 175, "r":7},
					  {"cx": 13, "cy": 163, "r":5} ]
	
	svg.selectAll('.bubble').data(bubble_data).enter().append('circle')

												.attr("class", "bubble")
												.attr("cx",function(d){
																		return d.cx;
																		})
												.attr("cy",function(d){
																		return d.cy;
																		})
												.attr("r",function(d){
																		return d.r;
																		})
												





}

function mycallback(index){



if (index < lineData.length){

console.log(svg.select('.tick_curr_temp[index="'+index+ '"]').length)
	svg.select('.tick_curr_temp[index="'+index+ '"]')
				.transition()

				.duration(function(){
					return index*10 + 1000;
				}).ease("elastic")
				.attr('x2' , lineData[index]["x2"])
				.attr('y2' , lineData[index]["y2"])
				.each("start",function(){
					mycallback(index+1);
				});
	}
}

function changetemp(){
}

function drawLine(){

svg.selectAll('.foreground').data(lineData, function(d){return  "" + d.x1 + '_' + d.x2;;})
				.enter()
				.append('line')

				.attr("class","tick_curr_temp")
				.attr('index', function(d,i){return i;})
				.attr('x1' , function(d){return d.x1;})
				.attr('y1' , function(d){return d.y1;})
				.attr('x2' , function(d){return d.x1;})
				.attr('y2' , function(d){return d.y1;})

mycallback(0);



}