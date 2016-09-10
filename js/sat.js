// A path for the graph.  
accGraph1 = new Path();
accGraph1.strokeColor = "red";
accGraph2 = new Path();
accGraph2.strokeColor = "yellow";
accGraph3 = new Path();
accGraph3.strokeColor = "green";
// Axes for the graph
var x1 = 10
var yscale = 10
var y1 = 80
var y1space = y1 + 15

for (var i = 0; i < app.graphnum; i++) {
    arrow(new Point(x1, y1 +i*y1space), new Point(x1, 0+i*y1space));
    arrow(new Point(x1, y1+i*y1space), new Point(x1 + 30 + app.numFrames, y1+i*y1space));
}


// Labels on the axes
// var costText = new PointText(new Point(x1-40, y1-105));
// costText.fontSize = 18;
// costText.content = "N";
// var epoch1LabelText = new PointText(new Point(x1+40+app.numFrames, y1+5));
// epoch1LabelText.fontSize = 18;
// epoch1LabelText.content = "Day";
// Marker for the current epoch
var epoch1Tick = new Path(new Point(x1, y1), new Point(x1, y1 + 5));
epoch1Tick.strokeColor = "white";
var epoch1Number = new PointText(new Point(x1, y1 + 17));
epoch1Number.fontSize = 14;
epoch1Number.justification = "center";
epoch1Number.strokeColor = "white";
// We group the epochTick and epochNumber, to make it easy to move
epoch1 = new Group([epoch1Tick, epoch1Number]);
// Initialize the dynamic elements.  It's convenient to do this in a
// function, so that function can also be called upon a (re)start of
// the widget.
//var weight, bias;
// app.initDynamicElements();

app.initDynamicElements = function () {
        epoch1.position.x = x1;
        epoch1Number.content = "0";

        y1 += app.graph * y1space; 
        epoch1.position.y = y1

        accGraph1 = new Path();
        accGraph1.strokeColor = "red";
        accGraph2 = new Path();
        accGraph2.strokeColor = "yellow";
        accGraph3 = new Path();
        accGraph3.strokeColor = "green";

        epoch1Tick.position.y = y1 + 5;
        epoch1Number.position.y = y1 + 17;


        //accGraph1.removeSegments();
        //accGraph2.removeSegments();
        //accGraph3.removeSegments();
    }
    // The run button
// var runBox = new Path.Rectangle(new Rectangle(430, 230, 60, 30), 5);
// runBox.fillColor = "#dddddd";
// var runText = new PointText(new Point(460, 250));
// runText.justification = "center";
// runText.fontSize = 18;
// runText.content = "Run";
// var runIcon = new Group([runBox, runText]);
// runIcon.onMouseEnter = function(event) {
//     runBox.fillColor = "#aaaaaa";
// }
// runIcon.onMouseLeave = function(event) {
//     runBox.fillColor = "#dddddd";
// }
app.playing = true;
// runIcon.onClick = function(event) {
//         app.initDynamicElements();
//         this.visible = false;
//         // weight = startingWeight;
//         // bias = startingBias;
//         playing = true;
//     }
//     // The actual procedure

app.n_morti_acc = 0
app.n_feriti_acc = 0
app.n_illesi_acc = 0
app.alpha = 0.1

function onFrame(event) {
    if (app.playing) {
        //a = 100;//sum accs
        //if (app.count % 2 === 0) {epoch1.position.x += .5;}
        epoch1.position.x =  x1 + (30 + app.numFrames)/app.numFrames * app.count;
        app.n_morti_acc = (app.alpha * app.n_morti) + (1.0 - app.alpha) * app.n_morti_acc
        app.n_feriti_acc = (app.alpha * app.n_feriti) + (1.0 - app.alpha) * app.n_feriti_acc
        app.n_illesi_acc = (app.alpha * app.n_illesi) + (1.0 - app.alpha) * app.n_illesi_acc
        accGraph1.add(new Point(epoch1.position.x, y1 - app.n_morti_acc*yscale));
        accGraph2.add(new Point(epoch1.position.x, y1 - app.n_feriti_acc*yscale));
        accGraph3.add(new Point(epoch1.position.x, y1 - app.n_illesi_acc*yscale));
        epoch1Number.content = app.count;
        //app.count += 1;
        if (app.count > app.numFrames) {
            app.count = 0;
            //runIcon.visible = true;
            app.initDynamicElements();
            app.playing = true;
        }
    }

}



function arrow(point1, point2, width, color) {
    if (typeof width === 'undefined') {
        width = 1
    };
    if (typeof color === 'undefined') {
        color = 'white'
    };
    delta = point1 - point2;
    n = delta / delta.length;
    nperp = new Point(-n.y, n.x);
    line = new Path(point1, point2);
    line.strokeColor = color;
    line.strokeWidth = width;
    arrow_stroke_1 = new Path(point2, point2 + (n + nperp) * 6);
    arrow_stroke_1.strokeWidth = width;
    arrow_stroke_1.strokeColor = color;
    arrow_stroke_2 = new Path(point2, point2 + (n - nperp) * 6);
    arrow_stroke_2.strokeWidth = width;
    arrow_stroke_2.strokeColor = color;
}