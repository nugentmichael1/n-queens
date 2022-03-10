import { useNavigate } from "react-router-dom";

const Options = ({ n, updateN, run, popSize, updatePopSize, mutationProb, setMutationProb, termCond, setTermCond }) => {


    let navigate = useNavigate();

    return <>
        {/* <h1>Options</h1> */}
        <table id='options'>
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>Controller</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <label htmlFor="n">
                            N
                        </label>
                    </td>
                    <td>
                        {n}
                    </td>
                    <td>
                        <input type="range" min="4" max="20" value={n} id="n" onInput={() => { updateN(Number(document.getElementById("n").value)) }} />
                    </td>
                </tr>
                <tr>
                    <td>
                        Representation
                    </td>
                    <td>Permutations</td>
                </tr>
                <tr>
                    <td>
                        Recombination Type
                    </td>
                    <td>"Cut-and-crossfill" crossover</td>
                </tr>
                <tr>
                    <td>
                        Recombination Probability
                    </td>
                    <td>100%</td>
                </tr>
                <tr>
                    <td>
                        Mutation Type
                    </td>
                    <td>Swap</td>
                </tr>
                <tr>
                    <td>
                        Mutation Probability
                    </td>
                    <td>
                        {mutationProb}%
                    </td>
                    <td>
                        <input type="range" min="0" max="100" value={mutationProb} id="mutationProb" onInput={() => { setMutationProb(Number(document.getElementById("mutationProb").value)) }} />
                    </td>
                </tr>
                <tr>
                    <td>
                        Parent Selection
                    </td>
                    <td>Tournament w/o Replacement (Best 2 out of random 5)</td>
                </tr>
                <tr>
                    <td>
                        Survival Selection
                    </td>
                    <td>Replace Worst</td>
                </tr>
                <tr>
                    <td>
                        Population Size
                    </td>
                    <td>
                        {popSize}
                        {/* <input type='text' value={popSize} size='1' id='popSize' onChange={() => { updatePopSize(Number(document.getElementById('popSize').value)) }}></input> */}
                    </td>
                    <td>
                        <input type="range" min="10" max="1000" value={popSize} id="popSize" onInput={() => { updatePopSize(Number(document.getElementById("popSize").value)) }} />
                    </td>
                </tr>
                <tr>
                    <td>
                        Number of Offspring
                    </td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>
                        Initialization
                    </td>
                    <td>Smart Random (avoids horizontal and vertical collisions)</td>
                </tr>

                <tr>
                    <td>Termination Condition</td>
                    <td>

                        {termCond.toLocaleString("en-US")} Iterations
                    </td>
                    <td>
                        <input type="range" min="100" max="10000" value={termCond} id="termCond" onInput={() => { setTermCond(Number(document.getElementById("termCond").value)) }} />
                    </td>
                </tr>
                {/* <tr>
                <td>Initialization</td>
                <td>
                    <table>
                        <tbody>
                            <tr>
                                {initLabel}
                            </tr>
                            <tr>

                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr> */}
            </tbody>
        </table>
        <button onClick={() => (run(), navigate("/results"))}>Run</button>
    </>;
};

export default Options;
