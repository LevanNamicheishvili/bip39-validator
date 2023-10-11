const fs = require('fs');
const bip39 = require('bip39');

function validateMnemonic(mnemonic) {
  return bip39.validateMnemonic(mnemonic);
}

function processFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const phrases = data.split('\n');
    const valid12WordPhrases = [];
    const valid18to24WordPhrases = [];

    phrases.forEach((phrase) => {
      if (phrase.trim() === '') {
        return;
      }

      if (validateMnemonic(phrase)) {
        const words = phrase.split(' ');
        if (words.length === 12) {
          valid12WordPhrases.push(phrase);
        } else if (words.length >= 18 && words.length <= 24) {
          valid18to24WordPhrases.push(phrase);
        }
      }
    });

    console.log('Valid 12-word phrases:');
    console.log(valid12WordPhrases);

    console.log('\nValid 18-24 word phrases:');
    console.log(valid18to24WordPhrases);

    // Write the valid phrases to the output file "output.txt"
    const outputFilePath = 'output.txt';
    fs.writeFile(outputFilePath, valid12WordPhrases.concat(valid18to24WordPhrases).join('\n'), (err) => {
      if (err) {
        console.error('Error writing output file:', err);
      } else {
        console.log(`Valid phrases saved to ${outputFilePath}`);
      }
    });
  });
}

const wordListFilePath = 'input.txt';

processFile(wordListFilePath);
