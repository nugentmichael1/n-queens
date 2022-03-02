
class candidate {
    constructor(permutation) {
        this.permutation = permutation
        this.calculateScore()
    }
    calculateScore() {

        // step 1b: evaluate fitness
        //should only need to check for diagonal conflicts

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
    constructor(size, n) {
        this.size = size //population size
        this.n = n //number of queens
        this.candidates = new Array(this.size)
        this.possiblePositions = new Array(this.n)
    }
    run(iterations) {
        // let defaultPopSize = 1
        // step 1: initilization - generate and evaluate population
        this.initialize();

        for (let i = 0; i < iterations; i++) {
            let offspring = this.tournamentSelection();
            // console.log("offspring",offspring)
            this.survivorSelection(offspring);
        }

        console.log("final candidates",this.candidates)

    }
    initialize() {
        // step 1a: generate first population

        for (let j = 0; j < this.n; j++) {
            this.possiblePositions[j] = j + 1;
        }

        //generation of all candidates
        for (let i = 0; i < this.candidates.length; i++) {
            let perm = new Array(this.n)

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

                // console.log('deck', deck)
                // console.log('candidateSolution', candidateSolution)

                perm[j] = deck.pop()

            }
            // console.log(candidateSolution)
            this.candidates[i] = new candidate(perm)
            // console.log(this.candidates[i])
        }

    }
    tournamentSelection() {
        //tournament selection: best 2 out of 5
        // randomly select 5 candidates, identify best 2 and cross-over to create offspring
        let offspring = [...this.candidates]
        for (let j = 0; j < this.candidates.length / 2; j++) {
            const parentCandidates = []

            for (let i = 0; i < 5; i++) {
                parentCandidates[i] = this.candidates[Math.floor(Math.random() * this.candidates.length)]
            }
            //sort the randomly chosen parentCandidates by score: descending
            parentCandidates.sort((a, b) => {
                return b.score - a.score;
            })

            //debug: show chosen parentCandidates in console
            // for (let i = 0; i < 5; i++) {
            //     console.log(parentCandidates[i]);
            // }

            //recombination
            // take top two and use "cut-and-crossfill" crossover method
            //randomly choose index between 1 and length-2
            let cut = Math.floor(Math.random() * (parentCandidates[0].permutation.length - 1 - 2) + 1)

            //debug: flag cut index out-of-range
            // if(cut < 1 || cut > parentCandidates[0].permutation.length - 1) console.log("cut index out of range!",cut);
            //debug: show cut index selection
            // console.log("cut", cut);

            //offspring 1 recombination
            let k = cut;
            let offspringPerm0 = [...parentCandidates[0].permutation]
            for (let i = cut; i < parentCandidates[1].permutation.length; i++) {
                let val = parentCandidates[1].permutation[i];
                let skip = false
                //search for value in pre-cut section
                for (let m = 0; m < cut; m++) {
                    if (parentCandidates[0].permutation[m] === val) {
                        skip = true
                        break;
                    }
                }
                if (!skip) offspringPerm0[k++] = val;
            }
            for (let i = 0; k < parentCandidates[1].permutation.length; i++) {
                let val = parentCandidates[1].permutation[i];
                let skip = false
                for (let m = 0; m < cut; m++) {
                    if (parentCandidates[0].permutation[m] === val) {
                        skip = true
                        break;
                    }
                }
                if (!skip) offspringPerm0[k++] = val;
            }
            //debug
            // console.log("offspringPerm0", offspringPerm0)

            //offspring 2 recombination
            k = cut;
            let offspringPerm1 = [...parentCandidates[1].permutation]
            for (let i = cut; i < parentCandidates[0].permutation.length; i++) {
                let val = parentCandidates[0].permutation[i];
                let skip = false;
                //search for value in pre cut section
                for (let m = 0; m < cut; m++) {
                    if (parentCandidates[1].permutation[m] === val) {
                        skip = true;
                        break;
                    }
                }
                if (!skip) offspringPerm1[k++] = val;
            }
            for (let i = 0; k < parentCandidates[0].permutation.length; i++) {
                let val = parentCandidates[0].permutation[i];
                let skip = false
                for (let m = 0; m < cut; m++) {
                    if (parentCandidates[1].permutation[m] === val) {
                        skip = true
                        break;
                    }
                }
                if (!skip) offspringPerm1[k++] = val;
            }
            //debug
            // console.log("offspringPerm1", offspringPerm1)


            //mutation of first offspring
            //80% probability to occur
            if (Math.random() <= 0.8) {
                //randomly swap two values of the permutation
                let indexA = Math.floor(Math.random() * offspringPerm0.length);
                let indexB = Math.floor(Math.random() * offspringPerm0.length);
                //reroll until A and B are two different indexes
                while (indexA === indexB) indexB = Math.floor(Math.random() * offspringPerm0.length);

                //swap values
                let tmp = offspringPerm0[indexA];
                offspringPerm0[indexA] = offspringPerm0[indexB];
                offspringPerm0[indexB] = tmp;

                //debug
                // console.log("mutation offspringPerm0", offspringPerm0)
            }


            //mutation of second offspring
            //80% probability to occur
            if (Math.random() <= 0.8) {
                //randomly swap two values of the permutation
                let indexA = Math.floor(Math.random() * offspringPerm1.length);
                let indexB = Math.floor(Math.random() * offspringPerm1.length);
                //reroll until A and B are two different indexes
                while (indexA === indexB) indexB = Math.floor(Math.random() * offspringPerm1.length);

                //swap values
                let tmp = offspringPerm1[indexA];
                offspringPerm1[indexA] = offspringPerm1[indexB];
                offspringPerm1[indexB] = tmp;

                //debug
                // console.log("mutation offspringPerm1", offspringPerm1)
            }

            offspring.push(new candidate(offspringPerm0))
            offspring.push(new candidate(offspringPerm1))
        }

        return offspring
        //debug
        // console.log("offspring length",offspring.length)

    }
    survivorSelection(offspring) {
        //survivor selection
        //sort new population (previous and offspring)
        offspring.sort((a, b) => {
            return b.score - a.score;
        })

        // console.log("new population",offspring)
        this.candidates = offspring.splice(0, 100);
    }
}

export {candidate, population}