# NINJA BASHER

*Silent blade. Endless patrol.*

**Ninja Basher** is a fast, colorful 3D survivors-like browser game based on `mreflow/cube-basher`. You play as a ninja fighting waves of camouflaged soldiers across a low-poly world, leveling up auto-firing weapons, climbing cliffs, smashing pots for food, defeating five commanders, and banking gold for permanent dojo upgrades.

The whole game is a single `index.html` file. No build step, no dependencies to install, and it is ready for static hosting on Netlify.

## Features

- **30-minute runs** across a large low-poly world with rolling hills, climbable mesas, and cliff ledges
- **3 playable ninja variants**: balanced Shadow, speedy Swift, and tanky Iron
- **7 auto-firing weapons** with 8 levels each: Shadow Katana, Smoke Orbs, Explosive Kunai, Storm Scroll, Returning Shuriken, Smoke Bomb, and Piercing Dart
- **6 camouflaged soldier enemy types**: infantry, scouts, heavies, ranged launchers, elites, and five named commanders
- **Metaprogression**: gold earned in runs becomes permanent coins spent on dojo upgrades
- Combo system, gem-vacuum power-ups, breakable health pots, crit slow-mo, procedural chiptune soundtrack

## Controls

| Input | Action |
|---|---|
| `W A S D` / arrows | Move relative to camera |
| `Shift` | Sprint |
| `Space` | Jump, dodge enemies, climb ledges |
| Mouse drag | Orbit the camera |
| Scroll wheel | Zoom |
| `P` / `Esc` | Pause |
| `M` | Mute |

Weapons fire automatically. Your job is to move, dodge, and choose upgrades.

## Run Locally

Because the game uses JavaScript modules, serve it over HTTP instead of double-clicking the file:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Deploy To Netlify

Deploy this repo as a static site with the publish directory set to the repository root. There is no build command.

## Requirements

A modern desktop browser and an internet connection on first load. The game loads three.js and fonts from CDNs, and save data lives in browser local storage.

## Credits

Based on [mreflow/cube-basher](https://github.com/mreflow/cube-basher), whose README says: "Do whatever you want with it."
