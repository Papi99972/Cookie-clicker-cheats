(function () {
  const intervalCheck = setInterval(function () {
    if (typeof Game !== 'undefined' && Game.cookies !== undefined) {
      clearInterval(intervalCheck);

      const game = Game;

      // Main Cheat Menu
      const menu = document.createElement('div');
      menu.style.position = 'absolute';
      menu.style.top = '10px';
      menu.style.right = '10px';
      menu.style.background = 'black';
      menu.style.color = '#00FF00';
      menu.style.padding = '20px';
      menu.style.borderRadius = '10px';
      menu.style.fontFamily = 'monospace';
      menu.style.zIndex = '99999';
      menu.style.width = '350px';
      menu.style.height = '400px';
      menu.style.overflowY = 'auto';
      menu.style.resize = 'both';
      menu.style.boxShadow = '0 0 20px 4px rgba(0, 255, 0, 0.7)';
      menu.style.transition = 'width 0.2s ease, height 0.2s ease';
      menu.style.position = 'absolute';
      menu.style.overflow = 'hidden';

      // Matrix Background for Cheat Menu
      const matrixCanvas = document.createElement('canvas');
      matrixCanvas.style.position = 'absolute';
      matrixCanvas.style.top = '0';
      matrixCanvas.style.left = '0';
      matrixCanvas.width = 350;
      matrixCanvas.height = 400;
      matrixCanvas.style.zIndex = '-1';
      menu.appendChild(matrixCanvas);

      const ctx = matrixCanvas.getContext('2d');
      const fontSize = 16;
      const columns = Math.floor(matrixCanvas.width / fontSize);
      const drops = Array(columns).fill(1);

      function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        ctx.fillStyle = '#00FF00';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = Math.random() > 0.5 ? '1' : '0';
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.95) {
            drops[i] = 0;
          }

          drops[i]++;
        }
      }
      setInterval(drawMatrix, 50);

      // Title
      const title = document.createElement('h3');
      title.textContent = 'Project Cookie Overthrow';
      title.style.textAlign = 'center';
      title.style.color = '#00FF00';
      title.style.textShadow = '0 0 8px #00FF00';
      menu.appendChild(title);

      // Function to Create Buttons with Descriptions
      function createButton(text, description, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.title = description; // Tooltip
        button.style.width = '100%';
        button.style.padding = '10px';
        button.style.marginBottom = '10px';
        button.style.background = 'black';
        button.style.color = '#00FF00';
        button.style.border = '2px solid #00FF00';
        button.style.fontSize = '16px';
        button.style.cursor = 'pointer';
        button.style.boxShadow = '0 0 8px rgba(0, 255, 0, 0.5)';
        button.style.transition = 'all 0.1s ease';
        button.onmouseover = () => (button.style.boxShadow = '0 0 12px rgba(0, 255, 0, 1)');
        button.onmouseout = () => (button.style.boxShadow = '0 0 8px rgba(0, 255, 0, 0.5)');
        button.onmousedown = () => (button.style.transform = 'translateY(4px)');
        button.onmouseup = () => (button.style.transform = 'translateY(0)');
        button.onclick = onClick;
        menu.appendChild(button);
      }

      // Add Cheats
      createButton('Add Cookies', 'Set your cookies to a custom number.', () => {
        const value = prompt('Enter the number of cookies:');
        if (!isNaN(value)) {
          game.cookies = parseInt(value);
          game.cookiesOwned = parseInt(value);
          alert(`Cookies set to ${value}`);
        }
      });

      createButton('Unlock All Achievements', 'Unlock all achievements in the game.', () => {
        try {
          Object.keys(Game.AchievementsById).forEach(id => {
            Game.AchievementsById[id].unlock();
          });
          alert('All achievements unlocked!');
        } catch (error) {
          alert(`Error unlocking achievements: ${error.message}`);
        }
      });

      createButton('Unlock All Upgrades', 'Unlock and purchase all upgrades.', () => {
        try {
          Object.keys(Game.UpgradesById).forEach(id => {
            const upgrade = Game.UpgradesById[id];
            if (!upgrade.bought) upgrade.buy();
          });
          alert('All upgrades unlocked and purchased!');
        } catch (error) {
          alert(`Error unlocking upgrades: ${error.message}`);
        }
      });

      createButton('Set Prestige Level', 'Set your prestige level and heavenly chips.', () => {
        const prestige = prompt('Enter prestige level:');
        if (!isNaN(prestige)) {
          game.prestige = parseInt(prestige);
          Game.CalculateGains();
          alert(`Prestige set to ${prestige}.`);
        }
      });

      createButton('Add Sugar Lumps', 'Set the number of sugar lumps.', () => {
        const lumps = prompt('Enter the number of sugar lumps:');
        if (!isNaN(lumps)) {
          game.lumps = parseInt(lumps);
          alert(`Sugar lumps set to ${lumps}.`);
        }
      });

      createButton('Auto Clicker', 'Enable an auto-clicker for the big cookie.', () => {
        const delay = prompt('Enter delay in milliseconds (e.g., 100):', '100');
        if (!isNaN(delay)) {
          setInterval(() => {
            document.getElementById('bigCookie').click();
          }, parseInt(delay));
          alert(`Auto-clicker enabled with ${delay}ms delay.`);
        }
      });

      // Open Sesame Button (Triggers Open Sesame Command)
      createButton('Open Sesame', 'Unlock all features of the game instantly.', () => {
        if (Game.OpenSesame) {
          Game.OpenSesame(); // Triggering the Open Sesame command
          alert('Open Sesame activated. All features unlocked!');
        } else {
          alert('Error: Open Sesame command not available.');
        }
      });

      // Append Main Menu to Document
      document.body.appendChild(menu);
    }
  }, 100);
})();
