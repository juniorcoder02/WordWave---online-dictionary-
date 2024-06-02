
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const wordInput = document.getElementById('word-input');
    const cardBody = document.getElementById('card-body');
    const clearBtn = document.getElementById('clear-btn');
  
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const word = wordInput.value.trim();
      if (word) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        if (response.ok) {
          const meanings = data[0].meanings.map((meaning) => {
            return `
              <h2>${meaning.partOfSpeech}</h2>
              <p>${meaning.definitions[0].definition}</p>
            `;
          }).join('');
          cardBody.innerHTML = `<h2>${data[0].word}</h2>${meanings}`;
        } else {
          cardBody.innerHTML = `<p>${data.title || 'Error'}</p>`;
        }
      }
    });
  
    clearBtn.addEventListener('click', () => {
      wordInput.value = '';
      cardBody.innerHTML = '';
    });
  });
  