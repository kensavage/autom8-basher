# 🔨 CUBE BASHER

*They're evil cubes. You have a hammer.*

**Cube Basher** is a fast, colorful 3D survivors-like (think *Vampire Survivors* meets low-poly 3D) that runs entirely in your browser. Survive 30 minutes against an ever-growing horde of menacing cubes, level up auto-firing weapons, climb cliffs, smash pots for food, and take down five towering bosses — then bank your gold to permanently upgrade your character between runs.

The whole game is a single `index.html` file. No build step, no dependencies to install — just a browser.

## ✨ Features

- **30-minute runs** across a huge low-poly world with rolling hills, climbable mesas, and cliff ledges
- **3 playable characters** — balanced Bonky, speedy Zippy, and tanky Chonk
- **7 auto-firing weapons** (8 levels each): Basher Hammer, Bash Orbs, Fireball, Sky Zapper, Boomerang, Frost Nova, and the piercing Cube Cannon
- **11 in-run passive upgrades** plus a sprint system with stamina management
- **6 enemy types** — grunts, spider runners, tusked brutes, ranged spitters, elites, and five named bosses (MEGACUBE through OMEGACUBE)
- **Metaprogression** — gold earned in runs becomes permanent coins, spent in the Upgrade Lab on 8 permanent character upgrades (saved in your browser)
- **Combo system**, gem-vacuum power-ups, breakable health pots, crit slow-mo, procedural chiptune soundtrack

## 🎮 Controls

| Input | Action |
|---|---|
| `W A S D` / arrows | Move (relative to camera) |
| `Shift` (hold) | Sprint — drains stamina |
| `Space` | Jump — dodges enemies, climbs ledges |
| Mouse drag | Orbit the camera |
| Scroll wheel | Zoom |
| `P` / `Esc` | Pause |
| `M` | Mute |

Weapons fire automatically — your job is to move, dodge, and choose upgrades.

## 🕹️ How to Play

### Play in the browser (easiest)

If this repo is deployed (e.g. on Vercel or GitHub Pages), just open the link and click **BASH!** — nothing to install.

### Run it locally

Because the game uses JavaScript modules, browsers won't load it straight from a double-clicked file — it needs to be served over HTTP. Any tiny local server works; here's the easiest path per platform.

**1. Download the game** (all platforms):

```bash
git clone https://github.com/mreflow/cube-basher.git
cd cube-basher
```

…or click **Code → Download ZIP** on GitHub and unzip it.

**2. Start a local server in the game folder:**

**macOS** — Python 3 ships with the OS:

```bash
python3 -m http.server 8000
```

**Windows** — install [Python](https://www.python.org/downloads/) (check "Add to PATH" during install), then in Command Prompt or PowerShell:

```powershell
python -m http.server 8000
```

Or, if you have [Node.js](https://nodejs.org): `npx serve .`

**Linux** — Python 3 is almost certainly already installed:

```bash
python3 -m http.server 8000
```

**3. Play:** open [http://localhost:8000](http://localhost:8000) in your browser and click **BASH!**

> **Requirements:** a modern desktop browser (Chrome, Edge, Firefox, or Safari 16.4+) and an internet connection on first load (the three.js engine and fonts load from a CDN). Your save data (coins and Upgrade Lab purchases) lives in your browser's local storage.

## 📱 Mobile

**Cube Basher is not currently playable on mobile.** The game requires a keyboard (WASD / Shift / Space) and mouse — phones and tablets will load the menu but can't control the game. Touch controls may come in a future update.

## 🧱 Tech

- [three.js](https://threejs.org/) (WebGL) with bloom post-processing, dynamic shadows, and instanced rendering
- Procedural everything: terrain heightfield, enemy meshes, chiptune music, and sound effects synthesized in-browser
- Single-file architecture — the entire game is `index.html`

## 📄 License

Do whatever you want with it. Bash responsibly.
