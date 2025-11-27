import * as queries from './queries'
import { pool } from "../db";
import { Community } from './schema';


export class CommunityService {
  public async getAll(): Promise<Community[]> {
    const query = {
      text: queries.getAll,
      //values: [userId],
    };

    const { rows } = await pool.query(query);
    return rows;
  }

  public async getById(id : string): Promise<Community> {
    const query = {
      text: queries.getById,
      values: [id],
    };

    const { rows } = await pool.query(query);
    return rows[0];
  }
}
