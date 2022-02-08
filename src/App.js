import './App.css';
import Board from './components/Board'
import Header from './components/Header'
import Options from './components/Options'
import Footer from './components/Footer'
import { useState } from 'react'
// var ss = require("./solution.js")
// var population = new ss.population("2")
// import population from './solution.js'

class candidate {
  constructor(permutation, score) {
      this.permutation = permutation
      this.score = score
  }
  setScore(score) {
      this.score = score
  }
}

class population {
  constructor(size, n) {
      this.size = size
      this.n = n
      this.candidates = new Array(this.size)
      // console.log('size',size)
      // console.log('candidates.length',this.candidates.length)
      this.possiblePositions = new Array(this.n)
      // this.fitnessScore = new Array(this.size)
  }
  run() {
      // let defaultPopSize = 1
      // step 1: initilization - generate and evaluate population

      // step 1a: generate population
      // array to hold all candidate solutions: our population
      // var population = new Array(this.size)

      // array to hold possible row positions for generation
      // let possiblePositions = new Array(n)
      for (let j = 0; j < this.n; j++) {
          this.possiblePositions[j] = j + 1;
      }

      // console.log('possPositions', possiblePositions.length, possiblePositions)

      //generation of all candidates
      for (let i = 0; i < this.candidates.length; i++) {
          let perm = new Array(this.n)

          //copy of possiblePositions so pop() can be performed
          let deck = [...this.possiblePositions]
          // console.log(deck)

          for (let j = 0; deck.length > 0; j++) {
              //randomly choose element from stack/deck
              let position = Math.floor(Math.random() * deck.length)

              //swap selected element with last
              let tmp = deck[deck.length - 1]
              deck[deck.length - 1] = deck[position]
              deck[position] = tmp

              //pop last item from stack onto candidate solution

              // console.log('deck', deck)
              // console.log('candidateSolution', candidateSolution)

              perm[j] = deck.pop()

          }
          // console.log(candidateSolution)
          // console.log('loop')
          this.candidates[i] = new candidate(perm, 0)
          // console.log(this.candidates[i])
      }

      // step 1b: evaluate fitness
      //only need to check for diagonal conflicts


      // var fitnessScore = new Array(defaultPopSize)


      for (let i = 0; i < this.candidates.length; i++) {
          //make copy
          let perm = [...this.candidates[i].permutation]
          console.log('perm', perm)
          //check four directions for each queen
          //stop at boundaries
          //count collisions and assign sum to fitnessScore array

          let penalty = 0

          for (let j = 0; j < perm.length; j++) {
              let individualPenalty = 0
              //check diagonal up-left
              for (let a = j - 1, b = perm[j] + 1; a >= 0 && b <= this.n; a--, b++) {
                  if (perm[a] === b) {
                      individualPenalty += 1
                      console.log('collision(up-left)', String.fromCharCode(a + 65), b)
                  }
              }
              //check diagonal up-right
              for (let a = j + 1, b = perm[j] + 1; a < this.n && b <= this.n; a++, b++) {
                  if (perm[a] === b) {
                      individualPenalty += 1
                      console.log('collision(up-right)', String.fromCharCode(a + 65), b)
                  }
              }

              //check diagonal down-right
              for (let a = j + 1, b = perm[j] - 1; a < this.n && b >= 1; a++, b--) {
                  if (perm[a] === b) {
                      individualPenalty += 1
                      console.log('collision(down-right)', String.fromCharCode(a + 65), b)
                  }
              }

              //check diagonal down-left
              for (let a = j - 1, b = perm[j] - 1; a >= 0 && b >= 1; a--, b--) {
                  if (perm[a] === b) {
                      individualPenalty += 1
                      console.log('collision(down-left)', String.fromCharCode(a + 65), b)
                  }
              }
              console.log('column', String.fromCharCode(j + 65), 'individualPenalty', individualPenalty)
              penalty += individualPenalty
          }
          console.log('penalty', penalty)
          //worst possible penalty would be n*(n-1): n-1 collisions per queen and n queens
          // this.fitnessScore[i] = (this.n*(this.n-1)) - penalty
          this.candidates[i].score = (this.n * (this.n - 1)) - penalty
          // console.log('fitnessScore[' + i + ']', this.fitnessScore[i])
          console.log('candidates[' + i + '].score', this.candidates[i].score)
      }

      //tournament selection: best 2 out of 5
      // randomly select 5 candidates, identify best 2
      // Math.floor(Math.random * this.candidates.length)
      // let parents = []
      // for(let i = 0;i<this.fitnessScore.length;i+=5){
      //   let tournament = this.fitnessScore.slice(i,i+5)
      //   // let alpha = {score:-1, index:-1}
      //   let maxIndex = 0
      //   for(let j=1;j<tournament.length;j++){
      //     if(tournament[j] > tournament[maxIndex]){
      //       maxIndex = j
      //       // alpha.score = tournament[j]
      //       // alpha.index = j
      //     }
      //   }
      //   // swap max index with last and pop from array
      //   let tmp = tournament[maxIndex]
      //   tournament[maxIndex] = tournament[tournament.length-1]
      //   tournament.pop()
      // }
  }
}

function App() {

  // default n
  var defaultN = 8

  const [n, setN] = useState(defaultN)

  var queensArr = new Array(defaultN)
  const [queens, setQueens] = useState(queensArr)

  const [popSize, setPopSize] = useState(100)

  const updateN = (n) => {
    // Catches empty text string
    if (n === "") return

    // console.log(n)
    setN(n)
    setQueens(new Array(n))
  }

  const updatePopSize = (popSize) =>{
    if(popSize==="") return

    // console.log(popSize)
    setPopSize(popSize)
  }

  const run = () => {
    console.log('run','popSize',popSize)

    let experiment = new population(popSize, n)
    experiment.run()
  }

  return (
    <div className="App">
      <Header />
      <Options n={n} updateN={updateN} run={run} popSize={popSize} updatePopSize={updatePopSize}/>
      <Board size={n} />
      <Footer />
    </div>
  )
}

export default App;
