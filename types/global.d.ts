type Game = {
  id: number,
  name: string,
  first_release_date: number
}

type GameCategory = {
  title: string;
  games: Array<Game>;
  query: string;
  icon: Component
};

type PopularCategory = {
  id: number,
  game_id: number;
};
