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
