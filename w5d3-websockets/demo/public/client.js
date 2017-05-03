class Doodle {
  constructor(canvas, color, callbacks) {
    this.drawing = false;
    this.previousPoint = null;
    this.color = color;

    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.context.lineJoin = "round";
    this.context.lineWidth = 3;
    this.callbacks = {};
    this.callbacks.draw = callbacks.draw || function () {};

    canvas.addEventListener("mousedown", (e) => {
      this.start();
      this.point(e.pageX, e.pageY);
    });

    canvas.addEventListener("mousemove", (e) => {
      this.point(e.pageX, e.pageY);
    });

    canvas.addEventListener("mouseup", (e) => {
      this.end();
    });
  }

  start () {
    this.drawing = true;
  }

  end () {
    this.drawing = false;
    this.previousPoint = null;
  }

  point (x, y) {
    if(this.drawing) {
      if(this.previousPoint) {
        const e = { x0: this.previousPoint.x,
                    y0: this.previousPoint.y,
                    x1: x,
                    y1: y,
                    color: this.color };
        this.draw(e);
        this.callbacks.draw(e);
      } 
      this.previousPoint = {x: x, y: y};
    }
  }

  draw (e) {
    this.context.strokeStyle = e.color;
    this.context.beginPath();
    this.context.moveTo(e.x0, e.y0);
    this.context.lineTo(e.x1, e.y1);
    this.context.closePath();
    this.context.stroke();
  }
}

function getHostName () {
  const parser = document.createElement('a')
  parser.href = document.location;
  return parser.hostname;
}

function randomColor () {
  const rand255 = () => {
    return Math.floor(Math.random() * 255);
  }
  return "rgb(" + rand255() + "," + rand255() + "," + rand255() + ")"; 
}

const hostname = getHostName();
const port = 4000;
const connection = new WebSocket("ws://"+hostname+":"+port);

connection.onopen = () => {
  const send = (message) => {
    connection.send(JSON.stringify(message));
  }

  const color = randomColor();
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const doodle = new Doodle(canvas, color, 
    { 
      draw: (e) => {
        send({cmd: "draw",
              data: e});
      }
    }
  );

  send({cmd: "register",
        data: {color: color}});

  connection.onmessage = (e) => {
    const message = JSON.parse(e.data);
    switch(message.cmd) {
      case "draw":
        doodle.draw(message.data)
        break;
    }
  };
}
