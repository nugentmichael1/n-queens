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

    var defaultIterations = 10000

    const [n, setN] = useState(defaultN)

    var queensArr = new Array(defaultN)
    const [queens, setQueens] = useState(queensArr)

    const [popSize, setPopSize] = useState(100)

    const [mutationProb, setMutationProb] = useState(80)

    const [termCond, setTermCond] = useState(defaultIterations)

    const updateN = (n) => {
        // Catches empty text string
        if (n === "") return

        // console.log(n)
        setN(n)
        setQueens(new Array(n))
    }

    const updatePopSize = (popSize) => {
        if (popSize === "") return

        console.log("popSize changed to:",popSize)
        setPopSize(popSize)
    }
    
    const run = () => {
        console.log('run', 'popSize', popSize)

        let experiment = new population(popSize, n, mutationProb)
        experiment.run(termCond)
    }

    return (
        <div className="App">
            <Header />
            <Options n={n} updateN={updateN} run={run} popSize={popSize} updatePopSize={updatePopSize} mutationProb={mutationProb} setMutationProb={setMutationProb} termCond={termCond} setTermCond={setTermCond}/>
            <Board size={n} />
            {/* <Footer /> */}
        </div>
    )
}

export default App;
