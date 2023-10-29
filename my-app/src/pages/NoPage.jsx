import React from 'react';

function NoPage() {
  return (
  // <div style={{width: '100%', height: '100%', backgroundColor: '#799BD3'}}>
  <div>
    <a
      href="/"
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '5px',
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
      }}
    >
    Back to Main
    </a>
    <div style={{color: 'black', textAlign: 'center', fontSize: '64px'}}>
      404 Page Not Found
    </div>
  </div>
  )
}

export default NoPage
