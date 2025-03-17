// Object mapping classes to their specs, roles, tier tokens, and armor types
const classSpecs = {
  "Death Knight": {
    tierToken: "Dreadful",
    armorType: "Plate",
    specs: [
      { name: "Blood", role: "Tank" },
      { name: "Frost", role: "Melee" },
      { name: "Unholy", role: "Melee" }
    ]
  },
  "Demon Hunter": {
    tierToken: "Dreadful",
    armorType: "Leather",
    specs: [
      { name: "Havoc", role: "Melee" },
      { name: "Vengeance", role: "Tank" }
    ]
  },
  "Druid": {
    tierToken: "Mystic",
    armorType: "Leather",
    specs: [
      { name: "Balance", role: "Ranged" },
      { name: "Feral", role: "Melee" },
      { name: "Guardian", role: "Tank" },
      { name: "Restoration", role: "Healer" }
    ]
  },
  "Evoker": {
    tierToken: "Zenith",
    armorType: "Mail",
    specs: [
      { name: "Devastation", role: "Ranged" },
      { name: "Preservation", role: "Healer" },
      { name: "Augmentation", role: "Ranged" }
    ]
  },
  "Hunter": {
    tierToken: "Mystic",
    armorType: "Mail",
    specs: [
      { name: "Beast Mastery", role: "Ranged" },
      { name: "Marksmanship", role: "Ranged" },
      { name: "Survival", role: "Melee" }
    ]
  },
  "Mage": {
    tierToken: "Mystic",
    armorType: "Cloth",
    specs: [
      { name: "Arcane", role: "Ranged" },
      { name: "Fire", role: "Ranged" },
      { name: "Frost", role: "Ranged" }
    ]
  },
  "Monk": {
    tierToken: "Zenith",
    armorType: "Leather",
    specs: [
      { name: "Brewmaster", role: "Tank" },
      { name: "Mistweaver", role: "Healer" },
      { name: "Windwalker", role: "Melee" }
    ]
  },
  "Paladin": {
    tierToken: "Venerated",
    armorType: "Plate",
    specs: [
      { name: "Holy", role: "Healer" },
      { name: "Protection", role: "Tank" },
      { name: "Retribution", role: "Melee" }
    ]
  },
  "Priest": {
    tierToken: "Venerated",
    armorType: "Cloth",
    specs: [
      { name: "Discipline", role: "Healer" },
      { name: "Holy", role: "Healer" },
      { name: "Shadow", role: "Ranged" }
    ]
  },
  "Rogue": {
    tierToken: "Zenith",
    armorType: "Leather",
    specs: [
      { name: "Assassination", role: "Melee" },
      { name: "Outlaw", role: "Melee" },
      { name: "Subtlety", role: "Melee" }
    ]
  },
  "Shaman": {
    tierToken: "Venerated",
    armorType: "Mail",
    specs: [
      { name: "Elemental", role: "Ranged" },
      { name: "Enhancement", role: "Melee" },
      { name: "Restoration", role: "Healer" }
    ]
  },
  "Warlock": {
    tierToken: "Dreadful",
    armorType: "Cloth",
    specs: [
      { name: "Affliction", role: "Ranged" },
      { name: "Demonology", role: "Ranged" },
      { name: "Destruction", role: "Ranged" }
    ]
  },
  "Warrior": {
    tierToken: "Zenith",
    armorType: "Plate",
    specs: [
      { name: "Arms", role: "Melee" },
      { name: "Fury", role: "Melee" },
      { name: "Protection", role: "Tank" }
    ]
  }
};

// Blizzard API credentials
const CLIENT_ID = '1c3d4ca3eb544259ae2b902892d4f1c6'; // Replace with your Client ID
const CLIENT_SECRET = 'tXVBRbipkKCeJZ8VijFM3JUQmlcl8Orz'; // Replace with your Client Secret

// Array to store players
let players = [];

// Load players from localStorage on page load
if (localStorage.getItem('players')) {
  players = JSON.parse(localStorage.getItem('players'));
  renderPlayerTable();
}

// Function to save players to localStorage
function savePlayers() {
  localStorage.setItem('players', JSON.stringify(players));
}

// Function to render the player table
function renderPlayerTable() {
  const playerList = document.getElementById('player-list');
  playerList.innerHTML = ''; // Clear the table

  // Update the total player count
  const totalPlayers = document.getElementById('total-players');
  totalPlayers.textContent = `(${players.length})`;

  players.forEach((player, index) => {
    const row = document.createElement('tr');

    // Find the player's role, tier token, and armor type based on their class and spec
    const playerClass = classSpecs[player.class];
    const playerSpec = playerClass.specs.find(spec => spec.name === player.spec);
    const playerRole = playerSpec ? playerSpec.role : 'Unknown';
    const playerTierToken = playerClass.tierToken;
    const playerArmorType = playerClass.armorType;

    // Add player data to the row
    row.innerHTML = `
      <td>
        <div class="player-name ${player.class.toLowerCase().replace(' ', '-')}">
          <span>${player.name}</span>
          <button onclick="editName(${index})">Edit</button>
        </div>
      </td>
      <td>
        <div class="player-class">
          <span>${player.class}</span>
        </div>
      </td>
      <td>
        <div class="player-spec">
          <span>${player.spec}</span>
          <button onclick="editSpec(${index})">Edit</button>
        </div>
      </td>
      <td>${playerRole}</td>
      <td>${playerTierToken}</td>
      <td>${playerArmorType}</td>
      <td>
        <div class="player-weighting">
          <span>${player.weighting}</span>
          <button onclick="editWeighting(${index})">Edit</button>
        </div>
      </td>
      <td class="actions">
        <button onclick="removePlayer(${index})">Remove</button>
      </td>
    `;

    playerList.appendChild(row);
  });

  // Save players to localStorage
  savePlayers();
}

// Function to add a player
document.getElementById('add-player-button').addEventListener('click', () => {
  const name = document.getElementById('player-name').value;
  const playerClass = document.getElementById('player-class').value;
  const spec = document.getElementById('player-spec').value;
  const weighting = parseFloat(document.getElementById('player-weighting').value);

  // Create player object
  const player = { name, class: playerClass, spec, weighting };
  players.push(player);

  // Clear input fields
  document.getElementById('player-name').value = '';
  document.getElementById('player-weighting').value = 1.0;

  // Render the updated player table
  renderPlayerTable();
});

// Function to populate the spec dropdown based on the selected class
document.getElementById('player-class').addEventListener('change', () => {
  const selectedClass = document.getElementById('player-class').value;
  const specDropdown = document.getElementById('player-spec');
  specDropdown.innerHTML = '<option value="">Select Spec</option>'; // Clear the dropdown and add a default option

  // Check if the selected class exists in classSpecs
  if (classSpecs[selectedClass]) {
    // Add specs for the selected class
    classSpecs[selectedClass].specs.forEach(spec => {
      const option = document.createElement('option');
      option.value = spec.name;
      option.textContent = spec.name;
      specDropdown.appendChild(option);
    });
  } else {
    console.error(`Class "${selectedClass}" not found in classSpecs.`);
  }
});

// Function to edit a player's name
function editName(index) {
  const nameCell = document.querySelectorAll('.player-name')[index];
  const currentName = players[index].name;

  // Create an input field
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentName;
  input.className = 'edit-input';

  // Replace the name with the input field
  nameCell.innerHTML = '';
  nameCell.appendChild(input);

  // Focus the input field
  input.focus();

  // Save the new name when the user presses Enter
  input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      players[index].name = input.value;
      renderPlayerTable(); // Update the table
    }
  });
}

// Function to edit a player's spec
function editSpec(index) {
  const specCell = document.querySelectorAll('.player-spec')[index];
  const currentSpec = players[index].spec;
  const playerClass = players[index].class;

  // Create a container for the dropdown and save button
  const container = document.createElement('div');
  container.className = 'spec-edit-container';

  // Create a dropdown for specs
  const select = document.createElement('select');
  select.className = 'edit-input';

  // Add specs based on the player's class
  classSpecs[playerClass].specs.forEach(spec => {
    const option = document.createElement('option');
    option.value = spec.name;
    option.textContent = spec.name;
    select.appendChild(option);
  });

  // Set the current spec as selected
  select.value = currentSpec;

  // Create a save button
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.className = 'save-spec-button';

  // Replace the spec with the dropdown and save button
  specCell.innerHTML = '';
  container.appendChild(select);
  container.appendChild(saveButton);
  specCell.appendChild(container);

  // Save the new spec when the save button is clicked
  saveButton.addEventListener('click', () => {
    players[index].spec = select.value;
    renderPlayerTable(); // Update the table
  });
}

// Function to edit a player's weighting
function editWeighting(index) {
  const weightingCell = document.querySelectorAll('.player-weighting')[index];
  const currentWeighting = players[index].weighting;

  // Create an input field
  const input = document.createElement('input');
  input.type = 'number';
  input.value = currentWeighting;
  input.className = 'edit-input';

  // Replace the weighting with the input field
  weightingCell.innerHTML = '';
  weightingCell.appendChild(input);

  // Focus the input field
  input.focus();

  // Save the new weighting when the user presses Enter
  input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      players[index].weighting = parseFloat(input.value);
      renderPlayerTable(); // Update the table
    }
  });
}

// Function to remove a player
function removePlayer(index) {
  if (confirm(`Are you sure you want to remove ${players[index].name}?`)) {
    players.splice(index, 1); // Remove the player
    savePlayers(); // Update localStorage
    renderPlayerTable(); // Update the table
  }
}

// Function to save the roster to a file
document.getElementById('save-roster-button').addEventListener('click', () => {
  const roster = JSON.stringify(players, null, 2);
  const blob = new Blob([roster], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // Create a temporary link to download the file
  const a = document.createElement('a');
  a.href = url;
  a.download = 'roster.json';
  a.click();

  // Clean up
  URL.revokeObjectURL(url);
});

// Function to load the roster from a file
document.getElementById('load-roster-button').addEventListener('click', () => {
  document.getElementById('roster-file').click();
});

document.getElementById('roster-file').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newPlayers = JSON.parse(e.target.result);

      // Replace the current roster with the uploaded roster
      players.length = 0; // Clear the current roster
      players.push(...newPlayers); // Add all players from the file

      renderPlayerTable(); // Update the table

      // Reset the file input to allow uploading the same file again
      event.target.value = '';
    };
    reader.readAsText(file);
  }
});

// Track the current sorting state
let currentSortColumn = null;
let isAscending = true;

// Function to sort the table by a specific column
function sortTable(columnIndex, isNumeric = false) {
  players.sort((a, b) => {
    let keyA, keyB;

    switch (columnIndex) {
      case 0: // Name
        keyA = a.name;
        keyB = b.name;
        break;
      case 1: // Class
        keyA = a.class;
        keyB = b.class;
        break;
      case 3: // Role
        keyA = a.role;
        keyB = b.role;
        break;
      case 4: // Tier Token
        keyA = classSpecs[a.class].tierToken;
        keyB = classSpecs[b.class].tierToken;
        break;
      case 5: // Armor Type
        keyA = classSpecs[a.class].armorType;
        keyB = classSpecs[b.class].armorType;
        break;
      case 6: // Weighting
        keyA = a.weighting;
        keyB = b.weighting;
        break;
      default:
        return 0; // No sorting for other columns
    }

    if (isNumeric) {
      // Convert to numbers for accurate decimal sorting
      const numA = parseFloat(keyA);
      const numB = parseFloat(keyB);
      console.log(`Sorting: ${numA} vs ${numB}`); // Debugging
      return isAscending ? numA - numB : numB - numA; // Sort numbers
    } else {
      return isAscending ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA); // Sort strings
    }
  });

  renderPlayerTable(); // Re-render the table
}

// Function to update the sorting icons
function updateSortIcons(columnIndex) {
  const headers = document.querySelectorAll('#player-table th');
  headers.forEach((header, index) => {
    // Remove all existing icons
    header.innerHTML = header.textContent.replace(/ [▲▼]/g, '');

    // Add the icon to the current column (only for sortable columns)
    if (index === columnIndex && [0, 1, 3, 4, 5, 6].includes(index)) {
      header.innerHTML += isAscending ? ' ▲' : ' ▼';
    }
  });
}

// Add event listeners to the table headers
document.querySelectorAll('#player-table th').forEach((header, index) => {
  header.addEventListener('click', () => {
    // Only allow sorting for Name (0), Class (1), Role (3), Tier Token (4), Armor Type (5), and Weighting (6) columns
    if ([0, 1, 3, 4, 5, 6].includes(index)) {
      if (currentSortColumn === index) {
        // Toggle sorting order if the same column is clicked again
        isAscending = !isAscending;
      } else {
        // Sort by the new column in ascending order
        currentSortColumn = index;
        isAscending = true;
      }

      switch (index) {
        case 0: // Name
        case 1: // Class
        case 3: // Role
        case 4: // Tier Token
        case 5: // Armor Type
          sortTable(index); // Sort alphabetically
          break;
        case 6: // Weighting
          sortTable(index, true); // Sort numerically
          break;
        default:
          break;
      }

      updateSortIcons(index); // Update sorting icons
    }
  });
});

// Function to clear the roster
function clearRoster() {
  if (confirm("Are you sure you want to clear the entire roster? This cannot be undone.")) {
    players = []; // Clear the players array
    savePlayers(); // Update localStorage
    renderPlayerTable(); // Clear the table
  }
}

// Add event listener for the Clear Roster button
document.getElementById('clear-roster-button').addEventListener('click', clearRoster);

// Function to switch tabs
function switchTab(event) {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  // Remove the "active" class from all tabs and buttons
  tabButtons.forEach(button => button.classList.remove('active'));
  tabContents.forEach(content => content.classList.remove('active'));

  // Add the "active" class to the clicked tab and its corresponding content
  const targetTab = event.target.getAttribute('data-tab');
  document.getElementById(targetTab).classList.add('active');
  event.target.classList.add('active');

  // Re-render the content based on the selected tab
  if (targetTab === 'player-table') {
    renderPlayerTable(); // Re-render the player table
  } else if (targetTab === 'second-table') {
    populateBossCategories(); // Re-render the boss assignments
  } else if (targetTab === 'boss-info') {
    renderBossInfo(); // Re-render the boss info
  }
}

// Add event listeners to tab buttons
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', switchTab);
});

// Function to populate boss categories with players
function populateBossCategories() {
  const bosses = document.querySelectorAll('.boss');

  bosses.forEach(boss => {
    const categories = boss.querySelector('.categories');
    const meleeCategory = categories.children[0];
    const rangedCategory = categories.children[1];
    const healersCategory = categories.children[2];
    const tanksCategory = categories.children[3];

    // Clear existing content (only for this boss)
    meleeCategory.innerHTML = 'Melee';
    rangedCategory.innerHTML = 'Ranged';
    healersCategory.innerHTML = 'Healers';
    tanksCategory.innerHTML = 'Tanks';

    // Populate categories with players
    players.forEach(player => {
      const playerElement = document.createElement('div');
      playerElement.textContent = player.name;

      // Add both the player-assignment and class-specific background color classes
      playerElement.className = `player-assignment ${player.class.toLowerCase().replace(' ', '-')}`;

      const playerClass = classSpecs[player.class];
      const playerSpec = playerClass.specs.find(spec => spec.name === player.spec);
      const playerRole = playerSpec ? playerSpec.role : 'Unknown';

      switch (playerRole) {
        case 'Melee':
          meleeCategory.appendChild(playerElement);
          break;
        case 'Ranged':
          rangedCategory.appendChild(playerElement);
          break;
        case 'Healer':
          healersCategory.appendChild(playerElement);
          break;
        case 'Tank':
          tanksCategory.appendChild(playerElement);
          break;
      }
    });
  });
}

function capitalizeWords(str) {
  return str
    .split(' ') // Split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words back into a single string
}

// Blizzard API integration for Boss Info tab
const BOSS_DATA_KEY = 'bossData';

// Function to get an access token
async function getAccessToken() {
  const response = await fetch(`https://us.battle.net/oauth/token?grant_type=client_credentials`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}

async function fetchRaidData(accessToken) {
  const response = await fetch('https://us.api.blizzard.com/data/wow/journal-expansion/index?namespace=static-us&locale=en_US', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Check if the response is OK (status code 200-299)
  if (!response.ok) {
    throw new Error(`Failed to fetch raid data: ${response.status} ${response.statusText}`);
  }

  // Parse the response as JSON
  const data = await response.json();
  return data;
}

async function fetchItemDetails(itemId, accessToken) {
  const response = await fetch(`https://us.api.blizzard.com/data/wow/item/${itemId}?namespace=static-us&locale=en_US`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch item details: ${response.status} ${response.statusText}`);
  }

  const itemDetails = await response.json();
  return itemDetails;
}

// Function to fetch boss data for a raid
async function fetchBosses(raidId, accessToken) {
  const response = await fetch(`https://us.api.blizzard.com/data/wow/raid/${raidId}?namespace=static-us&locale=en_US`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data.bosses;
}

async function fetchAndSaveBossData() {
  try {
    // Step 1: Fetch access token
    const accessToken = await getAccessToken();
    console.log('Access Token:', accessToken);

    // Step 2: Fetch raid data
    const raidData = await fetchRaidData(accessToken);
    console.log('Raid Data:', raidData);

    // Step 3: Find the current raid (e.g., the last item in the tiers array)
    const currentRaid = raidData.tiers[raidData.tiers.length - 1];
    if (!currentRaid) {
      throw new Error('Current raid not found in raid data.');
    }
    console.log('Current Raid:', currentRaid);

    // Step 4: Fetch boss data for the current raid
    const bossResponse = await fetch(`https://us.api.blizzard.com/data/wow/journal-expansion/${currentRaid.id}?namespace=static-us&locale=en_US`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!bossResponse.ok) {
      throw new Error(`Failed to fetch boss data: ${bossResponse.status} ${bossResponse.statusText}`);
    }

    const bossData = await bossResponse.json();
    console.log('Boss Data:', bossData);

    // Step 5: Find the current raid tier (the last item in the raids array)
    const currentRaidTier = bossData.raids[bossData.raids.length - 1];
    if (!currentRaidTier) {
      throw new Error('Current raid tier not found in boss data.');
    }
    console.log('Current Raid Tier:', currentRaidTier);

    // Step 6: Fetch boss data for the current raid tier
    const raidTierBossResponse = await fetch(`https://us.api.blizzard.com/data/wow/journal-instance/${currentRaidTier.id}?namespace=static-us&locale=en_US`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!raidTierBossResponse.ok) {
      throw new Error(`Failed to fetch boss data for current raid tier: ${raidTierBossResponse.status} ${raidTierBossResponse.statusText}`);
    }

    const raidTierBossData = await raidTierBossResponse.json();
    console.log('Current Raid Tier Boss Data:', raidTierBossData);

    // Step 7: Fetch loot for each boss
    const bossesWithLoot = await Promise.all(
      raidTierBossData.encounters.map(async (boss) => {
        const lootResponse = await fetch(`https://us.api.blizzard.com/data/wow/journal-encounter/${boss.id}?namespace=static-us&locale=en_US`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!lootResponse.ok) {
          throw new Error(`Failed to fetch loot for boss ${boss.id}: ${lootResponse.status} ${lootResponse.statusText}`);
        }

        const lootData = await lootResponse.json();
        console.log('Loot Data for Boss:', boss.name, lootData);

        // Fetch item details for each loot item
        const lootWithDetails = await Promise.all(
          lootData.items.map(async (item) => {
            const itemDetails = await fetchItemDetails(item.item.id, accessToken);
            return {
              ...item,
              details: itemDetails, // Add item details to the loot object
            };
          })
        );

        return {
          ...boss,
          loot: lootWithDetails, // Add loot data (with details) to the boss object
        };
      })
    );

    // Step 8: Save boss data (with loot) to localStorage
    localStorage.setItem(BOSS_DATA_KEY, JSON.stringify(bossesWithLoot));
    console.log('Boss data (with loot) saved to localStorage');

    // Step 9: Render the data
    renderBossInfo();
  } catch (error) {
    console.error('Error fetching boss data:', error);
    alert(`Failed to fetch boss data: ${error.message}`);
  }
}

function renderBossInfo() {
  const bossLootContainer = document.getElementById('boss-loot-container');
  bossLootContainer.innerHTML = ''; // Clear existing content

  const bossData = JSON.parse(localStorage.getItem(BOSS_DATA_KEY)) || [];

  if (bossData.length === 0) {
    bossLootContainer.innerHTML = '<p>No boss data available.</p>';
    return;
  }

  // Get filter values
  const itemTypeFilter = document.getElementById('item-type-filter').value.toLowerCase();
  const bisFilter = document.getElementById('bis-filter').value.toLowerCase();
  const searchQuery = document.getElementById('search-loot').value.toLowerCase();

  // Render each boss
  bossData.forEach((boss) => {
    const bossSection = document.createElement('div');
    bossSection.className = 'boss-section';

    // Boss header
    const bossHeader = document.createElement('div');
    bossHeader.className = 'boss-header';
    bossHeader.innerHTML = `<h4>${boss.name}</h4>`;
    bossSection.appendChild(bossHeader);

    // Boss loot table
    const bossLoot = document.createElement('div');
    bossLoot.className = 'boss-loot';

    if (boss.loot && boss.loot.length > 0) {
      const table = document.createElement('table');
      table.innerHTML = `
        <thead>
          <tr>
            <th>Loot</th>
            <th>Item Type</th>
            <th>BiS For</th>
          </tr>
        </thead>
        <tbody>
          ${boss.loot
            .map((item) => {
              const itemType = getItemTypeDescription(item.details);
              const bisFor = getBiSFor(item.details); // Function to determine BiS For

              // Skip items that don't match filters
              if (itemTypeFilter && !itemType.toLowerCase().includes(itemTypeFilter)) return '';
              if (bisFilter && !bisFor.toLowerCase().includes(bisFilter)) return '';
              if (searchQuery && !item.item.name.toLowerCase().includes(searchQuery)) return '';

              return `
                <tr>
                  <td>${item.item.name}</td>
                  <td>${itemType}</td>
                  <td>${bisFor}</td>
                </tr>
              `;
            })
            .join('')}
        </tbody>
      `;
      bossLoot.appendChild(table);
    } else {
      bossLoot.innerHTML = '<p>No loot data available.</p>';
    }

    bossSection.appendChild(bossLoot);
    bossLootContainer.appendChild(bossSection);
  });

  // Add event listeners for expand/collapse
  document.querySelectorAll('.boss-header').forEach((header) => {
    header.addEventListener('click', () => {
      const bossSection = header.parentElement;
      bossSection.classList.toggle('expanded');
    });
  });
}

// Helper function to determine BiS For
function getBiSFor(itemDetails) {
  // Add logic to determine which classes/specs this item is BiS for
  // Example: If the item is a weapon, check its stats or type
  return 'All'; // Placeholder
}

// Add event listeners for filters and search
document.getElementById('item-type-filter').addEventListener('change', renderBossInfo);
document.getElementById('bis-filter').addEventListener('change', renderBossInfo);
document.getElementById('search-loot').addEventListener('input', renderBossInfo);

// Helper function to generate item type descriptions
function getItemTypeDescription(itemDetails) {
  // Log the full itemDetails object for debugging
  console.log('Item Details:', itemDetails);

  const itemClass = (itemDetails?.item_class?.name || 'Unknown').toLowerCase();
  const itemSubclass = (itemDetails?.item_subclass?.name || 'Unknown').toLowerCase();
  const inventoryType = (itemDetails?.inventory_type?.type || 'Unknown').toLowerCase();
  const inventoryTypeName = (itemDetails?.inventory_type?.name || 'Unknown').toLowerCase();

  // Exclude Mounts
  if (itemClass === 'miscellaneous' && itemSubclass === 'mount') {
    return null; // Skip this item
  }

  let itemType = '';

  // Handle Weapons
  if (itemClass === 'weapon') {
    itemType = `${inventoryTypeName} ${itemSubclass}`;
  }
  // Handle Recipes (ignore them)
  else if (itemClass === 'recipe') {
    return null; // Skip this item
  }
  // Handle Armor
  else if (itemClass === 'armor') {
    if (itemSubclass === 'miscellaneous') {
      if (inventoryType === 'finger') {
        itemType = 'Ring';
      } else {
        itemType = inventoryTypeName; // Use inventory_type.name
      }
    } else if (inventoryType === 'cloak') {
      itemType = 'Cloak';
    } else if (itemSubclass === 'miscellaneous' && inventoryType === 'trinket') {
      itemType = 'Trinket';
    } else {
      itemType = `${itemSubclass} ${inventoryTypeName}`; // Use inventory_type.name
    }
  }
  // Handle Reagents
  else if (itemClass === 'reagent') {
    itemType = 'Omni-Token';
  }
  // Handle Miscellaneous
  else if (itemClass === 'miscellaneous') {
    if (itemSubclass === 'junk' && inventoryTypeName === 'non-equippable') {
      itemType = 'Tier Token';
    }
  }
  // Default case
  else {
    itemType = `${itemSubclass}`;
  }

  // Capitalize the first letter of each word in the item type
  return capitalizeWords(itemType);
}

// Add event listener to the fetch button
document.getElementById('fetch-boss-data-button').addEventListener('click', fetchAndSaveBossData);

// Load and render boss data on page load
document.addEventListener('DOMContentLoaded', () => {
  renderBossInfo();
});

// Function to populate the Slotting tab with bosses
function populateSlottingTab() {
  const bossContainer = document.getElementById('boss-container');
  bossContainer.innerHTML = ''; // Clear existing content

  const bossData = JSON.parse(localStorage.getItem(BOSS_DATA_KEY)) || [];

  if (bossData.length === 0) {
    bossContainer.innerHTML = '<p>No boss data available.</p>';
    return;
  }

  // Group bosses into rows of 4
  for (let i = 0; i < bossData.length; i += 4) {
    const bossRow = document.createElement('div');
    bossRow.className = 'boss-row';

    // Add up to 4 bosses per row
    for (let j = i; j < i + 4 && j < bossData.length; j++) {
      const boss = bossData[j];

      const bossDiv = document.createElement('div');
      bossDiv.className = 'boss';

      // Boss header
      const bossHeader = document.createElement('h4');
      bossHeader.textContent = boss.name;
      bossDiv.appendChild(bossHeader);

      // Categories (Melee, Ranged, Healers, Tanks)
      const categoriesDiv = document.createElement('div');
      categoriesDiv.className = 'categories';

      const meleeCategory = document.createElement('div');
      meleeCategory.className = 'category';
      meleeCategory.textContent = 'Melee';
      categoriesDiv.appendChild(meleeCategory);

      const rangedCategory = document.createElement('div');
      rangedCategory.className = 'category';
      rangedCategory.textContent = 'Ranged';
      categoriesDiv.appendChild(rangedCategory);

      const healersCategory = document.createElement('div');
      healersCategory.className = 'category';
      healersCategory.textContent = 'Healers';
      categoriesDiv.appendChild(healersCategory);

      const tanksCategory = document.createElement('div');
      tanksCategory.className = 'category';
      tanksCategory.textContent = 'Tanks';
      categoriesDiv.appendChild(tanksCategory);

      bossDiv.appendChild(categoriesDiv);
      bossRow.appendChild(bossDiv);
    }

    bossContainer.appendChild(bossRow);
  }
}

// Call this function when switching to the Slotting tab
function switchTab(event) {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  // Remove the "active" class from all tabs and buttons
  tabButtons.forEach(button => button.classList.remove('active'));
  tabContents.forEach(content => content.classList.remove('active'));

  // Add the "active" class to the clicked tab and its corresponding content
  const targetTab = event.target.getAttribute('data-tab');
  document.getElementById(targetTab).classList.add('active');
  event.target.classList.add('active');

  // Re-render the content based on the selected tab
  if (targetTab === 'player-table') {
    renderPlayerTable(); // Re-render the player table
  } else if (targetTab === 'second-table') {
    populateSlottingTab(); // Re-render the slotting tab
  } else if (targetTab === 'boss-info') {
    renderBossInfo(); // Re-render the boss info
  }
}
