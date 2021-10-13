import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        <div className="container background-color-gray">
          <div className="row">
            <div>
              <div className="row justify-content-space-between align-items-end header-height nav-spacing">
                <Link className="color-white text-decoration-none font-weight-bold font-size-20 margin-bottom-5" to="/">Training</Link>
                <Link className="color-white text-decoration-none font-weight-bold font-size-20 margin-bottom-5 nav-spacing" to="/pr">PR&apos;s</Link>
                <Link className="color-white text-decoration-none font-weight-bold font-size-20 margin-bottom-5 nav-spacing" to="/analytics">Analytics</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
