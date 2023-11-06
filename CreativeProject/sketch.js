// Reference of individual task's idea - example in week12.lec

let artwork = []; // An array to hold artwork objects
let curve_40 = []; // An array for a specific type of curve
let curve_25 = []; // An array for another type of curve
let canvasWidth = 550; // Initial canvas width
let canvasHeight = 550; // Initial canvas height
let lineSlope = 0.8; // Line slope
let circleRadius = 75; // Circle radius
let spacing = 10; // Spacing between circles

// Set up a timer-based animation
setInterval(timerAni, 40);

let aniAngle = 0; // Animation angle in degrees
let aniRadians = 0; // Animation angle in radians
let rotateCurveFlag = false; // Flag for rotating curves

// Timer function for animation
//Reference - week5.tut.2-setInterval(): automate a periodic task
function timerAni() {
  aniAngle = aniAngle + 1; // Increment the animation angle
  aniAngle = aniAngle % 360; // Keep the angle within 0-359 degrees
  aniRadians = radians(aniAngle); // Convert the angle to radians
  console.log("updating");
}

// Event handler for mouseover
//Reference - week5.lec.1.2-mouseover
function overAni() {
  console.log("updating");
  rotateCurveFlag = !rotateCurveFlag; // Toggle the flag to rotate curves
}

// Event handler for click
//Reference - week5.lec.1.2-click
function clickAni() {
  for (let i = 0; i < artwork.length; i++) {
    // Check if the mouse is over a circle and re-generate it
    if (dist(mouseX, mouseY, artwork[i].x, artwork[i].y) < circleRadius) {
      artwork[i].generate();
    }
  }
}

function setup() {
  ca = createCanvas(windowWidth, windowHeight);
  canvas = select("canvas");
  canvas.elt.addEventListener("mouseover", overAni); // Add mouseover event listener
  canvas.elt.addEventListener("click", clickAni); // Add click event listener
  canvasWidth = width;
  canvasWidth = height; // Assign canvas dimensions (Note: There's a typo here, should be canvasHeight = height)
  background(60, 80, 110); // Set initial background color
  initArtworkData(); // Initialize artwork data
}

function draw() {
  background(60, 80, 110, 20); // Add a slightly transparent background
  for (let i = 0; i < artwork.length; i++) {
    artwork[i].display(); // Display each artwork object
  }
}

// Artwork class definition
class Artwork {
  constructor(x, y, circleBackgroundColor, shapeColor) {
    this.x = x;
    this.y = y;
    this.circleBackgroundColor = circleBackgroundColor;
    this.shapeColor = shapeColor;
    // Initialize various properties for the artwork
    this.circleIntype1 = random(1) > 0.5;
    this.dotsIntype1 = random(1) > 0.5;
    this.dotsIntype2 = random(1) > 0.5;
    this.Ringype1 = !this.dotsIntype2;
    this.ZipLineType1 = !this.dotsIntype1;
    this.ZipLineType2 = !this.dotsIntype2;
    this.curveType1 = random(1) > 0.35;
    this.lineType1 = this.curveType1 == false && random(1) > 0.25;
    this.angle = random(TWO_PI);
  }

  generate() {
    this.circleBackgroundColor = color(random(255), random(255), random(255));
    let randomOutColor2 = color(random(255), random(255), random(255));
    let randomMidColor = color(random(255), random(255), random(255));
    this.shapeColor = { Out: randomOutColor2, Mid: randomMidColor };
    this.circleIntype1 = random(1) > 0.5;
    this.dotsIntype1 = random(1) > 0.5;
    this.dotsIntype2 = random(1) > 0.5;
    this.Ringype1 = !this.dotsIntype2;
    this.ZipLineType1 = !this.dotsIntype1;
    this.ZipLineType2 = !this.dotsIntype2;
    this.curveType1 = random(1) > 0.35;
    this.lineType1 = this.curveType1 == false && random(1) > 0.25;
    this.angle = random(TWO_PI);
  }

  display() {
    this.drawCircle(this.x, this.y);
    this.drawDotsIn(this.x, this.y);
    this.drawRings(this.x, this.y);
    this.drawZipLine(this.x, this.y);
    this.drawHexagons(this.x, this.y);
    this.drawSmoothCurve(this.x, this.y);
    this.drawStraightLine(this.x, this.y);
  }

  drawCircle(x, y) {
    // Draw a series of circles with different colors
    fill(this.circleBackgroundColor);
    noStroke();
    ellipse(x, y, 150, 150);
    fill(181, 77, 162);
    ellipse(x, y, 85, 85);
    fill(71, 83, 63);
    ellipse(x, y, 45, 45);
    fill(0);
    ellipse(x, y, 25, 25);
    if (this.circleIntype1) {
      fill(34, 151, 66);
      ellipse(x, y, 17, 17);
    } else {
      fill(240, 67, 32);
      ellipse(x, y, 17, 17);
    }
    fill(183, 190, 189);
    ellipse(x, y, 9, 9);
  }

  drawDotsIn(x, y) {
    // Draw dots inside the circles
    if (this.dotsIntype1) {
      let numCircles = 5;
      for (let j = 0; j < numCircles; j++) {
        let numDot = (j + 3.5) * 10;
        let DotRadius = 5;
        angleMode(DEGREES);
        let angle = 360 / numDot;
        for (let k = 0; k < numDot; k++) {
          let dotX = x + cos(angle * k) * (j * 7 + 45);
          let dotY = y + sin(angle * k) * (j * 7 + 45);
          fill(this.shapeColor.Out);
          ellipse(dotX, dotY, DotRadius, DotRadius);
        }
      }
    }
    if (this.dotsIntype2) {
      let numCircles = 3;
      for (let j = 0; j < numCircles; j++) {
        let numDot = (j + 2.5) * 10;
        let DotRadius = 5;
        angleMode(DEGREES);
        let angle = 360 / numDot;
        for (let k = 0; k < numDot; k++) {
          let dotX = x + cos(angle * k) * (j * 7 + 25);
          let dotY = y + sin(angle * k) * (j * 7 + 25);
          fill(this.shapeColor.Mid);
          ellipse(dotX, dotY, DotRadius, DotRadius);
        }
      }
    }
  }

  drawRings(x, y) {
    // Draw concentric rings
    if (this.Ringype1) {
      for (let j = 0; j < 3; j++) {
        let radius = (j + 3) * 8;
        noFill();
        stroke(this.shapeColor.Mid);
        strokeWeight(3);
        ellipse(x, y, radius * 2, radius * 2);
        noStroke();
      }
    }
    for (let j = 0; j < 2; j++) {
      let radius = (j + 2.5) * 6;
      noFill();
      stroke(157, 165, 163);
      strokeWeight(3);
      ellipse(x, y, radius * 2, radius * 2);
      noStroke();
    }
  }

  drawZipLine(x, y) {
    // Draw zip lines connecting dots
    angleMode(DEGREES);
    if (this.ZipLineType1) {
      let numCircles = 5;
      let curve_70 = [];
      let curve_35 = [];
      for (let j = 0; j < numCircles; j++) {
        let numDot = (j + 3.5) * 10;
        let angle = 360 / numDot;
        noFill();
        stroke("#ef1e1e");
        for (let k = 0; k < numDot; k++) {
          let dotX = x + cos(angle * k) * (j * 7 + 45);
          let dotY = y + sin(angle * k) * (j * 7 + 45);
          if (numDot > 70) {
            curve_70.push({ x: dotX, y: dotY });
          } else if (numDot == 35) {
            curve_35.push({ x: dotX, y: dotY });
          }
        }
        if (curve_70.length > 0 && curve_35.length > 0) {
          for (let qw = 0; qw < curve_70.length; qw++) {
            let num = Math.round(qw / 2);
            if (num >= curve_35.length - 1) {
              num = curve_35.length - 1;
            }
            line(
              curve_70[qw].x,
              curve_70[qw].y,
              curve_35[num].x,
              curve_35[num].y
            );
          }
        }
      }
    }
    if (curve_40.length > 0 && curve_25.length > 0) {
      for (let qw = 0; qw < curve_40.length; qw++) {
        let num = Math.round(qw / 2);
        if (num >= curve_25.length - 1) {
          num = curve_25.length - 1;
        }
        line(curve_40[qw].x, curve_40[qw].y, curve_25[num].x, curve_25[num].y);
      }
    }
  }

  drawHexagons(x, y) {
    // Draw hexagons around the circle
    angleMode(RADIANS);
    let hexagonRadius = 90;
    for (let j = 0; j < 6; j++) {
      let angle = (TWO_PI / 6) * j + aniRadians;
      let hexagonX = x + hexagonRadius * cos(angle);
      let hexagonY = y + hexagonRadius * sin(angle);
      fill(0);
      stroke(221, 97, 40);
      strokeWeight(2);
      ellipse(hexagonX, hexagonY, 7.5, 7.5);
    }
    for (let j = 0; j < 6; j++) {
      let angle1 = (TWO_PI / 6) * j + aniRadians;
      let angle2 = (TWO_PI / 6) * ((j + 1) % 6) + aniRadians * 2;
      for (let k = 0; k < 4; k++) {
        let fraction = k / 4;
        let x1 = lerp(
          x + hexagonRadius * cos(angle1),
          x + hexagonRadius * cos(angle2),
          fraction
        );
        let y1 = lerp(
          y + hexagonRadius * sin(angle1),
          y + hexagonRadius * sin(angle2),
          fraction
        );
        fill(0);
        stroke(221, 97, 40);
        strokeWeight(2);
        ellipse(x1, y1, 7.5, 7.5);
      }
    }
    for (let j = 0; j < 6; j++) {
      let angle = (TWO_PI / 6) * j + aniRadians;
      let hexagonX = x + hexagonRadius * cos(angle);
      let hexagonY = y + hexagonRadius * sin(angle);
      fill(255);
      stroke(0);
      ellipse(hexagonX, hexagonY, 6.5, 6.5);
    }
  }

  drawSmoothCurve(x, y) {
    // Draw a smooth curve
    if (this.curveType1) {
      push();
      translate(x, y);
      if (rotateCurveFlag) {
        scale(map(aniRadians, 0, TWO_PI, 1, 3));
        rotate(this.angle + aniRadians);
      } else {
        rotate(this.angle);
      }
      noFill();
      stroke(255, 0, 0);
      strokeWeight(5);
      beginShape();
      // First point
      vertex(0, 0);

      bezierVertex(0 + 20, 0 + 20, 0 + 40, 0 + 20, 0 + 40, 0 + 20);

      bezierVertex(0 + 60, 0 + 20, 0 + 70, 0 + 10, 0 + 70, 0 + 10);

      // End point
      vertex(0 + 80, 0 + 0);

      endShape();
      pop();
    }
  }
  
  
  //draw straight line
  drawStraightLine(x,y) {
    if (this.lineType1) {
      push();
      translate(x, y);
      if (rotateCurveFlag) {
        scale(map(aniRadians, 0, TWO_PI, 1, 3));
        rotate(this.angle + aniRadians);
      } else {
        rotate(this.angle);
      }
      noFill();
      stroke(255, 0, 0);
      strokeWeight(2.5);
      line(0,0,0,circleRadius);
      if (rotateCurveFlag) {
        rotate(aniRadians);
      }
      line(0,0,0,-circleRadius);
      pop();
    }
  }
}

// Function to initialize artwork data
// Reference - Function "y=ax+b"
function initArtworkData() {
  // Initialize index and tt variables
  let index = 0;
  let tt = 0;

  // Calculate the line slope (tangent of 45 degrees)
  lineSlope = tan((PI * 1) / 4);

  // Print the line slope (for debugging or information)
  print(lineSlope);

  // Define the vertical step (deltaY) between rows of artwork
  let deltaX = 50;

  // Calculate the total space required for a row of circles (including spacing)
  let totalSpace = spacing + circleRadius * 2;

  // Loop to generate rows of artwork
  for (
    let dx = -(width + circleRadius * 2); // Starting x position for the row
    dx <= width + circleRadius * 2; // Continue as long as x is within the canvas width
    dx += (circleRadius * 2 + spacing) * 1.5 // Increment x to start the next row
  ) {
    let y = -200 + tt * deltaX; // Calculate the initial y position for the row
    tt += 1; // Increment tt (used for adjusting y position)
    console.log(tt, y);

    // Loop to generate circles in the current row
    for (let i = 0; i < 100; i = i + 1) {
      // Calculate the x position for the current circle in the row
      let x = -dx / lineSlope + y / lineSlope;

      // Check if the circle is outside the canvas vertically, and if so, exit the loop
      if (y < -circleRadius * 2 || y > height + circleRadius * 2) {
        break;
      }

      // Check if the circle is within the canvas horizontally
      if (x > -circleRadius * 2 && x < width + circleRadius * 2) {
        // Add the circle's position and colors to the artwork array
        addPts(x, y);
      }
      console.log(x, y);

      // Move to the next y position for the next circle
      y = y + (circleRadius * 2 + spacing) * 0.8;
    }
  }

  // Print "done" when all rows are generated
  console.log("done");
}

// Function to add points to the artwork array
function addPts(x, y) {
  // Generate random colors for the artwork
  let randomOutColor = color(random(255), random(255), random(255));
  let randomOutColor2 = color(random(255), random(255), random(255));
  let randomMidColor = color(random(255), random(255), random(255));

  // Create a new Artwork object with the specified properties and add it to the artwork array
  artwork.push(
    new Artwork(x, y, randomOutColor, {
      Out: randomOutColor2,
      Mid: randomMidColor,
    })
  );
}

// Function to handle window resizing
function windowResized() {
  // Resize the canvas to match the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
  // Update the canvas width and height variables
  canvasWidth = width;
  canvasWidth = height; // Note: This line appears to have a typo; it should be "canvasHeight = height;"

  // Hide the cursor
  noCursor();

  // Set the background color of the canvas
  background(60, 80, 110);

  // Clear or reset some variables or arrays (ShapeColor, positions, circleBackgroundColorolor, etc.)

  // Initialize the artwork data
  initArtworkData();
}
