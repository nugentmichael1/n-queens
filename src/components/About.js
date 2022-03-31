
const About = () => {

    return <>
        {/* <h1>About</h1> */}
        <p>This is a react project to demonstrate and explore the Evolutionary Algorithm via the N-Queens problem.  While each parameter within the options tab has an effect on the likelihood of a found solution, the representation choice has the largest.  This is because the permutation and 2D array representations have significantly different search spaces.  For example, when n=8, there are 8! = 40,320 possible combinations in the permutation format, but 4.4 billion possible combinations within the 2D array representation.  This is because the permutation representation prevents any vertical collisions simply by virtue of "1 value per indexable cell".  Then, so long as each number within the permutation is unique -- no repeats -- the horizontal space is also freed of collisions.  This leaves only the diagonal collisions for the evolutionary algorithm to avoid.  The 2D array representation can collide if every possible vector, even duplicate queens on a single tile.</p>
        <p>A <a href="https://www.fresnostate.edu/" className="fs">CSU, Fresno</a> <a href="https://csm.fresnostate.edu/csci/index.html" className="fs">Computer Science Program</a> project from Professor Athanasios Aris (Thanos) Panagopoulos' 2022 Bio-Inspired Machine Learning course (CSCI 191T).</p>
        <h2>Group Members</h2>
        <ul>
            <li>Leon Kantikov</li>
            <li>Alexis Lara-Umana</li>
            <li>Vi Nguyen</li>
            <li>Michael Nugent</li>
        </ul>
    </>
};

export default About