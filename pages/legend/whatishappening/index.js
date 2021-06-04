import React, { useEffect, useState } from 'react';

function WhatIsHappening() {
  const [text, setText] = useState([]);

  const fetchEvents = () => {
    fetch('/api/whatishappening').then(async (res) => {
      const backendText = await res.json();
      setText(Object.values(backendText));
    });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderText = () => {
    if (text.length === 0) return null;

    const renderStrings = () => text.map((string) => <li>{string}</li>);

    return <ul className={'text'}>{renderStrings()}</ul>;
  };

  return (
    <div id="whatishappening" className="whatishappening">
      {renderText()}
    </div>
  );
}

export default WhatIsHappening;
