function Game() {
  const SQUAWKS_PER_TICK = {
    budgie: 1,
    conure: 5,
    caique: 20,
    rosella: 100,
    cockatiel: 450,
    amazon: 1200,
    eclectus: 8000,
    cockatoo: 25000
  }

  const INITIAL_PARROT_COSTS = {
    budgie: 10,
    conure: 100,
    caique: 450,
    rosella: 2000,
    cockatiel: 10000,
    amazon: 50000,
    eclectus: 300000,
    cockatoo: 1400000
  }

  const formatNumber = (number) => {
    if(number < 1000000) {
      return number.toLocaleString();
    } else
    if(number < 1000000000) {
      return `${(number / 1000000).toFixed(2)} million`;
    } else
    if(number < 1000000000000) {
      return `${(number / 1000000000).toFixed(2)} billion`;
    } else
    if(number < 1000000000000000) {
      return `${(number / 1000000000000).toFixed(2)} trillion`;
    } else {
      return "A huge number!";
    }
  }

  this.state = {
    squawks: 0,
    parrotCounts: {
      budgie: 0,
      conure: 0,
      caique: 0,
      rosella: 0,
      cockatiel: 0,
      amazon: 0,
      eclectus: 0,
      cockatoo: 0
    },
    parrotCosts: {
      budgie: 10,
      conure: 100,
      caique: 450,
      rosella: 2000,
      cockatiel: 10000,
      amazon: 50000,
      eclectus: 300000,
      cockatoo: 1400000
    },
    parrotRates: {
      budgie: 1,
      conure: 5,
      caique: 20,
      rosella: 100,
      cockatiel: 450,
      amazon: 1200,
      eclectus: 8000,
      cockatoo: 25000
    }
  }

  this.prevState = {
    squawks: 0,
    parrotCounts: {
      budgie: 0,
      conure: 0,
      caique: 0,
      rosella: 0,
      cockatiel: 0,
      amazon: 0,
      eclectus: 0,
      cockatoo: 0
    },
    parrotCosts: {
      budgie: 10,
      conure: 100,
      caique: 450,
      rosella: 2000,
      cockatiel: 10000,
      amazon: 50000,
      eclectus: 300000,
      cockatoo: 1400000
    },
    parrotRates: {
      budgie: 1,
      conure: 5,
      caique: 20,
      rosella: 100,
      cockatiel: 450,
      amazon: 1200,
      eclectus: 8000,
      cockatoo: 25000
    }
  }

  this.refs = {
    squawks: document.getElementById("squawkCount"),
    parrotDivs: {
      budgie: document.getElementById("budgie"),
      conure: document.getElementById("conure"),
      caique: document.getElementById("caique"),
      rosella: document.getElementById("rosella"),
      cockatiel: document.getElementById("cockatiel"),
      amazon: document.getElementById("amazon"),
      eclectus: document.getElementById("eclectus"),
      cockatoo: document.getElementById("cockatoo")
    },
    parrotCounts: {
      budgie: document.getElementById("budgieCount"),
      conure: document.getElementById("conureCount"),
      caique: document.getElementById("caiqueCount"),
      rosella: document.getElementById("rosellaCount"),
      cockatiel: document.getElementById("cockatielCount"),
      amazon: document.getElementById("amazonCount"),
      eclectus: document.getElementById("eclectusCount"),
      cockatoo: document.getElementById("cockatooCount")
    },
    parrotCosts: {
      budgie: document.getElementById("budgieCost"),
      conure: document.getElementById("conureCost"),
      caique: document.getElementById("caiqueCost"),
      rosella: document.getElementById("rosellaCost"),
      cockatiel: document.getElementById("cockatielCost"),
      amazon: document.getElementById("amazonCost"),
      eclectus: document.getElementById("eclectusCost"),
      cockatoo: document.getElementById("cockatooCost")
    },
    parrotRates: {
      budgie: document.getElementById("budgieRate"),
      conure: document.getElementById("conureRate"),
      caique: document.getElementById("caiqueRate"),
      rosella: document.getElementById("rosellaRate"),
      cockatiel: document.getElementById("cockatielRate"),
      amazon: document.getElementById("amazonRate"),
      eclectus: document.getElementById("eclectusRate"),
      cockatoo: document.getElementById("cockatooRate")
    }
  }

  // loads saved game if one exists,
  // populates state and display elements
  this.start = () => {
    let savedGame = localStorage.getItem("savegame");
    if(savedGame) {
      savedGame = JSON.parse(savedGame);
      this.state.squawks = savedGame.squawks;
      for(let parrot in this.state.parrotCounts) {
        if(typeof savedGame.parrotCounts[parrot] !== undefined) {
          this.state.parrotCounts[parrot] = savedGame.parrotCounts[parrot];
          this.state.parrotCosts[parrot] = savedGame.parrotCosts[parrot];
        }        
      }
    }
    this.paint();
    // call update after a full second has passed
    // or else F5 becomes the cheat button!
    setTimeout(this.update, 1000);
  }

  this.save = () => {
    localStorage.setItem("savegame", JSON.stringify(this.state));
  }

  this.restart = () => {
    this.state.squawks = 0;
    for(let parrot in this.state.parrotCounts) {
      this.state.parrotCounts[parrot] = 0;
    }
    for(let parrot in this.state.parrotCosts) {
      this.state.parrotCosts[parrot] = INITIAL_PARROT_COSTS[parrot];
    }
    for(let parrot in this.state.parrotRates) {
      this.state.parrotRates[parrot] = SQUAWKS_PER_TICK[parrot];
    }
    this.paint();
    this.save();
  }

  // ticks every 1 second
  this.update = () => {
    for(let parrot in this.state.parrotCounts) {
      this.state.squawks += this.state.parrotCounts[parrot] * this.state.parrotRates[parrot];
    }
    this.paint();
    // saving once a second seems fine
    // but we could rate-limit if it becomes a problem
    this.save();
    setTimeout(this.update, 1000)
  }

  this.paint = () => {
    // compare each value in current state to previous state
    // and only update the DOM for values that have changed
    if(this.state.squawks !== this.prevState.squawks) {
      this.refs.squawks.innerHTML = formatNumber(this.state.squawks);
      this.prevState.squawks = this.state.squawks;
    }
    for(let parrot in this.state.parrotCounts) {
      if(this.state.squawks < this.state.parrotCosts[parrot]) {
        this.refs.parrotDivs[parrot].classList.add("is-too-expensive");
      } else if(this.refs.parrotDivs[parrot].classList.contains("is-too-expensive")) {
        this.refs.parrotDivs[parrot].classList.remove("is-too-expensive");
      } 
      if(this.state.parrotCounts[parrot] !== this.prevState.parrotCounts[parrot]) {
        this.refs.parrotCounts[parrot].innerHTML = formatNumber(this.state.parrotCounts[parrot]);
        this.prevState.parrotCounts[parrot] = this.state.parrotCounts[parrot];
      }
      if(this.state.parrotCosts[parrot] !== this.prevState.parrotCosts[parrot]) {
        this.refs.parrotCosts[parrot].innerHTML = formatNumber(this.state.parrotCosts[parrot]);
        this.prevState.parrotCosts[parrot] = this.state.parrotCosts[parrot];
      }
      if(this.state.parrotRates[parrot] !== this.prevState.parrotRates[parrot]) {
        this.refs.parrotRates[parrot].innerHTML = formatNumber(this.state.parrotRates[parrot]);
        this.prevState.parrotRates[parrot] = this.state.parrotRates[parrot];
      }
    }
  }

  this.addSquawks = (squawks) => {
    if(squawks) {
      this.state.squawks += squawks;
      this.paint();
    }
  }

  this.addParrots = (parrot, number) => {
    if(parrot && parrot in this.state.parrotCounts && number) {
      if(this.state.squawks >= this.state.parrotCosts[parrot]) {
        this.state.squawks -= this.state.parrotCosts[parrot];
        this.state.parrotCosts[parrot] = Math.floor(Math.pow(this.state.parrotCosts[parrot], 1.05));
        this.state.parrotCounts[parrot] += number;
        this.paint();
      }
    }
  }
}

const game = new Game();
game.start();

function squawkClick() {
  game.addSquawks(1);
}

function parrotClick(parrot) {
  game.addParrots(parrot, 1);
}

function restartClick() {
  game.restart();
}