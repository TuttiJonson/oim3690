// 1. An array of five songs
const songs = [
  "Dua Lipa - New Rules",
  "The Weeknd - Blinding Lights",
  "Billie Eilish - Bad Guy",
  "Adele - Rolling in the Deep",
  "Calvin Harris - Summer (Remix)",
];

const list = document.querySelector("#playlist");
const count = document.querySelector("#song-count");

function render() {
  list.textContent = "";

  // 2. for...of loop that creates an <li> for each song and appends it
  for (const song of songs) {
    const li = document.createElement("li");
    li.textContent = song;

    // 3. if inside the loop that marks any song whose title contains "Remix"
    if (song.includes("Remix")) {
      li.textContent = song + " ★";
      li.style.fontWeight = "bold";
    }

    // Remove button that asks for confirmation first
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.style.marginLeft = "0.5rem";
    removeBtn.addEventListener("click", function () {
      if (confirm('Are you sure you want to remove "' + song + '"?')) {
        songs.splice(songs.indexOf(song), 1);
        render();
      }
    });
    li.appendChild(removeBtn);

    list.appendChild(li);
  }

  count.textContent = songs.length + " songs";
}

// Runs when the Add song button is clicked
document.querySelector("#song-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.querySelector("#song-input");
  songs.push(input.value.trim());
  input.value = "";
  render();
});

render();
