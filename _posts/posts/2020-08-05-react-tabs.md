---
title: "How to Create Simple Tabs in ReactJS"
tags: all javascript reactjs
category: post
permalink: /how-to-create-simple-tabs-in-reactjs
layout: post
headerImg: "davi-mendes-c7ir2Go9qXc-unsplash.jpg"
imgCredit: "Davi Mendes via Unsplash"
imgHref: "https://unsplash.com/photos/c7ir2Go9qXc"
# youtubeURL: "https://www.youtube.com/embed/Mt0enYWNJCU"
---
Let's learn how to make tabs in React! Simple tabs, no libraries, just plain JSX and JavaScript. Tabs are a great UI element for compartmentalizing information and can be an effective component for streamlining your interface.

So let's dive in.

Start by creating two new JavaScript files, each of which exports a new component. Let's call them `Tab.js` and `Tabs.js`.

`Tab.js` is pretty simple:

```javascript
const Tab = () => null;

export default Tab;
```

You don't even really need to separate this into it's own file, but it's good to just in case you want to add custom functionality to the individual tabs in the future.

`Tabs.js` is a little more involved:

```jsx
import React, {Component} from 'react';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab });
  }

  render() {
    const {children} = this.props;
    const {activeTab} = this.state;

    return (
      <div className="tabs">
        <header>
          {
            children.map((tab, i) => {
              const isActive = (i === activeTab);

              return (
                <button
                  key={"tabH"+i}
                  className={(isActive ? "active" : "")}
                  onClick={() => this.setActiveTab(i) }
                >
                  {tab.props.title}
                </button>
              );
            })
          }
        </header>
        <div className="tab-body">
          {
            children.map((tab, i) => {
              const isActive = (i === activeTab);

              return (
                <div
                  key={"tabB"+i}
                  className={(isActive ? "active" : "")}
                >
                  {tab.props.children}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Tabs;
```
The `Tabs` property `children` refers to the array of JSX elements nested inside `<Tabs>...</Tabs>`. In the `render()` function we iterate over them twice. Once to build the `<header>` buttons, and again to build the content body of each tab.

The `isActive` variable refers to if that tab is open or closed. We evaluate this by storing the `activeTab` index in the state. And update it `onClick` with a call to our function `setActiveTab()`.

Then implementation of the components is pretty straightforward. For the sake of simplicity in this tutorial, I'll be adding them directly into my simple `App.js` file as follows:

```jsx
import React from 'react';
import Tabs from './Tabs';
import Tab from './Tab';

function App() {
  return (
    <div className="App">
      <Tabs>
        <Tab title="Home">
          <p>Yay</p>
          <p>You are looking at the first tab.</p>
        </Tab>
        <Tab title="My Tab">
          <p>Yeet my tab!</p>
          <p>This is the second tab.</p>
        </Tab>
        <Tab title="My Other Tab">
          <p>Sneaky sneaky</p>
          <p>This be the third tab.</p>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
```

And that's it for our JavaScript! Next we'll take a look at the CSS involved.

```css
:root {
  font-size: 10px;
}

.tabs header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.tabs header button {
  margin-right: 1rem;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.5);
  color: #FFF;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: 0;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  outline: none;
}

.tabs header button.active {
  background-color: #FFF;
  color: #000;
}

.tabs .tab-body {
  padding: 2rem;
  box-sizing: border-box;
  background-color: #FFF;
  color: #000;
}

.tabs .tab-body > div {
  display: none;
}

.tabs .tab-body > div.active {
  display: block;
}
```

There's a bit of stylistic stuff in there, but the main things to take away are the changes when the `.active` class are applied to both the `.tab-body` `<div>`s and the `<header>`'s `<button>`s.

The `.active` class makes the content `<div>`s visible / part of the DOM, and when applied to the `<header>` `<button>`s it changes their styling so they look active.

And there we have it, simple tab components in ReactJS without the need for 3rd party libraries.

As always, happy hacking!

Love Kirk M. (@saricden)