import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum Category {
  ANY_CATEGORY = "any",
  GK = "9",
  ENTER_BOOKS = "10",
  ENTER_FILMS = "11",
  ENTER_MUSIC = "12",
  ENTER_THEATRE = "13",
  ENTER_TV = "14",
  ENTER_VDOGAMES = "15",
  ENTER_BOARDGAMES = "16",
  SCIENCE = "18",
  SCIENCE_MATHS = "19",
  MYTHOLOGY = "20",
  SPORTS = "21",
  GEOGRAPHY = "22",
  HISTORY = "23",
  POLITICS = "24",
  ART = "25",
  CELEBRITIES = "26",
  ANIMAL = "27",
  VEHICLES = "28",
  ENTER_COMICS = "29",
  SCIENCE_GADGETS = "30",
  ENTER_JAPNESE = "31",
  ENTER_CARTOON = "32",
}

// const sample = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";

export const fetchQuizQuestions = async (
  amount: number,
  category: Category,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();

  //console.log(data);
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
