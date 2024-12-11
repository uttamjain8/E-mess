document.addEventListener("DOMContentLoaded", () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Get today's day
  const todayIndex = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
  const defaultDay = days[todayIndex]; // Match today's day

  const tabs = document.querySelectorAll('.tab');
  const mealCards = document.getElementById('meal-cards');

  // Paths to CSV
  const menuCSV = './data/menu.csv';
  const announcementsCSV = './data/announcements.csv';

  // Load announcements
  fetch(announcementsCSV)
    .then(response => response.text())
    .then(data => {
      const lines = data.split('\n');
      const announcement = lines[1]?.split(',')[1]?.trim();
      if (announcement) {
        const notificationBar = document.getElementById('notification-bar');
        notificationBar.textContent = announcement;
        notificationBar.classList.remove('hidden');
      }
    });

  // Highlight special items
  function highlightSpecial(item) {
    if (item.includes('*')) {
      const cleanedItem = item.replace('*', '').trim();
      return `<span class="special">${cleanedItem}<span class="badge">Special</span></span>`;
    }
    return item;
  }
  // Style Generic items
  function StyleGeneric(item) {
    if (item.includes('`')) {
      const cleanedItem = item.replace('`', '').trim();
      return `<span class="obvs">${cleanedItem}</span>`;
    }
    return item;
  }
  // Load menu
  function loadMenu(day) {
    fetch(menuCSV)
      .then(response => response.text())
      .then(data => {
        const rows = data.split('\n').filter(row => row.trim() !== ''); // Remove empty rows
        const parsedData = rows.map(row => row.split(',').map(col => col.trim())); // Split and trim all columns

        const header = parsedData[0].slice(1); // Meal names in the header (excluding 'Day' column)
        const dayRow = parsedData.find(row => row[0].toLowerCase() === day.toLowerCase()); // Find the row matching the day

        if (!dayRow) {
          console.error(`Day "${day}" not found in the CSV file.`);
          mealCards.innerHTML = `<p>No menu available for ${day}.</p>`;
          return;
        }

        const meals = header; // Meal names from the header row
        const menuItems = dayRow.slice(1); // Menu data for the day (excluding the "Day" column)

        // Render the menu
        mealCards.innerHTML = meals
          .map((meal, i) => `
            <div class="card">
              <h3>${meal}</h3>
              <ul>
                ${menuItems[i]?.split(';').map(item => `
                  <li>${highlightSpecial(item.trim())}</li>
                  <li>${StyleGeneric(item.trim())}</li>
                `).join('') || '<li>No menu available</li>'}
              </ul>
            </div>
          `)
          .join('');
      })
      .catch(error => {
        console.error("Error loading menu:", error);
        mealCards.innerHTML = `<p>Failed to load menu. Please try again later.</p>`;
      });
  }

  // Tab click events
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach(tab => tab.classList.remove('active'));
      tab.classList.add('active');
      loadMenu(tab.dataset.day);
    });

    if (tab.dataset.day === defaultDay) {
      tab.classList.add('active');
      loadMenu(tab.dataset.day);
    }
  });
});
