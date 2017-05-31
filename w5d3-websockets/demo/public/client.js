function getHostName() {
  const parser = document.createElement('a')
  parser.href = document.location;
  return parser.hostname;
}

function randomColor() {
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
  const doodle = new Doodle(color, {
    draw: (e) => {
              send({cmd: "draw",
                    data: e});
            }
  });
  document.body.appendChild(doodle.canvas);

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
