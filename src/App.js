import './App.css';
import { Board, updateBoard } from './components/Board'
import Home from './components/Home'
import Options from './components/Options'
import { NavBar } from './components/Nav'
import About from './components/About'
import Results from './components/Results'
import { useState } from 'react'
import { population } from './components/EvolutionaryAlgorithm'
import { Routes, Route, BrowserRouter } from "react-router-dom"


function App() {

    // default n
    var defaultN = 8

    var defaultIterations = 10000

    const [n, setN] = useState(defaultN)

    const [queens, setQueens] = useState(undefined)

    const [popSize, setPopSize] = useState(100)

    const [mutationProb, setMutationProb] = useState(80)

    const [termCond, setTermCond] = useState(defaultIterations)

    // const [curPerm, setCurPerm] = useState(undefined)

    const [results, setResults] = useState(undefined)

    const updateN = (n) => {
        // Catches empty text string
        if (n === "") setN(0)

        // console.log(n)
        setN(n)
        // setQueens(new Array(n))
    }

    const updatePopSize = (popSize) => {
        if (popSize === "") setPopSize(0)

        setPopSize(popSize)
    }

    const run = () => {
        console.log('run', 'popSize', popSize)

        let experiment = new population(popSize, n, mutationProb)
        setResults(experiment.run(termCond))
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar test="3" />} >
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="home" element={<Home />} />
                    <Route path="options" element={<Options n={n} updateN={updateN} run={run} popSize={popSize} updatePopSize={updatePopSize} mutationProb={mutationProb} setMutationProb={setMutationProb} termCond={termCond} setTermCond={setTermCond} />} />
                    <Route path="board" element={<Board size={n} queens={queens} />} />
                    <Route path="results" element={<Results results={results} n={n} setQueens={setQueens} />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;