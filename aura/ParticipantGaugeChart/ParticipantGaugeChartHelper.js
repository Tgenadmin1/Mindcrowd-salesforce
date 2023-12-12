({
    setChartData: function (component) { 

        //  console.log('in helper'+component);
        var gaugeColor = component.get("v.gaugeColor");
        console.log('gaugeSize-->'+component.get("v.gaugeSize"));	
        //console.log('isPercentage-->' + component.get("v.isPercentage"));
        //console.log('highAverage-->'+component.get("v.highAverage"));	
        function Gauge(placeholderName, configuration) {
            //   console.log('in function')
            this.placeholderName = placeholderName;

            var self = this; // for internal d3 functions

            this.configure = function (configuration) {
                this.config = configuration;

                this.config.size = this.config.size * 0.9;

                this.config.raduis = this.config.size * 0.85 / 2;
                this.config.cx = this.config.size / 2;
                this.config.cy = this.config.size / 2;



                this.config.min = undefined != configuration.min ? configuration.min : 0;
                this.config.max = undefined != configuration.max ? configuration.max : 100;
                this.config.range = this.config.max - this.config.min;

                var range = 5;
                if (this.config.max == 2)
                    range = 3;
                if (this.config.max == 3)
                    range = 4;
                //pointerHeadLength = Math.round(range * config.pointerHeadLengthPercent);
                this.config.majorTicks = configuration.majorTicks || 5;

                // this.config.minorTicks = configuration.minorTicks || '2';

                //console.log("configuration.greenColor" +configuration.greenColor);


                this.config.greenColor = configuration.greenColor || gaugeColor.length > 1 ? gaugeColor[0] : gaugeColor[0];
                this.config.yellowColor = configuration.yellowColor || gaugeColor.length > 1 ? gaugeColor[1] : gaugeColor[0];
                this.config.redColor = configuration.redColor || gaugeColor.length > 1 ? gaugeColor[2] : gaugeColor[0];
                this.config.blueColor = configuration.blueColor || "#0267b7";


                this.config.transitionDuration = configuration.transitionDuration || 5000;
            }

            this.render = function () {
                this.body = d3.select(this.placeholderName)
                    .append("svg:svg")
                     .attr("class", "gauge")
                     .attr("width", this.config.size)
                     .attr("height", graphHeight)
                     .attr('stroke', '#b0a270')
                     .style("stroke-width", "1px");

                    // .attr("class", "gauge")
                    // .attr("width", this.config.size)
                    // .attr("height", graphHeight)
                    // .attr('stroke', '#b0a270')
                    // .style("stroke-width", "1px");



// .attr("width", '100%')
//     .attr("height", '100%')
//     .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
//     .attr('preserveAspectRatio','xMinYMin')
//     .append("g")
//     .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");




                //.attr('fill', '#69b3a2');
                /*       this.body = d3.select(this.placeholderName)
                .append("svg:svg")
                .attr("class", "gauge")
                .attr("width", this.config.size)
                .attr("height", 250);//this.config.size
                
              
          
                
        this.body.append("svg:circle")
          .attr("cx", this.config.cx)
            .attr("cy", this.config.cy)
            .attr("r", this.config.raduis)
            .style("fill", "#ccc")
            .style("stroke", "Red")
            .style("stroke-width", "0.5px");
          
        this.body.append("svg:circle")
            .attr("cx", this.config.cx)
            .attr("cy", this.config.cy)
            .attr("r", 0.9 * this.config.raduis)
            .style("fill", "#fff")
            .style("stroke", "#e0e0e0")
            .style("stroke-width", "2px");
        */
                for (var index in this.config.greenZones) {
                    this.drawBand(this.config.greenZones[index].from, this.config.greenZones[index].to, self.config.greenColor);

                }

                for (var index in this.config.yellowZones) {
                    this.drawBand(this.config.yellowZones[index].from, this.config.yellowZones[index].to, self.config.yellowColor);
                }

                for (var index in this.config.redZones) {
                    this.drawBand(this.config.redZones[index].from, this.config.redZones[index].to, self.config.redColor);
                }
                for (var index in this.config.blueZones) {
                    this.drawBand(this.config.blueZones[index].from, this.config.blueZones[index].to, self.config.blueColor);
                }
               var yPos = 140;

               if (window.innerWidth < 1000) {
                yPos = 330;
            }
                //alert(window.innerWidth)
                if (window.innerWidth < 416) {
                    yPos = 180;
                }
                if (window.innerWidth < 321) {
                    yPos = 150;
                }
                if (undefined != this.config.label) {
                    var fontSize = Math.round(this.config.size / 9);
                    this.body.append("svg:text")
                        .attr("x", this.config.cx)
                        //.attr("y", yPos)//this.config.cy / 2 + fontSize / 2)
                        .attr("y", this.config.cy + 80  )

                        .attr("dy", fontSize / 2)
                        .attr("text-anchor", "middle")
                        .text(this.config.label)
                        .attr('class', 'graph-label')
                        //.style("font-size", fontSize/2 + "px")
                        .style("font-size", "24x")
                        .style("font-weight", "600")
                        .style("fill", "#333")
                        .style("stroke-width", "0px");
                }

                var fontSize = Math.round(this.config.size / 15);
                var majorDelta = this.config.range / (this.config.majorTicks - 1);
                for (var major = this.config.min; major <= this.config.max; major += majorDelta) {
                    var minorDelta = majorDelta / this.config.minorTicks;
                    for (var minor = major + minorDelta; minor < Math.min(major + majorDelta, this.config.max); minor += minorDelta) {
                        var point1 = this.valueToPoint(minor, 0.85);
                        var point2 = this.valueToPoint(minor, 0.95);

                        this.body.append("svg:line")
                            .attr("x1", point1.x)
                            .attr("y1", point1.y)
                            .attr("x2", point2.x)
                            .attr("y2", point2.y)

                            .style("stroke", "#666")
                            .style("stroke-width", "1px");


                            

                    }

                    var point1 = this.valueToPoint(major, 0.80);
                    var point2 = this.valueToPoint(major, 0.95);

                    this.body.append("svg:line")
                        .attr("x1", point1.x)
                        .attr("y1", point1.y)
                        .attr("x2", point2.x)
                        .attr("y2", point2.y)

                        .style("stroke", "#333")
                        .style("stroke-width", "2px");

                    //if (major == this.config.min || major == this.config.max) {
                    if ((minorDelta * this.config.minorTicks) % majorDelta == 0) {
                        var point = this.valueToPoint(major, 1.1);
                       //var point = this.valueToPoint(major, 0.63);


                        this.body.append("svg:text")
                            .attr("x", ((component.get("v.isPercentage")) ? point.x - 12 : point.x - 8))
                            .attr("y", point.y - 8)
                            .attr("dy", fontSize / 3)
                            .attr("offset-r", 0)
                            .text(parseFloat(major, 12) + ((component.get("v.isPercentage")) ? "%" : ""))
                            .style("font-size", (18) + "px")
                            .style("fill", "#000")
                            .style("font-weight", "600")
                            .style("text-align", "center")
                            .style("stroke-width", "0px");

                         }


                }
                var pointerContainer = this.body.append("svg:g").attr("class", "pointerContainer");

                var midValue = (this.config.min + this.config.max) / 2;

                var pointerPath = this.buildPointerPath(midValue);

                var pointerLine = d3.line()
                    .x(function (d) {
                        return d.x
                    })
                    .y(function (d) {
                        return d.y
                    });
                //.interpolate("basis");

                pointerContainer.selectAll("path")
                    .data([pointerPath])
                    .enter()
                    .append("svg:path")
                    .attr("d", pointerLine)
                    .style("fill", "#12233e")
                    .style("stroke", "#12233e")
                    .style("fill-opacity", 0.9)

                pointerContainer.append("svg:circle")
                    .attr("cx", this.config.cx)
                    .attr("cy", this.config.cy)
                    .attr("r", 0.06 * this.config.raduis)
                    .style("fill", "#12233e")
                    .style("stroke", "#12233e")
                    .style("opacity", 1);

                var fontSize = Math.round(this.config.size / 10);
                pointerContainer.selectAll("text")
                    .data([midValue])
                    .enter()
                    .append("svg:text")
                    .attr("x", this.config.cx)
                    // .attr("y", this.config.size - this.config.cy /1.6 - fontSize)
                    .attr("y", this.config.cy + 30)
                    .attr("dy", fontSize / 2)
                    .attr("text-anchor", "middle")
                    .style("font-size", (22) + "px")
                    .style("font-weight", "600")
                    .style("fill", "#12233e")
                    .style("stroke-width", "0px");

                this.redraw(this.config.min, 0);
            }

            this.buildPointerPath = function (value) {
                var delta = this.config.range / 13;

                var head = valueToPoint(value, 0.85);
                var head1 = valueToPoint(value - delta, 0.12);
                var head2 = valueToPoint(value + delta, 0.12);

                var tailValue = value - (this.config.range * (1 / (180 / 360)) / 2);
                var tail = valueToPoint(tailValue, 0.10);
                var tail1 = valueToPoint(tailValue - delta, 0.13);
                var tail2 = valueToPoint(tailValue + delta, 0.13);

                return [head, head1, tail2, tail, tail1, head2, head];

                function valueToPoint(value, factor) {
                    var point = self.valueToPoint(value, factor);
                    point.x -= self.config.cx;
                    point.y -= self.config.cy;
                    return point;
                }
            }

            this.drawBand = function (start, end, color) {
                if (0 >= end - start || (!start && start !== 0) || !end) return;

                this.body.append("svg:path")
                    .style("fill", color)
                    .attr("d", d3.arc()
                        .startAngle(this.valueToRadians(start))
                        .endAngle(this.valueToRadians(end))
                        .innerRadius(0.65 * this.config.raduis)
                        .outerRadius(0.95 * this.config.raduis))


                    .attr("transform", function () {
                        return "translate(" + self.config.cx + ", " + self.config.cy + ") rotate(270)"
                    });
            }

            this.redraw = function (value, transitionDuration, unit = "") {
                var pointerContainer = this.body.select(".pointerContainer");
                //value = value +" % ";
                pointerContainer.selectAll("text").text(Math.round(value) + unit + ((component.get("v.isPercentage")) ? "%" : ""));

                var pointer = pointerContainer.selectAll("path");
                pointer.transition()
                    .duration(undefined != transitionDuration ? transitionDuration : this.config.transitionDuration)
                    //.delay(0)
                    //.ease("linear")
                    //.attr("transform", function(d) 
                    .attrTween("transform", function () {
                        var pointerValue = value;
                        if (value > self.config.max) pointerValue = self.config.max + 0.06 * self.config.range;
                        else if (value < self.config.min) pointerValue = self.config.min - 0.06 * self.config.range;
                        var targetRotation = (self.valueToDegrees(pointerValue) - 90);
                        var currentRotation = self._currentRotation || targetRotation;
                        self._currentRotation = targetRotation;

                        return function (step) {
                            var rotation = currentRotation + (targetRotation - currentRotation) * step;
                            return "translate(" + self.config.cx + ", " + self.config.cy + ") rotate(" + rotation + ")";
                        }
                    });
            }

            this.valueToDegrees = function (value) {
                // thanks @closealert
                //return value / this.config.range * 270 - 45;
                return value / this.config.range * 180 - (this.config.min / this.config.range * 180);

            }

            this.valueToRadians = function (value) {
                return this.valueToDegrees(value) * Math.PI / 180;
            }

            this.valueToPoint = function (value, factor) {
                return {
                    x: this.config.cx - this.config.raduis * factor * Math.cos(this.valueToRadians(value)),
                    y: this.config.cy - this.config.raduis * factor * Math.sin(this.valueToRadians(value))
                };
            }

            // initialization
            this.configure(configuration);
        }

        //create gauge
        var breakPoint = component.get('v.breakPoint');
        var minValue = component.get("v.minValue");
        var maxValue = component.get("v.maxValue");
         var graphWidth = component.find("powergauge").getElement().getBoundingClientRect().width ;
         var graphHeight = component.find("powergauge").getElement().getBoundingClientRect().width / 1.7;
        
        // setTimeout(function(){
        //      graphWidth = component.find("powergauge").getElement().getBoundingClientRect().width ;
        //      graphHeight = component.find("powergauge").getElement().getBoundingClientRect().width / 1.7;
        // },1000)

       var intervalTime = setInterval(function () {
            //console.log('sssssssssssss', component.find("powergauge").getElement().getBoundingClientRect().width );
        
            if(component.find("powergauge").getElement().getBoundingClientRect().width > 150){
                graphWidth = component.find("powergauge").getElement().getBoundingClientRect().width ;
                 graphHeight = component.find("powergauge").getElement().getBoundingClientRect().width / 1.7;



                 var config =
                 {
                     size: graphWidth,
                     label: component.get('v.chartLabel'),
                     min: minValue,
                     max: maxValue,
                     minorTicks: 3
                 }
         
         
                 var range = maxValue - minValue;
                 //var range = 10;
                 var lowAverage = component.get("v.lowAverage");
                 var highAverage = component.get("v.highAverage");
                 // var actHighValue=lowAverage+highAverage;
                 config.redZones = [{ from: minValue, to: component.get("v.lowAverage") }];
                 config.yellowZones = [{ from: component.get("v.lowAverage"), to: component.get("v.highAverage") }];
                 config.greenZones = [{ from: component.get("v.highAverage"), to: maxValue }];
                 if (breakPoint > maxValue) {
                     config.blueZones = [{ from: maxValue, to: breakPoint }];
                     config.max = breakPoint;
                 }
                 // console.log(JSON.stringify(config));
                 window.gaugeChart = new Gauge(component.find("powergauge").getElement(), config);
                 window.gaugeChart.render();
                 window.gaugeChart.redraw(breakPoint);




                clearInterval(intervalTime);
            }
        }, 1000);

        //clearInterval(intervalTime);

        //gauge powergauge
      //  console.log('sssssssssssss= ',  component.find("powergauge").getElement().getBoundingClientRect().width)





        // if(component.get("v.gaugeSize") == 40){
        //      graphWidth = 450;
        // }else{
        //      graphWidth = 250;
        // }
		//component.get("v.gaugeSize"));


        // var breakPoint = 70;
        //var minValue   = 0;
        // var maxValue   = 100;
        //var chartLabel = cmp.get("v.chartLabel");
        //console.log('window width = ', window.outerWidth);


        // window.addEventListener("resize", function () {
        //     if (window.innerWidth < 1367) {
        //         graphWidth = 250;
        //         console.log('graphWidth=', graphWidth);
        //     }

        //     if (window.innerWidth < 320) {
        //         graphWidth = 200;
        //         console.log('graphWidth=', graphWidth);
        //     }

        // });
        // if (window.innerWidth < 1367) {
        //     graphWidth = 250;

        // }
        // if (window.innerWidth < 821) {
        //     graphWidth = 350;
        //     graphHeight = 285;

        // }
        // if (window.innerWidth < 415) {
        //     graphWidth = 250;
        //     graphHeight = 210;

        // }
        // if (window.innerWidth < 321) {
        //     graphWidth = 200;
        //     graphHeight = 180;

        // }
        // window.resizeBy() {
        //     if(window.outerWidth < 1366){
        //         graphWidth = 270;
        //         console.log('graphWidth=', graphWidth);
        //    }
        // }



        
    }
})