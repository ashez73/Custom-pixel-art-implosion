"use strict";
let model, view, controller;
model = {
  pixelArt: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
  ],
  Pixel: function (x, y, xfinal, yfinal, id) {
    this.id = id,
      this.x = x;
    this.y = y;
    this.xfinal = xfinal;
    this.yfinal = yfinal;
  },
  aspect: 0,
  finalScale: 5,
  pixelData: [],
  myRows: () => model.pixelArt.length,
  myColumns: () => model.pixelArt[0].length,
  initializeAndCalculate: function () {
    /*
    1. project the grid into viewport relative to its center
    2. calculate vectors of movement
    3. write starting and final positions for each pixel
    */
    let counter = 0,
      address = '',
      coordX, coordY, sideA, sideB, vector, myObject;
    let width = view.updateViewport().myWidth,
      height = view.updateViewport().myHeight;
    this.aspect = width / height;
    let scale = this.finalScale,
      rows = this.myRows(),
      columns = this.myColumns();
    for (let y = 1; y <= rows; y++) {
      for (let x = 1; x <= columns; x++) {
        if (this.pixelArt[y - 1][x - 1] === 1) {
          counter++;
          sideA = x * scale - (columns * scale) / 2;
          sideB = y * scale - (rows * scale) / 2;
          coordX = sideA + width / 2;
          coordY = sideB + height / 2;
          vector = this.determineVectors(y, x, sideA, sideB, width, height, counter);
          myObject = new model.Pixel(coordX, coordY, vector.xfinal, vector.yfinal, counter);
          this.pixelData.push(myObject);
          address = `<div id = "${counter}" class="proper"><data posX = ${coordX} posY =${coordY} ></data></div>`;
          document.querySelector('#wrapper').insertAdjacentHTML('afterbegin', address);
          view.renderTarget(counter, coordX, coordY);
        }
      }
    }
  },
  determineVectors: (y, x, sideA, sideB, width, height, counter) => {
    let quarter, sideC, sinBeta, cosBeta, myfinalCoords, finalCoords, finalVector, finalCoordX, finalCoordY, xfinal, yfinal, deltaA, deltaB, deltaC;
    let quarterPlace = () => {
      if (sideA <= 0 && sideB <= 0) {
        return 1;
      } else if (sideA > 0 && sideB > 0) {
        return 4;
      } else if (sideA >= 0 && sideB <= 0) {
        return 2;
      } else {
        return 3;
      };
    };
    let normalizeToAspect = () => {
      let delimiter = model.aspect >= 1 ? height : width;
      let multiply = model.aspect >= 1 ? {
        x: model.aspect,
        y: 1
      } : {
        x: 1,
        y: model.aspect
      };
      if (sideB >= sideA) {
        deltaB = delimiter / 2 - sideB;
        deltaC = Math.abs(deltaB) / cosBeta;
        deltaA = deltaC * sinBeta;
      } else {
        deltaA = delimiter / 2 - sideA;
        deltaC = Math.abs(deltaA) / cosBeta;
        deltaB = sinBeta * deltaC;
      }
      quarter === 1 || quarter === 3 ? xfinal = width / 2 - (sideA + deltaA) * multiply.x : xfinal = width / 2 + (sideA + deltaA) * multiply.x;
      quarter === 1 || quarter === 2 ? yfinal = height / 2 - (sideB + deltaB) * multiply.y : yfinal = height / 2 + (sideB + deltaB) * multiply.y;
      return {
        xfinal,
        yfinal
      };
    };
    quarter = quarterPlace();
    //determine quarter, we don't care about vector directions anymore therefore
    sideA = Math.abs(sideA);
    sideB = Math.abs(sideB);
    //and Pitagoras himself reveals the lenght of the very vector!
    sideC = Math.sqrt(sideA ** 2 + sideB ** 2);
    sinBeta = sideB >= sideA ? sideA / sideC : sideB / sideC;
    cosBeta = sideB >= sideA ? sideB / sideC : sideA / sideC;
    return normalizeToAspect();
  }
};

view = {
  updateViewport: function () {
    let elWidth = document.getElementById('wrapper').clientWidth;
    let elHeight = document.getElementById('wrapper').clientHeight;
    return {
      myWidth: elWidth,
      myHeight: elHeight
    };
  },
  renderTarget: function (elem, xoff, yoff) {
    let element = elem;
    let myElem;
    myElem = document.getElementById(element);
    myElem.style.left = `${Math.floor(xoff)}px`;
    myElem.style.top = `${Math.floor(yoff)}px`;
    let cl = Math.random() * 200 + 20;
    myElem.style.backgroundColor = `rgb(${cl},${cl},${cl})`;
    myElem.style.zIndex = elem;
  },
};

controller = {
  init: model.initializeAndCalculate(),
  restart: function () {
    document.getElementsByClassName('proper').remove;
    document.getElementsByTagName('button')[0].removeEventListener("click", controller.restart);
   // controller.init;
    controller.play();
  },
  initListeners: function () {
    document.getElementsByTagName('button')[0].addEventListener("click", controller.restart);
  },
  myRandomizer: function (trans, ampli) {
    let speed = (Math.random() * ampli) + 1;
    return trans + ((trans * speed) / 100);
  },
  play: function () {
    let instance;
    const tl = new TimelineMax();
    tl.add(TweenLite.from(".text", 5, {
      ease: Expo.easeIn,
      scale: 1,
      opacity: 0,
      onComplete: this.initListeners
    }));
    model.pixelData.map(pixel => {
      instance = document.getElementById(pixel.id.toString());
      tl.add(TweenLite.from(instance, this.myRandomizer(3, 50), {
        ease: Bounce.easeOut,
        scale: this.myRandomizer(12, 75),
        scale: 0.1,
        opacity: 0,
        top: Math.floor(pixel.yfinal) + "px",
        left: Math.floor(pixel.xfinal) + "px",
        backgroundColor: "#fff",
        boxShadow: "none",
        borderRadius: 0,
      }), 0)
    });
  }
};
controller.init;
controller.play();