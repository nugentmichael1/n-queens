const Options = ({ n, updateN, run, popSize, updatePopSize, mutationProb, setMutationProb, termCond, setTermCond }) => {

    return <>
        <h1>Options</h1>
        <table id='options'>
            <tbody>
                <tr>
                    <td>
                        <label htmlFor="n">
                            N
                        </label>
                    </td>
                    <td>
                        <input type='text' size='1' maxLength='2'
                            value={n} id='n' onChange={() => updateN(Number(document.getElementById('n').value))}></input>
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
                        Recombination
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
                        Mutation
                    </td>
                    <td>Swap</td>
                </tr>
                <tr>
                    <td>
                        Mutation Probability
                    </td>
                    <td><input type="range" min="0" max="100" value={mutationProb} id="mutationProb" onInput={() => { setMutationProb(Number(document.getElementById("mutationProb").value)) }} />{mutationProb}%</td>
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
                    <td><input type='text' value={popSize} size='1' id='popSize' onChange={() => { updatePopSize(Number(document.getElementById('popSize').value)) }}></input></td>
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
                        <input type="range" min="100" max="10000" value={termCond} id="termCond" onInput={() => { setTermCond(Number(document.getElementById("termCond").value)) }}></input>
                        {termCond.toLocaleString("en-US")} Iterations
                    </td>
                </tr>
                <tr>
                    <td colSpan='2'>
                        <button onClick={run}>Run</button>
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
    </>;
};

export default Options;
