// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (specimenNum, dna) => ({
  specimenNum,
  dna,
  mutate: function() {
    const dnaBases = ['A', 'T', 'C', 'G'];
    const randomIndex = Math.floor(Math.random() * this.dna.length);
    const currentBase = this.dna[randomIndex];
    let newBase;
    do {
      newBase = dnaBases[Math.floor(Math.random() * dnaBases.length)];
    } while (newBase === currentBase);
    this.dna[randomIndex] = newBase;
    return this.dna;
  },
  compareDNA: function(otherPAequor) {
    let commonBases = 0;
    for (let i = 0; i < this.dna.length; i++) {
      if (this.dna[i] === otherPAequor.dna[i]) {
        commonBases++;
      }
    }
    const percentageDNAInCommon = (commonBases / this.dna.length) * 100;
    console.log(`specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${percentageDNAInCommon.toFixed(2)}% DNA in common.`);
  },
  willLikelySurvive: function() {
    const cAndGBases = this.dna.filter(base => base === 'C' || base === 'G');
    return (cAndGBases.length / this.dna.length) >= 0.6;
  },
  // Ajoutez ici d'autres méthodes
});

// Créez 30 instances capables de survivre
let pAequorInstances = [];
let id = 1;
while (pAequorInstances.length < 30) {
  let newPAequor = pAequorFactory(id, mockUpStrand());
  if (newPAequor.willLikelySurvive()) {
    pAequorInstances.push(newPAequor);
    id++;
  }
}
