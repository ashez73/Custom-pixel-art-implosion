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
  Pixel: function (x, y, xfinal, yfinal,id) {
    this.id =id,
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
  finalParams: {
    x: 0,
    y: 0
  },

  initializeAndCalculate: function () {
    /*
    1. project the grid into viewport relative to its center
    2. calculate vectors of movement
    3. write starting and final positions for each pixel
    */
    let quarter, counter = 0,
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
          console.log(`counter: ${counter}, A,B:  ${sideA}, ${sideB} x,y: ${x},${y}`);
          vector = this.determineVectors(y, x, sideA, sideB, width, height, counter);
          myObject = new model.Pixel(coordX, coordY, vector.xfinal, vector.yfinal, counter);
          this.pixelData.push(myObject);
          address = `<div id = "${counter}" class="proper"><data posX = ${coordX} posY =${coordY} ></data></div>`;
          // targetX = ${vector.lx} targetY = ${vector.ly}
          document.querySelector('#wrapper').insertAdjacentHTML('beforeend', address);
          //view.renderTarget(counter, coordX, coordY);
         view.renderTarget(counter, vector.xfinal, vector.yfinal);
          // view.renderAtBorder (counter, vector.xfinal, vector.yfinal);

        }
      }
    }
    let center = `<div id = "center" class ="proper" style = "left: ${width/2}px; top: ${height/2}px; color: blue;" ></div>`
    document.querySelector('#wrapper').insertAdjacentHTML('beforeend', center);
  },
  /*
 1. determine pixel's quarter relative to the picture center
 2. establish correct vector while exploding/imploding
 3. move the vector up to the edge of closest viewport border
  */
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
      //console.log(delimiter);
      let multiply = model.aspect >= 1 ? {
        x: model.aspect,
        y: 1
      } : {
        x: 1,
        y: model.aspect
      };
      //console.log(multiply);
      if (sideB >= sideA) {
        deltaB = delimiter / 2 - sideB;
        deltaC = Math.abs(deltaB) / cosBeta;
        deltaA = deltaC * sinBeta;
      } else {
        deltaA = delimiter / 2 - sideA;
        deltaC = Math.abs(deltaA) / cosBeta;
        deltaB = sinBeta * deltaC;
      }
      //console.log(deltaA, deltaB, deltaC);
      quarter === 1 || quarter === 3 ? xfinal = width / 2 - (sideA + deltaA) * multiply.x : xfinal = width / 2 + (sideA + deltaA) * multiply.x;
      quarter === 1 || quarter === 2 ? yfinal = height / 2 - (sideB + deltaB) * multiply.y : yfinal = height / 2 + (sideB + deltaB) * multiply.y;
      //console.log(`yfinal:!!! ${yfinal} xfinal:!!! ${xfinal} sideA: ${sideA} sideB: ${sideB}`);

      return {
        xfinal,
        yfinal
      };

    };

    quarter = quarterPlace();
    //console.log(`quarter: ${quarter}`)
    //determine quarter, we don't care about vector directions anymore therefore
    sideA = Math.abs(sideA);
    sideB = Math.abs(sideB);
    //and Pitagoras himself reveals the lenght of the very vector!
    sideC = Math.sqrt(sideA ** 2 + sideB ** 2);
    //sideC = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
    //console.log(sideA, sideB, sideC);
    //determine angle functions
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
    myElem.style.backgroundColor = "#ff0000";
  },
  renderAtBorder: function (elem, xtr, ytr) {
    //console.log(elem, xtr, ytr);
    let element = elem;
    myElem = document.getElementById(element);
    myElem.style.left = `${Math.floor(xtr)}px`;
    myElem.style.top = `${Math.floor(ytr)}px`;
    myElem.style.backgroundColor = "#ff0000";
  }
};


controller = {
    init: model.initializeAndCalculate(),
    play: function () {
      console.log('OK')
      let transitionSpeed = 2;
      let instance;
      model.pixelData.map(pixel => {
          instance = document.getElementById(pixel.id.toString());
          console.log(pixel);
          console.log(instance);
          let tops = Math.floor(pixel.xfinal) + "px";
          let lefs = Math.floor(pixel.yfinal) + "px";
          //console.log(tops, lefs);
          //TweenMax.to(instance, 3, {x:100});
         /* 
          TweenLite.set(pixel, {
            opacity: "1",
            width: Math.floor(pixel.x)+"px",
            height: Math.floor(pixel.y)+"px"
          });

          TweenLite.from(pixel, transitionSpeed, {
            ease: Bounce.easeOut,
            scale: 1,
            opacity: 0,
            top: Math.floor(pixel.xfinal) + "px",
            left: Math.floor(pixel.yfinal) + "px"
          })
*/
          /*
              TweenLite.set(instance, {
                opacity: "1",
                width: "300px",
                height: "100px"
              });
              let transitionSpeed = 2;
              TweenLite.from(instance, transitionSpeed, {
                ease: Bounce.easeOut,
                scale: 12,
                opacity: 0,
                top: "300px",
                left:"100px"
              });
             // tween =   
          */
      })
    }
};
    controller.init;
    controller.play();