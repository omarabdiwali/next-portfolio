import { FaChess } from "react-icons/fa";
import { GiSnakeTongue, GiCardJoker } from "react-icons/gi";
import { AiOutlineLineChart, AiFillBook } from "react-icons/ai";
import { BsWindowFullscreen, BsTwitter, BsTicketDetailedFill } from "react-icons/bs";
import { MdGpsFixed } from "react-icons/md";

export const projects = [
  
  {
    title: ["Chess", <FaChess className="text-emerald-400 sm:text-xl text-3xl" key={0} /> ],
    body: ["A online chess game where players are able to play against each other in private rooms, or against a computer.", "Next.js | Node.js | CSS | MUI | NotiStack | Socket.io | MongoDB"],
    footer: [ "https://github.com/omarabdiwali/next-chess", "https://chess-jtgk.onrender.com" ],
  },

  {
    title: ["Pathfinding Visualizer", <MdGpsFixed className="text-emerald-400 text-3xl" key={1} />],
    body: ["This is a pathfinding visualizer with A* Search and Dijkstra. It has a start, point, and end node.", "Next.js | CSS | NotiStack"],
    footer: ["https://github.com/omarabdiwali/dijkstra-visualizer", "https://dijkstra-visualizer.vercel.app/"]
  },

  {
    title: [ "Portfolio", <BsWindowFullscreen className="text-emerald-400 text-3xl " key={2}  /> ],
    body: ["This is the code that made this website using Next.js and Tailwind CSS.", "Next.js | Tailwind CSS | React-Icons"],
    footer: [ "https://github.com/omarabdiwali/next-portfolio", "https://omarabdiwali.vercel.app" ]
  },

  {
    title: ["Open Library", <AiFillBook className="text-emerald-400 text-3xl" key={3} />],
    body: ["This website is a little library that I made using ReactJS, the Google Books API, and the New York Times API.", "React.js | Chakra UI | Tailwaind CSS"],
    footer: [ "https://github.com/omarabdiwali/openLibrary", "https://open-library.vercel.app" ]
  },

  {
    title: [ "Movie Browse", <BsTicketDetailedFill className="text-emerald-400 text-3xl " key={4}  /> ],
    body: ["This is a React App that displays basic data about movies, TV shows, and whatever is trending using The Movies DB API.", "React.js | MUI"],
    footer: [ "https://github.com/omarabdiwali/movie-browse", "https://omarabdiwali.github.io/movie-browse" ]
  },

  {
    title: [ "Snake Game", <GiSnakeTongue className="text-emerald-400 text-3xl " key={5}  /> ],
    body: ["This is the well known snake game. It was created with ReactJS and CSS, with no additional libraries.", "React.js | HTML / CSS"],
    footer: [ "https://github.com/omarabdiwali/snake-game", "https://snake-omarabdiwali.vercel.app"]
  },

  {
    title: ["Auto-Sign-Up", <BsTwitter className="text-emerald-400 text-3xl " key={6}  /> ],
    body: ["A script that uses Selenium to automate the sign up of my CS class when available, and tweets when completed using Tweepy.", "Python | Selenium | Tweepy"],
    footer: [ "https://github.com/omarabdiwali/news-bot-twitter" ]
  },

  {
    title: [ "Stock Program", <AiOutlineLineChart className="text-emerald-400 text-3xl " key={7}  /> ],
    body: ["A command-line program that gives you a base amount to start with, and allows you to buy stocks with it.", "Python | Beautiful Soup"],
    footer: [ "https://github.com/omarabdiwali/cmdline-stock-program" ]
  },

  {
    title: ["Blackjack", <GiCardJoker className="text-emerald-400 text-3xl " key={8} />],
    body: ["A blackjack game that plays on your command line. It has the option to double, hit, and stand, and the dealer stops hitting on 17.", "Python | SQLite"],
    footer: [ "https://github.com/omarabdiwali/blackjack" ]
  }
  
]