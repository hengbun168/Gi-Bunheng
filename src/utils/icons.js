import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt,
  FaGithub, FaFigma, FaAndroid, FaDatabase, FaMobileAlt, FaRobot,
  FaServer, FaCode, FaLaptopCode, FaCogs, FaCloud, FaPlug,
  FaLightbulb, FaRocket, FaPalette, FaBug, FaGlobe
} from 'react-icons/fa';
import {
  SiFirebase, SiMongodb, SiMysql, SiExpress
} from 'react-icons/si';

const iconMap = {
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: FaJsSquare,
  react: FaReact,
  nodejs: FaNodeJs,
  express: SiExpress,
  firebase: SiFirebase,
  mongodb: SiMongodb,
  mysql: SiMysql,
  git: FaGitAlt,
  github: FaGithub,
  vscode: FaCode,
  android: FaAndroid,
  figma: FaFigma,
  responsive: FaMobileAlt,
  uiux: FaPalette,
  api: FaPlug,
  auth: FaServer,
  database: FaDatabase,
  deploy: FaCloud,
  mobile: FaMobileAlt,
  ai: FaRobot,
  web: FaGlobe,
  frontend: FaLaptopCode,
  backend: FaServer,
  product: FaLightbulb,
  tools: FaCogs,
  other: FaCode,
  idea: FaLightbulb,
  planning: FaCogs,
  design: FaPalette,
  development: FaCode,
  testing: FaBug,
  deployment: FaRocket,
};

export function getIcon(key) {
  return iconMap[key] || FaCode;
}
