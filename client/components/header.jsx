import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        <div className="container background-color-gray">
          <div className="row">
            <div className="flex-basis-20">
              <div className="row justify-content-space-between align-items-end header-height margin-left-10">
                <Link className="color-white text-decoration-none font-weight-bold font-size-20 margin-bottom-5" to="/">Training</Link>
                <Link className="color-white text-decoration-none font-weight-bold font-size-20 margin-bottom-5" to="/pr">PR's</Link>
                <Link className="color-white text-decoration-none font-weight-bold font-size-20 margin-bottom-5" to="/analytics">Analytics</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
