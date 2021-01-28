// Techno Cyberpunk Mode (Can be set in config)
//
const fonts = [
  "https://fonts.googleapis.com/css?family=Rock+Salt",
  "https://fonts.googleapis.com/css?family=Orbitron",
];

// Dark Mode Colours
const dark = {
  // Colours
  primaryColor: "rgba(37, 1, 63, 0.52)",
  secondaryColor: "#ab00aa77",
  dark: "#222",
  textColor: "hotpink",
  linkColor: "hsl( 300deg, 20%, 50% )",

  // Grays
  darkGray: "#444",
  midGray: "#777",
  lightGray: "#aaa",
  slateGray: "#30404d",

  // Mid Tones
  coldGray: "#455",
  rustGray: "#544",
  warmGray: "#664",

  // Gradients
  primaryGrad: "linear-gradient(45deg, @primaryColor, black)",
  secondaryGrad: "linear-gradient(45deg,indigo,black)",
};

// Light Mode (Default)
const light = {
  // Colours
  primaryColor: "#5BBFBA",
  secondaryColor: "#5F6CAF",
  dark: "#222",
  textColor: "#111",
  linkColor: "#61dafb",

  // Mid Tones
  green: "#A4D4AE",
  orange: "#F0CF85",
  yellow: "#E7F0C3",

  // Grays
  darkGray: "#444",
  midGray: "#777",
  lightGray: "#aaa",
  slateGray: "#30404d",

  // Gradients
  primaryGrad: "linear-gradient(45deg, #5BBFBA, #5F6CAF)",
  secondaryGrad: "linear-gradient(45deg,#5F6CAF,white)",
};

// Theme Initialization Hook
const initializeTheme = (c) => {
  var w = (c.width = window.innerWidth),
    h = (c.height = window.innerHeight),
    ctx = c.getContext("2d"),
    minDist = 10,
    maxDist = 30,
    initialWidth = 10,
    maxLines = 100,
    initialLines = 4,
    speed = 5,
    lines = [],
    frame = 0,
    timeSinceLast = 0,
    dirs = [
      // straight x, y velocity
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      // diagonals, 0.7 = sin(PI/4) = cos(PI/4)
      [0.7, 0.7],
      [0.7, -0.7],
      [-0.7, 0.7],
      [-0.7, -0.7],
    ],
    starter = {
      x: w / 2,
      y: h / 2,
      vx: 0,
      vy: 0,
      width: initialWidth,
    };
  // Initialize Canvas
  function init() {
    lines.length = 0;

    for (var i = 0; i < initialLines; ++i) lines.push(new Line(starter));

    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, w, h);

    // if you want a cookie ;)
    ctx.lineCap = "round";
  }
  // Get Techno Colour
  function getColor(x) {
    return "hsl( hue, 20%, 50% )".replace("hue", (x / w) * 360 + frame);
  }
  // Animate
  function anim() {
    // Animate at refresh Framerate
    window.requestAnimationFrame(anim);
    ++frame;
    // Random Colours
    let a = ~~(Math.random() * 5);
    let b = ~~(Math.random() * 12);
    let d = ~~(Math.random() * 20);
    let c = ~~(Math.random() * 0.01) + 0.05;
    // Styling Lines
    ctx.shadowBlur = 0;
    ctx.fillStyle = `rgba(${a},${b},${d},${c})`;
    ctx.fillRect(0, 0, w, h);
    ctx.shadowBlur = 30;
    // Draw
    for (var i = 0; i < lines.length; ++i)
      if (lines[i].step()) {
        lines.splice(i, 1);
        --i;
      }
    // Add Additional Lines
    ++timeSinceLast;
    if (lines.length < maxLines && timeSinceLast > 10 && Math.random() < 0.5) {
      timeSinceLast = 0;
      lines.push(new Line(starter));
      ctx.fillStyle = ctx.shadowColor = getColor(starter.x);
      ctx.beginPath();
      ctx.fill();
    }
  }
  // Draw Line
  function Line(parent) {
    this.x = parent.x | (~~(Math.random() * w) - w / 2);
    this.y = parent.y | (~~(Math.random() * h) / 3);
    this.width = parent.width / 1.25;

    do {
      var dir = dirs[(Math.random() * dirs.length) | 0];
      this.vx = dir[0];
      this.vy = dir[1];
    } while (
      (this.vx === -parent.vx && this.vy === -parent.vy) ||
      (this.vx === parent.vx && this.vy === parent.vy)
    );

    this.vx *= speed;
    this.vy *= speed;

    this.dist = Math.random() * (maxDist - minDist) + minDist;
  }
  // Line Progress
  Line.prototype.step = function () {
    var dead = false;
    var prevX = this.x,
      prevY = this.y;
    this.x += this.vx;
    this.y += this.vy;
    --this.dist;
    // Decide New Positions
    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) dead = true;
    if (this.dist <= 0 && this.width > 1) {
      this.dist = Math.random() * (maxDist - minDist) + minDist;
      if (lines.length < maxLines) lines.push(new Line(this));
      if (lines.length < maxLines && Math.random() < 0.5)
        lines.push(new Line(this));
      if (Math.random() < 0.2) dead = true;
    }
    // Stroke
    ctx.strokeStyle = ctx.shadowColor = getColor(this.x);
    ctx.beginPath();
    ctx.lineWidth = this.width;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(prevX, prevY);
    ctx.stroke();
    if (dead) return true;
  };
  // Start Automatically
  init();
  anim();
  // Refresh on Resize Events
  window.addEventListener("resize", function () {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    starter.x = ~~(Math.random() * w) / 2;
    starter.y = ~~(Math.random() * h) / 2;
    init();
  });
};

// Resize Canvas
const onResize = (c) => {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  console.log(window);
  initializeTheme(c);
};

module.exports = {
  light,
  dark,
  fonts,
  initializeTheme,
  onResize,
};
