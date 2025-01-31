// RAWG
type Game = {
  achievements_count: number,
  added: number,
  added_by_status: {
    beaten: number,
    dropped: number,
    owned: number,
    playing: number,
    toplay: number,
    yet: number,
  } | null,
  alternative_names: Array<string>,
  background_image: string|null,
  background_image_additional: string|null,
  clip: null,
  description: string,
  description_raw: string,
  developers: Array<Developer>,
  dominant_color: string,
  esrb_rating: {
    id: number,
    name: string,
    slug: string,
  }|null,
  game_series_count: number,
  genres: Array<Genre>,
  id: number,
  metacritic_platforms: Array<MetacriticPlatform>,
  metacritic_url: string,
  metacritic: number|null,
  movies_count: number,
  name: string,
  name_original: string,
  parent_achievements_count: number,
  parent_platforms: Array<ParentPlatform>,
  parents_count: number,
  platforms: Array<Platforms>,
  playtime: number,
  publishers: Array<Publisher>,
  rating: number,
  rating_top: number,
  ratings: Array<Rating>,
  ratings_count: number,
  reddit_count: number,
  reddit_url: number,
  released: string,
  reviews_count: number,
  reviews_text_count: number,
  saturated_color: string,
  score: number|null,
  screenshots_count: number,
  slug: string,
  stores: Array<Stores>|null,
  suggestions_count: number,
  tags: Array<Tag>,
  tba: boolean,
  twitch_count: number,
  updated: string,
  user_game: null,
  website: string|null,
  youtube_count: number,
}

type MetacriticPlatform = {
  metascore: number,
  url: string,
  platform: {
    platform: number,
    slug: string,
    name: string,
  },
}

type Tag = {
  games_count: number,
  id: number,
  image_background: string,
  language: string,
  name: string,
  slug: string,
  games: Array<{
    id: number,
    name: string,
    slug: string,
    added: number,
  }>,
}

type Store = {
  domain: string,
  games_count: number,
  id: number,
  image_background: string,
  name: string,
  slug: string,
  games: Array<{
    id: number,
    name: string,
    slug: string,
    added: number,
  }>,
}

type Stores = {
  store: Store,
}

type Screenshot = {
  id: number,
  image: string,
}

type Rating = {
  count: number,
  id: number,
  percent: number,
  title: string,
}

type ParentPlatform = {
  platform: Array<Platform>,
}

type Platforms = {
  platform: Platform,
}

type Platform = {
  games_count: number,
  id: number,
  image: string|null,
  image_background: string,
  name: string,
  slug: string,
  games: Array<{
    id: number,
    name: string,
    slug: string,
    added: number,
  }>,
  year_end: number|null,
  year_start: number,
}

type Genre = {
  id: number,
  games_count: number,
  image_background: string,
  name: string,
  slug: string,
  games: Array<{
    id: number,
    name: string,
    slug: string,
    added: number,
  }>,
}

type Developer = {
  id: number,
  games_count: number,
  image_background: string,
  name: string,
  slug: string,
  games: Array<{
    id: number,
    name: string,
    slug: string,
    added: number,
  }>,
}

type Publisher = {
  id: number,
  games_count: number,
  image_background: string,
  name: string,
  slug: string,
  games: Array<{
    id: number,
    name: string,
    slug: string,
    added: number,
  }>,
}

// NAVIGATION
type NavGroup = {
  title: string,
  group: boolean,
  links: Array<NavLink>,
}

type NavLink = {
  title: string,
  icon: Component
}

// OTHER
type ThemeColor =
  | 'zinc'
  | 'slate'
  | 'stone'
  | 'gray'
  | 'neutral'
  | 'red'
  | 'rose'
  | 'orange'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'violet'

type ModeColor =
  | 'light'
  | 'dark'
