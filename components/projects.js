import { FaChess } from "react-icons/fa";
import { GiSnakeTongue, GiCardJoker } from "react-icons/gi";
import { AiOutlineLineChart, AiFillBook } from "react-icons/ai";
import { BsWindowFullscreen, BsTwitter, BsCardText } from "react-icons/bs";
import { MdGpsFixed } from "react-icons/md";

export const projects = [
  {
    title: [ "FlashCards", <BsCardText className="text-emerald-400 text-3xl " key={0}  /> ],
    body: ["This is a Next.js website that allows users to create and collab on flashcards in folders, and allow them to be public or private.", "Next.js | Node.js | TaiwindCSS | MongoDB | OAuth"],
    footer: [ "https://github.com/omarabdiwali/flashcards", "https://omar-flashcards.vercel.app" ]
  },
  
  {
    title: ["Chess", <FaChess className="text-emerald-400 sm:text-xl text-3xl" key={1} /> ],
    body: ["A online chess game where players are able to play against each other in private rooms, or against a computer.", "Next.js | Node.js | CSS | Socket.io | MongoDB"],
    footer: [ "https://github.com/omarabdiwali/next-chess", "https://chess-jtgk.onrender.com" ],
  },

  {
    title: ["Pathfinding Visualizer", <MdGpsFixed className="text-emerald-400 text-3xl" key={2} />],
    body: ["This is a pathfinding visualizer with A* Search and Dijkstra. It has a start, point, and end node.", "Next.js | CSS"],
    footer: ["https://github.com/omarabdiwali/dijkstra-visualizer", "https://dijkstra-visualizer.vercel.app/"]
  },

  {
    title: [ "Stock Simulator", <AiOutlineLineChart className="text-emerald-400 text-3xl " key={3}  /> ],
    body: ["A stock simulator using the Finnhub API. Users are able to buy, sell, and view stocks, with everything saved in a database.", "Next.js | Node.js | TaiwindCSS | MongoDB | OAuth"],
    footer: [ "https://github.com/omarabdiwali/stock-simulator", "https://stocksimulator.vercel.app" ]
  },

  {
    title: [ "Portfolio", <BsWindowFullscreen className="text-emerald-400 text-3xl " key={4}  /> ],
    body: ["This is the code that made this website using Next.js and Tailwind CSS.", "Next.js | Tailwind CSS"],
    footer: [ "https://github.com/omarabdiwali/next-portfolio", "https://omarabdiwali.vercel.app" ]
  },

  {
    title: ["Open Library", <AiFillBook className="text-emerald-400 text-3xl" key={5} />],
    body: ["This website is a little library that I made using ReactJS, the Google Books API, and the New York Times API.", "React.js | Chakra UI | Tailwaind CSS"],
    footer: [ "https://github.com/omarabdiwali/openLibrary", "https://open-library.vercel.app" ]
  },

  {
    title: [ "Snake Game", <GiSnakeTongue className="text-emerald-400 text-3xl " key={6}  /> ],
    body: ["This is the well known snake game. It was created with ReactJS and CSS, with no additional libraries.", "React.js | HTML / CSS"],
    footer: [ "https://github.com/omarabdiwali/snake-game", "https://snake-omarabdiwali.vercel.app"]
  },

  {
    title: ["Auto-Sign-Up", <BsTwitter className="text-emerald-400 text-3xl " key={7}  /> ],
    body: ["A script that uses Selenium to automate the sign up of my CS class when available, and tweets when completed using Tweepy.", "Python | Selenium | Tweepy"],
    footer: [ "https://github.com/omarabdiwali/auto-sign-up" ]
  },

  {
    title: ["Blackjack", <GiCardJoker className="text-emerald-400 text-3xl " key={8} />],
    body: ["A blackjack game that plays on your command line. It has the option to double, hit, and stand, and the dealer stops hitting on 17.", "Python | SQLite"],
    footer: [ "https://github.com/omarabdiwali/blackjack" ]
  }
  
]