type Game = {
  id: number,
  name: string,
  cover: {
    id: number,
    url: string,
  },
  first_release_date: number
}

type GameCategory = {
  title: string;
  games: Array<Game>;
  query: string;
  link: string;
  icon: Component
};

type PopularCategory = {
  id: number,
  game_id: number;
};

type NavGroup = {
  title: string,
  group: boolean,
  links: Array<NavLink>,
};

type NavLink = {
  title: string,
  icon: Component
};
