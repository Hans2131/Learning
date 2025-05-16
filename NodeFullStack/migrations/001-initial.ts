import type { MigrationBuilder } from 'node-pg-migrate';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upSql = fs.readFileSync(join(__dirname, 'sql', '001-up.sql'), 'utf8');
const downSql = fs.readFileSync(join(__dirname, 'sql', '001-down.sql'), 'utf8');

export const up = (pgm: MigrationBuilder) => {
  pgm.sql(upSql);
};

export const down = (pgm: MigrationBuilder) => {
  pgm.sql(downSql);
};