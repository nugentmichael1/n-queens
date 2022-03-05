import './App.css';
import Board from './components/Board'
import Home from './pages/Home'
import Options from './components/Options'
import Footer from './components/Footer'
import { Nav, NavLink, NavBar } from './components/Nav'
import About from './pages/About'
import { useState } from 'react'
import { population } from './EvolutionaryAlgorithm'
import { Routes, Route, BrowserRouter } from "react-router-dom"


function App() {

    // default n
    var defaultN = 8

    var defaultIterations = 10000

    const [n, setN] = useState(defaultN)

    // var queensArr = new Array(defaultN)
    const [queens, setQueens] = useState(new Array(defaultN))

    const [popSize, setPopSize] = useState(100)

    const [mutationProb, setMutationProb] = useState(80)

    const [termCond, setTermCond] = useState(defaultIterations)

    const updateN = (n) => {
        // Catches empty text string
        if (n === "") setN(0)

        // console.log(n)
        setN(n)
        setQueens(new Array(n))
    }

    const updatePopSize = (popSize) => {
        if (popSize === "") setPopSize(0)

        // console.log("popSize changed to:",popSize)
        setPopSize(popSize)
    }

    const run = () => {
        console.log('run', 'popSize', popSize)

        let experiment = new population(popSize, n, mutationProb)
        experiment.run(termCond)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar test="3" />} >
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="home" element={<Home />} />
                    <Route path="options" element={<Options n={n} updateN={updateN} run={run} popSize={popSize} updatePopSize={updatePopSize} mutationProb={mutationProb} setMutationProb={setMutationProb} termCond={termCond} setTermCond={setTermCond} />} />
                    <Route path="board" element={<Board size={n} />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;


/*
            //{/* <Nav /> */

/* <Home />
<Options n={n} updateN={updateN} run={run} popSize={popSize} updatePopSize={updatePopSize} mutationProb={mutationProb} setMutationProb={setMutationProb} termCond={termCond} setTermCond={setTermCond} />
<Board size={n} />
<Footer />
*/