import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        <div className="container background-color-gray">
          <div className="row">
            <div className="flex-basis-30">
              <div className="row justify-content-space-between align-items-end header-height">
                <Link className="color-white text-decoration-none" to="/">Training</Link>
                <Link className="color-white text-decoration-none" to="/pr">PR's</Link>
                <Link className="color-white text-decoration-none" to="/analytics">Analytics</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
