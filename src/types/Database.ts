export interface Database {
    id: string;
    name: string;
    url: string;
    username: string;
    password: string;
    type: 'Snowflake' | 'Trino' | 'MySQL';
  }
  