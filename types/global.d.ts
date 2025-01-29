// RAWG
type Game = {
  added: number,
  added_by_status: {
    beaten: number,
    dropped: number,
    owned: number,
    playing: number,
    toplay: number,
    yet: number,
  }|null,
  background_image: string|null,
  clip: null,
  dominant_color: string,
  esrb_rating: {
    id: number,
    name: string,
    slug: string,
  }|null,
  genres: Array<Genre>,
  id: number,
  metacritic: number|null,
  name: string,
  parent_platforms: Array<ParentPlatform>,
  platforms: Array<Platforms>,
  playtime: number,
  rating: number,
  rating_top: number,
  ratings: Array<Rating>,
  ratings_count: number,
  released: string,
  reviews_count: number,
  reviews_text_count: number,
  saturated_color: string,
  short_screenshots: Array<Screenshot>
  slug: string,
  stores: Array<Stores>,
  suggestions_count: number,
  tags: Array<Tag>,
  tba: boolean,
  updated: string,
  user_game: null,
}

type Tag = {
  games_count: number,
  id: number,
  image_background: string,
  language: string,
  name: string,
  slug: string,
}

type Store = {
  domain: string,
  games_count: number,
  id: number,
  image_background: string,
  name: string,
  slug: string,
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
