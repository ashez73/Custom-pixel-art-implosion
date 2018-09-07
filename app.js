let model = {
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
  Pixel: function (x, y, xfinal, yfinal) {
    this.x = x;
    this.y = y;
    this.xfinal = xfinal;
    this.yfinal = yfinal;
  },
  aspect: 0,
  finalScale: 5,
  pixelData: [],
  myRows: () => model.pixelArt[0].length,
  myColumns: () => model.pixelArt.length,

  createGrid: function () {
    /*
    1. assign id to each pixel
    2. store target position relative to wrapper top left in data attribute
    3. render at target location
    */
    let quarter, counter = 0,
      address = '',
      coordX, coordY, sideA, sideB;
    let width = view.updateViewport().myWidth,
      height = view.updateViewport().myHeight;
    this.aspect = width / height;
    let scale = this.finalScale,
      rows = this.myRows(),
      columns = this.myColumns();
    for (let y = 1; y <= columns; y++) {
      for (let x = 1; x <= rows; x++) {
        if (this.pixelArt[y - 1][x - 1] === 1) {
          counter++;
          sideA = Math.floor(x * scale - (columns * scale) / 2);
          sideB = Math.floor(y * scale - (rows * scale) / 2);
          coordX = sideA + width / 2;
          coordY = sideB + height / 2;
          vector = this.determineVectors(y, x, sideA, sideB, width, height, counter);
          myObject = new model.Pixel(coordX, coordY, 0, 0);
          this.pixelData.push(myObject);
          address = `<div id = "${counter}" class="proper"><data posX = ${coordX} posY =${coordY} ></data></div>`;
          // targetX = ${vector.lx} targetY = ${vector.ly}
          document.querySelector('#wrapper').insertAdjacentHTML('beforeend', address);
          view.renderTarget(counter, coordX, coordY);
          //view.renderAtBorder (counter, vector.lx, vector.ly);
        }
      }
    }
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
        return 3;
      } else if (sideA >= 0 && sideB <= 0) {
        return 2;
      } else {
        return 4;
      };
    };
    myfinalCoords = () => {
      function normalizeToWidth() {
        quarter === 1 || quarter === 2 ? deltaB2 = height / 2 - sideB - deltaB : deltaB2 = sideB + deltaB - height / 2;
        if (height / 2 - sideB - deltaB < 1 || height / 2 + sideB + deltaB > height) {
          deltaC2 = Math.abs(deltaB2 / sinBeta);
          deltaA2 = Math.floor(cosBeta * deltaC2);
          //console.log(deltaA2);
          quarter === 1 || quarter === 3 ? xfinal = Math.floor(1 + deltaA2) : xfinal = Math.floor(width - deltaA2);
          quarter === 1 || quarter === 2 ? yfinal = 1 : yfinal = height;
        }
      };

      function normalizeToHeight() {
        quarter === 1 || quarter === 3 ? deltaA2 = width / 2 - sideA - deltaA : deltaA2 = sideA + deltaA - width / 2;
        if (width / 2 - sideA - deltaA < 1 || width / 2 + sideA + deltaB > width) {
          deltaC2 = deltaA2 / sinBeta;
          deltaB2 = Math.floor(cosBeta * deltaC2);
          quarter === 1 || quarter === 3 ? xfinal = 1: xfinal = width;
          quarter === 1 || quarter === 2 ? yfinal = deltaB2 : yfinal = height-deltaB2;
        }
      }

      function calculateCoords() {
        quarter ===1 ||quarter ===3? xfinal = width/2-sideA-deltaA: xfinal = width / 2 + sideA + deltaA;
        quarter ===1 ||quarter ===2? yfinal =1 :y = height;
      }

      getFinalCoords = (aorb) => {
        //
        if (quarter===1){
        aorb ? model.pixelData[counter] ={
          xfinal: width/2-sideA-deltaA,
          yfinal:1
        } : normalizeToWidth();
        //
      }

        if (quarter === 1) {
          aorb ? model.pixelData[counter] = {
            xfinal: width / 2 - sideA - deltaA,
            yfinal: 1
          } : normalizeToWidth();
          //console.log(model.pixelData[counter]);
        } else if (quarter === 2) {

          //console.log(counter);
          aorb ? model.pixelData[counter] = {
            xfinal: width / 2 + sideA + deltaA,
            yfinal: 1
          } : model.pixelData[counter] = {
            xfinal: width,
            yfinal: height / 2 - sideB - deltaB
          };
          // console.log(model.pixelData[counter]);
        } else if (quarter === 3) {
          // console.log(counter);
          aorb ? model.pixelData[counter] = {
            xfinal: width / 2 - sideA - deltaA,
            yfinal: height
          } : model.pixelData[counter] = {
            xfinal: 1,
            yfinal: height / 2 + sideB + deltaB
          };
          // console.log(model.pixelData[counter]);
        }
        //  console.log (`1/2 h: ${height / 2} - sideB: ${sideB} - deltaB : ${deltaB}`);
        else {
          // console.log(counter);
          aorb ? model.pixelData[counter] = {
            xfinal: width / 2 + sideA + deltaA,
            yfinal: height
          } : model.pixelData[counter] = {
            xfinal: width,
            yfinal: height / 2 + sideB + deltaB
          };
          // console.log(model.pixelData[counter]);
        }
        //console.log (quarter, aorb, finalCoords);
        //console.log (aorb, finalCoords);
        // console.log (height / 2 - sideA - deltaA);
        return finalCoords;

      };
      //console.log (sinBeta,cosBeta);
      if (sideB >= sideA) {
        deltaB = Math.floor(height / 2 - sideB);
        deltaC = Math.floor(deltaB / cosBeta);
        deltaA = Math.floor(deltaC * sinBeta);
        //console.log (deltaB);
        final = getFinalCoords(true);
      } else {
        deltaA = Math.floor(width / 2 - sideA);
        deltaC = Math.floor(deltaA / cosBeta);
        deltaB = Math.floor(sinBeta * deltaC);
        // console.log (deltaB);
        final = getFinalCoords(false);
        // console.log (quarter, width, height, deltaA, deltaB, deltaC, sideA, sideB);
      };
      // console.log(deltaA, deltaB, deltaC,quarter);
      //console.log(final);
      return final;
    };
    quarter = quarterPlace();
    //console.log(quarter);
    //and Pitagoras himself reveals the lenght of the very vector!
    sideA = Math.floor(Math.abs(sideA));
    sideB = Math.floor(Math.abs(sideB));
    sideC = Math.floor(Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2)));
    //console.log (sideA, sideB, sideC);

    sinBeta = sideB >= sideA ? sideA / sideC : sideB / sideC;
    cosBeta = sideB >= sideA ? sideB / sideC : sideA / sideC;

    //finding coords at the edge of viewport where anim starts/ends
    finalCoords = myfinalCoords();
    // return {
    // finalCoordX,
    //finalCoordY,
    //quarter
    // };
    // console.log(finalCoords);
    // console.log (finalCoords);
    return finalCoords;
  }

};


let view = {
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
    myElem = document.getElementById(element);
    myElem.style.left = `${Math.floor(xoff)}px`;
    myElem.style.top = `${Math.floor(yoff)}px`;
    myElem.style.backgroundColor = "#ff0000";
  },
  renderAtBorder: function (elem, xtr, ytr) {
    console.log(elem, xtr, ytr);
    let element = elem;
    myElem = document.getElementById(element);
    myElem.style.left = `${Math.floor(xtr)}px`;
    myElem.style.top = `${Math.floor(ytr)}px`;
    myElem.style.backgroundColor = "#ff0000";
  }
};

let controller = {
  init: model.createGrid(),
  log: function () {
    // console.log('ok')
  }
};

controller.init;