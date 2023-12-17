export interface RegistryPackages {
  objects: {
    package: {
      name: string;
      scope: string;
      version: string;
      description: string;
      keywords: string[];
      date: string;
      links: Record<string, string>;
      author?: {
        name?: string;
      };
      publisher: {
        username: string;
        email: string;
      };
      maintainers: {
        username: string;
        email: string;
      }[];
    };
    flags: {
      insecure: number;
    };
    score: {
      final: number;
      detail: {
        quality: number;
        popularity: number;
        maintenance: number;
      };
    };
    searchScore: number;
  }[];
  total: number;
  time: string;
}

export interface JsdelivrPackageModel {
  tags: {
    latest?: number;
    beta?: number;
  };
}

export interface JsdelivrPackageStatsModel {
  hits: {
    total?: number;
    rank?: number;
  };
  bandwidth: {
    total?: number;
    rank?: number;
  };
}
