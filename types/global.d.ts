type Game = {
  name: string,
  first_release_date: number
}

type GameCategory = {
  title: string;
  games: Array<Game>;
  query: string;
  icon: Component
};
