import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function LoadingIndicator() {
  return (

      <div
          style={{
            display: "flex",
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgb(58, 58, 58)',
            alignItems: "center",
            justifyContent: "center"
          }}
      >
        <div style={{
          display: 'flex'
        }}>
          <CircularProgress/>
        </div>
      </div>
  );
}
