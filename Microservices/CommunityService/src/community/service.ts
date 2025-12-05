import * as queries from './queries'
import { pool } from "../db";
import { Community, NewCommunity } from './schema';
import { CommunityRow } from '../../types';



export class CommunityService {

  private rowsToCommunity(rows : CommunityRow[]) {
    const retCommunity = rows.map((row) => ({
      id: row.id,
      name: row.data.name,
      description: row.data.description,
      created_at: row.data.created_at,
      created_by: row.data.created_by,
    }))
    return retCommunity;
  }



  public async getAll(): Promise<Community[]> {
    const query = {
      text: queries.getAll,
      //values: [userId],
    };

    const { rows } = await pool.query(query);
    const retCommunity = this.rowsToCommunity(rows)
    return retCommunity;
  }

  public async getById(id : string): Promise<Community> {
    const query = {
      text: queries.getById,
      values: [id],
    };

    const { rows } = await pool.query(query);
    const retCommunity = this.rowsToCommunity(rows)[0]
    return retCommunity;
  }

  public async create(userId : string | undefined, newCommunity : NewCommunity): Promise<Community> {
    const query = {
      text: queries.create,
      values: [userId, newCommunity.name, newCommunity.description],
    };

    const { rows } = await pool.query(query);
    const retCommunity = this.rowsToCommunity(rows)[0];
    return retCommunity;
  }
}
