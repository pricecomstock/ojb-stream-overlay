import P5 from "p5";
import tmi from "tmi.js";

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: ["summit1g"],
});

client.connect();

const messages = [];

function sketch(p5) {
  client.on("message", async (channel, tags, message, self) => {
    // if (tags.username === 'oljackyboy') {
    //   if (message === '!start-trail') return trailing = true;
    //   else if (message === '!end-trail') return trailing = false;
    //   else if (message.match(/^\!drop\-timeout/)) {
    //     const timeout = Number(message.split(' ')[1]);
    //     if (!isNaN(timeout)) {
    //       config.dropTimeout = timeout * 1000;
    //     }
    //   }
    // }
    messages.push({
      text: message,
      x: Math.random() * p5.windowWidth,
      y: Math.random() * p5.windowHeight,
      size: Math.random(80) + 50,
    });
    if (messages.length > 10) {
      messages.shift();
    }
  });

  let x = 0;
  let y = 300;
  p5.setup = async () => {
    p5.frameRate(60);
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = async () => {
    console.log("draw");
    p5.clear();

    p5.fill("#fff");
    messages.forEach(({ text, x, y, size }) => {
      p5.textSize(size);
      p5.text(text, x, y);
    });
  };
}

const p5Instance = new P5(sketch, "#app");
