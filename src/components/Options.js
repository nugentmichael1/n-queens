const Options = ({ n, updateN, run, popSize, updatePopSize, mutationProb, setMutationProb}) => {

    return <table id='options'>
        <caption>Options</caption>
        <tbody>
            <tr>
                <td>
                    <label htmlFor="n">
                        N
                    </label>
                </td>
                <td>
                    <input type='text' size='1' maxLength='2'
                        placeholder={n} id='n' onChange={() => updateN(document.getElementById('n').value)}></input>
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
                <td><input type="range" min="0" max="100" value={mutationProb} id="mutationProb" onInput={ () => {setMutationProb(document.getElementById("mutationProb").value)}}/>{mutationProb}%</td>
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
                <td><input type='text' placeholder={popSize} size='1' id='popSize' onChange={() => { updatePopSize(document.getElementById('popSize').value) }}></input></td>
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
                <td>10,000 Iterations</td>
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
    </table>;
};

export default Options;
