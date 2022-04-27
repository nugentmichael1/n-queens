import './App.css';
import { Board } from './components/Board'
import Home from './components/Home'
import Options from './components/Options'
import { NavBar } from './components/Nav'
import About from './components/About'
import Results from './components/Results'
import Insights from './components/Insights'
import { useState } from 'react'
import { population, candidate2DRep } from './components/EvolutionaryAlgorithm'
import { Routes, Route, Navigate } from "react-router-dom"


function App() {

    // default n
    var defaultN = 8

    var defaultIterations = 10000

    const [n, setN] = useState(defaultN)

    const [curCandidate, setCurCandidate] = useState(undefined)

    const [popSize, setPopSize] = useState(100)

    const [mutationProb, setMutationProb] = useState(80)

    const [rep, setRep] = useState(1)

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

    const [avgPerIteration, setAvgPerIteration] = useState([])

    const run = () => {
        console.log('run', 'popSize', popSize)

        // let a = new candidate2DRep([[1,1],[1,1],[2,3],[2,4]])
        // console.log(a.present());
        // console.log("score",a.score);

        // let debug = new population(2, 4, 100, 100, 0);
        // setResults(debug.run());

        let experiment = new population(popSize, n, mutationProb, termCond, rep)
        setResults(experiment.run())

        //experiment to observe average score per iteration
        // setAvgPerIteration(experiment.getIterationAvg())
        // console.log(avgPerIteration);
    }

    const resetResults = () => {
        setResults(undefined)
        setCurCandidate(undefined)
    }

    return (
        <>
            <Routes>
                <Route path="/:page" element={<NavBar test="3" />} />
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/home" element={<Home />} />
                <Route path="/options" element={<Options n={n} updateN={updateN} run={run} popSize={popSize} updatePopSize={updatePopSize} mutationProb={mutationProb} setMutationProb={setMutationProb} rep={rep} setRep={setRep} termCond={termCond} setTermCond={setTermCond} resetResults={resetResults} />} />
                <Route path="/board" element={<Board size={n} curCandidate={curCandidate} />} />
                <Route path="/results" element={<Results results={results} n={n} setCurCandidate={setCurCandidate} />} />
                <Route path="/insights" element={<Insights />} />
            </Routes>
        </>
    );
}

export default App;