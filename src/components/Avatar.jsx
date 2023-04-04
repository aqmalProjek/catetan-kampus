import React from "react";

export default function Avatar({size}) {
  let width = 'w-12 h-12'
  if(size === 'lg') {
    width = 'w-24 h-24'
  }
  return (
    <div className={`${width} rounded-full overflow-hidden`}>
      <img
        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
}
