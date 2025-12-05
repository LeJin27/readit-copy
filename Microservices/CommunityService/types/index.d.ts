export interface SessionUser {
  id: string
}



export interface CommunityData {
  name: string;
  created_at: string;
  created_by: string;
  description: string;
  privacy: string;
  tags: string[];
  image_url: string;
}

export interface CommunityRow {
  id: string;
  data: CommunityData;
}



declare global {
  namespace Express {
    export interface Request {
      user?: SessionUser
    }
  }
}
