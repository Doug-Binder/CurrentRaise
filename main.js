
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

var x;
var data =
			{
			total:1000000,
			bars: [
				{name: 'commit', value: 800000},
			    {name: 'reserved_lim', value: 200000},
				{name: 'reserved_no_lim', value: 700000}
			]
		}

function init(){
var width = 250,
    barHeight = 20;
var padding = width/12;
var x = d3.scale.linear()
    .range([0, width]);

var leftEdge = 90;
var chart = d3.select(".chart")
    .attr("width", width*2)
    .attr("height", function(){
    	return (barHeight * data.bars.length + (2 * padding));
    })


 $(function() {
	  x.domain([0, d3.max(data.bars, function(d) { return d.value; })]);

	  var rule_lines = chart.selectAll(".rule_line")
	  		.data(data.bars)
	  		.enter()
	  		.append('g')
	  		.attr('class', "rule_line")
	  		.attr("transform", function(d, i) {
	      	var name = d.name
	       return "translate("+ leftEdge +"," + i * barHeight + ")"; });


	 rule_lines.append('line')
	  		.attr("x1", 0)
	  		.attr("y1", function(d,i){
	  				 return  (barHeight/2);
	  		})
	  		.attr("x2", function(){
	  			return x(data.total)
	  		})
	  		.attr("y2", function(d,i){
	  			return (barHeight/2);
	  		})

	 rule_lines.append('line')
	  		.attr('x1', function(d,i){
	  			return x(data.total) - 1;
	  		})
	  		.attr('y1', function (d,i){
	  			return  1
	  		})
	  		.attr('x2', function(){
	  			return  x(data.total) -1;
	  		})
	  		.attr("y2", function(d,i){
	  			return  barHeight-1;
	  		})
	   rule_lines.append('text')
	   	  .attr('class','graph-label')
	   	  .attr("x", function(d) { return -2; })
	      .attr("y", barHeight / 2)
	      .attr("dy", ".25em")
	      .text(function(d, i) {
	      	if (i == 0){
	      		return "FUNDED";
	      }	if (i == 1){
	      		return "AVAILABLE";
	      }	if (i == 2){
	      		return "INTEREST";
	      }
		});


	  var bar = chart.selectAll(".bar")
	      .data(data.bars)
	    .enter().append("g")
	      .attr("class","bar")
	      .attr("transform", function(d, i) {
	      	var name = d.name
	       return "translate("+ (leftEdge + translate(name, data.bars))+"," + i * barHeight + ")"; });



	  bar.append("rect")
	  	  //.attr("transform", function(d,i) {return "translate(" +  +","+0+")"})
	      .attr("width", function(d) { return x(d.value); })
	      .attr("height", barHeight - 2)
	      .style("fill", function(d,i){
	      	if (i == 0){
	      		return "green";
	      }	if (i == 1){
	      		return "yellow";
	      }	if (i == 2){
	      		return "blue";
	      }
		});


	  bar.append("text")
	  	  .attr('class', function(d,i){
	  	  	if (i == 0) return "funded-label"
	  	  })
	      .attr("x", function(d, i) {
	      	if (i == 0) return 3
	      		else return -3;

	       })
	      .attr("y", barHeight / 2)
	      .attr("dy", ".35em")
	      .text(function(d) { return '$' + d.value; });
});

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}

function translate(n, data){
		if (n === "reserved_lim" || n === "reserved_no_lim"){
			return x(data[0].value)
		} return 0;
	}
}

