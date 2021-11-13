import { Pool } from 'pg';

const connectionString = 'postgres://ffzcnnoa:HKg8jCWwXdEx2fYKKENi6RcHCbdWuJKx@fanny.db.elephantsql.com/ffzcnnoa';

const db = new Pool({ connectionString });

export default db;