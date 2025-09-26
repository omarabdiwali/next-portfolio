import { FaChess } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";
import { GiConwayLifeGlider, GiNotebook } from "react-icons/gi";
import { AiOutlineLineChart, AiFillBook } from "react-icons/ai";
import { BsWindowFullscreen, BsCardText } from "react-icons/bs";
import { MdGpsFixed } from "react-icons/md";
import { VscWholeWord } from "react-icons/vsc";

export const projects = [
  {
    title: ["CodeNexus AI", <RiAiGenerate className="text-emerald-400 text-3xl" key={0} /> ],
    body: ["A VSCode extension that allows users mention files to LLMs, with OpenRouter and Ollama integration. It also has an 'Agent' Mode, which will execute what the user wants.", "Node.js | OpenRouter | Ollama | VSCode | HTML | CSS"],
    footer: [ "https://github.com/omarabdiwali/codenexus-ai" ]
  },
  
  {
    title: ["AblyChess", <FaChess className="text-emerald-400 text-3xl" key={1} /> ],
    body: ["A online chess game where players are able to play against each other in private rooms, or against a computer.", "Next.js | Node.js | CSS | Ably | MongoDB"],
    footer: [ "https://github.com/omarabdiwali/ably-chess", "https://ably-chess.vercel.app" ],
  },

  {
    title: ["Cellular Automaton", <GiConwayLifeGlider className="text-emerald-400 text-3xl" key={2} />],
    body: ["A cellular automaton which combines 4 masks, customizable with different rules and neighbors, made with Next.js and WebGPU.", "React | WebGPU | TailwindCSS"],
    footer: [ "https://github.com/omarabdiwali/cellular-automaton", "https://cellularautomaton.vercel.app" ]
  },

  {
    title: [ "Stock Simulator", <AiOutlineLineChart className="text-emerald-400 text-3xl " key={3}  /> ],
    body: ["A stock simulator where users are able to buy, sell, and view stocks and crypto, with everything saved in a database.", "Next.js | Node.js | TaiwindCSS | MongoDB | OAuth"],
    footer: [ "https://github.com/omarabdiwali/stock-simulator", "https://stocksimulator.vercel.app" ]
  },

  {
    title: ["Pathfinding Visualizer", <MdGpsFixed className="text-emerald-400 text-3xl" key={4} />],
    body: ["This is a pathfinding visualizer with A* Search and Dijkstra. It has a start, point, and end node.", "Next.js | CSS"],
    footer: ["https://github.com/omarabdiwali/dijkstra-visualizer", "https://dijkstra-visualizer.vercel.app/"]
  },

  {
    title: [ "FlashCards", <BsCardText className="text-emerald-400 text-3xl " key={5}  /> ],
    body: ["This is a Next.js website that allows users to create and collab on flashcards in folders, and allow them to be public or private.", "Next.js | Node.js | TaiwindCSS | MongoDB | OAuth"],
    footer: [ "https://github.com/omarabdiwali/flashcards", "https://omar-flashcards.vercel.app" ]
  },

  {
    title: [ "NoteSession", <GiNotebook className="text-emerald-400 text-3xl " key={6}  /> ],
    body: ["A website that allows users to create notes. It is typed using Markdown syntax, and notes are grouped using their importance and urgency label.", "Next.js | Node.js | TaiwindCSS | MongoDB | OAuth"],
    footer: [ "https://github.com/omarabdiwali/note-session", "https://note-session.vercel.app"]
  },

  {
    title: [ "Portfolio", <BsWindowFullscreen className="text-emerald-400 text-3xl " key={7}  /> ],
    body: ["This is the code that made this website. The background is simulating Conway's Game of Life, and also allows users to interact with it.", "Next.js | Tailwind CSS"],
    footer: [ "https://github.com/omarabdiwali/next-portfolio", "https://omarabdiwali.vercel.app" ]
  },

  {
    title: ["Wordle", <VscWholeWord className="text-emerald-400 text-3xl " key={8} />],
    body: ["A wordle clone, able to be played multiple times. Over 7000 words to choose from, giving a definition of the word at the completion.", "Next.js | Node.js | TailwindCSS"],
    footer: [ "https://github.com/omarabdiwali/wrdle", "https://wrrdle.vercel.app" ]
  },

  {
    title: ["Open Library", <AiFillBook className="text-emerald-400 text-3xl" key={9} />],
    body: ["This website is a little library that I made using ReactJS, the Google Books API, and the New York Times API.", "React.js | Chakra UI | Tailwaind CSS"],
    footer: [ "https://github.com/omarabdiwali/openLibrary", "https://open-library.vercel.app" ]
  },
  
]