class representation {

    constructor(state) {
        // this.type = type;
        // if (this.type === "2dArray") {

        // }
        // else if (this.type == "perm") {
        // }
        // else {
        //     console.log("representation passed does not match any possibilities")
        // }
    }
}

class candidate {
    constructor(state) {
        this.permutation = state
        this.calculateScore()
    }
    setRank(rank) {
        this.rank = rank;
    }
    calculateScore() {

        // step 1b: evaluate fitness
        //only need to check for diagonal conflicts on permutations

        let penalty = 0

        for (let j = 0; j < this.permutation.length; j++) {
            let individualPenalty = 0
            //check diagonal up-left
            for (let a = j - 1, b = this.permutation[j] + 1; a >= 0 && b <= this.permutation.length; a--, b++) {
                if (this.permutation[a] === b) {
                    individualPenalty += 1
                    // console.log('collision(up-left)', String.fromCharCode(a + 65), b)
                }
            }
            //check diagonal up-right
            for (let a = j + 1, b = this.permutation[j] + 1; a < this.permutation.length && b <= this.permutation.length; a++, b++) {
                if (this.permutation[a] === b) {
                    individualPenalty += 1
                    // console.log('collision(up-right)', String.fromCharCode(a + 65), b)
                }
            }

            //check diagonal down-right
            for (let a = j + 1, b = this.permutation[j] - 1; a < this.permutation.length && b >= 1; a++, b--) {
                if (this.permutation[a] === b) {
                    individualPenalty += 1
                    // console.log('collision(down-right)', String.fromCharCode(a + 65), b)
                }
            }

            //check diagonal down-left
            for (let a = j - 1, b = this.permutation[j] - 1; a >= 0 && b >= 1; a--, b--) {
                if (this.permutation[a] === b) {
                    individualPenalty += 1
                    // console.log('collision(down-left)', String.fromCharCode(a + 65), b)
                }
            }
            // console.log('column', String.fromCharCode(j + 65), 'individualPenalty', individualPenalty)
            penalty += individualPenalty
        }
        // console.log('penalty', penalty)
        //worst possible penalty would be n*(n-1): n-1 collisions per queen and n queens
        this.score = (this.permutation.length * (this.permutation.length - 1)) - penalty

    }
}

class population {
    constructor(size, n, mutationProb, iterations, rep) {
        this.size = size //population size
        this.n = n //number of queens
        this.candidates = new Array(this.size)
        this.possiblePositions = new Array(this.n)
        this.mutationProb = mutationProb / 100
        // console.log("this.mutationProb:", this.mutationProb)
        this.iterations = iterations;
        this.rep = rep;
    }

    //main function for class.  calls all other utility functions.
    run() {

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

    initialize() {
        // step 1a: generate first population

        //ensures unique values for each index
        for (let j = 0; j < this.n; j++) {
            this.possiblePositions[j] = j + 1;
        }

        //generation of all candidates
        for (let i = 0; i < this.candidates.length; i++) {
            let state = new Array(this.n)

            //copy of possiblePositions so pop() can be performed
            let deck = [...this.possiblePositions]
            // console.log(deck)

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
            // console.log(candidateSolution)
            this.candidates[i] = new candidate(state)
            // console.log(this.candidates[i])
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
        let cut = Math.floor(Math.random() * (parent[0].permutation.length - 1 - 2) + 1)

        //offspring 1 recombination
        let k = cut;
        let offspring0 = [...parent[0].permutation]
        for (let i = cut; i < parent[1].permutation.length; i++) {
            let val = parent[1].permutation[i];
            let skip = false
            //search for value in pre-cut section
            for (let m = 0; m < cut; m++) {
                if (parent[0].permutation[m] === val) {
                    skip = true
                    break;
                }
            }
            if (!skip) offspring0[k++] = val;
        }
        for (let i = 0; k < parent[1].permutation.length; i++) {
            let val = parent[1].permutation[i];
            let skip = false
            for (let m = 0; m < cut; m++) {
                if (parent[0].permutation[m] === val) {
                    skip = true
                    break;
                }
            }
            if (!skip) offspring0[k++] = val;
        }

        //offspring 2 recombination
        k = cut;
        let offspring1 = [...parent[1].permutation]
        for (let i = cut; i < parent[0].permutation.length; i++) {
            let val = parent[0].permutation[i];
            let skip = false;
            //search for value in pre cut section
            for (let m = 0; m < cut; m++) {
                if (parent[1].permutation[m] === val) {
                    skip = true;
                    break;
                }
            }
            if (!skip) offspring1[k++] = val;
        }
        for (let i = 0; k < parent[0].permutation.length; i++) {
            let val = parent[0].permutation[i];
            let skip = false
            for (let m = 0; m < cut; m++) {
                if (parent[1].permutation[m] === val) {
                    skip = true
                    break;
                }
            }
            if (!skip) offspring1[k++] = val;
        }
        return [offspring0, offspring1]
    }

    mutate(offspringState) {
        //randomly swap two values of the permutation
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