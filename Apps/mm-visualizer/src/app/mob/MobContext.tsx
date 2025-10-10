import { createContext } from 'react';
import { Mob } from '../../mob';


export type MobContextType = {
  mobList: Mob[];
  setMobList: React.Dispatch<React.SetStateAction<Mob[]>>;
  setCurrentMob: React.Dispatch<React.SetStateAction<Mob | undefined>>;
  currentMob: Mob | undefined;
};

const MobContext = createContext<MobContextType | null>(null);

export default MobContext;