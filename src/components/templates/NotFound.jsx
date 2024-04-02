import React from "react";
import notfound from '../../img/404.gif'

function NotFound() {
  return (
    <div className="w-[100vw] h-full flex items-center justify-center overflow-y-hidden">
      <img style={{ height: "200px" }} 
      src={notfound} />
    </div>
  );
}

export default NotFound;
