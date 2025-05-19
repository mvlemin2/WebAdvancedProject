
    //const clickButton = document.getElementById('clickButton');

    //const counterElement = document.querySelector('.counter');
    //const messageElement = document.querySelector('.message');
    
    // Een functie die wacht op een klik
    function wachtOpKlik() {
      return new Promise(resolve => {
        const handleClick = () => {
          // Verwijder de event listener na afhandelen
          clickButton.removeEventListener('click', handleClick);
          resolve();
        };
        clickButton.addEventListener('click', handleClick);
      });
    }
    
    // De hoofdfunctie die de teller bijhoudt met async/await
    async function startCounter() {
      let count = 0;
      
      // Loop tot we 10 tikken hebben
      while (count < 10) {
        // Wacht op een klik
        await wachtOpKlik();
        
        // Update de teller
        count++;
        //counterElement.textContent = count;
        
        console.log(`Klik ${count} geregistreerd`);
      }
      
      // Toon het felicitatiebericht
      alert("Schakel nu over op de Premium-versie zonder advertenties!");
      count = 0;
      //messageElement.textContent = 'Gefeliciteerd! Je hebt 5 keer geklikt.';
      //clickButton.disabled = true;
    }
    
    // Start de teller functie
    startCounter();
