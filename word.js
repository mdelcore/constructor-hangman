function ArtistName(name) {
  this.name = name;
}

ArtistName.prototype.printInfo = function() {
        console.log('Hip Hop Greats: ' + this.name);
      };

var phrases = [
    'Grandmaster Flash and The Furious Five', 
    'Afrika Bambaataa',
    'Public Enemy', 
    'Run DMC', 
    'The Fugees',
    'The Roots',
    'Common',
    'People Under the Stairs',
    'Beastie Boys',
    'X Clan',
    'Jungle Brothers',
    'The Pharcyde',
    'Dead Prez',
    'Digable Planets',
    'A Tribe Called Quest',
    'Souls of Mischief',
    'The Coup',
    'Del the Funky Homosapien',
    'WuTang Clan',
    'Lupe Fiasco',
    'Atmosphere',
    'Brand Nubian',
    'Cypress Hill',
    'Tupac Shakur',
    'Queen Latifah',
    'Digital Underground',
    'Boogie Down Productions'
];

var artistList = new ArtistName(phrases);

// artistList.printInfo();

module.exports = phrases;