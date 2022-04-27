import React, { Component } from 'react'

export default class Insights extends Component {



    render() {
        return (
            <div>
                <h2>Evolutionary Algorithm</h2>
                <p>The evolutionary algorithm, which mimics the real world's natural selection process for live organisms, is a great advancement over mere random guesses as it builds upon prior knowledge.  Candidate solutions that are most fit are reused in the subsequent iteration while the least fit "die off," or are discarded.  The selected population then experiences recombination (akin to sexual reproduction), and mutations.  This new population's average fitness score should be at least as great as the previous as any positive changes in candidates will be kept, and any negative will be discarded, again.  This process continues until a desired number of iterations are ran, or any other decidable criteria (100% accuracy).</p>
                <h2>Short-Failings</h2>
                <p>While the evolutionary algorithm is a significant tool of search, it is limited.  Eventually, the search space will become too large to efficiently brute force random guesses even when prior knowledge is incorporated.  Unfortunately, this means the evolutionary algorithm cannot be used as a panacea of all computational problems.</p>
                <h2>Problem Specific Method</h2>
                <p>The Problem Specific Method is a concept that emphasizes the necessity of unique insights for maximum efficiency per problem.  This means each problem must be individually studied, and mastered such that elegant representations are found.  Then the evolutionary algorithms can be employed.</p>
                <h2>N-Queens Representation</h2>
                <p>There are two representations to choose from in the Options panel: coordinates, and permutation.  The former has a much larger search space, and is consequently less effective.  The latter has a much smaller search space, and is consequently greatly effective.</p>
                <h2>Coordinates</h2>
                <p>This enables the entire search space (and then some because of duplicate queens per tile) to be accessible to the evolutionary algorithm.  There are n*nCr = n*n!/r!(n*n-r)! possible states, which is an enourmous task that can often cause the algorithm to fail.  For example, when n=8, there are 4,426,165,368 possible states.</p>
                <h2>Permutation</h2>
                <p>On the other hand, a single string of unique digits will exclude all horizontal or vertial collisions from the search space.  Each cell is associated with a column of the chess board, and because only one number can be in a cell, only one queen will be in a vertical column.  Likewise, since each number represents a horizontal row, so long as no number is duplicated, each queen will have its own row.  This reduces the search space to nPr = n!/(n-r)!, which is only n! since r=n, and 0!=1.  In an n=8 problem, that is only 40,320 states to search.</p> 
                <h2>Conclusion</h2>
                <p>With 92 possible solutions in the n=8 puzzle, the likelihood of a successful random guess from a coordinate representation has a 0.0000021% chance, whereas the permutation representation has a 0.23% chance.  Even without employment of the evolutionary algorithm, the problem specific method of representation has increased the probability from something near impossible to something merely difficult.</p>
            </div>
        )
    }
}


{/* <p>While each parameter within the options tab has an effect on the likelihood of a found solution, the representation choice has the largest.  This is because the permutation and 2D array representations have significantly different search spaces.  For example, when n=8, there are 8! = 40,320 possible combinations in the permutation format, but 4.4 billion possible combinations within the 2D array representation.  This is because the permutation representation prevents any vertical collisions simply by virtue of "1 value per indexable cell".  Then, so long as each number within the permutation is unique -- no repeats -- the horizontal space is also freed of collisions.  This leaves only the diagonal collisions for the evolutionary algorithm to avoid.  The 2D array representation can collide if every possible vector, even duplicate queens on a single tile.</p> */}