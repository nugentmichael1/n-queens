import './App.css';
import Board from './components/Board'
import Header from './components/Header'
import Options from './components/Options'
import Footer from './components/Footer'
import { useState } from 'react'
import { population } from './EvolutionaryAlgorithm'


function App() {

    // default n
    var defaultN = 8

    var iterations = 10000

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

    const updatePopSize = (popSize) => {
        if (popSize === "") return

        // console.log(popSize)
        setPopSize(popSize)
    }

    const run = () => {
        console.log('run', 'popSize', popSize)

        let experiment = new population(popSize, n)
        experiment.run(iterations)
    }

    return (
        <div className="App">
            <Header />
            <Options n={n} updateN={updateN} run={run} popSize={popSize} updatePopSize={updatePopSize} />
            <Board size={n} />
            {/* <Footer /> */}
        </div>
    )
}

export default App;
