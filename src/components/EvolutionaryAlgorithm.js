
class candidate2DRep {
    constructor(state) {
        this.state = state;
        this.calculateScore();
    }

    setRank(rank) {
        this.rank = rank;
    }

    calculateScore() {

        //make 2d matrix and fill in values based on how many queens are in each location
        let matrix = Array(this.state.length);
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = Array(matrix.length).fill(0);
        }

        for (let i = 0; i < this.state.length; i++) {

            let x = this.state[i][0];
            let y = this.state[i][1];

            matrix[x][y] += 1;
        }

        let statePenalty = 0;

        //determine collisions for each queen
        for (let i = 0; i < this.state.length; i++) {

            let penalty = 0;

            let x = this.state[i][0];
            let y = this.state[i][1];

            //accounts for other queens in this queen's location
            if (matrix[x][y] > 1) penalty = matrix[x][y] - 1;

            //check horizontal
            //left
            for (let j = x - 1; j >= 0; j--) {
                if (matrix[j][y] > 0) penalty++;
            }
            //right
            for (let j = x + 1; j < this.state.length; j++) {
                if (matrix[j][y] > 0) penalty++;
            }

            //check vertical
            //up
            for (let j = y - 1; j >= 0; j--) {
                if (matrix[x][j] > 0) penalty++;
            }
            //down
            for (let j = y + 1; j < this.state.length; j++) {
                if (matrix[x][j] > 0) penalty++;
            }

            //check diagonal up-left to down-right
            //up-left
            for (let m = x - 1, n = y - 1; m >= 0 && n >= 0; m--, n--) {
                if (matrix[m][n] > 0) penalty++;
            }
            //down-right
            for (let m = x + 1, n = y + 1; m < this.state.length && n < this.state.length; m++, n++) {
                if (matrix[m][n] > 0) penalty++;
            }

            //check diagonal down-left to up-right
            //down-left
            for (let m = x - 1, n = y + 1; m >= 0 && n < this.state.length; m--, n++) {
                if (matrix[m][n] > 0) penalty++;
            }
            //up-right
            for (let m = x + 1, n = y - 1; m < this.state.length && n >= 0; m++, n--) {
                if (matrix[m][n] > 0) penalty++;
            }

            statePenalty += penalty;
        }

        this.score = (this.state.length * (this.state.length - 1)) - statePenalty
    }
}

class candidate {
    constructor(state) {
        this.state = state
        this.calculateScore()
    }
    setRank(rank) {
        this.rank = rank;
    }

    // evaluate fitness
    calculateScore() {

        //only need to check for diagonal conflicts on permutations/states

        let penalty = 0

        for (let j = 0; j < this.state.length; j++) {
            let individualPenalty = 0
            //check diagonal up-left
            for (let a = j - 1, b = this.state[j] + 1; a >= 0 && b <= this.state.length; a--, b++) {
                if (this.state[a] === b) {
                    individualPenalty += 1
                }
            }
            //check diagonal up-right
            for (let a = j + 1, b = this.state[j] + 1; a < this.state.length && b <= this.state.length; a++, b++) {
                if (this.state[a] === b) {
                    individualPenalty += 1
                }
            }

            //check diagonal down-right
            for (let a = j + 1, b = this.state[j] - 1; a < this.state.length && b >= 1; a++, b--) {
                if (this.state[a] === b) {
                    individualPenalty += 1
                }
            }

            //check diagonal down-left
            for (let a = j - 1, b = this.state[j] - 1; a >= 0 && b >= 1; a--, b--) {
                if (this.state[a] === b) {
                    individualPenalty += 1
                }
            }
            penalty += individualPenalty
        }

        //worst possible penalty would be n*(n-1): n-1 collisions per queen and n queens
        this.score = (this.state.length * (this.state.length - 1)) - penalty
    }
}

class population {
    constructor(size, n, mutationProb, iterations, rep) {
        this.size = size //population size
        this.n = n //number of queens
        this.candidates = new Array(this.size)
        this.possiblePositions = new Array(this.n)
        this.mutationProb = mutationProb / 100
        this.iterations = iterations;
        this.rep = rep;
    }

    //main function for class.  determines which functions to call based on representation.
    run() {
        let results;
        if (this.rep === 1) results = this.runPerm();
        else if (this.rep === 0) results = this.run2DRep();
        else {
            console.log("Representation value is not recognized: ", this.rep, "Cannot run algorithm.")
            return;
        }
        return results;

    }

    runPerm() {
        // step 1: initilization - generate first population.  
        // fitness is automatically evaluated in candidate constructor.
        this.initialize();

        for (let i = 0; i < this.iterations; i++) {

            //copy of candidates array that will eventually include all offspring, too
            let newPop = [...this.candidates]

            //double population size through 
            for (let j = 0; j < this.candidates.length / 2; j++) {

                // randomly select 5 candidates and identify best 2
                let parent = this.tournamentSelection();

                //top two parents are used to create two offspring through recombination
                let offspring = this.recombination(parent);

                //mutation of first offspring
                if (Math.random() < this.mutationProb) {
                    offspring[0] = this.mutate(offspring[0]);
                }

                //mutation of second offspring
                if (Math.random() < this.mutationProb) {
                    offspring[1] = this.mutate(offspring[1])
                }

                //push offspring onto the population array
                newPop.push(new candidate(offspring[0]))
                newPop.push(new candidate(offspring[1]))
            }

            //reduces ranked population by half for next iteration
            this.survivorSelection(newPop);
        }

        //set ranks.  helps react assign keys to table rows in results.
        for (let i = 0; i < this.candidates.length; i++) {
            this.candidates[i].setRank(i)
        }

        return this.candidates
    }

    run2DRep() {
        // step 1: initilization - generate first population.  
        // fitness is automatically evaluated in candidate constructor.
        this.initialize2DRep();

        for (let i = 0; i < this.iterations; i++) {

            //copy of candidates array that will eventually include all offspring, too
            let newPop = [...this.candidates]

            //double population size through 
            for (let j = 0; j < this.candidates.length / 2; j++) {

                // randomly select 5 candidates and identify best 2
                let parent = this.tournamentSelection();

                //top two parents are used to create two offspring through recombination
                let offspring = this.recombination2DRep(parent);

                //mutation of first offspring
                if (Math.random() < this.mutationProb) {
                    offspring[0] = this.mutate2DRep(offspring[0]);
                }

                //mutation of second offspring
                if (Math.random() < this.mutationProb) {
                    offspring[1] = this.mutate2DRep(offspring[1])
                }

                //push offspring onto the population array
                newPop.push(new candidate2DRep(offspring[0]))
                newPop.push(new candidate2DRep(offspring[1]))
            }

            //reduces ranked population by half for next iteration
            this.survivorSelection(newPop);
        }

        //set ranks.  helps react assign keys to table rows in results.
        for (let i = 0; i < this.candidates.length; i++) {
            this.candidates[i].setRank(i)
        }

        return this.candidates
    }

    // step 1: generate first population
    initialize() {

        //ensures unique values for each index
        for (let j = 0; j < this.n; j++) {
            this.possiblePositions[j] = j + 1;
        }

        //generation of all candidates
        for (let i = 0; i < this.candidates.length; i++) {

            let state = new Array(this.n)

            //copy of possiblePositions so pop() can be performed
            let deck = [...this.possiblePositions]

            for (let j = 0; deck.length > 0; j++) {
                //randomly choose element from stack/deck
                let position = Math.floor(Math.random() * deck.length)

                //swap selected element with last
                let tmp = deck[deck.length - 1]
                deck[deck.length - 1] = deck[position]
                deck[position] = tmp

                //pop last item from stack onto candidate solution
                state[j] = deck.pop()

            }

            this.candidates[i] = new candidate(state)
        }
    }

    // step 1: generate first population
    initialize2DRep() {

        //generation of all candidates
        for (let i = 0; i < this.candidates.length; i++) {

            let state = new Array(this.n)

            for (let j = 0; j < state.length; j++) {
                //randomly choose element from 1-N
                let positionX = Math.floor(Math.random() * this.n);
                let positionY = Math.floor(Math.random() * this.n);

                //pop last item from stack onto candidate solution
                state[j] = [positionX, positionY];
            }

            this.candidates[i] = new candidate2DRep(state)
        }
    }

    //tournament selection: return best 2 out of random 5
    tournamentSelection() {

        //will capture five random parents
        const parentCandidates = []

        for (let i = 0; i < 5; i++) {
            parentCandidates[i] = this.candidates[Math.floor(Math.random() * this.candidates.length)]
        }

        //sort the randomly chosen parentCandidates by score: descending
        parentCandidates.sort((a, b) => {
            return b.score - a.score;
        })

        //best two parents returned
        return [parentCandidates[0], parentCandidates[1]];
    }

    //takes array of two parents and produces array of two offspring
    recombination(parent) {

        //randomly choose index between 1 and length-2
        let cut = Math.floor(Math.random() * (parent[0].state.length - 1 - 2) + 1)

        //offspring 1 recombination
        let k = cut;
        let offspring0 = [...parent[0].state]
        for (let i = cut; i < parent[1].state.length; i++) {
            let val = parent[1].state[i];
            let skip = false
            //search for value in pre-cut section
            for (let m = 0; m < cut; m++) {
                if (parent[0].state[m] === val) {
                    skip = true
                    break;
                }
            }
            if (!skip) offspring0[k++] = val;
        }
        for (let i = 0; k < parent[1].state.length; i++) {
            let val = parent[1].state[i];
            let skip = false
            for (let m = 0; m < cut; m++) {
                if (parent[0].state[m] === val) {
                    skip = true
                    break;
                }
            }
            if (!skip) offspring0[k++] = val;
        }

        //offspring 2 recombination
        k = cut;
        let offspring1 = [...parent[1].state]
        for (let i = cut; i < parent[0].state.length; i++) {
            let val = parent[0].state[i];
            let skip = false;
            //search for value in pre cut section
            for (let m = 0; m < cut; m++) {
                if (parent[1].state[m] === val) {
                    skip = true;
                    break;
                }
            }
            if (!skip) offspring1[k++] = val;
        }
        for (let i = 0; k < parent[0].state.length; i++) {
            let val = parent[0].state[i];
            let skip = false
            for (let m = 0; m < cut; m++) {
                if (parent[1].state[m] === val) {
                    skip = true
                    break;
                }
            }
            if (!skip) offspring1[k++] = val;
        }
        return [offspring0, offspring1]
    }

    //takes array of two parents and produces array of two offspring
    recombination2DRep(parent) {

        //randomly choose index between 1 and length-2
        let cut = Math.floor(Math.random() * (parent[0].state.length - 1 - 2) + 1)

        let offspring0 = [...parent[0].state];
        for (let i = cut; i < offspring0.length; i++) {
            offspring0[i] = [...parent[1].state[i]];
        }
        let offspring1 = [...parent[1].state];
        for (let i = cut; i < offspring1.length; i++) {
            offspring1[i] = [...parent[0].state[i]];
        }

        return [offspring0, offspring1]
    }

    mutate(offspringState) {
        //randomly swap two values of the permutation/state
        let indexA = Math.floor(Math.random() * offspringState.length);
        let indexB = Math.floor(Math.random() * offspringState.length);

        //reroll until A and B are two different indexes
        while (indexA === indexB) indexB = Math.floor(Math.random() * offspringState.length);

        //swap values
        let tmp = offspringState[indexA];
        offspringState[indexA] = offspringState[indexB];
        offspringState[indexB] = tmp;

        return offspringState;
    }

    mutate2DRep(offspringState) {
        //randomly swap two values of the permutation/state
        let indexTarget = Math.floor(Math.random() * offspringState.length);

        let x = offspringState[indexTarget][0];
        let y = offspringState[indexTarget][1];

        while (x === offspringState[indexTarget][0]) {
            x = Math.floor(Math.random() * this.n);
        }
        while (y === offspringState[indexTarget][1]) {
            y = Math.floor(Math.random() * this.n);
        }

        //replace values
        offspringState[indexTarget][0] = x;
        offspringState[indexTarget][1] = y;

        return offspringState;
    }

    survivorSelection(offspring) {
        //sort new population (previous and offspring)
        offspring.sort((a, b) => {
            return b.score - a.score;
        })

        //take top half
        this.candidates = offspring.splice(0, this.candidates.length);
    }
}



export { candidate, population }