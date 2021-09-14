import React from 'React';

export default function Header() {
  return (
    <header>
      <nav>
        <div className="container background-color-gray">
          <div className="row">
            <div className="flex-basis-30">
              <div className="row justify-content-space-between align-items-end header-height">
                <a className="color-white">Training</a>
                <a className="color-white">PR's</a>
                <a className="color-white">Analytics</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
