import { Outlet } from "react-router-dom";
import { Home } from '../app/page';

export function Default() {
  return (
    <div>
      <Home />
        
    <div>
        <Outlet />
    </div>
    
    </div>
  );
}
