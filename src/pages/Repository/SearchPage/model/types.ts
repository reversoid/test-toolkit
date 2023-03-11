export interface Owner {
  avatarUrl: string | null;
  url: string;
  name: string;
}

export interface Language {
  name: string;
}

export interface Repository {
  name: string;
  stargazerCount: number;
  description: string | null;
  updatedAt: Date;
  owner: Owner;
  languages: Language[];
  id: string;
  url: string;
}
